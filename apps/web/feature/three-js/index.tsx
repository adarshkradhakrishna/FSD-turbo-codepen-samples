'use client';
import { Canvas } from "@react-three/fiber";
import Fish from "./flowing-fish/components/fish";
import { FlyingParticles } from "./flowing-fish/components/particles/FlyingParticles";
import { OrbitControls } from "@react-three/drei";
export default function Scene() {


    return (
        <Canvas
            camera={{
                fov: 60,
                position: [0, 0, 100],
                near: 0.1,
                far: 1000
            }}
            style={{ height: "100%" }}
            gl={{ antialias: true, alpha: true }}


        >
            <ambientLight intensity={0.6} position={[0, 0, 100]} />
            <directionalLight position={[0, 0, 100]} intensity={1.2} />
            <Fish position={[0, 0, 0]} />
            <FlyingParticles count={100} />
            {/* <OrbitControls /> */}
        </Canvas>
    )
}

