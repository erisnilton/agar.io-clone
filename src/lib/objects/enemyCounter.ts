import { Camera } from "../engine/objects/camera";
import { Text } from "../engine/objects/text";
import { Enemy } from "./enemy";

export interface EnemyCounterOptions {
  camera: Camera;
}

export class EnemyCounter extends Text {
  camera: Camera;

  constructor(options: EnemyCounterOptions) {
    super({
      text: "",
      style: {
        fill: "white",
        stroke: { color: "black", width: 1 },
        font: { family: "monospace", size: 24, weight: "bold" },
        align: "left",
        verticalAlign: "bottom",
      },
    });
    this.camera = options.camera;
  }

  update(time: number): void {
    super.update(time);
    let counter = 0;
    for (const child of this.camera.children) {
      if (child instanceof Enemy) counter++;
    }
    this.text = `Inimigos: ${counter}`;
  }
}
