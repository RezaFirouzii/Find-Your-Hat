const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor() {
        this._field = [];
        this._width = 0;
        this._height = 0;
    }
    get field() {
        return this._field;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    set width(width) {
        this._width = width;
    }
    set height(height) {
        this._height = height;
    }

    generateField(width, height, percentage=20) {
        this.width = width;
        this.height = height;
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

    reRender() {
        console.clear();
        this.print();
    }

    isFinished(i, j) {
        if(i < 0 || i > this.height || j < 0 || j > this.width) {
            console.log('\nOut of bounds instruction!');
            return true;
        } else if(this.field[i][j] === hole) {
            console.log('\nSorry! you fell in the hole :(');
            return true;
        } else if(this.field[i][j] === hat) {
            console.log('\nCongratulations! You found your hat :)');
            return true;
        } else {
            this.field[i][j] = pathCharacter;
            this.reRender();
            return false;
        }
    }

    print() {
        this.field.forEach((row) => {
            console.log(row.join(''));
        });
    }
}

const field = new Field();
field.generateField(10, 10);
field.print();

let input, x = 0, y = 0;

while(!field.isFinished(y, x)) {
    input = prompt('Which way? ');
    switch(input.toLowerCase()) {
        case 'd':
            y++;
            break;
        case 'u':
            y--;
            break;
        case 'r':
            x++;
            break;
        case 'l':
            x--;
            break;
    }
}