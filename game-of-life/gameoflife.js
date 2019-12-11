console.log("My new file!");

class GameOfLife {
    constructor() {

    }

    next(shape) {
        let neighbors = {};
        for (let i = 0; i < shape.length; i++) {

            // Top-left (-1 , -1)
            let key = "c" + (shape[i][0] - 1) + ", " + (shape[i][1] - 1);

            if (neighbors[key]) {
                neighbors[key].n++;
            } else {
                neighbors[key] = {
                    n: 1,
                    cell: [shape[i][0] - 1, shape[i][1] - 1]
                    //populated: true
                };
            }

            //Top (0, -1)
            key = "c" + (shape[i][0]) + ", " + (shape[i][1] - 1);
            if (neighbors[key]) {
                neighbors[key].n++;
            } else {
                neighbors[key] = {
                    n: 1,
                    cell: [shape[i][0], shape[i][1] - 1]
                    //populated: true
                };
            }

            // Top-right (+1, -1)
            key = "c" + (shape[i][0] + 1) + ", " + (shape[i][1] - 1);
            if (neighbors[key]) {
                neighbors[key].n++;
            } else {
                neighbors[key] = {
                    n: 1,
                    cell: [shape[i][0] + 1, shape[i][1] - 1]
                    //populated: true
                };
            }

            //Bottom-left (-1, +1)
            key = "c" + (shape[i][0] - 1) + ", " + (shape[i][1] + 1);
            if (neighbors[key]) {
                neighbors[key].n++;
            } else {
                neighbors[key] = {
                    n: 1,
                    cell: [shape[i][0] - 1, shape[i][1] + 1]
                    //populated: true
                };
            }

            //Bottom-right (+1, +1)
            key = "c" + (shape[i][0] + 1) + ", " + (shape[i][1] + 1);
            if (neighbors[key]) {
                neighbors[key].n++;
            } else {
                neighbors[key] = {
                    n: 1,
                    cell: [shape[i][0] + 1, shape[i][1] + 1]
                    //populated: true
                };
            }

            //Bottom (0, +1)
            key = "c" + (shape[i][0]) + ", " + (shape[i][1] + 1);
            if (neighbors[key]) {
                neighbors[key].n++;
            } else {
                neighbors[key] = {
                    n: 1,
                    cell: [shape[i][0], shape[i][1] + 1]
                    //populated: true
                };
            }

            //Left (-1, 0)
            key = "c" + (shape[i][0] - 1) + ", " + (shape[i][1]);
            if (neighbors[key]) {
                neighbors[key].n++;
            } else {
                neighbors[key] = {
                    n: 1,
                    cell: [shape[i][0] - 1, shape[i][1]]
                    //populated: true
                };
            }

            //Right (+1, 0)
            key = "c" + (shape[i][0] + 1) + ", " + (shape[i][1]);
            if (neighbors[key]) {
                neighbors[key].n++;
            } else {
                neighbors[key] = {
                    n: 1,
                    cell: [shape[i][0] + 1, shape[i][1]]
                    //populated: true
                };
            }


            //debugger;
        }

        for (let i = 0; i < shape.length; i++) {
            let cell = shape[i];
            let x = cell[0];
            let y = cell[1];

            let key = "c" + x + ", " + y;
            if(neighbors[key]) {
                neighbors[key].populated = true;
            }
        }

        let nextShape = [];
        for (let key in neighbors) {
            let currentNeighbor = neighbors[key];
            let numOfNeighbors = neighbors[key].n;
            let populated = neighbors[key].populated;
            let cell = neighbors[key].cell;

            // If populated == true
            if (neighbors[key].populated == true) {
                if (neighbors[key].n == 2 || neighbors[key].n == 3) {
                    nextShape.push(neighbors[key].cell);
                    console.log("It survives");
                }
            } else {
                if (neighbors[key].n == 3) {
                    nextShape.push(neighbors[key].cell);
                    console.log("I am a creator of cells");
                }
            }
        }
        //debugger;
        return nextShape;
    }
}

class Canvas {
    constructor(container) {
        let canvasElement = document.createElement("canvas");
        this.obj = canvasElement;
        this.pixelWidth = 803;
        canvasElement.width = this.pixelWidth;
        this.pixelHeight = 506;
        canvasElement.height = this.pixelHeight;
        container.appendChild(canvasElement);
        this.ctx = this.obj.getContext("2d");
        this.setGridSize(11);
    }

    draw(cells) {
        let ctx = this.ctx;
		let size = this.cellSize;
        let cell;

		ctx.fillStyle = "#7e7e7e";
		ctx.lineWidth = 1;
		ctx.fillRect (0, 0, this.pixelWidth, this.pixelHeight);
		ctx.strokeStyle = "#999";
        for (let n = this.cellSize; n < this.pixelWidth; n += this.cellSize) {
		    ctx.beginPath();
			ctx.moveTo(n+.5, 0);
			ctx.lineTo(n+.5, this.pixelHeight);
			ctx.stroke();
		}

        for (let n = this.cellSize; n < this.pixelHeight; n += this.cellSize) {
			ctx.beginPath();
			ctx.moveTo(0, n+.5);
			ctx.lineTo(this.pixelWidth, n+.5);
		    ctx.stroke();
		}

		ctx.fillStyle = "yellow";
		ctx.lineWidth = 1;

		/*this.forEach(function(cell, i) {
            ctx.fillRect(cells[0]*size+1, cells[1]*size+1, size-1, size-1);
        });*/

        for(let i = 0; i < cells.length; i++) {
            cell = cells[i];
            ctx.fillRect(cell[0] * size + 1, cell[1] * size + 1, this.cellSize - 1, this.cellSize - 1);
        }
    }

    click(fn) {
        let gameCanvas = this.obj.getBoundingClientRect();
        this.obj.addEventListener('click', (event) => {
            //let gameCanvas = this.obj.getBoundingClientRect();
            let left = gameCanvas.left;
            let top = gameCanvas.top;
            let cellX = Math.floor(((event.clientX - left) / this.cellSize))
            let cellY = Math.floor(((event.clientY - top) / this.cellSize))

            console.log(left + "and top: " + top);

            console.log("Event.cellX: " + cellX + " event.cellY:" + cellY);
            fn({cellX, cellY});
        });


    }

    getDimension() {
        return {width: this.pixelWidth, height: this.pixelHeight};
    }

    getGridSize() {
        return this.cellSize;
    }

    setGridSize(gridSize) {
        this.cellSize = gridSize;
		this.width = Math.floor(this.pixelWidth/this.cellSize);
		this.height = Math.floor(this.pixelHeight/this.cellSize);
    }
}

class Shape {
    constructor(canvas) {
        this.canvas = canvas;
        this.current = [];
        this.collection = {};
    }

    get() {
        return this.current;
    }

    set(shape) {
        this.current = shape;
    }

    copy(shape) {

    }

    redraw() {
        this.canvas.draw(this.current);
    }

    center() {

    }

    offset(dx, dy) {

    }

    toggle(cell) {
        this.current.push(cell);
        this.redraw();
    }
}

class Controls {
    constructor(canvas, shape, gameoflife) {
        this.canvas = canvas;
        this.shape = shape;
        this.gameoflife = gameoflife;

        this.started = false;
        this.timer = null;
        this.generation = 0;
    }

    init(shapes) {
        this.shape.redraw()
        this.canvas.click((event) => {
            this.shape.toggle([event.cellX, event.cellY]);
        });

        this.nextElement = document.getElementById("next");

        this.nextElement.addEventListener("click", (event) => {
            this.next();
        });
    }

    setGeneration(gen) {

    }

    animate() {

    }

    next() {
        let shapeData = this.shape.get();
        this.shape.set(this.gameoflife.next(shapeData));
        this.shape.redraw();
        console.log("This works!");
    }
}

/*class Neighbors {
    constructor(n, cell, populated) {
        this.n = n;
        this.cell = cell;
        this.populated = populated;

        let neig

    }

}*/

//Below the classes

let canvasElement = document.getElementById("canvas-div");

let canvasInstance = new Canvas(canvasElement);

let shapeInstance = new Shape(canvasInstance);

let gameOfLifeInstance = new GameOfLife();

let controlsInstance = new Controls(canvasInstance, shapeInstance, gameOfLifeInstance);

canvasInstance.draw([]);
controlsInstance.init(shapeInstance.collection);
