class Player extends Entity {
    onGround: boolean = true;
    jumpPressed: boolean = false;

    inHover: boolean = false;
    hoverStart: number;
    private readonly maxHoverTime = 4;

    private readonly minJumpHeight = 2;
    private readonly maxJumpHeight = 3;

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

        //Jumping/Airborne
        if (this.yVelocity == 1) {
            let atMin = this.yPosition >= this.minJumpHeight;
            let atMax = this.yPosition >= this.maxJumpHeight;

            if (!this.jumpPressed && atMin) {
                this.yVelocity = -1;
            } else if (this.jumpPressed && atMax) {
                this.inHover = true;
                this.hoverStart = Game.frameAmount;
                this.yVelocity = 0;
            }
        }

        //Hovering
        let isMaxHovered = Game.frameAmount >= this.hoverStart + this.maxHoverTime;
        if (this.inHover && (!this.jumpPressed || isMaxHovered)) {
            this.yVelocity = -1;
            this.inHover = false;
        }

        this.move(this.xVelocity, this.yVelocity);

        if (this.yPosition < 0) {
            this.yPosition = 0;
            this.onGround = true;
        }
    }
}