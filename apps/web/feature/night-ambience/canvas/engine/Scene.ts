import { Effects } from "./Effects";
// scene will handle multiple effects update and drawing 
export class Scene extends Effects{
    effects: Effects[];
    
    constructor() {
        super();
        this.effects = []
    }

    add(effect: Effects) {
        this.effects.push(effect);
    }
    update(dt: number): void {
        this.effects.forEach(effect => effect.update(dt));
        // Update logic for the scene can be implemented here
    }
    draw(ctx: CanvasRenderingContext2D): void {
        // Drawing logic for the scene can be implemented here
        this.effects.forEach(effect => effect.draw(ctx));
    }
    
}