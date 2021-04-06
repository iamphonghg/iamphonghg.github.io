class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.loop();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        document.body.appendChild(this.canvas);

        this.bulletBall = new bulletBall(this);

        this.arrow = new arrow(this);


        this.listenMouseEvent();
    }

    getMousePosition(event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    listenMouseEvent() {
        this.canvas.addEventListener('mousemove', (event) => {
            let mousePos = this.getMousePosition(event);
            this.arrow.setMousePosition(mousePos);
        });
        this.canvas.addEventListener('click', (event) => {

        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout( () => this.loop(), 20);
    }

    update() {
        this.bulletBall.update();
    }

    draw() {
        this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.arrow.draw();
        this.bulletBall.draw();
    }
}

var dynamite = new game();