export class TableGenerator {
    generateTable(moves) {
        let table = [];
        const half = Math.floor(moves.length / 2);
        for(let i = 0; i < moves.length; i++) {
            let row = [];
            for(let j = 0; j < moves.length; j++) {
                if(i === j) {
                    row.push('Draw');
                } else if ((i > j && i - j <= half) || (j > i && j - i > half)) {
                    row.push('Win');
                } else {
                    row.push('Lose');
                }
            }
            table.push(row);
        }
        return table;
    }
}