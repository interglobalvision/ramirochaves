/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, WP */

/**
 * A great deal of this code is thanks to a
 * public Codepen by Curt Husting.
 * Thanks Curt!!
 *
 * https://codepen.io/curthusting/pen/fkCzh
 * https://github.com/curthusting
 */

class Scratch {
  constructor() {
    this.mobileThreshold = 601;

    $(window).resize(this.onResize.bind(this));

    $(document).ready(this.onReady.bind(this));
  }

  onResize() {

  }

  onReady() {
    if (WP.images !== undefined) {
      this.image = WP.images;

      // Init
      this.loadImages();
    }
  }

  /**
   * Helper function to get the local coords of an event in an element,
   * since offsetX/offsetY are apparently not entirely supported, but
   * offsetLeft/offsetTop/pageX/pageY are!
   *
   * @param elem element in question
   * @param ev the event
   */
  getLocalCoords(elem, ev) {
    var ox = 0, oy = 0;
    var first;
    var pageX, pageY;

    // Walk back up the tree to calculate the total page offset of the
    // currentTarget element.  I can't tell you how happy this makes me.
    // Really.
    while (elem !== null) {
      ox += elem.offsetLeft;
      oy += elem.offsetTop;
      elem = elem.offsetParent;
    }

    if (ev.hasOwnProperty('changedTouches')) {
      first = ev.changedTouches[0];
      pageX = first.pageX;
      pageY = first.pageY;
    } else {
      pageX = ev.pageX;
      pageY = ev.pageY;
    }

    return { 'x': pageX - ox, 'y': pageY - oy };
  }

  /**
   * Recomposites the canvases onto the screen
   */
  recompositeCanvases() {
  	const tempctx = this.canvas[0].temp.getContext('2d');
  	const mainctx = this.mainCanvas.getContext('2d');

    // Step 1: clear the temp
  	this.canvas[0].temp.width = this.canvas[0].temp.width; // resizing clears

  	// Step 2: stamp the draw on the temp (source-over)
  	tempctx.drawImage(this.canvas[0].draw, 0, 0);

  	// Step 3: stamp the background on the temp (!! source-atop mode !!)
  	//tempctx.globalCompositeOperation = 'source-atop';
  	//tempctx.drawImage(image[0].img, 0, 0);

  	// Step 4: stamp the foreground on the display canvas (source-over)
  	//mainctx.drawImage(image[1].img, 0, 0);

  	// Step 5: stamp the temp on the display canvas (source-over)
  	mainctx.drawImage(this.canvas[0].temp, 0, 0);

  }

  /**
   * Draw a scratch line
   *
   * @param can the canvas
   * @param x,y the coordinates
   * @param fresh start a new line if true
   */
  scratchLine(can, x, y, fresh) {
  	var ctx = can.getContext('2d');
  	ctx.lineWidth = 50;
  	ctx.lineCap = ctx.lineJoin = 'round';
  	ctx.strokeStyle = '#f00'; // can be any opaque color
  	if (fresh) {
  		ctx.beginPath();
  		// this +0.01 hackishly causes Linux Chrome to draw a
  		// "zero"-length line (a single point), otherwise it doesn't
  		// draw when the mouse is clicked but not moved
      // Plus x 26 : y 25 for cursor svg offset
  		ctx.moveTo(x+0.01+26, y+25);
  	}
  	ctx.lineTo(x+26, y+25);
  	ctx.stroke();
  }

  /**
  * Set up the canvases
  */
  setupCanvases() {
    this.mainCanvas = document.getElementById('main-canvas');

    // Set main canvas to width and height of window
  	this.mainCanvas.width = window.innerWidth;
  	this.mainCanvas.height = window.innerHeight;

    this.canvas = [];

    for (var i = 0; i < this.image.length; i++) {
      // Create temp and draw canvases for each image
      this.canvas[i] = {
        'temp': document.createElement('canvas'),
        'draw': document.createElement('canvas')
      };

      // Set canvases to width and height of main canvas
      this.canvas[i].temp.width = this.canvas[i].draw.width = this.mainCanvas.width;
    	this.canvas[i].temp.height = this.canvas[i].draw.height = this.mainCanvas.height;
    }

    // draw the stuff to start
  	this.recompositeCanvases();

    this.mouseDown = false;

    // Bind events
    this.mainCanvas.addEventListener('mousedown', this.mousedown_handler.bind(this), false);
  	this.mainCanvas.addEventListener('touchstart', this.mousedown_handler.bind(this), false);

  	window.addEventListener('mousemove', this.mousemove_handler.bind(this), false);
  	window.addEventListener('touchmove', this.mousemove_handler.bind(this), false);

  	window.addEventListener('mouseup', this.mouseup_handler.bind(this), false);
  	window.addEventListener('touchend', this.mouseup_handler.bind(this), false);
  }

  /**
	 * On mouse down, draw a line starting fresh
	 */
	mousedown_handler(e) {
		const local = this.getLocalCoords(this.mainCanvas, e);
		this.mouseDown = true;

		this.scratchLine(this.canvas[0].draw, local.x, local.y, true);
		this.recompositeCanvases();

		if (e.cancelable) { e.preventDefault(); }
		return false;
	}

	/**
	 * On mouse move, if mouse down, draw a line
	 *
	 * We do this on the window to smoothly handle mousing outside
	 * the canvas
	 */
	mousemove_handler(e) {
		if (!this.mouseDown) { return true; }

		const local = this.getLocalCoords(this.mainCanvas, e);

		this.scratchLine(this.canvas[0].draw, local.x, local.y, false);
		this.recompositeCanvases();

		if (e.cancelable) { e.preventDefault(); }
		return false;
	}

	/**
	 * On mouseup.  (Listens on window to catch out-of-canvas events.)
	 */
	mouseup_handler(e) {
		if (this.mouseDown) {
			this.mouseDown = false;
			if (e.cancelable) { e.preventDefault(); }
			return false;
		}

		return true;
	}

  /**
  * Set up the DOM when loading is complete
  */
  loadingComplete() {
    // Show the canvas or something
    console.log('Images loaded! Do something here :)');
  }

  /**
   * Handle loading of needed image resources
   */
  loadImages() {
    let loadCount = 0;
    let loadTotal = this.image.length;

    const imageLoaded = () => {
      loadCount++;

      if (loadCount >= loadTotal) {
        // All images loaded!
        this.setupCanvases();
        this.loadingComplete();
      }
    };

    for (let image of this.image) {
      // Create img elements for each image
      // and save it on the object
      image.img = document.createElement('img'); // image is global
      image.img.addEventListener('load', imageLoaded.bind(this), false);
      image.img.src = image.url;
    }
  }

}

export default Scratch;
