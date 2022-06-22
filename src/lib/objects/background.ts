import { DisplayObject } from "../engine/core/display-object";
import { Camera } from "../engine/objects/camera";
export interface BackgroundOption {
  gridSize: number;
  camera: Camera;
}
export class Background extends DisplayObject {
  gridSize: number;
  canvas = document.createElement("canvas");
  context = this.canvas.getContext("2d")!;
  camera: Camera;

  constructor(options: BackgroundOption) {
    super();
    this.gridSize = options.gridSize;
    this.camera = options.camera;
  }

  get normalizedGridSize() {
    let size = this.camera.zoom * this.gridSize;

    while (size < this.gridSize) {
      size *= 2;
    }

    return size;
  }

  createPattern(context: CanvasRenderingContext2D) {
    const gridSize = this.normalizedGridSize;
    const draw = this.context;
    this.canvas.width = gridSize;
    this.canvas.height = gridSize;

    draw.clearRect(0, 0, gridSize, gridSize);
    draw.beginPath();
    draw.moveTo(1, 1);
    draw.lineTo(gridSize - 1, 1);
    draw.lineTo(gridSize - 1, gridSize - 1);
    draw.strokeStyle = "#fff4";
    draw.lineWidth = 2;
    draw.stroke();

    return context.createPattern(this.canvas, "repeat") as CanvasPattern;
  }

  render(context: CanvasRenderingContext2D): void {
    this.prepareCanvas(context, () => {
      const pattern = this.createPattern(context);
      const gridSize = this.normalizedGridSize;
      const origin = this.camera.translate.copy().scale(this.camera.scale);
      context.translate(origin.x % gridSize, origin.y % gridSize);

      context.fillStyle = pattern;

      context.fillRect(
        -gridSize,
        -gridSize,
        this.game!.view.width + gridSize * 2,
        this.game!.view.height + gridSize * 2
      );
    });
  }
}
