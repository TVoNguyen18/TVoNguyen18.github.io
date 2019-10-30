# Week 4

## Exercise 1: Implement draw methods

For the first exercise we're going to try and draw shapes on the page.
Eventually we'll use these shapes in the Spotify visualizer. To test this code
we'll need to instantiate an instance of visualizer. We can do that by adding
this block to the bottom of the file:

```js
let visualizer = new MyVisualizer();
visualizer.drawRectangle({x: 100, y:100}, {x:200, y:100}, {x:200, y:200}, {x:100, y:200}); 
// visuzlizer.<method name>(<param1>, <param2>, ..., <param3>);
```

### Step 1: `drawSquare`

*Task:* In [visualizer.js](/music-animator/visualizer.js) implement the `drawSquare`
method.

#### Requirements:


*  `drawSquare` should take 3 parameters a point, side length, and a color.

### Step 2: `drawCircle`


*Task:* In [visualizer.js](/music-animator/visualizer.js) implement the `drawCircle`
method. 

#### Requirements:


*  `drawCircle` should take 3 parameters a point, radius, and a color.

HINT: [Docs on drawing an arc](https://www.w3schools.com/tags/canvas_arc.asp)

### Challenge exercise: `drawStar`

*Task:* In [visualizer.js](/music-animator/visualizer.js) implement the `drawStar`
method that draws a star on the page.


## Exercise 2: Implement `drawShapes`

In [script.js](/music-animator/script.js) there's an empty method called `drawShapes`.
In this method we'll want to call our draw functions from Exercise 1 with randomly
generated values. To create random values there are three methods you'll need:

*  `generateRandomValue(min, max)` 
*  `generateRandomColor()`
*  `generateRandomPoint()`


###  Step 1: `generateRandomPoint`

Right now `generateRandomPoint` only returns (0, 0). You'll need to create implement
this method so that it returns a random point on the XY grid. The return type should
be an Object that has the keys, x and y, and values equal to the output of 
generateRandomValue().


### Step 2: `drawShapes`

Use the 3 helper functions, `generateRandomValue`, `generateRandomColor`, and `generateRandomPoint`
to call `drawSquare` and `drawCircle` with random values.


### Challenge:

Update `generateRandomPoint` so that it takes a range of X and Y values. Then use
that to only draw squares on the left half of the screen and circles on the right
half.


## Exercise 3: Animate to the music

In [script.js](/music-animator/script.js) there's a callback function passed
into `requestAudio`. There we can instantiate `MyVisualizer` and call `startVisual`.
Then in `updateVisual` we'll want to call our `drawShapes` function when we pass
a peak in the audio. There's a field on `MyVisualizer` named `peaks` and it contain
an array of `Peak`. Peak has a field called `timeOfPeak`. `audioEl` has a field called
`currentTime`. Using this information you should be able to animate your shapes to
the beat of the music. This is meant to be a challenge so if you found this confusing...
Then use the chrome debugger and your teammates to figure out what's going on.
