"use client";
import { Canvas, useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Finish = "flare" | "metal" | "lilac" | "ink";
const F: Record<Finish, { a: string; b: string; fg: string; metal: number; rough: number; label: string }> = {
  flare: { a: "#ff8a5c", b: "#ff3d24", fg: "#fff4ec", metal: 0.1, rough: 0.32, label: "Standard" },
  metal: { a: "#4a3a66", b: "#17121f", fg: "#e9e3f7", metal: 1, rough: 0.28, label: "Metal" },
  lilac: { a: "#f4effc", b: "#cfc3ee", fg: "#2a1f3d", metal: 0.05, rough: 0.4, label: "Multi-currency" },
  ink: { a: "#2a2433", b: "#0d0a12", fg: "#ff5a36", metal: 0.3, rough: 0.45, label: "Business" },
};
const W = 1.586, H = 1, R = 0.07;
function font() { const el = document.querySelector(".display"); return el ? getComputedStyle(el).fontFamily : "system-ui"; }
function rr(g: CanvasRenderingContext2D, w: number, h: number, r: number) { g.beginPath(); g.roundRect(0, 0, w, h, r); }
function face(f: Finish, back = false) {
  const c = document.createElement("canvas"); c.width = 1024; c.height = 646; const g = c.getContext("2d")!, s = F[f], fam = font();
  rr(g, 1024, 646, 45); g.clip();
  const gr = g.createLinearGradient(0, 0, 1024, 646); gr.addColorStop(0, s.a); gr.addColorStop(1, s.b); g.fillStyle = gr; g.fillRect(0, 0, 1024, 646);
  if (f === "metal") { for (let i = 0; i < 646; i += 2) { g.fillStyle = `rgba(255,255,255,${Math.random() * .035})`; g.fillRect(0, i, 1024, 1); } }
  const glow = g.createRadialGradient(820, 80, 10, 820, 80, 520); glow.addColorStop(0, "rgba(255,255,255,.22)"); glow.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = glow; g.fillRect(0, 0, 1024, 646);
  g.fillStyle = s.fg;
  if (!back) {
    g.font = `700 92px ${fam}`; g.fillText("kova", 64, 140);
    const ch = g.createLinearGradient(64, 250, 210, 360); ch.addColorStop(0, "#f3d58a"); ch.addColorStop(1, "#b98a3c"); g.fillStyle = ch; g.beginPath(); g.roundRect(64, 250, 140, 106, 18); g.fill();
    g.strokeStyle = "rgba(0,0,0,.25)"; g.lineWidth = 3; for (const y of [285, 320]) { g.beginPath(); g.moveTo(64, y); g.lineTo(204, y); g.stroke(); } g.beginPath(); g.moveTo(134, 250); g.lineTo(134, 356); g.stroke();
    g.strokeStyle = s.fg; g.lineWidth = 7; g.lineCap = "round"; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(250, 303, 22 + i * 18, -0.8, 0.8); g.stroke(); }
    g.fillStyle = s.fg; g.font = `500 44px ui-monospace, monospace`; g.fillText("•••• 4821", 64, 540);
    g.font = `600 30px ${fam}`; g.globalAlpha = .8; g.fillText(s.label.toUpperCase(), 64, 595); g.globalAlpha = 1;
    g.beginPath(); g.globalAlpha = .9; g.arc(890, 560, 40, 0, 7); g.fill(); g.globalAlpha = .55; g.arc(840, 560, 40, 0, 7); g.fill(); g.globalAlpha = 1;
  } else {
    g.fillStyle = "rgba(0,0,0,.55)"; g.fillRect(0, 70, 1024, 110); g.fillStyle = s.fg; g.font = `500 26px ${fam}`; g.globalAlpha = .75;
    g.fillText("Concept card by Anorix. Not a real payment card.", 64, 560); g.globalAlpha = 1; g.font = `700 64px ${fam}`; g.fillText("kova", 64, 300);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function Env() { const { gl, scene } = useThree(); useEffect(() => { const p = new THREE.PMREMGenerator(gl); const e = p.fromScene(new RoomEnvironment(), .04).texture; scene.environment = e; return () => { e.dispose(); p.dispose(); }; }, [gl, scene]); return null; }

export function CardMesh({ finish, ...p }: { finish: Finish } & ThreeElements["group"]) {
  const { body, fr, bk, edge } = useMemo(() => {
    const s = F[finish];
    const mk = (map: THREE.Texture) => new THREE.MeshPhysicalMaterial({ map, metalness: s.metal, roughness: s.rough, clearcoat: 1, clearcoatRoughness: .12, transparent: true, alphaTest: .5 });
    return { body: new RoundedBoxGeometry(W, H, .022, 4, R), fr: mk(face(finish)), bk: mk(face(finish, true)), edge: new THREE.MeshPhysicalMaterial({ color: s.b, metalness: s.metal, roughness: .35, clearcoat: 1 }) };
  }, [finish]);
  return (<group {...p}><mesh geometry={body} material={edge} /><mesh position-z={.0115} material={fr}><planeGeometry args={[W, H]} /></mesh><mesh position-z={-.0115} rotation-y={Math.PI} material={bk}><planeGeometry args={[W, H]} /></mesh></group>);
}
function Phone(p: ThreeElements["group"]) {
  const { body, scr } = useMemo(() => {
    const c = document.createElement("canvas"); c.width = 600; c.height = 1240; const g = c.getContext("2d")!, fam = font();
    g.fillStyle = "#f8f5f0"; g.beginPath(); g.roundRect(0, 0, 600, 1240, 70); g.fill();
    g.fillStyle = "#17121f"; g.font = `700 56px ${fam}`; g.fillText("kova", 48, 130);
    g.fillStyle = "#f1ece4"; g.beginPath(); g.roundRect(36, 180, 528, 220, 36); g.fill(); g.fillStyle = "#6f6878"; g.font = `500 28px ${fam}`; g.fillText("Total balance", 72, 240); g.fillStyle = "#17121f"; g.font = `700 76px ${fam}`; g.fillText("€12,806.62", 72, 340);
    ["Send", "Add", "Swap"].forEach((l, i) => { g.fillStyle = "#17121f"; g.beginPath(); g.roundRect(36 + i * 180, 430, 160, 96, 30); g.fill(); g.fillStyle = "#f1ece4"; g.font = `600 30px ${fam}`; g.fillText(l, 66 + i * 180, 490); });
    [["Rent · Lisbon", "−€1,450"], ["Freelance · Acme", "+$4,200"], ["Groceries", "−€62.18"], ["To Ammi", "−₨45,000"], ["Coffee", "−£3.60"]].forEach(([a, b], i) => { const y = 620 + i * 110; g.fillStyle = "#e9e3f7"; g.beginPath(); g.arc(80, y, 30, 0, 7); g.fill(); g.fillStyle = "#17121f"; g.font = `500 30px ${fam}`; g.fillText(a, 130, y + 10); g.fillText(b, 420, y + 10); });
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    return { body: new RoundedBoxGeometry(.78, 1.6, .08, 6, .1), scr: new THREE.MeshPhysicalMaterial({ map: t, roughness: .15, clearcoat: 1, transparent: true }) };
  }, []);
  return (<group {...p}><mesh geometry={body}><meshPhysicalMaterial color="#1c1724" metalness={.8} roughness={.3} clearcoat={1} /></mesh><mesh position-z={.041} material={scr}><planeGeometry args={[.72, 1.49]} /></mesh></group>);
}
function Fit({ z, k, skip }: { z: number; k: number; skip?: boolean }) { const { camera, size } = useThree(); useEffect(() => { if (skip) return; const a = size.width / Math.max(1, size.height); camera.position.z = z * Math.max(1, k / a); camera.updateProjectionMatrix(); }, [camera, size, z, k, skip]); return null; }
export type Mode = "hero" | "stack" | "single" | "phone";
function Rig({ mode, finish, flip }: { mode: Mode; finish: Finish; flip?: boolean }) {
  const g = useRef<THREE.Group>(null!), drag = useRef({ on: false, x: 0, v: 0, a: 0 }), { gl } = useThree();
  const fan = useRef<THREE.Group[]>([]);
  useEffect(() => { if (mode !== "single") return; const c = gl.domElement, d = drag.current;
    const dn = (e: PointerEvent) => { d.on = true; d.x = e.clientX; }, mv = (e: PointerEvent) => { if (!d.on) return; d.v = (e.clientX - d.x) * .01; d.x = e.clientX; }, up = () => { d.on = false; };
    c.addEventListener("pointerdown", dn); addEventListener("pointermove", mv); addEventListener("pointerup", up); return () => { c.removeEventListener("pointerdown", dn); removeEventListener("pointermove", mv); removeEventListener("pointerup", up); }; }, [gl, mode]);
  useFrame((st, dt) => { const t = st.clock.elapsedTime, k = Math.min(1, dt * 3), o = g.current;
    if (mode === "single") { const d = drag.current; d.a += d.v + (d.on ? 0 : dt * .25); d.v *= .9; const target = (flip ? Math.PI : 0) + Math.sin(d.a) * .5; o.rotation.y += (target - o.rotation.y) * k; o.rotation.x = Math.sin(t * .6) * .06 - .12; o.position.y = Math.sin(t * .8) * .03; return; }
    o.rotation.y += ((st.pointer.x * .35 + (mode === "hero" ? -.35 : 0)) - o.rotation.y) * k; o.rotation.x += ((-st.pointer.y * .2 - .1) - o.rotation.x) * k; o.position.y = Math.sin(t * .8) * .04;
    if (mode === "stack") fan.current.forEach((c, i) => { if (!c) return; const s = (.55 + Math.sin(t * .5) * .1 + Math.max(0, st.pointer.x) * .3), a = (i - 1.5) * .22 * s; c.rotation.z += (a - c.rotation.z) * k; c.position.x += ((i - 1.5) * .42 * s - c.position.x) * k; c.position.y += (-Math.abs(i - 1.5) * .12 * s - c.position.y) * k; });
  });
  return (<group ref={g}>
    {mode === "hero" && <><group scale={1.02}><CardMesh finish="metal" position={[.08, .26, -.25]} rotation={[0, 0, .14]} /><CardMesh finish={finish} position={[-.04, -.06, 0]} rotation={[0, 0, -.12]} /></group></>}
    {mode === "single" && <CardMesh finish={finish} />}
    {mode === "stack" && (["lilac", "ink", "metal", "flare"] as Finish[]).map((f, i) => <group key={f} ref={(e) => { if (e) fan.current[i] = e; }} position-z={i * .03}><CardMesh finish={f} /></group>)}
    {mode === "phone" && <><Phone rotation={[0, .25, 0]} position={[-.3, 0, 0]} /><CardMesh finish={finish} scale={.62} position={[.45, -.45, .25]} rotation={[-.2, -.35, .25]} /></>}
  </group>);
}
export default function Card3D({ mode = "hero", finish = "flare", flip, z = 3.4, className = "absolute inset-0" }: { mode?: Mode; finish?: Finish; flip?: boolean; z?: number; className?: string }) {
  const el = useRef<HTMLDivElement>(null), [on, setOn] = useState(false), [ready, setReady] = useState(false);
  useEffect(() => { document.fonts?.ready.then(() => setReady(true)); const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "10% 0px" }); io.observe(el.current!); return () => io.disconnect(); }, []);
  return (<div ref={el} className={className} style={{ cursor: mode === "single" ? "grab" : undefined, touchAction: "pan-y" }}>{ready && <Canvas frameloop={on ? "always" : "never"} dpr={[1, 1.75]} camera={{ position: [0, 0, z], fov: 30 }} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}><Fit z={z} k={1.25} />
    <Env /><directionalLight position={[2, 3, 4]} intensity={1.4} /><directionalLight position={[-3, -1, 2]} intensity={.5} color="#ffb59c" /><Rig mode={mode} finish={finish} flip={flip} /></Canvas>}</div>);
}
