import { useEffect, useMemo, useRef } from "react"
import * as THREE from 'three'
import { redMat } from "../matierial"
import { useFrame } from "@react-three/fiber";
import { Point } from "./type";
import { createTriangleGeometry } from "../../shared/lib/geometry/createTriangleGeometry";
import { BASE_AMP, BASE_FREQ, BASE_PARTICLE_SPEED, MAX_AMP_BOOST, MAX_FISH_SPEED, MAX_FREQ_BOOST, MAX_PARTICLE_ACCELERATION, MAX_PARTICLE_BOOST, motionState } from "../../shared/lib/motion/motionState";

const controls = [
    {
        position: [-7, 0, 0],
        rotation: [0, 0, -Math.PI / 2],
        phase: 0,
        axis: 'x' // top tail → X direction
    },
    {
        position: [0, -3, 5],
        rotation: [Math.PI / 2, 0, -Math.PI / 2],
        phase: Math.PI,
        axis: 'x' // top tail → X direction
    },
    {
        position: [0, 5, 0],
        rotation: [0, 0, -Math.PI / 2],
        phase: Math.PI / 2,
        axis: 'x' // top tail → X direction
    }
];




export function WingsTails({ velocity }: { velocity: Point }) {

    const instanceRef = useRef<THREE.InstancedMesh | null>(null);
    const geometry = useMemo(createTriangleGeometry, [])



    useFrame(({ clock }) => {
        const dummy = new THREE.Object3D();
        if (!instanceRef.current) return

        const speedFactor = THREE.MathUtils.clamp(motionState.velocity.length() / MAX_FISH_SPEED, 0, 1);
        const particleSpeed = BASE_PARTICLE_SPEED + speedFactor * MAX_PARTICLE_BOOST;

        const { elapsedTime } = clock

        controls.forEach((cntrl: any, i) => {
            const wave = Math.sin(elapsedTime * 2 + cntrl.phase)
            // const wave =
            //     Math.sin(elapsedTime * frequency + cntrl.phase) *
            //     amplitude *
            //     1
            const swing = wave * (particleSpeed * 5) 
            dummy.position.set(cntrl.position[0], cntrl.position[1], cntrl.position[2])
            dummy.rotation.set(cntrl.rotation[0], cntrl.rotation[1], cntrl.rotation[2])
            if (cntrl.axis === 'x') dummy.rotation.x += swing
            if (cntrl.axis === 'y') dummy.rotation.y += swing
            if (cntrl.axis === 'z') dummy.rotation.z += swing
            dummy.updateMatrix()
            instanceRef.current!.setMatrixAt(i, dummy.matrix);
        })
        instanceRef.current!.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh geometry={geometry} args={[undefined, redMat, 3]} ref={instanceRef} />
    )

}