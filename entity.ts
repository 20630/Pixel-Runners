/**
 * An entity represented by one or more leds.
 */
abstract class Entity {
    /**
     * The game the entity is used in.
     */
    game: Game;

    /**
     * The x velocity in pixels per frame.
     */
    xVelocity: number = 0;

    /**
     * The y velocity in pixels per frame.
     */
    yVelocity: number = 0;

    /**
     * The leds that represent the entity.
     */
    leds: Led[] = [];

    /**
     * Creates an entity with a single led.
     * 
     * @param x The x position the led should be.
     * @param y The y position the led should be.
     * @param game The game the entity is used in.
     */
    constructor(x: number, y: number, game: Game) {
        this.leds.push(new Led(x, y));
        this.game = game;
    };

    /**
     * Moves the entity by the given x and y positions.
     * 
     * @param x The change in the x-axis.
     * @param y The change in the y-axis.
     */
    move(x: number, y: number): Entity {
        for (const l of this.leds) {
            l.x += x;
            l.y += y;
        }
        return this;
    }

    /**
     * Adds a led that should represent the entity.
     * 
     * @param x The x position the led should move to.
     * @param y The y position the led should move to.
     */
    addLed(x: number, y: number): Entity {
        this.leds.push(new Led(x, y));
        return this;
    }

    /**
     * Adds a led that should represent the entity.
     * 
     * @param x The x position the led should move to relative to the first led.
     * @param y The y position the led should move to relative to the first led.
     */
    addRelativeLed(x: number, y: number): Entity {
        this.leds.push(new Led(this.xPosition + x, this.yPosition + y));
        return this;
    }

    /**
     * Gets the x position of the first led.
     * This should generally only be used when the entity consists of a single led.
     */
    get xPosition() {
        return this.leds[0].x;
    }

    /**
     * Gets the y position of the first led.
     * This should generally only be used when the entity consists of a single led.
     */
    get yPosition() {
        return this.leds[0].y;
    }

    /**
     * Sets the x position of the first led.
     * This should generally only be used when the entity consists of a single led.
     * 
     * @param xPosition The x position the led should move to.
     */
    set xPosition(xPosition: number) {
        this.leds[0].x = xPosition;
    }

    /**
     * Sets the y position of the first led.
     * This should generally only be used when the entity consists of a single led.
     *
     * @param yPosition The y position the led should move to.
     */
    set yPosition(yPosition: number) {
        this.leds[0].y = yPosition;
    }

    /**
     * Checks if the entity collides with another entity.
     * The entity collides with another entity when they have the same x and y positions.
     * 
     * @param that The entity to compare to.
     */
    collidesWith(that: Entity): boolean {
        for (const p1 of this.leds) {
            for (const p2 of that.leds) {
                if (Math.floor(p1.x) == Math.floor(p2.x) && Math.floor(p1.y) == Math.floor(p2.y))
                    return true;
            }
        }
        return false;    
    }

    /**
     * Removes the entity from memory and the screen.
     */
    destroy(): void {
        if (this.game.entities.indexOf(this) == -1) return;
        this.game.entities.removeElement(this);
    }

    /**
     * Updates the state of the entity.
     * This method is called every frame.
     */
    update(): void {}

    /**
     * Fires when the entity collides with another entity.
     * This method is called every frame after the update method.
     * 
     * @param collidedWith The entity it has colided with.
     */
    onCollision(collidedWith: Entity) {}
}