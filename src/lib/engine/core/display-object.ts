import { Vector } from "../geometry/vector";
import { GameObject } from "./game-object";

export abstract class DisplayObject extends GameObject {
  isVisible = true;
  position = new Vector();
  pivot = new Vector();
  translate = new Vector();
  scale = new Vector(1, 1);
  angle = 0;

  get viewPosition() {
    let parent = this as GameObject & DisplayObject;
    const position = new Vector();
    while (parent) {
      position.add(parent.position).add(parent.translate).sub(parent.pivot);
      parent = parent.parent as GameObject & DisplayObject;
    }
    return position;
  }

  relativeTo(other: DisplayObject): Vector {
    return this.viewPosition.copy().sub(other.viewPosition);
  }

  prepareCanvas(context: CanvasRenderingContext2D, fn: () => void) {
    if (!this.isVisible) return;
    const translatedPosition = this.position.copy().add(this.translate);
    context.save();
    context.scale(this.scale.x, this.scale.y);
    context.translate(translatedPosition.x, translatedPosition.y);
    context.rotate(this.angle);
    context.translate(this.pivot.x, this.pivot.y);

    fn();

    context.restore();
  }

  abstract render(context: CanvasRenderingContext2D): void;
}

export function isDisplayObject(object: any): object is DisplayObject {
  return "render" in object && typeof object.render === "function";
}
