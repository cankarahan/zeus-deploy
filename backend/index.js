const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/yemekler', async (req, res) => {
  try {
    const response = await axios.get('https://sks.iuc.edu.tr/tr/yemeklistesi');
    const $ = cheerio.load(response.data);
    const yemekler = [];

    $('.col-sm-6.col-md-4.col-lg-3.ng-scope').each((i, elem) => {
      const date = $(elem).find('b').text().trim();
      const meals = [];
      $(elem).find('table tr').each((j, row) => {
        const txt = $(row).text().trim();
        if (txt && !txt.includes('.2025') && !txt.includes('Kalori')) {
          meals.push(txt);
        }
      });
      if (date && meals.length) {
        yemekler.push({ tarih: date, ogun: meals });
      }
    });

    res.json({ yemekler });
  } catch (error) {
    console.error('Scraping hatası:', error.message);
    res.status(500).json({ error: 'Veri çekilemedi' });
  }
});

app.listen(PORT, () => {
  console.log(`API ${PORT} portunda çalışıyor`);
});
