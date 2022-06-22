import { Vector } from "../engine/geometry/vector";
import { Eat } from "./eat";
import { Player } from "./players";

export class Enemy extends Player {
  update(time: number) {
    super.update(time);
    let bestTarget = null as Vector | null;

    for (const child of this.camera.children) {
      if (
        child instanceof Player &&
        child !== this &&
        child.score < this.score
      ) {
        const direction = child.position.copy().sub(this.position);
        if (!bestTarget || direction.magnitude < bestTarget.magnitude) {
          bestTarget = direction;
        }
      }
    }

    if (!bestTarget) {
      for (const child of this.camera.children) {
        if (!(child instanceof Eat)) {
          continue;
        }

        const direction = child.position.copy().sub(this.position);

        if (!bestTarget || direction.magnitude < bestTarget.magnitude) {
          bestTarget = direction;
        }
      }
    }

    if (bestTarget && (bestTarget instanceof Eat || Math.random() <= 0.5)) {
      this.move(bestTarget);
    }
  }
}
