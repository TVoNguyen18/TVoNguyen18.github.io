const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const BACKGROUND_COLOR = "white";

class AbstractVisualizer {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.start();
  }

  renderBeatAnimation() {
    throw new Error('Please extend class and override method');
  }

  start() {
    this.drawBackground(this.canvas, {width: CANVAS_WIDTH, height: CANVAS_HEIGHT});
  }

  drawRectangle(point1, point2, point3, point4, color, rectangleProperties = {}) {
    const context = this.canvas.getContext("2d");
    context.lineWidth = rectangleProperties.width || 5;
    context.strokeStyle = rectangleProperties.color || '#FF00000';

    context.moveTo(point1.x, point1.y);
    context.lineTo(point2.x, point2.y);
    context.lineTo(point3.x, point3.y);
    context.lineTo(point4.x, point4.y);
    context.lineTo(point1.x, point1.y);
    context.closePath();
    context.fillStyle = color;
    context.fill();
    context.lineWidth = rectangleProperties.width;
    context.strokeStyle = rectangleProperties.color;
    context.stroke();
  }

  drawSquare(startingPoint, sideLength, color, squareProperties = {}) {
    const context = this.canvas.getContext("2d");
    context.fillStyle = squareProperties.color;
    context.moveTo(startingPoint.x, startingPoint.y);
    context.beginPath();
    //debugger;

    //Top right
    context.lineTo(startingPoint.x + sideLength, startingPoint.y);

    //Bottom right
    context.lineTo(startingPoint.x + sideLength, startingPoint.y + sideLength);

    //Bottom left
    context.lineTo(startingPoint.x, startingPoint.y + sideLength);

    //Move back -- Top left
    context.lineTo(startingPoint.x, startingPoint.y);

    context.closePath();

    context.fillStyle = color;
    context.fill();
    context.lineWidth = squareProperties.width;
    context.strokeStyle = squareProperties.color;
    context.stroke();
  }

  drawCircle(startingPoint, radius, color) {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(startingPoint.x, startingPoint.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }

  drawBackground(canvas, canvasDimensions, color = BACKGROUND_COLOR) {
    const context = canvas.getContext("2d");
    context.canvas.width = canvasDimensions.width;
    context.canvas.height = canvasDimensions.height;
    context.fillStyle = color;
    context.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
  }

  drawStar(radius, startingPoint, color, starProperties = {}) {
    let alpha = (2 * Math.PI) / 10;
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");

    ctx.beginPath();

    for(let i = 11; i != 0; i--) {
      let r = radius*(i % 2 + 1)/2;
      let omega = alpha * i;
      ctx.lineTo((r * Math.sin(omega)) + startingPoint.x, (r * Math.cos(omega)) + startingPoint.y);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = starProperties.width;
    ctx.strokeStyle = starProperties.color;
    ctx.stroke();
  }
}


/**
 * Generates a hexadecimal random color.
 */
function generateRandomColor() {
  const color = generateRandomValue(0x0, 0xFFFFFF);
  return '#' + color.toString(16);
}

/**
 * Generates a random value between [min, max] (inclusive).
 */
//function generateRandomValue(minValue = 1, maxValue = 10) {
function generateRandomValue(minValue, maxValue) {
  min = Math.ceil(minValue);
  max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomPoint() {
  // TODO:
  // Use generateRandomValue to create a ranom x and a random y value.
  // HINT: we can use the constants CANVAS_HEIGHT and CANVAS_WIDTH for the max
  //     x and y values.
  return {
    x: generateRandomValue(0, 1000),
    y: generateRandomValue(0, 600)
  };
}
