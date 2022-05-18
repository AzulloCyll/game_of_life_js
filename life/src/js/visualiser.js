class Visualiser {
	constructor(board) {
		this.board = board;
		this.boardEl = document.getElementById("board");
	}

	createBoard = (board) => {
		let X = board[0].length;
		let Y = board.length;

		for (let x = 0; x < X; x++) {
			let line = document.createElement("div");
			line.classList.add("line");
			line.style.width = Y * 20 + "px";

			for (let y = 0; y < Y; y++) {
				let tile = document.createElement("div");
				tile.classList.add("tile");

				if (board[x][y] === 0) {
					tile.classList.add("dead");
				}
				if (board[x][y] === 1) {
					tile.classList.add("live");
				}
				line.append(tile);
			}
			this.boardEl.append(line);
		}

		document.getElementById;
	};

	updateBoard = (board) => {
		this.boardEl.innerHTML = "";
		this.createBoard(board);
	};
}

export { Visualiser };
