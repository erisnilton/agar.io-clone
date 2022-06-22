export interface RectOptions {
  width: number;
  height: number;
  x: number;
  y: number;
}

export class Rect {
  width: number;
  height: number;
  x: number;
  y: number;

  constructor(options: RectOptions) {
    this.width = options.width;
    this.height = options.height;
    this.x = options.x;
    this.y = options.y;
  }
}
