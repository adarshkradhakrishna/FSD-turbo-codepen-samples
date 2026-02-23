import { RefObject, useCallback, useMemo, useRef } from "react"
import { pinkMat } from "../matierial"
import { AnimatedTooth } from "./Tooth"
import { Body } from "./body"
import { WingsTails } from "./WingsAndTails"
import { Eye } from "./Eye"
import { Euler } from "three"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import { Point } from "./type"
import { MAX_FISH_SPEED, motionState } from "../../shared/lib/motion/motionState"

interface Props {
    position: any
}




const ACCELERATION = 0.0179;
const DAMPING = 0.95;
const MAX_SPEED = 2;
const EPSILON = 0.0001;

const calculateDragForce = (mousePosition: Point, prevMouse: Point) => ({ dx: mousePosition.x - prevMouse.x, dy: mousePosition.y - prevMouse.y })

const applyAcceleration = (velocity: RefObject<{
    x: number;
    y: number;
}>, dx: number, dy: number, ACCELERATION: number
) => {
    velocity.current.x += dx * ACCELERATION;
    velocity.current.y += dy * ACCELERATION;
}


export default function Fish({ position }: Props) {
    const fishRef = useRef<THREE.Group>(null)
    const bodyGroupRef = useRef<THREE.Group>(null)
    const prevMouse = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({
        y: 0,
        z: 0,
    });
    const { pointer, viewport } = useThree()
    const speed = useRef({ x: 0, y: 0 })

    useFrame(() => {
        if (!fishRef.current) return null

        const mousePosition = {
            x: pointer.x * viewport.width * 0.5,
            y: pointer.y * viewport.height * 0.5
        }

        // that target x and y are related to the center as 0,0 
        // when ever the mouse is 0,0 we neeed yo reduce the speed 

        // when ever its close to screen we need to increase the speed and x.

        // when ever the mouse is down we need to move to down wards => chnage the angle we need to rotate in -y direction 
        // it need to feel like fowing in the water 

        // mouse movement (drag delta)
        const { dx, dy } = calculateDragForce(mousePosition, prevMouse.current)
        // store for next frame
        prevMouse.current = mousePosition;

        // apply acceleration ONLY when mouse moves

        applyAcceleration(velocity, dx, dy, ACCELERATION)

        // clamp speed (important)
        velocity.current.x = THREE.MathUtils.clamp(
            velocity.current.x,
            -MAX_SPEED,
            MAX_SPEED
        );
        velocity.current.y = THREE.MathUtils.clamp(
            velocity.current.y,
            -MAX_SPEED,
            MAX_SPEED
        );

        // apply friction (water drag)
        velocity.current.x *= DAMPING;
        velocity.current.y *= DAMPING;

        // integrate velocity → position
        fishRef.current.position.x += velocity.current.x;
        fishRef.current.position.y += velocity.current.y;

        const isMouseMoving = Math.abs(dx) > EPSILON || Math.abs(dy) > EPSILON;

        if (isMouseMoving) {
            motionState.velocity.copy(velocity.current);
            //motionState.speed = velocity.current.length();
            targetRotation.current.z = velocity.current.y * 1.5;
            targetRotation.current.y = velocity.current.y * 0.95;
        }

        const speed01 = THREE.MathUtils.clamp(
            motionState.velocity.length() / MAX_FISH_SPEED,
            0,
            1
        )

        const targetScale = new THREE.Vector3(
            THREE.MathUtils.lerp(1, 4, speed01), // stretch forward
            THREE.MathUtils.lerp(1, 1.05, speed01),
            THREE.MathUtils.lerp(1, 1.1, speed01)
        )
        bodyGroupRef.current!.scale.lerp(targetScale, 0.6)

        fishRef.current.rotation.z = THREE.MathUtils.lerp(
            fishRef.current.rotation.z,
            targetRotation.current.z,
            0.1
        );
        

        fishRef.current.rotation.y = THREE.MathUtils.lerp(
            fishRef.current.rotation.y,
            targetRotation.current.y,
            0.1
        );
    });




    return (
        <group ref={fishRef} position={position} scale={0.5}>
            <group ref={bodyGroupRef}>

            {/* Body of the fish */}
            {/* it should be box geometry that facing towards us  */}

            <Body  />

            {/* Eyes and retina  */}
            <Eye />
            <Eye reverse={true} />

            {/* Tooths */}
            <AnimatedTooth />
            </group>
            <WingsTails velocity={speed.current} />
        </group>
    )
}