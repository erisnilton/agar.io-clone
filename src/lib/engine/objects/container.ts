import { DisplayObject, isDisplayObject } from "../core/display-object";
import { GameObject } from "../core/game-object";

export class Container extends DisplayObject {
  children: GameObject[] = [];

  getZIndex = (item: GameObject) => item.zIndex;

  sort() {
    this.children.sort((a, b) => this.getZIndex(a) - this.getZIndex(b));
  }

  add(...objects: GameObject[]) {
    for (const object of objects) {
      object.game = this.game;
      object.parent = this;
      this.children.push(object);
      if (this.game) {
        object.setup();
      }
    }
    return this.sort();
  }

  remove(object: GameObject) {
    object.destroy();

    delete object.parent;
    // delete object.game;

    const index = this.children.indexOf(object);

    if (index >= 0) {
      this.children.splice(index, 1);
    }

    return this.sort();
  }

  clear() {
    for (const child of this.children) {
      this.remove(child);
    }
  }

  setup(this: Container): void {
    this.children.forEach((s) => {
      s.game = this.game;
      s.parent = this;
      s.setup();
    });
  }

  update(time: number) {
    this.children.forEach((child) => child.update(time));
    return super.update(time);
  }

  render(context: CanvasRenderingContext2D): void {
    return this.prepareCanvas(context, () => {
      this.children.forEach((c) => {
        if (isDisplayObject(c) && c.isVisible) {
          c.render(context);
        }
      });
    });
  }

  destroy(this: Container) {
    this.children.forEach((child) => child.destroy());
  }
}
