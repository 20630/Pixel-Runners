class Player extends Entity {
    onGround: boolean = true;
    jumpPressed: boolean = false;
    inHover: boolean = false;
    private hoverStart: number; //Frame when hovering started

    private readonly MAX_HOVER_TIME = 5; //Time in frames
    private readonly MIN_JUMP_HEIGHT = 2;
    private readonly MAX_JUMP_HEIGHT = 3;

    constructor(game: Game) {
        super(0, 0, game);
    }

    update(): void {
        let aDown = this.game.isInput(Input.BUTTON_A_DOWN);
        let aUp = this.game.isInput(Input.BUTTON_A_UP);
        
        //Start jump
        if (aDown && this.onGround) {
            this.yVelocity = 1;
            this.onGround = false;
            this.jumpPressed = true;
        }

        if (aUp && this.jumpPressed) {
            this.jumpPressed = false;
        }

        //Airborne
        if (this.yVelocity == 1) {
            let atMinPos = this.yPosition >= this.MIN_JUMP_HEIGHT;
            let atMaxPos = this.yPosition >= this.MAX_JUMP_HEIGHT;

            if (!this.jumpPressed && atMinPos) {
                this.yVelocity = -1;
            } else if (this.jumpPressed && atMaxPos) {
                this.inHover = true;
                this.hoverStart = this.game.frameAmount;
                this.yVelocity = 0;
            }
        }

        //Hovering
        let isMaxHovered = this.game.frameAmount >= this.hoverStart + this.MAX_HOVER_TIME;
        if (this.inHover && (!this.jumpPressed || isMaxHovered)) {
            this.yVelocity = -1;
            this.inHover = false;
        }

        this.move(this.xVelocity, this.yVelocity);

        if (!this.onGround && this.yPosition == 0) {
            this.onGround = true;
            this.yVelocity = 0;
        }
    }

    onCollision(collidedWith: Entity): void {
        this.game.gameState = GameState.MENU;
        this.game.entities = [];
    }
}