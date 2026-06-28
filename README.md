# Property Management Portal

## Demo-Only GitHub Disclaimer

This project is a **demo prototype for GitHub review only**. It should not be used as a live property-management system and should not collect, store, or process real landlord, renter, payment, credit-card, bank-account, Social Security, background-check, lease, legal, or tenant information.

Use fake demo data only. A production version would need secure authentication, a protected database, payment processing through a compliant provider, legal review, tenant-screening provider integrations, privacy controls, audit logs, and security testing.

A professional landlord and renter portal prototype for real estate teams. The application demonstrates account-role entry, landlord dashboards, property occupancy, rental applications, nationwide tenant screening, rent payment tracking, renter rent payment submission, maintenance requests, accounting, profit/loss reporting, lease records, legal document tracking, and renter document access.

## Important Compliance Note

This project is a software prototype. Real rent payments, accounting exports, legal notices, leases, criminal background checks, credit reports, eviction records, identity verification, sanctions searches, and income verification should be handled through properly contracted providers and reviewed under applicable law. Tenant screening in the United States commonly involves the Fair Credit Reporting Act, fair housing rules, state law, local ordinances, written applicant authorization, permissible-purpose controls, dispute handling, and adverse-action notices.

## Project Structure

- `index.html` - Application shell, account-role views, and semantic page structure.
- `src/application.js` - Interactive portal behavior, demo landlord/renter data, payment updates, maintenance requests, and screening logic.
- `src/secure-backend.js` - Supabase-ready backend adapter for login, database reads, payments, and maintenance requests.
- `src/config.example.js` - Safe template for local Supabase settings.
- `database/supabase-schema.sql` - Secure database schema with landlord/renter row-level permissions.
- `src/styles.css` - Professional interface styling and responsive layout.
- `docs/compliance-workflow.md` - Plain-language notes for future provider integrations and compliance review.
- `docs/supabase-setup.md` - Step-by-step setup notes for moving from demo data to Supabase.

## Run Locally

From this project folder:

```bash
npm start
```

Then open:

```text
http://localhost:4173
```

The app uses demo data only and does not send applicant or payment information to any third party.

## Real Login and Database Setup

This project is now prepared for Supabase. Keep `src/config.local.js` private and out of GitHub.

1. Create a Supabase project.
2. Run `database/supabase-schema.sql` in the Supabase SQL editor.
3. Copy `src/config.example.js` to `src/config.local.js`.
4. Add your Supabase URL and anon public key.
5. Set `useDemoData` to `false`.

Until that private config file exists, the portal safely keeps using demo data.

## Portal Features

- Landlord and renter account modes.
- Landlord portfolio dashboard with occupancy, vacancy, rent collection, outstanding balances, net operating income, and open maintenance.
- Property-level occupancy cards.
- Rent ledger showing who paid, who owes, and partial balances.
- Renter rent payment form that updates the landlord ledger in the demo.
- Renter maintenance form that updates the landlord maintenance queue in the demo.
- Accounting summaries for income, expenses, net cash position, and receivables.
- Lease, notice, document, and compliance tracking.
- Rental application and nationwide tenant screening workspace.

## Nationwide Screening Feature

The interface includes an all-50-state history review panel. Staff can switch between criminal background, eviction and housing-court, rental history, and credit/public-record coverage, then see each state's status as clear, pending, review required, or local rules noted.
# mock_property_management_portal
