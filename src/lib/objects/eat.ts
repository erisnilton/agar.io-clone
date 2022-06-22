import { Circle } from "../engine/geometry/circle";
import { Eatable } from "../engine/objects/eatable";

export interface EatOPtions {
  id: string;
  score: number;
  color: string;
}

export class Eat extends Eatable(Circle) {
  constructor(options: EatOPtions) {
    super({ radius: 4, color: options.color });
    this.score = options.score;
  }
}
