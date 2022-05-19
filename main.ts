class Game {
    entities: Entity[] = [];
    screen: Image = images.createImage("");
    readonly FRAME_RATE = 10; //Amount of frames per second, also determines game speed.

    frameAmount: number = 0;
    inputs: Input[] = [];

    constructor() {
        this.start();
    }

    start(): void {
        const player: Player = new Player(this);
        this.entities.push(player);

        //Handling inputs
        control.onEvent(
            EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN,
            () => {
                if (!this.isInput(Input.BUTTON_A_DOWN))
                    this.inputs.push(Input.BUTTON_A_DOWN);
            });
        control.onEvent(
            EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_UP,
            () => {
                if (!this.isInput(Input.BUTTON_A_UP))
                    this.inputs.push(Input.BUTTON_A_UP);
            });

        while (player.isAlive) {
            let start: number = input.runningTime();

            if (this.frameAmount % 10 == 0) {
                this.entities.push(new Obstacle(this));
            }

            //Updating entities
            for (const e of this.entities) {
                e.update();
            }

            //Collision check
            for (const e of this.entities) {
                if (e == player) continue;
                if (player.collidesWith(e)) {
                    player.onCollision(e);
                }
            }

            this.inputs = [];

            //Rendering entities
            this.screen.clear();
            for (const e of this.entities) {
                this.screen.setPixel(e.xPosition, 4 - e.yPosition, true); // 4 - y because y is from down to up instead of up to down.
            }
            this.screen.plotImage();

            this.frameAmount++;

            //Pauses the program so it has a stable frame rate.
            basic.pause(start + 1000 / this.FRAME_RATE - input.runningTime());
        }
    }

    isInput(input: Input): boolean {
        return this.inputs.indexOf(input) != -1;
    }
}

const gamee: Game = new Game();