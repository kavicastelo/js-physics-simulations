let canvas;
let c;
let width, height;

const minVelocity = -3;
const maxVelocity = 3;
const allBoids = [];
const boidSize = 15;

const boidCount = 300;

const alignmentDistance = 100;     //Adjustable
const cohesionDistance = 70;     //Adjustable
const separationDistance = 25;     //Adjustable

let initCtr = 0;
let initR, initG, initB, clr;
let rX, rY, iX, iY;

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    width = canvas.width;
    height = canvas.height;
})

function init() {
    canvas = document.querySelector('canvas');
    c = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    width = canvas.width;
    height = canvas.height;

    initBoids();
    flocking();
}

function initBoids() {
    if( initCtr % 100 === 0 ) {
        initR = parseInt(randomBetween(50, 255));
        initG = parseInt(randomBetween(50, 255));
        initB = parseInt(randomBetween(50, 255));
        clr   = "rgb(" + initR + "," + initG + "," + initB + ")";

        rX = randomBetween(10, width-10);
        rY = randomBetween(10, height-10);
    }

    iX = randomBetween(-1, 1);
    iY = randomBetween(-1, 1);
    const aBoid = new Boid(rX, rY, iX, iY, clr);
    allBoids.push( aBoid );

    initCtr++;
    if( initCtr > boidCount ) {
        return;
    }

    setTimeout(initBoids, 10);
}

/**
 * Loop function
 */
function flocking() {
    c.fillStyle = '#000000';
    c.fillRect(0, 0, width, height);

    //Loop thru all boids and adjust their speeds.
    allBoids.forEach(boid => {
        const alignSpeedAdj = doAlignment(boid);
        boid.addSpeed(alignSpeedAdj);

        const cohesSpeedAdj = doCohesion(boid);
        boid.addSpeed(cohesSpeedAdj);

        const separSpeedAdj = doSeparation(boid);
        boid.addSpeed(separSpeedAdj);

        boid.update();
        boid.render(c);
    });

    requestAnimationFrame(flocking);
}

function doAlignment(aBoid) {
    let countOfNeighbours = 0;
    let totalSpeedX = 0;
    let totalSpeedY = 0;
    let alignmentSpeed = new Point(0, 0);

    allBoids.forEach(boid => {
        if( aBoid !== boid && getDistance(aBoid.x, aBoid.y, boid.x, boid.y) < alignmentDistance ) {
            totalSpeedX += boid.speedX;
            totalSpeedY += boid.speedY;
            countOfNeighbours++;
        }
    });

    if( countOfNeighbours > 0 ) {
        let avgX = totalSpeedX / countOfNeighbours;
        let avgY = totalSpeedY / countOfNeighbours;
        let normalX = (avgX - minVelocity) / (maxVelocity - minVelocity);
        let normalY = (avgY - minVelocity) / (maxVelocity - minVelocity);
        normalX /= 100;
        normalY /= 100;
        alignmentSpeed = new Point(normalX, normalY);
    }

    return alignmentSpeed;
}

function doCohesion(aBoid) {
    let countOfNeighbours = 0;
    let totalX = 0;
    let totalY = 0;
    let cohesionSpeed = new Point(0, 0);
    allBoids.forEach(boid => {
        if( aBoid !== boid && getDistance(aBoid.x, aBoid.y, boid.x, boid.y) < cohesionDistance ) {
            totalX += boid.x;
            totalY += boid.y;
            countOfNeighbours++;
        }
    });

    if( countOfNeighbours > 0 ) {
        let avgX = totalX / countOfNeighbours;
        let avgY = totalY / countOfNeighbours;
        let normalX = avgX - aBoid.x;
        let normalY = avgY - aBoid.y;
        normalX /= 100;
        normalY /= 100;
        cohesionSpeed = new Point(normalX, normalY);
    }

    return cohesionSpeed;
}

function doSeparation(aBoid) {
    let countOfNeighbours = 0;
    let sepX = 0;
    let sepY = 0;
    let separationSpeed = new Point(0, 0);
    allBoids.forEach(boid => {
        if( aBoid !== boid && getDistance(aBoid.x, aBoid.y, boid.x, boid.y) < separationDistance ) {
            sepX -= boid.x - aBoid.x;
            sepY -= boid.y - aBoid.y;
            countOfNeighbours++;
        }
    });

    if( countOfNeighbours > 0 ) {
        sepX /= 70;
        sepY /= 70;
        separationSpeed = new Point(sepX, sepY);
    }

    return separationSpeed;
}