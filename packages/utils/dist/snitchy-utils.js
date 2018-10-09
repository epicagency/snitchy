(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Snitchy utils", [], factory);
	else if(typeof exports === 'object')
		exports["Snitchy utils"] = factory();
	else
		root["Snitchy utils"] = factory();
})(window, function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/IndexedMultimap.js":
/*!********************************!*\
  !*** ./src/IndexedMultimap.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.IndexedMultimap = void 0;\n\nvar _Multimap2 = __webpack_require__(/*! ./Multimap */ \"./src/Multimap.js\");\n\nvar _utils = __webpack_require__(/*! ./_utils */ \"./src/_utils.js\");\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar IndexedMultimap =\n/*#__PURE__*/\nfunction (_Multimap) {\n  _inherits(IndexedMultimap, _Multimap);\n\n  function IndexedMultimap() {\n    var _this;\n\n    _classCallCheck(this, IndexedMultimap);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndexedMultimap).call(this));\n    _this.keysByValue = new Map();\n    return _this;\n  }\n\n  _createClass(IndexedMultimap, [{\n    key: \"add\",\n    value: function add(key, value) {\n      _get(_getPrototypeOf(IndexedMultimap.prototype), \"add\", this).call(this, key, value);\n\n      (0, _utils.add)(this.keysByValue, value, key);\n    }\n  }, {\n    key: \"delete\",\n    value: function _delete(key, value) {\n      _get(_getPrototypeOf(IndexedMultimap.prototype), \"delete\", this).call(this, key, value);\n\n      (0, _utils.del)(this.keysByValue, value, key);\n    }\n  }, {\n    key: \"hasValue\",\n    value: function hasValue(value) {\n      return this.keysByValue.has(value);\n    }\n  }, {\n    key: \"getKeysForValue\",\n    value: function getKeysForValue(value) {\n      var set = this.keysByValue.get(value);\n      return set ? Array.from(set) : [];\n    }\n  }, {\n    key: \"values\",\n    get: function get() {\n      return Array.from(this.keysByValue.keys());\n    }\n  }]);\n\n  return IndexedMultimap;\n}(_Multimap2.Multimap);\n\nexports.IndexedMultimap = IndexedMultimap;\n\n//# sourceURL=webpack://Snitchy_utils/./src/IndexedMultimap.js?");

/***/ }),

/***/ "./src/Multimap.js":
/*!*************************!*\
  !*** ./src/Multimap.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Multimap = void 0;\n\nvar _utils = __webpack_require__(/*! ./_utils */ \"./src/_utils.js\");\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Multimap =\n/*#__PURE__*/\nfunction () {\n  function Multimap() {\n    _classCallCheck(this, Multimap);\n\n    this.valuesByKey = new Map();\n  }\n\n  _createClass(Multimap, [{\n    key: \"add\",\n    value: function add(key, value) {\n      (0, _utils.add)(this.valuesByKey, key, value);\n    }\n  }, {\n    key: \"delete\",\n    value: function _delete(key, value) {\n      (0, _utils.del)(this.valuesByKey, key, value);\n    }\n  }, {\n    key: \"has\",\n    value: function has(key, value) {\n      var values = this.valuesByKey.get(key);\n      return values && values.has(value);\n    }\n  }, {\n    key: \"hasKey\",\n    value: function hasKey(key) {\n      return this.valuesByKey.has(key);\n    }\n  }, {\n    key: \"hasValue\",\n    value: function hasValue(value) {\n      var sets = Array.from(this.valuesByKey.values());\n      return sets.some(function (set) {\n        return set.has(value);\n      });\n    }\n  }, {\n    key: \"getValuesForKey\",\n    value: function getValuesForKey(key) {\n      var values = this.valuesByKey.get(key);\n      return values ? Array.from(values) : [];\n    }\n  }, {\n    key: \"getKeysForValue\",\n    value: function getKeysForValue(value) {\n      return Array.from(this.valuesByKey).filter(function (_ref) {\n        var _ref2 = _slicedToArray(_ref, 2),\n            values = _ref2[1];\n\n        return values.has(value);\n      }).map(function (_ref3) {\n        var _ref4 = _slicedToArray(_ref3, 1),\n            key = _ref4[0];\n\n        return key;\n      });\n    }\n  }, {\n    key: \"values\",\n    get: function get() {\n      var sets = Array.from(this.valuesByKey.values());\n      return sets.reduce(function (values, set) {\n        return values.concat(Array.from(set));\n      }, []);\n    }\n  }, {\n    key: \"size\",\n    get: function get() {\n      var sets = Array.from(this.valuesByKey.values());\n      return sets.reduce(function (size, set) {\n        return size + set.size;\n      }, 0);\n    }\n  }]);\n\n  return Multimap;\n}();\n\nexports.Multimap = Multimap;\n\n//# sourceURL=webpack://Snitchy_utils/./src/Multimap.js?");

/***/ }),

/***/ "./src/_utils.js":
/*!***********************!*\
  !*** ./src/_utils.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.add = add;\nexports.del = del;\nexports.fetch = fetch;\nexports.prune = prune;\n\n/**\n * Add key, value to multimap\n *\n * @export\n * @param {Map} map multimap\n * @param {any} key key\n * @param {any} value value\n * @returns {undefined}\n */\nfunction add(map, key, value) {\n  fetch(map, key).add(value);\n}\n/**\n* Delete key, value to multimap\n*\n* @export\n* @param {Map} map multimap\n* @param {any} key key\n* @param {any} value value\n@returns {undefined}\n*/\n\n\nfunction del(map, key, value) {\n  fetch(map, key).delete(value);\n  prune(map, key);\n}\n/**\n * Fetch multimap value\n *\n * @export\n * @param {Map} map multimap\n * @param {any} key key\n * @returns {Set} multimap value\n */\n\n\nfunction fetch(map, key) {\n  var values = map.get(key);\n\n  if (!values) {\n    values = new Set();\n    map.set(key, values);\n  }\n\n  return values;\n}\n/**\n* Clean multimap key\n*\n* @export\n* @param {Map} map multimap\n* @param {any} key key\n* @returns {Set} multimap value\n*/\n\n\nfunction prune(map, key) {\n  var values = map.get(key);\n\n  if (values !== null && values.size === 0) {\n    map.delete(key);\n  }\n}\n\n//# sourceURL=webpack://Snitchy_utils/./src/_utils.js?");

/***/ }),

/***/ "./src/camelcase.js":
/*!**************************!*\
  !*** ./src/camelcase.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.camelcase = camelcase;\n\n/**\n* Convert kebab-case to camelCase\n*\n* @param {String} value original\n* @returns {String} camel-cased\n*/\nfunction camelcase(value) {\n  return value.toString().replace(/(-[a-z])/g, function (_, char) {\n    return \"\".concat(char.replace('-', '').toUpperCase());\n  });\n}\n\n//# sourceURL=webpack://Snitchy_utils/./src/camelcase.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _camelcase = __webpack_require__(/*! ./camelcase */ \"./src/camelcase.js\");\n\nObject.keys(_camelcase).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _camelcase[key];\n    }\n  });\n});\n\nvar _kebabcase = __webpack_require__(/*! ./kebabcase */ \"./src/kebabcase.js\");\n\nObject.keys(_kebabcase).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _kebabcase[key];\n    }\n  });\n});\n\nvar _lcfirst = __webpack_require__(/*! ./lcfirst */ \"./src/lcfirst.js\");\n\nObject.keys(_lcfirst).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _lcfirst[key];\n    }\n  });\n});\n\nvar _ucfirst = __webpack_require__(/*! ./ucfirst */ \"./src/ucfirst.js\");\n\nObject.keys(_ucfirst).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _ucfirst[key];\n    }\n  });\n});\n\nvar _Multimap = __webpack_require__(/*! ./Multimap */ \"./src/Multimap.js\");\n\nObject.keys(_Multimap).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _Multimap[key];\n    }\n  });\n});\n\nvar _IndexedMultimap = __webpack_require__(/*! ./IndexedMultimap */ \"./src/IndexedMultimap.js\");\n\nObject.keys(_IndexedMultimap).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _IndexedMultimap[key];\n    }\n  });\n});\n\n//# sourceURL=webpack://Snitchy_utils/./src/index.js?");

/***/ }),

/***/ "./src/kebabcase.js":
/*!**************************!*\
  !*** ./src/kebabcase.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.kebabcase = kebabcase;\n\n/**\n* Convert camelCase to kebab-case\n*\n* @param {String} value original\n* @returns {String} kebab-cased\n*/\nfunction kebabcase(value) {\n  return value.toString().replace(/([A-Z])/g, function (_, char) {\n    return \"-\".concat(char.toLowerCase());\n  });\n}\n\n//# sourceURL=webpack://Snitchy_utils/./src/kebabcase.js?");

/***/ }),

/***/ "./src/lcfirst.js":
/*!************************!*\
  !*** ./src/lcfirst.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.lcfirst = lcfirst;\n\n/**\n * Lowercase first\n *\n * @param {string} str string to format\n * @returns {string} formatted string\n */\nfunction lcfirst(str) {\n  return str.charAt(0).toLowerCase() + str.slice(1);\n}\n\n//# sourceURL=webpack://Snitchy_utils/./src/lcfirst.js?");

/***/ }),

/***/ "./src/ucfirst.js":
/*!************************!*\
  !*** ./src/ucfirst.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ucfirst = ucfirst;\n\n/**\n * Uppercase first\n *\n * @param {string} str string to format\n * @returns {string} formatted string\n */\nfunction ucfirst(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\n//# sourceURL=webpack://Snitchy_utils/./src/ucfirst.js?");

/***/ })

/******/ });
});