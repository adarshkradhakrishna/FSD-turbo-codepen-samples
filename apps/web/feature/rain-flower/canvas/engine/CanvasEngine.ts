import { System } from "../system/System";


class CanvasEngine {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D | null;
    dpr: number;
    running: boolean;
    lastTime:number;
    systems: System[]
    canvasReady: boolean = false;

    constructor(canvas: HTMLCanvasElement,system:System[]) {
        this.lastTime = 0;
        this.ctx = canvas.getContext("2d")
        if (!this.ctx) throw new Error("EWrror occured in context creation");
        this.width = canvas.width
        this.height = canvas.height
        this.canvas = canvas
        this.dpr = window.devicePixelRatio || 1
        this.systems = system
        this.running = false;
        this.onResize()
        window.addEventListener('resize',this.onResize)
    }

    onResize = () => {
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;

        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;

        this.ctx!.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

        // ✅ update engine dimensions in logical pixels
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvasReady= true;
    }


    // for starting the engine 

    start(){
        if(!this.canvasReady) {
            this.start()
        }
        this.running = true;
        requestAnimationFrame(this.loop.bind(this))
    }
    stop(){
        this.running = false
    }
    
    loop(time:number){
        if (!this.running) return
        this.ctx?.clearRect(0,0,window.innerWidth,window.innerHeight)
        const dt = (time - this.lastTime) /1000
        this.lastTime = time
        this.systems.forEach((system)=>{
            system.draw(this.ctx!)
            system.update(dt, this.ctx!)
        })
        
       requestAnimationFrame(this.loop.bind(this))
    }
}


export { CanvasEngine };