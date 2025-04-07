const express = require("express");
const cors = require("cors");
const scraper = require("./scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/yemekler", async (req, res) => {
  try {
    const data = await scraper();
    res.json(data);
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
