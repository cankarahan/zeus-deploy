const puppeteer = require("puppeteer");

async function scrapeYemekListesi() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto("https://sks.iuc.edu.tr/tr/yemeklistesi", {
      waitUntil: "networkidle2",
      timeout: 0,
    });

    // Bekleme: sayfa içindeki yemek kartlarını hedef al
    await page.waitForSelector(".menu-container");

    const data = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".menu-container"));
      return cards.map(card => {
        const date = card.querySelector("b")?.innerText?.trim();
        const meals = Array.from(card.querySelectorAll("tr"))
          .map(row => row.innerText.trim())
          .filter(text => text.length > 0);
        return { date, meals };
      });
    });

    await browser.close();
    return data;
  } catch (error) {
    console.error("Scraping Hatası:", error);
    return null;
  }
}

module.exports = scrapeYemekListesi;
