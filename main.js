const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor() {
        this._field = [];
    }
    get field() {
        return this._field;
    }
    print() {
        this.field.forEach((row) => {
            console.log(row.join(''));
        });
    }
    generateField(width, height, percentage=20) {
        percentage = width * height * (percentage / 100);

        for(let i = 0; i < height; i++)
            this.field.push([]);

        for(let i = 0; i < height; i++)
            for(let j = 0; j < width; j++)
                this.field[i][j] = fieldCharacter;

        for(let i = 0; i < percentage; i++) {
            const x = Math.floor(Math.random() * height);
            const y = Math.floor(Math.random() * width);
            if(x === 0 && y === 0) {
                i--;
                continue;
            } else this.field[x][y] = hole;
        }
        let hat_x, hat_y;
        do {
            hat_x = Math.floor(Math.random() * height);
            hat_y = Math.floor(Math.random() * width);
            this.field[hat_x][hat_y] = hat;
        } while(hat_x === 0 && hat_y === 0);

        this.field[0][0] = pathCharacter;
    }
}

const field = new Field();
field.generateField(10, 10);
field.print();