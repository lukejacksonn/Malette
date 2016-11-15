(function () {
function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
__$styleInject("body,\nbody * {\n  display: block;\n  flex: none;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent;\n}\n\nbody {\n  font-family: \"Roboto\", sans-serif;\n  font-size: 16px;\n}\n",undefined);

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var ev = {};

var Publish = function Publish(topic, args) {
  var _this = this;

  var subs = ev[topic] || [];
  return subs.map(function (x) {
    return x.apply(_this, args || []);
  });
};

var Subscribe = function Subscribe(topic, cb) {
  if (!ev[topic]) ev[topic] = [];
  ev[topic].push(cb);
  return [topic, cb];
};

var Fetch = function Fetch(json) {
  return typeof json === 'string' ? fetch(json).then(function (res) {
    return res.json();
  }) : Promise.resolve(json);
};

var Node = function Node(template) {
  return function (json) {
    return json.map(function (x) {
      var range = document.createRange();
      range.selectNode(document.body);
      var $n = range.createContextualFragment(template(x).trim());
      $n.data = x;
      return $n;
    });
  };
};

var Bind = function Bind(selector) {
  return function (event) {
    return function (callback) {
      return function (nodes) {
        return nodes.map(function (x) {
          return [].concat(toConsumableArray(x.querySelectorAll(selector))).forEach(function (y) {
            return y.addEventListener(event, callback.bind(x));
          }) ? x : x;
        });
      };
    };
  };
};



var Draw = function Draw(element) {
  return function (nodes) {
    return nodes.map(function (x) {
      return element.appendChild(x);
    });
  };
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

var select_1 = select;

var clipboardAction = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'select'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, select_1);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(commonjsGlobal, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.addEventListener('focus', window.scrollTo(0, yPosition));
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                document.body.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    document.body.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    document.body.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.target) {
                    this.target.blur();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});
});

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

var index = E;

var is$1 = createCommonjsModule(function (module, exports) {
/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};
});

/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest$1 (element, selector) {
    while (element && element !== document) {
        if (element.matches(selector)) return element;
        element = element.parentNode;
    }
}

var closest_1 = closest$1;

var closest = closest_1;

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate$1(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

var delegate_1 = delegate$1;

var is = is$1;
var delegate = delegate_1;

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

var listen_1 = listen;

var clipboard$1 = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, clipboardAction, index, listen_1);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(commonjsGlobal, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});
});

var Clipboard = unwrapExports(clipboard$1);

__$styleInject("colors- {\n  display: flex;\n  width: calc(100% - 360px);\n  flex-flow: row wrap;\n}\ncolors- color- {\n  flex: 1 1 25%;\n  position: relative;\n  min-width: 10rem;\n}\ncolors- color-:before {\n  display: block;\n  content: \"\";\n  width: 100%;\n  padding-top: 80%;\n}\ncolors- color-:not(:hover) div {\n  display: none;\n  z-index: 0;\n}\ncolors- color- > div {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  box-shadow: 0 0 .5rem rgba(0,0,0,0.38);\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\ncolors- color- > div *+* {\n  margin-top: .25rem;\n}\ncolors- color- name- {\n  font-size: 1rem;\n  font-weight: bold;\n}\ncolors- color- hex- {\n  font-size: .618rem;\n  cursor: pointer;\n}\ncolors- color- hex-:hover {\n  text-decoration: underline;\n}\ncolors- color-[normal-text] {\n  color: rgba(255, 255, 255, 0.7);\n}\ncolors- color-[dark-text] {\n  color: rgba(0, 0, 0, 0.87);\n}\ncolors- color-[dark-strong-text] {\n  color: #000;\n}\ncolors- color-[light-text] {\n  color: rgba(255, 255, 255, 0.87);\n}\ncolors- color-[light-strong-text] {\n  color: #fff;\n}\n",undefined);

var action = {
  picked: function picked(e) {
    if (e.target.nodeName !== 'HEX-') {
      Publish('color/picked', [this.data]);
    }
  },
  hovered: function hovered() {
    Publish('color/hovered', [this.data]);
  }
};

var ColorList = (function () {
  var $colors = document.createElement('colors-');

  Fetch('colors.json').then(Node(function (_ref) {
    var base = _ref.base,
        shade = _ref.shade,
        hex = _ref.hex,
        text = _ref.text;
    return '\n    <color- ' + text + ' style=\'background-color:#' + hex + '\'>\n      <div>\n        <name->' + base.replace(' ', '-') + '-' + shade + '</name->\n        <hex->#' + hex + '</hex->\n      <div>\n    </color->\n  ';
  })).then(Bind('color-')('click')(action.picked)).then(Bind('color-')('mouseenter')(action.hovered)).then(Draw($colors));

  return $colors;
});

__$styleInject("swatch- {\n  position: fixed;\n  right: 0;\n  top: 0;\n  display: flex;\n  height: 100vh;\n  width: 360px;\n  flex-direction: column;\n  border: 2rem solid #fff;\n  box-shadow: 0 0 1rem rgba(0,0,0,0.62);\n  z-index: 2;\n  transition: border 500ms, background 300ms;\n}\n\nswatch-:empty {\n  background-color: #e51c23;\n  border-width: 0;\n}\n\nswatch- color- {\n  flex: 1 1 100%;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  flex: .00001;\n  animation: flexGrow 300ms ease forwards;\n}\n\nswatch- color- *+* {\n  margin-top: .25rem;\n}\n\nswatch- color- name- {\n  font-size: 1rem;\n  font-weight: bold;\n  opacity: 0;\n  animation: fadeIn 1000ms ease forwards;\n}\n\nswatch- color- hex- {\n  font-size: .618rem;\n  opacity: 0;\n  animation: fadeIn 1000ms ease forwards;\n}\n\nswatch- color- hex-:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nswatch- color-[normal-text] {\n  color: rgba(255, 255, 255, 0.7);\n}\n\nswatch- color-[dark-text] {\n  color: rgba(0, 0, 0, 0.87);\n}\n\nswatch- color-[dark-strong-text] {\n  color: #000;\n}\n\nswatch- color-[light-text] {\n  color: rgba(255, 255, 255, 0.87);\n}\n\nswatch- color-[light-strong-text] {\n  color: #fff;\n}\n\nswatch- color-.remove {\n  flex: 100%;\n  animation: flexShrink 300ms ease forwards;\n}\n\nswatch- color-.remove name-,\n      swatch- color-.remove hex- {\n  opacity: 1;\n  animation: fadeOut 300ms ease forwards;\n}\n\n@-webkit-keyframes fadeIn {\n  to {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes fadeOut {\n  to {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes flexGrow {\n  to {\n    flex: 100%;\n  }\n}\n\n@-webkit-keyframes flexShrink {\n  to {\n    flex: .01;\n    flex: .00001;\n  }\n}\n",undefined);

var Swatch = (function () {
  var $swatch = document.createElement('swatch-');

  var removeColor = function removeColor(e) {
    $swatch.removeChild(e.target);
    e.target.removeEventListener('animationend', removeColor);
  };

  $swatch.addEventListener('click', function (e) {
    if (e.target && e.target.nodeName == 'COLOR-') {
      e.target.classList.add('remove');
      e.target.addEventListener('animationend', removeColor);
    }
  });

  Subscribe('color/hovered', function (color) {
    if ($swatch.children.length == 0) {
      $swatch.style.backgroundColor = '#' + color.hex;
    }
  });

  Subscribe('color/picked', function (color) {
    var colors = [].concat(toConsumableArray($swatch.querySelectorAll('color-')));
    var exists = colors.find(function (x) {
      return x.querySelector('hex-').textContent === '#' + color.hex;
    });
    if (!exists && colors.length < 6) {
      Fetch([color]).then(Node(function (_ref) {
        var base = _ref.base,
            shade = _ref.shade,
            hex = _ref.hex,
            text = _ref.text;
        return '\n        <color- ' + text + ' style=\'background-color:#' + hex + '\'>\n          <name->' + base.replace(' ', '-') + '-' + shade + '</name->\n          <hex->#' + hex + '</hex->\n        </color->\n      ';
      })).then(Draw($swatch));
    }
  });

  return $swatch;
});

__$styleInject("swatch-:empty + download- {\n  transform: translate(100%, 100%);\n}\n\ndownload- {\n  position: fixed;\n  width: 5rem;\n  height: 5rem;\n  bottom: 0;\n  right: 0;\n  z-index: 3;\n  background: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 350ms;\n}\n\ndownload- svg {\n  width: 50%;\n  height: 50%;\n  opacity: .38;\n}\n\ndownload- svg:hover {\n  opacity: .62;\n}\n",undefined);

var action$1 = {
  download: function download() {
    alert('YOYO');
  }
};

var Download = (function () {
  var $download = document.createElement('download-');

  Fetch([{}]).then(Node(function () {
    return '\n    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>\n        <path d="M0 0h24v24H0z" fill="none"/>\n    </svg>\n  ';
  })).then(Bind('svg')('click')(action$1.download)).then(Draw($download));

  return $download;
});

__$styleInject("toast- {\n  position: fixed;\n  top: 1rem;\n  left: 50%;\n  transform: translateX(-50%);\n  transition: all 300ms;\n  background: #fff;\n  border-radius: .5rem;\n  z-index: 4;\n}\ntoast- span {\n  display: inline-block;\n  width: 1rem;\n  height: 1rem;\n  margin-left: .5rem;\n  margin-right: .25rem;\n}\ntoast- code {\n  display: inline;\n  margin-right: .5rem;\n}\ntoast- p {\n  display: flex;\n  align-items: center;\n  padding: .62rem 1rem;\n  font-size: 1rem;\n  color: rgba(0,0,0,0.5);\n}\ntoast-:empty {\n  top: -5rem;\n}\n",undefined);

var Toast = (function () {
  var $toast = document.createElement('toast-');
  var timer = void 0;

  Subscribe('hex/copied', function (hex) {
    if (timer) clearTimeout(timer);
    $toast.innerHTML = '';
    Fetch([{}]).then(Node(function () {
      return '\n      <p>Copied <span style=\'background-color:' + hex + '\'></span><code>' + hex + '</code> to clipboard</p>\n    ';
    })).then(Draw($toast));
    timer = setTimeout(function () {
      return $toast.innerHTML = '';
    }, 3000);
  });

  return $toast;
});

var $body = document.body;

$body.appendChild(ColorList());
$body.appendChild(Swatch());
$body.appendChild(Download());
$body.appendChild(Toast());

var clipboard = new Clipboard('hex-', {
  text: function text(trigger) {
    return trigger.textContent;
  }
});

clipboard.on('success', function (e) {
  return Publish('hex/copied', [e.text]);
});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy94cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zZWxlY3Qvc3JjL3NlbGVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jbGlwYm9hcmQvbGliL2NsaXBib2FyZC1hY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvdGlueS1lbWl0dGVyL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dvb2QtbGlzdGVuZXIvc3JjL2lzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RlbGVnYXRlL3NyYy9jbG9zZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RlbGVnYXRlL3NyYy9kZWxlZ2F0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nb29kLWxpc3RlbmVyL3NyYy9saXN0ZW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY2xpcGJvYXJkL2xpYi9jbGlwYm9hcmQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jb2xvcnMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9zd2F0Y2gvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9kb3dubG9hZC9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3RvYXN0L2luZGV4LmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXYgPSB7fTtcblxuZXhwb3J0IGNvbnN0IFB1Ymxpc2ggPSBmdW5jdGlvbiAodG9waWMsIGFyZ3MpIHtcbiAgY29uc3Qgc3VicyA9IGV2W3RvcGljXSB8fCBbXTtcbiAgcmV0dXJuIHN1YnMubWFwKHggPT4geC5hcHBseSh0aGlzLCBhcmdzIHx8IFtdKSk7XG59O1xuXG5leHBvcnQgY29uc3QgU3Vic2NyaWJlID0gKHRvcGljLCBjYikgPT4ge1xuICBpZiAoIWV2W3RvcGljXSkgZXZbdG9waWNdID0gW107XG4gIGV2W3RvcGljXS5wdXNoKGNiKTtcbiAgcmV0dXJuIFt0b3BpYywgY2JdO1xufTtcblxuZXhwb3J0IGNvbnN0IEZldGNoID0ganNvbiA9PlxuICB0eXBlb2YganNvbiA9PT0gJ3N0cmluZycgP1xuICAgIGZldGNoKGpzb24pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gIDogUHJvbWlzZS5yZXNvbHZlKGpzb24pO1xuXG5leHBvcnQgY29uc3QgTm9kZSA9IHRlbXBsYXRlID0+IGpzb24gPT5cbiAganNvbi5tYXAoeCA9PiB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jdW1lbnQuYm9keSk7XG4gICAgY29uc3QgJG4gPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQodGVtcGxhdGUoeCkudHJpbSgpKTtcbiAgICAkbi5kYXRhID0geDtcbiAgICByZXR1cm4gJG47XG4gIH0pO1xuXG5leHBvcnQgY29uc3QgQmluZCA9IHNlbGVjdG9yID0+IGV2ZW50ID0+IGNhbGxiYWNrID0+IG5vZGVzID0+XG4gIG5vZGVzLm1hcCh4ID0+XG4gICAgWy4uLngucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcildXG4gICAgLmZvckVhY2goeSA9PiB5LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrLmJpbmQoeCkpKVxuICA/eDp4KTtcblxuZXhwb3J0IGNvbnN0IE9uY2UgPSBzZWxlY3RvciA9PiBldmVudCA9PiBjYWxsYmFjayA9PiBub2RlcyA9PlxuICBub2Rlcy5tYXAoeCA9PlxuICAgIFsuLi54LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXVxuICAgIC5mb3JFYWNoKHkgPT4geS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjay5iaW5kKHgpLCB7IG9uY2U6IHRydWUgfSkpXG4gID94OngpO1xuXG5leHBvcnQgY29uc3QgRHJhdyA9IGVsZW1lbnQgPT4gbm9kZXMgPT5cbiAgbm9kZXMubWFwKHggPT4gZWxlbWVudC5hcHBlbmRDaGlsZCh4KSk7XG5cbmV4cG9ydCBjb25zdCBHdWlkID0gKCkgPT5cbiAgKCcwMDAwJyArIChNYXRoLnJhbmRvbSgpKk1hdGgucG93KDM2LDQpIDw8IDApLnRvU3RyaW5nKDM2KSkuc2xpY2UoLTQpO1xuIiwiZnVuY3Rpb24gc2VsZWN0KGVsZW1lbnQpIHtcbiAgICB2YXIgc2VsZWN0ZWRUZXh0O1xuXG4gICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBlbGVtZW50LnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnIHx8IGVsZW1lbnQubm9kZU5hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICBlbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIGVsZW1lbnQudmFsdWUubGVuZ3RoKTtcblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBlbGVtZW50LnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSkge1xuICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcblxuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWxlbWVudCk7XG4gICAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0ZWRUZXh0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGVjdDtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbJ21vZHVsZScsICdzZWxlY3QnXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBmYWN0b3J5KG1vZHVsZSwgcmVxdWlyZSgnc2VsZWN0JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtb2QgPSB7XG4gICAgICAgICAgICBleHBvcnRzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBmYWN0b3J5KG1vZCwgZ2xvYmFsLnNlbGVjdCk7XG4gICAgICAgIGdsb2JhbC5jbGlwYm9hcmRBY3Rpb24gPSBtb2QuZXhwb3J0cztcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbiAobW9kdWxlLCBfc2VsZWN0KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIF9zZWxlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2VsZWN0KTtcblxuICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICAgICAgICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgICAgICAgICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgICAgICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgICAgIH07XG4gICAgfSgpO1xuXG4gICAgdmFyIENsaXBib2FyZEFjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBDbGlwYm9hcmRBY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENsaXBib2FyZEFjdGlvbik7XG5cbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLmluaXRTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmVzIGJhc2UgcHJvcGVydGllcyBwYXNzZWQgZnJvbSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICovXG5cblxuICAgICAgICBfY3JlYXRlQ2xhc3MoQ2xpcGJvYXJkQWN0aW9uLCBbe1xuICAgICAgICAgICAga2V5OiAncmVzb2x2ZU9wdGlvbnMnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc29sdmVPcHRpb25zKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uID0gb3B0aW9ucy5hY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyID0gb3B0aW9ucy5lbWl0dGVyO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gb3B0aW9ucy50YXJnZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gb3B0aW9ucy50ZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlciA9IG9wdGlvbnMudHJpZ2dlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2luaXRTZWxlY3Rpb24nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRTZWxlY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEZha2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdzZWxlY3RGYWtlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RGYWtlKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNSVEwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkaXInKSA9PSAncnRsJztcblxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmFrZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlSGFuZGxlckNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucmVtb3ZlRmFrZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlSGFuZGxlciA9IGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmZha2VIYW5kbGVyQ2FsbGJhY2spIHx8IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHpvb21pbmcgb24gaU9TXG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zdHlsZS5mb250U2l6ZSA9ICcxMnB0JztcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBib3ggbW9kZWxcbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtLnN0eWxlLmJvcmRlciA9ICcwJztcbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtLnN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSBlbGVtZW50IG91dCBvZiBzY3JlZW4gaG9yaXpvbnRhbGx5XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zdHlsZVtpc1JUTCA/ICdyaWdodCcgOiAnbGVmdCddID0gJy05OTk5cHgnO1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgZWxlbWVudCB0byB0aGUgc2FtZSBwb3NpdGlvbiB2ZXJ0aWNhbGx5XG4gICAgICAgICAgICAgICAgdmFyIHlQb3NpdGlvbiA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB3aW5kb3cuc2Nyb2xsVG8oMCwgeVBvc2l0aW9uKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zdHlsZS50b3AgPSB5UG9zaXRpb24gKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0udmFsdWUgPSB0aGlzLnRleHQ7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZmFrZUVsZW0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSAoMCwgX3NlbGVjdDIuZGVmYXVsdCkodGhpcy5mYWtlRWxlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3B5VGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZW1vdmVGYWtlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVGYWtlKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZha2VIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmZha2VIYW5kbGVyQ2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZha2VIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWtlSGFuZGxlckNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWtlRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuZmFrZUVsZW0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3NlbGVjdFRhcmdldCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0VGFyZ2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0ID0gKDAsIF9zZWxlY3QyLmRlZmF1bHQpKHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcHlUZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2NvcHlUZXh0JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb3B5VGV4dCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VlZGVkID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZGVkID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQodGhpcy5hY3Rpb24pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChzdWNjZWVkZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdoYW5kbGVSZXN1bHQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVJlc3VsdChzdWNjZWVkZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdChzdWNjZWVkZWQgPyAnc3VjY2VzcycgOiAnZXJyb3InLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuc2VsZWN0ZWRUZXh0LFxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0aGlzLnRyaWdnZXIsXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uOiB0aGlzLmNsZWFyU2VsZWN0aW9uLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnY2xlYXJTZWxlY3Rpb24nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkZXN0cm95JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmFrZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdhY3Rpb24nLFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ2NvcHknO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uID0gYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbiAhPT0gJ2NvcHknICYmIHRoaXMuX2FjdGlvbiAhPT0gJ2N1dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwiYWN0aW9uXCIgdmFsdWUsIHVzZSBlaXRoZXIgXCJjb3B5XCIgb3IgXCJjdXRcIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICd0YXJnZXQnLFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgKHR5cGVvZiB0YXJnZXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRhcmdldCkpID09PSAnb2JqZWN0JyAmJiB0YXJnZXQubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbiA9PT0gJ2NvcHknICYmIHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJ0YXJnZXRcIiBhdHRyaWJ1dGUuIFBsZWFzZSB1c2UgXCJyZWFkb25seVwiIGluc3RlYWQgb2YgXCJkaXNhYmxlZFwiIGF0dHJpYnV0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpb24gPT09ICdjdXQnICYmICh0YXJnZXQuaGFzQXR0cmlidXRlKCdyZWFkb25seScpIHx8IHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgYXR0cmlidXRlLiBZb3UgY2FuXFwndCBjdXQgdGV4dCBmcm9tIGVsZW1lbnRzIHdpdGggXCJyZWFkb25seVwiIG9yIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGVzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcInRhcmdldFwiIHZhbHVlLCB1c2UgYSB2YWxpZCBFbGVtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBDbGlwYm9hcmRBY3Rpb247XG4gICAgfSgpO1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDbGlwYm9hcmRBY3Rpb247XG59KTsiLCJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcbiIsIi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBIVE1MIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLm5vZGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICYmIHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFyZ3VtZW50IGlzIGEgbGlzdCBvZiBIVE1MIGVsZW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5ub2RlTGlzdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgJiYgKHR5cGUgPT09ICdbb2JqZWN0IE5vZGVMaXN0XScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgSFRNTENvbGxlY3Rpb25dJylcbiAgICAgICAgJiYgKCdsZW5ndGgnIGluIHZhbHVlKVxuICAgICAgICAmJiAodmFsdWUubGVuZ3RoID09PSAwIHx8IGV4cG9ydHMubm9kZSh2YWx1ZVswXSkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhcmd1bWVudCBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuc3RyaW5nID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgICB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZztcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuZm4gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuICAgIHJldHVybiB0eXBlID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcbiIsIi8qKlxuICogQSBwb2x5ZmlsbCBmb3IgRWxlbWVudC5tYXRjaGVzKClcbiAqL1xuaWYgKEVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcbiAgICB2YXIgcHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcblxuICAgIHByb3RvLm1hdGNoZXMgPSBwcm90by5tYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IHBhcmVudCB0aGF0IG1hdGNoZXMgYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGNsb3Nlc3QgKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHJldHVybiBlbGVtZW50O1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9zZXN0O1xuIiwidmFyIGNsb3Nlc3QgPSByZXF1aXJlKCcuL2Nsb3Nlc3QnKTtcblxuLyoqXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgdmFyIGxpc3RlbmVyRm4gPSBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogRmluZHMgY2xvc2VzdCBtYXRjaCBhbmQgaW52b2tlcyBjYWxsYmFjay5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGNsb3Nlc3QoZS50YXJnZXQsIHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoZS5kZWxlZ2F0ZVRhcmdldCkge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlbGVtZW50LCBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWxlZ2F0ZTtcbiIsInZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcbnZhciBkZWxlZ2F0ZSA9IHJlcXVpcmUoJ2RlbGVnYXRlJyk7XG5cbi8qKlxuICogVmFsaWRhdGVzIGFsbCBwYXJhbXMgYW5kIGNhbGxzIHRoZSByaWdodFxuICogbGlzdGVuZXIgZnVuY3Rpb24gYmFzZWQgb24gaXRzIHRhcmdldCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fEhUTUxDb2xsZWN0aW9ufE5vZGVMaXN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBsaXN0ZW4odGFyZ2V0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmICghdGFyZ2V0ICYmICF0eXBlICYmICFjYWxsYmFjaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgYXJndW1lbnRzJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpcy5zdHJpbmcodHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBTdHJpbmcnKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzLmZuKGNhbGxiYWNrKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlyZCBhcmd1bWVudCBtdXN0IGJlIGEgRnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoaXMubm9kZSh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5Ob2RlKHRhcmdldCwgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIGlmIChpcy5ub2RlTGlzdCh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5Ob2RlTGlzdCh0YXJnZXQsIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXMuc3RyaW5nKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlblNlbGVjdG9yKHRhcmdldCwgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIFN0cmluZywgSFRNTEVsZW1lbnQsIEhUTUxDb2xsZWN0aW9uLCBvciBOb2RlTGlzdCcpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgSFRNTCBlbGVtZW50XG4gKiBhbmQgcmV0dXJucyBhIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuTm9kZShub2RlLCB0eXBlLCBjYWxsYmFjaykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgbGlzdCBvZiBIVE1MIGVsZW1lbnRzXG4gKiBhbmQgcmV0dXJucyBhIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge05vZGVMaXN0fEhUTUxDb2xsZWN0aW9ufSBub2RlTGlzdFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGxpc3Rlbk5vZGVMaXN0KG5vZGVMaXN0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZUxpc3QsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2RlTGlzdCwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBzZWxlY3RvclxuICogYW5kIHJldHVybnMgYSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuU2VsZWN0b3Ioc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGRlbGVnYXRlKGRvY3VtZW50LmJvZHksIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdGVuO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFsnbW9kdWxlJywgJy4vY2xpcGJvYXJkLWFjdGlvbicsICd0aW55LWVtaXR0ZXInLCAnZ29vZC1saXN0ZW5lciddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGZhY3RvcnkobW9kdWxlLCByZXF1aXJlKCcuL2NsaXBib2FyZC1hY3Rpb24nKSwgcmVxdWlyZSgndGlueS1lbWl0dGVyJyksIHJlcXVpcmUoJ2dvb2QtbGlzdGVuZXInKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1vZCA9IHtcbiAgICAgICAgICAgIGV4cG9ydHM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGZhY3RvcnkobW9kLCBnbG9iYWwuY2xpcGJvYXJkQWN0aW9uLCBnbG9iYWwudGlueUVtaXR0ZXIsIGdsb2JhbC5nb29kTGlzdGVuZXIpO1xuICAgICAgICBnbG9iYWwuY2xpcGJvYXJkID0gbW9kLmV4cG9ydHM7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24gKG1vZHVsZSwgX2NsaXBib2FyZEFjdGlvbiwgX3RpbnlFbWl0dGVyLCBfZ29vZExpc3RlbmVyKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIF9jbGlwYm9hcmRBY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xpcGJvYXJkQWN0aW9uKTtcblxuICAgIHZhciBfdGlueUVtaXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGlueUVtaXR0ZXIpO1xuXG4gICAgdmFyIF9nb29kTGlzdGVuZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ29vZExpc3RlbmVyKTtcblxuICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gICAgICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgICAgICAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICAgICAgICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICBmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gICAgICAgIGlmICghc2VsZikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbiAgICB9XG5cbiAgICB2YXIgQ2xpcGJvYXJkID0gZnVuY3Rpb24gKF9FbWl0dGVyKSB7XG4gICAgICAgIF9pbmhlcml0cyhDbGlwYm9hcmQsIF9FbWl0dGVyKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8SFRNTENvbGxlY3Rpb258Tm9kZUxpc3R9IHRyaWdnZXJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIENsaXBib2FyZCh0cmlnZ2VyLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2xpcGJvYXJkKTtcblxuICAgICAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENsaXBib2FyZC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENsaXBib2FyZCkpLmNhbGwodGhpcykpO1xuXG4gICAgICAgICAgICBfdGhpcy5yZXNvbHZlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIF90aGlzLmxpc3RlbkNsaWNrKHRyaWdnZXIpO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZXMgaWYgYXR0cmlidXRlcyB3b3VsZCBiZSByZXNvbHZlZCB1c2luZyBpbnRlcm5hbCBzZXR0ZXIgZnVuY3Rpb25zXG4gICAgICAgICAqIG9yIGN1c3RvbSBmdW5jdGlvbnMgdGhhdCB3ZXJlIHBhc3NlZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKENsaXBib2FyZCwgW3tcbiAgICAgICAgICAgIGtleTogJ3Jlc29sdmVPcHRpb25zJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlT3B0aW9ucygpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbiA9IHR5cGVvZiBvcHRpb25zLmFjdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuYWN0aW9uIDogdGhpcy5kZWZhdWx0QWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdHlwZW9mIG9wdGlvbnMudGFyZ2V0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50YXJnZXQgOiB0aGlzLmRlZmF1bHRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdHlwZW9mIG9wdGlvbnMudGV4dCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMudGV4dCA6IHRoaXMuZGVmYXVsdFRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2xpc3RlbkNsaWNrJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsaXN0ZW5DbGljayh0cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyID0gKDAsIF9nb29kTGlzdGVuZXIyLmRlZmF1bHQpKHRyaWdnZXIsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIub25DbGljayhlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnb25DbGljaycsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyaWdnZXIgPSBlLmRlbGVnYXRlVGFyZ2V0IHx8IGUuY3VycmVudFRhcmdldDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsaXBib2FyZEFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaXBib2FyZEFjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlwYm9hcmRBY3Rpb24gPSBuZXcgX2NsaXBib2FyZEFjdGlvbjIuZGVmYXVsdCh7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb24odHJpZ2dlciksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQodHJpZ2dlciksXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMudGV4dCh0cmlnZ2VyKSxcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlcjogdGhpc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkZWZhdWx0QWN0aW9uJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0QWN0aW9uKHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QXR0cmlidXRlVmFsdWUoJ2FjdGlvbicsIHRyaWdnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkZWZhdWx0VGFyZ2V0JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0VGFyZ2V0KHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBnZXRBdHRyaWJ1dGVWYWx1ZSgndGFyZ2V0JywgdHJpZ2dlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZGVmYXVsdFRleHQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRUZXh0KHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QXR0cmlidXRlVmFsdWUoJ3RleHQnLCB0cmlnZ2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZGVzdHJveScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsaXBib2FyZEFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaXBib2FyZEFjdGlvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpcGJvYXJkQWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gQ2xpcGJvYXJkO1xuICAgIH0oX3RpbnlFbWl0dGVyMi5kZWZhdWx0KTtcblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byByZXRyaWV2ZSBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1ZmZpeFxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldEF0dHJpYnV0ZVZhbHVlKHN1ZmZpeCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gJ2RhdGEtY2xpcGJvYXJkLScgKyBzdWZmaXg7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IENsaXBib2FyZDtcbn0pOyIsImltcG9ydCB7IEZldGNoLCBOb2RlLCBCaW5kLCBEcmF3LCBQdWJsaXNoIH0gZnJvbSAnLi4vLi4veHMnO1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuXG4vLyB7XG4vLyAgIFwiYmFzZVwiOiBcIlJlZFwiLFxuLy8gICBcInNoYWRlXCI6IFwiNTBcIixcbi8vICAgXCJoZXhcIjogXCJmZGUwZGNcIixcbi8vICAgXCJ0ZXh0XCI6IFwiZGFyay10ZXh0XCJcbi8vIH1cblxuY29uc3QgYWN0aW9uID0ge1xuICBwaWNrZWQoZSkge1xuICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSAhPT0gJ0hFWC0nKSB7XG4gICAgICBQdWJsaXNoKCdjb2xvci9waWNrZWQnLCBbdGhpcy5kYXRhXSk7XG4gICAgfVxuICB9LFxuICBob3ZlcmVkKCkgeyBQdWJsaXNoKCdjb2xvci9ob3ZlcmVkJywgW3RoaXMuZGF0YV0pOyB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCAkY29sb3JzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29sb3JzLScpO1xuXG4gIEZldGNoKCdjb2xvcnMuanNvbicpXG4gIC50aGVuKE5vZGUoKHtiYXNlLCBzaGFkZSwgaGV4LCB0ZXh0fSkgPT4gYFxuICAgIDxjb2xvci0gJHt0ZXh0fSBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjojJHtoZXh9Jz5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxuYW1lLT4ke2Jhc2UucmVwbGFjZSgnICcsJy0nKX0tJHtzaGFkZX08L25hbWUtPlxuICAgICAgICA8aGV4LT4jJHtoZXh9PC9oZXgtPlxuICAgICAgPGRpdj5cbiAgICA8L2NvbG9yLT5cbiAgYCkpXG4gIC50aGVuKEJpbmQoJ2NvbG9yLScpKCdjbGljaycpKGFjdGlvbi5waWNrZWQpKVxuICAudGhlbihCaW5kKCdjb2xvci0nKSgnbW91c2VlbnRlcicpKGFjdGlvbi5ob3ZlcmVkKSlcbiAgLnRoZW4oRHJhdygkY29sb3JzKSk7XG5cbiAgcmV0dXJuICRjb2xvcnM7XG59O1xuIiwiaW1wb3J0IHsgU3Vic2NyaWJlLCBGZXRjaCwgTm9kZSwgRHJhdyB9IGZyb20gJy4uLy4uL3hzJztcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCAkc3dhdGNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3dhdGNoLScpO1xuXG4gIGNvbnN0IHJlbW92ZUNvbG9yID0gZSA9PiB7XG4gICAgJHN3YXRjaC5yZW1vdmVDaGlsZChlLnRhcmdldCk7XG4gICAgZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgcmVtb3ZlQ29sb3IpO1xuICB9O1xuXG4gICRzd2F0Y2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZSA9PSAnQ09MT1ItJykge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgncmVtb3ZlJyk7XG4gICAgICBlLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCByZW1vdmVDb2xvcik7XG4gICAgfVxuICB9KTtcblxuICBTdWJzY3JpYmUoJ2NvbG9yL2hvdmVyZWQnLCAoY29sb3IpID0+IHtcbiAgICBpZiAoJHN3YXRjaC5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xuICAgICAgJHN3YXRjaC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgIyR7Y29sb3IuaGV4fWA7XG4gICAgfVxuICB9KTtcblxuICBTdWJzY3JpYmUoJ2NvbG9yL3BpY2tlZCcsIChjb2xvcikgPT4ge1xuICAgIGNvbnN0IGNvbG9ycyA9IFsuLi4kc3dhdGNoLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvbG9yLScpXTtcbiAgICBjb25zdCBleGlzdHMgPSBjb2xvcnMuZmluZCh4ID0+XG4gICAgICB4LnF1ZXJ5U2VsZWN0b3IoJ2hleC0nKS50ZXh0Q29udGVudCA9PT0gYCMke2NvbG9yLmhleH1gXG4gICAgKTtcbiAgICBpZighZXhpc3RzICYmIGNvbG9ycy5sZW5ndGggPCA2KSB7XG4gICAgICBGZXRjaChbY29sb3JdKVxuICAgICAgLnRoZW4oTm9kZSgoe2Jhc2UsIHNoYWRlLCBoZXgsIHRleHR9KSA9PiBgXG4gICAgICAgIDxjb2xvci0gJHt0ZXh0fSBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjojJHtoZXh9Jz5cbiAgICAgICAgICA8bmFtZS0+JHtiYXNlLnJlcGxhY2UoJyAnLCctJyl9LSR7c2hhZGV9PC9uYW1lLT5cbiAgICAgICAgICA8aGV4LT4jJHtoZXh9PC9oZXgtPlxuICAgICAgICA8L2NvbG9yLT5cbiAgICAgIGApKVxuICAgICAgLnRoZW4oRHJhdygkc3dhdGNoKSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gJHN3YXRjaDtcbn07XG4iLCJpbXBvcnQgeyBGZXRjaCwgTm9kZSwgQmluZCwgRHJhdyB9IGZyb20gJy4uLy4uL3hzJztcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuY29uc3QgYWN0aW9uID0ge1xuICBkb3dubG9hZCgpIHsgYWxlcnQoJ1lPWU8nKTsgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCAkZG93bmxvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkb3dubG9hZC0nKTtcblxuICBGZXRjaChbe31dKVxuICAudGhlbihOb2RlKCgpID0+IGBcbiAgICA8c3ZnIGZpbGw9XCIjMDAwMDAwXCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xOSA5aC00VjNIOXY2SDVsNyA3IDctN3pNNSAxOHYyaDE0di0ySDV6XCIvPlxuICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPlxuICAgIDwvc3ZnPlxuICBgKSlcbiAgLnRoZW4oQmluZCgnc3ZnJykoJ2NsaWNrJykoYWN0aW9uLmRvd25sb2FkKSlcbiAgLnRoZW4oRHJhdygkZG93bmxvYWQpKTtcblxuICByZXR1cm4gJGRvd25sb2FkO1xufTtcbiIsImltcG9ydCB7IEZldGNoLCBOb2RlLCBEcmF3LCBTdWJzY3JpYmUgfSBmcm9tICcuLi8uLi94cyc7XG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgJHRvYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndG9hc3QtJyk7XG4gIGxldCB0aW1lcjtcblxuICBTdWJzY3JpYmUoJ2hleC9jb3BpZWQnLCAoaGV4KSA9PiB7XG4gICAgaWYgKHRpbWVyKSBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICR0b2FzdC5pbm5lckhUTUwgPSAnJztcbiAgICBGZXRjaChbe31dKVxuICAgIC50aGVuKE5vZGUoKCkgPT4gYFxuICAgICAgPHA+Q29waWVkIDxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiR7aGV4fSc+PC9zcGFuPjxjb2RlPiR7aGV4fTwvY29kZT4gdG8gY2xpcGJvYXJkPC9wPlxuICAgIGApKVxuICAgIC50aGVuKERyYXcoJHRvYXN0KSk7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+ICR0b2FzdC5pbm5lckhUTUwgPSAnJywgMzAwMCk7XG4gIH0pO1xuXG4gIHJldHVybiAkdG9hc3Q7XG59O1xuIiwiaW1wb3J0ICcuL21haW4uc2Nzcyc7XG5cbmltcG9ydCB7IFB1Ymxpc2ggfSBmcm9tICcuL3hzJztcbmltcG9ydCBDbGlwYm9hcmQgZnJvbSAnY2xpcGJvYXJkJztcblxuaW1wb3J0IENvbG9yTGlzdCBmcm9tICcuL2NvbXBvbmVudHMvY29sb3JzJztcbmltcG9ydCBTd2F0Y2ggZnJvbSAnLi9jb21wb25lbnRzL3N3YXRjaCc7XG5pbXBvcnQgRG93bmxvYWQgZnJvbSAnLi9jb21wb25lbnRzL2Rvd25sb2FkJztcbmltcG9ydCBUb2FzdCBmcm9tICcuL2NvbXBvbmVudHMvdG9hc3QnO1xuXG5jb25zdCAkYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbiRib2R5LmFwcGVuZENoaWxkKENvbG9yTGlzdCgpKTtcbiRib2R5LmFwcGVuZENoaWxkKFN3YXRjaCgpKTtcbiRib2R5LmFwcGVuZENoaWxkKERvd25sb2FkKCkpO1xuJGJvZHkuYXBwZW5kQ2hpbGQoVG9hc3QoKSk7XG5cbmNvbnN0IGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoJ2hleC0nLCB7XG4gIHRleHQ6ICh0cmlnZ2VyKSA9PiB0cmlnZ2VyLnRleHRDb250ZW50LFxufSk7XG5cbmNsaXBib2FyZC5vbignc3VjY2VzcycsIGUgPT5cbiAgUHVibGlzaCgnaGV4L2NvcGllZCcsIFtlLnRleHRdKVxuKTtcbiJdLCJuYW1lcyI6WyJldiIsIlB1Ymxpc2giLCJ0b3BpYyIsImFyZ3MiLCJzdWJzIiwibWFwIiwieCIsImFwcGx5IiwiU3Vic2NyaWJlIiwiY2IiLCJwdXNoIiwiRmV0Y2giLCJqc29uIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJOb2RlIiwicmFuZ2UiLCJkb2N1bWVudCIsImNyZWF0ZVJhbmdlIiwic2VsZWN0Tm9kZSIsImJvZHkiLCIkbiIsImNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCIsInRlbXBsYXRlIiwidHJpbSIsImRhdGEiLCJCaW5kIiwibm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2VsZWN0b3IiLCJmb3JFYWNoIiwieSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNhbGxiYWNrIiwiYmluZCIsIkRyYXciLCJlbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJyZXF1aXJlJCQwIiwidGhpcyIsImNsb3Nlc3QiLCJkZWxlZ2F0ZSIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwiYWN0aW9uIiwiZSIsInRhcmdldCIsIm5vZGVOYW1lIiwiJGNvbG9ycyIsImNyZWF0ZUVsZW1lbnQiLCJiYXNlIiwic2hhZGUiLCJoZXgiLCJ0ZXh0IiwicmVwbGFjZSIsInBpY2tlZCIsImhvdmVyZWQiLCIkc3dhdGNoIiwicmVtb3ZlQ29sb3IiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb2xvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvcnMiLCJleGlzdHMiLCJmaW5kIiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50IiwiJGRvd25sb2FkIiwiZG93bmxvYWQiLCIkdG9hc3QiLCJ0aW1lciIsImNsZWFyVGltZW91dCIsImlubmVySFRNTCIsInNldFRpbWVvdXQiLCIkYm9keSIsIkNvbG9yTGlzdCIsIlN3YXRjaCIsIkRvd25sb2FkIiwiVG9hc3QiLCJjbGlwYm9hcmQi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
