const FRICTION = 0.98


export class SplashParticle {
    x: number = 0
    y: number = 0
    radius: number = 1.2
    vy: number = 0
    life: number = 60;
    angle: number = 0
    speed: number = 0
    vx: number = 0;
    particles: any = [];

    init(x: number, y: number) {
        this.x = x
        this.y = y
        this.life = 60;
        const angle = Math.random() * Math.PI - Math.PI;
        const speed = Math.random() * 2;
        this.vx = Math.cos(angle) * speed 
        this.vy = Math.sin(angle)
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }

    update(dt: number) {
        this.x += this.vx
        this.y += this.vy;
        this.vy += 1.5 * dt
        this.vx *= FRICTION
        this.life--
    }

    reset() {
        this.life = 20;
    }
}