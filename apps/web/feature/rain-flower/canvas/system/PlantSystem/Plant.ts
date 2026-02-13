

import { BranchNode } from "./Branch";

const maxDepth = 3

let count = 1 ;

export class Plant {
    rootX: number;
    rootY: number;
    allBranches: BranchNode;

    constructor(x: number, y: number) {
        this.rootX = x;
        this.rootY = y;
        const rootBranch = new BranchNode(this.rootX, this.rootY,0);
        rootBranch.generateChildrenRecursively(maxDepth);
        this.allBranches = rootBranch;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.moveTo(this.rootX, this.rootY)
        if (this.allBranches.isSubtreeFullyDrawn){
            this.drawPlant(ctx, this.allBranches);
        }
        else{
            this.allBranches.drawProgressively(ctx)
        }
       
    }

    update(dt: number) {
        
    }

    drawPlant(ctx: CanvasRenderingContext2D, branch: BranchNode) {
        branch.drawCompleteTreeRecursively(ctx)
    }
}