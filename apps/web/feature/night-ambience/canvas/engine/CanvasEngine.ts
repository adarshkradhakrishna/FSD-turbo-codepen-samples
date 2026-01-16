import { Scene } from "./Scene";

export class CanvasEngine{
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    dpr: number;
    canvas: HTMLCanvasElement;
    running: boolean = false;
    scene: Scene = new Scene();
    lastTime: number = 0;
    constructor(canvas: HTMLCanvasElement,scene:Scene) {
        const ctx = canvas.getContext("2d")!;
        if (!ctx) throw new Error("Canvas not supported");
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        this.scene = scene;
        this.dpr = window.devicePixelRatio || 1
        this.canvas = canvas;
        this.resize();
        window.addEventListener("resize", this.resize); 
    }

    resize(){
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    start(){
        this.running = true;
        requestAnimationFrame(this.loop.bind(this));
    }

    stop(){
        this.running = false;
    }


    loop(time:number){
        if(!this.running ) return;
        const dt = (time - this.lastTime) / 1000;
        this.lastTime = time;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.scene?.update(dt);
        this.scene.draw(this.ctx);
        requestAnimationFrame(this.loop.bind(this));
    }

}