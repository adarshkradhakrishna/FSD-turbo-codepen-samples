import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three'
import { pinkMat, whiteMat } from '../matierial';
import { MAX_FISH_SPEED, motionState } from '../../shared/lib/motion/motionState';
import { useFrame } from '@react-three/fiber';
export function AnimatedTooth() {
    const teethRef = useRef<THREE.InstancedMesh | null>(null);
    const meshRef = useRef<THREE.Mesh>(null)
    const teethGeom = useMemo(() => new THREE.BoxGeometry(1.5, 1.5), [])
    useFrame(() => {
        if (!teethRef.current) return

        const dummy = new THREE.Object3D();

        const positions = [
            [8, -2.5, 4],
            [8, -2.5, 2],
            [8, -2.5, 0],
            [8, -2.5, -2],
            [8, -2.5, -4],
        ];

        if (!teethRef.current || meshRef.current) return
        const speed01 = THREE.MathUtils.clamp(
            motionState.velocity.length() / MAX_FISH_SPEED,
            0,
            1
        )
        const targetScale = new THREE.Vector3(
            THREE.MathUtils.lerp(1, 6, speed01), // X
            THREE.MathUtils.lerp(1, 1, speed01), // Y
            THREE.MathUtils.lerp(1, 1.1, speed01)   // Z
        )

        positions.forEach((pos, i) => {
            dummy.position.set(Number(pos[0]), Number(pos[1]), Number(pos[2]))
            dummy.scale.lerp(targetScale, 0.5)
            dummy.updateMatrix();
            teethRef.current!.setMatrixAt(i, dummy.matrix);
            teethRef.current!.instanceMatrix.needsUpdate = true;
        })
        meshRef.current!.scale.lerp(targetScale, 0.5)
        meshRef.current!.position.lerp(targetScale,0.5)

    })


    return (
        <>
            <mesh ref={meshRef}  material={pinkMat} rotation={[0, Math.PI / 2, 0]} position={[8, -3.5, 0]}>
                <boxGeometry args={[10, 1, 1]} />
            </mesh>
        <instancedMesh material={whiteMat} ref={teethRef} geometry={teethGeom} args={[undefined, undefined, 5]} />
        </>
    )
}