
import { Effects } from "../engine/Effects";
import { Firework } from "./Particle";



export class FireWorkEffects extends Effects{
    fireworks: any[];
    constructor(count:number = 10) {
        super();
        this.fireworks = []
        for (let i =0 ; i<count; i++){
            this.fireworks.push(new Firework())
        }

    }

    update(dt: number): void {
        this.fireworks.forEach(firework => {
            firework.update(dt);
        })
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.fireworks.forEach(firework => {
            firework.draw(ctx);
        })
    }
}