# Supabase Setup Guide

Use this guide when you are ready to move from demo data to real accounts and a secure database.

## 1. Create the Supabase Project

1. Go to Supabase and create a new project.
2. Open the SQL editor.
3. Paste and run `database/supabase-schema.sql`.

This creates the landlord, renter, property, payment, maintenance, application, screening, accounting, and legal-document tables.

## 2. Add Local Configuration

1. Copy `src/config.example.js`.
2. Rename the copy to `src/config.local.js`.
3. Put your Supabase project URL and anon public key in that file.
4. Change `useDemoData` to `false`.

`src/config.local.js` is ignored by Git so private project settings are not uploaded to GitHub.

## 3. Add the Script Tag Locally

In `index.html`, keep this line before `src/secure-backend.js`:

```html
<script src="src/config.local.js"></script>
```

If the file does not exist, the app keeps using demo data.

## 4. How Permissions Work

The database uses row-level security:

- Landlords can see properties, units, tenants, payments, maintenance, applications, accounting, and documents for properties they own.
- Renters can see only their own tenancy, payments, maintenance requests, and documents.
- Screening reports are visible to the landlord account connected to the application.

## 5. What Still Needs Production Providers

Use real vendors for:

- Rent payments and bank/card processing.
- Criminal, credit, eviction, identity, and income checks.
- Legal document generation and e-signatures.
- File storage for leases, notices, photos, and invoices.

Never store raw bank details, card numbers, Social Security numbers, or full background-check reports directly in browser code.
