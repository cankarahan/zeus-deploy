import React, { useState } from "react";
import yemekListesi from "./data";

function App() {
  const [index, setIndex] = useState(0);
  const gun = yemekListesi[index];

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>{gun.tarih} - {gun.gun}</h2>
      <ul>
        {gun.icerik.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p><strong>{gun.kalori}</strong></p>

      <div>
        <button disabled={index === 0} onClick={() => setIndex(index - 1)}>◀ Geri</button>
        <button disabled={index === yemekListesi.length - 1} onClick={() => setIndex(index + 1)}>İleri ▶</button>
      </div>
    </div>
  );
}

export default App;
