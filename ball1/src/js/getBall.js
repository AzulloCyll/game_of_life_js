import { Ball, Vector } from "./ball";

function getBall(board) {
	let X = board.length;
	let Y = board[0].length;
	let ballx, bally;
	let vectorx, vectory;

	for (let x = 0; x < X; x++) {
		for (let y = 0; y < Y; y++) {
			if (board[x][y] === "1") {
				ballx = x;
				bally = y;

				// XXX
				// X10
				// X00
				if (
					board[ballx + 1][bally + 1] === "0" &&
					board[ballx][bally + 1] === "0" &&
					board[ballx + 1][bally] === "0"
				) {
					vectorx = 1;
					vectory = 1;
				}

				// XXX
				// 01X
				// 00X
				if (
					board[ballx][bally - 1] === "0" &&
					board[ballx + 1][bally] === "0" &&
					board[ballx + 1][bally - 1] === "0"
				) {
					vectorx = 1;
					vectory = -1;
				}

				// X00
				// X10
				// XXX
				if (
					board[ballx - 1][bally + 1] === "0" &&
					board[ballx - 1][bally] === "0" &&
					board[ballx][bally + 1] === "0"
				) {
					vectorx = 1;
					vectory = -1;
				}

				// 00X
				// 01X
				// XXX
				if (
					board[ballx - 1][bally - 1] === "0" &&
					board[ballx - 1][bally] === "0" &&
					board[ballx][bally - 1] === "0"
				) {
					vectorx = 1;
					vectory = -1;
				}
			}
		}
	}

	let vector = new Vector(vectorx, vectory);
	let ball = new Ball(ballx, bally, vector);

	console.log(ball);

	return ball;
}

export { getBall };
