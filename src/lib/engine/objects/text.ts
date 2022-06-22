import { DisplayObject } from "../core/display-object";

export interface TextStyle {
  fill?: string;
  align?: CanvasTextAlign;
  verticalAlign?: CanvasTextBaseline;
  font?: {
    family?: string;
    size?: number;
    weight?: string;
  };
  stroke?: {
    color?: string;
    width?: number;
  };
}

export interface TextOptions {
  text: string;
  style: TextStyle;
}

export class Text extends DisplayObject {
  style: TextStyle;
  text: string;
  constructor(options: TextOptions) {
    super();
    this.style = options.style;
    this.text = options.text;
  }

  render(context: CanvasRenderingContext2D) {
    const { text, style } = this;

    this.prepareCanvas(context, () => {
      context.fillStyle = style.fill ?? "white";
      context.textAlign = style.align ?? "left";
      context.textBaseline = style.verticalAlign ?? "top";
      context.font = `${style.font?.weight} ${style.font?.size}px ${style.font?.family}`;

      context.fillText(text, 0, 0);
      context.lineWidth = style.stroke?.width ?? 0;
      context.strokeStyle = style.stroke?.color ?? "black";
      context.strokeText(text, 0, 0);
    });
  }
}
