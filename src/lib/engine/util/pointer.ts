import { DisplayObject } from "../core/display-object";
import { GameObject } from "../core/game-object";
import { Vector } from "../geometry/vector";
import { Camera } from "../objects/camera";
import { Class } from "./../core/types";

export interface Pointer extends GameObject {
  pointerPosition: Vector;
}

export function Pointer<T extends Class<DisplayObject>>(SuperClass: T) {
  abstract class Pointer extends SuperClass {
    #pointerPosition = new Vector();
    pointerPosition = new Vector();

    #camera?: Camera;

    private onPointerMove = (event: PointerEvent) => {
      this.#pointerPosition.set(event.clientX, event.clientY);
    };

    setup() {
      super.setup();
      this.game?.view.addEventListener("pointermove", this.onPointerMove);
      this.#camera = this.find((n) => n instanceof Camera) as Camera;
    }

    update(time: number) {
      super.update(time);

      if (!this.#camera) return;

      this.pointerPosition
        .copyFrom(this.#pointerPosition)
        .div(this.#camera.scale)
        .sub(this.#camera.translate);
    }

    destroy(): void {
      this.game?.view.removeEventListener("pointermove", this.onPointerMove);
      super.destroy();
    }
  }

  return Pointer;
}
