import React, { useState } from "react";
import mealData from "./data";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const { date, items } = mealData[index];

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex < mealData.length - 1 ? prevIndex + 1 : prevIndex));
  };

  return (
    <div className="container">
      <h1 className="date">{date}</h1>
      <div className="card">
        {items.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handlePrevious}>← Geri</button>
        <button onClick={handleNext}>İleri →</button>
      </div>
      <p className="footer">Ciğeristana 550 domalmak isterseniz tabi orası ayrı :)</p>
    </div>
  );
}

export default App;
