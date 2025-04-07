const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Backend API çalışıyor 💪');
});

app.get('/yemekler', async (req, res) => {
  try {
    const response = await axios.get('https://sks.iuc.edu.tr/tr/yemeklistesi');
    const html = response.data;
    const $ = cheerio.load(html);
    const yemekler = [];

    $('.col-sm-6.col-md-4.col-lg-3.ng-scope').each((i, el) => {
      const tarih = $(el).find('b').text().trim();
      const liste = [];

      $(el).find('table tr').each((j, row) => {
        const text = $(row).text().trim();
        if (text && !text.includes(tarih)) {
          liste.push(text);
        }
      });

      if (tarih && liste.length > 0) {
        yemekler.push({ tarih, liste });
      }
    });

    res.json({ yemekler });
  } catch (error) {
    console.error('HATA:', error.message);
    res.status(500).send('Veri alınamadı.');
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
