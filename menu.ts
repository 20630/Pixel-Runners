class Menu {
    state: number = 0;

    constructor () {
        this.startGame();
    }

    update (): void {
        switch (this.state) {
            case 1: 
                basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
                this.state++;
                break;
            case 2:
                basic.showLeds(`
                . # # # .
                . # . . #
                . # # # .
                . # . . .
                . # . . .
                `)
                this.state--;
                break;
        }
    }
    
    startGame() {

    }

    
}