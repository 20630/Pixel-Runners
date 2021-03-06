class Obstacle extends Entity {
    speed: number = 1;
    minRestTime: number;
    maxRestTime: number;

    constructor(game: Game) {
        super(5, 0, game, 50);
    }

    update(): void {
        this.xVelocity = -1 / (4 - Math.clamp(1, 3, this.speed));
        this.move(this.xVelocity, this.yVelocity);

        let mostRightLed = this.leds[0];
        for (const l of this.leds) {
            if (l.x > mostRightLed.x)
                mostRightLed = l;
        }

        if (mostRightLed.x < 0) {
            this.destroy();
            this.game.score++;
        }
    }
}

class Obstacles {
    public static readonly SMALL: number = 0;
    public static readonly MEDIUM: number = 1;
    public static readonly BIG: number = 2;
    public static readonly SMALL_WIDE: number = 3;
    public static readonly MEDIUM_WIDE: number = 4;
    public static readonly BIG_WIDE: number = 5;
    public static readonly SMALL_HEAD_HITTER: number = 6;

    public static getObstacle(obstacle: number, game: Game) {
        let o: Obstacle = new Obstacle(game);
        const br: number = 50;
        switch (obstacle) {
            case this.SMALL:
                break;
            case this.MEDIUM:
                o.addRelativeLed(0, 1, br);
                break;
            case this.BIG:
                o.addRelativeLed(0, 1, br)
                 .addRelativeLed(0, 2, br);
                break;
            case this.SMALL_WIDE:
                o.addRelativeLed(1, 0, br);
                break;
            case this.MEDIUM_WIDE:
                o.addRelativeLed(1, 0, br)
                 .addRelativeLed(0, 1, br)
                 .addRelativeLed(1, 1, br);
                break;
            case this.BIG_WIDE:
                o.addRelativeLed(1, 0, br)
                 .addRelativeLed(0, 1, br)
                 .addRelativeLed(1, 1, br)
                 .addRelativeLed(0, 2, br)
                 .addRelativeLed(1, 2, br);
                break;
            case this.SMALL_HEAD_HITTER:
                o.addRelativeLed(0, 3, br)
                 .addRelativeLed(0, 4, br);   
                break; 
        }
        return o;
    }
}