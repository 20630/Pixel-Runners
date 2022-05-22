class Menu {
    state: number = 0;

    constructor () {}

    update(): void {
        switch (this.state) {
            case 0: 
                basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `);
                this.state++;
                break;
            case 1:
                basic.showLeds(`
                . # # # .
                . # . . #
                . # # # .
                . # . . .
                . # . . .
                `);
                this.state = 0;
                break;
        }
    }
}