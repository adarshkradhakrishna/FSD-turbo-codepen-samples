import { MARGIN } from "../../../constant";
import { CollideParticles } from "./collideParticles";

const MIN_SPEED = 4;
const MAX_SPEED =10;
const MAX_LENGTH = 20
const MIN_LENGTH = 10
const GRAVITY = 0.98

class RainDrop {
    x: number =0;
    y: number =0;
    length: number=0;
    speed: number =0;
    width:number = 0;
    isCollide:boolean=false;
    collideState?:CollideParticles
    height:number;
    constructor(width:number,height:number) {
        this.collideState = new CollideParticles()
        this.reset(width)
        this.width = width
        this.height = height
    }

    reset(width:number){
        this.x = Math.floor(Math.random() * ((width - MARGIN) - MARGIN + 1)) + MARGIN;
        this.y = -1
        this.speed = Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED + 1)) + MIN_SPEED
        this.length = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH + 1)) + MIN_LENGTH
        this.isCollide=false
    }

    draw(ctx: CanvasRenderingContext2D) {
     if(this.isCollide) {
        this.collideState?.draw(ctx)
        return
     }
     if(!ctx) return
     ctx.beginPath()
     ctx.moveTo(this.x,this.y)
     ctx.lineTo(this.x, this.y + this.length)
     ctx.stroke();
    }

    impact(){
        if(!this.isCollide){
            this.isCollide = true;
            this.collideState?.init(this.x,this.y)
        }
    }

    update(dt: number){
       if(this.isCollide) {
           this.collideState!.update(dt)
           if (this.collideState!.isDead) {
               this.reset(this.width)
               return {x:this.x,y:this.y}
           }
          return
       }
        const lastRaindrop = this.y + this.length
        if (lastRaindrop >= window.innerHeight) {
        this.impact()
        return
       }
       this.y += (this.speed + dt) * GRAVITY
    }
}

export { RainDrop };