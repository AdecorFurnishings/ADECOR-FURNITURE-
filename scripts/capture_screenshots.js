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

  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('adecor_intro_seen', 'true');
  });

  // 1. Home page: 5 Core Furnishings
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent && h.textContent.includes('Bespoke Furnishings'))?.closest('section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '05_core_furnishings_5_items.png') });
  console.log('Saved 05_core_furnishings_5_items.png');

  // 2. Sofa Refurbishing (no 4 steps, no complimentary pickup, Schedule Inspection)
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent && h.textContent.includes('Sofa Refurbishing'))?.closest('section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '06_sofa_clean_no_steps.png') });
  console.log('Saved 06_sofa_clean_no_steps.png');

  // 3. Home Portfolio Works
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent && h.textContent.includes('Portfolio Works'))?.closest('section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '07_home_portfolio_works.png') });
  console.log('Saved 07_home_portfolio_works.png');

  // 4. Roman Blind Folding Studio
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent && h.textContent.includes('Roman Blind Folding Studio'))?.closest('section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '08_roman_blind_folding_studio.png') });
  console.log('Saved 08_roman_blind_folding_studio.png');

  // 5. Gallery Page (Portfolio Works, bold names alone)
  await page.goto('http://127.0.0.1:5173/gallery', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '09_gallery_page_portfolio_works.png') });
  console.log('Saved 09_gallery_page_portfolio_works.png');

  // 6. Curtain Styles Page (13 styles in HD)
  await page.goto('http://127.0.0.1:5173/curtain-styles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '10_curtain_styles_hd.png') });
  console.log('Saved 10_curtain_styles_hd.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
