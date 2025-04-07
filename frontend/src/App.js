import React, { useState } from "react";
import mealData from "./data";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const currentMeal = mealData[index];

  const nextMeal = () => {
    if (index < mealData.length - 1) setIndex(index + 1);
  };

  const prevMeal = () => {
    if (index > 0) setIndex(index - 1);
  };

  const toggleMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <button className="toggle-btn" onClick={toggleMode}>
        {darkMode ? "☀️ Gündüz Modu" : "🌙 Gece Modu"}
      </button>
      <h1>{currentMeal.date}</h1>
      <div className="meal-card">
        {currentMeal.items.map((item, i) => (
          <div key={i} className="meal-item">
            {item}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={prevMeal}>← Geri</button>
        <button onClick={nextMeal}>İleri →</button>
      </div>
      <p className="footer">Ciğeristana 550 domalmak isterseniz tabi orası ayrı :)</p>
    </div>
  );
}

export default App;
