const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');


async function scrapeYemekler() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  });
  
  const page = await browser.newPage();
  await page.goto('https://sks.iuc.edu.tr/tr/yemeklistesi', { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    const gunlukKartlar = document.querySelectorAll('.col-sm-6.col-md-4.col-lg-3.ng-scope');

    const yemekler = Array.from(gunlukKartlar).map(kart => {
      const tarih = kart.querySelector('b')?.innerText.trim();
      const satirlar = kart.querySelectorAll('td');
      const detaylar = Array.from(satirlar).map(s => s.innerText.trim()).filter(s => s !== '');

      return {
        tarih,
        detaylar
      };
    });

    return yemekler;
  });

  await browser.close();
  return result;
}

module.exports = scrapeYemekler;
