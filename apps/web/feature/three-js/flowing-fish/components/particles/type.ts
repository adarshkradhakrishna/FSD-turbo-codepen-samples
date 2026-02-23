import * as THREE from 'three'

export type ParticleType = "box" | "sphere" | "tetra"

export interface ParticleT  {
    x: number;
    y: number;
    z: number;
    speed: number;
    scale: number;
    color: THREE.Color;
    type: ParticleType;
}

