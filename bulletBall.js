class bulletBall {
    constructor(game) {
        this.game = game;
        this.image = null;
        this.isImageLoaded = false;

        this.x = BULLET_BALL_START_X;
        this.y = BULLET_BALL_START_Y;

        this.color = this.getRandomColor();

        this.loadImage();
    }

    getRandomColor() {
        let colors = ['red', 'green', 'blue'];
        let colorRandom = Math.round(Math.random() * 2);
        return colors[colorRandom];
    }

    loadImage() {
        this.image = new Image;
        this.image.onload = () => {
            this.isImageLoaded = true;
        }
        this.image.src = 'images/ball-' + this.color + '.png';
    }

    update() {

    }

    draw() {
        if (!this.isImageLoaded) {
            return;
        }

        this.game.context.drawImage(
            this.image, 
            this.x - BALL_RADIUS, 
            this.y - BALL_RADIUS
        );
    }
}