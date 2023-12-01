const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
gradient.addColorStop(0, '#0aff0a');
gradient.addColorStop(0.5, '#00affa');
gradient.addColorStop(1, '#fa00f0');

addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
    gradient.addColorStop(0, '#0aff0a');
    gradient.addColorStop(0.5, '#00affa');
    gradient.addColorStop(1, '#fa00f0');
})

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
        this.charactors = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.text = '';
    }

    draw(ctx) {
        this.text = this.charactors.charAt(Math.floor(Math.random() * this.charactors.length));
        ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.975) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 20;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#init();
    }

    #init() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
}

const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.font = effect.fontSize + 'px monospace';
    // effect.symbols.forEach(symbol => symbol.draw(ctx));

    requestAnimationFrame(animate);
}

animate(0);