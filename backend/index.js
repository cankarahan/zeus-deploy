const express = require("express");
const cors = require("cors");
const { ayinYemekListesiniGetir } = require("./scraper");

const app = express();
const port = 3000;

app.use(cors());

let aylikVeri = [];

(async () => {
  try {
    aylikVeri = await ayinYemekListesiniGetir();
    console.log("Ay verisi başarıyla yüklendi.");
  } catch (err) {
    console.error("Scraper Hatası:", err);
  }
})();

app.get("/yemekler", (req, res) => {
  const date = req.query.date;
  if (!date) return res.status(400).json({ error: "Tarih belirtilmedi" });

  const sonuc = aylikVeri.find((v) => v.tarih === date);
  if (sonuc) {
    res.json(sonuc);
  } else {
    res.status(404).json({ error: "İçerik bulunamadı" });
  }
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
