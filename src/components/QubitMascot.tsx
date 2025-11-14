export default function QubitMascot({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 120 120" className={className}>
      <defs>
        <radialGradient id="qg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FF6A00"/>
          <stop offset="60%" stopColor="#A855F7"/>
          <stop offset="100%" stopColor="#4C1D95"/>
        </radialGradient>
      </defs>
      {/* cuerpo */}
      <circle cx="60" cy="60" r="42" fill="url(#qg)">
        <animate attributeName="r" values="41;42;41" dur="2.2s" repeatCount="indefinite"/>
      </circle>
      {/* ojos */}
      <circle cx="45" cy="55" r="4" fill="white">
        <animate attributeName="r" values="4;4;1;4" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="75" cy="55" r="4" fill="white">
        <animate attributeName="r" values="4;4;1;4" dur="2.8s" repeatCount="indefinite" begin="0.1s"/>
      </circle>
      {/* sonrisa */}
      <path d="M45 72 C60 84, 60 84, 75 72" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* órbita */}
      <ellipse cx="60" cy="60" rx="46" ry="20" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="2">
        <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="10s" repeatCount="indefinite"/>
      </ellipse>
    </svg>
  );
}
