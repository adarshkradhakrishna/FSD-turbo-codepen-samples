import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { ParticleT } from './type';
import { useRef } from 'react';
import { BASE_PARTICLE_SPEED, MAX_FISH_SPEED, MAX_PARTICLE_ACCELERATION, MAX_PARTICLE_BOOST, motionState } from '../../shared/lib/motion/motionState';

const COLOR_PALETTE = [
    new THREE.Color('#ff4d6d'),
    new THREE.Color('#4dabf7'),
    new THREE.Color('#51cf66')
];

export function ParticleBatch({ particles }: { particles: ParticleT[], index: number }) {
    return (
        <Particles particles={particles} />
    );
}

function Particles({ particles }: { particles: ParticleT[] }) {
    const meshRefs = useRef<THREE.Mesh[]>([]);

    const { camera } = useThree();
    const perspectiveCamera = camera as THREE.PerspectiveCamera;

    const fov = THREE.MathUtils.degToRad(perspectiveCamera.fov);
    const viewHeight = 2 * Math.tan(fov / 2) * 600;
    const viewWidth = viewHeight * perspectiveCamera.aspect;

    useFrame(() => {
        const speedFactor =THREE.MathUtils.clamp( motionState.velocity.length() / MAX_FISH_SPEED, 0, 1 );
        const particleSpeed = BASE_PARTICLE_SPEED + speedFactor * MAX_PARTICLE_BOOST;
        
        
        meshRefs.current.forEach((mesh,i) => {
            const p = particles[i]!
            if(!mesh) return
            // Move particle
            p.x -= p.speed * (particleSpeed * MAX_PARTICLE_ACCELERATION)

            // Reset if out of bounds
            if (p.x <= -viewWidth / 2) {
                p.x = 800;
                p.color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]!;
                p.scale = THREE.MathUtils.randFloat(0.3, 1.5);
            }

            mesh.position.set(p.x,p.y,p.z)
            mesh.scale.set(p.scale, p.scale, p.scale);
            (mesh.material as THREE.MeshBasicMaterial).color = p.color;
        });
    });

    return (
        <>
            {
                particles.map((particle,i) => (
                    <mesh key={i}
                        ref={(el)=>meshRefs.current[i]= el!}
                        position={[particle.x, particle.y, particle.z]}
                        scale={particle.scale}>

                        {particle.type === 'sphere' && <sphereGeometry args={[3, 3, 3]} />}
                        {particle.type === 'box' && <boxGeometry args={[3, 4, 4]} />}
                        {particle.type === 'tetra' && <tetrahedronGeometry args={[4]} />}
                        <meshBasicMaterial color={particle.color} />
                    </mesh>
                ))
            }
        </>
    )
}
