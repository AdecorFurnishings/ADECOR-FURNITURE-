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

  // 1. Capture the new cinematic intro loader in progress
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '00_new_cinematic_intro.png') });
  console.log('Saved 00_new_cinematic_intro.png');

  // Wait for intro to finish parting and curtains to auto-reveal
  await new Promise(r => setTimeout(r, 3500));
  await page.screenshot({ path: path.join(outDir, '01_new_hero_curtains_hd.png') });
  console.log('Saved 01_new_hero_curtains_hd.png');

  // Hover over the left curtain to test pointer chameleon color cycling
  await page.hover('section div[title*="cycle vibrant curtain fabrics"]');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '01b_hero_curtain_hover_color.png') });
  console.log('Saved 01b_hero_curtain_hover_color.png');

  // Scroll down to Services with HD photos
  await page.evaluate(() => window.scrollBy(0, 1100));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '02_new_services_hd.png') });
  console.log('Saved 02_new_services_hd.png');

  // Scroll down to Sofa Refurbishing & Nordic Soft Furnishings
  await page.evaluate(() => window.scrollBy(0, 2200));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '03_new_sofa_and_furnishings.png') });
  console.log('Saved 03_new_sofa_and_furnishings.png');

  await browser.close();
  console.log('All updated screenshots captured successfully!');
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
