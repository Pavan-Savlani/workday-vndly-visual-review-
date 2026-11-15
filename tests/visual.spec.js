// Visual regression suite for the VNDLY demo pages.
// First run creates the baselines in Eyes; later runs compare against them.
const { test } = require('@playwright/test');
const {
  Eyes, ClassicRunner, Target, MatchLevel, BatchInfo, Configuration,
  AccessibilityLevel, AccessibilityGuidelinesVersion,
} = require('@applitools/eyes-playwright');
const pages = require('./pages');

const runner = new ClassicRunner();
const batch = new BatchInfo(process.env.EYES_BATCH_NAME || 'VNDLY Nightly Regression');
if (process.env.EYES_BATCH_ID) batch.setId(process.env.EYES_BATCH_ID);

test.afterAll(async () => {
  const summary = await runner.getAllTestResults(false);
  const out = [];
  for (const c of summary.getAllResults()) {
    const r = c.getTestResults();
    if (!r) continue;
    const width = r.getHostDisplaySize().getWidth();
    console.log(`${r.getName().padEnd(32)} ${String(width).padStart(4)}px  ${r.getStatus()}${r.getIsNew() ? ' (new baseline)' : ''}  ${r.getUrl()}`);
    out.push({ name: r.getName(), width, status: r.getStatus(), isNew: r.getIsNew(), mismatches: r.getMismatches(), url: r.getUrl().replace('/app/batches/', '/app/test-results/') });
  }
  // Consumed by the AI reviewer in CI.
  const batchUrl = out[0] ? out[0].url.replace(/\/app\/test-results\/(\d+)\/\d+/, '/app/test-results/$1') : null;
  require('fs').writeFileSync('eyes-results.json', JSON.stringify({ batchName: batch.getName(), batchUrl, sessions: out }, null, 2));
});

for (const p of pages) {
  test(`${p.name} @ ${p.viewport.width}`, async ({ page }) => {
    if (!process.env.APPLITOOLS_API_KEY) throw new Error('APPLITOOLS_API_KEY is not set (.env)');
    const eyes = new Eyes(runner);
    const config = new Configuration();
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    config.setBatch(batch);
    config.setMatchLevel(MatchLevel.Strict);
    config.setAccessibilityValidation({ level: AccessibilityLevel.AA, guidelinesVersion: AccessibilityGuidelinesVersion.WCAG_2_1 });
    if (process.env.EYES_BRANCH) config.setBranchName(process.env.EYES_BRANCH);
    eyes.setConfiguration(config);

    try {
      await eyes.open(page, 'Workday VNDLY', p.name, p.viewport);
      await page.goto('/' + p.path);
      await page.waitForFunction(() => window.__ready === true);
      const target = p.region ? Target.region(p.region) : Target.window().fully();
      await eyes.check(p.name, target);
      await eyes.close(false);
    } finally {
      await eyes.abortAsync();
    }
  });
}
