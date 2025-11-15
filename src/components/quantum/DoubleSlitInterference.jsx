import React, { useState, useRef, useEffect } from "react";

const DoubleSlitInterference = () => {
  // Parámetros en unidades "humanas"
  const [slitDistanceMm, setSlitDistanceMm] = useState(1.0);     // d
  const [wavelengthNm, setWavelengthNm] = useState(500);         // λ
  const [screenDistanceCm, setScreenDistanceCm] = useState(60);  // L
  const [slitWidthUm, setSlitWidthUm] = useState(100);          // a

  const canvasRef = useRef(null);
  const width = 900;
  const height = 400;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // --- FÍSICA: cálculo del patrón ---
    const N = 800;                     // puntos en la pantalla
    const xMax = 0.005;                // ±5 mm en metros
    const intensities = new Array(N);

    // conversiones a SI
    const d = slitDistanceMm / 1000;   // m
    const L = screenDistanceCm / 100;  // m
    const a = slitWidthUm * 1e-6;      // m
    const lambda = wavelengthNm * 1e-9;// m

    let Imax = 0;

    for (let i = 0; i < N; i++) {
      const x = ((i / (N - 1)) * 2 - 1) * xMax; // [-xMax, xMax] (m)
      const theta = Math.atan2(x, L);           // ángulo exacto
      const sinTheta = Math.sin(theta);

      const beta = (Math.PI * a * sinTheta) / lambda;
      const delta = (Math.PI * d * sinTheta) / lambda;

      // evitar división por cero en (sinβ/β)
      const singleSlit =
        Math.abs(beta) < 1e-6 ? 1 : Math.pow(Math.sin(beta) / beta, 2);

      const doubleSlit = Math.pow(Math.cos(delta), 2);

      const I = singleSlit * doubleSlit;
      intensities[i] = I;
      if (I > Imax) Imax = I;
    }

    // normalizar a [0,1]
    for (let i = 0; i < N; i++) {
      intensities[i] = intensities[i] / (Imax || 1);
    }

    // --- DIBUJO ---
    const padding = 40;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;

    // fondo transparente
    ctx.clearRect(0, 0, width, height);

   

    // eje x
    ctx.strokeStyle = "#e9d5ff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    const yAxis = height - padding;
    ctx.moveTo(padding, yAxis);
    ctx.lineTo(width - padding, yAxis);
    ctx.stroke();

    // texto
    ctx.fillStyle = "#000000";
    ctx.font = "16px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    

    ctx.font = "12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Distancia desde el centro (m)", width / 2, height - 10);

    ctx.save();
    ctx.translate(18, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Intensidad (normalizada)", 0, 0);
    ctx.restore();

    // curva de intensidad
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const I = intensities[i];
      const xScreen = padding + (i / (N - 1)) * plotWidth;
      const yScreen = yAxis - I * plotHeight;

      if (i === 0) {
        ctx.moveTo(xScreen, yScreen);
      } else {
        ctx.lineTo(xScreen, yScreen);
      }
    }
    ctx.strokeStyle = "#a855f7"; // línea morada brillante
    ctx.lineWidth = 2;
    
    ctx.shadowBlur = 12;
    ctx.stroke();

    // quitar sombra para que no afecte otros elementos
    ctx.shadowBlur = 0;
  }, [slitDistanceMm, wavelengthNm, screenDistanceCm, slitWidthUm]);

  return (
    <div className="double-slit-wrapper">
      <div className="double-slit-card">
        <canvas ref={canvasRef} />

        <div className="double-slit-controls">
          <h2>Parámetros del experimento</h2>

          <div className="control-row">
            <label>
              Distancia entre rendijas:{" "}
              <span>{slitDistanceMm.toFixed(2)} mm</span>
            </label>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.02"
              value={slitDistanceMm}
              onChange={(e) => setSlitDistanceMm(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-row">
            <label>
              Longitud de onda: <span>{wavelengthNm.toFixed(0)} nm</span>
            </label>
            <input
              type="range"
              min="380"
              max="750"
              step="5"
              value={wavelengthNm}
              onChange={(e) => setWavelengthNm(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-row">
            <label>
              Distancia a la pantalla:{" "}
              <span>{screenDistanceCm.toFixed(1)} cm</span>
            </label>
            <input
              type="range"
              min="20"
              max="150"
              step="1"
              value={screenDistanceCm}
              onChange={(e) => setScreenDistanceCm(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-row">
            <label>
              Ancho de cada rendija:{" "}
              <span>{slitWidthUm.toFixed(0)} μm</span>
            </label>
            <input
              type="range"
              min="20"
              max="300"
              step="5"
              value={slitWidthUm}
              onChange={(e) => setSlitWidthUm(parseFloat(e.target.value))}
            />
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default DoubleSlitInterference;
