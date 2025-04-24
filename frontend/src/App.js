import React, { useState } from "react";
import mealData from "./data";
import "./App.css";

function App() {
  // İlk açılışta bugünün tarihine denk gelen index'i bul
  const [currentIndex, setCurrentIndex] = useState(() => {
    const today = new Date();
    const day   = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year  = today.getFullYear();
    const formatted = `${day}.${month}.${year}`;
    const idx = mealData.findIndex(item => item.date === formatted);
    return idx !== -1 ? idx : 0;
  });

  const handleNext = () => {
    if (currentIndex < mealData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleToday = () => {
    const today = new Date();
    const day   = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year  = today.getFullYear();
    const formatted = `${day}.${month}.${year}`;
    const idx = mealData.findIndex(item => item.date === formatted);
    if (idx !== -1) setCurrentIndex(idx);
  };

  const currentMeal = mealData[currentIndex];

  return (
    <div className="app">
      {currentMeal ? (
        <>
          <div className="date">{currentMeal.date}</div>
          <div className="meal-card">
            {currentMeal.items.slice(0, -1).map((item, i) => (
              <p className="meal-item" key={i}>{item}</p>
            ))}
            <p className="calories">{currentMeal.items.at(-1)}</p>
          </div>
          <div className="button-group">
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              ← Önceki
            </button>
            <button onClick={handleToday}>Bugün</button>
            <button
              onClick={handleNext}
              disabled={currentIndex === mealData.length - 1}
            >
              Sonraki →
            </button>
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
