// Pages and viewports under visual test. Viewports match the reference screenshots.
module.exports = [
  { name: 'Expense Report',               path: 'expense-report.html',            viewport: { width: 1024, height: 768 } },
  { name: 'Expenses & Adjustments',       path: 'expenses.html',                  viewport: { width: 1440, height: 900 } },
  { name: 'Request for Proposals',        path: 'rfp-list.html',                  viewport: { width: 1024, height: 768 } },
  { name: 'Create Request for Proposal',  path: 'rfp-create.html',                viewport: { width: 600,  height: 900 } },
  { name: 'RFP Detail - Draft',           path: 'rfp-draft.html',                 viewport: { width: 700,  height: 900 } },
  { name: 'RFP Detail - Sourcing',        path: 'rfp-sourcing.html',              viewport: { width: 700,  height: 900 } },
  { name: 'Add Expense Modal',            path: 'modal-add-expense.html',         viewport: { width: 600,  height: 700 }, region: '.modal' },
  { name: 'Add Distance Expense Modal',   path: 'modal-add-distance-expense.html',viewport: { width: 600,  height: 700 }, region: '.modal' },
  { name: 'Add Vendors Modal',            path: 'modal-add-vendors.html',         viewport: { width: 600,  height: 500 }, region: '.modal' },
  { name: 'Add Vendors Modal',            path: 'modal-add-vendors.html',         viewport: { width: 400,  height: 500 }, region: '.modal' },
];
