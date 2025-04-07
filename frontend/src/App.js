// frontend/src/App.js
import React, { useState } from "react";
import mealData from "./data";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMeal = mealData[currentIndex];

  const nextMeal = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mealData.length);
  };

  const prevMeal = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + mealData.length) % mealData.length
    );
  };

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <button className="toggle-theme" onClick={toggleDarkMode}>
        {darkMode ? "Gündüz Modu" : "Gece Modu"}
      </button>

      <h1 className="date-title">{currentMeal.date}</h1>
      <div className="meal-card">
        {currentMeal.items.map((item, index) => (
          <div key={index} className="meal-item">
            {item}
          </div>
        ))}
      </div>

      <div className="button-container">
        <button onClick={prevMeal} className="nav-button">&#8592; Geri</button>
        <button onClick={nextMeal} className="nav-button">İleri &#8594;</button>
      </div>

      <p className="footer-text">Ciğeristana 550 domalmak isterseniz tabi orası ayrı :)</p>
    </div>
  );
}

export default App;
