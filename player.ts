class Player extends Entity {
    onGround: boolean = true;
    jumpPressed: boolean = false;
    inHover: boolean = false;
    private hoverStart: number; //Frame when hovering started

    private readonly MAX_HOVER_TIME = 4; //Time in frames
    private readonly MIN_JUMP_HEIGHT = 2;
    private readonly MAX_JUMP_HEIGHT = 3;

    constructor() {
        super(1, 0);
    }

    update(): void {
        let aDown = Game.isInput(Input.BUTTON_A_DOWN);
        let aUp = Game.isInput(Input.BUTTON_A_UP);

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
                this.hoverStart = Game.frameAmount;
                this.yVelocity = 0;
            }
        }

        //Hovering
        let isMaxHovered = Game.frameAmount >= this.hoverStart + this.MAX_HOVER_TIME;
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
}