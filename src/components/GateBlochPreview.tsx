// GateBlochPreview.tsx
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

type GateBlochPreviewProps = {
  from: [number, number, number]; // vector inicial (Bloch)
  to: [number, number, number];   // vector final (Bloch)
};

type GateBlochSceneProps = GateBlochPreviewProps & {
  playToken: number;
};

const GateBlochScene: React.FC<GateBlochSceneProps> = ({
  from,
  to,
  playToken,
}) => {
  const fromVec = React.useMemo(
    () => new THREE.Vector3(...from),
    [from]
  );
  const toVec = React.useMemo(
    () => new THREE.Vector3(...to),
    [to]
  );

  const [progress, setProgress] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    setProgress(0);
    setPlaying(true);
  }, [playToken]);

  useFrame((_, delta) => {
    if (!playing) return;
    setProgress((p) => {
      const next = p + delta * 0.6;
      if (next >= 1) {
        setPlaying(false);
        return 1;
      }
      return next;
    });
  });

  const current = fromVec.clone().lerp(toVec, progress).normalize();
  const arrowQuaternion = React.useMemo(() => new THREE.Quaternion(), []);
  arrowQuaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    current.clone().normalize()
  );

  return (
    <>
      <color attach="background" args={["#f9fafb"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={0.7} />
      <hemisphereLight
        groundColor={new THREE.Color("#f9fafb")}
        intensity={0.4}
      />

      {/* esfera */}
      <mesh>
        <sphereGeometry args={[1, 36, 36]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          roughness={0.9}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.01, 30, 30]} />
        <meshStandardMaterial
          color="#d1d5db"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* ejes suaves */}
      <Line
        points={[new THREE.Vector3(-1.2, 0, 0), new THREE.Vector3(1.2, 0, 0)]}
        color="#f97316"
        lineWidth={1.5}
      />
      <Line
        points={[new THREE.Vector3(0, -1.2, 0), new THREE.Vector3(0, 1.2, 0)]}
        color="#6366f1"
        lineWidth={1.5}
      />
      <Line
        points={[new THREE.Vector3(0, 0, -1.2), new THREE.Vector3(0, 0, 1.2)]}
        color="#22c55e"
        lineWidth={1.5}
      />

      {/* vector rojo */}
      <Line
        points={[new THREE.Vector3(0, 0, 0), current.clone().multiplyScalar(1.02)]}
        color="#ef4444"
        lineWidth={3}
      />
      <mesh
        position={current.clone().multiplyScalar(1.05)}
        quaternion={arrowQuaternion}
      >
        <coneGeometry args={[0.06, 0.22, 20]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      <OrbitControls enablePan={false} enableZoom={false} enableRotate />
    </>
  );
};

const GateBlochPreview: React.FC<GateBlochPreviewProps> = ({ from, to }) => {
  const [playToken, setPlayToken] = React.useState(0);

  return (
    <div className="space-y-2">
      <div className="h-40 rounded-xl border border-gray-200 bg-slate-50 overflow-hidden">
        <Canvas camera={{ position: [2.2, 2.1, 2.2], fov: 40 }}>
          <GateBlochScene from={from} to={to} playToken={playToken} />
        </Canvas>
      </div>
      <button
        type="button"
        onClick={() => setPlayToken((t) => t + 1)}
        className="w-full text-xs font-semibold rounded-full border border-quantum-orange text-quantum-orange px-2 py-1 hover:bg-quantum-orange hover:text-white transition"
      >
        Aplicar la puerta en la esfera de Bloch
      </button>
    </div>
  );
};

export default GateBlochPreview;
