import React, { useState } from "react";
import mealData from "./data";

function App() {
  const [index, setIndex] = useState(0);

  const prevDay = () => {
    if (index > 0) setIndex(index - 1);
  };

  const nextDay = () => {
    if (index < mealData.length - 1) setIndex(index + 1);
  };

  const { date, items } = mealData[index];

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>{date}</h2>
      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px auto",
        width: "300px",
        borderRadius: "10px",
        background: "#f9f9f9"
      }}>
        {items.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
      <div>
        <button onClick={prevDay} disabled={index === 0}>← Geri</button>
        <button onClick={nextDay} disabled={index === mealData.length - 1}>İleri →</button>
      </div>
    </div>
  );
}

export default App;
