/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, WP */

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

    if (window.location.search === '?v2') {
      this.currentId = WP.currentId;
      $('header#header').removeClass('u-hidden');
      history.replaceState({ postId: this.currentId }, null, window.location.href);
      this.bindMenuTriggers();
      this.bindProjectTriggers();
      this.bindBackButton();
    }
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

    $('.hide-brush').hover(
      function() {
        $('.cursor').addClass('hide');
      },
      function() {
        $('.cursor').removeClass('hide');
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

  bindMenuTriggers() {
    $('.js-menu-trigger').on('click', (event) => {
      $('body').addClass('nav-open').removeClass('project-open');
      console.log($(event.target));
      if ($(event.target).parent('.js-menu-trigger').hasClass('mobile-trigger')) {
        this.pushHomeState();
      }
    });
    $('.js-menu-close').on('click', () => {
      if ($('body').hasClass('project-open')) {
        this.closeProject();
      } else {
        $('body').removeClass('nav-open');
      }
    });
  }

  pushHomeState() {
    history.pushState({ postId: WP.homeId },null,WP.siteUrl);
    this.currentId = WP.homeId;
  }

  closeProject() {
    $('body').removeClass('project-open');
    this.pushHomeState();
  }

  bindProjectTriggers() {
    $('#menu-projects .menu-item a').on('click', (event) => {
        event.preventDefault();

        const postId = $(event.target).attr('data-postid');

        if (postId !== this.currentId) {
          this.loadProjectContent(postId);
        }
    });
  }

  loadProjectContent(postId) {
    const url = WP.restEndpoint + 'project?include[]=' + postId;

    $('body').addClass('loading');

    $.ajax({
      url,
      success: (data) => {
        $('body').removeClass('loading');

        $('#project-title').html(data[0].title.rendered);
        $('#project-content').html(data[0].content.rendered);

        history.pushState({ postId: postId },null,data[0].link);

        $('body').addClass('project-open').removeClass('nav-open');

        this.currentId = postId;

      },
      fail: (xhr, textStatus, errorThrown) => {
        $('body').removeClass('loading');

        console.error(errorThrown);
      }
    });
  }

  bindBackButton() {
    $(window).bind('popstate', (event) => {
      // if the event has our history data on it, load the page fragment with AJAX
      const { postId } = event.originalEvent.state;
      if (postId !== WP.homeId) {
        this.loadProjectContent(postId);
      } else {
        this.closeProject();
      }
    });
  }

}

new Site();
new Scratch();
