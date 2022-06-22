import type { DisplayObject } from "../core/display-object";
import { Vector } from "../geometry/vector";
import { Container } from "./container";

export class Camera extends Container {
  private followingObject: DisplayObject | null = null;

  get zoom() {
    return (this.scale.x + this.scale.y) / 2;
  }

  set zoom(value: number) {
    value = Math.max(value, 0);
    this.scale.set(value, value);
  }

  follow(object: DisplayObject) {
    this.followingObject = object;
  }

  update(time: number) {
    super.update(time);

    if (!this.game || !this.followingObject) return;

    this.translate
      .set(0, 0)
      .sub(this.followingObject.position)
      .add(
        new Vector(this.game.view.width / 2, this.game.view.height / 2).div(
          this.scale
        )
      );
  }
}
