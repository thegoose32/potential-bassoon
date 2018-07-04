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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/fbjs/lib/EventListener.js":
/*!************************************************!*\
  !*** ./node_modules/fbjs/lib/EventListener.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var emptyFunction = __webpack_require__(/*! ./emptyFunction */ "./node_modules/fbjs/lib/emptyFunction.js");

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (false) {}
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;

/***/ }),

/***/ "./node_modules/fbjs/lib/ExecutionEnvironment.js":
/*!*******************************************************!*\
  !*** ./node_modules/fbjs/lib/ExecutionEnvironment.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),

/***/ "./node_modules/fbjs/lib/containsNode.js":
/*!***********************************************!*\
  !*** ./node_modules/fbjs/lib/containsNode.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(/*! ./isTextNode */ "./node_modules/fbjs/lib/isTextNode.js");

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),

/***/ "./node_modules/fbjs/lib/emptyFunction.js":
/*!************************************************!*\
  !*** ./node_modules/fbjs/lib/emptyFunction.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "./node_modules/fbjs/lib/emptyObject.js":
/*!**********************************************!*\
  !*** ./node_modules/fbjs/lib/emptyObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {}

module.exports = emptyObject;

/***/ }),

/***/ "./node_modules/fbjs/lib/focusNode.js":
/*!********************************************!*\
  !*** ./node_modules/fbjs/lib/focusNode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),

/***/ "./node_modules/fbjs/lib/getActiveElement.js":
/*!***************************************************!*\
  !*** ./node_modules/fbjs/lib/getActiveElement.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),

/***/ "./node_modules/fbjs/lib/invariant.js":
/*!********************************************!*\
  !*** ./node_modules/fbjs/lib/invariant.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "./node_modules/fbjs/lib/isNode.js":
/*!*****************************************!*\
  !*** ./node_modules/fbjs/lib/isNode.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),

/***/ "./node_modules/fbjs/lib/isTextNode.js":
/*!*********************************************!*\
  !*** ./node_modules/fbjs/lib/isTextNode.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(/*! ./isNode */ "./node_modules/fbjs/lib/isNode.js");

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),

/***/ "./node_modules/fbjs/lib/shallowEqual.js":
/*!***********************************************!*\
  !*** ./node_modules/fbjs/lib/shallowEqual.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),

/***/ "./node_modules/math.js/index.js":
/*!***************************************!*\
  !*** ./node_modules/math.js/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports= __webpack_require__(/*! ./lib */ "./node_modules/math.js/lib/index.js");


/***/ }),

/***/ "./node_modules/math.js/lib/arithmetic/index.js":
/*!******************************************************!*\
  !*** ./node_modules/math.js/lib/arithmetic/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {

    ceil: function(val) {
        return Math.ceil(val / 10) * 10;
    },

    round: function(n) {
        return Math.round(n);
    },

    fround: function(n) {
        return Math.fround(n)
    },

    /**
     * Returns the largest integer less than or equal to the given number.
     * @param n
     * @returns {number}
     */
    floor: function(n) {
        return Math.floor(n);
    },

    sign: function(n) {
        return Math.sign(n);
    },

    abs: function(n) {
        return Math.abs(n)
    },

    imul: function(a, b) {
        return Math.imul(a, b);
    },

    pow: function(base, exp) {
        return Math.pow(base, exp);
    },

    square: function(val) {
        return val * val;
    },

    cube: function(val) {
        return val * val * val;
    },

    sqrt: function(n) {
        return Math.sqrt(n);
    },

    cbrt: function (n) {
        return Math.cbrt(n);
    },

    exp: function (n) {
        return Math.exp(n);
    },

    expm1: function(n) {
        return Math.expm1(n);
    },

    trunc: function(n) {
        return Math.trunc(n);
    },

    greatestCommonDivisor: function gcd(x, y) {
        var remainder = x % y;
        if (remainder === 0) {
            return y;
        }

        return gcd(y, remainder);
    },

    log: function (n) {
        return Math.log(n);
    },

    log2: function (n) {
        return Math.log2(n);
    },

    log10: function (n) {
        return Math.log10(n);
    },

    log1p: function(n) {
        return Math.log1p(n);
    },

    hypot: function(...arr) {
        return Math.hypot(...arr);
    }

};


/***/ }),

/***/ "./node_modules/math.js/lib/constants.js":
/*!***********************************************!*\
  !*** ./node_modules/math.js/lib/constants.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A constants class to maintain all the fixed variables.
 * @type {Object}
 */
module.exports = Object.freeze({
    /**
     * Built-in constants.
     */
    PI: Math.PI,
    E: Math.E,
    LN10: Math.LN10,
    LN2: Math.LN2,
    LOG10E: Math.LOG10E,
    LOG2E: Math.LOG2E,
    SQRT1_2: Math.SQRT1_2,
    SQRT2: Math.SQRT2,


    /**
     * Unit converter constants.
     */
    FEET_TO_INCHES_FACTOR:  12,
    FEET_TO_METERS_FACTOR: 0.3048,
    FEET_TO_MILES_FACTOR: 1 / 5280,
    FEET_TO_YARDS_FACTOR: 1 / 3,
    INCHES_TO_FEET_FACTOR: 1 / 12,
    INCHES_TO_METERS_FACTOR: 0.0254,
    INCHES_TO_MILES_FACTOR: 1 / 63360,
    INCHES_TO_YARDS_FACTOR: 1 / 36,
    MILES_TO_FEET_FACTOR: 5280,
    MILES_TO_INCHES_FACTOR: 63360,
    MILES_TO_METERS_FACTOR: 1609.344,
    MILES_TO_YARDS_FACTOR: 1760,
    YARDS_TO_INCHES_FACTOR: 36,
    YARDS_TO_FEET_FACTOR: 3,
    YARDS_TO_METERS_FACTOR: 0.9144,
    YARDS_TO_MILES_FACTOR: 1 / 1760,
    CELSIUS_TO_FAHRENEIT_MUTLIPLIER_FACTOR: 9 / 5,
    CELSIUS_TO_FAHRENEIT_FACTOR: 32


});


/***/ }),

/***/ "./node_modules/math.js/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/math.js/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Object.assign({},
    __webpack_require__(/*! ./utils */ "./node_modules/math.js/lib/utils/index.js"),
    __webpack_require__(/*! ./statistics */ "./node_modules/math.js/lib/statistics/index.js"),
    __webpack_require__(/*! ./probability */ "./node_modules/math.js/lib/probability/index.js"),
    __webpack_require__(/*! ./arithmetic */ "./node_modules/math.js/lib/arithmetic/index.js"),
    __webpack_require__(/*! ./unit */ "./node_modules/math.js/lib/unit/index.js"),
    __webpack_require__(/*! ./trigonometric */ "./node_modules/math.js/lib/trigonometric/index.js")
);


/***/ }),

/***/ "./node_modules/math.js/lib/probability/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/math.js/lib/probability/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {

    random: function() {
        return Math.random();
    },

    randomElement: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    factorial: function(n) {
        return n * (n-1);
    }
};


/***/ }),

/***/ "./node_modules/math.js/lib/statistics/index.js":
/*!******************************************************!*\
  !*** ./node_modules/math.js/lib/statistics/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {

    minElement: function(arr) {
        return Math.min.apply(null, arr);
    },

    maxElement: function(arr) {
        return Math.max.apply(null, arr);
    },

    between: function (val, min, max) {
        return min<=val==val<=max;
    }
}


/***/ }),

/***/ "./node_modules/math.js/lib/trigonometric/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/math.js/lib/trigonometric/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
// Trigonometric functions
    sin: function (n) {
        return Math.sin(n);
    },

    cos: function (n) {
        return Math.cos(n);
    },

    tan: function (n) {
        return Math.tan(n);
    },

    acos: function (n) {
        return Math.acos(n);
    },

    asin: function (n) {
        return Math.asin(n);
    },

    acosh: function (n) {
        return Math.acosh(n);
    },

    atan: function (n) {
        return Math.atan(n);
    },

    atan2: function (n) {
        return Math.atan2(n);
    }

};


/***/ }),

/***/ "./node_modules/math.js/lib/unit/index.js":
/*!************************************************!*\
  !*** ./node_modules/math.js/lib/unit/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var constants = __webpack_require__(/*! ../constants */ "./node_modules/math.js/lib/constants.js");
module.exports = {

    // Unit converters
    yardsToFeet: function(n) {
        return n * constants.YARDS_TO_FEET_FACTOR;
    },

    feetToYards: function(n) {
        return n * constants.FEET_TO_YARDS_FACTOR;
    },

    yardsToInches: function(n) {
        return n * constants.YARDS_TO_INCHES_FACTOR;
    },

    inchesToYards: function(n) {
        return constants.INCHES_TO_YARDS_FACTOR * n;
    },

    inchesToMiles: function(n) {
        return constants.INCHES_TO_MILES_FACTOR * n;
    },

    feetToInches: function(n) {
        return constants.FEET_TO_INCHES_FACTOR * n;
    },

    feetToMeters: function (n) {
        return constants.FEET_TO_METERS_FACTOR * n;
    },

    feetToMiles: function(n) {
        return constants.FEET_TO_MILES_FACTOR * n;
    },

    inchesToFeet: function(n) {
        return constants.INCHES_TO_FEET_FACTOR * n;
    },

    inchesToMeters: function(n) {
        return constants.INCHES_TO_METERS_FACTOR * n;
    },

    milesToYards: function(n) {
        return constants.MILES_TO_YARDS_FACTOR * n;
    },

    milesToMeters: function(n) {
        return constants.MILES_TO_METERS_FACTOR * n;
    },

    milesToInches: function(n) {
        return constants.MILES_TO_INCHES_FACTOR * n;
    },

    milesToFeet: function(n) {
        return constants.MILES_TO_FEET_FACTOR * n;
    },

    yardsToMiles: function(n) {
        return constants.YARDS_TO_MILES_FACTOR * n;
    },

    yardsToMeters: function(n) {
        return constants.YARDS_TO_METERS_FACTOR * n;
    },

    toFahrenheit: function(val) {
        return val * constants.CELSIUS_TO_FAHRENEIT_MUTLIPLIER_FACTOR + constants.CELSIUS_TO_FAHRENEIT_FACTOR;
    },

    toCelsius: function(val) {
        return (val - constants.CELSIUS_TO_FAHRENEIT_FACTOR) / constants.CELSIUS_TO_FAHRENEIT_MUTLIPLIER_FACTOR;
    },

};


/***/ }),

/***/ "./node_modules/math.js/lib/utils/index.js":
/*!*************************************************!*\
  !*** ./node_modules/math.js/lib/utils/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    isPrime: function(n) {
        for (var i = 2 ; i < n ; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return n > 1;
    },

    isEven: function(n) {
        return n % 2 === 0;
    },

    isOdd: function(n) {
        return !this.isEven(n);
    },

    format: function(val, decimals) {
        return ( val.toFixed(decimals) )/1;
    },

    dropFirstDigit: function(n) {
        return Number(n.toString().substring(1));
    },

    dropLastDigit: function(n) {
        return Number(n.toString().substring(0, n.toString().length-1));
    },

    dropDigit: function(n, pos) {
        return Number(n.toString().substring(0, pos-1).concat(n.toString().substring(pos, n)));
    }
};


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/factoryWithThrowingShims.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithThrowingShims.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(/*! fbjs/lib/emptyFunction */ "./node_modules/fbjs/lib/emptyFunction.js");
var invariant = __webpack_require__(/*! fbjs/lib/invariant */ "./node_modules/fbjs/lib/invariant.js");
var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, isValidElement, REACT_ELEMENT_TYPE; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(/*! ./factoryWithThrowingShims */ "./node_modules/prop-types/factoryWithThrowingShims.js")();
}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react-csv/index.js":
/*!*****************************************!*\
  !*** ./node_modules/react-csv/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/index.js */ "./node_modules/react-csv/lib/index.js");


/***/ }),

/***/ "./node_modules/react-csv/lib/components/Download.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-csv/lib/components/Download.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _core = __webpack_require__(/*! ../core */ "./node_modules/react-csv/lib/core.js");

var _metaProps = __webpack_require__(/*! ../metaProps */ "./node_modules/react-csv/lib/metaProps.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
  target: '_blank'
};

var CSVDownload = function (_React$Component) {
  _inherits(CSVDownload, _React$Component);

  function CSVDownload(props) {
    _classCallCheck(this, CSVDownload);

    var _this = _possibleConstructorReturn(this, (CSVDownload.__proto__ || Object.getPrototypeOf(CSVDownload)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(CSVDownload, [{
    key: 'buildURI',
    value: function buildURI() {
      return _core.buildURI.apply(undefined, arguments);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          headers = _props.headers,
          separator = _props.separator,
          uFEFF = _props.uFEFF,
          target = _props.target,
          specs = _props.specs,
          replace = _props.replace;

      this.state.page = window.open(this.buildURI(data, uFEFF, headers, separator), target, specs, replace);
    }
  }, {
    key: 'getWindow',
    value: function getWindow() {
      return this.state.page;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return CSVDownload;
}(_react2.default.Component);

CSVDownload.defaultProps = Object.assign(_metaProps.defaultProps, defaultProps);
CSVDownload.propTypes = _metaProps.propTypes;
exports.default = CSVDownload;

/***/ }),

/***/ "./node_modules/react-csv/lib/components/Link.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-csv/lib/components/Link.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _core = __webpack_require__(/*! ../core */ "./node_modules/react-csv/lib/core.js");

var _metaProps = __webpack_require__(/*! ../metaProps */ "./node_modules/react-csv/lib/metaProps.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVLink = function (_React$Component) {
  _inherits(CSVLink, _React$Component);

  function CSVLink(props) {
    _classCallCheck(this, CSVLink);

    var _this = _possibleConstructorReturn(this, (CSVLink.__proto__ || Object.getPrototypeOf(CSVLink)).call(this, props));

    _this.buildURI = _this.buildURI.bind(_this);
    return _this;
  }

  _createClass(CSVLink, [{
    key: 'buildURI',
    value: function buildURI() {
      return _core.buildURI.apply(undefined, arguments);
    }
  }, {
    key: 'handleLegacy',
    value: function handleLegacy(evt, data, headers, separator, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        evt.preventDefault();

        var blob = new Blob([(0, _core.toCSV)(data, headers, separator)]);
        window.navigator.msSaveBlob(blob, filename);

        return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          headers = _props.headers,
          separator = _props.separator,
          filename = _props.filename,
          uFEFF = _props.uFEFF,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['data', 'headers', 'separator', 'filename', 'uFEFF', 'children']);

      return _react2.default.createElement(
        'a',
        _extends({ download: filename }, rest, {
          ref: function ref(link) {
            return _this2.link = link;
          },
          href: this.buildURI(data, uFEFF, headers, separator),
          onClick: function onClick(evt) {
            return _this2.handleLegacy(evt, data, headers, separator, filename);
          } }),
        children
      );
    }
  }]);

  return CSVLink;
}(_react2.default.Component);

CSVLink.defaultProps = _metaProps.defaultProps;
CSVLink.propTypes = _metaProps.propTypes;
exports.default = CSVLink;

/***/ }),

/***/ "./node_modules/react-csv/lib/core.js":
/*!********************************************!*\
  !*** ./node_modules/react-csv/lib/core.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isJsons = exports.isJsons = function isJsons(array) {
  return Array.isArray(array) && array.every(function (row) {
    return (typeof row === 'undefined' ? 'undefined' : _typeof(row)) === 'object' && !(row instanceof Array);
  });
};

var isArrays = exports.isArrays = function isArrays(array) {
  return Array.isArray(array) && array.every(function (row) {
    return Array.isArray(row);
  });
};

var jsonsHeaders = exports.jsonsHeaders = function jsonsHeaders(array) {
  return Array.from(array.map(function (json) {
    return Object.keys(json);
  }).reduce(function (a, b) {
    return new Set([].concat(_toConsumableArray(a), _toConsumableArray(b)));
  }, []));
};

var jsons2arrays = exports.jsons2arrays = function jsons2arrays(jsons, headers) {
  headers = headers || jsonsHeaders(jsons);

  var headerLabels = headers;
  var headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map(function (header) {
      return header.label;
    });
    headerKeys = headers.map(function (header) {
      return header.key;
    });
  }

  var data = jsons.map(function (object) {
    return headerKeys.map(function (header) {
      return header in object ? object[header] : '';
    });
  });
  return [headerLabels].concat(_toConsumableArray(data));
};

var elementOrEmpty = exports.elementOrEmpty = function elementOrEmpty(element) {
  return element || element === 0 ? element : '';
};

var joiner = exports.joiner = function joiner(data) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  return data.map(function (row, index) {
    return row.map(function (element) {
      return "\"" + elementOrEmpty(element) + "\"";
    }).join(separator);
  }).join('\n');
};

var arrays2csv = exports.arrays2csv = function arrays2csv(data, headers, separator) {
  return joiner(headers ? [headers].concat(_toConsumableArray(data)) : data, separator);
};

var jsons2csv = exports.jsons2csv = function jsons2csv(data, headers, separator) {
  return joiner(jsons2arrays(data, headers), separator);
};

var string2csv = exports.string2csv = function string2csv(data, headers, separator) {
  return headers ? headers.join(separator) + '\n' + data : data;
};

var toCSV = exports.toCSV = function toCSV(data, headers, separator) {
  if (isJsons(data)) return jsons2csv(data, headers, separator);
  if (isArrays(data)) return arrays2csv(data, headers, separator);
  if (typeof data === 'string') return string2csv(data, headers, separator);
  throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ');
};

var buildURI = exports.buildURI = function buildURI(data, uFEFF, headers, separator) {
  var csv = toCSV(data, headers, separator);
  var blob = new Blob([uFEFF ? '\uFEFF' : '', csv], { type: 'text/csv' });
  var dataURI = 'data:text/csv;charset=utf-8,' + (uFEFF ? '\uFEFF' : '') + csv;

  var URL = window.URL || window.webkitURL;

  return typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob);
};

/***/ }),

/***/ "./node_modules/react-csv/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/react-csv/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSVLink = exports.CSVDownload = undefined;

var _Download = __webpack_require__(/*! ./components/Download */ "./node_modules/react-csv/lib/components/Download.js");

var _Download2 = _interopRequireDefault(_Download);

var _Link = __webpack_require__(/*! ./components/Link */ "./node_modules/react-csv/lib/components/Link.js");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSVDownload = exports.CSVDownload = _Download2.default;
var CSVLink = exports.CSVLink = _Link2.default;

/***/ }),

/***/ "./node_modules/react-csv/lib/metaProps.js":
/*!*************************************************!*\
  !*** ./node_modules/react-csv/lib/metaProps.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropsNotForwarded = exports.defaultProps = exports.propTypes = undefined;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = exports.propTypes = {
  data: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.array]).isRequired,
  headers: _propTypes.array,
  target: _propTypes.string,
  separator: _propTypes.string,
  filename: _propTypes.string,
  uFEFF: _propTypes.bool
};

var defaultProps = exports.defaultProps = {
  separator: ',',
  filename: 'generatedBy_react-csv.csv',
  uFEFF: true
};

var PropsNotForwarded = exports.PropsNotForwarded = ['data', 'headers'];

/***/ }),

/***/ "./node_modules/react-dom/cjs/react-dom.production.min.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-dom/cjs/react-dom.production.min.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(/*! react */ "./node_modules/react/index.js"),l=__webpack_require__(/*! fbjs/lib/ExecutionEnvironment */ "./node_modules/fbjs/lib/ExecutionEnvironment.js"),B=__webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js"),C=__webpack_require__(/*! fbjs/lib/emptyFunction */ "./node_modules/fbjs/lib/emptyFunction.js"),ba=__webpack_require__(/*! fbjs/lib/EventListener */ "./node_modules/fbjs/lib/EventListener.js"),da=__webpack_require__(/*! fbjs/lib/getActiveElement */ "./node_modules/fbjs/lib/getActiveElement.js"),ea=__webpack_require__(/*! fbjs/lib/shallowEqual */ "./node_modules/fbjs/lib/shallowEqual.js"),fa=__webpack_require__(/*! fbjs/lib/containsNode */ "./node_modules/fbjs/lib/containsNode.js"),ia=__webpack_require__(/*! fbjs/lib/focusNode */ "./node_modules/fbjs/lib/focusNode.js"),D=__webpack_require__(/*! fbjs/lib/emptyObject */ "./node_modules/fbjs/lib/emptyObject.js");
function E(a){for(var b=arguments.length-1,c="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,d=0;d<b;d++)c+="\x26args[]\x3d"+encodeURIComponent(arguments[d+1]);b=Error(c+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}aa?void 0:E("227");
var oa={children:!0,dangerouslySetInnerHTML:!0,defaultValue:!0,defaultChecked:!0,innerHTML:!0,suppressContentEditableWarning:!0,suppressHydrationWarning:!0,style:!0};function pa(a,b){return(a&b)===b}
var ta={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,HAS_STRING_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(a){var b=ta,c=a.Properties||{},d=a.DOMAttributeNamespaces||{},e=a.DOMAttributeNames||{};a=a.DOMMutationMethods||{};for(var f in c){ua.hasOwnProperty(f)?E("48",f):void 0;var g=f.toLowerCase(),h=c[f];g={attributeName:g,attributeNamespace:null,propertyName:f,mutationMethod:null,mustUseProperty:pa(h,b.MUST_USE_PROPERTY),
hasBooleanValue:pa(h,b.HAS_BOOLEAN_VALUE),hasNumericValue:pa(h,b.HAS_NUMERIC_VALUE),hasPositiveNumericValue:pa(h,b.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:pa(h,b.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:pa(h,b.HAS_STRING_BOOLEAN_VALUE)};1>=g.hasBooleanValue+g.hasNumericValue+g.hasOverloadedBooleanValue?void 0:E("50",f);e.hasOwnProperty(f)&&(g.attributeName=e[f]);d.hasOwnProperty(f)&&(g.attributeNamespace=d[f]);a.hasOwnProperty(f)&&(g.mutationMethod=a[f]);ua[f]=g}}},ua={};
function va(a,b){if(oa.hasOwnProperty(a)||2<a.length&&("o"===a[0]||"O"===a[0])&&("n"===a[1]||"N"===a[1]))return!1;if(null===b)return!0;switch(typeof b){case "boolean":return oa.hasOwnProperty(a)?a=!0:(b=wa(a))?a=b.hasBooleanValue||b.hasStringBooleanValue||b.hasOverloadedBooleanValue:(a=a.toLowerCase().slice(0,5),a="data-"===a||"aria-"===a),a;case "undefined":case "number":case "string":case "object":return!0;default:return!1}}function wa(a){return ua.hasOwnProperty(a)?ua[a]:null}
var xa=ta,ya=xa.MUST_USE_PROPERTY,K=xa.HAS_BOOLEAN_VALUE,za=xa.HAS_NUMERIC_VALUE,Aa=xa.HAS_POSITIVE_NUMERIC_VALUE,Ba=xa.HAS_OVERLOADED_BOOLEAN_VALUE,Ca=xa.HAS_STRING_BOOLEAN_VALUE,Da={Properties:{allowFullScreen:K,async:K,autoFocus:K,autoPlay:K,capture:Ba,checked:ya|K,cols:Aa,contentEditable:Ca,controls:K,"default":K,defer:K,disabled:K,download:Ba,draggable:Ca,formNoValidate:K,hidden:K,loop:K,multiple:ya|K,muted:ya|K,noValidate:K,open:K,playsInline:K,readOnly:K,required:K,reversed:K,rows:Aa,rowSpan:za,
scoped:K,seamless:K,selected:ya|K,size:Aa,start:za,span:Aa,spellCheck:Ca,style:0,tabIndex:0,itemScope:K,acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,value:Ca},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMMutationMethods:{value:function(a,b){if(null==b)return a.removeAttribute("value");"number"!==a.type||!1===a.hasAttribute("value")?a.setAttribute("value",""+b):a.validity&&!a.validity.badInput&&a.ownerDocument.activeElement!==a&&
a.setAttribute("value",""+b)}}},Ea=xa.HAS_STRING_BOOLEAN_VALUE,M={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},Ga={Properties:{autoReverse:Ea,externalResourcesRequired:Ea,preserveAlpha:Ea},DOMAttributeNames:{autoReverse:"autoReverse",externalResourcesRequired:"externalResourcesRequired",preserveAlpha:"preserveAlpha"},DOMAttributeNamespaces:{xlinkActuate:M.xlink,xlinkArcrole:M.xlink,xlinkHref:M.xlink,xlinkRole:M.xlink,xlinkShow:M.xlink,xlinkTitle:M.xlink,xlinkType:M.xlink,
xmlBase:M.xml,xmlLang:M.xml,xmlSpace:M.xml}},Ha=/[\-\:]([a-z])/g;function Ia(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(a){var b=a.replace(Ha,
Ia);Ga.Properties[b]=0;Ga.DOMAttributeNames[b]=a});xa.injectDOMPropertyConfig(Da);xa.injectDOMPropertyConfig(Ga);
var P={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,injection:{injectErrorUtils:function(a){"function"!==typeof a.invokeGuardedCallback?E("197"):void 0;Ja=a.invokeGuardedCallback}},invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){Ja.apply(P,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){P.invokeGuardedCallback.apply(this,arguments);if(P.hasCaughtError()){var q=P.clearCaughtError();P._hasRethrowError||(P._hasRethrowError=!0,P._rethrowError=
q)}},rethrowCaughtError:function(){return Ka.apply(P,arguments)},hasCaughtError:function(){return P._hasCaughtError},clearCaughtError:function(){if(P._hasCaughtError){var a=P._caughtError;P._caughtError=null;P._hasCaughtError=!1;return a}E("198")}};function Ja(a,b,c,d,e,f,g,h,k){P._hasCaughtError=!1;P._caughtError=null;var q=Array.prototype.slice.call(arguments,3);try{b.apply(c,q)}catch(v){P._caughtError=v,P._hasCaughtError=!0}}
function Ka(){if(P._hasRethrowError){var a=P._rethrowError;P._rethrowError=null;P._hasRethrowError=!1;throw a;}}var La=null,Ma={};
function Na(){if(La)for(var a in Ma){var b=Ma[a],c=La.indexOf(a);-1<c?void 0:E("96",a);if(!Oa[c]){b.extractEvents?void 0:E("97",a);Oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;Pa.hasOwnProperty(h)?E("99",h):void 0;Pa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&Qa(k[e],g,h);e=!0}else f.registrationName?(Qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:E("98",d,a)}}}}
function Qa(a,b,c){Ra[a]?E("100",a):void 0;Ra[a]=b;Sa[a]=b.eventTypes[c].dependencies}var Oa=[],Pa={},Ra={},Sa={};function Ta(a){La?E("101"):void 0;La=Array.prototype.slice.call(a);Na()}function Ua(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];Ma.hasOwnProperty(c)&&Ma[c]===d||(Ma[c]?E("102",c):void 0,Ma[c]=d,b=!0)}b&&Na()}
var Va=Object.freeze({plugins:Oa,eventNameDispatchConfigs:Pa,registrationNameModules:Ra,registrationNameDependencies:Sa,possibleRegistrationNames:null,injectEventPluginOrder:Ta,injectEventPluginsByName:Ua}),Wa=null,Xa=null,Ya=null;function Za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=Ya(d);P.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
function $a(a,b){null==b?E("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function ab(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var bb=null;
function cb(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)Za(a,b,c[e],d[e]);else c&&Za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function db(a){return cb(a,!0)}function gb(a){return cb(a,!1)}var hb={injectEventPluginOrder:Ta,injectEventPluginsByName:Ua};
function ib(a,b){var c=a.stateNode;if(!c)return null;var d=Wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?E("231",b,typeof c):void 0;
return c}function jb(a,b,c,d){for(var e,f=0;f<Oa.length;f++){var g=Oa[f];g&&(g=g.extractEvents(a,b,c,d))&&(e=$a(e,g))}return e}function kb(a){a&&(bb=$a(bb,a))}function lb(a){var b=bb;bb=null;b&&(a?ab(b,db):ab(b,gb),bb?E("95"):void 0,P.rethrowCaughtError())}var mb=Object.freeze({injection:hb,getListener:ib,extractEvents:jb,enqueueEvents:kb,processEventQueue:lb}),nb=Math.random().toString(36).slice(2),Q="__reactInternalInstance$"+nb,ob="__reactEventHandlers$"+nb;
function pb(a){if(a[Q])return a[Q];for(var b=[];!a[Q];)if(b.push(a),a.parentNode)a=a.parentNode;else return null;var c=void 0,d=a[Q];if(5===d.tag||6===d.tag)return d;for(;a&&(d=a[Q]);a=b.pop())c=d;return c}function qb(a){if(5===a.tag||6===a.tag)return a.stateNode;E("33")}function rb(a){return a[ob]||null}
var sb=Object.freeze({precacheFiberNode:function(a,b){b[Q]=a},getClosestInstanceFromNode:pb,getInstanceFromNode:function(a){a=a[Q];return!a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:qb,getFiberCurrentPropsFromNode:rb,updateFiberProps:function(a,b){a[ob]=b}});function tb(a){do a=a["return"];while(a&&5!==a.tag);return a?a:null}function ub(a,b,c){for(var d=[];a;)d.push(a),a=tb(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}
function vb(a,b,c){if(b=ib(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=$a(c._dispatchListeners,b),c._dispatchInstances=$a(c._dispatchInstances,a)}function wb(a){a&&a.dispatchConfig.phasedRegistrationNames&&ub(a._targetInst,vb,a)}function xb(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?tb(b):null;ub(b,vb,a)}}
function yb(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=ib(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=$a(c._dispatchListeners,b),c._dispatchInstances=$a(c._dispatchInstances,a))}function zb(a){a&&a.dispatchConfig.registrationName&&yb(a._targetInst,null,a)}function Ab(a){ab(a,wb)}
function Bb(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,g=0,h=e;h;h=tb(h))g++;h=0;for(var k=f;k;k=tb(k))h++;for(;0<g-h;)e=tb(e),g--;for(;0<h-g;)f=tb(f),h--;for(;g--;){if(e===f||e===f.alternate)break a;e=tb(e);f=tb(f)}e=null}else e=null;f=e;for(e=[];c&&c!==f;){g=c.alternate;if(null!==g&&g===f)break;e.push(c);c=tb(c)}for(c=[];d&&d!==f;){g=d.alternate;if(null!==g&&g===f)break;c.push(d);d=tb(d)}for(d=0;d<e.length;d++)yb(e[d],"bubbled",a);for(a=c.length;0<a--;)yb(c[a],"captured",b)}
var Cb=Object.freeze({accumulateTwoPhaseDispatches:Ab,accumulateTwoPhaseDispatchesSkipTarget:function(a){ab(a,xb)},accumulateEnterLeaveDispatches:Bb,accumulateDirectDispatches:function(a){ab(a,zb)}}),Db=null;function Eb(){!Db&&l.canUseDOM&&(Db="textContent"in document.documentElement?"textContent":"innerText");return Db}var S={_root:null,_startText:null,_fallbackText:null};
function Fb(){if(S._fallbackText)return S._fallbackText;var a,b=S._startText,c=b.length,d,e=Gb(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);S._fallbackText=e.slice(a,1<d?1-d:void 0);return S._fallbackText}function Gb(){return"value"in S._root?S._root.value:S._root[Eb()]}
var Hb="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),Ib={type:null,target:null,currentTarget:C.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function T(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?C.thatReturnsTrue:C.thatReturnsFalse;this.isPropagationStopped=C.thatReturnsFalse;return this}
B(T.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=C.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=C.thatReturnsTrue)},persist:function(){this.isPersistent=C.thatReturnsTrue},isPersistent:C.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<Hb.length;a++)this[Hb[a]]=null}});T.Interface=Ib;T.augmentClass=function(a,b){function c(){}c.prototype=this.prototype;var d=new c;B(d,a.prototype);a.prototype=d;a.prototype.constructor=a;a.Interface=B({},this.Interface,b);a.augmentClass=this.augmentClass;Jb(a)};Jb(T);function Kb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}
function Lb(a){a instanceof this?void 0:E("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function Jb(a){a.eventPool=[];a.getPooled=Kb;a.release=Lb}function Mb(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Mb,{data:null});function Nb(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Nb,{data:null});var Pb=[9,13,27,32],Vb=l.canUseDOM&&"CompositionEvent"in window,Wb=null;l.canUseDOM&&"documentMode"in document&&(Wb=document.documentMode);var Xb;
if(Xb=l.canUseDOM&&"TextEvent"in window&&!Wb){var Yb=window.opera;Xb=!("object"===typeof Yb&&"function"===typeof Yb.version&&12>=parseInt(Yb.version(),10))}
var Zb=Xb,$b=l.canUseDOM&&(!Vb||Wb&&8<Wb&&11>=Wb),ac=String.fromCharCode(32),bc={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")}},cc=!1;
function dc(a,b){switch(a){case "topKeyUp":return-1!==Pb.indexOf(b.keyCode);case "topKeyDown":return 229!==b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":return!0;default:return!1}}function ec(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var fc=!1;function gc(a,b){switch(a){case "topCompositionEnd":return ec(b);case "topKeyPress":if(32!==b.which)return null;cc=!0;return ac;case "topTextInput":return a=b.data,a===ac&&cc?null:a;default:return null}}
function hc(a,b){if(fc)return"topCompositionEnd"===a||!Vb&&dc(a,b)?(a=Fb(),S._root=null,S._startText=null,S._fallbackText=null,fc=!1,a):null;switch(a){case "topPaste":return null;case "topKeyPress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "topCompositionEnd":return $b?null:b.data;default:return null}}
var ic={eventTypes:bc,extractEvents:function(a,b,c,d){var e;if(Vb)b:{switch(a){case "topCompositionStart":var f=bc.compositionStart;break b;case "topCompositionEnd":f=bc.compositionEnd;break b;case "topCompositionUpdate":f=bc.compositionUpdate;break b}f=void 0}else fc?dc(a,c)&&(f=bc.compositionEnd):"topKeyDown"===a&&229===c.keyCode&&(f=bc.compositionStart);f?($b&&(fc||f!==bc.compositionStart?f===bc.compositionEnd&&fc&&(e=Fb()):(S._root=d,S._startText=Gb(),fc=!0)),f=Mb.getPooled(f,b,c,d),e?f.data=
e:(e=ec(c),null!==e&&(f.data=e)),Ab(f),e=f):e=null;(a=Zb?gc(a,c):hc(a,c))?(b=Nb.getPooled(bc.beforeInput,b,c,d),b.data=a,Ab(b)):b=null;return[e,b]}},jc=null,kc=null,lc=null;function mc(a){if(a=Xa(a)){jc&&"function"===typeof jc.restoreControlledState?void 0:E("194");var b=Wa(a.stateNode);jc.restoreControlledState(a.stateNode,a.type,b)}}var nc={injectFiberControlledHostComponent:function(a){jc=a}};function oc(a){kc?lc?lc.push(a):lc=[a]:kc=a}
function pc(){if(kc){var a=kc,b=lc;lc=kc=null;mc(a);if(b)for(a=0;a<b.length;a++)mc(b[a])}}var qc=Object.freeze({injection:nc,enqueueStateRestore:oc,restoreStateIfNeeded:pc});function rc(a,b){return a(b)}var sc=!1;function tc(a,b){if(sc)return rc(a,b);sc=!0;try{return rc(a,b)}finally{sc=!1,pc()}}var uc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};
function vc(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!uc[a.type]:"textarea"===b?!0:!1}function wc(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var xc;l.canUseDOM&&(xc=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("",""));
function yc(a,b){if(!l.canUseDOM||b&&!("addEventListener"in document))return!1;b="on"+a;var c=b in document;c||(c=document.createElement("div"),c.setAttribute(b,"return;"),c="function"===typeof c[b]);!c&&xc&&"wheel"===a&&(c=document.implementation.hasFeature("Events.wheel","3.0"));return c}function zc(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ac(a){var b=zc(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"function"===typeof c.get&&"function"===typeof c.set)return Object.defineProperty(a,b,{enumerable:c.enumerable,configurable:!0,get:function(){return c.get.call(this)},set:function(a){d=""+a;c.set.call(this,a)}}),{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=null;delete a[b]}}}
function Bc(a){a._valueTracker||(a._valueTracker=Ac(a))}function Cc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=zc(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}var Dc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")}};
function Ec(a,b,c){a=T.getPooled(Dc.change,a,b,c);a.type="change";oc(c);Ab(a);return a}var Fc=null,Gc=null;function Hc(a){kb(a);lb(!1)}function Ic(a){var b=qb(a);if(Cc(b))return a}function Jc(a,b){if("topChange"===a)return b}var Kc=!1;l.canUseDOM&&(Kc=yc("input")&&(!document.documentMode||9<document.documentMode));function Lc(){Fc&&(Fc.detachEvent("onpropertychange",Mc),Gc=Fc=null)}function Mc(a){"value"===a.propertyName&&Ic(Gc)&&(a=Ec(Gc,a,wc(a)),tc(Hc,a))}
function Nc(a,b,c){"topFocus"===a?(Lc(),Fc=b,Gc=c,Fc.attachEvent("onpropertychange",Mc)):"topBlur"===a&&Lc()}function Oc(a){if("topSelectionChange"===a||"topKeyUp"===a||"topKeyDown"===a)return Ic(Gc)}function Pc(a,b){if("topClick"===a)return Ic(b)}function $c(a,b){if("topInput"===a||"topChange"===a)return Ic(b)}
var ad={eventTypes:Dc,_isInputEventSupported:Kc,extractEvents:function(a,b,c,d){var e=b?qb(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=Jc;else if(vc(e))if(Kc)g=$c;else{g=Oc;var h=Nc}else f=e.nodeName,!f||"input"!==f.toLowerCase()||"checkbox"!==e.type&&"radio"!==e.type||(g=Pc);if(g&&(g=g(a,b)))return Ec(g,c,d);h&&h(a,e,b);"topBlur"===a&&null!=b&&(a=b._wrapperState||e._wrapperState)&&a.controlled&&"number"===e.type&&(a=""+e.value,e.getAttribute("value")!==
a&&e.setAttribute("value",a))}};function bd(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(bd,{view:null,detail:null});var cd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=cd[a])?!!b[a]:!1}function ed(){return dd}function fd(a,b,c,d){return T.call(this,a,b,c,d)}
bd.augmentClass(fd,{screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:ed,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}});
var gd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},hd={eventTypes:gd,extractEvents:function(a,b,c,d){if("topMouseOver"===a&&(c.relatedTarget||c.fromElement)||"topMouseOut"!==a&&"topMouseOver"!==a)return null;var e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;"topMouseOut"===a?(a=b,b=(b=c.relatedTarget||c.toElement)?pb(b):null):a=null;if(a===
b)return null;var f=null==a?e:qb(a);e=null==b?e:qb(b);var g=fd.getPooled(gd.mouseLeave,a,c,d);g.type="mouseleave";g.target=f;g.relatedTarget=e;c=fd.getPooled(gd.mouseEnter,b,c,d);c.type="mouseenter";c.target=e;c.relatedTarget=f;Bb(g,c,a,b);return[g,c]}},id=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;function jd(a){a=a.type;return"string"===typeof a?a:"function"===typeof a?a.displayName||a.name:null}
function kd(a){var b=a;if(a.alternate)for(;b["return"];)b=b["return"];else{if(0!==(b.effectTag&2))return 1;for(;b["return"];)if(b=b["return"],0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function ld(a){return(a=a._reactInternalFiber)?2===kd(a):!1}function md(a){2!==kd(a)?E("188"):void 0}
function nd(a){var b=a.alternate;if(!b)return b=kd(a),3===b?E("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c["return"],f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return md(e),a;if(g===d)return md(e),b;g=g.sibling}E("188")}if(c["return"]!==d["return"])c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:E("189")}}c.alternate!==d?E("190"):void 0}3!==c.tag?E("188"):void 0;return c.stateNode.current===c?a:b}function od(a){a=nd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}
function pd(a){a=nd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}var qd=[];
function rd(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c["return"];)c=c["return"];c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=pb(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],sd(a.topLevelType,b,a.nativeEvent,wc(a.nativeEvent))}var td=!0,sd=void 0;function ud(a){td=!!a}function U(a,b,c){return c?ba.listen(c,b,vd.bind(null,a)):null}function wd(a,b,c){return c?ba.capture(c,b,vd.bind(null,a)):null}
function vd(a,b){if(td){var c=wc(b);c=pb(c);null===c||"number"!==typeof c.tag||2===kd(c)||(c=null);if(qd.length){var d=qd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{tc(rd,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>qd.length&&qd.push(a)}}}
var xd=Object.freeze({get _enabled(){return td},get _handleTopLevel(){return sd},setHandleTopLevel:function(a){sd=a},setEnabled:ud,isEnabled:function(){return td},trapBubbledEvent:U,trapCapturedEvent:wd,dispatchEvent:vd});function yd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var zd={animationend:yd("Animation","AnimationEnd"),animationiteration:yd("Animation","AnimationIteration"),animationstart:yd("Animation","AnimationStart"),transitionend:yd("Transition","TransitionEnd")},Ad={},Bd={};l.canUseDOM&&(Bd=document.createElement("div").style,"AnimationEvent"in window||(delete zd.animationend.animation,delete zd.animationiteration.animation,delete zd.animationstart.animation),"TransitionEvent"in window||delete zd.transitionend.transition);
function Cd(a){if(Ad[a])return Ad[a];if(!zd[a])return a;var b=zd[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Bd)return Ad[a]=b[c];return""}
var Dd={topAbort:"abort",topAnimationEnd:Cd("animationend")||"animationend",topAnimationIteration:Cd("animationiteration")||"animationiteration",topAnimationStart:Cd("animationstart")||"animationstart",topBlur:"blur",topCancel:"cancel",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topClose:"close",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",
topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoad:"load",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",
topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topToggle:"toggle",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",
topTouchStart:"touchstart",topTransitionEnd:Cd("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},Ed={},Fd=0,Gd="_reactListenersID"+(""+Math.random()).slice(2);function Hd(a){Object.prototype.hasOwnProperty.call(a,Gd)||(a[Gd]=Fd++,Ed[a[Gd]]={});return Ed[a[Gd]]}function Id(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Jd(a,b){var c=Id(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Id(c)}}function Kd(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&"text"===a.type||"textarea"===b||"true"===a.contentEditable)}
var Ld=l.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Md={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")}},Nd=null,Od=null,Pd=null,Qd=!1;
function Rd(a,b){if(Qd||null==Nd||Nd!==da())return null;var c=Nd;"selectionStart"in c&&Kd(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return Pd&&ea(Pd,c)?null:(Pd=c,a=T.getPooled(Md.select,Od,a,b),a.type="select",a.target=Nd,Ab(a),a)}
var Sd={eventTypes:Md,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Hd(e);f=Sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?qb(b):window;switch(a){case "topFocus":if(vc(e)||"true"===e.contentEditable)Nd=e,Od=b,Pd=null;break;case "topBlur":Pd=Od=Nd=null;break;case "topMouseDown":Qd=!0;break;case "topContextMenu":case "topMouseUp":return Qd=!1,Rd(c,d);case "topSelectionChange":if(Ld)break;
case "topKeyDown":case "topKeyUp":return Rd(c,d)}return null}};function Td(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Td,{animationName:null,elapsedTime:null,pseudoElement:null});function Ud(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Ud,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}});function Vd(a,b,c,d){return T.call(this,a,b,c,d)}bd.augmentClass(Vd,{relatedTarget:null});
function Wd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;return 32<=a||13===a?a:0}
var Xd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Yd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};function Zd(a,b,c,d){return T.call(this,a,b,c,d)}
bd.augmentClass(Zd,{key:function(a){if(a.key){var b=Xd[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=Wd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Yd[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:ed,charCode:function(a){return"keypress"===a.type?Wd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?Wd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}});function $d(a,b,c,d){return T.call(this,a,b,c,d)}fd.augmentClass($d,{dataTransfer:null});function ae(a,b,c,d){return T.call(this,a,b,c,d)}bd.augmentClass(ae,{touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:ed});function be(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(be,{propertyName:null,elapsedTime:null,pseudoElement:null});
function ce(a,b,c,d){return T.call(this,a,b,c,d)}fd.augmentClass(ce,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null});var de={},ee={};
"abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(a){var b=a[0].toUpperCase()+
a.slice(1),c="on"+b;b="top"+b;c={phasedRegistrationNames:{bubbled:c,captured:c+"Capture"},dependencies:[b]};de[a]=c;ee[b]=c});
var fe={eventTypes:de,extractEvents:function(a,b,c,d){var e=ee[a];if(!e)return null;switch(a){case "topKeyPress":if(0===Wd(c))return null;case "topKeyDown":case "topKeyUp":a=Zd;break;case "topBlur":case "topFocus":a=Vd;break;case "topClick":if(2===c.button)return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":a=fd;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":a=
$d;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":a=ae;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":a=Td;break;case "topTransitionEnd":a=be;break;case "topScroll":a=bd;break;case "topWheel":a=ce;break;case "topCopy":case "topCut":case "topPaste":a=Ud;break;default:a=T}b=a.getPooled(e,b,c,d);Ab(b);return b}};sd=function(a,b,c,d){a=jb(a,b,c,d);kb(a);lb(!1)};hb.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
Wa=sb.getFiberCurrentPropsFromNode;Xa=sb.getInstanceFromNode;Ya=sb.getNodeFromInstance;hb.injectEventPluginsByName({SimpleEventPlugin:fe,EnterLeaveEventPlugin:hd,ChangeEventPlugin:ad,SelectEventPlugin:Sd,BeforeInputEventPlugin:ic});var ge=[],he=-1;function V(a){0>he||(a.current=ge[he],ge[he]=null,he--)}function W(a,b){he++;ge[he]=a.current;a.current=b}new Set;var ie={current:D},X={current:!1},je=D;function ke(a){return le(a)?je:ie.current}
function me(a,b){var c=a.type.contextTypes;if(!c)return D;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function le(a){return 2===a.tag&&null!=a.type.childContextTypes}function ne(a){le(a)&&(V(X,a),V(ie,a))}
function oe(a,b,c){null!=ie.cursor?E("168"):void 0;W(ie,b,a);W(X,c,a)}function pe(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:E("108",jd(a)||"Unknown",e);return B({},b,c)}function qe(a){if(!le(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||D;je=ie.current;W(ie,b,a);W(X,X.current,a);return!0}
function re(a,b){var c=a.stateNode;c?void 0:E("169");if(b){var d=pe(a,je);c.__reactInternalMemoizedMergedChildContext=d;V(X,a);V(ie,a);W(ie,d,a)}else V(X,a);W(X,b,a)}
function Y(a,b,c){this.tag=a;this.key=b;this.stateNode=this.type=null;this.sibling=this.child=this["return"]=null;this.index=0;this.memoizedState=this.updateQueue=this.memoizedProps=this.pendingProps=this.ref=null;this.internalContextTag=c;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null}
function se(a,b,c){var d=a.alternate;null===d?(d=new Y(a.tag,a.key,a.internalContextTag),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.pendingProps=b;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
function te(a,b,c){var d=void 0,e=a.type,f=a.key;"function"===typeof e?(d=e.prototype&&e.prototype.isReactComponent?new Y(2,f,b):new Y(0,f,b),d.type=e,d.pendingProps=a.props):"string"===typeof e?(d=new Y(5,f,b),d.type=e,d.pendingProps=a.props):"object"===typeof e&&null!==e&&"number"===typeof e.tag?(d=e,d.pendingProps=a.props):E("130",null==e?e:typeof e,"");d.expirationTime=c;return d}function ue(a,b,c,d){b=new Y(10,d,b);b.pendingProps=a;b.expirationTime=c;return b}
function ve(a,b,c){b=new Y(6,null,b);b.pendingProps=a;b.expirationTime=c;return b}function we(a,b,c){b=new Y(7,a.key,b);b.type=a.handler;b.pendingProps=a;b.expirationTime=c;return b}function xe(a,b,c){a=new Y(9,null,b);a.expirationTime=c;return a}function ye(a,b,c){b=new Y(4,a.key,b);b.pendingProps=a.children||[];b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}var ze=null,Ae=null;
function Be(a){return function(b){try{return a(b)}catch(c){}}}function Ce(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);ze=Be(function(a){return b.onCommitFiberRoot(c,a)});Ae=Be(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}function De(a){"function"===typeof ze&&ze(a)}function Ee(a){"function"===typeof Ae&&Ae(a)}
function Fe(a){return{baseState:a,expirationTime:0,first:null,last:null,callbackList:null,hasForceUpdate:!1,isInitialized:!1}}function Ge(a,b){null===a.last?a.first=a.last=b:(a.last.next=b,a.last=b);if(0===a.expirationTime||a.expirationTime>b.expirationTime)a.expirationTime=b.expirationTime}
function He(a,b){var c=a.alternate,d=a.updateQueue;null===d&&(d=a.updateQueue=Fe(null));null!==c?(a=c.updateQueue,null===a&&(a=c.updateQueue=Fe(null))):a=null;a=a!==d?a:null;null===a?Ge(d,b):null===d.last||null===a.last?(Ge(d,b),Ge(a,b)):(Ge(d,b),a.last=b)}function Ie(a,b,c,d){a=a.partialState;return"function"===typeof a?a.call(b,c,d):a}
function Je(a,b,c,d,e,f){null!==a&&a.updateQueue===c&&(c=b.updateQueue={baseState:c.baseState,expirationTime:c.expirationTime,first:c.first,last:c.last,isInitialized:c.isInitialized,callbackList:null,hasForceUpdate:!1});c.expirationTime=0;c.isInitialized?a=c.baseState:(a=c.baseState=b.memoizedState,c.isInitialized=!0);for(var g=!0,h=c.first,k=!1;null!==h;){var q=h.expirationTime;if(q>f){var v=c.expirationTime;if(0===v||v>q)c.expirationTime=q;k||(k=!0,c.baseState=a)}else{k||(c.first=h.next,null===
c.first&&(c.last=null));if(h.isReplace)a=Ie(h,d,a,e),g=!0;else if(q=Ie(h,d,a,e))a=g?B({},a,q):B(a,q),g=!1;h.isForced&&(c.hasForceUpdate=!0);null!==h.callback&&(q=c.callbackList,null===q&&(q=c.callbackList=[]),q.push(h))}h=h.next}null!==c.callbackList?b.effectTag|=32:null!==c.first||c.hasForceUpdate||(b.updateQueue=null);k||(c.baseState=a);return a}
function Ke(a,b){var c=a.callbackList;if(null!==c)for(a.callbackList=null,a=0;a<c.length;a++){var d=c[a],e=d.callback;d.callback=null;"function"!==typeof e?E("191",e):void 0;e.call(b)}}
function Le(a,b,c,d){function e(a,b){b.updater=f;a.stateNode=b;b._reactInternalFiber=a}var f={isMounted:ld,enqueueSetState:function(c,d,e){c=c._reactInternalFiber;e=void 0===e?null:e;var g=b(c);He(c,{expirationTime:g,partialState:d,callback:e,isReplace:!1,isForced:!1,nextCallback:null,next:null});a(c,g)},enqueueReplaceState:function(c,d,e){c=c._reactInternalFiber;e=void 0===e?null:e;var g=b(c);He(c,{expirationTime:g,partialState:d,callback:e,isReplace:!0,isForced:!1,nextCallback:null,next:null});
a(c,g)},enqueueForceUpdate:function(c,d){c=c._reactInternalFiber;d=void 0===d?null:d;var e=b(c);He(c,{expirationTime:e,partialState:null,callback:d,isReplace:!1,isForced:!0,nextCallback:null,next:null});a(c,e)}};return{adoptClassInstance:e,constructClassInstance:function(a,b){var c=a.type,d=ke(a),f=2===a.tag&&null!=a.type.contextTypes,g=f?me(a,d):D;b=new c(b,g);e(a,b);f&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=d,a.__reactInternalMemoizedMaskedChildContext=g);return b},mountClassInstance:function(a,
b){var c=a.alternate,d=a.stateNode,e=d.state||null,g=a.pendingProps;g?void 0:E("158");var h=ke(a);d.props=g;d.state=a.memoizedState=e;d.refs=D;d.context=me(a,h);null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent&&(a.internalContextTag|=1);"function"===typeof d.componentWillMount&&(e=d.state,d.componentWillMount(),e!==d.state&&f.enqueueReplaceState(d,d.state,null),e=a.updateQueue,null!==e&&(d.state=Je(c,a,e,d,g,b)));"function"===typeof d.componentDidMount&&(a.effectTag|=
4)},updateClassInstance:function(a,b,e){var g=b.stateNode;g.props=b.memoizedProps;g.state=b.memoizedState;var h=b.memoizedProps,k=b.pendingProps;k||(k=h,null==k?E("159"):void 0);var u=g.context,z=ke(b);z=me(b,z);"function"!==typeof g.componentWillReceiveProps||h===k&&u===z||(u=g.state,g.componentWillReceiveProps(k,z),g.state!==u&&f.enqueueReplaceState(g,g.state,null));u=b.memoizedState;e=null!==b.updateQueue?Je(a,b,b.updateQueue,g,k,e):u;if(!(h!==k||u!==e||X.current||null!==b.updateQueue&&b.updateQueue.hasForceUpdate))return"function"!==
typeof g.componentDidUpdate||h===a.memoizedProps&&u===a.memoizedState||(b.effectTag|=4),!1;var G=k;if(null===h||null!==b.updateQueue&&b.updateQueue.hasForceUpdate)G=!0;else{var I=b.stateNode,L=b.type;G="function"===typeof I.shouldComponentUpdate?I.shouldComponentUpdate(G,e,z):L.prototype&&L.prototype.isPureReactComponent?!ea(h,G)||!ea(u,e):!0}G?("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(k,e,z),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4)):("function"!==typeof g.componentDidUpdate||
h===a.memoizedProps&&u===a.memoizedState||(b.effectTag|=4),c(b,k),d(b,e));g.props=k;g.state=e;g.context=z;return G}}}var Qe="function"===typeof Symbol&&Symbol["for"],Re=Qe?Symbol["for"]("react.element"):60103,Se=Qe?Symbol["for"]("react.call"):60104,Te=Qe?Symbol["for"]("react.return"):60105,Ue=Qe?Symbol["for"]("react.portal"):60106,Ve=Qe?Symbol["for"]("react.fragment"):60107,We="function"===typeof Symbol&&Symbol.iterator;
function Xe(a){if(null===a||"undefined"===typeof a)return null;a=We&&a[We]||a["@@iterator"];return"function"===typeof a?a:null}var Ye=Array.isArray;
function Ze(a,b){var c=b.ref;if(null!==c&&"function"!==typeof c){if(b._owner){b=b._owner;var d=void 0;b&&(2!==b.tag?E("110"):void 0,d=b.stateNode);d?void 0:E("147",c);var e=""+c;if(null!==a&&null!==a.ref&&a.ref._stringRef===e)return a.ref;a=function(a){var b=d.refs===D?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};a._stringRef=e;return a}"string"!==typeof c?E("148"):void 0;b._owner?void 0:E("149",c)}return c}
function $e(a,b){"textarea"!==a.type&&E("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function af(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=se(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=ve(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c,d);b["return"]=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=Ze(b,c),d["return"]=a,d;d=te(c,a.internalContextTag,d);d.ref=Ze(b,c);d["return"]=a;return d}function q(a,b,c,d){if(null===b||7!==b.tag)return b=we(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c,d);
b["return"]=a;return b}function v(a,b,c,d){if(null===b||9!==b.tag)return b=xe(c,a.internalContextTag,d),b.type=c.value,b["return"]=a,b;b=e(b,null,d);b.type=c.value;b["return"]=a;return b}function y(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=ye(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c.children||[],d);b["return"]=a;return b}function u(a,b,c,d,f){if(null===b||10!==b.tag)return b=ue(c,a.internalContextTag,
d,f),b["return"]=a,b;b=e(b,c,d);b["return"]=a;return b}function z(a,b,c){if("string"===typeof b||"number"===typeof b)return b=ve(""+b,a.internalContextTag,c),b["return"]=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Re:if(b.type===Ve)return b=ue(b.props.children,a.internalContextTag,c,b.key),b["return"]=a,b;c=te(b,a.internalContextTag,c);c.ref=Ze(null,b);c["return"]=a;return c;case Se:return b=we(b,a.internalContextTag,c),b["return"]=a,b;case Te:return c=xe(b,a.internalContextTag,
c),c.type=b.value,c["return"]=a,c;case Ue:return b=ye(b,a.internalContextTag,c),b["return"]=a,b}if(Ye(b)||Xe(b))return b=ue(b,a.internalContextTag,c,null),b["return"]=a,b;$e(a,b)}return null}function G(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Re:return c.key===e?c.type===Ve?u(a,b,c.props.children,d,e):k(a,b,c,d):null;case Se:return c.key===e?q(a,b,c,d):null;case Te:return null===
e?v(a,b,c,d):null;case Ue:return c.key===e?y(a,b,c,d):null}if(Ye(c)||Xe(c))return null!==e?null:u(a,b,c,d,null);$e(a,c)}return null}function I(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Re:return a=a.get(null===d.key?c:d.key)||null,d.type===Ve?u(b,a,d.props.children,e,d.key):k(b,a,d,e);case Se:return a=a.get(null===d.key?c:d.key)||null,q(b,a,d,e);case Te:return a=a.get(c)||null,v(b,a,d,e);case Ue:return a=
a.get(null===d.key?c:d.key)||null,y(b,a,d,e)}if(Ye(d)||Xe(d))return a=a.get(c)||null,u(b,a,d,e,null);$e(b,d)}return null}function L(e,g,m,A){for(var h=null,r=null,n=g,w=g=0,k=null;null!==n&&w<m.length;w++){n.index>w?(k=n,n=null):k=n.sibling;var x=G(e,n,m[w],A);if(null===x){null===n&&(n=k);break}a&&n&&null===x.alternate&&b(e,n);g=f(x,g,w);null===r?h=x:r.sibling=x;r=x;n=k}if(w===m.length)return c(e,n),h;if(null===n){for(;w<m.length;w++)if(n=z(e,m[w],A))g=f(n,g,w),null===r?h=n:r.sibling=n,r=n;return h}for(n=
d(e,n);w<m.length;w++)if(k=I(n,e,w,m[w],A)){if(a&&null!==k.alternate)n["delete"](null===k.key?w:k.key);g=f(k,g,w);null===r?h=k:r.sibling=k;r=k}a&&n.forEach(function(a){return b(e,a)});return h}function N(e,g,m,A){var h=Xe(m);"function"!==typeof h?E("150"):void 0;m=h.call(m);null==m?E("151"):void 0;for(var r=h=null,n=g,w=g=0,k=null,x=m.next();null!==n&&!x.done;w++,x=m.next()){n.index>w?(k=n,n=null):k=n.sibling;var J=G(e,n,x.value,A);if(null===J){n||(n=k);break}a&&n&&null===J.alternate&&b(e,n);g=f(J,
g,w);null===r?h=J:r.sibling=J;r=J;n=k}if(x.done)return c(e,n),h;if(null===n){for(;!x.done;w++,x=m.next())x=z(e,x.value,A),null!==x&&(g=f(x,g,w),null===r?h=x:r.sibling=x,r=x);return h}for(n=d(e,n);!x.done;w++,x=m.next())if(x=I(n,e,w,x.value,A),null!==x){if(a&&null!==x.alternate)n["delete"](null===x.key?w:x.key);g=f(x,g,w);null===r?h=x:r.sibling=x;r=x}a&&n.forEach(function(a){return b(e,a)});return h}return function(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Ve&&null===f.key&&(f=f.props.children);
var m="object"===typeof f&&null!==f;if(m)switch(f.$$typeof){case Re:a:{var r=f.key;for(m=d;null!==m;){if(m.key===r)if(10===m.tag?f.type===Ve:m.type===f.type){c(a,m.sibling);d=e(m,f.type===Ve?f.props.children:f.props,h);d.ref=Ze(m,f);d["return"]=a;a=d;break a}else{c(a,m);break}else b(a,m);m=m.sibling}f.type===Ve?(d=ue(f.props.children,a.internalContextTag,h,f.key),d["return"]=a,a=d):(h=te(f,a.internalContextTag,h),h.ref=Ze(d,f),h["return"]=a,a=h)}return g(a);case Se:a:{for(m=f.key;null!==d;){if(d.key===
m)if(7===d.tag){c(a,d.sibling);d=e(d,f,h);d["return"]=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=we(f,a.internalContextTag,h);d["return"]=a;a=d}return g(a);case Te:a:{if(null!==d)if(9===d.tag){c(a,d.sibling);d=e(d,null,h);d.type=f.value;d["return"]=a;a=d;break a}else c(a,d);d=xe(f,a.internalContextTag,h);d.type=f.value;d["return"]=a;a=d}return g(a);case Ue:a:{for(m=f.key;null!==d;){if(d.key===m)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===
f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d["return"]=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=ye(f,a.internalContextTag,h);d["return"]=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h)):(c(a,d),d=ve(f,a.internalContextTag,h)),d["return"]=a,a=d,g(a);if(Ye(f))return L(a,d,f,h);if(Xe(f))return N(a,d,f,h);m&&$e(a,f);if("undefined"===typeof f)switch(a.tag){case 2:case 1:h=a.type,E("152",h.displayName||
h.name||"Component")}return c(a,d)}}var bf=af(!0),cf=af(!1);
function df(a,b,c,d,e){function f(a,b,c){var d=b.expirationTime;b.child=null===a?cf(b,null,c,d):bf(b,a.child,c,d)}function g(a,b){var c=b.ref;null===c||a&&a.ref===c||(b.effectTag|=128)}function h(a,b,c,d){g(a,b);if(!c)return d&&re(b,!1),q(a,b);c=b.stateNode;id.current=b;var e=c.render();b.effectTag|=1;f(a,b,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&re(b,!0);return b.child}function k(a){var b=a.stateNode;b.pendingContext?oe(a,b.pendingContext,b.pendingContext!==b.context):b.context&&oe(a,
b.context,!1);I(a,b.containerInfo)}function q(a,b){null!==a&&b.child!==a.child?E("153"):void 0;if(null!==b.child){a=b.child;var c=se(a,a.pendingProps,a.expirationTime);b.child=c;for(c["return"]=b;null!==a.sibling;)a=a.sibling,c=c.sibling=se(a,a.pendingProps,a.expirationTime),c["return"]=b;c.sibling=null}return b.child}function v(a,b){switch(b.tag){case 3:k(b);break;case 2:qe(b);break;case 4:I(b,b.stateNode.containerInfo)}return null}var y=a.shouldSetTextContent,u=a.useSyncScheduling,z=a.shouldDeprioritizeSubtree,
G=b.pushHostContext,I=b.pushHostContainer,L=c.enterHydrationState,N=c.resetHydrationState,J=c.tryToClaimNextHydratableInstance;a=Le(d,e,function(a,b){a.memoizedProps=b},function(a,b){a.memoizedState=b});var w=a.adoptClassInstance,m=a.constructClassInstance,A=a.mountClassInstance,Ob=a.updateClassInstance;return{beginWork:function(a,b,c){if(0===b.expirationTime||b.expirationTime>c)return v(a,b);switch(b.tag){case 0:null!==a?E("155"):void 0;var d=b.type,e=b.pendingProps,r=ke(b);r=me(b,r);d=d(e,r);b.effectTag|=
1;"object"===typeof d&&null!==d&&"function"===typeof d.render?(b.tag=2,e=qe(b),w(b,d),A(b,c),b=h(a,b,!0,e)):(b.tag=1,f(a,b,d),b.memoizedProps=e,b=b.child);return b;case 1:a:{e=b.type;c=b.pendingProps;d=b.memoizedProps;if(X.current)null===c&&(c=d);else if(null===c||d===c){b=q(a,b);break a}d=ke(b);d=me(b,d);e=e(c,d);b.effectTag|=1;f(a,b,e);b.memoizedProps=c;b=b.child}return b;case 2:return e=qe(b),d=void 0,null===a?b.stateNode?E("153"):(m(b,b.pendingProps),A(b,c),d=!0):d=Ob(a,b,c),h(a,b,d,e);case 3:return k(b),
e=b.updateQueue,null!==e?(d=b.memoizedState,e=Je(a,b,e,null,null,c),d===e?(N(),b=q(a,b)):(d=e.element,r=b.stateNode,(null===a||null===a.child)&&r.hydrate&&L(b)?(b.effectTag|=2,b.child=cf(b,null,d,c)):(N(),f(a,b,d)),b.memoizedState=e,b=b.child)):(N(),b=q(a,b)),b;case 5:G(b);null===a&&J(b);e=b.type;var n=b.memoizedProps;d=b.pendingProps;null===d&&(d=n,null===d?E("154"):void 0);r=null!==a?a.memoizedProps:null;X.current||null!==d&&n!==d?(n=d.children,y(e,d)?n=null:r&&y(e,r)&&(b.effectTag|=16),g(a,b),
2147483647!==c&&!u&&z(e,d)?(b.expirationTime=2147483647,b=null):(f(a,b,n),b.memoizedProps=d,b=b.child)):b=q(a,b);return b;case 6:return null===a&&J(b),a=b.pendingProps,null===a&&(a=b.memoizedProps),b.memoizedProps=a,null;case 8:b.tag=7;case 7:e=b.pendingProps;if(X.current)null===e&&(e=a&&a.memoizedProps,null===e?E("154"):void 0);else if(null===e||b.memoizedProps===e)e=b.memoizedProps;d=e.children;b.stateNode=null===a?cf(b,b.stateNode,d,c):bf(b,b.stateNode,d,c);b.memoizedProps=e;return b.stateNode;
case 9:return null;case 4:a:{I(b,b.stateNode.containerInfo);e=b.pendingProps;if(X.current)null===e&&(e=a&&a.memoizedProps,null==e?E("154"):void 0);else if(null===e||b.memoizedProps===e){b=q(a,b);break a}null===a?b.child=bf(b,null,e,c):f(a,b,e);b.memoizedProps=e;b=b.child}return b;case 10:a:{c=b.pendingProps;if(X.current)null===c&&(c=b.memoizedProps);else if(null===c||b.memoizedProps===c){b=q(a,b);break a}f(a,b,c);b.memoizedProps=c;b=b.child}return b;default:E("156")}},beginFailedWork:function(a,b,
c){switch(b.tag){case 2:qe(b);break;case 3:k(b);break;default:E("157")}b.effectTag|=64;null===a?b.child=null:b.child!==a.child&&(b.child=a.child);if(0===b.expirationTime||b.expirationTime>c)return v(a,b);b.firstEffect=null;b.lastEffect=null;b.child=null===a?cf(b,null,null,c):bf(b,a.child,null,c);2===b.tag&&(a=b.stateNode,b.memoizedProps=a.props,b.memoizedState=a.state);return b.child}}}
function ef(a,b,c){function d(a){a.effectTag|=4}var e=a.createInstance,f=a.createTextInstance,g=a.appendInitialChild,h=a.finalizeInitialChildren,k=a.prepareUpdate,q=a.persistence,v=b.getRootHostContainer,y=b.popHostContext,u=b.getHostContext,z=b.popHostContainer,G=c.prepareToHydrateHostInstance,I=c.prepareToHydrateHostTextInstance,L=c.popHydrationState,N=void 0,J=void 0,w=void 0;a.mutation?(N=function(){},J=function(a,b,c){(b.updateQueue=c)&&d(b)},w=function(a,b,c,e){c!==e&&d(b)}):q?E("235"):E("236");
return{completeWork:function(a,b,c){var m=b.pendingProps;if(null===m)m=b.memoizedProps;else if(2147483647!==b.expirationTime||2147483647===c)b.pendingProps=null;switch(b.tag){case 1:return null;case 2:return ne(b),null;case 3:z(b);V(X,b);V(ie,b);m=b.stateNode;m.pendingContext&&(m.context=m.pendingContext,m.pendingContext=null);if(null===a||null===a.child)L(b),b.effectTag&=-3;N(b);return null;case 5:y(b);c=v();var A=b.type;if(null!==a&&null!=b.stateNode){var p=a.memoizedProps,q=b.stateNode,x=u();q=
k(q,A,p,m,c,x);J(a,b,q,A,p,m,c);a.ref!==b.ref&&(b.effectTag|=128)}else{if(!m)return null===b.stateNode?E("166"):void 0,null;a=u();if(L(b))G(b,c,a)&&d(b);else{a=e(A,m,c,a,b);a:for(p=b.child;null!==p;){if(5===p.tag||6===p.tag)g(a,p.stateNode);else if(4!==p.tag&&null!==p.child){p.child["return"]=p;p=p.child;continue}if(p===b)break;for(;null===p.sibling;){if(null===p["return"]||p["return"]===b)break a;p=p["return"]}p.sibling["return"]=p["return"];p=p.sibling}h(a,A,m,c)&&d(b);b.stateNode=a}null!==b.ref&&
(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)w(a,b,a.memoizedProps,m);else{if("string"!==typeof m)return null===b.stateNode?E("166"):void 0,null;a=v();c=u();L(b)?I(b)&&d(b):b.stateNode=f(m,a,c,b)}return null;case 7:(m=b.memoizedProps)?void 0:E("165");b.tag=8;A=[];a:for((p=b.stateNode)&&(p["return"]=b);null!==p;){if(5===p.tag||6===p.tag||4===p.tag)E("247");else if(9===p.tag)A.push(p.type);else if(null!==p.child){p.child["return"]=p;p=p.child;continue}for(;null===p.sibling;){if(null===
p["return"]||p["return"]===b)break a;p=p["return"]}p.sibling["return"]=p["return"];p=p.sibling}p=m.handler;m=p(m.props,A);b.child=bf(b,null!==a?a.child:null,m,c);return b.child;case 8:return b.tag=7,null;case 9:return null;case 10:return null;case 4:return z(b),N(b),null;case 0:E("167");default:E("156")}}}}
function ff(a,b){function c(a){var c=a.ref;if(null!==c)try{c(null)}catch(A){b(a,A)}}function d(a){"function"===typeof Ee&&Ee(a);switch(a.tag){case 2:c(a);var d=a.stateNode;if("function"===typeof d.componentWillUnmount)try{d.props=a.memoizedProps,d.state=a.memoizedState,d.componentWillUnmount()}catch(A){b(a,A)}break;case 5:c(a);break;case 7:e(a.stateNode);break;case 4:k&&g(a)}}function e(a){for(var b=a;;)if(d(b),null===b.child||k&&4===b.tag){if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||
b["return"]===a)return;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}else b.child["return"]=b,b=b.child}function f(a){return 5===a.tag||3===a.tag||4===a.tag}function g(a){for(var b=a,c=!1,f=void 0,g=void 0;;){if(!c){c=b["return"];a:for(;;){null===c?E("160"):void 0;switch(c.tag){case 5:f=c.stateNode;g=!1;break a;case 3:f=c.stateNode.containerInfo;g=!0;break a;case 4:f=c.stateNode.containerInfo;g=!0;break a}c=c["return"]}c=!0}if(5===b.tag||6===b.tag)e(b),g?J(f,b.stateNode):N(f,b.stateNode);
else if(4===b.tag?f=b.stateNode.containerInfo:d(b),null!==b.child){b.child["return"]=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"];4===b.tag&&(c=!1)}b.sibling["return"]=b["return"];b=b.sibling}}var h=a.getPublicInstance,k=a.mutation;a=a.persistence;k||(a?E("235"):E("236"));var q=k.commitMount,v=k.commitUpdate,y=k.resetTextContent,u=k.commitTextUpdate,z=k.appendChild,G=k.appendChildToContainer,I=k.insertBefore,L=k.insertInContainerBefore,
N=k.removeChild,J=k.removeChildFromContainer;return{commitResetTextContent:function(a){y(a.stateNode)},commitPlacement:function(a){a:{for(var b=a["return"];null!==b;){if(f(b)){var c=b;break a}b=b["return"]}E("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:E("161")}c.effectTag&16&&(y(b),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c["return"]||f(c["return"])){c=
null;break a}c=c["return"]}c.sibling["return"]=c["return"];for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;if(null===c.child||4===c.tag)continue b;else c.child["return"]=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)c?d?L(b,e.stateNode,c):I(b,e.stateNode,c):d?G(b,e.stateNode):z(b,e.stateNode);else if(4!==e.tag&&null!==e.child){e.child["return"]=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e["return"]||e["return"]===
a)return;e=e["return"]}e.sibling["return"]=e["return"];e=e.sibling}},commitDeletion:function(a){g(a);a["return"]=null;a.child=null;a.alternate&&(a.alternate.child=null,a.alternate["return"]=null)},commitWork:function(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&v(c,f,e,a,d,b)}break;case 6:null===b.stateNode?E("162"):void 0;c=b.memoizedProps;u(b.stateNode,null!==a?a.memoizedProps:
c,c);break;case 3:break;default:E("163")}},commitLifeCycles:function(a,b){switch(b.tag){case 2:var c=b.stateNode;if(b.effectTag&4)if(null===a)c.props=b.memoizedProps,c.state=b.memoizedState,c.componentDidMount();else{var d=a.memoizedProps;a=a.memoizedState;c.props=b.memoizedProps;c.state=b.memoizedState;c.componentDidUpdate(d,a)}b=b.updateQueue;null!==b&&Ke(b,c);break;case 3:c=b.updateQueue;null!==c&&Ke(c,null!==b.child?b.child.stateNode:null);break;case 5:c=b.stateNode;null===a&&b.effectTag&4&&q(c,
b.type,b.memoizedProps,b);break;case 6:break;case 4:break;default:E("163")}},commitAttachRef:function(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:b(h(c));break;default:b(c)}}},commitDetachRef:function(a){a=a.ref;null!==a&&a(null)}}}var gf={};
function hf(a){function b(a){a===gf?E("174"):void 0;return a}var c=a.getChildHostContext,d=a.getRootHostContext,e={current:gf},f={current:gf},g={current:gf};return{getHostContext:function(){return b(e.current)},getRootHostContainer:function(){return b(g.current)},popHostContainer:function(a){V(e,a);V(f,a);V(g,a)},popHostContext:function(a){f.current===a&&(V(e,a),V(f,a))},pushHostContainer:function(a,b){W(g,b,a);b=d(b);W(f,a,a);W(e,b,a)},pushHostContext:function(a){var d=b(g.current),h=b(e.current);
d=c(h,a.type,d);h!==d&&(W(f,a,a),W(e,d,a))},resetHostContainer:function(){e.current=gf;g.current=gf}}}
function jf(a){function b(a,b){var c=new Y(5,null,0);c.type="DELETED";c.stateNode=b;c["return"]=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function c(a,b){switch(a.tag){case 5:return b=f(b,a.type,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;case 6:return b=g(b,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;default:return!1}}function d(a){for(a=a["return"];null!==a&&5!==a.tag&&3!==a.tag;)a=a["return"];y=a}var e=a.shouldSetTextContent;
a=a.hydration;if(!a)return{enterHydrationState:function(){return!1},resetHydrationState:function(){},tryToClaimNextHydratableInstance:function(){},prepareToHydrateHostInstance:function(){E("175")},prepareToHydrateHostTextInstance:function(){E("176")},popHydrationState:function(){return!1}};var f=a.canHydrateInstance,g=a.canHydrateTextInstance,h=a.getNextHydratableSibling,k=a.getFirstHydratableChild,q=a.hydrateInstance,v=a.hydrateTextInstance,y=null,u=null,z=!1;return{enterHydrationState:function(a){u=
k(a.stateNode.containerInfo);y=a;return z=!0},resetHydrationState:function(){u=y=null;z=!1},tryToClaimNextHydratableInstance:function(a){if(z){var d=u;if(d){if(!c(a,d)){d=h(d);if(!d||!c(a,d)){a.effectTag|=2;z=!1;y=a;return}b(y,u)}y=a;u=k(d)}else a.effectTag|=2,z=!1,y=a}},prepareToHydrateHostInstance:function(a,b,c){b=q(a.stateNode,a.type,a.memoizedProps,b,c,a);a.updateQueue=b;return null!==b?!0:!1},prepareToHydrateHostTextInstance:function(a){return v(a.stateNode,a.memoizedProps,a)},popHydrationState:function(a){if(a!==
y)return!1;if(!z)return d(a),z=!0,!1;var c=a.type;if(5!==a.tag||"head"!==c&&"body"!==c&&!e(c,a.memoizedProps))for(c=u;c;)b(a,c),c=h(c);d(a);u=y?h(a.stateNode):null;return!0}}}
function kf(a){function b(a){Qb=ja=!0;var b=a.stateNode;b.current===a?E("177"):void 0;b.isReadyForCommit=!1;id.current=null;if(1<a.effectTag)if(null!==a.lastEffect){a.lastEffect.nextEffect=a;var c=a.firstEffect}else c=a;else c=a.firstEffect;yg();for(t=c;null!==t;){var d=!1,e=void 0;try{for(;null!==t;){var f=t.effectTag;f&16&&zg(t);if(f&128){var g=t.alternate;null!==g&&Ag(g)}switch(f&-242){case 2:Ne(t);t.effectTag&=-3;break;case 6:Ne(t);t.effectTag&=-3;Oe(t.alternate,t);break;case 4:Oe(t.alternate,
t);break;case 8:Sc=!0,Bg(t),Sc=!1}t=t.nextEffect}}catch(Tc){d=!0,e=Tc}d&&(null===t?E("178"):void 0,h(t,e),null!==t&&(t=t.nextEffect))}Cg();b.current=a;for(t=c;null!==t;){c=!1;d=void 0;try{for(;null!==t;){var k=t.effectTag;k&36&&Dg(t.alternate,t);k&128&&Eg(t);if(k&64)switch(e=t,f=void 0,null!==R&&(f=R.get(e),R["delete"](e),null==f&&null!==e.alternate&&(e=e.alternate,f=R.get(e),R["delete"](e))),null==f?E("184"):void 0,e.tag){case 2:e.stateNode.componentDidCatch(f.error,{componentStack:f.componentStack});
break;case 3:null===ca&&(ca=f.error);break;default:E("157")}var Qc=t.nextEffect;t.nextEffect=null;t=Qc}}catch(Tc){c=!0,d=Tc}c&&(null===t?E("178"):void 0,h(t,d),null!==t&&(t=t.nextEffect))}ja=Qb=!1;"function"===typeof De&&De(a.stateNode);ha&&(ha.forEach(G),ha=null);null!==ca&&(a=ca,ca=null,Ob(a));b=b.current.expirationTime;0===b&&(qa=R=null);return b}function c(a){for(;;){var b=Fg(a.alternate,a,H),c=a["return"],d=a.sibling;var e=a;if(2147483647===H||2147483647!==e.expirationTime){if(2!==e.tag&&3!==
e.tag)var f=0;else f=e.updateQueue,f=null===f?0:f.expirationTime;for(var g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=g.expirationTime),g=g.sibling;e.expirationTime=f}if(null!==b)return b;null!==c&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;
if(null!==c)a=c;else{a.stateNode.isReadyForCommit=!0;break}}return null}function d(a){var b=rg(a.alternate,a,H);null===b&&(b=c(a));id.current=null;return b}function e(a){var b=Gg(a.alternate,a,H);null===b&&(b=c(a));id.current=null;return b}function f(a){if(null!==R){if(!(0===H||H>a))if(H<=Uc)for(;null!==F;)F=k(F)?e(F):d(F);else for(;null!==F&&!A();)F=k(F)?e(F):d(F)}else if(!(0===H||H>a))if(H<=Uc)for(;null!==F;)F=d(F);else for(;null!==F&&!A();)F=d(F)}function g(a,b){ja?E("243"):void 0;ja=!0;a.isReadyForCommit=
!1;if(a!==ra||b!==H||null===F){for(;-1<he;)ge[he]=null,he--;je=D;ie.current=D;X.current=!1;x();ra=a;H=b;F=se(ra.current,null,b)}var c=!1,d=null;try{f(b)}catch(Rc){c=!0,d=Rc}for(;c;){if(eb){ca=d;break}var g=F;if(null===g)eb=!0;else{var k=h(g,d);null===k?E("183"):void 0;if(!eb){try{c=k;d=b;for(k=c;null!==g;){switch(g.tag){case 2:ne(g);break;case 5:qg(g);break;case 3:p(g);break;case 4:p(g)}if(g===k||g.alternate===k)break;g=g["return"]}F=e(c);f(d)}catch(Rc){c=!0;d=Rc;continue}break}}}b=ca;eb=ja=!1;ca=
null;null!==b&&Ob(b);return a.isReadyForCommit?a.current.alternate:null}function h(a,b){var c=id.current=null,d=!1,e=!1,f=null;if(3===a.tag)c=a,q(a)&&(eb=!0);else for(var g=a["return"];null!==g&&null===c;){2===g.tag?"function"===typeof g.stateNode.componentDidCatch&&(d=!0,f=jd(g),c=g,e=!0):3===g.tag&&(c=g);if(q(g)){if(Sc||null!==ha&&(ha.has(g)||null!==g.alternate&&ha.has(g.alternate)))return null;c=null;e=!1}g=g["return"]}if(null!==c){null===qa&&(qa=new Set);qa.add(c);var h="";g=a;do{a:switch(g.tag){case 0:case 1:case 2:case 5:var k=
g._debugOwner,Qc=g._debugSource;var m=jd(g);var n=null;k&&(n=jd(k));k=Qc;m="\n    in "+(m||"Unknown")+(k?" (at "+k.fileName.replace(/^.*[\\\/]/,"")+":"+k.lineNumber+")":n?" (created by "+n+")":"");break a;default:m=""}h+=m;g=g["return"]}while(g);g=h;a=jd(a);null===R&&(R=new Map);b={componentName:a,componentStack:g,error:b,errorBoundary:d?c.stateNode:null,errorBoundaryFound:d,errorBoundaryName:f,willRetry:e};R.set(c,b);try{var p=b.error;p&&p.suppressReactErrorLogging||console.error(p)}catch(Vc){Vc&&
Vc.suppressReactErrorLogging||console.error(Vc)}Qb?(null===ha&&(ha=new Set),ha.add(c)):G(c);return c}null===ca&&(ca=b);return null}function k(a){return null!==R&&(R.has(a)||null!==a.alternate&&R.has(a.alternate))}function q(a){return null!==qa&&(qa.has(a)||null!==a.alternate&&qa.has(a.alternate))}function v(){return 20*(((I()+100)/20|0)+1)}function y(a){return 0!==ka?ka:ja?Qb?1:H:!Hg||a.internalContextTag&1?v():1}function u(a,b){return z(a,b,!1)}function z(a,b){for(;null!==a;){if(0===a.expirationTime||
a.expirationTime>b)a.expirationTime=b;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>b)&&(a.alternate.expirationTime=b);if(null===a["return"])if(3===a.tag){var c=a.stateNode;!ja&&c===ra&&b<H&&(F=ra=null,H=0);var d=c,e=b;Rb>Ig&&E("185");if(null===d.nextScheduledRoot)d.remainingExpirationTime=e,null===O?(sa=O=d,d.nextScheduledRoot=d):(O=O.nextScheduledRoot=d,O.nextScheduledRoot=sa);else{var f=d.remainingExpirationTime;if(0===f||e<f)d.remainingExpirationTime=e}Fa||(la?
Sb&&(ma=d,na=1,m(ma,na)):1===e?w(1,null):L(e));!ja&&c===ra&&b<H&&(F=ra=null,H=0)}else break;a=a["return"]}}function G(a){z(a,1,!0)}function I(){return Uc=((Wc()-Pe)/10|0)+2}function L(a){if(0!==Tb){if(a>Tb)return;Jg(Xc)}var b=Wc()-Pe;Tb=a;Xc=Kg(J,{timeout:10*(a-2)-b})}function N(){var a=0,b=null;if(null!==O)for(var c=O,d=sa;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===O?E("244"):void 0;if(d===d.nextScheduledRoot){sa=O=d.nextScheduledRoot=null;break}else if(d===sa)sa=e=d.nextScheduledRoot,
O.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===O){O=c;O.nextScheduledRoot=sa;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===O)break;c=d;d=d.nextScheduledRoot}}c=ma;null!==c&&c===b?Rb++:Rb=0;ma=b;na=a}function J(a){w(0,a)}function w(a,b){fb=b;for(N();null!==ma&&0!==na&&(0===a||na<=a)&&!Yc;)m(ma,na),N();null!==fb&&(Tb=0,Xc=-1);0!==na&&L(na);fb=null;Yc=!1;Rb=0;if(Ub)throw a=Zc,Zc=
null,Ub=!1,a;}function m(a,c){Fa?E("245"):void 0;Fa=!0;if(c<=I()){var d=a.finishedWork;null!==d?(a.finishedWork=null,a.remainingExpirationTime=b(d)):(a.finishedWork=null,d=g(a,c),null!==d&&(a.remainingExpirationTime=b(d)))}else d=a.finishedWork,null!==d?(a.finishedWork=null,a.remainingExpirationTime=b(d)):(a.finishedWork=null,d=g(a,c),null!==d&&(A()?a.finishedWork=d:a.remainingExpirationTime=b(d)));Fa=!1}function A(){return null===fb||fb.timeRemaining()>Lg?!1:Yc=!0}function Ob(a){null===ma?E("246"):
void 0;ma.remainingExpirationTime=0;Ub||(Ub=!0,Zc=a)}var r=hf(a),n=jf(a),p=r.popHostContainer,qg=r.popHostContext,x=r.resetHostContainer,Me=df(a,r,n,u,y),rg=Me.beginWork,Gg=Me.beginFailedWork,Fg=ef(a,r,n).completeWork;r=ff(a,h);var zg=r.commitResetTextContent,Ne=r.commitPlacement,Bg=r.commitDeletion,Oe=r.commitWork,Dg=r.commitLifeCycles,Eg=r.commitAttachRef,Ag=r.commitDetachRef,Wc=a.now,Kg=a.scheduleDeferredCallback,Jg=a.cancelDeferredCallback,Hg=a.useSyncScheduling,yg=a.prepareForCommit,Cg=a.resetAfterCommit,
Pe=Wc(),Uc=2,ka=0,ja=!1,F=null,ra=null,H=0,t=null,R=null,qa=null,ha=null,ca=null,eb=!1,Qb=!1,Sc=!1,sa=null,O=null,Tb=0,Xc=-1,Fa=!1,ma=null,na=0,Yc=!1,Ub=!1,Zc=null,fb=null,la=!1,Sb=!1,Ig=1E3,Rb=0,Lg=1;return{computeAsyncExpiration:v,computeExpirationForFiber:y,scheduleWork:u,batchedUpdates:function(a,b){var c=la;la=!0;try{return a(b)}finally{(la=c)||Fa||w(1,null)}},unbatchedUpdates:function(a){if(la&&!Sb){Sb=!0;try{return a()}finally{Sb=!1}}return a()},flushSync:function(a){var b=la;la=!0;try{a:{var c=
ka;ka=1;try{var d=a();break a}finally{ka=c}d=void 0}return d}finally{la=b,Fa?E("187"):void 0,w(1,null)}},deferredUpdates:function(a){var b=ka;ka=v();try{return a()}finally{ka=b}}}}
function lf(a){function b(a){a=od(a);return null===a?null:a.stateNode}var c=a.getPublicInstance;a=kf(a);var d=a.computeAsyncExpiration,e=a.computeExpirationForFiber,f=a.scheduleWork;return{createContainer:function(a,b){var c=new Y(3,null,0);a={current:c,containerInfo:a,pendingChildren:null,remainingExpirationTime:0,isReadyForCommit:!1,finishedWork:null,context:null,pendingContext:null,hydrate:b,nextScheduledRoot:null};return c.stateNode=a},updateContainer:function(a,b,c,q){var g=b.current;if(c){c=
c._reactInternalFiber;var h;b:{2===kd(c)&&2===c.tag?void 0:E("170");for(h=c;3!==h.tag;){if(le(h)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}(h=h["return"])?void 0:E("171")}h=h.stateNode.context}c=le(c)?pe(c,h):h}else c=D;null===b.context?b.context=c:b.pendingContext=c;b=q;b=void 0===b?null:b;q=null!=a&&null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent?d():e(g);He(g,{expirationTime:q,partialState:{element:a},callback:b,isReplace:!1,isForced:!1,
nextCallback:null,next:null});f(g,q)},batchedUpdates:a.batchedUpdates,unbatchedUpdates:a.unbatchedUpdates,deferredUpdates:a.deferredUpdates,flushSync:a.flushSync,getPublicRootInstance:function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return c(a.child.stateNode);default:return a.child.stateNode}},findHostInstance:b,findHostInstanceWithNoPortals:function(a){a=pd(a);return null===a?null:a.stateNode},injectIntoDevTools:function(a){var c=a.findFiberByHostInstance;return Ce(B({},
a,{findHostInstanceByFiber:function(a){return b(a)},findFiberByHostInstance:function(a){return c?c(a):null}}))}}}var mf=Object.freeze({default:lf}),nf=mf&&lf||mf,of=nf["default"]?nf["default"]:nf;function pf(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Ue,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}var qf="object"===typeof performance&&"function"===typeof performance.now,rf=void 0;rf=qf?function(){return performance.now()}:function(){return Date.now()};
var sf=void 0,tf=void 0;
if(l.canUseDOM)if("function"!==typeof requestIdleCallback||"function"!==typeof cancelIdleCallback){var uf=null,vf=!1,wf=-1,xf=!1,yf=0,zf=33,Af=33,Bf;Bf=qf?{didTimeout:!1,timeRemaining:function(){var a=yf-performance.now();return 0<a?a:0}}:{didTimeout:!1,timeRemaining:function(){var a=yf-Date.now();return 0<a?a:0}};var Cf="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===Cf){vf=!1;a=rf();if(0>=yf-a)if(-1!==wf&&wf<=
a)Bf.didTimeout=!0;else{xf||(xf=!0,requestAnimationFrame(Df));return}else Bf.didTimeout=!1;wf=-1;a=uf;uf=null;null!==a&&a(Bf)}},!1);var Df=function(a){xf=!1;var b=a-yf+Af;b<Af&&zf<Af?(8>b&&(b=8),Af=b<zf?zf:b):zf=b;yf=a+Af;vf||(vf=!0,window.postMessage(Cf,"*"))};sf=function(a,b){uf=a;null!=b&&"number"===typeof b.timeout&&(wf=rf()+b.timeout);xf||(xf=!0,requestAnimationFrame(Df));return 0};tf=function(){uf=null;vf=!1;wf=-1}}else sf=window.requestIdleCallback,tf=window.cancelIdleCallback;else sf=function(a){return setTimeout(function(){a({timeRemaining:function(){return Infinity}})})},
tf=function(a){clearTimeout(a)};var Ef=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ff={},Gf={};
function Hf(a){if(Gf.hasOwnProperty(a))return!0;if(Ff.hasOwnProperty(a))return!1;if(Ef.test(a))return Gf[a]=!0;Ff[a]=!0;return!1}
function If(a,b,c){var d=wa(b);if(d&&va(b,c)){var e=d.mutationMethod;e?e(a,c):null==c||d.hasBooleanValue&&!c||d.hasNumericValue&&isNaN(c)||d.hasPositiveNumericValue&&1>c||d.hasOverloadedBooleanValue&&!1===c?Jf(a,b):d.mustUseProperty?a[d.propertyName]=c:(b=d.attributeName,(e=d.attributeNamespace)?a.setAttributeNS(e,b,""+c):d.hasBooleanValue||d.hasOverloadedBooleanValue&&!0===c?a.setAttribute(b,""):a.setAttribute(b,""+c))}else Kf(a,b,va(b,c)?c:null)}
function Kf(a,b,c){Hf(b)&&(null==c?a.removeAttribute(b):a.setAttribute(b,""+c))}function Jf(a,b){var c=wa(b);c?(b=c.mutationMethod)?b(a,void 0):c.mustUseProperty?a[c.propertyName]=c.hasBooleanValue?!1:"":a.removeAttribute(c.attributeName):a.removeAttribute(b)}
function Lf(a,b){var c=b.value,d=b.checked;return B({type:void 0,step:void 0,min:void 0,max:void 0},b,{defaultChecked:void 0,defaultValue:void 0,value:null!=c?c:a._wrapperState.initialValue,checked:null!=d?d:a._wrapperState.initialChecked})}function Mf(a,b){var c=b.defaultValue;a._wrapperState={initialChecked:null!=b.checked?b.checked:b.defaultChecked,initialValue:null!=b.value?b.value:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}
function Nf(a,b){b=b.checked;null!=b&&If(a,"checked",b)}function Of(a,b){Nf(a,b);var c=b.value;if(null!=c)if(0===c&&""===a.value)a.value="0";else if("number"===b.type){if(b=parseFloat(a.value)||0,c!=b||c==b&&a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else null==b.value&&null!=b.defaultValue&&a.defaultValue!==""+b.defaultValue&&(a.defaultValue=""+b.defaultValue),null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function Pf(a,b){switch(b.type){case "submit":case "reset":break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":a.value="";a.value=a.defaultValue;break;default:a.value=a.value}b=a.name;""!==b&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==b&&(a.name=b)}function Qf(a){var b="";aa.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}
function Rf(a,b){a=B({children:void 0},b);if(b=Qf(b.children))a.children=b;return a}function Sf(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function Tf(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}}function Uf(a,b){null!=b.dangerouslySetInnerHTML?E("91"):void 0;return B({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Vf(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?E("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:E("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c}}
function Wf(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)}function Xf(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Yf={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Zf(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $f(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Zf(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var ag=void 0,bg=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Yf.svg||"innerHTML"in a)a.innerHTML=b;else{ag=ag||document.createElement("div");ag.innerHTML="\x3csvg\x3e"+b+"\x3c/svg\x3e";for(b=ag.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function cg(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var dg={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},eg=["Webkit","ms","Moz","O"];Object.keys(dg).forEach(function(a){eg.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dg[b]=dg[a]})});
function fg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||dg.hasOwnProperty(e)&&dg[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var gg=B({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function hg(a,b,c){b&&(gg[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?E("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?E("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:E("61")),null!=b.style&&"object"!==typeof b.style?E("62",c()):void 0)}
function ig(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var jg=Yf.html,kg=C.thatReturns("");
function lg(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Hd(a);b=Sa[b];for(var d=0;d<b.length;d++){var e=b[d];c.hasOwnProperty(e)&&c[e]||("topScroll"===e?wd("topScroll","scroll",a):"topFocus"===e||"topBlur"===e?(wd("topFocus","focus",a),wd("topBlur","blur",a),c.topBlur=!0,c.topFocus=!0):"topCancel"===e?(yc("cancel",!0)&&wd("topCancel","cancel",a),c.topCancel=!0):"topClose"===e?(yc("close",!0)&&wd("topClose","close",a),c.topClose=!0):Dd.hasOwnProperty(e)&&U(e,Dd[e],a),c[e]=!0)}}
var mg={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",
topWaiting:"waiting"};function ng(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===jg&&(d=Zf(a));d===jg?"script"===a?(a=c.createElement("div"),a.innerHTML="\x3cscript\x3e\x3c/script\x3e",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function og(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
function pg(a,b,c,d){var e=ig(b,c);switch(b){case "iframe":case "object":U("topLoad","load",a);var f=c;break;case "video":case "audio":for(f in mg)mg.hasOwnProperty(f)&&U(f,mg[f],a);f=c;break;case "source":U("topError","error",a);f=c;break;case "img":case "image":U("topError","error",a);U("topLoad","load",a);f=c;break;case "form":U("topReset","reset",a);U("topSubmit","submit",a);f=c;break;case "details":U("topToggle","toggle",a);f=c;break;case "input":Mf(a,c);f=Lf(a,c);U("topInvalid","invalid",a);
lg(d,"onChange");break;case "option":f=Rf(a,c);break;case "select":Tf(a,c);f=B({},c,{value:void 0});U("topInvalid","invalid",a);lg(d,"onChange");break;case "textarea":Vf(a,c);f=Uf(a,c);U("topInvalid","invalid",a);lg(d,"onChange");break;default:f=c}hg(b,f,kg);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?fg(a,k,kg):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&bg(a,k)):"children"===h?"string"===typeof k?("textarea"!==b||""!==k)&&cg(a,k):"number"===typeof k&&cg(a,
""+k):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(Ra.hasOwnProperty(h)?null!=k&&lg(d,h):e?Kf(a,h,k):null!=k&&If(a,h,k))}switch(b){case "input":Bc(a);Pf(a,c);break;case "textarea":Bc(a);Xf(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?Sf(a,!!c.multiple,b,!1):null!=c.defaultValue&&Sf(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=
C)}}
function sg(a,b,c,d,e){var f=null;switch(b){case "input":c=Lf(a,c);d=Lf(a,d);f=[];break;case "option":c=Rf(a,c);d=Rf(a,d);f=[];break;case "select":c=B({},c,{value:void 0});d=B({},d,{value:void 0});f=[];break;case "textarea":c=Uf(a,c);d=Uf(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=C)}hg(b,d,kg);var g,h;a=null;for(g in c)if(!d.hasOwnProperty(g)&&c.hasOwnProperty(g)&&null!=c[g])if("style"===g)for(h in b=c[g],b)b.hasOwnProperty(h)&&(a||(a={}),a[h]=
"");else"dangerouslySetInnerHTML"!==g&&"children"!==g&&"suppressContentEditableWarning"!==g&&"suppressHydrationWarning"!==g&&"autoFocus"!==g&&(Ra.hasOwnProperty(g)?f||(f=[]):(f=f||[]).push(g,null));for(g in d){var k=d[g];b=null!=c?c[g]:void 0;if(d.hasOwnProperty(g)&&k!==b&&(null!=k||null!=b))if("style"===g)if(b){for(h in b)!b.hasOwnProperty(h)||k&&k.hasOwnProperty(h)||(a||(a={}),a[h]="");for(h in k)k.hasOwnProperty(h)&&b[h]!==k[h]&&(a||(a={}),a[h]=k[h])}else a||(f||(f=[]),f.push(g,a)),a=k;else"dangerouslySetInnerHTML"===
g?(k=k?k.__html:void 0,b=b?b.__html:void 0,null!=k&&b!==k&&(f=f||[]).push(g,""+k)):"children"===g?b===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(g,""+k):"suppressContentEditableWarning"!==g&&"suppressHydrationWarning"!==g&&(Ra.hasOwnProperty(g)?(null!=k&&lg(e,g),f||b===k||(f=[])):(f=f||[]).push(g,k))}a&&(f=f||[]).push("style",a);return f}
function tg(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Nf(a,e);ig(c,d);d=ig(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?fg(a,h,kg):"dangerouslySetInnerHTML"===g?bg(a,h):"children"===g?cg(a,h):d?null!=h?Kf(a,g,h):a.removeAttribute(g):null!=h?If(a,g,h):Jf(a,g)}switch(c){case "input":Of(a,e);break;case "textarea":Wf(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?Sf(a,
!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?Sf(a,!!e.multiple,e.defaultValue,!0):Sf(a,!!e.multiple,e.multiple?[]:"",!1))}}
function ug(a,b,c,d,e){switch(b){case "iframe":case "object":U("topLoad","load",a);break;case "video":case "audio":for(var f in mg)mg.hasOwnProperty(f)&&U(f,mg[f],a);break;case "source":U("topError","error",a);break;case "img":case "image":U("topError","error",a);U("topLoad","load",a);break;case "form":U("topReset","reset",a);U("topSubmit","submit",a);break;case "details":U("topToggle","toggle",a);break;case "input":Mf(a,c);U("topInvalid","invalid",a);lg(e,"onChange");break;case "select":Tf(a,c);
U("topInvalid","invalid",a);lg(e,"onChange");break;case "textarea":Vf(a,c),U("topInvalid","invalid",a),lg(e,"onChange")}hg(b,c,kg);d=null;for(var g in c)c.hasOwnProperty(g)&&(f=c[g],"children"===g?"string"===typeof f?a.textContent!==f&&(d=["children",f]):"number"===typeof f&&a.textContent!==""+f&&(d=["children",""+f]):Ra.hasOwnProperty(g)&&null!=f&&lg(e,g));switch(b){case "input":Bc(a);Pf(a,c);break;case "textarea":Bc(a);Xf(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&
(a.onclick=C)}return d}function vg(a,b){return a.nodeValue!==b}
var wg=Object.freeze({createElement:ng,createTextNode:og,setInitialProperties:pg,diffProperties:sg,updateProperties:tg,diffHydratedProperties:ug,diffHydratedText:vg,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Of(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=
c.parentNode;c=c.querySelectorAll("input[name\x3d"+JSON.stringify(""+b)+'][type\x3d"radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=rb(d);e?void 0:E("90");Cc(d);Of(d,e)}}}break;case "textarea":Wf(a,c);break;case "select":b=c.value,null!=b&&Sf(a,!!c.multiple,b,!1)}}});nc.injectFiberControlledHostComponent(wg);var xg=null,Mg=null;function Ng(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function Og(a){a=a?9===a.nodeType?a.documentElement:a.firstChild:null;return!(!a||1!==a.nodeType||!a.hasAttribute("data-reactroot"))}
var Z=of({getRootHostContext:function(a){var b=a.nodeType;switch(b){case 9:case 11:a=(a=a.documentElement)?a.namespaceURI:$f(null,"");break;default:b=8===b?a.parentNode:a,a=b.namespaceURI||null,b=b.tagName,a=$f(a,b)}return a},getChildHostContext:function(a,b){return $f(a,b)},getPublicInstance:function(a){return a},prepareForCommit:function(){xg=td;var a=da();if(Kd(a)){if("selectionStart"in a)var b={start:a.selectionStart,end:a.selectionEnd};else a:{var c=window.getSelection&&window.getSelection();
if(c&&0!==c.rangeCount){b=c.anchorNode;var d=c.anchorOffset,e=c.focusNode;c=c.focusOffset;try{b.nodeType,e.nodeType}catch(z){b=null;break a}var f=0,g=-1,h=-1,k=0,q=0,v=a,y=null;b:for(;;){for(var u;;){v!==b||0!==d&&3!==v.nodeType||(g=f+d);v!==e||0!==c&&3!==v.nodeType||(h=f+c);3===v.nodeType&&(f+=v.nodeValue.length);if(null===(u=v.firstChild))break;y=v;v=u}for(;;){if(v===a)break b;y===b&&++k===d&&(g=f);y===e&&++q===c&&(h=f);if(null!==(u=v.nextSibling))break;v=y;y=v.parentNode}v=u}b=-1===g||-1===h?null:
{start:g,end:h}}else b=null}b=b||{start:0,end:0}}else b=null;Mg={focusedElem:a,selectionRange:b};ud(!1)},resetAfterCommit:function(){var a=Mg,b=da(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&fa(document.documentElement,c)){if(Kd(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(window.getSelection){b=window.getSelection();var e=c[Eb()].length;a=Math.min(d.start,e);d=void 0===d.end?a:Math.min(d.end,e);!b.extend&&a>
d&&(e=d,d=a,a=e);e=Jd(c,a);var f=Jd(c,d);if(e&&f&&(1!==b.rangeCount||b.anchorNode!==e.node||b.anchorOffset!==e.offset||b.focusNode!==f.node||b.focusOffset!==f.offset)){var g=document.createRange();g.setStart(e.node,e.offset);b.removeAllRanges();a>d?(b.addRange(g),b.extend(f.node,f.offset)):(g.setEnd(f.node,f.offset),b.addRange(g))}}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});ia(c);for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=
a.top}Mg=null;ud(xg);xg=null},createInstance:function(a,b,c,d,e){a=ng(a,b,c,d);a[Q]=e;a[ob]=b;return a},appendInitialChild:function(a,b){a.appendChild(b)},finalizeInitialChildren:function(a,b,c,d){pg(a,b,c,d);a:{switch(b){case "button":case "input":case "select":case "textarea":a=!!c.autoFocus;break a}a=!1}return a},prepareUpdate:function(a,b,c,d,e){return sg(a,b,c,d,e)},shouldSetTextContent:function(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===
typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html},shouldDeprioritizeSubtree:function(a,b){return!!b.hidden},createTextInstance:function(a,b,c,d){a=og(a,b);a[Q]=d;return a},now:rf,mutation:{commitMount:function(a){a.focus()},commitUpdate:function(a,b,c,d,e){a[ob]=e;tg(a,b,c,d,e)},resetTextContent:function(a){a.textContent=""},commitTextUpdate:function(a,b,c){a.nodeValue=c},appendChild:function(a,b){a.appendChild(b)},appendChildToContainer:function(a,
b){8===a.nodeType?a.parentNode.insertBefore(b,a):a.appendChild(b)},insertBefore:function(a,b,c){a.insertBefore(b,c)},insertInContainerBefore:function(a,b,c){8===a.nodeType?a.parentNode.insertBefore(b,c):a.insertBefore(b,c)},removeChild:function(a,b){a.removeChild(b)},removeChildFromContainer:function(a,b){8===a.nodeType?a.parentNode.removeChild(b):a.removeChild(b)}},hydration:{canHydrateInstance:function(a,b){return 1!==a.nodeType||b.toLowerCase()!==a.nodeName.toLowerCase()?null:a},canHydrateTextInstance:function(a,
b){return""===b||3!==a.nodeType?null:a},getNextHydratableSibling:function(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},getFirstHydratableChild:function(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},hydrateInstance:function(a,b,c,d,e,f){a[Q]=f;a[ob]=c;return ug(a,b,c,e,d)},hydrateTextInstance:function(a,b,c){a[Q]=c;return vg(a,b)},didNotMatchHydratedContainerTextInstance:function(){},didNotMatchHydratedTextInstance:function(){},
didNotHydrateContainerInstance:function(){},didNotHydrateInstance:function(){},didNotFindHydratableContainerInstance:function(){},didNotFindHydratableContainerTextInstance:function(){},didNotFindHydratableInstance:function(){},didNotFindHydratableTextInstance:function(){}},scheduleDeferredCallback:sf,cancelDeferredCallback:tf,useSyncScheduling:!0});rc=Z.batchedUpdates;
function Pg(a,b,c,d,e){Ng(c)?void 0:E("200");var f=c._reactRootContainer;if(f)Z.updateContainer(b,f,a,e);else{d=d||Og(c);if(!d)for(f=void 0;f=c.lastChild;)c.removeChild(f);var g=Z.createContainer(c,d);f=c._reactRootContainer=g;Z.unbatchedUpdates(function(){Z.updateContainer(b,g,a,e)})}return Z.getPublicRootInstance(f)}function Qg(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;Ng(b)?void 0:E("200");return pf(a,b,null,c)}
function Rg(a,b){this._reactRootContainer=Z.createContainer(a,b)}Rg.prototype.render=function(a,b){Z.updateContainer(a,this._reactRootContainer,null,b)};Rg.prototype.unmount=function(a){Z.updateContainer(null,this._reactRootContainer,null,a)};
var Sg={createPortal:Qg,findDOMNode:function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;if(b)return Z.findHostInstance(b);"function"===typeof a.render?E("188"):E("213",Object.keys(a))},hydrate:function(a,b,c){return Pg(null,a,b,!0,c)},render:function(a,b,c){return Pg(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?E("38"):void 0;return Pg(a,b,c,!1,d)},unmountComponentAtNode:function(a){Ng(a)?void 0:
E("40");return a._reactRootContainer?(Z.unbatchedUpdates(function(){Pg(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:Qg,unstable_batchedUpdates:tc,unstable_deferredUpdates:Z.deferredUpdates,flushSync:Z.flushSync,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:mb,EventPluginRegistry:Va,EventPropagators:Cb,ReactControlledComponent:qc,ReactDOMComponentTree:sb,ReactDOMEventListener:xd}};
Z.injectIntoDevTools({findFiberByHostInstance:pb,bundleType:0,version:"16.2.0",rendererPackageName:"react-dom"});var Tg=Object.freeze({default:Sg}),Ug=Tg&&Sg||Tg;module.exports=Ug["default"]?Ug["default"]:Ug;


/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!*****************************************!*\
  !*** ./node_modules/react-dom/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(/*! ./cjs/react-dom.production.min.js */ "./node_modules/react-dom/cjs/react-dom.production.min.js");
} else {}


/***/ }),

/***/ "./node_modules/react-number-format/lib/number_format.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-number-format/lib/number_format.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/react-number-format/lib/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  thousandSeparator: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.oneOf([true])]),
  decimalSeparator: _propTypes2.default.string,
  decimalScale: _propTypes2.default.number,
  fixedDecimalScale: _propTypes2.default.bool,
  displayType: _propTypes2.default.oneOf(['input', 'text']),
  prefix: _propTypes2.default.string,
  suffix: _propTypes2.default.string,
  format: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  removeFormatting: _propTypes2.default.func,
  mask: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  isNumericString: _propTypes2.default.bool,
  customInput: _propTypes2.default.func,
  allowNegative: _propTypes2.default.bool,
  onValueChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  type: _propTypes2.default.oneOf(['text', 'tel']),
  isAllowed: _propTypes2.default.func,
  renderText: _propTypes2.default.func,
  getInputRef: _propTypes2.default.func
};

var defaultProps = {
  displayType: 'input',
  decimalSeparator: '.',
  fixedDecimalScale: false,
  prefix: '',
  suffix: '',
  allowNegative: true,
  isNumericString: false,
  type: 'text',
  onValueChange: _utils.noop,
  onChange: _utils.noop,
  onKeyDown: _utils.noop,
  onMouseUp: _utils.noop,
  onFocus: _utils.noop,
  onBlur: _utils.noop,
  isAllowed: _utils.returnTrue,
  getInputRef: _utils.noop
};

var NumberFormat = function (_React$Component) {
  _inherits(NumberFormat, _React$Component);

  function NumberFormat(props) {
    _classCallCheck(this, NumberFormat);

    //validate props
    var _this = _possibleConstructorReturn(this, (NumberFormat.__proto__ || Object.getPrototypeOf(NumberFormat)).call(this, props));

    _this.validateProps();

    var formattedValue = _this.formatValueProp();

    _this.state = {
      value: formattedValue,
      numAsString: _this.removeFormatting(formattedValue)
    };

    _this.selectionBeforeInput = {
      selectionStart: 0,
      selectionEnd: 0
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(NumberFormat, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.updateValueIfRequired(prevProps);
    }
  }, {
    key: 'updateValueIfRequired',
    value: function updateValueIfRequired(prevProps) {
      var props = this.props,
          state = this.state;


      if (prevProps !== props) {
        //validate props
        this.validateProps();

        var stateValue = state.value;

        var lastNumStr = state.numAsString || '';

        var formattedValue = props.value === undefined ? this.formatNumString(lastNumStr) : this.formatValueProp();

        if (formattedValue !== stateValue) {
          this.setState({
            value: formattedValue,
            numAsString: this.removeFormatting(formattedValue)
          });
        }
      }
    }

    /** Misc methods **/

  }, {
    key: 'getFloatString',
    value: function getFloatString() {
      var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var _getSeparators = this.getSeparators(),
          decimalSeparator = _getSeparators.decimalSeparator;

      var numRegex = this.getNumberRegex(true);

      //remove negation for regex check
      var hasNegation = num[0] === '-';
      if (hasNegation) num = num.replace('-', '');

      num = (num.match(numRegex) || []).join('').replace(decimalSeparator, '.');

      //remove extra decimals
      var firstDecimalIndex = num.indexOf('.');

      if (firstDecimalIndex !== -1) {
        num = num.substring(0, firstDecimalIndex) + '.' + num.substring(firstDecimalIndex + 1, num.length).replace(new RegExp((0, _utils.escapeRegExp)(decimalSeparator), 'g'), '');
      }

      //add negation back
      if (hasNegation) num = '-' + num;

      return num;
    }

    //returned regex assumes decimalSeparator is as per prop

  }, {
    key: 'getNumberRegex',
    value: function getNumberRegex(g, ignoreDecimalSeparator) {
      var _props = this.props,
          format = _props.format,
          decimalScale = _props.decimalScale;

      var _getSeparators2 = this.getSeparators(),
          decimalSeparator = _getSeparators2.decimalSeparator;

      return new RegExp('\\d' + (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format ? '|' + (0, _utils.escapeRegExp)(decimalSeparator) : ''), g ? 'g' : undefined);
    }
  }, {
    key: 'getSeparators',
    value: function getSeparators() {
      var decimalSeparator = this.props.decimalSeparator;
      var thousandSeparator = this.props.thousandSeparator;


      if (thousandSeparator === true) {
        thousandSeparator = ',';
      }

      return {
        decimalSeparator: decimalSeparator,
        thousandSeparator: thousandSeparator
      };
    }
  }, {
    key: 'getMaskAtIndex',
    value: function getMaskAtIndex(index) {
      var _props$mask = this.props.mask,
          mask = _props$mask === undefined ? ' ' : _props$mask;

      if (typeof mask === 'string') {
        return mask;
      }

      return mask[index] || ' ';
    }
  }, {
    key: 'validateProps',
    value: function validateProps() {
      var mask = this.props.mask;

      //validate decimalSeparator and thousandSeparator

      var _getSeparators3 = this.getSeparators(),
          decimalSeparator = _getSeparators3.decimalSeparator,
          thousandSeparator = _getSeparators3.thousandSeparator;

      if (decimalSeparator === thousandSeparator) {
        throw new Error('\n          Decimal separator can\'t be same as thousand separator.\n\n          thousandSeparator: ' + thousandSeparator + ' (thousandSeparator = {true} is same as thousandSeparator = ",")\n          decimalSeparator: ' + decimalSeparator + ' (default value for decimalSeparator is .)\n       ');
      }

      //validate mask
      if (mask) {
        var maskAsStr = mask === 'string' ? mask : mask.toString();
        if (maskAsStr.match(/\d/g)) {
          throw new Error('\n          Mask ' + mask + ' should not contain numeric character;\n        ');
        }
      }
    }
    /** Misc methods end **/

    /** caret specific methods **/

  }, {
    key: 'setPatchedCaretPosition',
    value: function setPatchedCaretPosition(el, caretPos, currentValue) {
      /* setting caret position within timeout of 0ms is required for mobile chrome,
      otherwise browser resets the caret position after we set it
      We are also setting it without timeout so that in normal browser we don't see the flickering */
      (0, _utils.setCaretPosition)(el, caretPos);
      setTimeout(function () {
        if (el.value === currentValue) (0, _utils.setCaretPosition)(el, caretPos);
      }, 0);
    }

    /* This keeps the caret within typing area so people can't type in between prefix or suffix */

  }, {
    key: 'correctCaretPosition',
    value: function correctCaretPosition(value, caretPos, direction) {
      var _props2 = this.props,
          prefix = _props2.prefix,
          suffix = _props2.suffix,
          format = _props2.format;

      //caret position should be between 0 and value length

      caretPos = (0, _utils.clamp)(caretPos, 0, value.length);

      //in case of format as number limit between prefix and suffix
      if (!format) {
        var hasNegation = value[0] === '-';
        return (0, _utils.clamp)(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
      }

      //in case if custom format method don't do anything
      if (typeof format === 'function') return caretPos;

      /* in case format is string find the closest # position from the caret position */

      //in case the caretPos have input value on it don't do anything
      if (format[caretPos] === '#' && (0, _utils.charIsNumber)(value[caretPos])) return caretPos;

      //if caretPos is just after input value don't do anything
      if (format[caretPos - 1] === '#' && (0, _utils.charIsNumber)(value[caretPos - 1])) return caretPos;

      //find the nearest caret position
      var firstHashPosition = format.indexOf('#');
      var lastHashPosition = format.lastIndexOf('#');

      //limit the cursor between the first # position and the last # position
      caretPos = (0, _utils.clamp)(caretPos, firstHashPosition, lastHashPosition + 1);

      var nextPos = format.substring(caretPos, format.length).indexOf('#');
      var caretLeftBound = caretPos;
      var caretRightBoud = caretPos + (nextPos === -1 ? 0 : nextPos);

      //get the position where the last number is present
      while (caretLeftBound > firstHashPosition && (format[caretLeftBound] !== '#' || !(0, _utils.charIsNumber)(value[caretLeftBound]))) {
        caretLeftBound -= 1;
      }

      var goToLeft = !(0, _utils.charIsNumber)(value[caretRightBoud]) || direction === 'left' && caretPos !== firstHashPosition || caretPos - caretLeftBound < caretRightBoud - caretPos;

      return goToLeft ? caretLeftBound + 1 : caretRightBoud;
    }
  }, {
    key: 'getCaretPosition',
    value: function getCaretPosition(inputValue, formattedValue, caretPos) {
      var format = this.props.format;

      var stateValue = this.state.value;
      var numRegex = this.getNumberRegex(true);
      var inputNumber = (inputValue.match(numRegex) || []).join('');
      var formattedNumber = (formattedValue.match(numRegex) || []).join('');
      var j = void 0,
          i = void 0;

      j = 0;

      for (i = 0; i < caretPos; i++) {
        var currentInputChar = inputValue[i] || '';
        var currentFormatChar = formattedValue[j] || '';
        //no need to increase new cursor position if formatted value does not have those characters
        //case inputValue = 1a23 and formattedValue =  123
        if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) continue;

        //When we are striping out leading zeros maintain the new cursor position
        //Case inputValue = 00023 and formattedValue = 23;
        if (currentInputChar === '0' && currentFormatChar.match(numRegex) && currentFormatChar !== '0' && inputNumber.length !== formattedNumber.length) continue;

        //we are not using currentFormatChar because j can change here
        while (currentInputChar !== formattedValue[j] && j < formattedValue.length) {
          j++;
        }j++;
      }

      if (typeof format === 'string' && !stateValue) {
        //set it to the maximum value so it goes after the last number
        j = formattedValue.length;
      }

      //correct caret position if its outside of editable area
      j = this.correctCaretPosition(formattedValue, j);

      return j;
    }
    /** caret specific methods ends **/

    /** methods to remove formattting **/

  }, {
    key: 'removePrefixAndSuffix',
    value: function removePrefixAndSuffix(val) {
      var _props3 = this.props,
          format = _props3.format,
          prefix = _props3.prefix,
          suffix = _props3.suffix;

      //remove prefix and suffix

      if (!format && val) {
        var isNegative = val[0] === '-';

        //remove negation sign
        if (isNegative) val = val.substring(1, val.length);

        //remove prefix
        val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val;

        //remove suffix
        var suffixLastIndex = val.lastIndexOf(suffix);
        val = suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length ? val.substring(0, suffixLastIndex) : val;

        //add negation sign back
        if (isNegative) val = '-' + val;
      }

      return val;
    }
  }, {
    key: 'removePatternFormatting',
    value: function removePatternFormatting(val) {
      var format = this.props.format;

      var formatArray = format.split('#').filter(function (str) {
        return str !== '';
      });
      var start = 0;
      var numStr = '';

      for (var i = 0, ln = formatArray.length; i <= ln; i++) {
        var part = formatArray[i] || '';

        //if i is the last fragment take the index of end of the value
        //For case like +1 (911) 911 91 91 having pattern +1 (###) ### ## ##
        var index = i === ln ? val.length : val.indexOf(part, start);

        /* in any case if we don't find the pattern part in the value assume the val as numeric string
        This will be also in case if user has started typing, in any other case it will not be -1
        unless wrong prop value is provided */
        if (index === -1) {
          numStr = val;
          break;
        } else {
          numStr += val.substring(start, index);
          start = index + part.length;
        }
      }

      return (numStr.match(/\d/g) || []).join('');
    }
  }, {
    key: 'removeFormatting',
    value: function removeFormatting(val) {
      var _props4 = this.props,
          format = _props4.format,
          removeFormatting = _props4.removeFormatting;

      if (!val) return val;

      if (!format) {
        val = this.removePrefixAndSuffix(val);
        val = this.getFloatString(val);
      } else if (typeof format === 'string') {
        val = this.removePatternFormatting(val);
      } else if (typeof removeFormatting === 'function') {
        //condition need to be handled if format method is provide,
        val = removeFormatting(val);
      } else {
        val = (val.match(/\d/g) || []).join('');
      }
      return val;
    }
    /** methods to remove formattting end **/

    /*** format specific methods start ***/
    /**
     * Format when # based string is provided
     * @param  {string} numStr Numeric String
     * @return {string}        formatted Value
     */

  }, {
    key: 'formatWithPattern',
    value: function formatWithPattern(numStr) {
      var format = this.props.format;

      var hashCount = 0;
      var formattedNumberAry = format.split('');
      for (var i = 0, ln = format.length; i < ln; i++) {
        if (format[i] === '#') {
          formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
          hashCount += 1;
        }
      }
      return formattedNumberAry.join('');
    }
    /**
     * @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
     * @return {string} formatted Value
     */

  }, {
    key: 'formatAsNumber',
    value: function formatAsNumber(numStr) {
      var _props5 = this.props,
          decimalScale = _props5.decimalScale,
          fixedDecimalScale = _props5.fixedDecimalScale,
          prefix = _props5.prefix,
          suffix = _props5.suffix,
          allowNegative = _props5.allowNegative;

      var _getSeparators4 = this.getSeparators(),
          thousandSeparator = _getSeparators4.thousandSeparator,
          decimalSeparator = _getSeparators4.decimalSeparator;

      var hasDecimalSeparator = numStr.indexOf('.') !== -1 || decimalScale && fixedDecimalScale;

      var _splitDecimal = (0, _utils.splitDecimal)(numStr, allowNegative),
          beforeDecimal = _splitDecimal.beforeDecimal,
          afterDecimal = _splitDecimal.afterDecimal,
          addNegation = _splitDecimal.addNegation; // eslint-disable-line prefer-const

      //apply decimal precision if its defined


      if (decimalScale !== undefined) afterDecimal = (0, _utils.limitToScale)(afterDecimal, decimalScale, fixedDecimalScale);

      if (thousandSeparator) {
        beforeDecimal = beforeDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousandSeparator);
      }

      //add prefix and suffix
      if (prefix) beforeDecimal = prefix + beforeDecimal;
      if (suffix) afterDecimal = afterDecimal + suffix;

      //restore negation sign
      if (addNegation) beforeDecimal = '-' + beforeDecimal;

      numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || '') + afterDecimal;

      return numStr;
    }
  }, {
    key: 'formatNumString',
    value: function formatNumString() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var format = this.props.format;

      var formattedValue = value;

      if (value === '') {
        formattedValue = '';
      } else if (value === '-' && !format) {
        formattedValue = '-';
        value = '';
      } else if (typeof format === 'string') {
        formattedValue = this.formatWithPattern(formattedValue);
      } else if (typeof format === 'function') {
        formattedValue = format(formattedValue);
      } else {
        formattedValue = this.formatAsNumber(formattedValue);
      }

      return formattedValue;
    }
  }, {
    key: 'formatValueProp',
    value: function formatValueProp() {
      var _props6 = this.props,
          format = _props6.format,
          decimalScale = _props6.decimalScale,
          fixedDecimalScale = _props6.fixedDecimalScale;
      var _props7 = this.props,
          value = _props7.value,
          isNumericString = _props7.isNumericString;

      // if value is not defined return empty string

      if (value === undefined) return '';

      if (typeof value === 'number') {
        value = value.toString();
        isNumericString = true;
      }

      //round the number based on decimalScale
      //format only if non formatted value is provided
      if (isNumericString && !format && typeof decimalScale === 'number') {
        value = (0, _utils.roundToPrecision)(value, decimalScale, fixedDecimalScale);
      }

      var formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);

      return formattedValue;
    }
  }, {
    key: 'formatNegation',
    value: function formatNegation() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var allowNegative = this.props.allowNegative;

      var negationRegex = new RegExp('(-)');
      var doubleNegationRegex = new RegExp('(-)(.)*(-)');

      // Check number has '-' value
      var hasNegation = negationRegex.test(value);

      // Check number has 2 or more '-' values
      var removeNegation = doubleNegationRegex.test(value);

      //remove negation
      value = value.replace(/-/g, '');

      if (hasNegation && !removeNegation && allowNegative) {
        value = '-' + value;
      }

      return value;
    }
  }, {
    key: 'formatInput',
    value: function formatInput() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var format = this.props.format;

      //format negation only if we are formatting as number

      if (!format) {
        value = this.formatNegation(value);
      }

      //remove formatting from number
      value = this.removeFormatting(value);

      return this.formatNumString(value);
    }

    /*** format specific methods end ***/

  }, {
    key: 'isCharacterAFormat',
    value: function isCharacterAFormat(caretPos, value) {
      var _props8 = this.props,
          format = _props8.format,
          prefix = _props8.prefix,
          suffix = _props8.suffix,
          decimalScale = _props8.decimalScale,
          fixedDecimalScale = _props8.fixedDecimalScale;

      var _getSeparators5 = this.getSeparators(),
          decimalSeparator = _getSeparators5.decimalSeparator;

      //check within format pattern


      if (typeof format === 'string' && format[caretPos] !== '#') return true;

      //check in number format
      if (!format && (caretPos < prefix.length || caretPos >= value.length - suffix.length || decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator)) {
        return true;
      }

      return false;
    }
  }, {
    key: 'checkIfFormatGotDeleted',
    value: function checkIfFormatGotDeleted(start, end, value) {
      for (var i = start; i < end; i++) {
        if (this.isCharacterAFormat(i, value)) return true;
      }
      return false;
    }

    /**
     * This will check if any formatting got removed by the delete or backspace and reset the value
     * It will also work as fallback if android chome keyDown handler does not work
     **/

  }, {
    key: 'correctInputValue',
    value: function correctInputValue(caretPos, lastValue, value) {
      var _props9 = this.props,
          format = _props9.format,
          decimalSeparator = _props9.decimalSeparator,
          allowNegative = _props9.allowNegative;

      var lastNumStr = this.state.numAsString || '';
      var _selectionBeforeInput = this.selectionBeforeInput,
          selectionStart = _selectionBeforeInput.selectionStart,
          selectionEnd = _selectionBeforeInput.selectionEnd;

      var _findChangedIndex = (0, _utils.findChangedIndex)(lastValue, value),
          start = _findChangedIndex.start,
          end = _findChangedIndex.end;

      /* don't do anyhting if something got added,
       or if value is empty string (when whole input is cleared)
       or whole input is replace with a number
      */


      if (value.length > lastValue.length || !value.length || start === end || start === 0 && end === lastValue.length || selectionStart === 0 && selectionEnd === lastValue.length) {
        return value;
      }

      //if format got deleted reset the value to last value
      if (this.checkIfFormatGotDeleted(start, end, lastValue)) {
        value = lastValue;
      }

      //for numbers check if beforeDecimal got deleted and there is nothing after decimal,
      //clear all numbers in such case while keeping the - sign
      if (!format) {
        var numericString = this.removeFormatting(value);

        var _splitDecimal2 = (0, _utils.splitDecimal)(numericString, allowNegative),
            beforeDecimal = _splitDecimal2.beforeDecimal,
            afterDecimal = _splitDecimal2.afterDecimal,
            addNegation = _splitDecimal2.addNegation; // eslint-disable-line prefer-const

        //clear only if something got deleted


        var isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;
        if (numericString.length < lastNumStr.length && isBeforeDecimalPoint && beforeDecimal === '' && !parseFloat(afterDecimal)) {
          return addNegation ? '-' : '';
        }
      }

      return value;
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      e.persist();
      var el = e.target;
      var inputValue = el.value;
      var state = this.state,
          props = this.props;
      var isAllowed = props.isAllowed;

      var lastValue = state.value || '';

      /*Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug*/
      var currentCaretPosition = Math.max(el.selectionStart, el.selectionEnd);

      inputValue = this.correctInputValue(currentCaretPosition, lastValue, inputValue);

      var formattedValue = this.formatInput(inputValue) || '';
      var numAsString = this.removeFormatting(formattedValue);

      var valueObj = {
        formattedValue: formattedValue,
        value: numAsString,
        floatValue: parseFloat(numAsString)
      };

      if (!isAllowed(valueObj)) {
        formattedValue = lastValue;
      }

      //set the value imperatively, this is required for IE fix
      el.value = formattedValue;

      //get the caret position
      var caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);

      //set caret position
      this.setPatchedCaretPosition(el, caretPos, formattedValue);

      //change the state
      if (formattedValue !== lastValue) {
        this.setState({ value: formattedValue, numAsString: numAsString }, function () {
          props.onValueChange(valueObj, e);
          props.onChange(e);
        });
      } else {
        props.onChange(e);
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      var props = this.props,
          state = this.state;
      var format = props.format,
          onBlur = props.onBlur;
      var numAsString = state.numAsString;

      var lastValue = state.value;
      if (!format) {
        numAsString = (0, _utils.fixLeadingZero)(numAsString);
        var formattedValue = this.formatNumString(numAsString);
        var valueObj = {
          formattedValue: formattedValue,
          value: numAsString,
          floatValue: parseFloat(numAsString)
        };

        //change the state
        if (formattedValue !== lastValue) {
          // the event needs to be persisted because its properties can be accessed in an asynchronous way
          e.persist();
          this.setState({ value: formattedValue, numAsString: numAsString }, function () {
            props.onValueChange(valueObj, e);
            onBlur(e);
          });
          return;
        }
      }
      onBlur(e);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var el = e.target;
      var key = e.key;
      var selectionStart = el.selectionStart,
          selectionEnd = el.selectionEnd,
          value = el.value;

      var expectedCaretPosition = void 0;
      var _props10 = this.props,
          decimalScale = _props10.decimalScale,
          fixedDecimalScale = _props10.fixedDecimalScale,
          prefix = _props10.prefix,
          suffix = _props10.suffix,
          format = _props10.format,
          onKeyDown = _props10.onKeyDown;

      var ignoreDecimalSeparator = decimalScale !== undefined && fixedDecimalScale;
      var numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
      var negativeRegex = new RegExp('-');
      var isPatternFormat = typeof format === 'string';

      this.selectionBeforeInput = {
        selectionStart: selectionStart,
        selectionEnd: selectionEnd

        //Handle backspace and delete against non numerical/decimal characters or arrow keys
      };if (key === 'ArrowLeft' || key === 'Backspace') {
        expectedCaretPosition = selectionStart - 1;
      } else if (key === 'ArrowRight') {
        expectedCaretPosition = selectionStart + 1;
      } else if (key === 'Delete') {
        expectedCaretPosition = selectionStart;
      }

      //if expectedCaretPosition is not set it means we don't want to Handle keyDown
      //also if multiple characters are selected don't handle
      if (expectedCaretPosition === undefined || selectionStart !== selectionEnd) {
        onKeyDown(e);
        return;
      }

      var newCaretPosition = expectedCaretPosition;
      var leftBound = isPatternFormat ? format.indexOf('#') : prefix.length;
      var rightBound = isPatternFormat ? format.lastIndexOf('#') + 1 : value.length - suffix.length;

      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        var direction = key === 'ArrowLeft' ? 'left' : 'right';
        newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
      } else if (key === 'Delete' && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) {
          newCaretPosition++;
        }
      } else if (key === 'Backspace' && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) {
          newCaretPosition--;
        }
        newCaretPosition = this.correctCaretPosition(value, newCaretPosition, 'left');
      }

      if (newCaretPosition !== expectedCaretPosition || expectedCaretPosition < leftBound || expectedCaretPosition > rightBound) {
        e.preventDefault();
        this.setPatchedCaretPosition(el, newCaretPosition, value);
      }

      /* NOTE: this is just required for unit test as we need to get the newCaretPosition,
              Remove this when you find different solution */
      if (e.isUnitTestRun) {
        this.setPatchedCaretPosition(el, newCaretPosition, value);
      }

      this.props.onKeyDown(e);
    }

    /** required to handle the caret position when click anywhere within the input **/

  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      var el = e.target;
      var selectionStart = el.selectionStart,
          selectionEnd = el.selectionEnd,
          value = el.value;


      if (selectionStart === selectionEnd) {
        var caretPostion = this.correctCaretPosition(value, selectionStart);
        if (caretPostion !== selectionStart) {
          this.setPatchedCaretPosition(el, caretPostion, value);
        }
      }

      this.props.onMouseUp(e);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(e) {
      var _this2 = this;

      // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
      // (onFocus event target selectionStart is always 0 before setTimeout)
      e.persist();
      setTimeout(function () {
        var el = e.target;
        var selectionStart = el.selectionStart,
            value = el.value;


        var caretPosition = _this2.correctCaretPosition(value, selectionStart);
        if (caretPosition !== selectionStart) {
          _this2.setPatchedCaretPosition(el, caretPosition, value);
        }

        _this2.props.onFocus(e);
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props11 = this.props,
          type = _props11.type,
          displayType = _props11.displayType,
          customInput = _props11.customInput,
          renderText = _props11.renderText,
          getInputRef = _props11.getInputRef;
      var value = this.state.value;


      var otherProps = (0, _utils.omit)(this.props, propTypes);

      var inputProps = _extends({}, otherProps, {
        type: type,
        value: value,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onMouseUp: this.onMouseUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      });

      if (displayType === 'text') {
        return renderText ? renderText(value) || null : _react2.default.createElement(
          'span',
          _extends({}, otherProps, { ref: getInputRef }),
          value
        );
      } else if (customInput) {
        var CustomInput = customInput;
        return _react2.default.createElement(CustomInput, inputProps);
      }

      return _react2.default.createElement('input', _extends({}, inputProps, {
        ref: getInputRef
      }));
    }
  }]);

  return NumberFormat;
}(_react2.default.Component);

NumberFormat.propTypes = propTypes;
NumberFormat.defaultProps = defaultProps;

module.exports = NumberFormat;

/***/ }),

/***/ "./node_modules/react-number-format/lib/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-number-format/lib/utils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.returnTrue = returnTrue;
exports.charIsNumber = charIsNumber;
exports.escapeRegExp = escapeRegExp;
exports.splitDecimal = splitDecimal;
exports.fixLeadingZero = fixLeadingZero;
exports.limitToScale = limitToScale;
exports.roundToPrecision = roundToPrecision;
exports.omit = omit;
exports.setCaretPosition = setCaretPosition;
exports.findChangedIndex = findChangedIndex;
exports.clamp = clamp;


// basic noop function
function noop() {}
function returnTrue() {
  return true;
}

function charIsNumber(char) {
  return !!(char || '').match(/\d/);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

//spilt a float number into different parts beforeDecimal, afterDecimal, and negation
function splitDecimal(numStr) {
  var allowNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var hasNagation = numStr[0] === '-';
  var addNegation = hasNagation && allowNegative;
  numStr = numStr.replace('-', '');

  var parts = numStr.split('.');
  var beforeDecimal = parts[0];
  var afterDecimal = parts[1] || '';

  return {
    beforeDecimal: beforeDecimal,
    afterDecimal: afterDecimal,
    hasNagation: hasNagation,
    addNegation: addNegation
  };
}

function fixLeadingZero(numStr) {
  if (!numStr) return numStr;
  var isNegative = numStr[0] === '-';
  if (isNegative) numStr = numStr.substring(1, numStr.length);
  var parts = numStr.split('.');
  var beforeDecimal = parts[0].replace(/^0+/, '') || '0';
  var afterDecimal = parts[1] || '';

  return '' + (isNegative ? '-' : '') + beforeDecimal + (afterDecimal ? '.' + afterDecimal : '');
}

/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */
function limitToScale(numStr, scale, fixedDecimalScale) {
  var str = '';
  var filler = fixedDecimalScale ? '0' : '';
  for (var i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}

/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */
function roundToPrecision(numStr, scale, fixedDecimalScale) {
  var shoudHaveDecimalSeparator = numStr.indexOf('.') !== -1 && scale;

  var _splitDecimal = splitDecimal(numStr),
      beforeDecimal = _splitDecimal.beforeDecimal,
      afterDecimal = _splitDecimal.afterDecimal,
      hasNagation = _splitDecimal.hasNagation;

  var roundedDecimalParts = parseFloat('0.' + (afterDecimal || '0')).toFixed(scale).split('.');
  var intPart = beforeDecimal.split('').reverse().reduce(function (roundedStr, current, idx) {
    if (roundedStr.length > idx) {
      return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
    }
    return current + roundedStr;
  }, roundedDecimalParts[0]);

  var decimalPart = limitToScale(roundedDecimalParts[1] || '', (afterDecimal || '').length, fixedDecimalScale);
  var negation = hasNagation ? '-' : '';
  var decimalSeparator = shoudHaveDecimalSeparator ? '.' : '';
  return '' + negation + intPart + decimalSeparator + decimalPart;
}

function omit(obj, keyMaps) {
  var filteredObj = {};
  Object.keys(obj).forEach(function (key) {
    if (!keyMaps[key]) filteredObj[key] = obj[key];
  });
  return filteredObj;
}

/** set the caret positon in an input field **/
function setCaretPosition(el, caretPos) {
  el.value = el.value;
  // ^ this is used to not only get "focus", but
  // to make sure we don't have it everything -selected-
  // (it causes an issue in chrome, and having it doesn't hurt any other browser)
  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.move('character', caretPos);
      range.select();
      return true;
    }
    // (el.selectionStart === 0 added for Firefox bug)
    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    }

    // fail city, fortunately this never happens (as far as I've tested) :)
    el.focus();
    return false;
  }
}

/**
  Given previous value and newValue it returns the index
  start - end to which values have changed.
  This function makes assumption about only consecutive
  characters are changed which is correct assumption for caret input.
*/
function findChangedIndex(prevValue, newValue) {
  var i = 0,
      j = 0;
  var prevLength = prevValue.length;
  var newLength = newValue.length;
  while (prevValue[i] === newValue[i] && i < prevLength) {
    i++;
  } //check what has been changed from last
  while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] && newLength - j > i && prevLength - j > i) {
    j++;
  }

  return { start: i, end: prevLength - j };
}

/*
  Returns a number whose value is limited to the given range
*/
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/***/ }),

/***/ "./node_modules/react/cjs/react.production.min.js":
/*!********************************************************!*\
  !*** ./node_modules/react/cjs/react.production.min.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var m=__webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js"),n=__webpack_require__(/*! fbjs/lib/emptyObject */ "./node_modules/fbjs/lib/emptyObject.js"),p=__webpack_require__(/*! fbjs/lib/emptyFunction */ "./node_modules/fbjs/lib/emptyFunction.js"),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/react.production.min.js */ "./node_modules/react/cjs/react.production.min.js");
} else {}


/***/ }),

/***/ "./static/components.js":
/*!******************************!*\
  !*** ./static/components.js ***!
  \******************************/
/*! exports provided: PharmaRevRec */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PharmaRevRec", function() { return PharmaRevRec; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-number-format */ "./node_modules/react-number-format/lib/number_format.js");
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_number_format__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_csv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-csv */ "./node_modules/react-csv/index.js");
/* harmony import */ var react_csv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_csv__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model */ "./static/model.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index.scss */ "./static/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_5__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var math = __webpack_require__(/*! math.js */ "./node_modules/math.js/index.js");





var PharmaRevRec = function (_React$Component) {
  _inherits(PharmaRevRec, _React$Component);

  function PharmaRevRec(props) {
    _classCallCheck(this, PharmaRevRec);

    var _this = _possibleConstructorReturn(this, (PharmaRevRec.__proto__ || Object.getPrototypeOf(PharmaRevRec)).call(this, props));

    if (window.LRPModel === null) {
      _this.state = _model__WEBPACK_IMPORTED_MODULE_4__["defaultState"];
    } else {
      _this.state = window.LRPModel.data;
    }

    //Scenario
    _this.setScenarioState = _this.setScenarioState.bind(_this);
    _this.addScenario = _this.addScenario.bind(_this);
    _this.deleteScenario = _this.deleteScenario.bind(_this);
    _this.editScenarioName = _this.editScenarioName.bind(_this);
    _this.setActiveScenarioId = _this.setActiveScenarioId.bind(_this);

    //Model Setup
    _this.setModelName = _this.setModelName.bind(_this);
    _this.setStartYear = _this.setStartYear.bind(_this);
    _this.setYearsOut = _this.setYearsOut.bind(_this);
    _this.setScenarioDate = _this.setScenarioDate.bind(_this);

    //Years Display
    _this.setDisplayType = _this.setDisplayType.bind(_this);

    //Programs
    _this.addProgram = _this.addProgram.bind(_this);
    _this.editProgramName = _this.editProgramName.bind(_this);
    _this.editProgramFTERate = _this.editProgramFTERate.bind(_this);
    _this.deleteProgram = _this.deleteProgram.bind(_this);

    //Revenue Milestones
    _this.addMilestone = _this.addMilestone.bind(_this);
    _this.deleteMilestone = _this.deleteMilestone.bind(_this);
    _this.editMilestoneName = _this.editMilestoneName.bind(_this);
    _this.editMilestoneEarned = _this.editMilestoneEarned.bind(_this);
    _this.editMilestonePaid = _this.editMilestonePaid.bind(_this);
    _this.editMilestoneAmount = _this.editMilestoneAmount.bind(_this);

    //External Spend
    _this.editExtSpendAmount = _this.editExtSpendAmount.bind(_this);

    //Headcount Effort
    _this.editHeadcountEffort = _this.editHeadcountEffort.bind(_this);

    //Period Analytics
    _this.setComparisonModel = _this.setComparisonModel.bind(_this);
    return _this;
  }

  _createClass(PharmaRevRec, [{
    key: 'setScenarioState',
    value: function setScenarioState(scenarioChanges) {
      this.setState(function (prevState, props) {
        var activeScenarioId = prevState.activeScenarioId;
        var currentScenario = prevState.scenarios[activeScenarioId];
        var updatedCurrentScenario = void 0;
        var updatedAssumptions = void 0;
        if (typeof scenarioChanges === "function") {
          updatedAssumptions = scenarioChanges(currentScenario, props);
          updatedCurrentScenario = Object.assign({}, currentScenario, updatedAssumptions);
        } else {
          updatedCurrentScenario = Object.assign({}, currentScenario, scenarioChanges);
        }
        var newState = prevState;
        newState.scenarios[activeScenarioId] = updatedCurrentScenario;
        return newState;
      });
    }
  }, {
    key: 'addScenario',
    value: function addScenario() {
      this.setState(function (prevState, props) {
        var scenarios = prevState.scenarios;
        var copiedScenarioIndex = prevState.activeScenarioId;
        var copiedScenario = JSON.parse(JSON.stringify(scenarios[copiedScenarioIndex]));
        copiedScenario.scenarioName = "New scenario";
        scenarios.push(copiedScenario);
        return {
          scenarios: scenarios
        };
      });
    }
  }, {
    key: 'deleteScenario',
    value: function deleteScenario(scenarioIndex) {
      this.setState(function (prevState, props) {
        var scenarios = prevState.scenarios;
        scenarios.splice(scenarioIndex, 1);
        return {
          scenarios: scenarios
        };
      });
    }
  }, {
    key: 'editScenarioName',
    value: function editScenarioName(newName, scenarioIndex) {
      this.setState(function (prevState, props) {
        var scenarios = prevState.scenarios;
        var currentScenario = scenarios[scenarioIndex];
        currentScenario.scenarioName = newName;
        return {
          scenarios: scenarios
        };
      });
    }
  }, {
    key: 'setScenarioDate',
    value: function setScenarioDate(newScenarioDate, scenarioIndex) {
      this.setState(function (prevState, props) {
        var scenarios = prevState.scenarios;
        var currentScenario = scenarios[scenarioIndex];
        currentScenario.scenarioDate = newScenarioDate;
        return {
          scenarios: scenarios
        };
      });
    }
  }, {
    key: 'setActiveScenarioId',
    value: function setActiveScenarioId(newScenario) {
      this.setState(function (prevState, props) {
        var scenarios = prevState.scenarios;
        var newScenarioIndex = scenarios.findIndex(function (x) {
          return x.scenarioName === newScenario;
        });
        return {
          activeScenarioId: newScenarioIndex
        };
      });
    }
  }, {
    key: 'setModelName',
    value: function setModelName(name) {
      this.setState({ modelName: name });
    }
  }, {
    key: 'setStartYear',
    value: function setStartYear(startYear) {
      var startYearNum = Number(startYear);
      this.setState({ startYear: startYearNum });
    }
  }, {
    key: 'setYearsOut',
    value: function setYearsOut(yearsOut) {
      var _this2 = this;

      var newYearsOut = Number(yearsOut);
      this.setState({ yearsOut: newYearsOut });

      this.setScenarioState(function (prevState, props) {
        var startYear = _this2.state.startYear;
        var extSpend = prevState.externalSpend;
        var hcSpend = prevState.headcountEffort;

        var displaySelections = [];
        for (var x = 0; x < newYearsOut; x++) {
          var currentYear = startYear + x;
          displaySelections.push({
            year: currentYear,
            type: "Annual"
          });
        }

        var newExtSpend = extSpend.map(function (array) {
          var arrayLength = Object(_model__WEBPACK_IMPORTED_MODULE_4__["editDataArrayLength"])(array, startYear, newYearsOut);
          return Object(_model__WEBPACK_IMPORTED_MODULE_4__["editDataArrayYears"])(arrayLength, startYear, newYearsOut);
        });

        var newHCSpend = hcSpend.map(function (array) {
          var arrayLength = Object(_model__WEBPACK_IMPORTED_MODULE_4__["editDataArrayLength"])(array, startYear, newYearsOut);
          return Object(_model__WEBPACK_IMPORTED_MODULE_4__["editDataArrayYears"])(arrayLength, startYear, newYearsOut);
        });

        return {
          displaySelections: displaySelections,
          externalSpend: newExtSpend,
          headcountEffort: newHCSpend
        };
      });
    }
  }, {
    key: 'setDisplayType',
    value: function setDisplayType(display, displayIndex) {
      this.setScenarioState(function (prevState, props) {
        var newDisplaySelections = prevState.displaySelections;
        newDisplaySelections[displayIndex].type = display;
        return {
          displaySelections: newDisplaySelections
        };
      });
    }
  }, {
    key: 'addProgram',
    value: function addProgram() {
      var startYear = this.state.startYear;
      var yearsOut = this.state.yearsOut;

      this.setState(function (prevState, props) {
        var programArray = prevState.programs;
        var oldId = programArray[programArray.length - 1].id;
        var newId = oldId + 1;
        var newProgram = {
          name: "New Program",
          id: newId,
          fteRate: 250000
        };
        programArray.push(newProgram);

        var scenarios = prevState.scenarios;
        var newScenarios = scenarios.map(function (scenario, scenarioIndex) {
          var newScenario = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(scenario);

          //add external spend array//
          var newExtSpend = newScenario.externalSpend;
          var newExtSpendArray = Object(_model__WEBPACK_IMPORTED_MODULE_4__["addDataArray"])(startYear, yearsOut);
          newExtSpend.push(newExtSpendArray);

          //add headcount effort array//
          var newHcEffort = newScenario.headcountEffort;
          var newHcEffortArray = Object(_model__WEBPACK_IMPORTED_MODULE_4__["addDataArray"])(startYear, yearsOut);
          newHcEffort.push(newHcEffortArray);

          return newScenario;
        });

        return {
          programs: programArray,
          scenarios: newScenarios
        };
      });
    }
  }, {
    key: 'deleteProgram',
    value: function deleteProgram(programIndex) {
      this.setScenarioState(function (prevState, props) {
        var programArray = prevState.programs;
        var externalSpendArray = prevState.externalSpend;
        var headcountEffortArray = prevState.headcountEffort;
        programArray.splice(programIndex, 1);
        externalSpendArray.splice(programIndex, 1);
        headcountEffortArray.splice(programIndex, 1);
        return {
          programs: programArray,
          externalSpend: externalSpendArray,
          headcountEffort: headcountEffortArray
        };
      });
    }
  }, {
    key: 'editProgramName',
    value: function editProgramName(programIndex, programName) {
      this.setScenarioState(function (prevState, props) {
        var programArray = prevState.programs.slice();
        programArray[programIndex].name = programName;
        return {
          programs: programArray
        };
      });
    }
  }, {
    key: 'editProgramFTERate',
    value: function editProgramFTERate(programIndex, newAmount) {
      var _this3 = this;

      this.setScenarioState(function (prevState, props) {
        var programArray = _this3.state.programs.slice();
        programArray[programIndex].fteRate = newAmount;
        return {
          programs: programArray
        };
      });
    }
  }, {
    key: 'addMilestone',
    value: function addMilestone() {
      this.setScenarioState(function (prevState, props) {
        var revMilestones = prevState.revenueMilestones;
        var lastId = revMilestones[revMilestones.length - 1].id;
        var newId = lastId + 1;
        var period = "Q1 " + prevState.startYear;
        var newMilestone = {
          id: newId,
          name: "New Milestone",
          dateEarned: period,
          datePaid: period,
          amount: 10000
        };
        revMilestones.push(newMilestone);
        return {
          revenueMilestones: revMilestones
        };
      });
    }
  }, {
    key: 'deleteMilestone',
    value: function deleteMilestone(milestoneIndex) {
      this.setScenarioState(function (prevState, props) {
        var revMilestones = prevState.revenueMilestones;
        revMilestones.splice(milestoneIndex, 1);
        return {
          revenueMilestones: revMilestones
        };
      });
    }
  }, {
    key: 'editMilestoneName',
    value: function editMilestoneName(milestoneIndex, newName) {
      this.setScenarioState(function (prevState, props) {
        var revMilestones = prevState.revenueMilestones.slice();
        revMilestones[milestoneIndex].name = newName;
        return {
          revenueMilestones: revMilestones
        };
      });
    }
  }, {
    key: 'editMilestoneEarned',
    value: function editMilestoneEarned(milestoneIndex, newDate) {
      this.setScenarioState(function (prevState, props) {
        var revMilestones = prevState.revenueMilestones.slice();
        revMilestones[milestoneIndex].dateEarned = newDate;
        return {
          revenueMilestones: revMilestones
        };
      });
    }
  }, {
    key: 'editMilestonePaid',
    value: function editMilestonePaid(milestoneIndex, newDate) {
      this.setScenarioState(function (prevState, props) {
        var revMilestones = prevState.revenueMilestones.slice();
        revMilestones[milestoneIndex].datePaid = newDate;
        return {
          revenueMilestones: revMilestones
        };
      });
    }
  }, {
    key: 'editMilestoneAmount',
    value: function editMilestoneAmount(milestoneIndex, newAmount) {
      this.setScenarioState(function (prevState, props) {
        var revMilestones = prevState.revenueMilestones.slice();
        revMilestones[milestoneIndex].amount = Number(newAmount);
        return {
          revenueMilestones: revMilestones
        };
      });
    }
  }, {
    key: 'editExtSpendAmount',
    value: function editExtSpendAmount(displayType, quarter, year, newAmount, programIndex) {
      var quarterAmount = 0;
      if (displayType === "Annual") {
        quarterAmount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(newAmount / 4, 1000);
      }
      this.setScenarioState(function (prevState, props) {
        var extSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(prevState.externalSpend);
        var programExtSpend = extSpend[programIndex];
        var newExtSpend = programExtSpend.map(function (amount) {
          if (displayType === "Annual" && amount.year === year) {
            amount.amount = quarterAmount;
          } else if (displayType === "Quarterly" && amount.year === year && amount.quarter === quarter) {
            amount.amount = newAmount;
          }
          return amount;
        });
        return {
          externalSpend: extSpend
        };
      });
    }
  }, {
    key: 'editHeadcountEffort',
    value: function editHeadcountEffort(displayType, quarter, year, newAmount, programIndex) {
      var quarterAmount = 0;
      if (displayType === "Annual") {
        quarterAmount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(newAmount / 4, 1000);
      }
      this.setScenarioState(function (prevState, props) {
        var hcEffort = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(prevState.headcountEffort);
        var programHcEffort = hcEffort[programIndex];
        var newHcEffort = programHcEffort.map(function (amount) {
          if (displayType === "Annual" && amount.year === year) {
            amount.amount = quarterAmount;
          } else if (displayType === "Quarterly" && amount.year === year && amount.quarter === quarter) {
            amount.amount = newAmount;
          }
          return amount;
        });
        return {
          headcountEffort: hcEffort
        };
      });
    }
  }, {
    key: 'setComparisonModel',
    value: function setComparisonModel(newModelIndex) {
      var newComparisonModel = newModelIndex;
      this.setScenarioState({ comparisonModelIndex: newComparisonModel });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$scenarios$stat = this.state.scenarios[this.state.activeScenarioId],
          headcountEffort = _state$scenarios$stat.headcountEffort,
          externalSpend = _state$scenarios$stat.externalSpend,
          displaySelections = _state$scenarios$stat.displaySelections,
          revenueMilestones = _state$scenarios$stat.revenueMilestones,
          scenarioDate = _state$scenarios$stat.scenarioDate,
          analyticComparisonIndex = _state$scenarios$stat.analyticComparisonIndex;
      var _state = this.state,
          modelName = _state.modelName,
          startYear = _state.startYear,
          yearsOut = _state.yearsOut,
          programs = _state.programs,
          scenarios = _state.scenarios;


      var headcountSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculateHeadcountSpend"])(headcountEffort, programs);
      var totalProgramSpend = externalSpend.map(function (progSpend, progIndex) {
        var totalSpend = progSpend.map(function (extSpend, extSpendIndex) {
          var copiedExtSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(extSpend);
          copiedExtSpend.amount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(extSpend.amount + headcountSpend[progIndex][extSpendIndex].amount, 1000);
          return copiedExtSpend;
        });
        return totalSpend;
      });

      var totalSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(totalProgramSpend);
      var grandTotalSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(totalSpend);

      var percentComplete = Object(_model__WEBPACK_IMPORTED_MODULE_4__["percentCompleteArray"])(totalSpend);
      var percentTotal = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(percentComplete), 1000000);
      var dollarCompleteCum = Object(_model__WEBPACK_IMPORTED_MODULE_4__["dollarCompleteCummArray"])(totalSpend);
      var percentCompleteCum = Object(_model__WEBPACK_IMPORTED_MODULE_4__["percentCompleteCummArray"])(dollarCompleteCum, grandTotalSpend);
      var percentTotalCum = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(percentComplete), 1000000);

      var scenarioNames = scenarios.map(function (scenario) {
        return scenario.scenarioName;
      });

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'div',
        { id: 'grid' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HeaderBar, {
          modelName: this.state.modelName
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SideNavigation, {
          scenarios: this.state.scenarios,
          activeScenarioId: this.state.activeScenarioId,
          setActiveScenarioId: this.setActiveScenarioId
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'div',
          { id: 'content' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ModelSetup, {
            modelName: modelName,
            startYear: startYear,
            setModelName: this.setModelName,
            setStartYear: this.setStartYear,
            setYearsOut: this.setYearsOut,
            yearsOut: yearsOut
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ScenarioManager, {
            scenario: this.state.scenarios,
            addScenario: this.addScenario,
            deleteScenario: this.deleteScenario,
            editScenarioName: this.editScenarioName,
            setActiveScenarioId: this.setActiveScenarioId,
            activeScenarioId: this.state.activeScenarioId,
            scenarioDate: scenarioDate,
            setScenarioDate: this.setScenarioDate,
            startYear: startYear,
            yearsOut: yearsOut
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(YearDisplay, {
            startYear: startYear,
            yearsOut: yearsOut,
            setDisplayType: this.setDisplayType,
            displaySelections: displaySelections
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Programs, {
            programs: programs,
            addProgram: this.addProgram,
            editProgramName: this.editProgramName,
            editProgramFTERate: this.editProgramFTERate,
            deleteProgram: this.deleteProgram
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RevenueMilestones, {
            addMilestone: this.addMilestone,
            deleteMilestone: this.deleteMilestone,
            editMilestoneName: this.editMilestoneName,
            editMilestoneEarned: this.editMilestoneEarned,
            editMilestonePaid: this.editMilestonePaid,
            editMilestoneAmount: this.editMilestoneAmount,
            startYear: startYear,
            revenueMilestones: revenueMilestones,
            yearsOut: yearsOut
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ExternalSpend, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections,
            externalSpend: externalSpend,
            programs: programs,
            editExtSpendAmount: this.editExtSpendAmount
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HeadcountEffort, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections,
            headcountEffort: headcountEffort,
            programs: programs,
            editHeadcountEffort: this.editHeadcountEffort
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HeadcountSpend, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections,
            headcountEffort: headcountEffort,
            programs: programs,
            editHeadcountEffort: this.editHeadcountEffort
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TotalProgramSpend, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections,
            externalSpend: externalSpend,
            headcountEffort: headcountEffort,
            programs: programs,
            editHeadcountEffort: this.editHeadcountEffort,
            totalProgramSpend: totalProgramSpend,
            grandTotalSpend: grandTotalSpend,
            dollarCompleteCum: dollarCompleteCum,
            percentCompleteCum: percentCompleteCum,
            percentComplete: percentComplete,
            percentTotal: percentTotal,
            percentTotalCum: percentTotalCum,
            totalSpend: totalSpend
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RevenueRecognized, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections,
            percentComplete: percentComplete,
            percentCompleteCum: percentCompleteCum,
            revenueMilestones: revenueMilestones,
            scenarioDate: scenarioDate
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DeferredRevenueRoll, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections,
            percentComplete: percentComplete,
            percentCompleteCum: percentCompleteCum,
            revenueMilestones: revenueMilestones
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PeriodBridge, {
            startYear: startYear,
            yearsOut: yearsOut,
            externalSpend: externalSpend,
            headcountEffort: headcountEffort,
            programs: programs,
            percentCompleteCum: percentCompleteCum,
            percentComplete: percentComplete,
            totalProgramSpend: totalProgramSpend,
            headcountSpend: headcountSpend,
            grandTotalSpend: grandTotalSpend,
            revenueMilestones: revenueMilestones,
            analyticComparisonIndex: analyticComparisonIndex,
            scenarios: scenarios,
            scenarioNames: scenarioNames,
            totalSpend: totalSpend
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PeriodAnalytic, {
            startYear: startYear,
            yearsOut: yearsOut,
            externalSpend: externalSpend,
            headcountEffort: headcountEffort,
            headcountSpend: headcountSpend,
            programs: programs,
            totalProgramSpend: totalProgramSpend,
            analyticComparisonIndex: analyticComparisonIndex,
            scenarios: scenarios,
            scenarioNames: scenarioNames,
            scenarioDate: scenarioDate
          })
        )
      );
    }
  }]);

  return PharmaRevRec;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function HeaderBar(_ref) {
  var modelName = _ref.modelName;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'div',
    { id: 'header' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'pharmaRevRec'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h1',
      { className: 'title' },
      modelName
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'span',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'a',
        { href: '/logout/' },
        'Logout'
      )
    )
  );
}

function SideNavigation(props) {
  var scenarios = props.scenarios,
      activeScenarioId = props.activeScenarioId,
      setActiveScenarioId = props.setActiveScenarioId;


  var scenarioNames = scenarios.map(function (scenario) {
    return scenario.scenarioName;
  });

  var activeScenarioName = scenarios[activeScenarioId].scenarioName;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'div',
    { id: 'sidebar' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'a',
      { href: '#Model_Setup' },
      'Setup'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'a',
      { href: '#Programs' },
      'Programs'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'a',
      { href: '#Headcount' },
      'Headcount'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'a',
      { href: '#Other_Cost' },
      'Other Cost'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'a',
      { href: '#Financings' },
      'Financings'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'a',
      { href: '#Cash_Rollforward' },
      'Reports'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('hr', null),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'a' },
          'Active Version'
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'select',
            {
              value: scenarios[activeScenarioId].scenarioName,
              onChange: function onChange(e) {
                return setActiveScenarioId(e.target.value);
              }
            },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: scenarioNames })
          )
        )
      )
    )
  );
}

var ModelSetup = function (_React$Component2) {
  _inherits(ModelSetup, _React$Component2);

  function ModelSetup(props) {
    _classCallCheck(this, ModelSetup);

    var _this4 = _possibleConstructorReturn(this, (ModelSetup.__proto__ || Object.getPrototypeOf(ModelSetup)).call(this, props));

    _this4.state = {
      startYear: _this4.props.startYear,
      yearsOut: _this4.props.yearsOut
    };

    _this4.setLocalStartYear = _this4.setLocalStartYear.bind(_this4);
    _this4.setLocalYearsOut = _this4.setLocalYearsOut.bind(_this4);
    _this4.onSubmitClick = _this4.onSubmitClick.bind(_this4);
    return _this4;
  }

  _createClass(ModelSetup, [{
    key: 'setLocalStartYear',
    value: function setLocalStartYear(startYear) {
      var startYearNum = Number(startYear);
      this.setState({ startYear: startYearNum });
    }
  }, {
    key: 'setLocalYearsOut',
    value: function setLocalYearsOut(yearsOut) {
      var newYearsOut = Number(yearsOut);
      this.setState({ yearsOut: newYearsOut });
    }
  }, {
    key: 'onSubmitClick',
    value: function onSubmitClick(event) {
      this.props.setStartYear(this.state.startYear);
      this.props.setYearsOut(this.state.yearsOut);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var modelName = this.props.modelName;
      var startYear = this.props.startYear;
      var setModelName = this.props.setModelName;
      var yearsOut = this.props.yearsOut;

      var periodSelections = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodLabels"])(startYear, yearsOut);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'section',
        { id: 'Model_Setup' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'h2',
          null,
          'Model Setup'
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'table',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tbody',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Model Name'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'long' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', {
                  value: modelName,
                  onChange: function onChange(e) {
                    return setModelName(e.target.value);
                  }
                })
              )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Start Year'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'long' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  className: 'numerical',
                  onValueChange: function onValueChange(values, e) {
                    return _this5.setLocalStartYear(e.target.value);
                  },
                  value: this.state.startYear,
                  thousandSeparator: false,
                  isNumericString: true,
                  allowNegative: false
                })
              )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Years Out'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'long' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  className: 'numerical',
                  onValueChange: function onValueChange(values, e) {
                    return _this5.setLocalYearsOut(e.target.value);
                  },
                  value: this.state.yearsOut,
                  thousandSeparator: true,
                  isNumericString: true,
                  allowNegative: false
                })
              )
            )
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'button',
          {
            onClick: function onClick(e) {
              return _this5.onSubmitClick(e);
            },
            value: 'Submit'
          },
          'Submit'
        )
      );
    }
  }]);

  return ModelSetup;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function ScenarioManager(props) {
  var scenario = props.scenario,
      addScenario = props.addScenario,
      deleteScenario = props.deleteScenario,
      editScenarioName = props.editScenarioName,
      setActiveScenarioId = props.setActiveScenarioId,
      activeScenarioId = props.activeScenarioId,
      setScenarioDate = props.setScenarioDate,
      scenarioDate = props.scenarioDate,
      startYear = props.startYear,
      yearsOut = props.yearsOut;


  var periodSelections = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodLabels"])(startYear, yearsOut);

  var scenarioRows = scenario.map(function (scenario, index) {
    var scenarioName = scenario.scenarioName;
    if (index === 0 || index <= activeScenarioId) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', {
              value: scenarioName,
              onChange: function onChange(e) {
                return editScenarioName(e.target.value, index);
              }
            })
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'select',
              {
                value: scenarioDate,
                onChange: function onChange(e) {
                  return setScenarioDate(e.target.value, index);
                }
              },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: periodSelections })
            )
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('td', null)
        )
      );
    } else {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', {
              value: scenarioName,
              onChange: function onChange(e) {
                return editScenarioName(e.target.value, index);
              }
            })
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'select',
              {
                value: scenarioDate,
                onChange: function onChange(e) {
                  return setScenarioDate(e.target.value, index);
                }
              },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: periodSelections })
            )
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DeleteItem, { index: index, removeItem: deleteScenario })
        )
      );
    }
  });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Scenarios' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Version Manager'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      { className: 'actions-column' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Name'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Version Period End'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('th', null)
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        scenarioRows
      )
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AddItem, { addItem: addScenario, label: 'Version' })
  );
}

function YearDisplay(props) {
  var startYear = props.startYear,
      yearsOut = props.yearsOut,
      setDisplayType = props.setDisplayType,
      displaySelections = props.displaySelections;


  var years = Object(_model__WEBPACK_IMPORTED_MODULE_4__["yearsArray"])(startYear, yearsOut);
  var yearsRow = years.map(function (year, yearIndex) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      { key: year },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          year
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'select',
            {
              value: displaySelections[yearIndex].type,
              onChange: function onChange(e) {
                return setDisplayType(e.target.value, yearIndex);
              }
            },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: _model__WEBPACK_IMPORTED_MODULE_4__["displayOptions"] })
          )
        )
      )
    );
  });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Years_Display' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Years Display'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Year'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Display'
          )
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        yearsRow
      )
    )
  );
}

function Programs(props) {
  var programs = props.programs,
      addProgram = props.addProgram,
      editProgramName = props.editProgramName,
      editProgramFTERate = props.editProgramFTERate,
      deleteProgram = props.deleteProgram;


  var programRows = programs.map(function (program, programIndex) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', {
            onChange: function onChange(e) {
              return editProgramName(programIndex, e.target.value);
            },
            value: program.name
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            className: 'numerical',
            onValueChange: function onValueChange(values, e) {
              return editProgramFTERate(programIndex, values.value);
            },
            value: program.fteRate,
            thousandSeparator: true,
            isNumericString: true
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DeleteItem, {
          removeItem: deleteProgram,
          index: programIndex
        })
      )
    );
  });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Programs' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Programs under Revenue Model'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      { className: 'actions-column' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Name'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'FTE Rate'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('th', null)
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('tr', null)
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        programRows
      )
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AddItem, { addItem: addProgram, label: 'Program' })
  );
}

function RevenueMilestones(props) {
  var addMilestone = props.addMilestone,
      deleteMilestone = props.deleteMilestone,
      editMilestoneName = props.editMilestoneName,
      editMilestoneEarned = props.editMilestoneEarned,
      editMilestonePaid = props.editMilestonePaid,
      editMilestoneAmount = props.editMilestoneAmount,
      startYear = props.startYear,
      revenueMilestones = props.revenueMilestones,
      yearsOut = props.yearsOut;


  var periodSelections = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodLabels"])(startYear, yearsOut);

  var revenueRows = revenueMilestones.map(function (milestone, milestoneIndex) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', {
            value: milestone.name,
            onChange: function onChange(e) {
              return editMilestoneName(milestoneIndex, e.target.value);
            }
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'select',
            {
              value: milestone.dateEarned,
              onChange: function onChange(e) {
                return editMilestoneEarned(milestoneIndex, e.target.value);
              }
            },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: periodSelections })
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            className: 'numerical',
            value: milestone.amount,
            onValueChange: function onValueChange(values, e) {
              return editMilestoneAmount(milestoneIndex, values.value);
            },
            thousandSeparator: true,
            isNumericString: true
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DeleteItem, { index: milestoneIndex, removeItem: deleteMilestone })
      )
    );
  });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Revenue-Milestones' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Revenue Milestones'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      { className: 'actions-column' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Name'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Period Earned'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            { className: 'numerical' },
            'Amount'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('th', null)
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        revenueRows
      )
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AddItem, { addItem: addMilestone, label: 'Milestone' })
  );
}

function ExternalSpend(props) {
  var startYear = props.startYear,
      yearsOut = props.yearsOut,
      displaySelections = props.displaySelections,
      externalSpend = props.externalSpend,
      programs = props.programs,
      editExtSpendAmount = props.editExtSpendAmount;


  var externalSpendRow = externalSpend.map(function (programSpend, programIndex) {
    var totalProgSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(programSpend);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          programs[programIndex].name
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataRows, {
          startYear: startYear,
          displaySelections: displaySelections,
          dataArray: programSpend,
          yearsOut: yearsOut,
          editAmount: editExtSpendAmount,
          programIndex: programIndex,
          input: 'Yes'
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: totalProgSpend,
            thousandSeparator: true
          })
        )
      )
    );
  });

  var totalExternalSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(externalSpend);
  var grandTotal = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(totalExternalSpend);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'External-Spend' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'External Program Spend'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Program'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TablePeriodHeaders, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Total External Spend'
          )
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        externalSpendRow,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Total'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TotalRows, {
            displaySelections: displaySelections,
            dataArray: totalExternalSpend
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            { className: 'numerical' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
              displayType: 'text',
              value: grandTotal,
              thousandSeparator: true
            })
          )
        )
      )
    )
  );
}

function HeadcountEffort(props) {
  var startYear = props.startYear,
      yearsOut = props.yearsOut,
      displaySelections = props.displaySelections,
      headcountEffort = props.headcountEffort,
      programs = props.programs,
      editHeadcountEffort = props.editHeadcountEffort;


  var headcountEffortRow = headcountEffort.map(function (hcEffort, hcEffortIndex) {
    var totalHeadcountEffort = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(hcEffort);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          programs[hcEffortIndex].name
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: programs[hcEffortIndex].fteRate,
            thousandSeparator: true
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataRows, {
          startYear: startYear,
          displaySelections: displaySelections,
          dataArray: hcEffort,
          yearsOut: yearsOut,
          editAmount: editHeadcountEffort,
          programIndex: hcEffortIndex,
          input: 'Yes'
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: totalHeadcountEffort,
            thousandSeparator: true
          })
        )
      )
    );
  });

  var totalHeadcountEffort = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(headcountEffort);
  var grandTotal = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(totalHeadcountEffort);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Headcount-Effort' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Headcount Effort by Program'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Program'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'FTE Rate'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TablePeriodHeaders, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Total Headcount Effort'
          )
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        headcountEffortRow,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Total'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('td', null),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TotalRows, {
            displaySelections: displaySelections,
            dataArray: totalHeadcountEffort
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            { className: 'numerical' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
              displayType: 'text',
              value: grandTotal,
              thousandSeparator: true
            })
          )
        )
      )
    )
  );
}

function HeadcountSpend(props) {
  var startYear = props.startYear,
      yearsOut = props.yearsOut,
      displaySelections = props.displaySelections,
      headcountEffort = props.headcountEffort,
      programs = props.programs,
      editHeadcountEffort = props.editHeadcountEffort;


  var headcountEffortSpend = headcountEffort.map(function (hcEffort, hcEffortIndex) {
    var headcountSpend = hcEffort.map(function (hcSpend, hcSpendIndex) {
      var copiedHcSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(hcSpend);
      copiedHcSpend.amount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(copiedHcSpend.amount * programs[hcEffortIndex].fteRate, 1000);
      return copiedHcSpend;
    });
    return headcountSpend;
  });

  var headcountEffortRow = headcountEffortSpend.map(function (hcEffort, hcEffortIndex) {
    var totalHeadcountEffort = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(hcEffort);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          programs[hcEffortIndex].name
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: programs[hcEffortIndex].fteRate,
            thousandSeparator: true
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataRows, {
          startYear: startYear,
          displaySelections: displaySelections,
          dataArray: hcEffort,
          yearsOut: yearsOut,
          input: 'No'
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: totalHeadcountEffort,
            thousandSeparator: true
          })
        )
      )
    );
  });

  var totalHeadcountSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(headcountEffortSpend);
  var grandTotal = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(totalHeadcountSpend);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Headcount-Spend' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Headcount Spend by Program'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Program'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            { className: 'numerical' },
            'FTE Rate'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TablePeriodHeaders, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Total Headcount Spend'
          )
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        headcountEffortRow,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Total'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('td', null),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TotalRows, {
            displaySelections: displaySelections,
            dataArray: totalHeadcountSpend
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            { className: 'numerical' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
              displayType: 'text',
              value: grandTotal,
              thousandSeparator: true
            })
          )
        )
      )
    )
  );
}

function TotalProgramSpend(props) {
  var startYear = props.startYear,
      yearsOut = props.yearsOut,
      displaySelections = props.displaySelections,
      externalSpend = props.externalSpend,
      headcountEffort = props.headcountEffort,
      programs = props.programs,
      editHeadcountEffort = props.editHeadcountEffort,
      totalProgramSpend = props.totalProgramSpend,
      grandTotalSpend = props.grandTotalSpend,
      dollarCompleteCum = props.dollarCompleteCum,
      percentCompleteCum = props.percentCompleteCum,
      percentComplete = props.percentComplete,
      percentTotal = props.percentTotal,
      percentTotalCum = props.percentTotalCum,
      totalSpend = props.totalSpend;


  var totalProgRow = totalProgramSpend.map(function (totalProg, progIndex) {
    var totalProgramSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(totalProg);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          programs[progIndex].name
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataRows, {
          startYear: startYear,
          displaySelections: displaySelections,
          dataArray: totalProg,
          yearsOut: yearsOut,
          input: 'No'
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: totalProgramSpend,
            thousandSeparator: true
          })
        )
      )
    );
  });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Total-Program-Spend' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Total Program Spend'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Program'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TablePeriodHeaders, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            { className: 'numerical' },
            'Total Program Spend'
          )
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        totalProgRow,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Total development costs ($)'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TotalRows, {
            displaySelections: displaySelections,
            dataArray: totalSpend
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            { className: 'numerical' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
              displayType: 'text',
              value: grandTotalSpend,
              thousandSeparator: true
            })
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Total development costs (%)'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataRows, {
            startYear: startYear,
            displaySelections: displaySelections,
            dataArray: percentComplete,
            yearsOut: yearsOut,
            input: 'No',
            suffix: '%'
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            { className: 'numerical' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
              displayType: 'text',
              value: percentTotal * 100,
              thousandSeparator: true,
              suffix: '%'
            })
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Running total development costs ($)'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CummulativeDataRows, {
            startYear: startYear,
            displaySelections: displaySelections,
            dataArray: dollarCompleteCum,
            yearsOut: yearsOut,
            input: 'No'
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('td', null)
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Running total development costs (%)'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CummulativeDataRows, {
            startYear: startYear,
            displaySelections: displaySelections,
            dataArray: percentCompleteCum,
            yearsOut: yearsOut,
            input: 'No',
            suffix: '%'
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('td', null)
        )
      )
    )
  );
}

function RevenueRecognized(props) {
  var startYear = props.startYear,
      yearsOut = props.yearsOut,
      displaySelections = props.displaySelections,
      revenueMilestones = props.revenueMilestones,
      percentComplete = props.percentComplete,
      percentCompleteCum = props.percentCompleteCum,
      scenarioDate = props.scenarioDate;


  var milestoneRows = revenueMilestones.map(function (milestone, milestoneIndex) {
    var milestoneRevEarned = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculateRevenue"])(startYear, yearsOut, milestone, percentComplete, percentCompleteCum);
    var totalRevenueEarned = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(milestoneRevEarned);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tr',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          milestone.name
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataRows, {
          startYear: startYear,
          displaySelections: displaySelections,
          dataArray: milestoneRevEarned,
          yearsOut: yearsOut,
          input: 'No'
        }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(totalRevenueEarned, 1),
            thousandSeparator: true
          })
        )
      )
    );
  });

  var milestoneRevEarned = revenueMilestones.map(function (milestone) {
    var milestoneRev = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculateRevenue"])(startYear, yearsOut, milestone, percentComplete, percentCompleteCum);
    return milestoneRev;
  });

  var totalRevenueEarned = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(milestoneRevEarned);
  var grandTotalRevenue = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(totalRevenueEarned);

  var selectedQtr = Number(scenarioDate[1]);
  var selectedYear = Number(scenarioDate.slice(3));
  var currentPeriodRev = 0;
  totalRevenueEarned.forEach(function (period) {
    if (period.quarter === selectedQtr && period.year === selectedYear) {
      return currentPeriodRev += period.amount;
    }
  });
  var currentYTDPeriodRev = 0;
  totalRevenueEarned.forEach(function (period) {
    if (period.quarter <= selectedQtr && period.year === selectedYear) {
      return currentYTDPeriodRev += period.amount;
    }
  });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Revenue-Recognized' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Revenue Recognized'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            null,
            'Milestone'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TablePeriodHeaders, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'th',
            { className: 'numerical' },
            'Total Milestone Revenue'
          )
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        milestoneRows,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Total Revenue'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TotalRows, {
            displaySelections: displaySelections,
            dataArray: totalRevenueEarned
          }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            { className: 'numerical' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
              displayType: 'text',
              value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(grandTotalRevenue, 1),
              thousandSeparator: true
            })
          )
        )
      )
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('br', null),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            scenarioDate,
            ' QTD revenue'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            { className: 'numerical' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
              displayType: 'text',
              value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(currentPeriodRev, 1),
              thousandSeparator: true
            })
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            scenarioDate,
            ' YTD revenue'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            { className: 'numerical' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
              displayType: 'text',
              value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(currentYTDPeriodRev, 1),
              thousandSeparator: true
            })
          )
        )
      )
    )
  );
}

function DeferredRevenueRoll(props) {
  var startYear = props.startYear,
      yearsOut = props.yearsOut,
      displaySelections = props.displaySelections,
      revenueMilestones = props.revenueMilestones,
      percentComplete = props.percentComplete,
      percentCompleteCum = props.percentCompleteCum;


  var milestoneRevEarned = revenueMilestones.map(function (milestone) {
    var milestoneRev = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculateRevenue"])(startYear, yearsOut, milestone, percentComplete, percentCompleteCum);
    return milestoneRev;
  });

  var totalRevenueEarned = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(milestoneRevEarned);

  var milestoneReceived = Object(_model__WEBPACK_IMPORTED_MODULE_4__["addDataArray"])(startYear, yearsOut);
  milestoneReceived.map(function (period, periodIndex) {
    revenueMilestones.forEach(function (milestone) {
      var milestoneEarnedQtr = Number(milestone.dateEarned.slice(1, 2));
      var milestoneEarnedYear = Number(milestone.dateEarned.slice(3));
      if (period.year === milestoneEarnedYear && period.quarter === milestoneEarnedQtr) {
        period.amount += milestone.amount;
      }
    });
    return revenueMilestones;
  });

  var deferredRevEndBalance = Object(_model__WEBPACK_IMPORTED_MODULE_4__["addDataArray"])(startYear, yearsOut);
  deferredRevEndBalance.map(function (period, periodIndex) {
    var begBalance = 0;
    if (periodIndex > 0) {
      begBalance = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(deferredRevEndBalance[periodIndex - 1].amount);
    };
    var inflows = milestoneReceived[periodIndex].amount;
    var outflows = totalRevenueEarned[periodIndex].amount;
    period.amount = begBalance + inflows - outflows;
    return period;
  });

  var deferredRevenueBegBalance = Object(_model__WEBPACK_IMPORTED_MODULE_4__["addDataArray"])(startYear, yearsOut);
  deferredRevenueBegBalance.map(function (period, periodIndex) {
    var begBalance = 0;
    if (periodIndex > 0) {
      begBalance = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(deferredRevEndBalance[periodIndex - 1].amount);
    } else {
      begBalance = Number(0);
    };
    period.amount = begBalance;
  });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'section',
    { id: 'Deferred-Revenue-Rollforward' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'h2',
      null,
      'Deferred Revenue Rollforward'
    ),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'table',
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'thead',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('th', null),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TablePeriodHeaders, {
            startYear: startYear,
            yearsOut: yearsOut,
            displaySelections: displaySelections
          })
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'tbody',
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Beg Balance'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CummulativeTotalRows, {
            displaySelections: displaySelections,
            dataArray: deferredRevenueBegBalance,
            startOrEnd: 'start'
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Additions'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TotalRows, {
            displaySelections: displaySelections,
            dataArray: milestoneReceived
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'Amortization'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TotalRows, {
            displaySelections: displaySelections,
            dataArray: totalRevenueEarned
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'tr',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'td',
            null,
            'End Balance'
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CummulativeTotalRows, {
            displaySelections: displaySelections,
            dataArray: deferredRevEndBalance,
            startOrEnd: 'end'
          })
        )
      )
    )
  );
}

var PeriodBridge = function (_React$Component3) {
  _inherits(PeriodBridge, _React$Component3);

  function PeriodBridge(props) {
    _classCallCheck(this, PeriodBridge);

    var _this6 = _possibleConstructorReturn(this, (PeriodBridge.__proto__ || Object.getPrototypeOf(PeriodBridge)).call(this, props));

    _this6.state = {
      selectedPeriod: "Q1 2018",
      selectedComparisonIndex: 0,
      selectedPeriodType: "QTD"
    };

    _this6.setSelectedPeriod = _this6.setSelectedPeriod.bind(_this6);
    _this6.setSelectedComparisonIndex = _this6.setSelectedComparisonIndex.bind(_this6);
    _this6.setSelectedPeriodType = _this6.setSelectedPeriodType.bind(_this6);
    return _this6;
  }

  _createClass(PeriodBridge, [{
    key: 'setSelectedPeriod',
    value: function setSelectedPeriod(newPeriod) {
      var newSelectedPeriod = newPeriod;
      this.setState({ selectedPeriod: newPeriod });
    }
  }, {
    key: 'setSelectedComparisonIndex',
    value: function setSelectedComparisonIndex(newComparison) {
      var scenarios = this.props.scenarios;
      var newIndex = 0;
      scenarios.forEach(function (scenario, scenarioIndex) {
        if (scenario.scenarioName === newComparison) {
          newIndex = scenarioIndex;
          return newIndex;
        }
      });
      this.setState({ selectedComparisonIndex: newIndex });
    }
  }, {
    key: 'setSelectedPeriodType',
    value: function setSelectedPeriodType(newType) {
      var newSelectedPeriodType = newType;
      this.setState({ selectedPeriodType: newSelectedPeriodType });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var programs = this.props.programs;
      var startYear = this.props.startYear;
      var yearsOut = this.props.yearsOut;
      var percentComplete = this.props.percentComplete;
      var percentCompleteCum = this.props.percentCompleteCum;
      var selectedQtr = Number(this.state.selectedPeriod[1]);
      var selectedYear = Number(this.state.selectedPeriod.slice(3));
      var periodSelections = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodLabels"])(startYear, yearsOut);
      var scenarios = this.props.scenarios;
      var revenueMilestones = this.props.revenueMilestones;
      var selectedPeriodType = this.state.selectedPeriodType;

      //Selected Period Variables//
      var externalSpend = this.props.externalSpend;
      var headcountSpend = this.props.headcountSpend;
      var totalProgramSpend = this.props.totalProgramSpend;
      var totalSpend = this.props.totalSpend;
      var headcountEffort = this.props.headcountEffort;
      var grandTotalSpend = this.props.grandTotalSpend;

      var milestoneRevEarned = revenueMilestones.map(function (milestone) {
        var milestoneRev = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculateRevenue"])(startYear, yearsOut, milestone, percentComplete, percentCompleteCum);
        return milestoneRev;
      });

      var totalMilestones = void 0;

      var totalRevenueEarned = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(milestoneRevEarned);
      var grandTotalRevenue = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(totalRevenueEarned);

      var selectedRevenueEarned = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(totalRevenueEarned, selectedQtr, selectedYear, selectedPeriodType);

      var selectedPeriodSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(totalSpend, selectedQtr, selectedYear, selectedPeriodType);

      //Comparison Period Variable//
      var comparisonModel = this.props.scenarios[this.state.selectedComparisonIndex];
      var compRevenueMilestones = comparisonModel.revenueMilestones;
      var compExternalSpend = comparisonModel.externalSpend;
      var compHeadcountEffort = comparisonModel.headcountEffort;
      var compHeadcountSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculateHeadcountSpend"])(compHeadcountEffort, programs);
      var compTotalProgramSpend = compExternalSpend.map(function (progSpend, progIndex) {
        var totalSpend = progSpend.map(function (extSpend, extSpendIndex) {
          var copiedExtSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(extSpend);
          copiedExtSpend.amount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(extSpend.amount + compHeadcountSpend[progIndex][extSpendIndex].amount, 1000);
          return copiedExtSpend;
        });
        return totalSpend;
      });

      var compTotalSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(compTotalProgramSpend);
      var compGrandTotal = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(compTotalSpend);
      var compPercentComplete = Object(_model__WEBPACK_IMPORTED_MODULE_4__["percentCompleteArray"])(compTotalSpend);
      var compDollarCompleteCumm = Object(_model__WEBPACK_IMPORTED_MODULE_4__["dollarCompleteCummArray"])(compTotalSpend);
      var compPercentCompleteCumm = Object(_model__WEBPACK_IMPORTED_MODULE_4__["percentCompleteCummArray"])(compDollarCompleteCumm, compGrandTotal);

      var compMilestoneRevEarned = compRevenueMilestones.map(function (milestone) {
        var milestoneRev = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculateRevenue"])(startYear, yearsOut, milestone, compPercentComplete, compPercentCompleteCumm);
        return milestoneRev;
      });

      var compTotalRevenueEarned = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculatePeriodTotal"])(compMilestoneRevEarned);
      var compRevenueEarned = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(compTotalRevenueEarned, selectedQtr, selectedYear, selectedPeriodType);

      var compSelectedPeriodSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(compTotalSpend, selectedQtr, selectedYear, selectedPeriodType);;

      //Program Change in Spend Rows//
      var periodBridgeRow = programs.map(function (program, programIndex) {
        var selectedProgSpendPeriod = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(totalProgramSpend[programIndex], selectedQtr, selectedYear, selectedPeriodType);
        var grandTotalProgramSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(totalProgramSpend[programIndex]);
        var compProgSpendPeriod = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(compTotalProgramSpend[programIndex], selectedQtr, selectedYear, selectedPeriodType);
        var compGrandTotalProgramSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["arrayTotal"])(compTotalProgramSpend[programIndex]);
        var periodDifference = grandTotalRevenue * (compProgSpendPeriod / compGrandTotalProgramSpend * (compGrandTotalProgramSpend / compGrandTotal) - selectedProgSpendPeriod / grandTotalProgramSpend * (grandTotalProgramSpend / _this7.props.grandTotalSpend));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tr',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              null,
              program.name,
              ' changes'
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(periodDifference, 1),
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(compProgSpendPeriod - selectedProgSpendPeriod, 1),
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(compGrandTotalProgramSpend - grandTotalProgramSpend, 1),
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])((compProgSpendPeriod / compGrandTotalProgramSpend * (compGrandTotalProgramSpend / compGrandTotal) - selectedProgSpendPeriod / grandTotalProgramSpend * (grandTotalProgramSpend / _this7.props.grandTotalSpend)) * 100, 1000),
                thousandSeparator: true,
                suffix: "%"
              })
            )
          )
        );
      });

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'section',
        { id: 'Period-Bridge' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'h2',
          null,
          'Revenue Bridge'
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'table',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tbody',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                'Selected Period'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'select',
                  {
                    value: this.state.selectedPeriod,
                    onChange: function onChange(e) {
                      return _this7.setSelectedPeriod(e.target.value);
                    }
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: periodSelections })
                )
              )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                'Selected Comparison Model'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'select',
                  {
                    value: scenarios[this.state.selectedComparisonIndex].scenarioName,
                    onChange: function onChange(e) {
                      return _this7.setSelectedComparisonIndex(e.target.value);
                    }
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: this.props.scenarioNames })
                )
              )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                'Period Type'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'select',
                  {
                    value: this.state.setSelectedPeriodType,
                    onChange: function onChange(e) {
                      return _this7.setSelectedPeriodType(e.target.value);
                    }
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: _model__WEBPACK_IMPORTED_MODULE_4__["periodType"] })
                )
              )
            )
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('br', null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'table',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'thead',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('th', null),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Revenue'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Period Cost'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Total Cost'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                '% of Total'
              )
            )
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tbody',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                'Current Model Revenue'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'numerical' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  displayType: 'text',
                  value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(selectedRevenueEarned, 1),
                  thousandSeparator: true
                })
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'numerical' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  displayType: 'text',
                  value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(selectedPeriodSpend, 1),
                  thousandSeparator: true
                })
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'numerical' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  displayType: 'text',
                  value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(this.props.grandTotalSpend, 1),
                  thousandSeparator: true
                })
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'numerical' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  displayType: 'text',
                  value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(selectedPeriodSpend / this.props.grandTotalSpend * 100, 1000),
                  thousandSeparator: true,
                  suffix: "%"
                })
              )
            ),
            periodBridgeRow,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                'Comparison Model Revenue'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'numerical' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  displayType: 'text',
                  value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(compRevenueEarned, 1),
                  thousandSeparator: true
                })
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'numerical' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  displayType: 'text',
                  value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(compSelectedPeriodSpend, 1),
                  thousandSeparator: true
                })
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'numerical' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  displayType: 'text',
                  value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(compGrandTotal, 1),
                  thousandSeparator: true
                })
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                { className: 'numerical' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                  displayType: 'text',
                  value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(compSelectedPeriodSpend / compGrandTotal * 100, 1000),
                  thousandSeparator: true,
                  suffix: "%"
                })
              )
            )
          )
        )
      );
    }
  }]);

  return PeriodBridge;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var PeriodAnalytic = function (_React$Component4) {
  _inherits(PeriodAnalytic, _React$Component4);

  function PeriodAnalytic(props) {
    _classCallCheck(this, PeriodAnalytic);

    var _this8 = _possibleConstructorReturn(this, (PeriodAnalytic.__proto__ || Object.getPrototypeOf(PeriodAnalytic)).call(this, props));

    _this8.state = {
      selectedPeriod: _this8.props.scenarioDate,
      selectedComparisonIndex: 0,
      selectedPeriodType: "QTD"
    };

    _this8.setSelectedPeriod = _this8.setSelectedPeriod.bind(_this8);
    _this8.setSelectedComparisonIndex = _this8.setSelectedComparisonIndex.bind(_this8);
    _this8.setSelectedPeriodType = _this8.setSelectedPeriodType.bind(_this8);
    return _this8;
  }

  _createClass(PeriodAnalytic, [{
    key: 'setSelectedPeriod',
    value: function setSelectedPeriod(newPeriod) {
      var newSelectedPeriod = newPeriod;
      this.setState({ selectedPeriod: newPeriod });
    }
  }, {
    key: 'setSelectedComparisonIndex',
    value: function setSelectedComparisonIndex(newComparison) {
      var scenarios = this.props.scenarios;
      var newIndex = 0;
      scenarios.forEach(function (scenario, scenarioIndex) {
        if (scenario.scenarioName === newComparison) {
          newIndex = scenarioIndex;
          return newIndex;
        }
      });
      this.setState({ selectedComparisonIndex: newIndex });
    }
  }, {
    key: 'setSelectedPeriodType',
    value: function setSelectedPeriodType(newType) {
      var newSelectedPeriodType = newType;
      this.setState({ selectedPeriodType: newSelectedPeriodType });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var programs = this.props.programs;
      var externalSpend = this.props.externalSpend;
      var headcountSpend = this.props.headcountSpend;
      var totalProgramSpend = this.props.totalProgramSpend;
      var headcountEffort = this.props.headcountEffort;
      var startYear = this.props.startYear;
      var yearsOut = this.props.yearsOut;
      var scenarioDate = this.props.scenarioDate;
      var versionQtr = Number(scenarioDate[1]);
      var versionYear = Number(scenarioDate.slice(3));

      var selectedQtr = Number(this.state.selectedPeriod[1]);
      var selectedYear = Number(this.state.selectedPeriod.slice(3));
      var scenarios = this.props.scenarios;
      var selectedPeriodType = this.state.selectedPeriodType;
      var periodSelections = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodLabels"])(startYear, yearsOut);

      var comparisonModel = this.props.scenarios[this.state.selectedComparisonIndex];
      var compExternalSpend = comparisonModel.externalSpend;
      var compHeadcountEffort = comparisonModel.headcountEffort;
      var compHeadcountSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["calculateHeadcountSpend"])(compHeadcountEffort, programs);
      var compTotalProgramSpend = compExternalSpend.map(function (progSpend, progIndex) {
        var totalSpend = progSpend.map(function (extSpend, extSpendIndex) {
          var copiedExtSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(extSpend);
          copiedExtSpend.amount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(extSpend.amount + compHeadcountSpend[progIndex][extSpendIndex].amount, 1000);
          return copiedExtSpend;
        });
        return totalSpend;
      });

      var externalSpendAnalyticRows = programs.map(function (program, programIndex) {
        var currentProgExtSpend = externalSpend[programIndex];
        var currentPeriodSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(currentProgExtSpend, versionQtr, versionYear, selectedPeriodType);
        var compProgExtSpend = compExternalSpend[programIndex];
        var compPeriodSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(compProgExtSpend, selectedQtr, selectedYear, selectedPeriodType);
        var diffDollar = currentPeriodSpend - compPeriodSpend;
        var diffPercent = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(diffDollar / compPeriodSpend, 10000);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tr',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              null,
              program.name
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: currentPeriodSpend,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: compPeriodSpend,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: diffDollar,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: diffPercent * 100,
                suffix: "%"
              })
            )
          )
        );
      });

      var headcountSpendAnalyticRows = programs.map(function (program, programIndex) {
        var currentProgExtSpend = headcountSpend[programIndex];
        var currentPeriodSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(currentProgExtSpend, versionQtr, versionYear, selectedPeriodType);
        var compProgExtSpend = compHeadcountSpend[programIndex];
        var compPeriodSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(compProgExtSpend, selectedQtr, selectedYear, selectedPeriodType);
        var diffDollar = currentPeriodSpend - compPeriodSpend;
        var diffPercent = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(diffDollar / compPeriodSpend, 10000);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tr',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              null,
              program.name
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: currentPeriodSpend,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: compPeriodSpend,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: diffDollar,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: diffPercent * 100,
                suffix: "%"
              })
            )
          )
        );
      });

      var totalSpendAnalyticRows = programs.map(function (program, programIndex) {
        var currentProgExtSpend = totalProgramSpend[programIndex];
        var currentPeriodSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(currentProgExtSpend, versionQtr, versionYear, selectedPeriodType);
        var compProgExtSpend = compTotalProgramSpend[programIndex];
        var compPeriodSpend = Object(_model__WEBPACK_IMPORTED_MODULE_4__["periodAmountCalc"])(compProgExtSpend, selectedQtr, selectedYear, selectedPeriodType);
        var diffDollar = currentPeriodSpend - compPeriodSpend;
        var diffPercent = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(diffDollar / compPeriodSpend, 10000);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tr',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              null,
              program.name
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: currentPeriodSpend,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: compPeriodSpend,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: diffDollar,
                thousandSeparator: true
              })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'td',
              { className: 'numerical' },
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
                displayType: 'text',
                value: diffPercent * 100,
                suffix: "%"
              })
            )
          )
        );
      });

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'section',
        { id: 'Analytics' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'h2',
          null,
          'Analytic Engine'
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'table',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tbody',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                'Selected Comparison Period'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'select',
                  {
                    value: this.state.selectedPeriod,
                    onChange: function onChange(e) {
                      return _this9.setSelectedPeriod(e.target.value);
                    }
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: periodSelections })
                )
              )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                'Selected Comparison Model'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'select',
                  {
                    value: scenarios[this.state.selectedComparisonIndex].scenarioName,
                    onChange: function onChange(e) {
                      return _this9.setSelectedComparisonIndex(e.target.value);
                    }
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: this.props.scenarioNames })
                )
              )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                'Period Type'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'td',
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'select',
                  {
                    value: this.state.setSelectedPeriodType,
                    onChange: function onChange(e) {
                      return _this9.setSelectedPeriodType(e.target.value);
                    }
                  },
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dropdown, { options: _model__WEBPACK_IMPORTED_MODULE_4__["periodType"] })
                )
              )
            )
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('br', null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'table',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'thead',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'External Costs'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Current Period'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Comparison Period'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Change - $'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Change - %'
              )
            )
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tbody',
            null,
            externalSpendAnalyticRows
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('br', null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'table',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'thead',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Headcount Costs'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Current Period'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Comparison Period'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Change - $'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Change - %'
              )
            )
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tbody',
            null,
            headcountSpendAnalyticRows
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('br', null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'table',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'thead',
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'tr',
              null,
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Total Costs'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Current Period'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Comparison Period'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Change - $'
              ),
              react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'th',
                null,
                'Change - %'
              )
            )
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'tbody',
            null,
            totalSpendAnalyticRows
          )
        )
      );
    }
  }]);

  return PeriodAnalytic;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function Dropdown(_ref2) {
  var options = _ref2.options;

  var rows = options.map(function (x) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'option',
      { value: x },
      x
    );
  });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
    null,
    rows
  );
}

function DeleteItem(_ref3) {
  var removeItem = _ref3.removeItem,
      index = _ref3.index;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'td',
    { className: 'actions-cell' },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'button',
      { className: 'delete', onClick: function onClick(e) {
          removeItem(index);
        } },
      'Delete'
    )
  );
}

function AddItem(_ref4) {
  var addItem = _ref4.addItem,
      label = _ref4.label;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'button',
    { onClick: addItem, className: 'add' },
    "Add " + label
  );
}

function TablePeriodHeaders(_ref5) {
  var startYear = _ref5.startYear,
      yearsOut = _ref5.yearsOut,
      displaySelections = _ref5.displaySelections;

  var labels = [];
  displaySelections.forEach(function (selection, selectionIndex) {
    if (selection.type === "Annual") {
      labels.push("FY " + (startYear + selectionIndex));
    } else {
      for (var x = 1; x < 5; x++) {
        labels.push("Q" + x + " " + (startYear + selectionIndex));
      }
    }
  });
  var tableHeaders = labels.map(function (label) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'th',
        { className: 'numerical' },
        label
      )
    );
  });
  return tableHeaders;
}

function DataRows(props) {
  var startYear = props.startYear,
      displaySelections = props.displaySelections,
      dataArray = props.dataArray,
      yearsOut = props.yearsOut,
      programIndex = props.programIndex,
      editAmount = props.editAmount,
      input = props.input,
      suffix = props.suffix;


  var years = Object(_model__WEBPACK_IMPORTED_MODULE_4__["yearsArray"])(startYear, yearsOut);
  var displayType = Object(_model__WEBPACK_IMPORTED_MODULE_4__["displayArray"])(displaySelections);
  var calculatedData = Object(_model__WEBPACK_IMPORTED_MODULE_4__["dataToDisplay"])(displayType, dataArray);
  var dataCells = calculatedData.map(function (cell, cellIndex) {
    if (input === "Yes") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            value: cell.amount,
            className: 'numerical',
            onValueChange: function onValueChange(values, e) {
              return editAmount(cell.type, cell.quarter, cell.year, Number(values.value), programIndex);
            },
            thousandSeparator: true,
            isNumericString: true,
            decimalScale: 2
          })
        )
      );
    } else if (input === "No") {
      var cellCopy = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(cell);
      var displayAmount = 0;
      if (suffix === "%") {
        displayAmount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(cellCopy.amount * 100, 1000);
      } else {
        displayAmount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(cellCopy.amount, 1);
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: displayAmount,
            thousandSeparator: true,
            suffix: suffix
          })
        )
      );
    }
  });
  return dataCells;
}

function TotalRows(props) {
  var displaySelections = props.displaySelections,
      dataArray = props.dataArray;


  var displayType = Object(_model__WEBPACK_IMPORTED_MODULE_4__["displayArray"])(displaySelections);
  var calculatedData = Object(_model__WEBPACK_IMPORTED_MODULE_4__["dataToDisplay"])(displayType, dataArray);
  var dataCells = calculatedData.map(function (cell, cellIndex) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'td',
        { className: 'numerical' },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
          displayType: 'text',
          value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(cell.amount, 1),
          thousandSeparator: true
        })
      )
    );
  });
  return dataCells;
}

function CummulativeDataRows(props) {
  var startYear = props.startYear,
      displaySelections = props.displaySelections,
      dataArray = props.dataArray,
      yearsOut = props.yearsOut,
      programIndex = props.programIndex,
      editAmount = props.editAmount,
      input = props.input,
      suffix = props.suffix;


  var years = Object(_model__WEBPACK_IMPORTED_MODULE_4__["yearsArray"])(startYear, yearsOut);
  //Override the type to not sum in calculatedData function below//
  var displaySelectionsOverride = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(displaySelections).map(function (period) {
    period.type = "Quarterly";
    return period;
  });
  var displayType = Object(_model__WEBPACK_IMPORTED_MODULE_4__["displayArray"])(displaySelectionsOverride);
  var calculatedData = Object(_model__WEBPACK_IMPORTED_MODULE_4__["dataToDisplay"])(displayType, dataArray);
  var dataCells = calculatedData.map(function (cell, cellIndex) {
    var cellCopy = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(cell);
    var displayAmount = 0;
    if (suffix === "%") {
      displayAmount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(cellCopy.amount * 100, 1000);
    } else {
      displayAmount = Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(cellCopy.amount, 1000);
    }
    var cellYear = cell.year;
    var periodDisplayCheck = displaySelections.filter(function (year) {
      return year.year === cellYear;
    });
    var periodDisplay = periodDisplayCheck[0];
    if (periodDisplay.type === "Annual" && cell.quarter === 4) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: displayAmount,
            thousandSeparator: true,
            suffix: suffix
          })
        )
      );
    } else if (periodDisplay.type === "Quarterly") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: displayAmount,
            thousandSeparator: true,
            suffix: suffix
          })
        )
      );
    } else {
      return null;
    }
  });
  return dataCells;
}

function CummulativeTotalRows(props) {
  var displaySelections = props.displaySelections,
      dataArray = props.dataArray,
      startOrEnd = props.startOrEnd;

  //Override the type to not sum in calculatedData function below//

  var displaySelectionsOverride = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keepCloning"])(displaySelections).map(function (period) {
    period.type = "Quarterly";
    return period;
  });

  var displayType = Object(_model__WEBPACK_IMPORTED_MODULE_4__["displayArray"])(displaySelectionsOverride);
  var calculatedData = Object(_model__WEBPACK_IMPORTED_MODULE_4__["dataToDisplay"])(displayType, dataArray);
  var dataCells = calculatedData.map(function (cell, cellIndex) {
    var begOrEnd = 0;
    if (startOrEnd === "start") {
      begOrEnd = Number(1);
    } else if (startOrEnd === "end") {
      begOrEnd = Number(4);
    };
    var cellYear = cell.year;
    var periodDisplayCheck = displaySelections.filter(function (year) {
      return year.year === cellYear;
    });
    var periodDisplay = periodDisplayCheck[0];
    if (periodDisplay.type === "Annual" && cell.quarter === begOrEnd) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(cell.amount, 1),
            thousandSeparator: true
          })
        )
      );
    } else if (periodDisplay.type === "Quarterly") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
        null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'td',
          { className: 'numerical' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_2___default.a, {
            displayType: 'text',
            value: Object(_model__WEBPACK_IMPORTED_MODULE_4__["rounding"])(cell.amount, 1),
            thousandSeparator: true
          })
        )
      );
    } else {
      return null;
    }
  });
  return dataCells;
}

/***/ }),

/***/ "./static/index.js":
/*!*************************!*\
  !*** ./static/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./static/components.js");





react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_2__["PharmaRevRec"], null), document.getElementById('root'));

/***/ }),

/***/ "./static/index.scss":
/*!***************************!*\
  !*** ./static/index.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./static/model.js":
/*!*************************!*\
  !*** ./static/model.js ***!
  \*************************/
/*! exports provided: displayOptions, periodType, newAmounts, defaultState, displayArray, dataToDisplay, periodLabels, yearsArray, addDataArray, editDataArrayLength, editDataArrayYears, arrayTotal, calculatePeriodTotal, keepCloning, rounding, calculateRevenue, calculateHeadcountSpend, percentCompleteArray, dollarCompleteCummArray, percentCompleteCummArray, periodAmountCalc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayOptions", function() { return displayOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "periodType", function() { return periodType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newAmounts", function() { return newAmounts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultState", function() { return defaultState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayArray", function() { return displayArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataToDisplay", function() { return dataToDisplay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "periodLabels", function() { return periodLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yearsArray", function() { return yearsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDataArray", function() { return addDataArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editDataArrayLength", function() { return editDataArrayLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editDataArrayYears", function() { return editDataArrayYears; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayTotal", function() { return arrayTotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculatePeriodTotal", function() { return calculatePeriodTotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keepCloning", function() { return keepCloning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rounding", function() { return rounding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateRevenue", function() { return calculateRevenue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateHeadcountSpend", function() { return calculateHeadcountSpend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "percentCompleteArray", function() { return percentCompleteArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dollarCompleteCummArray", function() { return dollarCompleteCummArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "percentCompleteCummArray", function() { return percentCompleteCummArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "periodAmountCalc", function() { return periodAmountCalc; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var math = __webpack_require__(/*! math.js */ "./node_modules/math.js/index.js");

var displayOptions = ['Annual', 'Quarterly'];
var periodType = ['QTD', 'YTD', 'Full Year'];
var newAmounts = [{
  year: 0,
  quarter: 1,
  amount: 0
}, {
  year: 0,
  quarter: 2,
  amount: 0
}, {
  year: 0,
  quarter: 3,
  amount: 0
}, {
  year: 0,
  quarter: 4,
  amount: 0
}];

var defaultState = {
  version: 0,
  modelName: "Example Collaboration 606 Model",
  startYear: 2018,
  yearsOut: 3,
  activeScenarioId: 0,
  programs: [{
    name: "Program A",
    id: 1001,
    fteRate: 250000
  }, {
    name: "Program B",
    id: 1002,
    fteRate: 250000
  }],
  activityLog: [],
  scenarios: [{
    scenarioName: "Q2 2018 close",
    scenarioDate: "Q2 2018",
    displaySelections: [{
      year: 2018,
      type: "Annual"
    }, {
      year: 2019,
      type: "Annual"
    }, {
      year: 2020,
      type: "Annual"
    }],
    revenueMilestones: [{
      id: 1000,
      name: "Upfront Payment",
      dateEarned: "Q1 2018",
      datePaid: "Q1 2018",
      amount: 100000
    }],
    externalSpend: [[{
      year: 2018,
      quarter: 1,
      amount: 100
    }, {
      year: 2018,
      quarter: 2,
      amount: 100
    }, {
      year: 2018,
      quarter: 3,
      amount: 100
    }, {
      year: 2018,
      quarter: 4,
      amount: 100
    }, {
      year: 2019,
      quarter: 1,
      amount: 100
    }, {
      year: 2019,
      quarter: 2,
      amount: 100
    }, {
      year: 2019,
      quarter: 3,
      amount: 100
    }, {
      year: 2019,
      quarter: 4,
      amount: 100
    }, {
      year: 2020,
      quarter: 1,
      amount: 100
    }, {
      year: 2020,
      quarter: 2,
      amount: 100
    }, {
      year: 2020,
      quarter: 3,
      amount: 100
    }, {
      year: 2020,
      quarter: 4,
      amount: 100
    }], [{
      year: 2018,
      quarter: 1,
      amount: 100
    }, {
      year: 2018,
      quarter: 2,
      amount: 100
    }, {
      year: 2018,
      quarter: 3,
      amount: 100
    }, {
      year: 2018,
      quarter: 4,
      amount: 100
    }, {
      year: 2019,
      quarter: 1,
      amount: 100
    }, {
      year: 2019,
      quarter: 2,
      amount: 100
    }, {
      year: 2019,
      quarter: 3,
      amount: 100
    }, {
      year: 2019,
      quarter: 4,
      amount: 100
    }, {
      year: 2020,
      quarter: 1,
      amount: 100
    }, {
      year: 2020,
      quarter: 2,
      amount: 100
    }, {
      year: 2020,
      quarter: 3,
      amount: 100
    }, {
      year: 2020,
      quarter: 4,
      amount: 100
    }]],
    headcountEffort: [[{
      year: 2018,
      quarter: 1,
      amount: 2
    }, {
      year: 2018,
      quarter: 2,
      amount: 2
    }, {
      year: 2018,
      quarter: 3,
      amount: 2
    }, {
      year: 2018,
      quarter: 4,
      amount: 2
    }, {
      year: 2019,
      quarter: 1,
      amount: 2
    }, {
      year: 2019,
      quarter: 2,
      amount: 2
    }, {
      year: 2019,
      quarter: 3,
      amount: 2
    }, {
      year: 2019,
      quarter: 4,
      amount: 2
    }, {
      year: 2020,
      quarter: 1,
      amount: 2
    }, {
      year: 2020,
      quarter: 2,
      amount: 2
    }, {
      year: 2020,
      quarter: 3,
      amount: 2
    }, {
      year: 2020,
      quarter: 4,
      amount: 2
    }], [{
      year: 2018,
      quarter: 1,
      amount: 2
    }, {
      year: 2018,
      quarter: 2,
      amount: 2
    }, {
      year: 2018,
      quarter: 3,
      amount: 2
    }, {
      year: 2018,
      quarter: 4,
      amount: 2
    }, {
      year: 2019,
      quarter: 1,
      amount: 2
    }, {
      year: 2019,
      quarter: 2,
      amount: 2
    }, {
      year: 2019,
      quarter: 3,
      amount: 2
    }, {
      year: 2019,
      quarter: 4,
      amount: 2
    }, {
      year: 2020,
      quarter: 1,
      amount: 2
    }, {
      year: 2020,
      quarter: 2,
      amount: 2
    }, {
      year: 2020,
      quarter: 3,
      amount: 2
    }, {
      year: 2020,
      quarter: 4,
      amount: 2
    }]],
    analyticComparisonIndex: 0
  }]

  //Utility Components

};function displayArray(displaySelections) {
  var displayArray = [];

  displaySelections.forEach(function (yearSelection) {
    if (yearSelection.type === "Quarterly") {
      for (var x = 1; x < 5; x++) {
        var periodTotal = Object();
        periodTotal.year = yearSelection.year;
        periodTotal.quarter = x;
        periodTotal.type = yearSelection.type;
        periodTotal.amount = 0;
        displayArray.push(periodTotal);
      }
    } else if (yearSelection.type === "Annual") {
      var _periodTotal = Object();
      _periodTotal.year = yearSelection.year;
      _periodTotal.type = yearSelection.type;
      _periodTotal.amount = 0;
      displayArray.push(_periodTotal);
    }
  });
  return displayArray;
}

function dataToDisplay(displayType, dataArray) {
  var dataRows = displayType.map(function (displayPeriod) {
    dataArray.forEach(function (amount, amountIndex) {
      var amountYear = amount.year;
      var amountQtr = amount.quarter;
      if (displayPeriod.year === amountYear && displayPeriod.type === "Quarterly" && displayPeriod.quarter === amountQtr) {
        displayPeriod.amount += amount.amount;
      } else if (displayPeriod.year === amountYear && displayPeriod.type === "Annual") {
        displayPeriod.amount += amount.amount;
      }
    });
    return displayPeriod;
  });

  return dataRows;
}

function periodLabels(startYear, yearsOut) {
  var periodLabels = [];
  for (var y = startYear; y < startYear + yearsOut; y++) {
    for (var x = 1; x < 5; x++) {
      periodLabels.push("Q" + x + " " + y);
    }
  }
  return periodLabels;
}

function yearsArray(startYear, yearsOut) {
  var years = [];
  for (var x = 0; x < yearsOut; x++) {
    years.push(startYear + x);
  };
  return years;
}

function addDataArray(startYear, yearsOut) {
  var newDataArray = [];
  for (var x = startYear; x < startYear + yearsOut; x++) {
    for (var y = 1; y < 5; y++) {
      var newCell = Object();
      newCell.year = x;
      newCell.quarter = y;
      newCell.amount = 0;
      newDataArray.push(newCell);
    }
  }

  return newDataArray;
}

function editDataArrayLength(array, startYear, yearsOut) {
  if (array.length < yearsOut * 4) {
    var _ret = function () {
      var newPeriods = yearsOut - array.length / 4;
      var newArray = keepCloning(array);
      for (var x = 0; x < newPeriods; x++) {
        newAmounts.forEach(function (amount) {
          newArray.push(keepCloning(amount));
        });
      }
      return {
        v: newArray
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return array;
  }
}

function editDataArrayYears(array, startYear, yearsOut) {
  var newYear = startYear;
  var newArray = array.map(function (cell, cellIndex) {
    if (cell.quarter !== 4) {
      cell.year = startYear;
    } else {
      cell.year = startYear;
      startYear += 1;
    }
    return cell;
  });

  return newArray;
}

function arrayTotal(array) {
  var initialTotal = 0;
  var total = array.reduce(function (a, b) {
    return a + b.amount;
  }, initialTotal);
  return total;
}

function calculatePeriodTotal(arrayOfArrays) {
  if (arrayOfArrays.length === 1) {
    return keepCloning(arrayOfArrays[0]);
  } else if (arrayOfArrays.length > 1) {
    var totalArray = [];
    arrayOfArrays.forEach(function (array, arrayIndex) {
      if (arrayIndex === 0) {
        return totalArray = keepCloning(array);
      } else {
        array.forEach(function (cell, cellIndex) {
          return totalArray[cellIndex].amount += cell.amount;
        });
      }
    });
    return totalArray;
  }
}

function keepCloning(objectpassed) {
  if (objectpassed === null || (typeof objectpassed === 'undefined' ? 'undefined' : _typeof(objectpassed)) !== 'object') {
    return objectpassed;
  }

  var temporaryStorage = objectpassed.constructor();
  for (var key in objectpassed) {
    temporaryStorage[key] = keepCloning(objectpassed[key]);
  }
  return temporaryStorage;
}

function rounding(input, decimals) {
  var roundNumber = Math.round(input * decimals) / decimals;
  return roundNumber;
}

function calculateRevenue(startYear, yearsOut, milestone, percentComplete, percentCompleteCum) {
  var milestoneEarnedQtr = Number(milestone.dateEarned.slice(1, 2));
  var milestoneEarnedYear = Number(milestone.dateEarned.slice(3));
  var blankDataArray = addDataArray(startYear, yearsOut);
  blankDataArray.map(function (period, periodIndex) {
    if (period.year === milestoneEarnedYear && period.quarter === milestoneEarnedQtr) {
      period.amount = percentCompleteCum[periodIndex].amount * milestone.amount;
      return period;
    } else if (period.year === milestoneEarnedYear && period.quarter > milestoneEarnedQtr) {
      period.amount = percentComplete[periodIndex].amount * milestone.amount;
      return period;
    } else if (period.year > milestoneEarnedYear) {
      period.amount = percentComplete[periodIndex].amount * milestone.amount;
      return period;
    } else {
      period.amount = 0;
      return period;
    }
  });
  return blankDataArray;
}

function calculateHeadcountSpend(headcountEffort, programs) {
  var headcountSpend = headcountEffort.map(function (progEffort, progIndex) {
    var copiedProgEffort = keepCloning(progEffort);
    copiedProgEffort.map(function (copiedHcEffort) {
      copiedHcEffort.amount = rounding(copiedHcEffort.amount * programs[progIndex].fteRate, 100);
      return copiedHcEffort;
    });
    return copiedProgEffort;
  });
  return headcountSpend;
}

function percentCompleteArray(array) {
  var grandTotal = arrayTotal(array);
  var percentComplete = array.map(function (period, periodIndex) {
    var periodCopy = keepCloning(period);
    periodCopy.amount = period.amount / grandTotal;
    math.format(periodCopy.amount, { precision: 4 });
    return periodCopy;
  });
  return percentComplete;
}

function dollarCompleteCummArray(totalSpend) {
  var dollarCompleteCummArray = totalSpend.map(function (period, periodIndex) {
    var totalSpendThruPeriod = keepCloning(totalSpend).slice(0, periodIndex + 1);
    var cummulativeTotal = arrayTotal(totalSpendThruPeriod);
    var periodCopy = keepCloning(period);
    periodCopy.amount = cummulativeTotal;
    return periodCopy;
  });
  return dollarCompleteCummArray;
}

function percentCompleteCummArray(dollarCompleteCummArray, grandTotalSpend) {
  var percentCompleteCummArray = dollarCompleteCummArray.map(function (period, periodIndex) {
    var periodCopy = keepCloning(period);
    periodCopy.amount = rounding(period.amount / grandTotalSpend, 1000000);
    return periodCopy;
  });
  return percentCompleteCummArray;
}

function periodAmountCalc(array, currentQtr, currentYear, periodType) {
  var periodAmount = 0;
  array.forEach(function (period) {
    if (periodType === "QTD" && period.quarter === currentQtr && period.year === currentYear) {
      return periodAmount += period.amount;
    } else if (periodType === "YTD" && period.quarter <= currentQtr && period.year === currentYear) {
      return periodAmount += period.amount;
    } else if (periodType === "Full Year" && period.year === currentYear) {
      return periodAmount += period.amount;
    }
  });
  return periodAmount;
}

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./static/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./static/index.js */"./static/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.js.map