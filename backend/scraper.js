const puppeteer = require('puppeteer');

async function fetchMeals() {
  const browser = await puppeteer.launch({
    headless: 'new', // headless:true de olur
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://sks.iuc.edu.tr/tr/yemeklistesi', { waitUntil: 'networkidle0' });

  const data = await page.evaluate(() => {
    const result = [];
    const cards = document.querySelectorAll('.col-sm-6.col-md-4.col-lg-3.ng-scope');
    
    cards.forEach(card => {
      const date = card.querySelector('b')?.innerText?.trim();
      const meals = Array.from(card.querySelectorAll('table tr:nth-child(n+2) td')).map(td => td.innerText.trim());
      const cal = meals.pop(); // en sondaki kalori bilgisini çıkar
      result.push({
        tarih: date,
        ogunler: meals,
        kalori: cal
      });
    });

    return result;
  });

  await browser.close();
  return data;
}

module.exports = fetchMeals;
