import { DisplayObject } from "../core/display-object";
import { Class } from "../core/types";
import { Vector } from "../geometry/vector";

export interface Phisics extends DisplayObject {
  velocity: Vector;
  acceleration: Vector;
  friction: number;
}

export function Phisics<T extends Class<DisplayObject>>(SuperClass: T) {
  abstract class Phisics extends SuperClass {
    velocity = new Vector(0, 0);
    acceleration = new Vector(0, 0);
    friction = 0;

    update(delta: number) {
      this.velocity.add(this.acceleration);
      this.velocity.scale(new Vector(1 - this.friction));
      this.position.add(this.velocity.copy().scale(new Vector(delta)));

      super.update(delta);
    }
  }

  return Phisics;
}
