import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [allMeals, setAllMeals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://zeus-deploy.onrender.com/yemekler');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setAllMeals(data);

          // Tarih karşılaştırmasıyla bugünkü indexi bul:
          const today = new Date().toLocaleDateString('tr-TR');
          const foundIndex = data.findIndex((item) => item.tarih === today);
          setCurrentIndex(foundIndex !== -1 ? foundIndex : 0);
        }
      } catch (err) {
        console.error('Veri alınamadı:', err);
      }
    };

    fetchMeals();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, allMeals.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleToday = () => {
    const today = new Date().toLocaleDateString('tr-TR');
    const todayIndex = allMeals.findIndex((item) => item.tarih === today);
    if (todayIndex !== -1) {
      setCurrentIndex(todayIndex);
    }
  };

  const currentMeal = allMeals[currentIndex];

  return (
    <div className="app">
      <h1>İstanbul Üniversitesi Yemek Menüsü</h1>

      {currentMeal ? (
        <div className="meal-card">
          <p><strong>{currentMeal.tarih}</strong></p>
          {currentMeal.yemekler.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
          <p><strong>{currentMeal.kalori}</strong></p>
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}

      <div className="button-group">
        <button onClick={handlePrev} disabled={currentIndex === 0}>← Önceki</button>
        <button onClick={handleToday}>🎯 Bugün</button>
        <button onClick={handleNext} disabled={currentIndex === allMeals.length - 1}>Sonraki →</button>
      </div>

      <div className="note">Veriler: İstanbul Üniversitesi Yemek Listesi</div>
    </div>
  );
}

export default App;
