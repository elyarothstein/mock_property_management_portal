-- Property Management Portal database setup for Supabase.
-- Run this in the Supabase SQL editor after creating a new project.

create extension if not exists pgcrypto;

create type public.account_role as enum ('landlord', 'renter', 'staff');
create type public.unit_status as enum ('occupied', 'vacant', 'maintenance', 'offline');
create type public.payment_status as enum ('pending', 'paid', 'partial', 'failed', 'refunded');
create type public.request_priority as enum ('normal', 'urgent');
create type public.request_status as enum ('open', 'scheduled', 'completed', 'cancelled');
create type public.application_status as enum ('submitted', 'screening', 'approved', 'conditional', 'denied', 'withdrawn');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.account_role not null,
  full_name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table public.landlord_accounts (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  business_name text not null,
  created_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  landlord_account_id uuid not null references public.landlord_accounts(id) on delete cascade,
  property_name text not null,
  street_address text,
  city text,
  state text,
  postal_code text,
  created_at timestamptz not null default now()
);

create table public.units (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  unit_label text not null,
  status public.unit_status not null default 'vacant',
  market_rent numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table public.tenancies (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  renter_profile_id uuid not null references public.profiles(id) on delete cascade,
  lease_start date not null,
  lease_end date not null,
  monthly_rent numeric(12, 2) not null,
  balance_due numeric(12, 2) not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.rent_payments (
  id uuid primary key default gen_random_uuid(),
  tenancy_id uuid not null references public.tenancies(id) on delete cascade,
  amount numeric(12, 2) not null check (amount > 0),
  status public.payment_status not null default 'pending',
  payment_method text,
  processor_reference text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.maintenance_requests (
  id uuid primary key default gen_random_uuid(),
  tenancy_id uuid not null references public.tenancies(id) on delete cascade,
  category text not null,
  priority public.request_priority not null default 'normal',
  status public.request_status not null default 'open',
  description text not null,
  landlord_notes text,
  vendor_name text,
  estimated_cost numeric(12, 2),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.rental_applications (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  applicant_profile_id uuid references public.profiles(id) on delete set null,
  applicant_name text not null,
  applicant_email text not null,
  monthly_income numeric(12, 2),
  requested_move_in date,
  status public.application_status not null default 'submitted',
  consent_received boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.screening_reports (
  id uuid primary key default gen_random_uuid(),
  rental_application_id uuid not null references public.rental_applications(id) on delete cascade,
  provider_name text,
  provider_report_id text,
  state_coverage jsonb not null default '[]'::jsonb,
  risk_level text,
  summary text,
  created_at timestamptz not null default now()
);

create table public.accounting_entries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  entry_date date not null default current_date,
  category text not null,
  entry_type text not null check (entry_type in ('income', 'expense', 'receivable', 'liability')),
  amount numeric(12, 2) not null,
  memo text,
  created_at timestamptz not null default now()
);

create table public.legal_documents (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete cascade,
  tenancy_id uuid references public.tenancies(id) on delete cascade,
  document_name text not null,
  document_type text not null,
  storage_path text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.landlord_accounts enable row level security;
alter table public.properties enable row level security;
alter table public.units enable row level security;
alter table public.tenancies enable row level security;
alter table public.rent_payments enable row level security;
alter table public.maintenance_requests enable row level security;
alter table public.rental_applications enable row level security;
alter table public.screening_reports enable row level security;
alter table public.accounting_entries enable row level security;
alter table public.legal_documents enable row level security;

create or replace function public.current_profile_role()
returns public.account_role
language sql
stable
security definer
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.user_landlord_account_ids()
returns setof uuid
language sql
stable
security definer
as $$
  select id from public.landlord_accounts where owner_profile_id = auth.uid()
$$;

create or replace function public.user_tenancy_ids()
returns setof uuid
language sql
stable
security definer
as $$
  select id from public.tenancies where renter_profile_id = auth.uid() and active = true
$$;

create policy "profiles can read own profile"
on public.profiles for select
using (id = auth.uid());

create policy "users can create own profile"
on public.profiles for insert
with check (id = auth.uid());

create policy "landlords can manage own account"
on public.landlord_accounts for all
using (owner_profile_id = auth.uid())
with check (owner_profile_id = auth.uid());

create policy "landlords can manage own properties"
on public.properties for all
using (landlord_account_id in (select public.user_landlord_account_ids()))
with check (landlord_account_id in (select public.user_landlord_account_ids()));

create policy "landlords can manage units for own properties"
on public.units for all
using (
  property_id in (
    select id from public.properties where landlord_account_id in (select public.user_landlord_account_ids())
  )
)
with check (
  property_id in (
    select id from public.properties where landlord_account_id in (select public.user_landlord_account_ids())
  )
);

create policy "renters can read their own tenancy"
on public.tenancies for select
using (renter_profile_id = auth.uid());

create policy "landlords can manage tenancies for own properties"
on public.tenancies for all
using (
  unit_id in (
    select u.id
    from public.units u
    join public.properties p on p.id = u.property_id
    where p.landlord_account_id in (select public.user_landlord_account_ids())
  )
)
with check (
  unit_id in (
    select u.id
    from public.units u
    join public.properties p on p.id = u.property_id
    where p.landlord_account_id in (select public.user_landlord_account_ids())
  )
);

create policy "renters can read and create own payments"
on public.rent_payments for all
using (tenancy_id in (select public.user_tenancy_ids()))
with check (tenancy_id in (select public.user_tenancy_ids()));

create policy "landlords can read payments for own properties"
on public.rent_payments for select
using (
  tenancy_id in (
    select t.id
    from public.tenancies t
    join public.units u on u.id = t.unit_id
    join public.properties p on p.id = u.property_id
    where p.landlord_account_id in (select public.user_landlord_account_ids())
  )
);

create policy "renters can manage own maintenance requests"
on public.maintenance_requests for all
using (tenancy_id in (select public.user_tenancy_ids()))
with check (tenancy_id in (select public.user_tenancy_ids()));

create policy "landlords can manage maintenance for own properties"
on public.maintenance_requests for all
using (
  tenancy_id in (
    select t.id
    from public.tenancies t
    join public.units u on u.id = t.unit_id
    join public.properties p on p.id = u.property_id
    where p.landlord_account_id in (select public.user_landlord_account_ids())
  )
);

create policy "landlords can manage applications for own properties"
on public.rental_applications for all
using (
  property_id in (
    select id from public.properties where landlord_account_id in (select public.user_landlord_account_ids())
  )
)
with check (
  property_id in (
    select id from public.properties where landlord_account_id in (select public.user_landlord_account_ids())
  )
);

create policy "applicants can read own applications"
on public.rental_applications for select
using (applicant_profile_id = auth.uid());

create policy "landlords can manage screening reports for own applications"
on public.screening_reports for all
using (
  rental_application_id in (
    select ra.id
    from public.rental_applications ra
    join public.properties p on p.id = ra.property_id
    where p.landlord_account_id in (select public.user_landlord_account_ids())
  )
);

create policy "landlords can manage accounting for own properties"
on public.accounting_entries for all
using (
  property_id in (
    select id from public.properties where landlord_account_id in (select public.user_landlord_account_ids())
  )
)
with check (
  property_id in (
    select id from public.properties where landlord_account_id in (select public.user_landlord_account_ids())
  )
);

create policy "landlords can manage legal documents for own properties"
on public.legal_documents for all
using (
  property_id in (
    select id from public.properties where landlord_account_id in (select public.user_landlord_account_ids())
  )
  or tenancy_id in (
    select t.id
    from public.tenancies t
    join public.units u on u.id = t.unit_id
    join public.properties p on p.id = u.property_id
    where p.landlord_account_id in (select public.user_landlord_account_ids())
  )
);

create policy "renters can read own legal documents"
on public.legal_documents for select
using (tenancy_id in (select public.user_tenancy_ids()));
