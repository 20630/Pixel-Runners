class Led {
    x: number;
    y: number;
    brightness: number = 255;

    constructor(x: number, y: number, brightness?: number) {
        this.x = x;
        this.y = y;
        if (brightness != null)
            this.brightness = brightness;
    }
}