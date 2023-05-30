import readline from "readline";
import {TableGenerator} from "./TableGenerator.js";
import {Rules} from "./Rules.js";
import {KeyAndHmacGenerator} from "./KeyAndHmacGenerator.js";
import Table from 'cli-table3'

export class Game {
    constructor(moves) {
        if (moves.length < 3) {
            console.error('Error: Not enough arguments. Please pass at least 3 moves.');
            process.exit(1);
        } else if (moves.length % 2 === 0) {
            console.error('Error: Even number of moves. Please pass an odd number of moves.');
            process.exit(1);
        } else if (new Set(moves).size !== moves.length) {
            console.error('Error: Duplicate moves detected. Please pass unique moves.');
            process.exit(1);
        }

        this.moves = moves;
        this.keyAndHmacGenerator = new KeyAndHmacGenerator();
        this.tableGenerator = new TableGenerator();
        this.rules = new Rules(this.moves, this.tableGenerator.generateTable(this.moves));
        this.computerMove = this.moves[Math.floor(Math.random() * this.moves.length)];
        this.key = this.keyAndHmacGenerator.generateKey();
        this.hmac = this.keyAndHmacGenerator.generateHmac(this.key, this.computerMove);

    }

    displayMenu() {
        console.log('HMAC:', this.hmac);
        console.log('0 - Exit');
        for (let i = 0; i < this.moves.length; i++) {
            console.log(`${i + 1} - ${this.moves[i]}`);
        }
        console.log('? - Help');
    }

    displayHelp() {
        let tableData = this.tableGenerator.generateTable(this.moves);

        let headers = [''].concat(this.moves);
        let table = new Table({head: headers});

        for (let i = 0; i < this.moves.length; i++) {
            let row = {};
            row[this.moves[i]] = tableData[i];
            table.push(row);
        }

        console.log(table.toString());
    }

    run() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.displayMenu();
        rl.on('line', (input) => {
            if (input === '0') {
                console.log('Thanks for the game. Bye!');
                console.log('Computer move was:', this.computerMove);
                console.log('Key:', this.key.toString('hex'));
                rl.close();
            } else if (input === '?') {
                this.displayHelp();
            } else {
                let userMoveIndex = parseInt(input) - 1;
                if (userMoveIndex < 0 || userMoveIndex >= this.moves.length) {
                    console.log('Invalid move. Try again.');
                } else {
                    console.log('You move:', this.moves[userMoveIndex]);

                    let isHmacValid = this.keyAndHmacGenerator.verifyHmac(this.key, this.computerMove, this.hmac);
                    if (isHmacValid) {
                        console.log('The HMAC is valid. The computer has played fair.');
                    } else {
                        console.log('The HMAC is not valid. There may have been foul play.');
                    }

                    console.log('Computer move:', this.computerMove);
                    console.log(this.rules.getWinner(this.moves[userMoveIndex], this.computerMove));
                    console.log('Key:', this.key.toString('hex'));
                    rl.close();
                }
            }
        });
    }

}
