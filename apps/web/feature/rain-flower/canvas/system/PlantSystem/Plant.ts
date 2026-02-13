

import { BranchNode } from "./Branch";

const maxDepth = 3

export class Plant {
    rootX: number;
    rootY: number;
    allBranches: BranchNode;

    constructor(x: number, y: number) {
        this.rootX = x;
        this.rootY = y
        const rootBranch = new BranchNode(this.rootX, this.rootY,0);
        rootBranch.generateChildrenRecursively(maxDepth);
        this.allBranches = rootBranch;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.moveTo(this.rootX, this.rootY)
        this.drawPlant(ctx, this.allBranches);
    }

    drawPlant(ctx: CanvasRenderingContext2D, branch: BranchNode) {
        branch.draw(ctx)
    }
}