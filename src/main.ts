import { Background } from "./lib/objects/background";
import "./style.css";

import { Game } from "./lib/engine/core/game";
import { Vector } from "./lib/engine/geometry/vector";
import { CullingCamera } from "./lib/engine/objects/culling-camera";
import { Score } from "./lib/engine/objects/score";
import { generateColor } from "./lib/engine/util/util";
import { CurrentPlayer } from "./lib/objects/current-player";
import { Eat } from "./lib/objects/eat";
import { Enemy } from "./lib/objects/enemy";
import { EnemyCounter } from "./lib/objects/enemyCounter";
import { Minimap } from "./lib/objects/minimap";

const game = new Game({
  resizeTo: window,
  background: "#000",
  view: document.getElementById("app") as HTMLCanvasElement,
});

const camera = new CullingCamera();
// camera.bounds.width = 1000;
// camera.bounds.height = 1000;
// camera.bounds.x = -500;
// camera.bounds.y = -500;
const bg = new Background({ gridSize: 64, camera });

const player = new CurrentPlayer({
  id: "Eu",
  score: 30,
  skin: "red",
});

player.position.copyFrom(Vector.random(camera.bounds));

const miniMap = new Minimap({
  camera,
  size: 240,
  currentPlayer: player,
});

miniMap.position.set(
  game.view.width - miniMap.size,
  game.view.height - miniMap.size
);

const score = new Score({
  player,
});

const counterEnemy = new EnemyCounter({ camera });
counterEnemy.position.set(20, game.view.height - 10 - 24);
score.position.set(20, game.view.height);
game.stage.add(bg, camera, miniMap, score, counterEnemy);

function seed() {
  for (let i = 0; i < 500; i++) {
    const circle = new Eat({
      id: i.toString(),
      color: generateColor(),
      score: 1,
    });

    circle.position.copyFrom(Vector.random(camera.bounds));
    camera.add(circle);
  }
}

seed();

setInterval(seed, 10000);

// Loop inimigos
for (let i = 0; i < 50; i++) {
  const enemy = new Enemy({
    id: "Inimigo " + (i + 1),
    score: 25 + Math.random() * 20,
    skin: generateColor(),
  });

  enemy.velocity.set((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);

  enemy.position.copyFrom(Vector.random(camera.bounds));

  camera.add(enemy);
}

camera.getZIndex = (item: any) => item.score ?? item.zIndex;

camera.add(player);

camera.follow(player);

game.ticker.add(() => {
  let count = 0;
  for (const child of camera.children) {
    if (child instanceof Enemy) {
      count++;
    }
  }
  // console.clear();
  console.log(count);
});
