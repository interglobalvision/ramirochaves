/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, WP */

// Import dependencies


// Import style


var _lazysizes = __webpack_require__(1);

var _lazysizes2 = _interopRequireDefault(_lazysizes);

var _Scratch = __webpack_require__(3);

var _Scratch2 = _interopRequireDefault(_Scratch);

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Site = function () {
  function Site() {
    _classCallCheck(this, Site);

    this.mobileThreshold = 601;

    this.$body = $('body');
    this.$cursorBrush = $('#cursor-brush');
    this.$cursorLoading = $('#cursor-loading');

    this.updateCursorPosition = this.updateCursorPosition.bind(this);

    $(window).resize(this.onResize.bind(this));

    $(document).ready(this.onReady.bind(this));
  }

  _createClass(Site, [{
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'onReady',
    value: function onReady() {
      _lazysizes2.default.init();
      this.bindMouseMove();
      this.currentId = WP.currentId;
      $('header#header').removeClass('u-hidden');
      history.replaceState({ postId: this.currentId }, null, window.location.href);
      this.bindMenuTriggers();
      this.bindProjectTriggers();
      this.bindBackButton();
    }
  }, {
    key: 'fixWidows',
    value: function fixWidows() {
      // utility class mainly for use on headines to avoid widows [single words on a new line]
      $('.js-fix-widows').each(function () {
        var string = $(this).html();
        string = string.replace(/ ([^ ]*)$/, '&nbsp;$1');
        $(this).html(string);
      });
    }
  }, {
    key: 'bindMouseMove',
    value: function bindMouseMove() {
      window.addEventListener('mousemove', this.updateCursorPosition, false);

      $('.hide-brush').hover(function () {
        $('.cursor').addClass('hide');
      }, function () {
        $('.cursor').removeClass('hide');
      });
    }
  }, {
    key: 'updateCursorPosition',
    value: function updateCursorPosition(e) {
      var $cursor = this.$body.hasClass('loading') ? this.$cursorLoading : this.$cursorBrush;
      var width = $cursor.width();
      var height = $cursor.height();
      var left = e.pageX - width / 2;
      var top = e.pageY - height / 2;

      $cursor.css({
        'left': left + 'px',
        'top': top + 'px'
      });
    }
  }, {
    key: 'bindMenuTriggers',
    value: function bindMenuTriggers() {
      var _this = this;

      $('.js-menu-trigger').on('click', function (event) {
        $('body').addClass('nav-open').removeClass('project-open');
        if ($(event.target).parent('.js-menu-trigger').hasClass('mobile-trigger')) {
          _this.pushHomeState();
        }
      });
      $('.js-menu-close').on('click', function () {
        if ($('body').hasClass('project-open')) {
          _this.closeProject();
        } else {
          $('body').removeClass('nav-open');
        }
      });
    }
  }, {
    key: 'pushHomeState',
    value: function pushHomeState() {
      history.pushState({ postId: WP.homeId }, null, WP.siteUrl);
      this.currentId = WP.homeId;
    }
  }, {
    key: 'closeProject',
    value: function closeProject() {
      $('body').removeClass('project-open');
      this.pushHomeState();
    }
  }, {
    key: 'bindProjectTriggers',
    value: function bindProjectTriggers() {
      var _this2 = this;

      $('#project-menu .menu-item a').on('click', function (event) {
        event.preventDefault();

        var postId = $(event.target).attr('data-postid');

        if (postId !== _this2.currentId) {
          _this2.loadProjectContent(postId);
        }
      });
    }
  }, {
    key: 'loadProjectContent',
    value: function loadProjectContent(postId) {
      var _this3 = this;

      var url = WP.restEndpoint + 'project?include[]=' + postId;

      $('body').addClass('loading');

      $.ajax({
        url: url,
        success: function success(data) {
          $('body').removeClass('loading');

          $('#project-title').html(data[0].title.rendered);
          $('#project-content').html(data[0].content.rendered);

          $('#project-holder').scrollTop(0);

          history.pushState({ postId: postId }, null, data[0].link);

          $('body').addClass('project-open').removeClass('nav-open');

          _this3.currentId = postId;
        },
        fail: function fail(xhr, textStatus, errorThrown) {
          $('body').removeClass('loading');

          console.error(errorThrown);
        }
      });
    }
  }, {
    key: 'bindBackButton',
    value: function bindBackButton() {
      var _this4 = this;

      $(window).bind('popstate', function (event) {
        // if the event has our history data on it, load the page fragment with AJAX
        var postId = event.originalEvent.state.postId;

        if (postId !== WP.homeId) {
          _this4.loadProjectContent(postId);
        } else {
          _this4.closeProject();
        }
      });
    }
  }]);

  return Site;
}();

new Site();
new _Scratch2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (window, factory) {
	var lazySizes = factory(window, window.document);
	window.lazySizes = lazySizes;
	if (( false ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
		module.exports = lazySizes;
	}
})(window, function l(window, document) {
	'use strict';
	/*jshint eqnull:true */

	if (!document.getElementsByClassName) {
		return;
	}

	var lazysizes, lazySizesConfig;

	var docElem = document.documentElement;

	var Date = window.Date;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	var addEventListener = window[_addEventListener];

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function hasClass(ele, cls) {
		if (!regClassCache[cls]) {
			regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function addClass(ele, cls) {
		if (!hasClass(ele, cls)) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function removeClass(ele, cls) {
		var reg;
		if (reg = hasClass(ele, cls)) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function addRemoveLoadEvents(dom, fn, add) {
		var action = add ? _addEventListener : 'removeEventListener';
		if (add) {
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function (evt) {
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function triggerEvent(elem, name, detail, noBubbles, noCancelable) {
		var event = document.createEvent('CustomEvent');

		if (!detail) {
			detail = {};
		}

		detail.instance = lazysizes;

		event.initCustomEvent(name, !noBubbles, !noCancelable, detail);

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function updatePolyfill(el, full) {
		var polyfill;
		if (!supportPicture && (polyfill = window.picturefill || lazySizesConfig.pf)) {
			polyfill({ reevaluate: true, elements: [el] });
		} else if (full && full.src) {
			el.src = full.src;
		}
	};

	var getCSS = function getCSS(elem, style) {
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function getWidth(elem, parent, width) {
		width = width || elem.offsetWidth;

		while (width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth) {
			width = parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var rAF = function () {
		var running, waiting;
		var firstFns = [];
		var secondFns = [];
		var fns = firstFns;

		var run = function run() {
			var runFns = fns;

			fns = firstFns.length ? secondFns : firstFns;

			running = true;
			waiting = false;

			while (runFns.length) {
				runFns.shift()();
			}

			running = false;
		};

		var rafBatch = function rafBatch(fn, queue) {
			if (running && !queue) {
				fn.apply(this, arguments);
			} else {
				fns.push(fn);

				if (!waiting) {
					waiting = true;
					(document.hidden ? setTimeout : requestAnimationFrame)(run);
				}
			}
		};

		rafBatch._lsFlush = run;

		return rafBatch;
	}();

	var rAFIt = function rAFIt(fn, simple) {
		return simple ? function () {
			rAF(fn);
		} : function () {
			var that = this;
			var args = arguments;
			rAF(function () {
				fn.apply(that, args);
			});
		};
	};

	var throttle = function throttle(fn) {
		var running;
		var lastTime = 0;
		var gDelay = 125;
		var rICTimeout = lazySizesConfig.ricTimeout;
		var run = function run() {
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback && lazySizesConfig.ricTimeout ? function () {
			requestIdleCallback(run, { timeout: rICTimeout });

			if (rICTimeout !== lazySizesConfig.ricTimeout) {
				rICTimeout = lazySizesConfig.ricTimeout;
			}
		} : rAFIt(function () {
			setTimeout(run);
		}, true);

		return function (isPriority) {
			var delay;

			if (isPriority = isPriority === true) {
				rICTimeout = 33;
			}

			if (running) {
				return;
			}

			running = true;

			delay = gDelay - (Date.now() - lastTime);

			if (delay < 0) {
				delay = 0;
			}

			if (isPriority || delay < 9 && requestIdleCallback) {
				idleCallback();
			} else {
				setTimeout(idleCallback, delay);
			}
		};
	};

	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
	var debounce = function debounce(func) {
		var timeout, timestamp;
		var wait = 99;
		var run = function run() {
			timeout = null;
			func();
		};
		var later = function later() {
			var last = Date.now() - timestamp;

			if (last < wait) {
				setTimeout(later, wait - last);
			} else {
				(requestIdleCallback || run)(run);
			}
		};

		return function () {
			timestamp = Date.now();

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};
	};

	(function () {
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.5,
			hFac: 0.8,
			loadMode: 2,
			loadHidden: true,
			ricTimeout: 300
		};

		lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

		for (prop in lazySizesDefaults) {
			if (!(prop in lazySizesConfig)) {
				lazySizesConfig[prop] = lazySizesDefaults[prop];
			}
		}

		window.lazySizesConfig = lazySizesConfig;

		setTimeout(function () {
			if (lazySizesConfig.init) {
				init();
			}
		});
	})();

	var loader = function () {
		var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom;

		var defaultExpand, preloadExpand, hFac;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = 'onscroll' in window && !/glebot/.test(navigator.userAgent);

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = -1;

		var resetPreloading = function resetPreloading(e) {
			isLoading--;
			if (e && e.target) {
				addRemoveLoadEvents(e.target, resetPreloading);
			}

			if (!e || isLoading < 0 || !e.target) {
				isLoading = 0;
			}
		};

		var isNestedVisible = function isNestedVisible(elem, elemExpand) {
			var outerRect;
			var parent = elem;
			var visible = getCSS(document.body, 'visibility') == 'hidden' || getCSS(elem, 'visibility') != 'hidden';

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
				visible = (getCSS(parent, 'opacity') || 1) > 0;

				if (visible && getCSS(parent, 'overflow') != 'visible') {
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
				}
			}

			return visible;
		};

		var checkElements = function checkElements() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;

			var lazyloadElems = lazysizes.elements;

			if ((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {

				i = 0;

				lowRuns++;

				if (preloadExpand == null) {
					if (!('expand' in lazySizesConfig)) {
						lazySizesConfig.expand = docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370;
					}

					defaultExpand = lazySizesConfig.expand;
					preloadExpand = defaultExpand * lazySizesConfig.expFactor;
				}

				if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
					currentExpand = preloadExpand;
					lowRuns = 0;
				} else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
					currentExpand = defaultExpand;
				} else {
					currentExpand = shrinkExpand;
				}

				for (; i < eLlen; i++) {

					if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
						continue;
					}

					if (!supportScroll) {
						unveilElement(lazyloadElems[i]);continue;
					}

					if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
						elemExpand = currentExpand;
					}

					if (beforeExpandVal !== elemExpand) {
						eLvW = innerWidth + elemExpand * hFac;
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesConfig.loadHidden || getCSS(lazyloadElems[i], 'visibility') != 'hidden') && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if (isLoading > 9) {
							break;
						}
					} else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesConfig.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto'))) {
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if (autoLoadElem && !loadedSomething) {
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function switchLoadingClass(e) {
			addClass(e.target, lazySizesConfig.loadedClass);
			removeClass(e.target, lazySizesConfig.loadingClass);
			addRemoveLoadEvents(e.target, rafSwitchLoadingClass);
			triggerEvent(e.target, 'lazyloaded');
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function rafSwitchLoadingClass(e) {
			rafedSwitchLoadingClass({ target: e.target });
		};

		var changeIframeSrc = function changeIframeSrc(elem, src) {
			try {
				elem.contentWindow.location.replace(src);
			} catch (e) {
				elem.src = src;
			}
		};

		var handleSources = function handleSources(source) {
			var customMedia;

			var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

			if (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) {
				source.setAttribute('media', customMedia);
			}

			if (sourceSrcset) {
				source.setAttribute('srcset', sourceSrcset);
			}
		};

		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg) {
			var src, srcset, parent, isPicture, event, firesLoad;

			if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {

				if (sizes) {
					if (isAuto) {
						addClass(elem, lazySizesConfig.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
				src = elem[_getAttribute](lazySizesConfig.srcAttr);

				if (isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || 'src' in elem && (srcset || src || isPicture);

				event = { target: elem };

				if (firesLoad) {
					addRemoveLoadEvents(elem, resetPreloading, true);
					clearTimeout(resetPreloadingTimer);
					resetPreloadingTimer = setTimeout(resetPreloading, 2500);

					addClass(elem, lazySizesConfig.loadingClass);
					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
				}

				if (isPicture) {
					forEach.call(parent.getElementsByTagName('source'), handleSources);
				}

				if (srcset) {
					elem.setAttribute('srcset', srcset);
				} else if (src && !isPicture) {
					if (regIframe.test(elem.nodeName)) {
						changeIframeSrc(elem, src);
					} else {
						elem.src = src;
					}
				}

				if (isImg && (srcset || isPicture)) {
					updatePolyfill(elem, { src: src });
				}
			}

			if (elem._lazyRace) {
				delete elem._lazyRace;
			}
			removeClass(elem, lazySizesConfig.lazyClass);

			rAF(function () {
				if (!firesLoad || elem.complete && elem.naturalWidth > 1) {
					if (firesLoad) {
						resetPreloading(event);
					} else {
						isLoading--;
					}
					switchLoadingClass(event);
				}
			}, true);
		});

		var unveilElement = function unveilElement(elem) {
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass) && hasClass(elem, lazySizesConfig.lazyClass)) {
				return;
			}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if (isAuto) {
				autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var onload = function onload() {
			if (isCompleted) {
				return;
			}
			if (Date.now() - started < 999) {
				setTimeout(onload, 999);
				return;
			}
			var afterScroll = debounce(function () {
				lazySizesConfig.loadMode = 3;
				throttledCheckElements();
			});

			isCompleted = true;

			lazySizesConfig.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', function () {
				if (lazySizesConfig.loadMode == 3) {
					lazySizesConfig.loadMode = 2;
				}
				afterScroll();
			}, true);
		};

		return {
			_: function _() {
				started = Date.now();

				lazysizes.elements = document.getElementsByClassName(lazySizesConfig.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);
				hFac = lazySizesConfig.hFac;

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				if (window.MutationObserver) {
					new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function (name) {
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if (/d$|^c/.test(document.readyState)) {
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				if (lazysizes.elements.length) {
					checkElements();
					rAF._lsFlush();
				} else {
					throttledCheckElements();
				}
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement
		};
	}();

	var autoSizer = function () {
		var autosizesElems;

		var sizeElement = rAFIt(function (elem, parent, event, width) {
			var sources, i, len;
			elem._lazysizesWidth = width;
			width += 'px';

			elem.setAttribute('sizes', width);

			if (regPicture.test(parent.nodeName || '')) {
				sources = parent.getElementsByTagName('source');
				for (i = 0, len = sources.length; i < len; i++) {
					sources[i].setAttribute('sizes', width);
				}
			}

			if (!event.detail.dataAttr) {
				updatePolyfill(elem, event.detail);
			}
		});
		var getSizeElement = function getSizeElement(elem, dataAttr, width) {
			var event;
			var parent = elem.parentNode;

			if (parent) {
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', { width: width, dataAttr: !!dataAttr });

				if (!event.defaultPrevented) {
					width = event.detail.width;

					if (width && width !== elem._lazysizesWidth) {
						sizeElement(elem, parent, event, width);
					}
				}
			}
		};

		var updateElementsSizes = function updateElementsSizes() {
			var i;
			var len = autosizesElems.length;
			if (len) {
				i = 0;

				for (; i < len; i++) {
					getSizeElement(autosizesElems[i]);
				}
			}
		};

		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

		return {
			_: function _() {
				autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	}();

	var init = function init() {
		if (!init.i) {
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	lazysizes = {
		cfg: lazySizesConfig,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth,
		rAF: rAF
	};

	return lazysizes;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, WP */

/**
 * A great deal of this code is thanks to a
 * public Codepen by Curt Husting.
 * Thanks Curt!!
 *
 * https://codepen.io/curthusting/pen/fkCzh
 * https://github.com/curthusting
 */

var _shake = __webpack_require__(4);

var _shake2 = _interopRequireDefault(_shake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scratch = function () {
  function Scratch() {
    _classCallCheck(this, Scratch);

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

  _createClass(Scratch, [{
    key: 'onResize',
    value: function onResize() {
      this.windowWidth = $(window).width();
      this.windowHeight = $(window).height();

      this.setBrushSize();
      this.setupCanvases();
    }
  }, {
    key: 'onReady',
    value: function onReady() {
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

  }, {
    key: 'shuffle',
    value: function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue = void 0,
          randomIndex = void 0;

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

  }, {
    key: 'getLocalCoords',
    value: function getLocalCoords(elem, ev) {
      var ox = 0,
          oy = 0;
      var first = void 0;
      var pageX = void 0,
          pageY = void 0;

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

  }, {
    key: 'recompositeCanvases',
    value: function recompositeCanvases() {
      var mainctx = this.mainCanvas.getContext('2d');

      for (var i = 0; i < this.canvas.length; i++) {
        var tempctx = this.canvas[i].temp.getContext('2d');
        var drawctxNext = this.canvas[i + 1] !== undefined ? this.canvas[i + 1].draw.getContext('2d') : null;

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
        var img = this.images[i].img;

        // Calculate ratio to scale image to canvas
        var widthRatio = void 0,
            heightRatio = void 0,
            ratio = 1;

        if (img.width > this.mainCanvas.width || img.height > this.mainCanvas.height) {
          widthRatio = this.mainCanvas.width / img.width;
          heightRatio = this.mainCanvas.height / img.height;
          ratio = Math.min(widthRatio, heightRatio);
        }

        // Calculate centered image position
        var centerX = (this.mainCanvas.width - img.width * ratio) / 2;
        var centerY = (this.mainCanvas.height - img.height * ratio) / 2;

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

  }, {
    key: 'scratchLine',
    value: function scratchLine(x, y, fresh) {
      var drawctx = this.canvas[0].draw.getContext('2d');
      var strokectx = this.strokeCanvas.getContext('2d');

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

        drawctx.moveTo(x + 0.01 + 1, y);
        strokectx.moveTo(x + 0.01 + 1, y);
      }

      drawctx.lineTo(x + 1, y);
      strokectx.lineTo(x + 1, y);

      drawctx.stroke();
      strokectx.stroke();
    }

    /**
    * Set up the canvases
    */

  }, {
    key: 'setupCanvases',
    value: function setupCanvases() {
      this.mainCanvas = document.getElementById('main-canvas');
      this.strokeCanvas = document.getElementById('stroke-canvas');

      this.mainCanvas.width = this.windowWidth;
      this.mainCanvas.height = this.windowHeight;

      this.canvas = [];

      for (var i = 0; i < this.images.length; i++) {
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

  }, {
    key: 'mousedown_handler',
    value: function mousedown_handler(e) {
      var local = this.getLocalCoords(this.mainCanvas, e);
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

  }, {
    key: 'mousemove_handler',
    value: function mousemove_handler(e) {
      if (!this.mouseDown) {
        return true;
      }

      var local = this.getLocalCoords(this.mainCanvas, e);

      this.scratchLine(local.x, local.y, false);

      e.preventDefault();
      return false;
    }

    /**
     * On mouseup.  (Listens on window to catch out-of-canvas events.)
     */

  }, {
    key: 'mouseup_handler',
    value: function mouseup_handler(e) {
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

  }, {
    key: 'loadingComplete',
    value: function loadingComplete() {
      // Show the canvas or something
      $('body').removeClass('loading');
    }

    /**
     * Handle loading of needed image resources
     */

  }, {
    key: 'loadImages',
    value: function loadImages() {
      var _this = this;

      var loadCount = 0;
      var loadTotal = this.images.length;

      if (WP.shuffle) {
        this.images = this.shuffle(this.images);
      }

      var imageLoaded = function () {
        loadCount++;

        if (loadCount >= loadTotal) {
          // All images loaded!
          _this.setupCanvases();
          _this.bindShake();
          _this.loadingComplete();
        }
      }.bind(this);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var image = _step.value;

          // Create img elements for each image
          // and save it on the object
          var size = this.getBestImageSize(image.src);
          image.img = document.createElement('img'); // image is global
          image.img.addEventListener('load', imageLoaded, false);
          image.img.src = image.src[size][0];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Find best image size for viewport
     */

  }, {
    key: 'getBestImageSize',
    value: function getBestImageSize(sizes) {
      var bestSize = false;

      for (var size in sizes) {
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
  }, {
    key: 'setBrushSize',
    value: function setBrushSize() {
      var viewportMax = 1920;
      var viewportMin = 320;
      var brushMax = 100;
      var brushMin = 40;

      var viewportWidth = this.windowWidth > viewportMax ? viewportMax : this.windowWidth;
      this.brushSize = (viewportWidth - viewportMin) * (brushMax - brushMin) / (viewportMax - viewportMin) + brushMin;

      this.$brush.css({
        'width': this.brushSize + 'px',
        'height': this.brushSize + 'px'
      });
    }
  }, {
    key: 'bindShake',
    value: function bindShake() {
      var shakeEvent = new _shake2.default({
        handler: this.handleShake
      });

      shakeEvent.start();
    }
  }, {
    key: 'handleShake',
    value: function handleShake() {
      this.images = this.shuffle(this.images);
      this.setupCanvases();
    }
  }]);

  return Scratch;
}();

exports.default = Scratch;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/*
 * Author: Alex Gibson
 * https://github.com/alexgibson/shake.js
 *
 * Fork Author : Alexis Bouhet
 * https://github.com/zouloux/shake.js
 *
 * License: MIT license
 */

(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return factory(global, global.document);
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global, global.document);
    } else {
        global.Shake = factory(global, global.document);
    }
})(typeof window !== 'undefined' ? window : undefined, function (window, document) {

    'use strict';

    function Shake(options) {

        if (options == null || !('handler' in options)) throw new Error("Shake.js // Options needs an handler property.");

        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;

        this.options = {
            threshold: 15, //default velocity threshold for shake to register
            timeout: 1000 //default interval between events
        };

        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.options[i] = options[i];
            }
        }

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity;
        var currentTime;
        var timeDifference;
        var deltaX = 0;
        var deltaY = 0;
        var deltaZ = 0;

        if (this.lastX === null && this.lastY === null && this.lastZ === null) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (deltaX > this.options.threshold && deltaY > this.options.threshold || deltaX > this.options.threshold && deltaZ > this.options.threshold || deltaY > this.options.threshold && deltaZ > this.options.threshold) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > this.options.timeout) {
                this.options.handler();
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;
    };

    //event handler
    Shake.prototype.handleEvent = function (e) {
        if (typeof this[e.type] === 'function') {
            return this[e.type](e);
        }
    };

    return Shake;
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map