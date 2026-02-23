import { getRand } from "../../../../../../shared/lib/Math";
import { System } from "../System";
import { Plant } from "./Plant";

const maximumPlants = 50;

export class PlantSystem extends System {
    plants: Plant[];
    mouseX = 0;
    mouseY = 0;
    lastMouseX = 0;
    


    constructor() {
        super()
        this.plants = []
        window.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    draw(ctx: CanvasRenderingContext2D): void {
        this.removeFromSystem()
        this.plants.forEach((plant) => plant.draw(ctx))
    }

    update(dt:number){
        const velocityX = (this.mouseX - this.lastMouseX) / dt
      this.lastMouseX = this.mouseX

      for(const plant of this.plants){
        
          plant.applyMouseInteraction(
              this.mouseX,
              this.mouseY,
              velocityX
          );

        plant.update(dt)
      }
      
    }
    
    addToSystem(plant: Plant): void {
        this.plants.push(plant)
    }

    removeFromSystem(){
        if(this.plants.length >= (maximumPlants)){
            const removed= this.plants.filter((plant)=> plant.hasAnyFlower())
            if(removed.length==0){
                this.plants.splice(0, 5);
            }else{
                this.plants = removed
            }
        }

    }

}