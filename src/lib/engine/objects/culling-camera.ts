import { isDisplayObject } from "../core/display-object";
import { Bounds } from "../util/Bounds";
import { between } from "../util/util";
import { Camera } from "./camera";

export class CullingCamera extends Bounds(Camera) {
  update(time: number) {
    super.update(time);
    if (!this.game) return;
    for (const child of this.children) {
      if (isDisplayObject(child)) {
        const position = child.viewPosition
          .copy()
          .sub(this.viewPosition)
          .add(this.translate);
        child.isVisible =
          between(0, position.x, this.game.view.width / this.zoom) &&
          between(0, position.y, this.game.view.height / this.zoom);
      }
    }
  }
}
