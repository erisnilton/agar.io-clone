import { Player } from "../../objects/players";
import { Text } from "./text";

export interface ScoreOptions {
  player: Player;
}

export class Score extends Text {
  player: Player;

  get scoreText() {
    return `Score: ${this.player.score}`;
  }

  constructor(options: ScoreOptions) {
    super({
      text: "",
      style: {
        fill: "white",
        stroke: { color: "black", width: 1 },
        font: { family: "monospace", size: 24, weight: "bold" },
        align: "left",
        verticalAlign: "bottom",
      },
    });
    this.player = options.player;
  }

  update(time: number) {
    super.update(time);
    this.text = this.scoreText;
  }
}
