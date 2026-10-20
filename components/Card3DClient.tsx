"use client";
import dynamic from "next/dynamic";
import type { Finish, Mode } from "./Card3D";
const Card3D = dynamic(() => import("./Card3D"), { ssr: false });
export default function C3({ mode, finish, z, flip }: { mode: Mode; finish?: Finish; z?: number; flip?: boolean }) { return <Card3D mode={mode} finish={finish} z={z} flip={flip} />; }
