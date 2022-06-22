import { Game } from "./game";

export abstract class GameObject {
  game?: Game;
  parent?: GameObject;
  zIndex = 0;

  find(finder: (node: GameObject) => boolean) {
    let node: GameObject | undefined = this;

    while (node) {
      if (finder(node)) {
        return node;
      }

      node = node.parent;
    }

    return node;
  }

  setup() {}
  update(time: number) {}
  destroy() {}
}
