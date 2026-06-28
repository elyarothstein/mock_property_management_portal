const properties = [
  { id: "P-100", name: "Harbor View Residences", unit: "1A", tenant: "Elena Garcia", rent: 2150, status: "Occupied", marketRent: 2250 },
  { id: "P-101", name: "Harbor View Residences", unit: "2C", tenant: "Vacant", rent: 2400, status: "Vacant", marketRent: 2400 },
  { id: "P-102", name: "Harbor View Residences", unit: "3B", tenant: "Avery Thompson", rent: 2450, status: "Occupied", marketRent: 2450 },
  { id: "P-103", name: "Harbor View Residences", unit: "4D", tenant: "Sam Rivera", rent: 2350, status: "Occupied", marketRent: 2350 },
  { id: "P-104", name: "Harbor View Residences", unit: "5A", tenant: "Vacant", rent: 2300, status: "Vacant", marketRent: 2300 }
];

const tenants = [
  {
    id: "TEN-301",
    name: "Avery Thompson",
    unit: "3B",
    email: "avery.thompson@example.com",
    monthlyRent: 2450,
    balanceDue: 2450,
    dueDate: "2026-07-01",
    leaseEnd: "2027-06-30",
    lastPaymentAmount: 2450,
    lastPaymentDate: "2026-06-01",
    paymentStatus: "Due"
  },
  {
    id: "TEN-302",
    name: "Elena Garcia",
    unit: "1A",
    email: "elena.garcia@example.com",
    monthlyRent: 2150,
    balanceDue: 0,
    dueDate: "2026-07-01",
    leaseEnd: "2027-03-31",
    lastPaymentAmount: 2150,
    lastPaymentDate: "2026-06-25",
    paymentStatus: "Paid"
  },
  {
    id: "TEN-303",
    name: "Sam Rivera",
    unit: "4D",
    email: "sam.rivera@example.com",
    monthlyRent: 2350,
    balanceDue: 650,
    dueDate: "2026-06-01",
    leaseEnd: "2026-12-31",
    lastPaymentAmount: 1700,
    lastPaymentDate: "2026-06-10",
    paymentStatus: "Partial"
  }
];

const maintenanceRequests = [
  {
    id: "MR-7001",
    tenantId: "TEN-303",
    tenant: "Sam Rivera",
    unit: "4D",
    category: "Heating / Cooling",
    priority: "Urgent",
    status: "Vendor scheduled",
    description: "Air conditioning is not cooling the bedroom.",
    submitted: "2026-06-26"
  },
  {
    id: "MR-7002",
    tenantId: "TEN-301",
    tenant: "Avery Thompson",
    unit: "3B",
    category: "Plumbing",
    priority: "Normal",
    status: "Open",
    description: "Kitchen sink drains slowly.",
    submitted: "2026-06-27"
  }
];

const accountingEntries = [
  { category: "Gross rent collected", type: "Income", amount: 3850 },
  { category: "Expected remaining rent", type: "Receivable", amount: 3100 },
  { category: "Maintenance and repairs", type: "Expense", amount: -1180 },
  { category: "Insurance", type: "Expense", amount: -940 },
  { category: "Property taxes reserve", type: "Expense", amount: -1250 },
  { category: "Management overhead", type: "Expense", amount: -620 }
];

const legalDocuments = [
  { name: "Standard residential lease", status: "Active", owner: "All occupied units", renewal: "Review annually" },
  { name: "Move-in inspection form", status: "Ready", owner: "New renters", renewal: "At possession" },
  { name: "Late rent notice template", status: "Attorney review", owner: "Management", renewal: "Before use" },
  { name: "Maintenance access notice", status: "Ready", owner: "Management", renewal: "State-specific review" },
  { name: "Security deposit ledger", status: "Active", owner: "Accounting", renewal: "Monthly reconciliation" },
  { name: "Adverse action checklist", status: "Ready", owner: "Applications", renewal: "When screening rules change" }
];

const applicants = [
  {
    id: "APP-1042",
    name: "Avery Thompson",
    property: "Harbor View 3B",
    monthlyIncome: 7600,
    monthlyRent: 2450,
    moveInDate: "2026-07-15",
    consentReceived: true,
    status: "Ready for review",
    report: {
      creditScore: 721,
      coverageScope: "All 50 U.S. states",
      criminal: "Nationwide criminal background search completed across all 50 states. No reportable records found in demo search.",
      eviction: "Nationwide eviction and housing-court search completed across all 50 states. No eviction judgments found.",
      rentalHistory: "Multi-state rental history review completed. Positive landlord reference; no late rent reported.",
      income: "Income is 3.1x monthly rent.",
      identity: "Identity match confirmed.",
      risk: "Low"
    }
  },
  {
    id: "APP-1043",
    name: "Morgan Lee",
    property: "Harbor View 5A",
    monthlyIncome: 5200,
    monthlyRent: 2300,
    moveInDate: "2026-08-01",
    consentReceived: true,
    status: "Needs manager review",
    report: {
      creditScore: 646,
      coverageScope: "All 50 U.S. states",
      criminal: "Nationwide criminal background search completed across all 50 states. One older non-violent record flagged for individualized review.",
      eviction: "Nationwide eviction and housing-court search completed across all 50 states. Prior filing dismissed; no judgment shown.",
      rentalHistory: "Multi-state rental history review completed. One prior late payment disclosed by landlord reference.",
      income: "Income is 2.3x monthly rent.",
      identity: "Identity match confirmed.",
      risk: "Moderate"
    }
  },
  {
    id: "APP-1044",
    name: "Jordan Patel",
    property: "Harbor View 2C",
    monthlyIncome: 4300,
    monthlyRent: 2400,
    moveInDate: "2026-07-22",
    consentReceived: false,
    status: "Awaiting authorization",
    report: {
      creditScore: null,
      coverageScope: "All 50 U.S. states pending authorization",
      criminal: "Report not ordered until authorization is captured.",
      eviction: "Report not ordered until authorization is captured.",
      rentalHistory: "Reference pending.",
      income: "Income documents pending.",
      identity: "Identity pending.",
      risk: "Pending"
    }
  }
];

const stateCoverage = [
  { code: "AL", name: "Alabama", region: "South", restricted: false },
  { code: "AK", name: "Alaska", region: "West", restricted: false },
  { code: "AZ", name: "Arizona", region: "West", restricted: false },
  { code: "AR", name: "Arkansas", region: "South", restricted: false },
  { code: "CA", name: "California", region: "West", restricted: true },
  { code: "CO", name: "Colorado", region: "West", restricted: true },
  { code: "CT", name: "Connecticut", region: "Northeast", restricted: true },
  { code: "DE", name: "Delaware", region: "South", restricted: false },
  { code: "FL", name: "Florida", region: "South", restricted: false },
  { code: "GA", name: "Georgia", region: "South", restricted: false },
  { code: "HI", name: "Hawaii", region: "West", restricted: false },
  { code: "ID", name: "Idaho", region: "West", restricted: false },
  { code: "IL", name: "Illinois", region: "Midwest", restricted: true },
  { code: "IN", name: "Indiana", region: "Midwest", restricted: false },
  { code: "IA", name: "Iowa", region: "Midwest", restricted: false },
  { code: "KS", name: "Kansas", region: "Midwest", restricted: false },
  { code: "KY", name: "Kentucky", region: "South", restricted: false },
  { code: "LA", name: "Louisiana", region: "South", restricted: false },
  { code: "ME", name: "Maine", region: "Northeast", restricted: false },
  { code: "MD", name: "Maryland", region: "South", restricted: true },
  { code: "MA", name: "Massachusetts", region: "Northeast", restricted: true },
  { code: "MI", name: "Michigan", region: "Midwest", restricted: false },
  { code: "MN", name: "Minnesota", region: "Midwest", restricted: true },
  { code: "MS", name: "Mississippi", region: "South", restricted: false },
  { code: "MO", name: "Missouri", region: "Midwest", restricted: false },
  { code: "MT", name: "Montana", region: "West", restricted: false },
  { code: "NE", name: "Nebraska", region: "Midwest", restricted: false },
  { code: "NV", name: "Nevada", region: "West", restricted: false },
  { code: "NH", name: "New Hampshire", region: "Northeast", restricted: false },
  { code: "NJ", name: "New Jersey", region: "Northeast", restricted: true },
  { code: "NM", name: "New Mexico", region: "West", restricted: false },
  { code: "NY", name: "New York", region: "Northeast", restricted: true },
  { code: "NC", name: "North Carolina", region: "South", restricted: false },
  { code: "ND", name: "North Dakota", region: "Midwest", restricted: false },
  { code: "OH", name: "Ohio", region: "Midwest", restricted: false },
  { code: "OK", name: "Oklahoma", region: "South", restricted: false },
  { code: "OR", name: "Oregon", region: "West", restricted: true },
  { code: "PA", name: "Pennsylvania", region: "Northeast", restricted: false },
  { code: "RI", name: "Rhode Island", region: "Northeast", restricted: false },
  { code: "SC", name: "South Carolina", region: "South", restricted: false },
  { code: "SD", name: "South Dakota", region: "Midwest", restricted: false },
  { code: "TN", name: "Tennessee", region: "South", restricted: false },
  { code: "TX", name: "Texas", region: "South", restricted: false },
  { code: "UT", name: "Utah", region: "West", restricted: false },
  { code: "VT", name: "Vermont", region: "Northeast", restricted: false },
  { code: "VA", name: "Virginia", region: "South", restricted: false },
  { code: "WA", name: "Washington", region: "West", restricted: true },
  { code: "WV", name: "West Virginia", region: "South", restricted: false },
  { code: "WI", name: "Wisconsin", region: "Midwest", restricted: false },
  { code: "WY", name: "Wyoming", region: "West", restricted: false }
];

const screeningChecklist = [
  { title: "Applicant authorization", detail: "Capture written consent before ordering credit, criminal, eviction, or other consumer reports." },
  { title: "Identity verification", detail: "Confirm legal name, date of birth, address history, and fraud-risk signals through a secure provider." },
  { title: "Credit report review", detail: "Review score, trade lines, collections, bankruptcies, fraud alerts, and debt-to-income indicators." },
  { title: "Criminal background review", detail: "Search legally permitted nationwide criminal-record sources across all 50 states and route flagged results to individualized human review." },
  { title: "Eviction and court records", detail: "Search nationwide eviction and housing-court sources across all 50 states, separating dismissed filings from judgments." },
  { title: "Income verification", detail: "Validate pay stubs, bank data, tax forms, employer records, or verified income-provider results." },
  { title: "Rental history", detail: "Confirm prior addresses, lease compliance, landlord references, payment history, and damages across the applicant's state history." },
  { title: "All-state coverage review", detail: "Confirm every state was searched or document why a state was restricted, unavailable, or requires manual follow-up." },
  { title: "Adverse action", detail: "Prepare applicant notices when a consumer report contributes to denial or less favorable terms." }
];

const riskRank = { Pending: 0, Low: 1, Moderate: 2, Elevated: 3, High: 4 };
let activeRole = "landlord";
let activeSection = "landlord-dashboard";
let selectedApplicantId = applicants[0].id;
let sortByRisk = false;
const activeTenantId = "TEN-301";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
};

function activeTenant() {
  return tenants.find((tenant) => tenant.id === activeTenantId);
}

function getSelectedApplicant() {
  return applicants.find((applicant) => applicant.id === selectedApplicantId) || applicants[0];
}

function riskClassName(risk) {
  return `risk-${String(risk || "pending").toLowerCase()}`;
}

function stateStatusClassName(status) {
  return `state-status-${status.toLowerCase().replace(" ", "-")}`;
}

function paymentClassName(status) {
  return `payment-${status.toLowerCase()}`;
}

function updateRole(role) {
  activeRole = role;
  activeSection = role === "landlord" ? "landlord-dashboard" : "renter-home";

  document.querySelectorAll("[data-role-switch]").forEach((button) => {
    button.classList.toggle("active", button.dataset.roleSwitch === role);
  });

  document.querySelectorAll("[data-role-nav]").forEach((button) => {
    button.hidden = button.dataset.roleNav !== role;
  });

  document.querySelector(".landlord-only").hidden = role !== "landlord";
  document.querySelector(".renter-only").hidden = role !== "renter";
  document.querySelector("#activeAccountName").textContent = role === "landlord" ? "Harbor View Management" : activeTenant().name;
  document.querySelector("#activeAccountRole").textContent = role === "landlord" ? "Landlord account" : "Renter account";
  document.querySelector("#accountTypeSelect").value = role;
  document.querySelector("#accountNameInput").value = role === "landlord" ? "Harbor View Management" : activeTenant().name;

  switchSection(activeSection);
}

function switchSection(sectionName) {
  activeSection = sectionName;
  document.querySelectorAll(".navigation-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === sectionName);
  });

  document.querySelectorAll("[data-section-view]").forEach((panel) => {
    const visible = panel.dataset.sectionView.split(" ").includes(sectionName);
    panel.hidden = !visible;
  });

  const titles = {
    "landlord-dashboard": ["Landlord operations", "Portfolio Command Center"],
    properties: ["Property management", "Properties and Occupancy"],
    applications: ["Leasing pipeline", "Rental Applications"],
    screening: ["Tenant due diligence", "Nationwide Screening Center"],
    payments: ["Rent collection", "Payments and Balances"],
    maintenance: ["Service operations", "Maintenance Requests"],
    accounting: ["Financial operations", "Accounting and Profitability"],
    legal: ["Contract operations", "Lease and Legal Library"],
    "renter-home": ["Renter portal", "My Rental Account"],
    "renter-payments": ["Renter portal", "Pay Rent"],
    "renter-maintenance": ["Renter portal", "Maintenance Request"],
    "renter-documents": ["Renter portal", "My Documents"]
  };
  const [eyebrow, title] = titles[sectionName] || titles["landlord-dashboard"];
  document.querySelector("#workspaceEyebrow").textContent = eyebrow;
  document.querySelector("#workspaceTitle").textContent = title;
  document.querySelector("#primaryActionButton").textContent = activeRole === "landlord" ? "Record Payment" : "Pay Rent";
}

function updateMetrics() {
  const occupied = properties.filter((property) => property.status === "Occupied").length;
  const vacant = properties.length - occupied;
  const occupancyPercent = Math.round((occupied / properties.length) * 100);
  const collected = tenants.reduce((sum, tenant) => sum + (tenant.monthlyRent - tenant.balanceDue), 0);
  const outstanding = tenants.reduce((sum, tenant) => sum + tenant.balanceDue, 0);
  const expenses = accountingEntries.filter((entry) => entry.amount < 0).reduce((sum, entry) => sum + Math.abs(entry.amount), 0);
  const expectedIncome = tenants.reduce((sum, tenant) => sum + tenant.monthlyRent, 0);
  const noi = expectedIncome - expenses;
  const openMaintenance = maintenanceRequests.filter((request) => request.status !== "Completed").length;
  const tenant = activeTenant();

  document.querySelector("#occupancyMetric").textContent = `${occupancyPercent}%`;
  document.querySelector("#occupancyDetail").textContent = `${occupied} occupied, ${vacant} vacant`;
  document.querySelector("#collectedMetric").textContent = formatCurrency(collected);
  document.querySelector("#collectionDetail").textContent = `${tenants.filter((tenantRecord) => tenantRecord.balanceDue === 0).length} tenants paid in full`;
  document.querySelector("#outstandingMetric").textContent = formatCurrency(outstanding);
  document.querySelector("#noiMetric").textContent = formatCurrency(noi);
  document.querySelector("#maintenanceMetric").textContent = openMaintenance;
  document.querySelector("#vacancyPill").textContent = `${vacant} vacant`;
  document.querySelector("#latePaymentPill").textContent = `${tenants.filter((tenantRecord) => tenantRecord.paymentStatus !== "Paid").length} unpaid`;
  document.querySelector("#urgentMaintenancePill").textContent = `${maintenanceRequests.filter((request) => request.priority === "Urgent").length} urgent`;

  document.querySelector("#renterBalanceMetric").textContent = formatCurrency(tenant.balanceDue);
  document.querySelector("#renterDueDateMetric").textContent = `Due ${tenant.dueDate}`;
  document.querySelector("#renterLastPaymentMetric").textContent = formatCurrency(tenant.lastPaymentAmount);
  document.querySelector("#renterMaintenanceMetric").textContent = maintenanceRequests.filter((request) => request.tenantId === tenant.id && request.status !== "Completed").length;
  document.querySelector("#leaseEndMetric").textContent = tenant.leaseEnd;
  document.querySelector("#renterPaymentStatus").textContent = tenant.balanceDue > 0 ? "Balance due" : "Paid in full";
  document.querySelector("#rentPaymentAmountInput").value = tenant.balanceDue || tenant.monthlyRent;
}

function renderProperties() {
  document.querySelector("#propertyGrid").innerHTML = properties
    .map((property) => `
      <article class="property-card">
        <div>
          <p class="eyebrow">${property.id}</p>
          <h4>${property.name} ${property.unit}</h4>
          <span>${property.tenant}</span>
        </div>
        <div>
          <strong>${formatCurrency(property.rent)}</strong>
          <em class="${property.status === "Occupied" ? "state-status-clear" : "state-status-review"}">${property.status}</em>
        </div>
      </article>
    `)
    .join("");
}

function renderPayments() {
  document.querySelector("#paymentLedger").innerHTML = tenants
    .map((tenant) => `
      <article class="ledger-row">
        <div>
          <strong>${tenant.name}</strong>
          <span>Unit ${tenant.unit} · Due ${tenant.dueDate}</span>
        </div>
        <div>
          <strong>${formatCurrency(tenant.balanceDue)}</strong>
          <em class="${paymentClassName(tenant.paymentStatus)}">${tenant.paymentStatus}</em>
        </div>
      </article>
    `)
    .join("");
}

function renderMaintenance() {
  const listMarkup = maintenanceRequests
    .map((request) => `
      <article class="maintenance-row">
        <div>
          <strong>${request.category} · Unit ${request.unit}</strong>
          <span>${request.description}</span>
          <small>${request.tenant} · ${request.submitted}</small>
        </div>
        <div>
          <em class="${request.priority === "Urgent" ? "state-status-review" : "state-status-clear"}">${request.priority}</em>
          <small>${request.status}</small>
        </div>
      </article>
    `)
    .join("");

  const renterRequests = maintenanceRequests.filter((request) => request.tenantId === activeTenantId);
  document.querySelector("#landlordMaintenanceList").innerHTML = listMarkup;
  document.querySelector("#renterMaintenanceList").innerHTML = renterRequests
    .map((request) => `
      <article class="maintenance-row">
        <div>
          <strong>${request.category}</strong>
          <span>${request.description}</span>
          <small>${request.submitted}</small>
        </div>
        <div>
          <em class="${request.priority === "Urgent" ? "state-status-review" : "state-status-clear"}">${request.priority}</em>
          <small>${request.status}</small>
        </div>
      </article>
    `)
    .join("");
}

function renderAccounting() {
  const totalIncome = accountingEntries.filter((entry) => entry.amount > 0).reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = accountingEntries.filter((entry) => entry.amount < 0).reduce((sum, entry) => sum + Math.abs(entry.amount), 0);
  const net = totalIncome - totalExpenses;

  document.querySelector("#financeGrid").innerHTML = [
    ["Income", totalIncome],
    ["Expenses", totalExpenses],
    ["Net cash position", net],
    ["Receivables", tenants.reduce((sum, tenant) => sum + tenant.balanceDue, 0)]
  ]
    .map(([label, value]) => `<article><span>${label}</span><strong>${formatCurrency(value)}</strong></article>`)
    .join("");

  document.querySelector("#accountingTable").innerHTML = accountingEntries
    .map((entry) => `
      <div class="accounting-row">
        <span>${entry.category}</span>
        <small>${entry.type}</small>
        <strong>${formatCurrency(entry.amount)}</strong>
      </div>
    `)
    .join("");
}

function renderDocuments() {
  const documents = legalDocuments
    .map((documentItem) => `
      <article class="document-card">
        <p class="eyebrow">${documentItem.owner}</p>
        <h4>${documentItem.name}</h4>
        <span>${documentItem.renewal}</span>
        <em class="${documentItem.status === "Attorney review" ? "state-status-review" : "state-status-clear"}">${documentItem.status}</em>
      </article>
    `)
    .join("");

  document.querySelector("#documentGrid").innerHTML = documents;
  document.querySelector("#renterDocumentGrid").innerHTML = legalDocuments
    .filter((documentItem) => ["Standard residential lease", "Move-in inspection form", "Security deposit ledger"].includes(documentItem.name))
    .map((documentItem) => `
      <article class="document-card">
        <p class="eyebrow">${documentItem.owner}</p>
        <h4>${documentItem.name}</h4>
        <span>${documentItem.renewal}</span>
        <em class="state-status-clear">${documentItem.status}</em>
      </article>
    `)
    .join("");
}

function renderRenterOverview() {
  const tenant = activeTenant();
  document.querySelector("#renterUnitPill").textContent = `Unit ${tenant.unit}`;
  document.querySelector("#renterOverview").innerHTML = `
    <article>
      <span>Current home</span>
      <strong>Harbor View Residences ${tenant.unit}</strong>
    </article>
    <article>
      <span>Monthly rent</span>
      <strong>${formatCurrency(tenant.monthlyRent)}</strong>
    </article>
    <article>
      <span>Open balance</span>
      <strong>${formatCurrency(tenant.balanceDue)}</strong>
    </article>
    <article>
      <span>Lease end date</span>
      <strong>${tenant.leaseEnd}</strong>
    </article>
  `;
}

function renderApplicants() {
  const orderedApplicants = [...applicants].sort((first, second) => {
    if (!sortByRisk) return first.id.localeCompare(second.id);
    return riskRank[second.report.risk] - riskRank[first.report.risk];
  });

  document.querySelector("#applicantList").innerHTML = orderedApplicants
    .map((applicant) => `
      <button class="applicant-row ${applicant.id === selectedApplicantId ? "selected" : ""}" data-applicant-id="${applicant.id}" type="button">
        <span>
          <strong>${applicant.name}</strong>
          <small>${applicant.property} · ${applicant.id}</small>
        </span>
        <span class="risk-badge ${riskClassName(applicant.report.risk)}">${applicant.report.risk}</span>
      </button>
    `)
    .join("");
}

function renderChecklist() {
  document.querySelector("#checklistGrid").innerHTML = screeningChecklist
    .map((item) => `
      <article class="checklist-card">
        <div class="checkmark" aria-hidden="true"></div>
        <div>
          <h4>${item.title}</h4>
          <p>${item.detail}</p>
        </div>
      </article>
    `)
    .join("");
}

function getStateResult(state, applicant, coverageType) {
  if (!applicant.consentReceived) return "Pending";
  if (state.restricted) return "Rules noted";
  if (coverageType === "criminal" && applicant.report.risk === "Moderate" && ["IL", "NY", "CA"].includes(state.code)) return "Review";
  if (coverageType === "eviction" && applicant.report.risk === "Moderate" && ["GA", "TX"].includes(state.code)) return "Review";
  if (coverageType === "rental" && applicant.report.risk !== "Low" && ["FL", "NJ"].includes(state.code)) return "Review";
  return "Clear";
}

function renderStateCoverage() {
  const applicant = getSelectedApplicant();
  const coverageType = document.querySelector("#coverageTypeSelect").value;
  const searchTerm = document.querySelector("#stateSearchInput").value.trim().toLowerCase();
  const states = stateCoverage.filter((state) => state.name.toLowerCase().includes(searchTerm) || state.code.toLowerCase().includes(searchTerm));
  const allResults = stateCoverage.map((state) => getStateResult(state, applicant, coverageType));

  document.querySelector("#clearStatesMetric").textContent = allResults.filter((result) => result === "Clear").length;
  document.querySelector("#reviewStatesMetric").textContent = allResults.filter((result) => result === "Review").length;
  document.querySelector("#restrictedStatesMetric").textContent = allResults.filter((result) => result === "Rules noted").length;
  document.querySelector("#stateCoverageGrid").innerHTML = states
    .map((state) => {
      const result = getStateResult(state, applicant, coverageType);
      return `
        <article class="state-card">
          <div>
            <strong>${state.code}</strong>
            <span>${state.name}</span>
          </div>
          <small>${state.region}</small>
          <em class="${stateStatusClassName(result)}">${result}</em>
        </article>
      `;
    })
    .join("");
}

function renderApplicantDetails() {
  const applicant = getSelectedApplicant();
  document.querySelector("#selectedApplicantName").textContent = applicant.name;
  document.querySelector("#selectedApplicantStatus").textContent = applicant.status;
  document.querySelector("#applicantNameInput").value = applicant.name;
  document.querySelector("#monthlyIncomeInput").value = applicant.monthlyIncome;
  document.querySelector("#monthlyRentInput").value = applicant.monthlyRent;
  document.querySelector("#moveInDateInput").value = applicant.moveInDate;
  document.querySelector("#consentCheckbox").checked = applicant.consentReceived;

  document.querySelector("#reportSummary").innerHTML = `
    <div class="report-header">
      <div>
        <p class="eyebrow">Demo report summary</p>
        <h4>${applicant.id}</h4>
      </div>
      <span class="risk-badge ${riskClassName(applicant.report.risk)}">${applicant.report.risk}</span>
    </div>
    <dl class="report-grid">
      <div><dt>Search coverage</dt><dd>${applicant.report.coverageScope}</dd></div>
      <div><dt>Credit score</dt><dd>${applicant.report.creditScore || "Pending"}</dd></div>
      <div><dt>Identity</dt><dd>${applicant.report.identity}</dd></div>
      <div><dt>Income</dt><dd>${applicant.report.income}</dd></div>
      <div><dt>Criminal background</dt><dd>${applicant.report.criminal}</dd></div>
      <div><dt>Eviction records</dt><dd>${applicant.report.eviction}</dd></div>
      <div><dt>Rental history</dt><dd>${applicant.report.rentalHistory}</dd></div>
    </dl>
  `;
}

// This function keeps screening demo logic in one place so future provider API
// integrations can replace it without touching the rest of the portal.
function buildDemoReport(formData, consentReceived) {
  if (!consentReceived) {
    return {
      creditScore: null,
      coverageScope: "All 50 U.S. states pending authorization",
      identity: "Identity pending.",
      income: "Income verification pending.",
      criminal: "Report not ordered until authorization is captured.",
      eviction: "Report not ordered until authorization is captured.",
      rentalHistory: "Reference pending.",
      risk: "Pending"
    };
  }

  const incomeRatio = Number(formData.monthlyIncome) / Math.max(Number(formData.monthlyRent), 1);
  const creditScore = incomeRatio >= 3 ? 718 : incomeRatio >= 2.5 ? 672 : 618;
  const risk = incomeRatio >= 3 && creditScore >= 700 ? "Low" : incomeRatio >= 2.4 ? "Moderate" : "Elevated";

  return {
    creditScore,
    coverageScope: "All 50 U.S. states",
    identity: "Identity match confirmed by demo provider.",
    income: `Income is ${incomeRatio.toFixed(1)}x monthly rent.`,
    criminal: risk === "Elevated" ? "Nationwide criminal background search completed across all 50 states. Potential record requires individualized review." : "Nationwide criminal background search completed across all 50 states. No reportable records found in demo search.",
    eviction: risk === "Elevated" ? "Nationwide eviction and housing-court search completed across all 50 states. One prior housing-court filing requires review." : "Nationwide eviction and housing-court search completed across all 50 states. No eviction judgments found.",
    rentalHistory: risk === "Low" ? "Multi-state rental history review completed. Positive prior landlord reference." : "Multi-state rental history review completed. Prior landlord reference requires follow-up.",
    risk
  };
}

function handleScreeningSubmit(event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.currentTarget));
  const applicant = getSelectedApplicant();
  applicant.name = formData.fullName.trim() || applicant.name;
  applicant.monthlyIncome = Number(formData.monthlyIncome);
  applicant.monthlyRent = Number(formData.monthlyRent);
  applicant.moveInDate = formData.moveInDate;
  applicant.consentReceived = document.querySelector("#consentCheckbox").checked;
  applicant.status = applicant.consentReceived ? "Ready for review" : "Awaiting authorization";
  applicant.report = buildDemoReport(applicant, applicant.consentReceived);
  render();
}

function handleRentPayment(event) {
  event.preventDefault();
  const tenant = activeTenant();
  const amount = Math.min(Number(document.querySelector("#rentPaymentAmountInput").value), tenant.balanceDue || tenant.monthlyRent);
  tenant.balanceDue = Math.max(tenant.balanceDue - amount, 0);
  tenant.lastPaymentAmount = amount;
  tenant.lastPaymentDate = "2026-06-28";
  tenant.paymentStatus = tenant.balanceDue === 0 ? "Paid" : "Partial";
  document.querySelector("#renterPaymentReceipt").innerHTML = `<h4>Payment received</h4><p>${formatCurrency(amount)} was recorded for Unit ${tenant.unit}. The landlord ledger has been updated.</p>`;
  render();
}

function handleMaintenanceSubmit(event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.currentTarget));
  const tenant = activeTenant();
  maintenanceRequests.unshift({
    id: `MR-${7000 + maintenanceRequests.length + 1}`,
    tenantId: tenant.id,
    tenant: tenant.name,
    unit: tenant.unit,
    category: formData.category,
    priority: formData.priority,
    status: "Open",
    description: formData.description,
    submitted: "2026-06-28"
  });
  event.currentTarget.reset();
  render();
}

function prepareNoticeChecklist() {
  const applicant = getSelectedApplicant();
  const outcome = document.querySelector("#decisionOutcomeSelect").value;
  const factors = document.querySelector("#reportFactorsInput").value.trim();

  // Notices must be customized by jurisdiction and provider. This checklist
  // intentionally avoids pretending to be legal advice.
  document.querySelector("#noticeOutput").innerHTML = `
    <h4>Notice preparation checklist</h4>
    <ul>
      <li>Applicant: <strong>${applicant.name}</strong></li>
      <li>Decision: <strong>${outcome}</strong></li>
      <li>Confirm the consumer-reporting agency name, address, and phone number.</li>
      <li>Include the applicant's right to request a free copy of the report.</li>
      <li>Include the applicant's right to dispute inaccurate or incomplete information.</li>
      <li>Attach or reference report factors used: ${factors}</li>
      <li>Have management or counsel review before sending.</li>
    </ul>
  `;
}

function render() {
  updateMetrics();
  renderProperties();
  renderPayments();
  renderMaintenance();
  renderAccounting();
  renderDocuments();
  renderRenterOverview();
  renderApplicants();
  renderApplicantDetails();
  renderStateCoverage();
}

document.querySelector(".navigation-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-section]");
  if (button) switchSection(button.dataset.section);
});

document.querySelectorAll("[data-role-switch]").forEach((button) => {
  button.addEventListener("click", () => updateRole(button.dataset.roleSwitch));
});

document.querySelector("#accountForm").addEventListener("submit", (event) => {
  event.preventDefault();
  updateRole(document.querySelector("#accountTypeSelect").value);
});

document.querySelector("#applicantList").addEventListener("click", (event) => {
  const row = event.target.closest("[data-applicant-id]");
  if (!row) return;
  selectedApplicantId = row.dataset.applicantId;
  render();
});

document.querySelector("#sortApplicantsButton").addEventListener("click", () => {
  sortByRisk = !sortByRisk;
  renderApplicants();
});

document.querySelector("#generateNoticeButton").addEventListener("click", prepareNoticeChecklist);
document.querySelector("#primaryActionButton").addEventListener("click", () => switchSection(activeRole === "landlord" ? "payments" : "renter-payments"));
document.querySelector("#exportSummaryButton").addEventListener("click", () => window.print());
document.querySelector("#coverageTypeSelect").addEventListener("change", renderStateCoverage);
document.querySelector("#stateSearchInput").addEventListener("input", renderStateCoverage);
document.querySelector("#screeningForm").addEventListener("submit", handleScreeningSubmit);
document.querySelector("#rentPaymentForm").addEventListener("submit", handleRentPayment);
document.querySelector("#maintenanceRequestForm").addEventListener("submit", handleMaintenanceSubmit);

renderChecklist();
render();
updateRole("landlord");
