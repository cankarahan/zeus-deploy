const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function ayinYemekListesiniGetir() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://sks.iuc.edu.tr/tr/yemeklistesi", { waitUntil: "networkidle0" });
  const content = await page.content();
  await browser.close();

  const $ = cheerio.load(content);
  const yemekVerisi = [];

  $(".yemek-listesi div.accordion-item").each((_, elem) => {
    const tarih = $(elem).find("h2 button").text().trim().split(" - ")[0];
    const yemekler = [];
    $(elem).find("ul li").each((_, li) => {
      yemekler.push($(li).text().trim());
    });

    const kalori = $(elem).find(".kalori").text().trim() || "Kalori";
    yemekVerisi.push({ tarih, yemekler, kalori });
  });

  return yemekVerisi;
}

module.exports = { ayinYemekListesiniGetir };
