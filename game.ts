enum GameState {
    MENU,
    IN_GAME,
    SCORE
}

class Game {
    screen: Image = images.createImage("");
    gameState: GameState = GameState.MENU;

    level: number = 1;
    levelDistance: number = 0;
    nextSpawn: Obstacle;
    nextSpawnTime: number = 0;
    private readonly TIME_BETWEEN_LEVELS: number = 20;

    frameAmount: number = 0;
    readonly FRAME_RATE = 10; //Amount of frames per second, also determines game speed.

    inputs: Input[] = [];
    entities: Entity[] = [];

    constructor() {
        this.start();
    }

    start(): void {
        let player: Player;

        this.registerInputListeners();

        while (true) {
            let start: number = input.runningTime();

            switch (this.gameState) {
                case GameState.MENU:
                    if (this.isInput(Input.BUTTON_A_CLICK)) {
                        player = new Player(this);
                        this.entities.push(player);
                        this.gameState = GameState.IN_GAME;
                        this.level = 1;
                        this.levelDistance = 0;
                    }
                    break;
                case GameState.IN_GAME:
                    let level = Levels.getLevel(this.level, this);
                    
                    let beforeStart = this.levelDistance < this.TIME_BETWEEN_LEVELS;
                    let afterEnd = this.levelDistance > level.length + this.TIME_BETWEEN_LEVELS;

                    if (afterEnd) {
                        this.level++;
                        this.levelDistance = 0;
                    }

                    if (!beforeStart) {
                        if (this.nextSpawnTime == 0) {
                            if (this.nextSpawn == null) {
                                this.nextSpawn = level.possiblyObstacles.get(Math.randomRange(0, level.possiblyObstacles.length - 1));
                            }
                            this.entities.push(this.nextSpawn);
                            this.nextSpawn = level.possiblyObstacles.get(Math.randomRange(0, level.possiblyObstacles.length - 1));
                            this.nextSpawnTime = Math.randomRange(this.nextSpawn.minRestTime, this.nextSpawn.maxRestTime);
                        } else {
                            this.nextSpawnTime--;
                        }
                    }

                    this.update();
                    this.checkCollisions();
                    this.levelDistance++;
                    break;
            }

            this.inputs = [];
            this.render();
            this.frameAmount++;

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
            for (const p of e.leds) {
                this.screen.setPixel(p.x, 4 - p.y, true); // 4 - y because y is from down to up instead of up to down.
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