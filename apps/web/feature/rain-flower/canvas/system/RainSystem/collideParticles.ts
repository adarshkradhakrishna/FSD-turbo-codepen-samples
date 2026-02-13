import { SplashParticle } from "./splashParticles";

class CollideParticles{
    particles: SplashParticle[] = [];

    constructor() {
        this.particles = [new SplashParticle(), new SplashParticle()]
    }

    init(x: number, y: number){
        this.particles.forEach((particle) => particle.init(x, y))
    }

    draw(ctx:CanvasRenderingContext2D){
      this.particles.forEach((particle) => particle.draw(ctx))
    }

    update(dt:number){
        this.particles.forEach((particle) => particle.update(dt))
        
    }
    get isDead() {
        return this.particles.every(p => p.life <= 0)
    }
    
}


export {CollideParticles}