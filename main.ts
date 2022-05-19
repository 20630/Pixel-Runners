class Game {
    inGame: boolean = false;
    entities: Entity[] = [];
    screen: Image = images.createImage("");
    FRAME_RATE = 10; //Amount of frames per second, also determines game speed.

    constructor() {
        this.menu();
        this.start();
    }

    menu () {
        basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
        basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
        basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)

        while (!this.inGame) {
            basic.showLeds(`
            . # # # .
            . # . . #
            . # # # .
            . # . . .
            . # . . .
            `)
            basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)

            input.onButtonPressed(Button.B, () => {
                if (!this.inGame) {
                    this.inGame = true;
                }
            })
        } 

    }

    start(): void {
        const player: Player = new Player();
        this.entities.push(player);

        input.onButtonPressed(Button.A, () => {
            if (!player.inJump)
                player.inJump = true;
        });

        while (true) {
            let start: number = input.runningTime();

            //Updating entities
            for (const entity of this.entities) {
                entity.update();
            }

            //Rendering entities
            this.screen.clear();
            for (const e of this.entities) {
                this.screen.setPixel(e.x, 4 - e.y, true); // 4 - y because y is from down to up instead of up to down.
            }
            this.screen.plotImage();

            //Pauses the program so it has a stable frame rate.
            basic.pause(start + 1000 / this.FRAME_RATE - input.runningTime());
        }
    }
}

const gamee: Game = new Game();