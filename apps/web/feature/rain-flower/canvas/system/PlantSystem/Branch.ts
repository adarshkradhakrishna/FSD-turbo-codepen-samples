import { getRand } from '../../../../../../shared/lib/Math'
import { Flower } from './Flower';

function normalize(v: any) {
    const len = Math.sqrt(v.x * v.x + v.y * v.y);
    return {
        x: v.x / len,
        y: v.y / len
    };
}

function getDirectionParent(v: { x: number, y: number }) {
    const len = Math.hypot(v.x, v.y);
    return {
        x: v.x / len,
        y: v.y / len
    };
}


function perpendicular(v: any) {
    return {
        x: -v.y,
        y: v.x
    };
}

const baseDirectoin = { x: 0, y: -1 } // upwards

function getQuadraticPoint(p0: { x: number, y: number }, p1: { x: number, y: number }, p2: { x: number, y: number }, t: number) {
    return {
        x:
            (1 - t) * (1 - t) * p0.x +
            2 * (1 - t) * t * p1.x +
            t * t * p2.x,
        y:
            (1 - t) * (1 - t) * p0.y +
            2 * (1 - t) * t * p1.y +
            t * t * p2.y
    };
}

function getQuadraticTangent(p0: { x: number, y: number }, p1: { x: number, y: number }, p2: { x: number, y: number }, t: number) {
    return {
        x: 2 * (1 - t) * (p1.x - p0.x) +
            2 * t * (p2.x - p1.x),

        y: 2 * (1 - t) * (p1.y - p0.y) +
            2 * t * (p2.y - p1.y)
    };
}

const minFlowerPostionDepth = 3




export class BranchNode {
    P0: { x: number, y: number }
    P1: { x: number, y: number }
    P2: { x: number, y: number }
    children: BranchNode[]
    depth: number
    hasFlower: boolean;
    length: number;
    progress: number = 0;
    fullyDrawn: boolean = false;
    name:string;
    flower: null | Flower


    constructor(starX: number, startY: number, depth: number, direction?: { x: number, y: number }) {
        this.P0 = { x: starX, y: startY }
        this.children = []
        this.depth = depth;
        //this.hasFlower = this.depth > minFlowerPostionDepth &&  getRand(0,5) > minFlowerPostionDepth
        this.hasFlower = true 
        //his.depth > minFlowerPostionDepth
        const points = this.generateStem(this.P0, direction || baseDirectoin)
        this.P1 = points.p1
        this.P2 = points.p2
        this.length = points.length
        this.name=`branch-${depth}`
        this.flower = this.hasFlower ? new Flower(this.P2.x, this.P2.y) : null
    }

    generateStem(p0: { x: number, y: number }, baseDirection: { x: number, y: number }) {

        const dir = normalize(baseDirection);
        const length = getRand(20, 90);

        const p2 = {
            x: p0.x + dir.x * length,
            y: p0.y + dir.y * length
        };

        const mid = {
            x: (p0.x + p2.x) / 2,
            y: (p0.y + p2.y) / 2
        };

        const perp = perpendicular(dir);

        const curveStrength = getRand(-20, 20);

        const p1 = {
            x: mid.x + perp.x * curveStrength,
            y: mid.y + perp.y * curveStrength
        };

        return { p0, p1, p2, length };
    }

    generateChildrenRecursively(maxDepth: number) {
        if (this.depth >= maxDepth) return;
        let childCount = 0;
        if (this.length > 70) {
            childCount = 2;
        } else if (this.length > 30) {
            childCount = 1;
        } else {
            childCount = 0;
        }
        

        for (let i = 0; i < childCount; i++) {
            const t = 0.2 + Math.random() * 0.8;
            const pointOnCurve = getQuadraticPoint(
                this.P0,
                this.P1,
                this.P2,
                t
            );
            const tangent = getQuadraticTangent(
                this.P0,
                this.P1,
                this.P2,
                t
            );
            const direction = getDirectionParent(tangent);

            const child = new BranchNode(
                pointOnCurve.x,
                pointOnCurve.y,
                this.depth + 1,
                direction,
            );
            this.children.push(child);
            child.generateChildrenRecursively(maxDepth);
        }
    }

    drawCompleteTree(ctx: CanvasRenderingContext2D) {
        const { P0, P1, P2 } = this;
        ctx.save()
        ctx.beginPath();
        ctx.moveTo(P0.x, P0.y);
        ctx.quadraticCurveTo(P1.x, P1.y, P2.x, P2.y);
        ctx.strokeStyle = "black"
        ctx.stroke();
        ctx.restore()
        for (const child of this.children) {
            child.drawProgressively(ctx);
        }
    }

    drawCompleteTreeRecursively(ctx: CanvasRenderingContext2D) {
        this.drawCompleteTree(ctx);
    }
    drawProgressively(ctx: CanvasRenderingContext2D) {
        if (!this.fullyDrawn) {
            this.drawByProgress(ctx, ctx.canvas);
            return;
        }
        if(this.fullyDrawn){
            this.drawCompleteTreeRecursively(ctx)
        }
        if (this.hasFlower && this.flower) this.flower?.draw(ctx)
        for (const child of this.children) {
            child.drawProgressively(ctx);
        }

    }

    drawByProgress(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.P0.x, this.P0.y);
        const steps = 100;
        const maxSteps = Math.floor(steps * this.progress);
        for (let i = 0; i <= maxSteps; i++) {
            const t = i / steps;
            const point = getQuadraticPoint(this.P0, this.P1, this.P2, t);
            ctx.lineTo(point.x, point.y);
        }
        ctx.strokeStyle = "black"
        ctx.stroke();
        ctx.restore();
        this.progress += 0.05;
        if (this.progress >= 1) {
            this.progress = 1;
            this.fullyDrawn = true;
        }
    }

    get isSubtreeFullyDrawn(): boolean {
        return this.fullyDrawn && this.children.every(child => child.isSubtreeFullyDrawn);
    }

}

