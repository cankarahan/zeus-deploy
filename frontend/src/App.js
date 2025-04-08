import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mealData, setMealData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/yemekler"); // Render'daysa URL'yi değiştir
        const data = await response.json();
        console.log("API'den gelen veri:", data);
  
        if (data && data.tarih) {
          setTarih(data.tarih);
          setYemekler(data.yemekler || []);
          setKalori(data.kalori || "");
        } else {
          console.error("Veri beklenilen formatta değil:", data);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < mealData.length - 1 ? prev + 1 : prev));
  };

  const currentMeal = mealData[currentIndex];

  return (
    <div className="container">
      {currentMeal ? (
        <>
          <div className="date">{currentMeal.date}</div>
          <div className="card">
            {currentMeal.items.map((item, index) => (
              <div className="meal-item" key={index}>{item}</div>
            ))}
          </div>
          <div className="button-group">
            <button onClick={handlePrev} disabled={currentIndex === 0}>← Önceki</button>
            <button onClick={handleNext} disabled={currentIndex === mealData.length - 1}>Sonraki →</button>
          </div>
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}
      <div className="note">Veriler: İstanbul Üniversitesi Yemek Listesi</div>
    </div>
  );
}

export default App;
