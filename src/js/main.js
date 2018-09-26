/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document */

// Import dependencies
import lazySizes from 'lazysizes';

import Scratch from './Scratch';

// Import style
import '../styl/site.styl';

class Site {
  constructor() {
    this.mobileThreshold = 601;

    this.$body = $('body');
    this.$cursorBrush = $('#cursor-brush');
    this.$cursorLoading = $('#cursor-loading');

    this.updateCursorPosition = this.updateCursorPosition.bind(this);

    $(window).resize(this.onResize.bind(this));

    $(document).ready(this.onReady.bind(this));

  }

  onResize() {

  }

  onReady() {
    lazySizes.init();
    this.bindMouseMove();

  }

  fixWidows() {
    // utility class mainly for use on headines to avoid widows [single words on a new line]
    $('.js-fix-widows').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
    });
  }

  bindMouseMove() {
    window.addEventListener('mousemove', this.updateCursorPosition, false);

    $('footer').hover(
      function() {
        $('.cursor').hide();
      },
      function() {
        $('.cursor').show();
      }
    );
  }

  updateCursorPosition(e) {
    const $cursor = this.$body.hasClass('loading') ? this.$cursorLoading : this.$cursorBrush;
    const width = $cursor.width();
    const height = $cursor.height();
    const left = e.pageX - (width / 2);
    const top = e.pageY - (height / 2);

    $cursor.css({
      'left': left + 'px',
      'top': top + 'px'
    });
  }

}

new Site();
new Scratch();
