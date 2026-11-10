import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public/norda_inspection');
fs.mkdirSync(outDir, { recursive: true });

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to NORDA demo...');
  await page.goto('https://demo.codeandchill.store/norda/', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  // Extract page metadata, title, headings, styles, and image sources
  const data = await page.evaluate(() => {
    const title = document.title;
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, p.subtitle, .hero-title')).map(h => h.innerText.trim()).filter(Boolean);
    const fonts = Array.from(document.fonts || []).map(f => f.family);
    
    // Extract images
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
    }));

    // Extract color scheme or key CSS variables
    const bodyStyles = window.getComputedStyle(document.body);
    const bg = bodyStyles.backgroundColor;
    const color = bodyStyles.color;
    const fontFamily = bodyStyles.fontFamily;

    return { title, headings, fonts, images: images.slice(0, 20), bg, color, fontFamily };
  });

  fs.writeFileSync(path.join(outDir, 'data.json'), JSON.stringify(data, null, 2));
  console.log('Extracted Data:', data);

  // Take full page and viewport screenshots
  await page.screenshot({ path: path.join(outDir, 'norda_desktop_hero.png'), fullPage: false });
  console.log('Saved norda_desktop_hero.png');

  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'norda_desktop_scroll.png'), fullPage: false });
  console.log('Saved norda_desktop_scroll.png');

  await browser.close();
}

inspect().catch(e => {
  console.error('Inspection error:', e);
  process.exit(1);
});
