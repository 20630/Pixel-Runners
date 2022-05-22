enum GameState {
    MENU,
    IN_GAME,
    SCORE
}

class Game {
    entities: Entity[] = [];
    screen: Image = images.createImage("");
    gameState: GameState = GameState.MENU;
    readonly FRAME_RATE = 10; //Amount of frames per second, also determines game speed.

    frameAmount: number = 0;
    inputs: Input[] = [];

    menu: Menu;

    constructor() {
        this.start();
    }

    start(): void {
        let player: Player;
        this.registerInputListeners();
        this.menu = new Menu();

        while (true) {
            let start: number = input.runningTime();

            switch (this.gameState) {
                case GameState.MENU:
                    this.menu.update();

                    if (this.isInput(Input.BUTTON_A_CLICK)) {
                        player = new Player(this);
                        this.entities.push(player);
                        this.gameState = GameState.IN_GAME;
                    }
                    break;
                case GameState.IN_GAME:
                    if (this.frameAmount % 10 == 0) {
                        this.entities.push(new Obstacle(this));
                    }

                    this.update();
                    this.checkCollisions();
                    break;
            }

            this.inputs = [];
            this.render();

            //Pauses the program so it has a stable frame rate.
            basic.pause(start + 1000 / this.FRAME_RATE - input.runningTime());
        }
    }

    isInput(input: Input): boolean {
        return this.inputs.indexOf(input) != -1;
    }

    render(): void {
        this.screen.clear();
        for (const e of this.entities) {
            this.screen.setPixel(e.xPosition, 4 - e.yPosition, true); // 4 - y because y is from down to up instead of up to down.
        }
        this.screen.plotImage();

        this.frameAmount++;
    }

    update(): void {
        for (const e of this.entities) {
            e.update();
        }
    }

    checkCollisions(): void {
        for (const e1 of this.entities) {
            for (const e2 of this.entities) {
                if (e1 == e2) continue;
                if (e1.collidesWith(e2)) {
                    e1.onCollision(e2);
                }
            }
        }
    }

    registerInputListeners(): void {
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
        input.onButtonPressed(Button.A, () => {
            if (!this.isInput(Input.BUTTON_A_CLICK))
                this.inputs.push(Input.BUTTON_A_CLICK);
        });
    }
}