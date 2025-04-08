const puppeteer = require("puppeteer");

async function fetchYemekListesi(targetDate) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://sks.iuc.edu.tr/tr/yemeklistesi", { waitUntil: "domcontentloaded" });

  await page.waitForSelector(".col-sm-6.col-md-4.col-lg-3.ng-scope");

  const data = await page.evaluate((targetDate) => {
    const allCards = document.querySelectorAll(".col-sm-6.col-md-4.col-lg-3.ng-scope");

    let result = {
      tarih: null,
      yemekler: [],
      kalori: null
    };

    allCards.forEach(card => {
      const dateText = card.querySelector("b")?.textContent.trim();
      if (dateText === targetDate) {
        const items = Array.from(card.querySelectorAll("td")).map(td => td.textContent.trim()).filter(Boolean);

        result.tarih = dateText;
        result.yemekler = items.slice(0, -1);
        result.kalori = items[items.length - 1];
      }
    });

    return result;
  }, targetDate);

  await browser.close();
  return data;
}


module.exports = fetchYemekListesi;
