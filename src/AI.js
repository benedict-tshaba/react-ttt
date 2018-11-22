export default class AI {

	constructor(min, max) {
		this.minPlayer = min;
		this.maxPlayer = max;
	}

	search(board) {
		let bestMoveVal = -Infinity;
		let move = 0;

		for (let i = 0; i < board.length; i++) {
			let copy = this.move(i, this.maxPlayer, board);

			if(copy) {
				let predictedMoveVal = this.minMoveVal(copy);

				if (predictedMoveVal > bestMoveVal) {
					bestMoveVal = predictedMoveVal;
					move = i;
				}
			}
		}

		return move;
	}

	minMoveVal(board) {
		if (this.isWinner(this.maxPlayer, board)) return Infinity;
		if (this.isWinner(this.minPlayer, board)) return -Infinity;

		if (this.isTie(board)) return 0;

		let bestMoveVal = Infinity;

		for (let i = 0; i < board.length; i++) {
			let copy = this.move(i, this.minPlayer, board);

			if(copy) {
				let predictedMoveVal = this.maxMoveVal(copy);

				if (predictedMoveVal < bestMoveVal) {
					bestMoveVal = predictedMoveVal;
				}
			}
		}

		return bestMoveVal;
	}

	maxMoveVal(board) {
		if (this.isWinner(this.maxPlayer, board)) return Infinity;
		if (this.isWinner(this.minPlayer, board)) return -Infinity;

		if (this.isTie(board)) return 0;

		let bestMoveVal = -Infinity;

		for (let i = 0; i < board.length; i++) {
			let copy = this.move(i, this.maxPlayer, board);

			if(copy) {
				let predictedMoveVal = this.minMoveVal(copy);

				if (predictedMoveVal > bestMoveVal) {
					bestMoveVal = predictedMoveVal;
				}
			}
		}

		return bestMoveVal;
	}

	move(move, player, board) {
		let copy = this.clone(board);

		if (copy[move] === null) {
			copy[move] = player;
			return copy;
		}

		return;
	}

	clone(board) {
		return board.slice(0);
	}

	isWinner(player, board) {
		const lines = [
    		[0, 1, 2],
    		[3, 4, 5],
    		[6, 7, 8],
    		[0, 3, 6],
    		[1, 4, 7],
    		[2, 5, 8],
    		[0, 4, 8],
    		[2, 4, 6],
  		];
  
  		for(let i = 0; i < lines.length; i++) {
    		const [a, b, c] = lines[i];
    		if( board[a] && board[a] === board[b] && board[a] === board[c] ) {
      			return player === board[a];
    		}
  		}
	}

	isTie(board) {
		return !board.some(x=>x===null);
	}
}