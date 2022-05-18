import { generateCellSurroundings, randomDeadOrAlive } from "./utils";
import { Visualiser } from "./visualiser";
import { board } from "./board";

export class Game {
	constructor(board) {
		this.board = board;
		this.button1 = document.getElementsByClassName("button")[0];
		this.button2 = document.getElementsByClassName("button")[1];
		this.button3 = document.getElementsByClassName("button")[2];
		this.cellSurroundings = generateCellSurroundings();
		this.visualiser = new Visualiser(board);
		this.X = board[0].length;
		this.Y = board.length;
	}

	init = () => {
		this.visualiser.updateBoard(board);

		this.button1.addEventListener("click", () => {
			this.start();
		});

		this.button2.addEventListener("click", () => {
			this.randomise();
			this.visualiser.updateBoard(this.board);
		});

		this.button3.addEventListener("click", () => {
			window.location.reload();
		});
	};

	start = () => {
		this.init();

		if (!this.step) {
			this.step = setInterval(() => {
				this.lifeCycle(this.board);
				this.visualiser.updateBoard(this.board);
			}, 600);
		}
	};

	validator = (x, y, direction) => {
		if (
			x + direction.x >= 0 &&
			x + direction.x < this.X &&
			y + direction.y >= 0 &&
			y + direction.y < this.Y
		) {
			return true;
		} else return false;
	};

	randomise = () => {
		for (let x = 0; x < this.X; x++) {
			for (let y = 0; y < this.Y; y++) {
				this.board[x][y] = randomDeadOrAlive();
			}
		}
	};

	lifeCycle = () => {
		const temporaryBoard = this.board.map((arr) => {
			return [...arr];
		});

		for (let x = 0; x < this.X; x++) {
			for (let y = 0; y < this.Y; y++) {
				let counter = 0;
				for (let direction of this.cellSurroundings) {
					if (this.validator(x, y, direction)) {
						counter += this.board[x + direction.x][y + direction.y];
					}
				}

				//warunki życia
				if (counter === 3) {
					temporaryBoard[x][y] = 1;
				} else if (counter === 2 && this.board[x][y] === 1) {
					temporaryBoard[x][y] = 1;
				} else {
					temporaryBoard[x][y] = 0;
				}
			}
		}
		this.board = [...temporaryBoard];
	};
}
