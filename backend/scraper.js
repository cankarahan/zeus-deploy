const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function getYemekListesi(istenenTarihStr) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://sks.iuc.edu.tr/tr/yemeklistesi', { waitUntil: 'networkidle0' });

  const yemekler = await page.$$eval('.col-sm-6.col-md-4.col-lg-3.ng-scope', (cards, istenenTarihStr) => {
    const data = [];

    for (let card of cards) {
      const tarih = card.querySelector('.panel-heading')?.innerText.trim();
      const icerik = Array.from(card.querySelectorAll('.panel-body p'))
                          .map(p => p.innerText.trim())
                          .filter(x => x);

      if (tarih && icerik.length > 0) {
        data.push({
          tarih,
          yemekler: icerik.slice(0, -1),
          kalori: icerik[icerik.length - 1]
        });
      }
    }

    if (istenenTarihStr) {
      const result = data.find(item => item.tarih === istenenTarihStr);
      return result || null;
    }

    return data;
  }, istenenTarihStr);

  await browser.close();
  return yemekler;
}


module.exports = { getYemekListesi };
