import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";

interface ObjectProps {
  url: string;
  position: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number];
}

export default function Model({ url, position, rotation }: ObjectProps) {
  const { scene } = useLoader(GLTFLoader, url);
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group>
      <primitive object={copiedScene} position={position} rotation={rotation} />
    </group>
  );
}
