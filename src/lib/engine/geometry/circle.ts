import { DisplayObject } from "../core/display-object";

export interface CircleOptions {
  radius: number;
  color: string;
}

export class Circle extends DisplayObject {
  radius: number;

  constructor(private readonly options: CircleOptions) {
    super();
    this.radius = options.radius;
  }

  render(context: CanvasRenderingContext2D): void {
    this.prepareCanvas(context, () => {
      context.fillStyle = this.options.color;
      context.beginPath();
      context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
    });
  }
}
