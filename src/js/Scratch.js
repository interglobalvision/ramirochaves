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
      this.images = WP.images;

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
  * Set up the main canvas and listeners
  */
  setupCanvases() {
    console.log('setupCanvases');
  }

  /**
  * Set up the DOM when loading is complete
  */
  loadingComplete() {
    // Show the canvas or something
  }

  /**
   * Handle loading of needed image resources
   */
  loadImages() {
    let loadCount = 0;
    let loadTotal = this.images.length;

    const imageLoaded = () => {
      loadCount++;

      if (loadCount >= loadTotal) {
        // All images loaded!
        this.setupCanvases();
        this.loadingComplete();
      }
    };

    for (let image of this.images) {
      // Create img elements for each image
      // and save it on the object
      image.img = document.createElement('img'); // image is global
      image.img.addEventListener('load', imageLoaded.bind(this), false);
      image.img.src = image.url;
    }
  }

}

export default Scratch;
