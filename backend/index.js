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

    let yemekler = [];

    $('.yemekListesi .col-md-1, .yemekListesi .col-md-3').each((i, el) => {
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text) yemekler.push(text);
    });

    res.json({ yemekler });

  } catch (error) {
    console.error('Scrape hatası:', error);
    res.status(500).json({ message: 'Veri çekilemedi' });
  }
});

app.listen(PORT, () => {
  console.log(`Scraper API http://localhost:${PORT} adresinde çalışıyor`);
});
