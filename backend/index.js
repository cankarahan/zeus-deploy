const express = require("express");
const cors = require("cors");
const fetchYemekListesi = require("./scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/yemekler", async (req, res) => {
  try {
    const yemekData = await fetchYemekListesi();
    res.json(yemekData);
  } catch (error) {
    console.error("API Hatası:", error);
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

app.get("/", (req, res) => {
  res.send("Zeus Yemek API çalışıyor 🍽️");
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
