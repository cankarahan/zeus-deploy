import React, { useState } from "react";
import mealData from "./data";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % mealData.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? mealData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`container`}>
      <button onClick={toggleMode} style={{ marginBottom: "20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer", fontWeight: "bold" }}>
        {darkMode ? "🌞 Gündüz Modu" : "🌙 Gece Modu"}
      </button>

      <div className="date">{mealData[index].date}</div>

      <div className="card">
        {mealData[index].items.map((item, i) => (
          <div key={i} className="meal-item">{item}</div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={handlePrev}>← Geri</button>
        <button onClick={handleNext}>İleri →</button>
      </div>

      <div className="note">Ciğeristana 550 domalmak isterseniz tabi orası ayrı :)</div>
    </div>
  );
}

export default App;
