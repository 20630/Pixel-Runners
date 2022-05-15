class Player extends Entity {
    inJump: boolean = false;
    private jumpFrame: number = 0;

    constructor() {
        super(1, 0);
    }

    update(): void {
        if (this.inJump) {
            switch (this.jumpFrame) {
                case 0:
                case 1:
                    this.move(0, 1);
                    break;
                case 3:
                case 4:
                    this.move(0, -1);
                    break;   
            }
            if (this.jumpFrame == 5) {
                this.inJump = false;
                this.jumpFrame = 0;
            } else {
                this.jumpFrame++;
            }
            
        }
    }
}