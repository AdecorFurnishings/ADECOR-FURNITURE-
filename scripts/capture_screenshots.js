import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public/screenshots');
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Mark intro loader as seen in sessionStorage before loading so we test curtains directly without intro wait
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('adecor_intro_seen', 'true');
  });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
  
  // 2. Curtains start 100% fully closed (wait 400ms for initial render)
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '01_curtains_fully_closed.png') });
  console.log('Saved 01_curtains_fully_closed.png');

  // 3. Wait for curtains to smoothly draw apart (1200ms delay + 2200ms transition = 3400ms)
  await new Promise(r => setTimeout(r, 3800));
  await page.screenshot({ path: path.join(outDir, '02_curtains_drawn_open.png') });
  console.log('Saved 02_curtains_drawn_open.png');

  // 4. Hover over the left curtain to test pointer fabric color cycling
  try {
    const curtain = await page.$('div[title*="cycle vibrant"]');
    if (curtain) {
      await curtain.hover();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: path.join(outDir, '03_curtains_color_hover.png') });
      console.log('Saved 03_curtains_color_hover.png');
    }
  } catch (err) {
    console.log('Hover skip:', err.message);
  }

  // 5. Scroll down to Sofa Refurbishing (bad quality before vs luxury after)
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent && h.textContent.includes('Sofa'))?.closest('section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '04_sofa_bad_before_vs_luxury_after.png') });
  console.log('Saved 04_sofa_bad_before_vs_luxury_after.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
