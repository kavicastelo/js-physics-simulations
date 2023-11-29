const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

const focalLength = canvas.width;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

addEventListener('resize', () => {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

    init();
})

function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.width;
    this.size = 2;

    this.draw=() => {
        let x,y,s;

        x = (this.x - centerX) * (focalLength / this.z);
        x = x + centerX;

        y = (this.y - centerY) * (focalLength / this.z);
        y = y + centerY;

        s = this.size * (focalLength / this.z);

        c.beginPath();
        c.arc(x, y, s, 0, Math.PI * 2);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }

    this.update=() => {
        this.z = this.z - 5; //increase minus value to increase speed
        if (this.z <= 0) {
            this.z = canvas.width;
        }
    }
}

let stars;
function init() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.draw();
        star.update();
    })
}

init();
animate();