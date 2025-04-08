const puppeteer = require("puppeteer");

async function fetchYemekListesi() {
  const url = "https://sks.iuc.edu.tr/tr/yemeklistesi";

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ]
    });

    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 }); // Bekleme stratejisini değiştiriyoruz

    // 🔁 Sayfanın yüklenmesini garantilemek için biraz bekle
    await new Promise(resolve => setTimeout(resolve, 2000));
 // 2 saniye bekletme

    // 🔁 DOM'da ilgili div gelene kadar bekle
    await page.waitForSelector(".col-sm-6.col-md-4.col-lg-3.ng-scope", { timeout: 10000 });

    const data = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".col-sm-6.col-md-4.col-lg-3.ng-scope"));
      const firstCard = cards[0];
      if (!firstCard) return { tarih: null, yemekler: [], kalori: null };

      const lines = firstCard.innerText
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const tarih = lines[0];
      const kaloriLine = lines.find(l => l.toLowerCase().includes("kalori"));
      const kalori = kaloriLine || null;
      const yemekler = lines.slice(1, kaloriLine ? lines.indexOf(kaloriLine) : lines.length);

      return {
        tarih,
        yemekler,
        kalori,
      };
    });

    await browser.close();
    return data;

  } catch (error) {
    console.error("Scraper Hatası:", error);
    return { tarih: null, yemekler: [], kalori: null };
  }
}

module.exports = fetchYemekListesi;
