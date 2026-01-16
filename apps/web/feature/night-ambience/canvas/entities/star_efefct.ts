import { Effects } from "../engine/Effects";

export interface StarType{
    x: number;
    y: number;
    radius: number;
    alpha: number;
}

export class Star extends Effects{
    stars: StarType[];

    constructor(count:number) {
        super();
        this.stars = []
        for (let i =0 ; i<count; i++){
            this.stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 1.5,
                alpha: Math.random()
            });
        }
        
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.stars.forEach(star => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(234, 239, 44, ${star.alpha})`;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        })
    }

    update(): void {

    }


    
}



