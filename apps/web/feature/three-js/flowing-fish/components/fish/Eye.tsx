import { useMemo } from "react";
import { blackMat, whiteMat } from "../matierial";
import * as THREE from 'three'
export function Eye({ reverse = false }: { reverse?: boolean }) {
    const eyeWhiteGeom = useMemo(() => new THREE.BoxGeometry(3, 1.5, 1,), [])
    const eyeBlackGeom = useMemo(() => new THREE.BoxGeometry(1, 1, 2), [])
    return (
        <group>
            <mesh material={whiteMat} geometry={eyeWhiteGeom} position={[3, 0, (reverse ? -1 : 1) * 5]} />
            <mesh position={[4, 0, 5]} geometry={eyeBlackGeom} material={blackMat} />
        </group>
    )
}