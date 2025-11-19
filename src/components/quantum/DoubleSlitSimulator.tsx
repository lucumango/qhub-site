import React from "react";

const SRC =
  "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_all.html";

export default function DoubleSlitSimulator() {
  return (
    <div
      style={{
        width: "51vw",
        margin: "0 auto",    // centrado
        aspectRatio: "16 / 9", // mantiene proporción
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
      }}
    >
      <iframe
        src={SRC}
        title="PhET Wave Interference"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
