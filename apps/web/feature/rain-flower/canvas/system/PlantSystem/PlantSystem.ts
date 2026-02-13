import { System } from "../System";
import { Plant } from "./Plant";

export class PlantSystem extends System {
plants: Plant[];

constructor(){
    super()
    this.plants = []
}
draw(ctx: CanvasRenderingContext2D): void {
    this.plants.forEach((plant)=>plant.draw(ctx))
}
update(dt: number): void {
    this.plants.forEach((plant) => plant?.update(dt))
}
addToSystem(plant: Plant): void {
    this.plants.push(plant)
}

}