class arrow {
    constructor(game) {
        this.game = game;
        this.mousePos = { x: 0, y: 0 };

    }

    setMousePosition(newMousePosition) {
        this.mousePos = newMousePosition;
    }

    draw() {
        if (this.mousePos === null) {
            return;
        }
        this.game.context.beginPath();
        this.game.context.strokeStyle = "red";
        this.game.context.lineWidth = 4;
        this.game.context.moveTo(BULLET_BALL_START_X, BULLET_BALL_START_Y);
        this.game.context.lineTo(this.mousePos.x, this.mousePos.y);
        this.game.context.stroke();
    }
}