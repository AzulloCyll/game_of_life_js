import "core-js/stable";
import "regenerator-runtime/runtime";

import { board } from "./board";
import { Game } from "./game";

const game = new Game(board);
game.init();
