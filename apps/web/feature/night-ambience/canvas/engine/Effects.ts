interface EffectsInterface{
    update(dt:number):void;
    draw(ctx:CanvasRenderingContext2D):void;
}
export abstract class Effects implements EffectsInterface{
    abstract update(dt:number):void;
    abstract draw(ctx:CanvasRenderingContext2D):void;
}