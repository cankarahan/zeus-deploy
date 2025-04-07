const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function scrapeMeals() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto("https://sks.iuc.edu.tr/tr/yemeklistesi", {
    waitUntil: "networkidle2",
  });

  const html = await page.content();
  const $ = cheerio.load(html);
  const meals = [];

  $(".yemekMenuListe .card").each((i, el) => {
    const date = $(el).find(".card-header").text().trim();
    const items = [];
    $(el).find(".list-group-item").each((j, item) => {
      items.push($(item).text().trim());
    });

    meals.push({ date, items });
  });

  await browser.close();
  return meals;
}

module.exports = scrapeMeals;
