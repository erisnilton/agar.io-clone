import { Eatable } from "../engine/objects/eatable";
import { Player } from "./players";

export class CurrentPlayer extends Player {
  minPointerDistance = 10;

  setup() {
    super.setup();
    this.ajustZoom();
  }

  eat(item: Eatable) {
    super.eat(item);
    this.ajustZoom();
  }

  ajustZoom() {
    const size = Math.min(this.game!.view.width, this.game!.view.height);
    const zoom = size / this.body.radius / 8;
    this.camera.zoom = Math.min(zoom, 1.5);
  }
  update(time: number) {
    const pointerDirection = this.pointerPosition.copy().sub(this.position);
    if (pointerDirection.magnitude >= this.minPointerDistance) {
      this.move(pointerDirection);
    }
    super.update(time);
  }

  // destroy() {
  //   super.destroy();
  //   alert("fim");
  //   window.location.reload();
  // }
}
