import { getRand } from "../../../../../../shared/lib/Math";

export class Flower {
    color: string;
    centerColor: string;
    petalCount: number;
    radius: number;
    position: { x: number; y: number };

    constructor(x: number, y: number) {
        this.position = { x, y };
        this.radius = getRand(6, 10);
        this.petalCount = Math.floor(getRand(5, 9));
        this.color = `hsl(${Math.random() * 360}, 80%, 65%)`;
        this.centerColor = "gold";
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        const { x, y } = this.position;

        ctx.translate(x, y);

        for (let i = 0; i < this.petalCount; i++) {
            const angle = (Math.PI * 2 / this.petalCount) * i;
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(0, 0);

            // Petal shape using quadratic curves
            ctx.quadraticCurveTo(
                this.radius * 0.8,
                -this.radius * 0.8,
                0,
                -this.radius * 1.8
            );

            ctx.quadraticCurveTo(
                -this.radius * 0.8,
                -this.radius * 0.8,
                0,
                0
            );

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.rotate(-angle);
        }

        // Flower center
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = this.centerColor;
        ctx.fill();

        ctx.restore();
    }
}