const puppeteer = require("puppeteer");

async function fetchYemekListesi() {
  const url = "https://sks.iuc.edu.tr/tr/yemeklistesi";
  const browser = await puppeteer.launch({
    headless: "new", // Headless mod için Render uyumlu yapı
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu"
    ]
  });
  
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  // Sayfa tamamen yüklendikten sonra tüm kartları seç
  const data = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll(".col-sm-6.col-md-4.col-lg-3.ng-scope"));
    
    // İlk kartı alalım (bugünün yemeği)
    const firstCard = cards[0];
    if (!firstCard) return [];

    const lines = firstCard.innerText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Dizi: [Tarih, Yemek1, Yemek2, ..., Kalori bilgisi]
    const tarih = lines[0];
    const kaloriSatiri = lines.find(l => l.toLowerCase().includes("kalori"));
    const kalori = kaloriSatiri ? kaloriSatiri : null;
    const yemekler = lines.slice(1, kalori ? lines.indexOf(kaloriSatiri) : lines.length);

    return {
      tarih,
      yemekler,
      kalori,
    };
  });

  await browser.close();
  return data;
}

module.exports = fetchYemekListesi;
