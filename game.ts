enum GameState {
    MENU,
    IN_GAME,
    SCORE
}

class Game {
    screen: Image;
    gameState: GameState;

    level: number;
    levelDistance: number;
    nextSpawn: Obstacle;
    nextSpawnTime: number;
    private readonly TIME_BETWEEN_LEVELS: number = 10;

    frameAmount: number;
    readonly FRAME_RATE = 10; //Amount of frames per second, also determines game speed.

    player: Player;
    inputs: Input[];
    entities: Entity[];

    menu: Menu;

    constructor() {
        this.start();
    }

    start(): void {
        let player: Player;
        this.registerInputListeners();
        this.menu = new Menu();

        this.screen = images.createImage("");
        this.gameState = GameState.MENU;
        this.frameAmount = 0;
        this.inputs = [];
        this.entities = [];

        while (true) {
            let start: number = input.runningTime();

            switch (this.gameState as number) {
                case GameState.MENU:
                    this.menu.update();

                    if (this.isInput(Input.BUTTON_A_CLICK)) {
                        this.play();
                    }
                    break;
                case GameState.IN_GAME:
                    let level = Levels.getLevel(this.level, this);
                    
                    let beforeStart = this.levelDistance <= this.TIME_BETWEEN_LEVELS;
                    let afterEnd = this.levelDistance > level.length + this.TIME_BETWEEN_LEVELS;

                    if (afterEnd) {
                        if (this.level == 10) {
                            this.gameState = GameState.MENU;
                            this.entities = [];
                        } else {
                            this.nextLevel();
                        }
                    }

                    //recalculate because level change possibly.
                    level = Levels.getLevel(this.level, this);
                    beforeStart = this.levelDistance <= this.TIME_BETWEEN_LEVELS;

                    if (!beforeStart) {
                        if (this.nextSpawnTime == 0) {
                            this.entities.push(this.nextSpawn);
                            this.nextSpawn = level.possibleObstacles.get(Math.randomRange(0, level.possibleObstacles.length - 1));

                            if (this.levelDistance + this.nextSpawn.minRestTime > level.length + this.TIME_BETWEEN_LEVELS) {
                               //not enough time to spawn another obstacle.
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

    play() {
        this.gameState = GameState.IN_GAME;

        this.level = 1;
        this.levelDistance = 0;

        let l = Levels.getLevel(this.level, this);
        this.nextSpawn = l.possibleObstacles.get(Math.randomRange(0, l.possibleObstacles.length - 1));
        this.nextSpawnTime = 0;

        this.player = new Player(this);
        this.entities.push(this.player);
    }

    nextLevel() {
        this.level++;
        this.levelDistance = 0;

        let l = Levels.getLevel(this.level, this);
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