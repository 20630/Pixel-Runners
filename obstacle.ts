class Obstacle extends Entity {
    constructor(game: Game) {
        super(5, 0, game);
    }

    update(): void {
        this.xVelocity = -1;
        this.move(this.xVelocity, this.yVelocity);
        if (this.xPosition < 0) {
            this.destroy();
        }
    }
}