import Menu from "./scenes/menu.js";
import Game from "./scenes/game.js";
import SecondWorld from "./scenes/2ndWorld.js";
import Touches from "./scenes/Touches.js"


const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 550,
  parent: "container",
  pixelArt: true,
  backgroundColor: "#1d212d",
  scene: [Menu, Game, SecondWorld, Touches],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);