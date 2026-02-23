import * as THREE from 'three';

export const motionState = {
    velocity: new THREE.Vector2(), 
    speed: 0,                     
};


export const BASE_PARTICLE_SPEED = 0.5;
export const MAX_PARTICLE_BOOST = 4;
export const MAX_FISH_SPEED = 10;
export const MAX_PARTICLE_ACCELERATION = 3

export const BASE_FREQ = 2        // idle motion
export const MAX_FREQ_BOOST = 6   // faster wag
export const BASE_AMP = 0.15
export const MAX_AMP_BOOST = 0.45
