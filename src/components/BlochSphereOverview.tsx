import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { BlockMath, InlineMath } from "react-katex";

type BlochFocus = "axes" | "basis" | "superpositions" | "angles";

type BlochIntroSceneProps = {
  focus: BlochFocus;
  onSelect?: (f: BlochFocus) => void;
};

const BlochIntroScene: React.FC<BlochIntroSceneProps> = ({ focus, onSelect }) => {
  const axisX = focus === "axes" || focus === "superpositions" ? "#f97316" : "#9ca3af";
  const axisY = focus === "axes" ? "#22c55e" : "#9ca3af";
  const axisZ =
    focus === "axes" || focus === "basis" || focus === "angles" ? "#6366f1" : "#9ca3af";

  // Ángulos ejemplo: θ (desde eje Z), φ (desde eje X positivo en el ecuador, CCW)
  const theta = Math.PI / 3;
  const phi = Math.PI / 4;

  // Convención Bloch → coords 3D:
  // (X_B, Y_B, Z_B) = (sinθ cosφ, sinθ sinφ, cosθ)
  // Queremos que el eje "vertical" visual sea el de Z_B, así que lo mapeamos a y.
  const stateDir = React.useMemo(() => {
    const x = Math.sin(theta) * Math.cos(phi);
    const y = Math.cos(theta); // Bloch Z → eje vertical
    const z = Math.sin(theta) * Math.sin(phi);
    return new THREE.Vector3(x, y, z);
  }, [theta, phi]);

  const makeArcPoints = (
    radius: number,
    start: number,
    end: number,
    plane: "theta" | "phi",
    steps = 40
  ) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = start + (i * (end - start)) / steps;
      if (plane === "theta") {
        // Arco desde el polo norte hasta el estado (φ fijo)
        const x = radius * Math.sin(t) * Math.cos(phi);
        const y = radius * Math.cos(t);
        const z = radius * Math.sin(t) * Math.sin(phi);
        pts.push(new THREE.Vector3(x, y, z));
      } else {
        // Arco de φ en el ecuador: y = 0 (ecuador)
        const x = radius * Math.cos(t);
        const y = 0;
        const z = radius * Math.sin(t);
        pts.push(new THREE.Vector3(x, y, z));
      }
    }
    return pts;
  };

  // Un poco más grande para que se vean bien los arcos
  const thetaArc = makeArcPoints(0.96, 0, theta, "theta");
  const phiArc = makeArcPoints(0.98, 0, phi, "phi");

  const midTheta = thetaArc[Math.floor(thetaArc.length / 2)];
  const midPhi = phiArc[Math.floor(phiArc.length / 2)];

  // Orientar la punta de flecha roja hacia stateDir
  const arrowQuaternion = React.useMemo(() => {
    const q = new THREE.Quaternion();
    const from = new THREE.Vector3(0, 1, 0); // cone apunta por defecto en +Y
    const to = stateDir.clone().normalize();
    q.setFromUnitVectors(from, to);
    return q;
  }, [stateDir]);

  return (
    <>
      <color attach="background" args={["#f9fafb"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={0.7} />
      <hemisphereLight groundColor={new THREE.Color("#f9fafb")} intensity={0.4} />

      {/* Esfera base */}
      <mesh>
        <sphereGeometry args={[1, 40, 40]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshStandardMaterial
          color="#d1d5db"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Ejes (vertical = Z visual) */}
      {/* X: horizontal */}
      <Line
        points={[
          new THREE.Vector3(-1.3, 0, 0),
          new THREE.Vector3(1.3, 0, 0),
        ]}
        color={axisX}
        lineWidth={2}
      />
      {/* Z: vertical (donde están |0⟩ y |1⟩) */}
      <Line
        points={[
          new THREE.Vector3(0, -1.3, 0),
          new THREE.Vector3(0, 1.3, 0),
        ]}
        color={axisZ}
        lineWidth={2}
      />
      {/* Y: profundidad */}
      <Line
        points={[
          new THREE.Vector3(0, 0, -1.3),
          new THREE.Vector3(0, 0, 1.3),
        ]}
        color={axisY}
        lineWidth={2}
      />

      {/* Etiquetas de ejes (clickeables, se sombrean en vista "axes") */}
      <Html position={[1.4, 0, 0]} center>
        <button
          onClick={() => onSelect?.("axes")}
          className={`text-xs font-semibold rounded-full px-2 py-0.5 shadow-sm transition
          ${
            focus === "axes"
              ? "bg-quantum-purple text-white"
              : "bg-white/80 text-orange-600"
          }`}
        >
          X
        </button>
      </Html>
      <Html position={[0, 1.4, 0]} center>
        <button
          onClick={() => onSelect?.("axes")}
          className={`text-xs font-semibold rounded-full px-2 py-0.5 shadow-sm transition
          ${
            focus === "axes"
              ? "bg-quantum-purple text-white"
              : "bg-white/80 text-indigo-600"
          }`}
        >
          Z
        </button>
      </Html>
      <Html position={[0, 0, 1.4]} center>
        <button
          onClick={() => onSelect?.("axes")}
          className={`text-xs font-semibold rounded-full px-2 py-0.5 shadow-sm transition
          ${
            focus === "axes"
              ? "bg-quantum-purple text-white"
              : "bg-white/80 text-emerald-600"
          }`}
        >
          Y
        </button>
      </Html>

      {/* Estados base solo en "basis" */}
      {focus === "basis" && (
        <>
          <Html position={[0, 1.1, 0]} center>
            <button className="text-xs font-semibold text-slate-900 bg-white/90 rounded-full px-2 py-0.5 shadow">
              |0⟩
            </button>
          </Html>
          <Html position={[0, -1.1, 0]} center>
            <button className="text-xs font-semibold text-slate-900 bg-white/90 rounded-full px-2 py-0.5 shadow">
              |1⟩
            </button>
          </Html>
        </>
      )}

      {/* Superposiciones solo en "superpositions" */}
      {focus === "superpositions" && (
        <>
          {/* |+>, |-> sobre X */}
          <Html position={[1.1, 0, 0]} center>
            <button className="text-xs font-semibold text-slate-900 bg-white/90 rounded-full px-2 py-0.5 shadow">
              |+⟩
            </button>
          </Html>
          <Html position={[-1.1, 0, 0]} center>
            <button className="text-xs font-semibold text-slate-900 bg-white/90 rounded-full px-2 py-0.5 shadow">
              |-⟩
            </button>
          </Html>

          {/* |+i>, |-i> sobre el ecuador en Y (profundidad) */}
          <Html position={[0, 0, 1.1]} center>
            <button className="text-xs font-semibold text-slate-900 bg-white/90 rounded-full px-2 py-0.5 shadow">
              |+i⟩
            </button>
          </Html>
          <Html position={[0, 0, -1.1]} center>
            <button className="text-xs font-semibold text-slate-900 bg-white/90 rounded-full px-2 py-0.5 shadow">
              |-i⟩
            </button>
          </Html>
        </>
      )}

      {/* Vector de estado (flecha roja al estado (θ, φ)) */}
      <Line
        points={[
          new THREE.Vector3(0, 0, 0),
          stateDir.clone().multiplyScalar(1.02),
        ]}
        color="#ef4444"
        lineWidth={3}
      />
      <mesh
        position={stateDir.clone().multiplyScalar(1.05)}
        quaternion={arrowQuaternion}
      >
        <coneGeometry args={[0.06, 0.2, 20]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Ángulos solo en "angles" */}
      {focus === "angles" && (
        <>
          {/* --- θ --- */}
          {/* Arco θ (desde polo norte hasta el estado) */}
          <Line points={thetaArc} color="#ef4444" lineWidth={3} />

          {/* “Relleno” suave de θ con líneas radiales (abanico) */}
          {Array.from({ length: 6 }, (_, i) => {
            const frac = (i + 1) / 6;
            const r = 0.96 * frac;
            const a = new THREE.Vector3(0, r, 0); // sobre eje Z (vertical)
            const b = stateDir.clone().multiplyScalar(r);
            return (
              <Line
                key={`theta-fill-${i}`}
                points={[a, b]}
                color="#fecaca"
                lineWidth={2}
              />
            );
          })}

          <Html
            position={[midTheta.x, midTheta.y, midTheta.z]}
            center
          >
            <span className="text-xs font-semibold bg-white/80 rounded-full px-1.5 py-0.5 text-red-600 shadow">
              θ
            </span>
          </Html>

          {/* --- φ --- */}
          {/* Arco φ en el ecuador */}
          <Line points={phiArc} color="#22c55e" lineWidth={3} />

          {/* Cuña sombreada para φ en el plano ecuatorial (XY), un pelín elevada para verse mejor */}
          <mesh position={[0, 0.02, 0]}>
            <ringGeometry args={[0.0, 0.99, 64, 1, 0, phi]} />
            <meshStandardMaterial
              color="#22c55e"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Líneas radiales verdes para reforzar la cuña de φ */}
          {Array.from({ length: 5 }, (_, i) => {
            const t = (phi * (i + 1)) / 5;
            const outer = new THREE.Vector3(Math.cos(t), 0, Math.sin(t));
            return (
              <Line
                key={`phi-fill-${i}`}
                points={[
                  new THREE.Vector3(0, 0, 0),
                  outer.multiplyScalar(0.99),
                ]}
                color="#bbf7d0"
                lineWidth={2}
              />
            );
          })}

          <Html
            position={[midPhi.x, midPhi.y + 0.03, midPhi.z]}
            center
          >
            <span className="text-xs font-semibold bg-white/80 rounded-full px-1.5 py-0.5 text-emerald-600 shadow">
              φ
            </span>
          </Html>

          {/* Polo norte marcado como origen de θ */}
          <mesh position={[0, 1.0, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </>
      )}

      <OrbitControls enablePan enableZoom enableRotate />
    </>
  );
};

const FOCUS_LABELS: Record<BlochFocus, string> = {
  axes: "Ejes X, Y, Z",
  basis: "Estados base |0⟩ y |1⟩",
  superpositions: "Superposiciones",
  angles: "Ángulos θ y φ",
};

const FOCUS_TEXT: Record<
  BlochFocus,
  { title: string; body: React.ReactNode }
> = {
  axes: {
    title: "Ejes: X, Y y Z",
    body: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-2">
          La Esfera de Bloch es una esfera de radio 1 con tres ejes ortogonales:
          <strong> X</strong>, <strong>Y</strong> y <strong>Z</strong>.
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-1 ">
          <li>
            El eje <strong>Z</strong> se asocia con los estados{" "}
            <InlineMath math="|0\rangle" /> (polo norte) y{" "}
            <InlineMath math="|1\rangle" /> (polo sur).
          </li>
          <li>
            Los ejes <strong>X</strong> y <strong>Y</strong> nos ayudan a
            visualizar otras bases como{" "}
            <InlineMath math="|+\rangle, |-\rangle, |+i\rangle, |-i\rangle" />.
          </li>
          <li>
            Cualquier estado puro de un qubit es un{" "}
            <strong>punto en la superficie</strong> de esta esfera.
          </li>
        </ul>
      </>
    ),
  },
  basis: {
    title: "Estados base: |0⟩ y |1⟩",
    body: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-2">
          En la base computacional, los estados más importantes son{" "}
          <InlineMath math="|0\rangle" /> y <InlineMath math="|1\rangle" />.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base text-lg ">
          <li>
            <InlineMath math="|0\rangle" /> es el{" "}
            <strong>polo norte</strong> de la esfera.
          </li>
          <li>
            <InlineMath math="|1\rangle" /> es el{" "}
            <strong>polo sur</strong>.
          </li>
          <li>
            Si el vector está cerca a <InlineMath math="|0\rangle" />, mediremos 0 con
            mayor probabilidad (y análogo para <InlineMath math="|1\rangle" />).
          </li>
        </ul>
      </>
    ),
  },
  superpositions: {
    title: "Superposiciones en el ecuador",
    body: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-2">
          Además de los polos, hay estados clave en el{" "}
          <strong>ecuador de la esfera</strong>.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base text-lg ">
          <li>
            Sobre el eje X están <InlineMath math="|+\rangle" /> y{" "}
            <InlineMath math="|-\rangle" />, que dan 0 y 1 con probabilidad 1/2.
          </li>
          <li>
            Sobre el eje Y están <InlineMath math="|+i\rangle" /> y{" "}
            <InlineMath math="|-i\rangle" />, también con 1/2–1/2 pero con{" "}
            <strong>fase distinta</strong>.
          </li>
          <li>
            Todas son superposiciones del tipo{" "}
            <InlineMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />.
          </li>
        </ul>
      </>
    ),
  },
  angles: {
    title: "Ángulos θ y φ",
    body: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-2">
          Un estado puro de un qubit se puede describir con{" "}
          <strong>dos ángulos</strong> en la esfera:{" "}
          <InlineMath math="\theta" /> y <InlineMath math="\phi" />.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base text-lg">
          <li>
            <InlineMath math="\theta" /> mide la inclinación del vector
            sobre al eje Z.
          </li>
          <li>
            <InlineMath math="\phi" /> mide la rotación del vector en el{" "}
            eje XY.
          </li>
          <li>
            Con ellos, el estado se escribe como{" "}
            <br />
            <br />
            <InlineMath math="|\psi\rangle = \cos\frac{\theta}{2}\,|0\rangle + e^{i\phi}\sin\frac{\theta}{2}\,|1\rangle" />
            .
          </li>
        </ul>
      </>
    ),
  },
};

const BlochSphereOverview: React.FC = () => {
  const [focus, setFocus] = React.useState<BlochFocus>("axes");

  return (
    <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-7 space-y-6">
      {/* Cabecera pequeña */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h3 className="text-2xl md:text-3xl font-staatliches text-quantum-purple mb-1">
            Conozcamos la ESFERA DE Bloch
          </h3>
          <p className="text-lg md:text-base text-gray-600 max-w-2xl">
            Usa las pestañas o haz clic en las etiquetas de la esfera para ver sus
            partes: ejes, estados base, superposiciones y ángulos.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["axes", "basis", "superpositions", "angles"] as BlochFocus[]).map(
            (key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFocus(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  focus === key
                    ? "bg-quantum-orange text-white border-quantum-orange"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {FOCUS_LABELS[key]}
              </button>
            )
          )}
        </div>
      </div>

      {/* Layout: esfera + texto */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-slate-50 to-slate-100 shadow-inner overflow-hidden">
          <Canvas camera={{ position: [2.5, 2.5, 2.5], fov: 40 }}>
            <BlochIntroScene focus={focus} onSelect={setFocus} />
          </Canvas>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-3">
          <h4 className="text-xl font-semibold text-quantum-purple">
            {FOCUS_TEXT[focus].title}
          </h4>
          <div className="space-y-2">{FOCUS_TEXT[focus].body}</div>
        </div>
      </div>
    </div>
  );
};

export default BlochSphereOverview;

