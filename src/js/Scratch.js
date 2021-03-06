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

import Shake from '@zouloux/shake';

class Scratch {
  constructor() {
    this.mobileThreshold = 601;

    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();

    this.mousedown_handler = this.mousedown_handler.bind(this);
    this.mousemove_handler = this.mousemove_handler.bind(this);
    this.mouseup_handler = this.mouseup_handler.bind(this);
    this.handleShake = this.handleShake.bind(this);

    this.$brush = $('#cursor-brush');

    $(window).resize(this.onResize.bind(this));

    $(document).ready(this.onReady.bind(this));
  }

  onResize() {
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();

    this.setBrushSize();
    this.setupCanvases();
  }

  onReady() {
    if (WP.images !== undefined) {
      this.images = WP.images;

      // Init
      this.setBrushSize();
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

      // The image
      const img = this.images[i].img;

      // Calculate ratio to scale image to canvas
      let widthRatio, heightRatio, ratio = 1;

      if (img.width > this.mainCanvas.width || img.height > this.mainCanvas.height) {
        widthRatio = this.mainCanvas.width / img.width;
        heightRatio = this.mainCanvas.height / img.height;
        ratio  = Math.min(widthRatio, heightRatio);
      }

      // Calculate centered image position
      const centerX = ( this.mainCanvas.width - img.width * ratio ) / 2;
      const centerY = ( this.mainCanvas.height - img.height * ratio ) / 2;

      // Stamp image[i] to [i].temp (source-atop)
      tempctx.globalCompositeOperation = 'source-atop';
      tempctx.drawImage(img, 0, 0, img.width, img.height, centerX, centerY, img.width * ratio, img.height * ratio);

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

    drawctx.lineWidth = strokectx.lineWidth = this.brushSize;
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

    this.mainCanvas.width = this.windowWidth;
    this.mainCanvas.height = this.windowHeight;

    this.canvas = [];

    for (let i = 0; i < this.images.length; i++) {
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
    this.strokeCanvas.addEventListener('mousedown', this.mousedown_handler, false);
    this.strokeCanvas.addEventListener('touchstart', this.mousedown_handler, false);

    this.strokeCanvas.addEventListener('mousemove', this.mousemove_handler, false);
    this.strokeCanvas.addEventListener('touchmove', this.mousemove_handler, false);

    this.strokeCanvas.addEventListener('mouseup', this.mouseup_handler, false);
    this.strokeCanvas.addEventListener('touchend', this.mouseup_handler, false);
  }

  /**
   * On mouse down, draw a line starting fresh
   */
  mousedown_handler(e) {
    const local = this.getLocalCoords(this.mainCanvas, e);
    this.mouseDown = true;

    this.scratchLine(local.x, local.y, true);

    e.preventDefault();
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

    e.preventDefault();
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

      e.preventDefault();
      return false;
    }

    return true;
  }

  /**
  * Set up the DOM when loading is complete
  */
  loadingComplete() {
    // Show the canvas or something
    $('body').removeClass('loading');
  }

  /**
   * Handle loading of needed image resources
   */
  loadImages() {
    let loadCount = 0;
    let loadTotal = this.images.length;

    if (WP.shuffle) {
      this.images = this.shuffle(this.images);
    }

    const imageLoaded = (() => {
      loadCount++;

      if (loadCount >= loadTotal) {
        // All images loaded!
        this.setupCanvases();
        this.bindShake();
        this.loadingComplete();
      }
    }).bind(this);

    for (let image of this.images) {
      // Create img elements for each image
      // and save it on the object
      const size = this.getBestImageSize(image.src);
      image.img = document.createElement('img'); // image is global
      image.img.addEventListener('load', imageLoaded, false);
      image.img.src = image.src[size][0];
    }
  }

  /**
   * Find best image size for viewport
   */
  getBestImageSize(sizes) {
    let bestSize = false;

    for (let size in sizes) {
      if (sizes[size][1] >= this.windowWidth) {
        bestSize = size;
        break;
      }
    }

    if (!bestSize) {
      // Get last key in sizes object
      bestSize = Object.keys(sizes)[Object.keys(sizes).length - 1];
    }

    return bestSize;
  }

  setBrushSize() {
    const viewportMax = 1920;
    const viewportMin = 320;
    const brushMax = 100;
    const brushMin = 40;

    const viewportWidth = this.windowWidth > viewportMax ? viewportMax : this.windowWidth;
    this.brushSize = (((viewportWidth - viewportMin) * (brushMax - brushMin)) / (viewportMax - viewportMin)) + brushMin;

    this.$brush.css({
      'width': this.brushSize + 'px',
      'height': this.brushSize + 'px'
    });
  }

  bindShake() {
    const shakeEvent = new Shake({
      handler: this.handleShake
    });

    shakeEvent.start();
  }

  handleShake() {
    this.images = this.shuffle(this.images);
    this.setupCanvases();
  }

}

export default Scratch;
