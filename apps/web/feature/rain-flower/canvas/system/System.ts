//what is a system 

// will have diffrentbsystem like rain fall , plant grow etc 

// both we need to draw and update ;

interface SystemInterface {
  update: (dt: number, ctx: CanvasRenderingContext2D)=>void;
  draw:(ctx:CanvasRenderingContext2D)=>void;
  addToSystem?:(data:any)=>void
}

abstract class System implements SystemInterface {
  abstract update(dt: number, ctx: CanvasRenderingContext2D): void
  abstract draw(ctx:CanvasRenderingContext2D):void
  abstract addToSystem(data:any): void
}

export {System};