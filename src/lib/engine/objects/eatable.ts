import { DisplayObject } from "../core/display-object";
import { Class } from "../core/types";
import { Circle } from "../geometry/circle";

const IS_EATABLE = Symbol("isEatable");

export interface Eatable extends DisplayObject {
  [IS_EATABLE]: boolean;
  score: number;
  body: Circle;
  intersects(other: Eatable): boolean;
}

export function Eatable<T extends Class<DisplayObject>>(SuperClass: T) {
  abstract class Eatable extends SuperClass {
    [IS_EATABLE] = true;
    score = 0;
    body = new Circle({
      radius: 0,
      color: "",
    });

    intersects(object: Eatable) {
      const distance = this.position.copy().sub(object.position).magnitude;
      const maxRadius = this.body.radius;
      return distance < maxRadius;
    }
  }

  return Eatable;
}

export function isEatable(object: any): object is Eatable {
  return object && object[IS_EATABLE];
}
