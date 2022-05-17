class Game {
    entities: Entity[] = [];
    screen: Image = images.createImage("");
    FRAME_RATE = 10; //Amount of frames per second, also determines game speed.

    static frameAmount: number = 0;
    static inputs: Input[] = [];

    constructor() {
        this.start();
    }

    start(): void {
        const player: Player = new Player();
        this.entities.push(player);

        //Handling inputs
        control.onEvent(
            EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN,
            () => {
                if (!Game.isInput(Input.BUTTON_A_DOWN))
                    Game.inputs.push(Input.BUTTON_A_DOWN);
            });
        control.onEvent(
            EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_UP,
            () => {
                if (!Game.isInput(Input.BUTTON_A_UP))
                    Game.inputs.push(Input.BUTTON_A_UP);
            });

        while (true) {
            let start: number = input.runningTime();

            //Updating entities
            for (const entity of this.entities) {
                entity.update();
            }

            Game.inputs = [];

            //Rendering entities
            this.screen.clear();
            for (const e of this.entities) {
                this.screen.setPixel(e.xPosition, 4 - e.yPosition, true); // 4 - y because y is from down to up instead of up to down.
            }
            this.screen.plotImage();

            Game.frameAmount++;

            //Pauses the program so it has a stable frame rate.
            basic.pause(start + 1000 / this.FRAME_RATE - input.runningTime());
        }
    }

    static isInput(input: Input) {
        return Game.inputs.indexOf(input) != -1;
    }
}

const gamee: Game = new Game();