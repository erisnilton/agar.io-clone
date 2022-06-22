import { Player } from "./lib/objects/players";
import { Game } from "./lib/engine/core/game";
import { Camera } from "./lib/engine/objects/camera";

const game = new Game({
  resizeTo: document.body,
  background: "#000",
  view: document.getElementById("app") as HTMLCanvasElement,
});

const camera = new Camera();

game.stage.add(camera);

const player = new Player({
  id: "player",
  score: 40,
  skin: "red",
});

camera.add(player);
