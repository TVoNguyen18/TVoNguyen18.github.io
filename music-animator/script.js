class MyVisualizer extends AbstractVisualizer {
    constructor(analyzedAudio = []) {
      super();
      this.peaks = analyzedAudio.peaks;
    }

    startVisual() {
      this.updateVisual(/* peakIndex */ 0);
    }

    /**
     * TODO(week 4):
     * 1) Call drawShapes() to re-draw the visual at the current time index.
     *    -- If you want to "conditionally" draw (ex. only draw at a certain
     *    BEAT in the song), what do you need to add?
     * 2) Add the requestAnimationFrame loop which recursively calls
     * itself ("updateVisual") to repeatedly update the visual.
     */
    updateVisual(peakIndex) {
      const audioEl = document.querySelector('#audio');
      //debugger;

      // If we pass an index greater than the # peaks,
      if (peakIndex >= this.peaks.length) {
          return;
      }

      // TODO(you): "If"-statement here.
      // 1) Inspect the audioEl for time-related properties.
      // 2) Access the peak at peakIndex from the peaks array.
      // 3) Compare the time properties to peak properties (part 1 and 2 above):
      //    -- If the audio's current time is greater or equal to the time of
      //    the peak, draw visualizations (drawShapes).
      if (audioEl.currentTime >= this.peaks[peakIndex]["timeOfPeak"]) {
        this.clear();
        this.start();
        this.drawShapes();

        // Update the frame.
        requestAnimationFrame(() => {
          this.updateVisual(peakIndex + 1);

        });
      } else {
        // Otherwise, render the current (existing) visualization)
        requestAnimationFrame(() => {
          this.updateVisual(peakIndex)

        });
      }
    }

    /**
     * TODO(week 4): Draw the shapes you'd expect to see in your visual.
     */
    drawShapes() {
      for (let i = 0; i < generateRandomValue(1, 7); i++) {
        this.drawCircle(generateRandomPoint(), generateRandomValue(10, 200), generateRandomColor());
        this.drawSquare(generateRandomPoint(), generateRandomValue(10, 100), generateRandomColor());
      }
      this.drawStar(generateRandomValue(10, 100), generateRandomPoint(), generateRandomColor());
      this.drawStar(generateRandomValue(20, 80), generateRandomPoint(), generateRandomColor());
    }

    clear() {
      this.clearCanvas();

    }
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const data = new Uint8Array(analyser.frequencyBinCount);

const spotifyApi = new SpotifyWebApi();

getToken().then((token) => {
  spotifyApi.setAccessToken(token);
});

/**
 * TODO(you): Add a 'click' event listener that starts the music.
 */
document.getElementById('playButton').addEventListener('click', (clickEvent) => {
  clickEvent.preventDefault();

  const audioEl = document.querySelector('#audio');
  const queryInput = document.querySelector('#query')
  document.getElementById('playCircle').setAttribute("class", "playing");

  if(!audioEl.src) {
    // TODO(you): Use the spotifyApi to searchTracks for your input. Documentation can be found at:
    // https://doxdox.org/jmperez/spotify-web-api-js#src-spotify-web-api.js-constr.prototype.searchtracks
    spotifyApi.searchTracks(queryInput.value, {limit: 1})
      .then((results) => {
          // TODO(you): Access track from results to find a previewUrl.
        let previewUrl = results.tracks.items[0].preview_url;
        let visualizer = new MyVisualizer();
        if (previewUrl) {
          //let  visualizer = new AbstractVisualizer();
          // Sets the HTML audio element source to the music.
          audioEl.src = previewUrl;

          requestAudio(previewUrl, (audio) => {
            // TODO(you): Use analyzeAudio to apply frequency analysis.
            let analyzedAudio = analyzeAudio(audio);
            // TODO(you): Create an instance of MyVisualizer using the
            // analyzed audio.

            let myVisualize = new MyVisualizer(analyzedAudio);

            audioEl.play();

            // Use MyVisualizer's startVisual to start visualization.
            myVisualize.startVisual();
          });
        } else {
          console.warn('This song does not have a preview');
          document.getElementById('playCircle').setAttribute("class", "");
        }
      })
      .catch((error) => {
        console.warn('Something went wrong');
        console.warn(error);
        document.getElementById('playCircle').setAttribute("class", "");
      });
  } else if (!audioEl.paused) {
    audioEl.pause();
		document.getElementById('playCircle').setAttribute("class", "");
  } else {
    audioEl.play();
		document.getElementById('playCircle').setAttribute("class", "playing");
  }
});


/*let visualizer = new MyVisualizer();
{x: y:} -->generateRandomPoint()
visualizer.drawRectangle(generateRandomPoint(), generateRandomPoint(), generateRandomPoint(), generateRandomPoint(), generateRandomColor());
visualizer.drawStar(100, generateRandomPoint(), generateRandomColor());
visualizer.drawCircle(generateRandomPoint(), 40, generateRandomColor());
visualizer.drawSquare(generateRandomPoint(), 50, generateRandomColor());*/
