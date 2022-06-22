import { Container } from "../objects/container";
import { Ticker } from "./ticker";

interface GameOptions {
  view: HTMLCanvasElement;
  resizeTo: any;
  background: string;
}

export class Game {
  public readonly context: CanvasRenderingContext2D;

  public readonly stage = new Container();
  public readonly ticker = new Ticker();

  get view() {
    return this.options.view;
  }
  #updateSize = () => {
    this.view.width = this.options.resizeTo.innerWidth;
    this.view.height = this.options.resizeTo.innerHeight;
  };

  constructor(public readonly options: GameOptions) {
    this.#updateSize();
    this.context = this.view.getContext("2d")!;
    this.ticker.add((time: number) => this.update(time));
    this.stage.game = this;
    this.stage.setup();
    this.ticker.start();
    this.options.resizeTo.addEventListener("resize", this.#updateSize);
  }

  render() {
    this.context.resetTransform();
    this.context.clearRect(0, 0, this.view.width, this.view.height);
    this.context.fillStyle = this.options.background;
    this.context.fillRect(0, 0, this.view.width, this.view.height);
    return this.stage.render(this.context);
  }

  update(time: number) {
    this.stage.update(time);
    this.render();
  }
}
