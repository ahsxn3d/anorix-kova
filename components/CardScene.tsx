"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import FirstFrame from "./kit/FirstFrame";
import { cardTex } from "./cardTex";

function Env() {
  const set = useRef(false);
  useFrame(({ gl, scene }) => {
    if (set.current) return; set.current = true;
    const pm = new THREE.PMREMGenerator(gl); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; pm.dispose();
  });
  return null;
}

function Cards({ progress }: { progress: MutableRefObject<number> }) {
  const a = useRef<THREE.Mesh>(null), b = useRef<THREE.Mesh>(null);
  const { geo, ma, mb } = useMemo(() => {
    const geo = new RoundedBoxGeometry(3.4, 2.14, 0.05, 5, 0.16);
    const mk = (w: string) => new THREE.MeshPhysicalMaterial({ map: cardTex(w), roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.15, metalness: 0.1 });
    return { geo, ma: mk("flare"), mb: mk("plum") };
  }, []);
  useFrame((st, dt) => {
    const p = progress.current, k = Math.min(1, dt * 4), t = st.clock.elapsedTime;
    const px = st.pointer.x, py = st.pointer.y;
    if (a.current) {
      a.current.rotation.x += (-0.35 + py * 0.15 - p * 0.6 - a.current.rotation.x) * k;
      a.current.rotation.y += (-0.45 + px * 0.3 + p * Math.PI - a.current.rotation.y) * k;
      a.current.rotation.z = 0.18 + Math.sin(t * 0.6) * 0.03;
      a.current.position.y = 0.25 + Math.sin(t * 0.9) * 0.08 + p * 0.6;
    }
    if (b.current) {
      b.current.rotation.x += (-0.2 + py * 0.1 - b.current.rotation.x) * k;
      b.current.rotation.y += (0.5 + px * 0.2 - p * 1.2 - b.current.rotation.y) * k;
      b.current.position.y = -0.55 + Math.sin(t * 0.8 + 1) * 0.08 - p * 0.4;
    }
  });
  return (<>
    <mesh ref={b} geometry={geo} material={mb} position={[0.9, -0.55, -1.2]} raycast={() => null} />
    <mesh ref={a} geometry={geo} material={ma} position={[-0.3, 0.25, 0]} raycast={() => null} />
  </>);
}

export default function CardScene({ progress, running, onReady }: { progress: MutableRefObject<number>; running: boolean; onReady: () => void }) {
  return (
    <Canvas frameloop={running ? "always" : "demand"} dpr={[1, 1.5]} camera={{ position: [0, 0, 7.2], fov: 35 }} gl={{ antialias: true, alpha: true }}>
      <Env />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 5]} intensity={1.6} />
      <pointLight position={[-3, -2, 3]} intensity={18} color="#ff5a36" />
      <Cards progress={progress} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
