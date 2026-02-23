import { Plant } from "../PlantSystem/Plant";
import { PlantSystem } from "../PlantSystem/PlantSystem";
import { System } from "../System";
import { RainDrop } from "./RainDrop";

export class RainSystem extends System {
    drops: RainDrop[]
    plants: PlantSystem
    height: number
    constructor(width: number, plantSystem: PlantSystem, height:number ,drops?: RainDrop[]) {
        super()
        this.drops = drops || Array.from({ length: 10 }, () => new RainDrop(width,height))
        this.plants = plantSystem
        this.height = height
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        
        this.drops.forEach((drop) => {
            drop.draw(ctx)
        })
    }

    update(dt: number): void {
        this.drops.forEach((drop) => {
            if(drop.collideState?.isDead) return
            const collideDrops = drop.update(dt)
            if (collideDrops && collideDrops.x && collideDrops.y) {
                const plant = new Plant(collideDrops.x, collideDrops.y)
                this.plants.addToSystem(plant)
            }
        })
    }
    addToSystem(data: any): void {
        if (data instanceof RainDrop) {
            this.drops.push(data)
        }
        else {
            this.plants.addToSystem(data)
        }
    }
}