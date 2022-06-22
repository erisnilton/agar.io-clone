export class Ticker {
  private nextFrame!: number;

  private queue = new Set<Function>();

  public frameTime = 1000 / 60;

  private lastTime = 0;

  get fps() {
    return 1000 * this.frameTime;
  }

  set fps(value: number) {
    this.frameTime = 1000 / value;
  }

  add(fn: Function) {
    this.queue.add(fn);
    return this;
  }

  remove(fn: Function) {
    this.queue.delete(fn);
    return this;
  }

  update(time = performance.now()) {
    if (this.lastTime != 0) {
      const elapsed = time - this.lastTime;
      const dt = elapsed / this.frameTime;
      this.queue.forEach((fn) => fn(dt));
    }
    this.lastTime = time;
  }

  start() {
    this.stop();
    const loop = (time: number) => {
      this.update(time);
      this.nextFrame = requestAnimationFrame(loop);
    };
    this.nextFrame = requestAnimationFrame(loop);
  }

  stop() {
    cancelAnimationFrame(this.nextFrame);
  }
}
