abstract class Entity {
    /**
     * The x position on the screen (0 - 4), from left to right.
     */
    x: number;

    /**
     * The y position on the screen (0 - 4), from down to up.
     */
    y: number;

    /**
     * Creates an entity and moves it to the given x and y positions.
     * 
     * @param x The x position the entity should move to.
     * @param y The y position the entity should move to.
     */
    constructor(x: number, y: number) {
        this.moveTo(x, y);
    };

    /**
     * Moves the entity by the given x and y positions.
     * 
     * @param x The change in the x-axis.
     * @param y The change in the y-axis.
     */
    move(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }

    /**
     * Moves the entity to the given x and y positions.
     * 
     * @param x The x position the entity should move to.
     * @param y The y position the entity should move to.
     */
    moveTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * Checks if the entity collides with another entity.
     * The entity collides with another entity when they have the same x and y positions.
     * 
     * @param that The entity to compare to.
     */
    collidesWith(that: Entity): boolean {
        if (this.x == that.x && this.y == that.y)
            return true;
        return false;    
    }

    /**
     * Updates the state of the entity.
     * This method is called every frame.
     */
    update(): void {}
}