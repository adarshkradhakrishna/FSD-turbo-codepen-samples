import { Effects } from "../engine/Effects";

export class Firework extends Effects {
    particles: any[] = [];
    count: number = 80;

    constructor() {
        super();
        this.explode();
    }

    explode() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const color = `hsl(${Math.random() * 360}, 100%, 60%)`
        for (let i = 0; i < this.count; i++) {
            const angle = Math.random() * (Math.PI * 2);
            const speed = Math.random() * 5 + 2;
            this.particles.push({
                x: x,
                y: y,
                radius: Math.random() * 10,
                color: color,
                speed: speed,
                angle: angle,
                alpha: 1,
                decay: Math.random() * 0.01 + 0.005,
                vy: Math.sin(angle) * speed,
            })
        }

    }

    draw(ctx: CanvasRenderingContext2D) {
        this.particles.forEach((part) => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
            ctx.fillStyle = part.color;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        })
        ctx.globalAlpha = 1;
    }

    update(dt: number) {
        this.particles.forEach(p => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += p.vy;
            p.vy += 1.5 * dt;
            p.alpha -= p.decay;
        });
        this.particles = this.particles.filter(p => p.alpha > 0)

        if (this.particles.length == 0) {
            this.explode()
        }

    }
}