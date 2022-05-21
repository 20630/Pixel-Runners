class Menu {
    state: number = 0;

    constructor() {
        this.startGame();
    }
    
    startGame () {
        input.onButtonPressed(Button.A, function() {
            const gamee: Game = new Game();
        })
    }

    update(): void {
        switch (this.state) {
            case 1:
                basic.showLeds(`
                . # # # .
                . # . . #
                . # # # .
                . # . . .
                . # . . .
                `)
                this.state++;
                break;
            case 2:
                basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
                this.state--;
        }
    }

    
    
    
    
}