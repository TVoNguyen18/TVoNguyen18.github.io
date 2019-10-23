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

  drawRectangle(point1, point2, point3, point4, rectangleProperties) {
    const context = this.canvas.getContext("2d");
    context.fillStyle = rectangleProperties.color;
    context.moveTo(point1.x, point1.y);
    context.beginPath();
    context.lineTo(point2.x, point2.y);
    context.lineTo(point3.x, point3.y);
    context.lineTo(point4.x, point4.y);
    context.lineTo(point1.x, point1.y);
    context.fill();
    context.lineWidth = rectangleProperties.width;
    context.strokeStyle = rectangleProperties.color;
    context.stroke();
  }

  drawSquare(startingPoint, sideLength, squareProperties) {
    const context = this.canvas.getContext("2d");
    context.fillStyle = rectangleProperties.color;
    context.moveTo(point1.x, point1.y);
    context.beginPath();

    //Top right
    context.lineTo(point1.x + sideLength, point1.y);

    //Bottom right
    context.lineTo(point1.x + sideLength, point1.y + sideLength);

    //Bottom left
    context.lineTo(point1.x, point1.y + sideLength);

    //Move back -- Top left
    context.lineTo(point1.x, point1.y);

    context.fill();
    context.lineWidth = rectableProperties.width;
    context.strokeStyle = rectangleProperties.color;
    context.stroke();
  }

  drawCircle() {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }

  drawBackground(canvas, canvasDimensions, color = BACKGROUND_COLOR) {
    const context = canvas.getContext("2d");
    context.canvas.width = canvasDimensions.width;
    context.canvas.height = canvasDimensions.height;
    context.fillStyle = color;
    context.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
  }
}


function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
  return color;
}

// Generates a random value between [min, max] (inclusive).
function generateRandomValue(minValue = 1, maxValue = 10) {
  min = Math.ceil(minValue);
  max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

  // Generates a random set of points (x, y) for a certain range [min, max] (inclusive)
function generateRandomPoint(range) {
  return {
    x: generateRandomValue(range.min, range.max),
    y: generateRandomValue(range.min, range.max),
  };
}
