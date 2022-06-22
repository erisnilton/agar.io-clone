import { Vector } from "../engine/geometry/vector";
import { Container } from "../engine/objects/container";
import { Eatable, isEatable } from "../engine/objects/eatable";
import { Text } from "../engine/objects/text";
import { Phisics } from "../engine/util/phisics";
import { Pointer } from "../engine/util/pointer";
import { Circle } from "./../engine/geometry/circle";
import { Camera } from "./../engine/objects/camera";

export interface PlayerOptions {
  id: string;
  score: number;
  skin: string;
}

export class Player extends Eatable(Pointer(Phisics(Container))) {
  protected text: Text;

  get fontSize() {
    return Math.max(this.body.radius * 0.4, 18);
  }

  get strokeWidth(): number {
    return this.fontSize * 0.05;
  }

  get id(): string {
    return this.options.id;
  }

  get camera() {
    return this.parent as Camera;
  }

  move(vector: Vector) {
    this.velocity.copyFrom(vector.copy().normalize().scale(new Vector(4)));
  }

  constructor(private readonly options: PlayerOptions) {
    super();

    this.body = new Circle({
      radius: options.score ?? 0,
      color: options.skin ?? "white",
    });
    this.text = new Text({
      text: this.id,
      style: {
        fill: "white",
        stroke: { color: "black", width: this.strokeWidth },
        font: { family: "Arial", size: this.fontSize, weight: "bold" },
        align: "center",
        verticalAlign: "middle",
      },
    });
    this.score = options.score ?? 0;

    this.add(this.body, this.text);
  }

  update(time: number) {
    super.update(time);
    this.body.radius = this.score / 2;
    this.text.style.font!.size = this.fontSize;

    for (const child of this.camera.children) {
      if (!isEatable(child)) continue;
      if (!child.isVisible) continue;

      if (child == this) continue;

      if (this.intersects(child)) {
        this.eat(child);
      }
    }
  }

  eat(item: Eatable) {
    this.camera.remove(item);
    this.score += item.score;
  }
}
