# Property Management Portal Compliance Workflow

This document explains the compliance-oriented design choices in the prototype so the portal can be safely expanded later.

## Portal Domains

1. Account access: landlords and renters should have separate permissions, dashboards, and data access.
2. Rent collection: production payment processing should use a secure payment provider and never store raw bank or card data in the browser.
3. Maintenance requests: renter-submitted requests should create auditable work orders visible to the landlord.
4. Accounting: income, expense, deposit, receivable, and owner-distribution records should be exportable and reconciled.
5. Documents: lease agreements, notices, inspection forms, and compliance files should be tracked by property, unit, tenant, and jurisdiction.
6. Tenant screening: screening reports should require authorization, permissible purpose, audit logging, and legally reviewed decision rules.

## Recommended Screening Categories

1. Identity verification: confirms that the applicant is who they claim to be.
2. Applicant authorization: records written permission before ordering consumer reports.
3. Credit report and score review: evaluates payment history, debt load, collections, bankruptcies, and fraud indicators.
4. Criminal background review: identifies potentially relevant convictions across all 50 states while avoiding automatic denial rules.
5. Eviction and housing-court records: reviews prior eviction filings and outcomes across all 50 states.
6. Rental history: confirms prior addresses, landlord references, payment behavior, and lease compliance across the applicant's state history.
7. Income and employment verification: compares verifiable income against rent requirements.
8. Watchlist and fraud screening: checks for identity inconsistencies, synthetic identity signals, and sanctions/watchlist matches where legally permitted.
9. Adverse-action workflow: prepares notices when a report contributes to a denial, higher deposit, guarantor requirement, or other less favorable decision.

## Integration Notes

- Replace the demo report data in `src/application.js` with calls to approved providers.
- Use provider APIs that can return nationwide results across all 50 states for criminal records, eviction records, address history, rental history, public records, and credit-related data.
- Store a state-level coverage result for each report so staff can see whether a state was clear, needs review, was unavailable, or has local restrictions.
- Keep applicant consent, report request IDs, provider names, report timestamps, and decision history in an audit log.
- Integrate rent payments through a payment processor that supports receipts, refunds, failed-payment handling, chargeback records, and settlement reporting.
- Keep maintenance history connected to tenant, unit, vendor, priority, status, cost, photos, and completion notes.
- Keep accounting records separate from legal/security-deposit records unless local law and accounting policy allow them to be combined.
- Do not store raw Social Security numbers in the browser. Use provider-hosted collection or tokenization.
- Use role-based access controls for staff who can view reports.
- Add dispute handling so applicants can challenge inaccurate report data.
- Have counsel review decision rules before production use, especially criminal-history, eviction-record, and credit-score thresholds.

## Product Guardrails

- The app should assist human review, not automatically reject an applicant based only on criminal history.
- Decision rules should be consistent, documented, and applied equally.
- The adverse-action panel should be completed any time a consumer report affects the rental decision.
- Local law may restrict the timing or use of criminal background checks, credit checks, eviction records, source-of-income data, and application fees.
- "All 50 states" should mean the software requested coverage from all states through qualified data sources; it should not promise that every courthouse, local agency, landlord reference, or sealed/expunged record is available.
