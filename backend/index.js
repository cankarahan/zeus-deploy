const express = require("express");
const cors = require("cors");
const fetchYemekListesi = require("./scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/yemekler', async (req, res) => {
  try {
    const tarih = req.query.date;
    if (!tarih) {
      return res.status(400).json({ error: "Tarih parametresi gerekli. /yemekler?date=YYYY-MM-DD" });
    }

    const veri = await fetchYemekListesi(tarih); // scraper.js içindeki fonksiyon
    res.json(veri);
  } catch (error) {
    console.error("Sunucu Hatası:", error);
    res.status(500).json({ error: "İçerik alınamadı" });
  }
});


app.get("/", (req, res) => {
  res.send("Zeus Yemek API çalışıyor 🍽️");
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
