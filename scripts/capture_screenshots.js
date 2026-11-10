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
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // 1. Desktop 1440x900 - Home Page
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

  // Wait for intro to complete or skip it
  await page.evaluate(() => {
    sessionStorage.setItem('adecor_intro_seen', 'true');
  });
  await new Promise((r) => setTimeout(r, 2200));

  await page.screenshot({ path: path.join(outDir, '01_desktop_hero.png'), fullPage: false });
  console.log('Saved 01_desktop_hero.png');

  // Scroll to Curtain Color Changer
  await page.evaluate(() => {
    window.scrollBy(0, 1500);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '02_curtain_color_changer.png'), fullPage: false });
  console.log('Saved 02_curtain_color_changer.png');

  // Scroll to Roman Blind folding studio
  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '03_roman_blinds_interactive.png'), fullPage: false });
  console.log('Saved 03_roman_blinds_interactive.png');

  // Scroll to Sofa Refurbishing before/after
  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '04_sofa_refurbishing.png'), fullPage: false });
  console.log('Saved 04_sofa_refurbishing.png');

  // 2. Services Page
  await page.goto('http://127.0.0.1:5173/services', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '05_services_page.png'), fullPage: false });
  console.log('Saved 05_services_page.png');

  // 3. Curtain Styles Page (13 Pleats)
  await page.goto('http://127.0.0.1:5173/curtain-styles', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '06_curtain_styles.png'), fullPage: false });
  console.log('Saved 06_curtain_styles.png');

  // 4. Roman Blinds Page (12 Styles)
  await page.goto('http://127.0.0.1:5173/roman-blinds', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '07_roman_blinds_page.png'), fullPage: false });
  console.log('Saved 07_roman_blinds_page.png');

  // 5. Gallery Page
  await page.goto('http://127.0.0.1:5173/gallery', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '08_gallery_page.png'), fullPage: false });
  console.log('Saved 08_gallery_page.png');

  // 6. Clients Page
  await page.goto('http://127.0.0.1:5173/clients', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '09_clients_page.png'), fullPage: false });
  console.log('Saved 09_clients_page.png');

  // 7. Contact Page
  await page.goto('http://127.0.0.1:5173/contact', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '10_contact_page.png'), fullPage: false });
  console.log('Saved 10_contact_page.png');

  // 8. Mobile Viewport (390 x 844 iPhone 14)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '11_mobile_hero.png'), fullPage: false });
  console.log('Saved 11_mobile_hero.png');

  await browser.close();

  console.log('--- AUDIT REPORT ---');
  console.log('Console Errors Count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  } else {
    console.log('Clean build with ZERO runtime errors!');
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
