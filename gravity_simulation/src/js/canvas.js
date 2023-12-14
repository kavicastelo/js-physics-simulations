import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Variables
let gravity = 1
let friction = 0.95

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', () => {
  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy
    this.dx = dx
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction
    } else {
      this.dy += gravity
    }
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx
    }
    this.y += this.dy
    this.x += this.dx
    this.draw()
  }
}

// Implementation
let ball
let balls
function init() {
  balls = []

  for (let i = 0; i < 400; i++) {
    let radius = utils.randomIntFromRange(8, 20)
    let x = utils.randomIntFromRange(radius, canvas.width - radius*2)
    let y = utils.randomIntFromRange(0, canvas.height - radius*2)
    let dx = utils.randomIntFromRange(-2, 2)
    let dy = utils.randomIntFromRange(-2, 2)
    let color = utils.randomColor(colors)

    ball = new Ball(x, y, dx, dy, radius, color);
    balls.push(ball)
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < balls.length; i++) {
    balls[i].update()
  }
}

init()
animate()
