import "core-js/stable";
import "regenerator-runtime/runtime";

import { board } from "./ExamInput";
import { Visualiser } from "./visualiser";
import { getBall } from "./getBall";

class Game {
	constructor(ball, board) {
		this.ball = ball;
		this.board = board;
		this.state = 0;
		this.startingX = ball.x;
		this.startingY = ball.y;
		this.YPositionsArray = this.getYPositions();
	}

	getYPositions = () => {
		let arrOfY = [];
		for (let i = 0; i < this.board.length; i++) {
			for (let j = 0; j < this.board[0].length; j++) {
				if (this.board[i][j] === "Y") {
					arrOfY.push({ x: i, y: j });
				}
			}
		}
		return arrOfY;
	};

	init = () => {
		visualisation.updateBoard(board);
		let button1 = document.getElementsByClassName("button")[0];
		let button2 = document.getElementsByClassName("button")[1];

		button1.addEventListener("click", () => {
			this.start();
		});

		button2.addEventListener("click", () => {
			this.restart();
		});
	};

	start() {
		this.init();

		// ma sie uruchomić tylko raz
		if (!this.step) {
			this.step = setInterval(() => {
				this.board[this.ball.x][this.ball.y] = "0";

				if (this.isBallonYPos(this.ball)) {
					this.changeVectorDirectionOtherThanBackwards(
						this.ball.vector.x,
						this.ball.vector.y
					);
				}

				this.makeMove();
				this.board[this.ball.x][this.ball.y] = "1";
				visualisation.updateBoard(board);

				if (this.isBallOnStartingPosition()) {
					this.stop();
				}
			}, 200);
		}
	}

	stop = () => {
		clearInterval(this.step);
	};

	restart = () => {
		document.location.reload(true);
	};

	isBallonYPos = () => {
		for (let position of this.YPositionsArray) {
			if (position.x === this.ball.x && position.y === this.ball.y) {
				this.updateYPositions();
				return true;
			}
		}
	};

	updateYPositions = () => {
		let newArr = this.YPositionsArray.filter((item) => {
			return item.x !== this.ball.x || item.y !== this.ball.y;
		});

		this.YPositionsArray = [...newArr];
	};

	isBallOnStartingPosition() {
		if (this.startingX === this.ball.x && this.startingY === this.ball.y) {
			return true;
		} else return false;
	}

	makeMove() {
		if (this.willColideOnXAxis()) this.ball.vector.x *= -1;
		if (this.willColideOnYAxis()) this.ball.vector.y *= -1;

		if (this.willCollideOnBothAxis()) {
			this.ball.vector.x *= -1;
			this.ball.vector.y *= -1;
		}

		this.ball.move();
	}

	willCollideOnBothAxis() {
		if (
			this.board[this.ball.x + this.ball.vector.x][
				this.ball.y + this.ball.vector.y
			] === "X"
		) {
			return true;
		} else return false;
	}

	willColideOnXAxis() {
		if (this.board[this.ball.x + this.ball.vector.x][this.ball.y] === "X") {
			return true;
		} else return false;
	}

	willColideOnYAxis() {
		if (this.board[this.ball.x][this.ball.y + this.ball.vector.y] === "X") {
			return true;
		} else return false;
	}

	randomDirection() {
		let random = Math.floor(Math.random() * 10 + 1);
		return random <= 5 ? -1 : 1;
	}

	changeVectorDirectionOtherThanBackwards(vectorx, vectory) {
		this.ball.vector.x = this.randomDirection();
		this.ball.vector.y = this.randomDirection();
		if (
			this.ball.vector.x === vectorx * -1 &&
			this.ball.vector.y === vectory * -1
		) {
			this.changeVectorDirectionOtherThanBackwards(vectorx, vectory);
		}
	}
}

let ball = getBall(board);
let game = new Game(ball, board);
let visualisation = new Visualiser(board);
visualisation.updateBoard(board);

game.init();
