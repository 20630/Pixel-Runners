abstract class Entity {
    /**
     * The game this entity is used in.
     */
    game: Game;

    /**
     * The x position on the screen (0 - 4), from left to right.
     */
    xPosition: number;

    /**
     * The y position on the screen (0 - 4), from down to up.
     */
    yPosition: number;

    /**
     * The x velocity in pixels per frame.
     */
    xVelocity: number = 0;

    /**
     * The y velocity in pixels per frame.
     */
    yVelocity: number = 0;

    /**
     * Creates an entity and moves it to the given x and y positions.
     * 
     * @param x The x position the entity should move to.
     * @param y The y position the entity should move to.
     */
    constructor(x: number, y: number, game: Game) {
        this.game = game;
        this.moveTo(x, y);
    };

    /**
     * Moves the entity by the given x and y positions.
     * 
     * @param x The change in the x-axis.
     * @param y The change in the y-axis.
     */
    move(x: number, y: number): void {
        this.xPosition += x;
        this.yPosition += y;
    }

    /**
     * Moves the entity to the given x and y positions.
     * 
     * @param x The x position the entity should move to.
     * @param y The y position the entity should move to.
     */
    moveTo(x: number, y: number): void {
        this.xPosition = x;
        this.yPosition = y;
    }

    /**
     * Checks if the entity collides with another entity.
     * The entity collides with another entity when they have the same x and y positions.
     * 
     * @param that The entity to compare to.
     */
    collidesWith(that: Entity): boolean {
        if (this.xPosition == that.xPosition && this.yPosition == that.yPosition)
            return true;
        return false;    
    }

    /**
     * Removes this entity from memory and the screen.
     */
    destroy(): void {
        this.game.entities.removeElement(this);
    }

    /**
     * Updates the state of the entity.
     * This method is called every frame.
     */
    update(): void {}
}