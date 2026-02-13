'use client'
import { useEffect, useRef } from "react"
import { CanvasEngine } from "../canvas/engine/CanvasEngine"
import { RainSystem } from "../canvas/system/RainSystem/RainSystem"
import { PlantSystem } from "../canvas/system/PlantSystem/PlantSystem"


function CanvasScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
       if(!canvasRef.current) return
        const plantSystem = new PlantSystem()
        const rainSystem = new RainSystem(canvasRef.current.getBoundingClientRect().width, plantSystem, canvasRef.current.getBoundingClientRect().height)
       const engine = new CanvasEngine(canvasRef.current,[rainSystem,plantSystem])
       engine.start()
       return()=>{
        engine.stop()
       }
    },[canvasRef.current])
    return (
        <canvas className="w-screen h-screen" ref={canvasRef} />
    )
}

export { CanvasScene }