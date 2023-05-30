export class Rules {
    constructor(choices, table) {
        this.choices = choices;
        this.table = table;
    }

    getWinner(userChoice, computerChoice) {
        let result = this.table[this.choices.indexOf(userChoice)][this.choices.indexOf(computerChoice)];
        if(result === 'Win') {
            return 'User wins!';
        } else if(result === 'Lose') {
            return 'Computer wins!';
        } else {
            return 'Draw!';
        }
    }
}
