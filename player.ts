class Player extends Entity {
    onGround: boolean = true;

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
        let aPressed = input.buttonIsPressed(Button.A);
        if (aDown && this.onGround) {
            this.yVelocity = 1;
            this.onGround = false;
        }

        //Jumping/Airborne
        if (this.yVelocity == 1) {
            if (!aPressed && this.yPosition >= this.minJumpHeight) {
                this.yVelocity = -1;
            } else if (aPressed && this.yPosition >= this.maxJumpHeight) {
                this.inHover = true;
                this.hoverStart = Game.frameAmount;
                this.yVelocity = 0;
            }
        }

        //Hovering
        if (this.inHover && (!aPressed || Game.frameAmount >= this.hoverStart + this.maxHoverTime)) {
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