class Drawable {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.offsets = {
            x: 0,
            y: 0
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.className = "element " + this.constructor.name.toLowerCase();
        $('.elements').append(this.element);
    }

    update() {
        this.x += this.offsets.x;
        this.y += this.offsets.y;
    }

    draw() {
        this.element.style = `
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.w}px;
            height: ${this.h}px;
        `;
    }
}

class Fruit extends Drawable {
    constructor(game) {
        super(game);
        this.w = 70;
        this.h = 70;
        this.y = 60;
        this.x = random(0, window.innerWidth - this.w);
        this.offsets.y = 3;
        this.createElement();
    }
}

class Banana extends Fruit {
    constructor(game) {
        super(game);
    }
}

class Apple extends Fruit {
    constructor(game) {
        super(game);
        this.offsets.y = 5;
    }
}

class Orange extends Fruit {
    constructor(game) {
        super(game);
        this.offsets.y = 7;
    }
}

class Player extends Drawable {
    constructor(game) {
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = window.innerWidth / 2 - this.w / 2;
        this.y = window.innerHeight - this.h;
        this.speedPerFrame = 20;
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false
        };
        this.createElement();
        this.bindKeyEvents();
    }

    bindKeyEvents() {
        document.addEventListener('keydown', ev => this.changeKeyStatus(ev.code, true));
        document.addEventListener('keyup', ev => this.changeKeyStatus(ev.code, false));
    }

    changeKeyStatus(code, value) {
        if(code in this.keys) this.keys[code] = value;
    }

    update() {
        if(this.keys.ArrowLeft && this.x > 0) {
            this.offsets.x = -this.speedPerFrame;
        } else if(this.keys.ArrowRight && this.x < window.innerWidth - this.w) {
            this.offsets.x = this.speedPerFrame;
        } else {
            this.offsets.x = 0;
        }
        super.update();
    }
}

class Game {
    constructor() {
        this.name = name;
        this.elements = [];
        this.player = this.generate(Player);
        this.counterForTimer = 0;
        this.fruits = [Apple, Banana, Orange]
    }

    start() {
        this.loop();
    }

    generate(className) {
        let element = new className(this);
        this.elements.push(element);
        return element;
    }

    loop() {
        requestAnimationFrame( () => {
            this.counterForTimer++;
            if(this.counterForTimer % 70 === 0) {
                this.randomFruitGenerate();
            }
            this.updateElements();
            this.setParams();
            this.loop();
        });
    }

    randomFruitGenerate() {
        this.generate(this.fruits[random(0, 2)])
    }

    updateElements() {
        this.elements.forEach(element => {
            element.update();
            element.draw();
        })
    }

    setParams() {
        let params = ['name'];
        let values = [this.name];
        params.forEach((el , ind) => {
            $( `#${el}`).innerHTML = values[ind];
        })
    }
}