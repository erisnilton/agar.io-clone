import { DisplayObject } from "../engine/core/display-object";
import { Vector } from "../engine/geometry/vector";
import { CullingCamera } from "../engine/objects/culling-camera";
import { CurrentPlayer } from "./current-player";
import { Player } from "./players";

export interface MinimapOption {
  camera: CullingCamera;
  size: number;
  currentPlayer: CurrentPlayer;
}

export class Minimap extends DisplayObject {
  camera: CullingCamera;
  size: number;
  currentPlayer: CurrentPlayer;
  radius = 1000;
  canvas = document.createElement("canvas");
  draw = this.canvas.getContext("2d")!;

  constructor(options: MinimapOption) {
    super();
    this.camera = options.camera;
    this.size = options.size;
    this.currentPlayer = options.currentPlayer;
  }

  get factorScale() {
    const viewScale = new Vector(
      this.size / this.camera.bounds.width,
      this.size / this.camera.bounds.height
    );

    const radiusScale = new Vector(
      (this.radius * 2) / this.camera.bounds.width,
      (this.radius * 2) / this.camera.bounds.height
    );

    return viewScale.div(radiusScale);
  }

  get playerPosition() {
    return this.calcPosition(this.currentPlayer.position);
  }

  calcPosition(vector: Vector) {
    return vector.copy().scale(this.factorScale);
  }

  setup(): void {
    super.setup();
    this.canvas.width = this.size;
    this.canvas.height = this.size;
  }

  render(context: CanvasRenderingContext2D): void {
    this.draw.save();
    this.draw.globalAlpha = 0.8;
    this.draw.clearRect(0, 0, this.size, this.size);
    this.draw.fillStyle = "#1b1b1b";
    this.draw.fillRect(0, 0, this.size, this.size);
    const playerPosition = this.playerPosition;
    const center = this.size / 2;

    this.draw.translate(-playerPosition.x + center, -playerPosition.y + center);

    this.draw.globalAlpha = 1;

    for (const child of this.camera.children) {
      if (!(child instanceof Player)) continue;
      // if (child instanceof CurrentPlayer) continue;

      const distance = this.currentPlayer.position.copy().sub(child.position);

      if (distance.magnitude > this.radius) continue;

      this.draw.globalAlpha = 1 - distance.magnitude / this.radius;

      const isCurrent = child instanceof CurrentPlayer;
      const size = Math.max(
        4,
        isCurrent ? 6 : child.body.radius * (this.factorScale.magnitude / 2)
      );

      const position = this.calcPosition(child.position);

      this.draw.fillStyle = isCurrent ? "cyan" : "red";
      this.draw.beginPath();
      this.draw.arc(position.x, position.y, size, 0, Math.PI * 2);
      this.draw.closePath();
      this.draw.fill();
    }

    this.draw.restore();

    this.prepareCanvas(context, () => {
      context.drawImage(this.canvas, 0, 0, this.size, this.size);
    });
  }
}
