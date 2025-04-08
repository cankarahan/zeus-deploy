const express = require("express");
const cors = require("cors");
const fetchYemekListesi = require("./scraper");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend çalışıyor 🚀");
});

app.get("/yemekler", async (req, res) => {
  try {
    const result = await fetchYemekListesi();
    if (result && result.yemekler?.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Yemek verisi bulunamadı." });
    }
  } catch (err) {
    console.error("Hata:", err.message);
    res.status(500).json({ error: "İçerik alınamadı" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor.`));
