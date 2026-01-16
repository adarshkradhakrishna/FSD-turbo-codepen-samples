'use client';
import React, { useEffect } from "react";
import { Star } from "../canvas/entities/star_efefct";
import { Scene } from "../canvas/engine/Scene";
import { CanvasEngine } from "../canvas/engine/CanvasEngine";
import { FireWorkEffects } from "../canvas/entities/fire_work_effects";

function NightCanvas(){
    // Canvas reference make here 
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
       initCanvas()
    }, [canvasRef.current]);


    function initCanvas(){
        if (!canvasRef.current) return;

        let ctx = canvasRef.current!.getContext("2d")!;
        if (!ctx) return
        const scene = new Scene()
        scene.add(new Star(100));
        scene.add(new FireWorkEffects(10));
        // the effect will be added to the scene and draw to the canvas with engine
        const engine = new CanvasEngine(canvasRef.current, scene);
        // start the engine loop , which will call update and draw methods
        engine.start();
    }


    return <canvas ref={canvasRef} id="night-canvas" className="absolute top-0 left-0 w-full h-full"></canvas>  
}

export default NightCanvas;