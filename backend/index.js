const express = require("express");
const cors = require("cors");
const { getYemekListesi } = require("./scraper");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/yemekler", async (req, res) => {
  const { date } = req.query;

  const data = await getMeals(); // scraper.js fonksiyonu
  if (date === "all") {
    return res.json(data); // tüm ay verilerini döndür
  }

  if (date) {
    const result = data.find((d) => d.tarih === date);
    if (result) return res.json(result);
    return res.status(404).json({ message: "Tarih bulunamadı" });
  }

  // Bugünün tarihi
  const today = new Date();
  const formatted = today.toLocaleDateString("tr-TR").padStart(10, "0").replace(/\//g, ".");
  const todayMeal = data.find((d) => d.tarih === formatted);

  if (todayMeal) return res.json(todayMeal);
  return res.status(404).json({ message: "Bugün için veri bulunamadı" });
});


app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
