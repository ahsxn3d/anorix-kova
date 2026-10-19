import * as THREE from "three";
const WAYS: Record<string, [string, string, string]> = { flare: ["#ff7a52", "#ff3d24", "#fff4ec"], plum: ["#2a1f3d", "#140f1e", "#f5f1ea"], lilac: ["#e9e3f7", "#cfc2f2", "#17121f"] };
export function cardTex(way: string) {
  const c = document.createElement("canvas"); c.width = 1024; c.height = 646; const g = c.getContext("2d")!;
  const W = WAYS[way]; const gr = g.createLinearGradient(0, 0, 1024, 646); gr.addColorStop(0, W[0]); gr.addColorStop(1, W[1]); g.fillStyle = gr; g.fillRect(0, 0, 1024, 646);
  g.globalAlpha = 0.12; g.strokeStyle = W[2]; g.lineWidth = 2; for (let i = 0; i < 7; i++) { g.beginPath(); g.arc(860, -40, 180 + i * 70, 0, Math.PI * 2); g.stroke(); } g.globalAlpha = 1;
  g.fillStyle = W[2]; g.font = "700 64px sans-serif"; g.fillText("kova", 70, 120);
  g.fillStyle = "#d9c08a"; g.beginPath(); g.roundRect(70, 250, 120, 92, 16); g.fill();
  g.strokeStyle = W[2]; g.lineWidth = 6; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(250, 296, 22 + i * 18, -0.8, 0.8); g.stroke(); }
  g.fillStyle = W[2]; g.font = "500 40px monospace"; g.fillText("••••  ••••  ••••  4821", 70, 480);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
