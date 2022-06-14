enum GameState {
    MENU,
    IN_GAME,
    SCORE
}

class Game {
    screen: Image;
    gameState: GameState;

    stage: number;
    stageDistance: number; //How far the player is into the stage
    nextSpawn: Obstacle; //The next obstacle that should spawn
    nextSpawnTime: number; //The time in frames before the next obstacle should spawn
    private readonly TIME_BETWEEN_STAGES: number = 10; //The time in frames before the next stage should start

    frameAmount: number;
    readonly FRAME_RATE = 10; //Amount of frames per second, also determines game speed.

    player: Player;
    inputs: Input[];
    entities: Entity[];

    score: number;

    constructor() {
        this.start();
    }

    start(): void {
        let player: Player;
        this.registerInputListeners();

        this.screen = images.createImage("");
        this.gameState = GameState.MENU;
        this.frameAmount = 0;
        this.inputs = [];
        this.entities = [];
        this.score = 0;

        led.setDisplayMode(DisplayMode.Greyscale);

        let menuState = 0;

        //Game loop
        while (true) {
            let start: number = input.runningTime();

            switch (this.gameState as number) {
                case GameState.MENU:
                    switch (menuState) {
                        case 0:
                            basic.showLeds("");
                            menuState++;
                            break;
                        case 1:
                            basic.showLeds(`
                            . # # # .
                            . # . . #
                            . # # # .
                            . # . . .
                            . # . . .
                            `);
                            menuState++;
                            break;
                        case 2:
                            basic.showLeds("");
                            menuState = 0;
                            break;
                    }

                    if (this.isInput(Input.BUTTON_B_DOWN)) {
                        this.play();
                    }
                    break;
                case GameState.IN_GAME:
                    let stage = Stages.getStage(this.stage, this);

                    let beforeStart = this.stageDistance <= this.TIME_BETWEEN_STAGES;
                    let afterEnd = this.stageDistance > stage.length + this.TIME_BETWEEN_STAGES;

                    if (afterEnd) {
                        if (this.stage > Stages.STAGE_AMOUNT) {
                            this.gameState = GameState.SCORE;
                            this.entities = [];
                        } else {
                            this.nextStage();
                        }
                    }

                    //Recalculate because the level could have changed.
                    stage = Stages.getStage(this.stage, this);
                    beforeStart = this.stageDistance <= this.TIME_BETWEEN_STAGES;

                    if (!beforeStart) {
                        if (this.nextSpawnTime == 0) {
                            this.entities.push(this.nextSpawn);
                            this.nextSpawn = stage.possibleObstacles.get(Math.randomRange(0, stage.possibleObstacles.length - 1));

                            if (this.stageDistance + this.nextSpawn.minRestTime > stage.length + this.TIME_BETWEEN_STAGES) {
                                //Not enough time to spawn another obstacle before the next stage
                                this.nextSpawnTime = -1;
                            } else {
                                this.nextSpawnTime = Math.randomRange(this.nextSpawn.minRestTime, this.nextSpawn.maxRestTime);
                            }
                        } else {
                            this.nextSpawnTime--;
                        }
                    }

                    this.update();
                    this.checkCollisions();
                    this.stageDistance++;
                    break;
                case GameState.SCORE:
                    basic.showNumber(this.score);
                    if (this.isInput(Input.BUTTON_B_DOWN)) {
                        this.gameState = GameState.MENU;
                        this.entities = [];
                        this.score = 0;
                    }
                    break;
            }

            this.inputs = [];

            //Score uses normal basic.showNumber(), so don't override that.
            if (this.gameState as number != GameState.SCORE)
                this.render();

            this.frameAmount++;

            //Pauses the program so it has a stable frame rate.
            basic.pause(start + 1000 / this.FRAME_RATE - input.runningTime());
        }
    }

    play() {
        this.gameState = GameState.IN_GAME;

        this.stage = 1;
        this.stageDistance = 0;

        let l = Stages.getStage(this.stage, this);
        this.nextSpawn = l.possibleObstacles.get(Math.randomRange(0, l.possibleObstacles.length - 1));
        this.nextSpawnTime = 0;

        this.player = new Player(this);
        this.entities.push(this.player);
    }

    nextStage() {
        this.stage++;
        this.stageDistance = 0;

        let l = Stages.getStage(this.stage, this);
        this.nextSpawn = l.possibleObstacles.get(Math.randomRange(0, l.possibleObstacles.length - 1));
        this.nextSpawnTime = 0;
    }

    isInput(input: Input): boolean {
        return this.inputs.indexOf(input) != -1;
    }

    render(): void {
        this.screen.clear();
        for (const e of this.entities) {
            for (const p of e.leds) {
                this.screen.setPixelBrightness(p.x, 4 - p.y, p.brightness); // 4 - y because y is from down to up instead of up to down.
            }
        }
        this.screen.plotImage();
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
        //Microbit buttons
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
        control.onEvent(
            EventBusSource.MICROBIT_ID_BUTTON_B,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN,
            () => {
                if (!this.isInput(Input.BUTTON_B_DOWN))
                    this.inputs.push(Input.BUTTON_B_DOWN);
            });
        control.onEvent(
            EventBusSource.MICROBIT_ID_BUTTON_B,
            EventBusValue.MICROBIT_BUTTON_EVT_UP,
            () => {
                if (!this.isInput(Input.BUTTON_B_UP))
                    this.inputs.push(Input.BUTTON_B_UP);
            });

        //Breadboard buttons
        //P0 is button A, P2 is button B
        pins.setEvents(DigitalPin.P0, PinEventType.Touch);
        pins.setEvents(DigitalPin.P2, PinEventType.Touch);

        control.onEvent(
            EventBusSource.MICROBIT_ID_IO_P0,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN,
            () => {
                if (!this.isInput(Input.BUTTON_A_DOWN))
                    this.inputs.push(Input.BUTTON_A_DOWN);
            });
        control.onEvent(
            EventBusSource.MICROBIT_ID_IO_P0,
            EventBusValue.MICROBIT_BUTTON_EVT_UP,
            () => {
                if (!this.isInput(Input.BUTTON_A_UP))
                    this.inputs.push(Input.BUTTON_A_UP);
            });
        control.onEvent(
            EventBusSource.MICROBIT_ID_IO_P2,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN,
            () => {
                if (!this.isInput(Input.BUTTON_B_DOWN))
                    this.inputs.push(Input.BUTTON_B_DOWN);
            });
        control.onEvent(
            EventBusSource.MICROBIT_ID_IO_P2,
            EventBusValue.MICROBIT_BUTTON_EVT_UP,
            () => {
                if (!this.isInput(Input.BUTTON_B_UP))
                    this.inputs.push(Input.BUTTON_B_UP);
            });
    }
}