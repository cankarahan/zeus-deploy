import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(getTodayFormatted());
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  function getTodayFormatted() {
    const today = new Date();
    return today.toLocaleDateString("tr-TR");
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://zeus-deploy.onrender.com/yemekler?date=${currentDate}`);
        const data = await response.json();
        setMealData(data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setMealData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentDate]);

  const handleNext = () => {
    const [day, month, year] = currentDate.split(".").map(Number);
    const newDate = new Date(year, month - 1, day + 1);
    const formatted = newDate.toLocaleDateString("tr-TR");
    setCurrentDate(formatted);
  };

  const handlePrev = () => {
    const [day, month, year] = currentDate.split(".").map(Number);
    const newDate = new Date(year, month - 1, day - 1);
    const formatted = newDate.toLocaleDateString("tr-TR");
    setCurrentDate(formatted);
  };

  return (
    <div className="container">
      {loading ? (
        <p>Yükleniyor...</p>
      ) : mealData && mealData.tarih ? (
        <>
          <div className="date">{mealData.tarih}</div>
          <div className="card">
            {mealData.yemekler.map((item, index) => (
              <div className="meal-item" key={index}>{item}</div>
            ))}
          </div>
          <div className="button-group">
            <button onClick={handlePrev}>← Önceki</button>
            <button onClick={handleNext}>Sonraki →</button>
          </div>
        </>
      ) : (
        <p>Veri bulunamadı</p>
      )}
      <div className="note">Veriler: İstanbul Üniversitesi Yemek Listesi</div>
    </div>
  );
}

export default App;
