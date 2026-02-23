import { Fragment,  useMemo } from "react"
import * as THREE from 'three'
import { ParticleBatch } from "./ParticleBatch";


interface Props {
    count: number;
}

type ParticleType = "box" | "sphere" | "tetra"

const COLOR_PALETTE = [
    new THREE.Color('#ff4d6d'), // pink/red
    new THREE.Color('#4dabf7'), // blue
    new THREE.Color('#51cf66')  // green
];


export function FlyingParticles({ count }: Props) {
    const particles = useMemo(() => {
        return Array.from({ length: count }, () => ({
            x: THREE.MathUtils.randFloat(800, 1400),
            y: THREE.MathUtils.randFloatSpread(600),
            z: THREE.MathUtils.randFloat(0, -700),
            speed: THREE.MathUtils.randFloat(1, 6),
            scale: THREE.MathUtils.randFloat(0.3, 1.5),
            color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]?.clone()! ?? COLOR_PALETTE[1],
            type: ["box", "sphere", "tetra"][Math.floor(Math.random() * 3)] as ParticleType
        }))
    }, [count])

    const sphereParticles = particles.filter(p => p.type === 'sphere');
    const boxParticles = particles.filter(p => p.type === 'box');
    const tetraParticles = particles.filter(p => p.type === 'tetra');


    return (
        <Fragment>
            <ParticleBatch particles={sphereParticles} index={1} />
            <ParticleBatch particles={boxParticles} index={2}  />
            <ParticleBatch particles={tetraParticles} index={3} />
        </Fragment>
    )
}

