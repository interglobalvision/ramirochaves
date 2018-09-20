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
   * Helper function to randomly shuffle array
   *
   * @param array array to shuffle
   */
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      }

    return array;
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
    let ox = 0, oy = 0;
    let first;
    let pageX, pageY;

    // Walk back up the tree to calculate the total page offset of the
    // currentTarget element.  I can't tell you how happy this makes me.
    // Really.
    while (elem !== null) {
      ox += elem.offsetLeft;
      oy += elem.offsetTop;
      elem = elem.offsetParent;
    }

    if ('changedTouches' in ev) {
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
    const mainctx = this.mainCanvas.getContext('2d');

    for (let i = 0; i < this.canvas.length; i++) {
      const tempctx = this.canvas[i].temp.getContext('2d');
      const drawctxNext = this.canvas[i + 1] !== undefined ? this.canvas[i + 1].draw.getContext('2d') : null;

      if (drawctxNext !== null) {
        // Clear [i + 1].draw
        this.canvas[i + 1].draw.width = this.canvas[i + 1].draw.width;

        // Stamp [i].temp to [i + 1].draw
        drawctxNext.globalCompositeOperation = 'source-over';
        drawctxNext.drawImage(this.canvas[i].temp, 0, 0);
      }

      // Stamp [i].draw to [i].temp
      tempctx.globalCompositeOperation = 'source-over';
      tempctx.drawImage(this.canvas[i].draw, 0, 0);

      if (drawctxNext !== null) {
        // Stamp [i].draw to [i + 1].draw (destination-in)
        drawctxNext.globalCompositeOperation = 'destination-in';
        drawctxNext.drawImage(this.canvas[i].draw, 0, 0);
      }

      // Calculate centered image position
      const imageX = (this.mainCanvas.width - this.image[i].img.width) / 2;
      const imageY = (this.mainCanvas.height - this.image[i].img.height) / 2;

      // Stamp image[i] to [i].temp (source-atop)
      tempctx.globalCompositeOperation = 'source-atop';
      tempctx.drawImage(this.image[i].img, imageX, imageY);

      // Stamp [i].temp to mainCanvas
      mainctx.drawImage(this.canvas[i].temp, 0, 0);
    }

  }

  /**
   * Draw a scratch line
   *
   * @param can the canvas
   * @param x,y the coordinates
   * @param fresh start a new line if true
   */
  scratchLine(x, y, fresh) {
    const drawctx = this.canvas[0].draw.getContext('2d');
    const strokectx = this.strokeCanvas.getContext('2d');

    drawctx.lineWidth = strokectx.lineWidth = 100;
    drawctx.lineCap = drawctx.lineJoin = strokectx.lineCap = strokectx.lineJoin = 'round';

    drawctx.strokeStyle = '#fff'; // can be any opaque color
    strokectx.strokeStyle = '#000';

    if (fresh) {
      drawctx.beginPath();
      strokectx.beginPath();

      // this +0.01 hackishly causes Linux Chrome to draw a
      // "zero"-length line (a single point), otherwise it doesn't
      // draw when the mouse is clicked but not moved
      // Plus 1 for the border

      drawctx.moveTo(x+0.01+1, y);
      strokectx.moveTo(x+0.01+1, y);
    }

    drawctx.lineTo(x+1, y);
    strokectx.lineTo(x+1, y);

    drawctx.stroke();
    strokectx.stroke();
  }

  /**
  * Set up the canvases
  */
  setupCanvases() {
    this.mainCanvas = document.getElementById('main-canvas');
    this.strokeCanvas = document.getElementById('stroke-canvas');

    this.mainCanvas.width = window.innerWidth;
    this.mainCanvas.height = window.innerHeight;

    this.canvas = [];

    for (let i = 0; i < this.image.length; i++) {
      // Create temp and draw canvases for each image
      this.canvas[i] = {
        'temp': document.createElement('canvas'),
        'draw': document.createElement('canvas')
      };

      // Set canvases to width and height of main canvas
      this.canvas[i].temp.width = this.canvas[i].draw.width = this.strokeCanvas.width = this.mainCanvas.width;
      this.canvas[i].temp.height = this.canvas[i].draw.height = this.strokeCanvas.height = this.mainCanvas.height;
    }

    // draw the stuff to start
    this.recompositeCanvases();

    this.mouseDown = false;

    // Bind events
    this.strokeCanvas.addEventListener('mousedown', this.mousedown_handler.bind(this), false);
    this.strokeCanvas.addEventListener('touchstart', this.mousedown_handler.bind(this), false);

    window.addEventListener('mousemove', this.mousemove_handler.bind(this), false);
    window.addEventListener('touchmove', this.mousemove_handler.bind(this), false);

    window.addEventListener('mouseup', this.mouseup_handler.bind(this), false);
    window.addEventListener('touchend', this.mouseup_handler.bind(this), false);
  }

  /**
   * On mouse down, draw a line starting fresh
   */
  mousedown_handler(e) {
    console.log(e);
    const local = this.getLocalCoords(this.mainCanvas, e);
    this.mouseDown = true;

    this.scratchLine(local.x, local.y, true);

    //if (e.cancelable) { e.preventDefault(); }
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

    this.scratchLine(local.x, local.y, false);

    //if (e.cancelable) { e.preventDefault(); }
    return false;
  }

  /**
   * On mouseup.  (Listens on window to catch out-of-canvas events.)
   */
  mouseup_handler(e) {
    if (this.mouseDown) {
      this.mouseDown = false;

      this.recompositeCanvases();

      // clear canvas
      this.strokeCanvas.width = this.strokeCanvas.width;
      this.canvas[0].draw.width = this.canvas[0].draw.width;

      //if (e.cancelable) { e.preventDefault(); }
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

    if (WP.shuffle)
      this.image = this.shuffle(this.image);

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
