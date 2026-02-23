import { useMemo, useRef } from "react";
import * as THREE from 'three'
export function Body() {
    const meshRef= useRef<THREE.Mesh>(null)
    const bodyGeom = useMemo(() => new THREE.BoxGeometry(15, 10, 10), [])


    const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#a579d1", roughness: 0.6, metalness: 0.1 }),[])

    return (
        <mesh ref={meshRef} material={bodyMat} geometry={bodyGeom} />
    )
}