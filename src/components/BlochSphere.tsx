import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";


/* --------------------------- Tipos y utilidades --------------------------- */

type Complex = { re: number; im: number };

type QubitState = {
  alpha: Complex;
  beta: Complex;
};

type Vec3 = { x: number; y: number; z: number };
type GateKey = "X" | "Y" | "Z" | "H" | "T";
type BlochPath = Vec3[];

// --------------------------------------------------------------------------
// Complejos
// --------------------------------------------------------------------------
const c = (re: number, im: number = 0): Complex => ({ re, im });

const cAdd = (a: Complex, b: Complex): Complex => ({
  re: a.re + b.re,
  im: a.im + b.im,
});

const cMul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});

const cScale = (a: Complex, k: number): Complex => ({
  re: a.re * k,
  im: a.im * k,
});

const cAbs2 = (a: Complex): number => a.re * a.re + a.im * a.im;

const cConj = (a: Complex): Complex => ({ re: a.re, im: -a.im });

const normalizeState = (state: QubitState): QubitState => {
  const norm2 = cAbs2(state.alpha) + cAbs2(state.beta);
  if (norm2 === 0) {
    return { alpha: c(1, 0), beta: c(0, 0) };
  }
  const inv = 1 / Math.sqrt(norm2);
  return {
    alpha: cScale(state.alpha, inv),
    beta: cScale(state.beta, inv),
  };
};

/* --------------------------- Compuertas 1-qubit --------------------------- */

type GateMatrix = [[Complex, Complex], [Complex, Complex]];

const SQRT1_2 = Math.SQRT1_2;
const PHASE_T: Complex = c(SQRT1_2, SQRT1_2);

const GATES: Record<GateKey, GateMatrix> = {
  X: [
    [c(0, 0), c(1, 0)],
    [c(1, 0), c(0, 0)],
  ],
  Y: [
    [c(0, 0), c(0, -1)],
    [c(0, 1), c(0, 0)],
  ],
  Z: [
    [c(1, 0), c(0, 0)],
    [c(0, 0), c(-1, 0)],
  ],
  H: [
    [c(SQRT1_2, 0), c(SQRT1_2, 0)],
    [c(SQRT1_2, 0), c(-SQRT1_2, 0)],
  ],
  T: [
    [c(1, 0), c(0, 0)],
    [c(0, 0), PHASE_T],
  ],
};

// 💡 Leyenda compacta: ángulo + eje + efecto visual
type GateInfo = {
  name: string;
  angle: string;
  axis: string;
  motion: string;
  tip: string;
};

const gateLegend: Record<GateKey, GateInfo> = {
  X: {
    name: "Pauli-X",
    angle: "180° (π)",
    axis: "Eje X",
    motion: "Media vuelta que intercambia polo norte y sur.",
    tip: "Equivale a un NOT: |0⟩ ↔ |1⟩.",
  },
  Y: {
    name: "Pauli-Y",
    angle: "180° (π)",
    axis: "Eje Y",
    motion: "Media vuelta en el plano X–Z.",
    tip: "Cambia amplitud y fase a la vez.",
  },
  Z: {
    name: "Pauli-Z",
    angle: "180° (π)",
    axis: "Eje Z",
    motion: "Gira alrededor de Z sin cambiar la altura.",
    tip: "Solo modifica la fase del estado.",
  },
  H: {
    name: "Hadamard (H)",
    angle: "≈90° combinada",
    axis: "Ejes X y Z",
    motion: "Lleva polos al ecuador y viceversa.",
    tip: "Crea superposiciones equilibradas.",
  },
  T: {
    name: "Puerta T",
    angle: "45° (π/4)",
    axis: "Eje Z",
    motion: "Pequeño giro alrededor de Z.",
    tip: "Añade una fase suave paso a paso.",
  },
};

const applyGate = (state: QubitState, gate: GateMatrix): QubitState => {
  const { alpha, beta } = state;
  const [[g00, g01], [g10, g11]] = gate;

  const alphaNew = cAdd(cMul(g00, alpha), cMul(g01, beta));
  const betaNew = cAdd(cMul(g10, alpha), cMul(g11, beta));

  return normalizeState({ alpha: alphaNew, beta: betaNew });
};

/* -------------------- Estado → vector de Bloch (x,y,z) -------------------- */

const stateToBloch = (state: QubitState): Vec3 => {
  const s = normalizeState(state);
  const a = s.alpha;
  const b = s.beta;

  const aConj = cConj(a);
  const aConj_b = cMul(aConj, b);

  const x = 2 * aConj_b.re;
  const y = 2 * aConj_b.im;
  const z = cAbs2(a) - cAbs2(b);

  return { x, y, z };
};

// mapeo Bloch->mundo (para que |0⟩ esté “arriba”)
const blochToWorld = (v: Vec3): Vec3 => ({
  x: v.x,
  y: v.z,
  z: v.y,
});

/* ------------------- Utilidades geométricas para trayectorias ------------- */

const normalizeVec = (v: Vec3): Vec3 => {
  const n = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1;
  return { x: v.x / n, y: v.y / n, z: v.z / n };
};

const dot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;

const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

const rotAroundAxis = (v: Vec3, axis: Vec3, theta: number): Vec3 => {
  const k = normalizeVec(axis);
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const kv = dot(k, v);
  const kCrossV = cross(k, v);
  return normalizeVec({
    x: v.x * cos + kCrossV.x * sin + k.x * kv * (1 - cos),
    y: v.y * cos + kCrossV.y * sin + k.y * kv * (1 - cos),
    z: v.z * cos + kCrossV.z * sin + k.z * kv * (1 - cos),
  });
};

// slerp entre dos vectores unitarios (para H, T)
const slerpVec = (a: Vec3, b: Vec3, t: number): Vec3 => {
  const an = normalizeVec(a);
  const bn = normalizeVec(b);
  let cosOmega = dot(an, bn);
  cosOmega = Math.min(1, Math.max(-1, cosOmega));
  const omega = Math.acos(cosOmega);
  if (omega < 1e-3) {
    // casi iguales → interpolación lineal
    return normalizeVec({
      x: an.x + t * (bn.x - an.x),
      y: an.y + t * (bn.y - an.y),
      z: an.z + t * (bn.z - an.z),
    });
  }
  const sinOmega = Math.sin(omega);
  const s0 = Math.sin((1 - t) * omega) / sinOmega;
  const s1 = Math.sin(t * omega) / sinOmega;
  return normalizeVec({
    x: s0 * an.x + s1 * bn.x,
    y: s0 * an.y + s1 * bn.y,
    z: s0 * an.z + s1 * bn.z,
  });
};

// Crea la trayectoria esperada para cada puerta
const makePathForGate = (from: Vec3, to: Vec3, gate: GateKey): BlochPath => {
  const a = normalizeVec(from);
  const b = normalizeVec(to);
  const dist2 =
    (a.x - b.x) * (a.x - b.x) +
    (a.y - b.y) * (a.y - b.y) +
    (a.z - b.z) * (a.z - b.z);

  const steps = 48;
  const path: BlochPath = [];

  // si prácticamente no se mueve (ej. Z sobre |0⟩), sólo línea corta
  if (dist2 < 1e-4) {
    path.push(a, b);
    return path;
  }

  // Ejes para rotaciones "puras"
  let axis: Vec3 | null = null;
  if (gate === "X") axis = { x: 1, y: 0, z: 0 };
  if (gate === "Y") axis = { x: 0, y: 1, z: 0 };
  if (gate === "Z") axis = { x: 0, y: 0, z: 1 };

  if (axis) {
    // rotación desde 'from' hasta 180° (π) alrededor de ese eje
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const theta = Math.PI * t;
      path.push(rotAroundAxis(a, axis, theta));
    }
    return path;
  }

  // Para H y T usamos slerp (geodésica en la esfera)
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    path.push(slerpVec(a, b, t));
  }
  return path;
};

/* ------------------------- Escena 3D de la esfera ------------------------- */

type BlochSceneProps = {
  blochVector: Vec3;
  paths: BlochPath[];
};

const BlochScene: React.FC<BlochSceneProps> = ({ blochVector, paths }) => {
  const arrowRef = React.useRef<THREE.Group | null>(null);
  const pointRef = React.useRef<THREE.Mesh | null>(null);

  // Bloch -> mundo (THREE.Vector3)
  const blochToWorldVec3 = (v: Vec3): THREE.Vector3 => {
    const w = blochToWorld(v);
    return new THREE.Vector3(w.x, w.y, w.z);
  };

  const worldPaths = React.useMemo(
    () => paths.map((arc) => arc.map((p) => blochToWorldVec3(p))),
    [paths]
  );

  const activePathRef = React.useRef<THREE.Vector3[] | null>(null);
  const pathProgressRef = React.useRef(1); // 1 = sin animación

  React.useEffect(() => {
    if (worldPaths.length === 0) {
      activePathRef.current = null;
      pathProgressRef.current = 1;
      return;
    }
    const latest = worldPaths[worldPaths.length - 1];
    activePathRef.current = latest;
    pathProgressRef.current = 0; // empieza a recorrer el último arco
  }, [worldPaths]);

  useFrame((_, delta) => {
    const dir = new THREE.Vector3();

    if (activePathRef.current && pathProgressRef.current < 0.999) {
      const path = activePathRef.current;
      const n = path.length;
      const speed = 1.5; // controla qué tan rápido recorre el arco

      pathProgressRef.current = Math.min(
        1,
        pathProgressRef.current + delta * speed
      );

      if (n === 1) {
        dir.copy(path[0]).normalize();
      } else if (n > 1) {
        const idxFloat = pathProgressRef.current * (n - 1);
        const i0 = Math.floor(idxFloat);
        const i1 = Math.min(i0 + 1, n - 1);
        const t = idxFloat - i0;
        dir.lerpVectors(path[i0], path[i1], t).normalize();
      }
    } else {
      // sin trayecto activo → apuntamos directamente al estado actual
      const w = blochToWorld(blochVector);
      dir.set(w.x, w.y, w.z).normalize();
    }

    const from = new THREE.Vector3(0, 1, 0);
    const targetQuat = new THREE.Quaternion().setFromUnitVectors(from, dir);

    if (arrowRef.current) {
      arrowRef.current.quaternion.copy(targetQuat);
    }

    if (pointRef.current) {
      pointRef.current.position.copy(dir.clone().multiplyScalar(1.0));
    }
  });

  const AxisLine: React.FC<{ from: Vec3; to: Vec3; color: string }> = ({
    from,
    to,
    color,
  }) => {
    const points = React.useMemo(
      () => [blochToWorldVec3(from), blochToWorldVec3(to)],
      [from, to]
    );
    return <Line points={points} color={color} lineWidth={2} />;
  };

  const worldLabelPos = (v: Vec3): [number, number, number] => {
    const w = blochToWorld(v);
    return [w.x, w.y, w.z];
  };

  return (
    <>
      {/* Fondo clarito para que la esfera destaque */}
      <color attach="background" args={["#f9fafb"]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={0.7} />
      <hemisphereLight
        groundColor={new THREE.Color("#f9fafb")}
        intensity={0.4}
      />

      {/* Esfera transparente */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      {/* malla sutil */}
      <mesh>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshStandardMaterial
          color="#cbd5f5"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Ejes */}
      <AxisLine
        from={{ x: -1.3, y: 0, z: 0 }}
        to={{ x: 1.3, y: 0, z: 0 }}
        color="#f97316"
      />
      <AxisLine
        from={{ x: 0, y: -1.3, z: 0 }}
        to={{ x: 0, y: 1.3, z: 0 }}
        color="#4ade80"
      />
      <AxisLine
        from={{ x: 0, y: 0, z: -1.3 }}
        to={{ x: 0, y: 0, z: 1.3 }}
        color="#2563eb"
      />

      {/* Trayectorias */}
      {worldPaths.map((arc, idx) => (
        <Line
          key={idx}
          points={arc}
          color={idx === worldPaths.length - 1 ? "#facc15" : "#a855f7"}
          lineWidth={idx === worldPaths.length - 1 ? 3 : 1.5}
        />
      ))}

      {/* Etiquetas de ejes */}
      <Html position={worldLabelPos({ x: 1.35, y: 0, z: 0 })} center>
        <div style={{ fontSize: "15px", color: "#f97316", fontWeight: 700 }}>
          X
        </div>
      </Html>
      <Html position={worldLabelPos({ x: 0, y: 1.35, z: 0 })} center>
        <div style={{ fontSize: "15px", color: "#16a34a", fontWeight: 700 }}>
          Y
        </div>
      </Html>
      <Html position={worldLabelPos({ x: 0, y: 0, z: 1.35 })} center>
        <div style={{ fontSize: "15px", color: "#2563eb", fontWeight: 700 }}>
          Z
        </div>
      </Html>

      {/* Etiquetas de estados */}
      <Html position={worldLabelPos({ x: 0.15, y: 0, z: 1.15 })} center>
        <div style={{ fontSize: "17px", color: "#0f172a", fontWeight: 900 }}>
          |0⟩
        </div>
      </Html>
      <Html position={worldLabelPos({ x: 0.15, y: 0, z: -1.15 })} center>
        <div style={{ fontSize: "17px", color: "#0f172a", fontWeight: 900 }}>
          |1⟩
        </div>
      </Html>
      <Html position={worldLabelPos({ x: 1.1, y: 0, z: 0 })} center>
        <div style={{ fontSize: "17px", color: "#0f172a", fontWeight: 900 }}>
          |+⟩
        </div>
      </Html>
      <Html position={worldLabelPos({ x: -1.1, y: 0, z: 0 })} center>
        <div style={{ fontSize: "17px", color: "#0f172a", fontWeight: 900 }}>
          |-⟩
        </div>
      </Html>
      <Html position={worldLabelPos({ x: 0, y: 1.1, z: 0 })} center>
        <div style={{ fontSize: "17px", color: "#8c8c8dff", fontWeight: 900 }}>
          |+i⟩
        </div>
      </Html>
      <Html position={worldLabelPos({ x: 0, y: -1.1, z: 0 })} center>
        <div style={{ fontSize: "17px", color: "#8c8c8dff", fontWeight: 900}}>
          |-i⟩
        </div>
      </Html>

      {/* Vector de estado */}
      <group ref={arrowRef}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.8, 20]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[0.07, 0.22, 20]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
      </group>

      {/* Punto en la punta */}
      <mesh ref={pointRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#facc15"
          emissive="#f97316"
          emissiveIntensity={0.5}
        />
      </mesh>

      <OrbitControls enablePan enableZoom enableRotate />
    </>
  );
};

/* ------------------------- Componente principal UI ------------------------ */

const initialState: QubitState = {
  alpha: c(1, 0),
  beta: c(0, 0),
};

export const BlochSphere: React.FC = () => {
  const [history, setHistory] = useState<QubitState[]>([initialState]);
  const [paths, setPaths] = useState<BlochPath[]>([]);
  const [timeline, setTimeline] = useState<{ label: string; detail: string }[]>(
    [
      {
        label: "Estado inicial",
        detail: "El qubit comienza en |0⟩, el polo norte de la esfera.",
      },
    ]
  );
  const [lastInfo, setLastInfo] = useState<string>(
    "Explora cómo cada puerta rota el vector de estado sobre la Esfera de Bloch."
  );
  const [activeGate, setActiveGate] = useState<GateKey | null>(null);

  const currentState = history[history.length - 1];
  const blochVector = stateToBloch(currentState);

  const pushPath = (from: Vec3, to: Vec3, gate: GateKey) => {
    const newPath = makePathForGate(from, to, gate);
    setPaths((prev) => [...prev.slice(-5), newPath]); // sólo últimos 6
  };

  const handleApplyGate = (gateKey: GateKey) => {
    setActiveGate(gateKey);

    setHistory((prev) => {
      const last = prev[prev.length - 1];
      const prevBloch = stateToBloch(last);
      const nextState = applyGate(last, GATES[gateKey]);
      const nextBloch = stateToBloch(nextState);

      pushPath(prevBloch, nextBloch, gateKey);

      const gInfo = gateLegend[gateKey];

      // texto dinámico para X dependiendo de la dirección
      let detailText = gInfo.motion;
      if (gateKey === "X") {
        if (prevBloch.z > 0.9 && nextBloch.z < -0.9) {
          detailText =
            "Rotación de 180° alrededor de X: el vector va del polo norte (|0⟩) al polo sur (|1⟩).";
        } else if (prevBloch.z < -0.9 && nextBloch.z > 0.9) {
          detailText =
            "Rotación de 180° alrededor de X: el vector va del polo sur (|1⟩) de vuelta al polo norte (|0⟩).";
        } else {
          detailText =
            "Rotación de 180° alrededor de X: invierte la componente Z del vector en la esfera.";
        }
      }

      setTimeline((old) => [
        ...old,
        {
          label: `Puerta ${gateKey}`,
          detail: detailText,
        },
      ]);
      setLastInfo(`${gInfo.name}: ${gInfo.motion} ${gInfo.tip}`);

      return [...prev, nextState];
    });
  };

  const handleReset = () => {
    setHistory([initialState]);
    setPaths([]);
    setTimeline([
      {
        label: "Reinicio",
        detail: "Volviste al estado |0⟩ (polo norte).",
      },
    ]);
    setLastInfo("El qubit está de nuevo en |0⟩.");
    setActiveGate(null);
  };

  const handleUndo = () => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
    setPaths((prev) => (prev.length <= 1 ? [] : prev.slice(0, -1)));
    setTimeline((prev) =>
      prev.length <= 1 ? prev : prev.slice(0, prev.length - 1)
    );
    setLastInfo(
      "Deshiciste el último paso. El vector vuelve a su estado anterior."
    );
  };

  const handleMeasure = () => {
    setActiveGate(null);
    setHistory((prev) => {
      const last = prev[prev.length - 1];
      const p0Local = cAbs2(last.alpha);
      const r = Math.random();

      let result: "|0⟩" | "|1⟩";
      let collapsed: QubitState;

      if (r < p0Local) {
        result = "|0⟩";
        collapsed = normalizeState({ alpha: c(1, 0), beta: c(0, 0) });
      } else {
        result = "|1⟩";
        collapsed = normalizeState({ alpha: c(0, 0), beta: c(1, 0) });
      }

      const prevBloch = stateToBloch(last);
      const nextBloch = stateToBloch(collapsed);
      pushPath(prevBloch, nextBloch, "Z"); // camino tipo "salto" vertical

      setTimeline((old) => [
        ...old,
        {
          label: "Medición",
          detail: `El estado colapsó a ${result}. El vector “salta” al polo correspondiente.`,
        },
      ]);
      setLastInfo(
        `La medición destruye la trayectoria suave: el vector colapsa directamente hacia ${result}.`
      );

      return [...prev, collapsed];
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto",
        gap: "1rem",
        width: "100%",
      }}
    >
      {/* Título */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "2rem",
            fontWeight: 600,
            color: "hsla(277, 100%, 10%, 1.00)",
            margin: "0 auto",
          }}
        >
          Esfera de Bloch interactiva
        </h3>
        <p
          style={{
            fontSize: "1rem",
            color: "#4b5563",
            maxWidth: "40rem",
            margin: "0 auto",
            marginBottom: "0.5rem",
          }}
        >
          Aplica puertas al qubit y mira cómo el vector de estado recorre la
          superficie de la esfera.
        </p>
      </div>

      {/* Layout principal: Esfera + timeline */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
          gap: "1.2rem",
          alignItems: "stretch",
        }}
      >
        {/* Canvas 3D + controles de puertas arriba */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
  }}
>
  {/* Fila superior: puertas a la izquierda, acciones a la derecha */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      flexWrap: "wrap",
    }}
  >
    {/* Botones de puertas a la izquierda */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        justifyContent: "flex-start",
      }}
    >
      {(["X", "Y", "Z", "H", "T"] as GateKey[]).map((g) => {
        const isActive = activeGate === g;
        return (
          <button
            key={g}
            onClick={() => handleApplyGate(g)}
            style={{
              padding: "0.3rem 0.75rem",
              borderRadius: "10px",
              border: isActive
                ? "1px solid hsl(299 30% 65%)"
                : "1px solid hsl(268 37% 70%)",
              background: isActive
                ? "linear-gradient(135deg, hsl(268 37% 40%), hsl(299 30% 55%))"
                : "white",
              color: isActive ? "white" : "hsl(268 37% 27%)",
              fontSize: "1.3rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: isActive
                ? "0 8px 20px rgba(148, 27, 181, 0.4)"
                : "0 2px 6px rgba(15, 23, 42, 0.08)",
              transition: "all 0.2s ease",
            }}
          >
            {g}
          </button>
        );
      })}
    </div>

    {/* Botones de medir / deshacer / reset a la derecha */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        height: "2.6rem", 
        justifyContent: "flex-end",
      }}
    >
      <button
        onClick={handleMeasure}
        style={{
          padding: "0.35rem 0.9rem",
          borderRadius: "10px",
          border: "1px solid hsl(221 75% 60%)",
          background: "hsl(221 75% 55%)",
          color: "white",
          fontSize: "0.9rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Medir
      </button>

      <button
        onClick={handleUndo}
        style={{
          padding: "0.35rem 0.9rem",
          borderRadius: "10px",
          border: "1px solid #9ca3af",
          background: "white",
          color: "#374151",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Deshacer
      </button>

      <button
        onClick={handleReset}
        style={{
          padding: "0.35rem 0.9rem",
          borderRadius: "10px",
          border: "1px solid hsl(0 84% 60%)",
          background: "white",
          color: "hsl(0 84% 45%)",
          fontSize: "0.9rem",
          fontWeight: 500,
        }}
      >
        Resetear a |0⟩
      </button>
    </div>
  </div>

  {/* Esfera */}
  <div
    style={{
      width: "100%",
      height: "500px",
      borderRadius: "1rem",
      overflow: "hidden",
      border: "1px solid hsl(221 75% 90%)",
      background: "white",
      boxShadow: "0 18px 35px rgba(15,23,42,0.18)",
    }}
  >
    <Canvas camera={{ position: [2.5, 2.5, 2.5], fov: 45 }}>
      <BlochScene blochVector={blochVector} paths={paths} />
    </Canvas>
  </div>
</div>

        

        {/* Timeline a la derecha */}
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >     

          <div
            style={{
              padding: "0.9rem 1.2rem",
              borderRadius: "0.9rem",
              background: "hsl(299 30% 40% / 0.09)",
              border: "1px solid hsl(221 75% 90%)",
              fontSize: "1rem",
              color: "#111827",
              overflowY: "auto",
              height: "550px", // mismo alto que la caja de la esfera
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: "0.4rem",
                color: "hsl(221 75% 19%)",
              }}
            >
              Timeline de operaciones
            </div>
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {timeline.map((step, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    columnGap: "0.5rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "999px",
                        background:
                          idx === timeline.length - 1
                            ? "hsl(37 93% 51%)"
                            : "hsl(268 37% 60%)",
                        color: "white",
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow:
                          idx === timeline.length - 1
                            ? "0 0 10px rgba(245, 158, 11, 0.7)"
                            : "0 0 6px rgba(147, 51, 234, 0.5)",
                      }}
                    >
                      {idx + 1}
                    </div>
                    {idx < timeline.length - 1 && (
                      <div
                        style={{
                          width: "2px",
                          flex: 1,
                          background:
                            "linear-gradient(to bottom, hsl(268 37% 70%), hsl(299 30% 70%))",
                          marginTop: "0.06rem",
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        marginBottom: "0.1rem",
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.95rem",
                        color: "#4b5563",
                        lineHeight: 1.4,
                      }}
                    >
                      {step.detail}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
        </div>
      </div>

      {/* Leyenda de puertas a ancho completo, más visual y cortita */}
      <div
        style={{
          marginTop: "0.6rem",
          padding: "0.8rem 1rem",
          borderRadius: "0.9rem",
          background: "hsl(221 75% 97%)",
          fontSize: "1rem",
          color: "#111827",
          border: "1px solid hsl(221 75% 90%)",
          width: "100%",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "hsl(221 75% 19%)",
          }}
        >
          ¿Qué hace cada puerta en la esfera?
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {(["X", "Y", "Z", "H", "T"] as GateKey[]).map((g) => {
            const info = gateLegend[g];
            return (
              <div
                key={g}
                style={{
                  padding: "0.6rem 0.8rem",
                  borderRadius: "0.8rem",
                  background: "white",
                  border: "1px solid hsl(221 75% 90%)",
                  boxShadow: "0 4px 10px rgba(15,23,42,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      background:
                        g === "H"
                          ? "hsl(299 30% 55%)"
                          : g === "T"
                          ? "hsl(37 93% 51%)"
                          : "hsl(268 37% 40%)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {g}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      color: "hsl(268 37% 30%)",
                    }}
                  >
                    {info.name}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.3rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <span
                    style={{
                      padding: "0.15rem 0.45rem",
                      borderRadius: "999px",
                      background: "hsl(221 75% 95%)",
                      border: "1px solid hsl(221 75% 85%)",
                    }}
                  >
                    Ángulo: {info.angle}
                  </span>
                  <span
                    style={{
                      padding: "0.15rem 0.45rem",
                      borderRadius: "999px",
                      background: "hsl(299 30% 94%)",
                      border: "1px solid hsl(299 30% 80%)",
                    }}
                  >
                    Sobre {info.axis}
                  </span>
                </div>

                <div
                style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.4,
                    color: "#4b5563", // color base (se aplica al tip)
                }}
                >
                <span
                    style={{
                    color: "hsl(268 75% 35%)", // ⬅️ color diferente para motion
                    }}
                >
                    {info.motion}
                </span>
                <br />
                <span
                    style={{
                    fontStyle: "italic",
                    color: "#6b7280", // si quieres, un gris un poco distinto para el tip
                    }}
                >
                    {info.tip}
                </span>
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* Créditos */}
      <div
        style={{
          marginTop: "0.8rem",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#6b7280",
        }}
      >
        <span>Diseñado y desarrollado por </span>
        <span
          style={{
            fontWeight: 600,
          }}
        >
          QuantumHub Perú
        </span>
      </div>
    </div>
  );
};
