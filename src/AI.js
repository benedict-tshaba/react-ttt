export default class AI {

	constructor(min, max) {
		this.minPlayer = min;
		this.maxPlayer = max;
	}

	play(board) {
		let bestMoveVal = -Infinity;
		let move = 0;

		for (let i = 0; i < board.length; i++) {
			let copy = this.move(i, this.maxPlayer, board);

			if(copy) {
				let predictedMoveVal = this.minimax(copy, false);

				if (predictedMoveVal > bestMoveVal) {
					bestMoveVal = predictedMoveVal;
					move = i;
				}
			}
		}

		return move;
	}

	minimax(board, maximizingPlayer) {
		if (this.isWinner(this.maxPlayer, board)) return Infinity;
		if (this.isWinner(this.minPlayer, board)) return -Infinity;
		if (this.isDraw(board)) return 0;

		if(maximizingPlayer) {
			let bestMoveVal = -Infinity;

			for (let i = 0; i < board.length; i++) {
				let copy = this.move(i, this.maxPlayer, board);

				if(copy) {
					let predictedMoveVal = this.minimax(copy, false);

					if (predictedMoveVal > bestMoveVal) {
						bestMoveVal = predictedMoveVal;
					}
				}
			}

			return bestMoveVal;

		} else {
			let bestMoveVal = Infinity;

			for (let i = 0; i < board.length; i++) {
				let copy = this.move(i, this.minPlayer, board);

				if(copy) {
					let predictedMoveVal = this.minimax(copy, true);

					if (predictedMoveVal < bestMoveVal) {
						bestMoveVal = predictedMoveVal;
					}
				}
			}

			return bestMoveVal;
		}
	}

	move(move, player, board) {
		let copy = this.clone(board);

		if (copy[move] === null) {
			copy[move] = player;
			return copy;
		}

		return false;
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

  		return false;
	}

	isDraw(board) {
		return !board.some(x=>x===null);
	}
}