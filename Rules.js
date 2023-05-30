export class Rules {
    constructor(moves, table) {
        this.moves = moves;
        this.table = table;
    }

    getWinner(userMove, computerMove) {
        let result = this.table[this.moves.indexOf(userMove)][this.moves.indexOf(computerMove)];
        if(result === 'Win') {
            return 'User wins!';
        } else if(result === 'Lose') {
            return 'Computer wins!';
        } else {
            return 'Draw!';
        }
    }
}