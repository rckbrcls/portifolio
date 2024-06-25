/* eslint-disable */
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Model from "./Model.js";

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model url="./heart.glb" position={[-1.2, 0, 0]} rotation={[0, 2, 0]} />
      <Model url="./heart.glb" position={[1.2, 0, 0]} rotation={[0, 2, 0]} />
    </Canvas>
  );
}
