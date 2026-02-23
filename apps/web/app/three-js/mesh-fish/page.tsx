"use client"
import Scene from "../../../feature/three-js";

export default function MeshFish(){
    if(typeof window == undefined) return null
    return(
        <div className="w-screen h-screen scene">
            <Scene  />
        </div>
       
    )
}