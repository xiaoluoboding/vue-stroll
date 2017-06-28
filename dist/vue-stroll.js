(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-stroll"] = factory();
	else
		root["vue-stroll"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['el', 'effect', 'collection'],

  mounted: function mounted() {
    window.requestAnimFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    }();

    var Stroll = {
      bind: function bind(element) {
        var items = Array.prototype.slice.apply(element.children);

        // caching some heights so we don't need to go back to the DOM so much
        var listHeight = element.offsetHeight;

        // one loop to get the offsets from the DOM
        for (var i = 0, len = items.length; i < len; i++) {
          items[i]._offsetTop = items[i].offsetTop;
          items[i]._offsetHeight = items[i].offsetHeight;
        }

        return function () {
          (function animloop() {
            window.requestAnimFrame(animloop);
            update();
          })();

          // Apply past/future classes to list items outside of the viewport
          function update() {
            var scrollTop = element.pageYOffset || element.scrollTop,
                scrollBottom = scrollTop + listHeight;

            // Quit if nothing changed.
            if (scrollTop == element.lastTop) return;

            element.lastTop = scrollTop;

            // One loop to make our changes to the DOM
            for (var i = 0, len = items.length; i < len; i++) {
              var item = items[i];

              // Above list viewport
              if (item._offsetTop + item._offsetHeight < scrollTop) {
                item.classList.add('past');
              } else if (item._offsetTop > scrollBottom) {
                item.classList.add('future');
              } else {
                item.classList.remove('past');
                item.classList.remove('future');
              }
            }
          }
        }();
      }
    };

    var lists = document.querySelectorAll(this.el);

    for (var i = 0; i < lists.length; i++) {
      Stroll.bind(lists[i]);
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "vue-stroll",
    class: _vm.effect,
    attrs: {
      "id": "vue-stroll"
    }
  }, _vm._l((_vm.collection), function(col) {
    return _c('li', {
      attrs: {
        "track-by": "$index"
      }
    }, [_c('span', {
      domProps: {
        "textContent": _vm._s(col)
      }
    })])
  }))
},staticRenderFns: []}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("5c1e180c", content, true);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/*!\n * stroll.js 1.2 - CSS scroll effects\n * http://lab.hakim.se/scroll-effects\n * MIT licensed\n *\n * Copyright (C) 2012 Hakim El Hattab, http://hakim.se\n */.cards{-webkit-perspective:300px;-ms-perspective:300px;-o-perspective:300px;perspective:300px;-webkit-perspective-origin:50% 50%;-ms-perspective-origin:50% 50%;-o-perspective-origin:50% 50%;perspective-origin:50% 50%}.cards li{transition:all .6s ease;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.cards li.past{-webkit-transform:translate3d(0,-100px,-100px) rotateX(-90deg);transform:translate3d(0,-100px,-100px) rotateX(-90deg)}.cards li.future{-webkit-transform:translate3d(0,100px,-100px) rotateX(90deg);transform:translate3d(0,100px,-100px) rotateX(90deg)}.grow li{transition:all .6s ease;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}.grow li.future,.grow li.past{-webkit-transform:scale(.01);transform:scale(.01)}.flip{-webkit-perspective:400px;-ms-perspective:400px;-o-perspective:400px;perspective:400px;-webkit-perspective-origin:50% 50%;-ms-perspective-origin:50% 50%;-o-perspective-origin:50% 50%;perspective-origin:50% 50%}.flip li{transition:all .6s ease,opacity .3s ease;-webkit-transform-origin:0 0;transform-origin:0 0}.flip li.past{opacity:0;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:rotateX(80deg);transform:rotateX(80deg)}.flip li.future{opacity:0;-webkit-transform:rotateX(-80deg);transform:rotateX(-80deg)}.fly{-webkit-perspective:400px;-ms-perspective:400px;-o-perspective:400px;perspective:400px;-webkit-perspective-origin:50% 50%;-ms-perspective-origin:50% 50%;-o-perspective-origin:50% 50%;perspective-origin:50% 50%}.fly li{transition:all .6s ease,opacity .3s ease;-webkit-transform-origin:50% 50% -50px;transform-origin:50% 50% -50px}.fly li.past{opacity:0;-webkit-transform:rotateX(180deg);transform:rotateX(180deg)}.fly li.future{opacity:0;-webkit-transform:rotateX(-180deg);transform:rotateX(-180deg)}.fly-simplified{-webkit-perspective:300px;-ms-perspective:300px;-o-perspective:300px;perspective:300px;-webkit-perspective-origin:50% 50%;-ms-perspective-origin:50% 50%;-o-perspective-origin:50% 50%;perspective-origin:50% 50%}.fly-simplified li{transition:all .6s ease;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.fly-simplified li.past{-webkit-transform:translate3d(0,-100px,-100px) rotateX(90deg);transform:translate3d(0,-100px,-100px) rotateX(90deg)}.fly-simplified li.future{-webkit-transform:translate3d(0,100px,-100px) rotateX(-90deg);transform:translate3d(0,100px,-100px) rotateX(-90deg)}.fly-reverse{-webkit-perspective:400px;-ms-perspective:400px;-o-perspective:400px;perspective:400px;-webkit-perspective-origin:50% 50%;-ms-perspective-origin:50% 50%;-o-perspective-origin:50% 50%;perspective-origin:50% 50%}.fly-reverse li{transition:all .6s ease,opacity .3s ease;-webkit-transform-origin:50% 50% -50px;transform-origin:50% 50% -50px}.fly-reverse li.past{opacity:0;-webkit-transform:rotateX(-180deg);transform:rotateX(-180deg)}.fly-reverse li.future{opacity:0;-webkit-transform:rotateX(180deg);transform:rotateX(180deg)}.skew{-webkit-perspective:600px;-ms-perspective:600px;-o-perspective:600px;perspective:600px;-webkit-perspective-origin:0 50%;-ms-perspective-origin:0 50%;-o-perspective-origin:0 50%;perspective-origin:0 50%}.skew li{transition:all .6s ease;-webkit-transform-origin:0 0;transform-origin:0 0}.skew li.past{-webkit-transform:skewY(30deg);transform:skewY(30deg)}.skew li.future{z-index:0;-webkit-transform:skewY(-30deg);transform:skewY(-30deg)}.helix{-webkit-perspective:600px;-ms-perspective:600px;-o-perspective:600px;perspective:600px;-webkit-perspective-origin:50% 50%;-ms-perspective-origin:50% 50%;-o-perspective-origin:50% 50%;perspective-origin:50% 50%}.helix li{transition:all .6s ease,opacity .2s ease;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}.helix li.past{opacity:0;-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}.helix li.future{opacity:0;-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.wave li{transition:all .6s cubic-bezier(.26,.86,.44,.985)}.wave li.future,.wave li.past{-webkit-transform:translateX(-70%);transform:translateX(-70%)}.fan li{transition:all .6s cubic-bezier(.39,.575,.565,1);-webkit-transform-origin:0 0;transform-origin:0 0}.fan li.past{-webkit-transform:rotate(-60deg);transform:rotate(-60deg)}.fan li.future{-webkit-transform:rotate(70deg);transform:rotate(70deg)}.tilt{-webkit-perspective:800px;-ms-perspective:800px;-o-perspective:800px;perspective:800px;-webkit-perspective-origin:50% 50%;-ms-perspective-origin:50% 50%;-o-perspective-origin:50% 50%;perspective-origin:50% 50%}.tilt li{position:relative;transition:all 1s cubic-bezier(.26,.86,.44,.985),opacity .3s ease}.tilt li.past{opacity:0;-webkit-transform:translateY(100%) translateZ(-200px);transform:translateY(100%) translateZ(-200px)}.tilt li.future{opacity:0;-webkit-transform:translateY(-100%) translateZ(-200px);transform:translateY(-100%) translateZ(-200px)}.curl{-webkit-perspective:600px;-ms-perspective:600px;-o-perspective:600px;perspective:600px;-webkit-perspective-origin:0 50%;-ms-perspective-origin:0 50%;-o-perspective-origin:0 50%;perspective-origin:0 50%}.curl li{transition:all .6s ease,opacity .2s ease;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.curl li.future,.curl li.past{opacity:0;-webkit-transform:rotateY(90deg);transform:rotateY(90deg)}.papercut{-webkit-perspective:600px;-ms-perspective:600px;-o-perspective:600px;perspective:600px;-webkit-perspective-origin:0 0;-ms-perspective-origin:0 0;-o-perspective-origin:0 0;perspective-origin:0 0}.papercut li{transition:all .6s ease;-webkit-transform-origin:0 0;transform-origin:0 0}.papercut li.past{-webkit-transform:skewY(-30deg);transform:skewY(-30deg)}.papercut li.future{-webkit-transform:skewY(30deg);transform:skewY(30deg)}.zipper li{transition:all .6s cubic-bezier(.39,.575,.565,1);-webkit-transform-origin:50% 0;transform-origin:50% 0}.zipper li.future:nth-child(odd),.zipper li.past:nth-child(odd){-webkit-transform:translateX(80%);transform:translateX(80%)}.zipper li.future:nth-child(2n),.zipper li.past:nth-child(2n){-webkit-transform:translateX(-80%);transform:translateX(-80%)}.fade li{transition:opacity .35s ease-in-out}.fade li.future,.fade li.past{opacity:0}.twirl{-webkit-perspective:400px;-ms-perspective:400px;-o-perspective:400px;perspective:400px;-webkit-perspective-origin:50% 50%;-ms-perspective-origin:50% 50%;-o-perspective-origin:50% 50%;perspective-origin:50% 50%}.twirl li{transition:all .6s ease,opacity .2s ease;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}.twirl li.past{opacity:0;-webkit-transform:rotate3d(80,-70,10,180deg);transform:rotate3d(80,70,10,180deg)}.twirl li.future{opacity:0;-webkit-transform:rotate3d(80,70,10,-180deg);transform:rotate3d(80,70,10,-180deg)}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports
exports.i(__webpack_require__(5), "");

// module
exports.push([module.i, "ul[data-v-81f88c88]{position:relative;width:200px;height:320px;overflow-x:hidden;overflow-y:scroll;padding:0;margin:0}ul li[data-v-81f88c88]{list-style:none;position:relative;padding:6px;background:#fff;color:#252525;font-size:16px;z-index:2}ul li[data-v-81f88c88]:nth-child(odd){background:#eee}@media (max-width:750px){ul[data-v-81f88c88]{min-width:216px;height:320px}}@media (max-width:480px){ul[data-v-81f88c88]{min-width:280px;height:320px}}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(4)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(3),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-81f88c88",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(9)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});