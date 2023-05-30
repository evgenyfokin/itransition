import {Game} from "./Game.js";

const game = new Game(process.argv.slice(2))
game.run()