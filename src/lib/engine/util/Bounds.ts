import { isDisplayObject } from "../core/display-object";
import { Class } from "../core/types";
import { Container } from "../objects/container";
import { Rect } from "./../geometry/rect";
import { clamp } from "./util";

export function Bounds<T extends Class<Container>>(SuperClass: T) {
  class Bounds extends SuperClass {
    bounds = new Rect({ x: 0, y: 0, width: 10000, height: 10000 });

    update(time: number): void {
      super.update(time);

      for (const child of this.children) {
        if (!isDisplayObject(child)) continue;

        child.position.x = clamp(
          child.position.x,
          this.bounds.x,
          this.bounds.x + this.bounds.width
        );

        child.position.y = clamp(
          child.position.y,
          this.bounds.y,
          this.bounds.y + this.bounds.height
        );
      }
    }

    render(context: CanvasRenderingContext2D): void {
      this.prepareCanvas(context, () => {
        context.strokeStyle = "red";
        context.lineWidth = 1;
        context.strokeRect(
          this.bounds.x,
          this.bounds.y,
          this.bounds.width,
          this.bounds.height
        );
      });

      return super.render(context);
    }
  }

  return Bounds;
}
