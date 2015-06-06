/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2015
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
	    //<webpack>
	    __webpack_require__(/*! famous-polyfills */ 15);
	    __webpack_require__(/*! famous/core/famous.css */ 19);
	    __webpack_require__(/*! famous-flex/widgets/styles.css */ 22);
	    __webpack_require__(/*! ./styles.css */ 24);
	    __webpack_require__(/*! ./index.html */ 26);
	    //</webpack>
	
	    // Fast-click
	    var FastClick = __webpack_require__(/*! fastclick/lib/fastclick */ 27);
	    FastClick.attach(document.body);
	
	    // import dependencies
	    var Engine = __webpack_require__(/*! famous/core/Engine */ 1);
	    var LayoutController = __webpack_require__(/*! famous-flex/LayoutController */ 28);
	    var Surface = __webpack_require__(/*! famous/core/Surface */ 42);
	    var TextareaSurface = __webpack_require__(/*! famous/surfaces/TextareaSurface */ 44);
	    var c = __webpack_require__(/*! cassowary/bin/c */ 45);
	    window.c = c;
	    var AutoLayout = __webpack_require__(/*! autolayout.js/dist/autolayout */ 47);
	
	    // create the main context and layout
	    var mainContext = Engine.createContext();
	    var mainLC = new LayoutController({
	        layout: function(context, options) {
	            context.set('left', {
	                size: [context.size[0] / 2, context.size[1]]
	            });
	            context.set('right', {
	                size: [context.size[0] / 2, context.size[1]],
	                translate: [context.size[0] / 2, 0, 0]
	            });
	        }
	    });
	    mainContext.add(mainLC);
	
	    // Create input text-area for VFL
	    var vflText = new TextareaSurface({
	        placeholder: 'type your VFL here',
	        value: '|[green]|\nV:|[green]|\n'
	    });
	    mainLC.insert('left', vflText);
	
	    // Create output layout-controller for results
	    var alView;
	    var outputLC = new LayoutController({
	        flow: true,
	        dataSource: {
	            yellow: new Surface({properties: {background: 'yellow'}}),
	            orange: new Surface({properties: {background: 'orange'}}),
	            purple: new Surface({properties: {background: 'purple'}}),
	            black: new Surface({properties: {background: 'black'}}),
	            white: new Surface({properties: {background: 'white'}}),
	            pink: new Surface({properties: {background: 'pink'}}),
	            green: new Surface({properties: {background: 'green'}}),
	            blue: new Surface({properties: {background: 'blue'}}),
	            red: new Surface({properties: {background: 'red'}}),
	            brown: new Surface({properties: {background: 'brown'}})
	        },
	        layout: function(context, options) {
	            if (alView) {
	                alView.setSize(context.size[0], context.size[1]);
	                var subView;
	                for (var key in alView.subViews) {
	                    subView = alView.subViews[key];
	                    context.set(subView.name, {
	                        size: [subView.width, subView.height],
	                        translate: [subView.left, subView.top, 0]
	                    });
	                }
	            }
	        }
	    });
	    mainLC.insert('right', outputLC);
	
	    // Update handling
	    function _update() {
	        var vfl = vflText.getValue();
	        var view = new AutoLayout.View();
	        try {
	            view.addVisualFormat(vfl);
	            alView = view;
	            console.log('VFL compiled succesfully: ' + vfl); //eslint-disable-line no-console
	            outputLC.reflowLayout();
	        }
	        catch (err) {
	            console.log(err); //eslint-disable-line no-console
	        }
	    }
	    vflText.on('change', _update);
	    vflText.on('keyup', _update);
	    _update();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/*!**********************************!*\
  !*** ../~/famous/core/Engine.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Context = __webpack_require__(/*! ./Context */ 2);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 7);
	var OptionsManager = __webpack_require__(/*! ./OptionsManager */ 14);
	var Engine = {};
	var contexts = [];
	var nextTickQueue = [];
	var currentFrame = 0;
	var nextTickFrame = 0;
	var deferQueue = [];
	var lastTime = Date.now();
	var frameTime;
	var frameTimeLimit;
	var loopEnabled = true;
	var eventForwarders = {};
	var eventHandler = new EventHandler();
	var options = {
	    containerType: 'div',
	    containerClass: 'famous-container',
	    fpsCap: undefined,
	    runLoop: true,
	    appMode: true
	};
	var optionsManager = new OptionsManager(options);
	var MAX_DEFER_FRAME_TIME = 10;
	Engine.step = function step() {
	    currentFrame++;
	    nextTickFrame = currentFrame;
	    var currentTime = Date.now();
	    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
	        return;
	    var i = 0;
	    frameTime = currentTime - lastTime;
	    lastTime = currentTime;
	    eventHandler.emit('prerender');
	    var numFunctions = nextTickQueue.length;
	    while (numFunctions--)
	        nextTickQueue.shift()(currentFrame);
	    while (deferQueue.length && Date.now() - currentTime < MAX_DEFER_FRAME_TIME) {
	        deferQueue.shift().call(this);
	    }
	    for (i = 0; i < contexts.length; i++)
	        contexts[i].update();
	    eventHandler.emit('postrender');
	};
	function loop() {
	    if (options.runLoop) {
	        Engine.step();
	        window.requestAnimationFrame(loop);
	    } else
	        loopEnabled = false;
	}
	window.requestAnimationFrame(loop);
	function handleResize(event) {
	    for (var i = 0; i < contexts.length; i++) {
	        contexts[i].emit('resize');
	    }
	    eventHandler.emit('resize');
	}
	window.addEventListener('resize', handleResize, false);
	handleResize();
	function initialize() {
	    window.addEventListener('touchmove', function (event) {
	        event.preventDefault();
	    }, true);
	    addRootClasses();
	}
	var initialized = false;
	function addRootClasses() {
	    if (!document.body) {
	        Engine.nextTick(addRootClasses);
	        return;
	    }
	    document.body.classList.add('famous-root');
	    document.documentElement.classList.add('famous-root');
	}
	Engine.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function)
	        return target.subscribe(Engine);
	    else
	        return eventHandler.pipe(target);
	};
	Engine.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function)
	        return target.unsubscribe(Engine);
	    else
	        return eventHandler.unpipe(target);
	};
	Engine.on = function on(type, handler) {
	    if (!(type in eventForwarders)) {
	        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
	        addEngineListener(type, eventForwarders[type]);
	    }
	    return eventHandler.on(type, handler);
	};
	function addEngineListener(type, forwarder) {
	    if (!document.body) {
	        Engine.nextTick(addEventListener.bind(this, type, forwarder));
	        return;
	    }
	    document.body.addEventListener(type, forwarder);
	}
	Engine.emit = function emit(type, event) {
	    return eventHandler.emit(type, event);
	};
	Engine.removeListener = function removeListener(type, handler) {
	    return eventHandler.removeListener(type, handler);
	};
	Engine.getFPS = function getFPS() {
	    return 1000 / frameTime;
	};
	Engine.setFPSCap = function setFPSCap(fps) {
	    frameTimeLimit = Math.floor(1000 / fps);
	};
	Engine.getOptions = function getOptions(key) {
	    return optionsManager.getOptions(key);
	};
	Engine.setOptions = function setOptions(options) {
	    return optionsManager.setOptions.apply(optionsManager, arguments);
	};
	Engine.createContext = function createContext(el) {
	    if (!initialized && options.appMode)
	        Engine.nextTick(initialize);
	    var needMountContainer = false;
	    if (!el) {
	        el = document.createElement(options.containerType);
	        el.classList.add(options.containerClass);
	        needMountContainer = true;
	    }
	    var context = new Context(el);
	    Engine.registerContext(context);
	    if (needMountContainer)
	        mount(context, el);
	    return context;
	};
	function mount(context, el) {
	    if (!document.body) {
	        Engine.nextTick(mount.bind(this, context, el));
	        return;
	    }
	    document.body.appendChild(el);
	    context.emit('resize');
	}
	Engine.registerContext = function registerContext(context) {
	    contexts.push(context);
	    return context;
	};
	Engine.getContexts = function getContexts() {
	    return contexts;
	};
	Engine.deregisterContext = function deregisterContext(context) {
	    var i = contexts.indexOf(context);
	    if (i >= 0)
	        contexts.splice(i, 1);
	};
	Engine.nextTick = function nextTick(fn) {
	    nextTickQueue.push(fn);
	};
	Engine.defer = function defer(fn) {
	    deferQueue.push(fn);
	};
	optionsManager.on('change', function (data) {
	    if (data.id === 'fpsCap')
	        Engine.setFPSCap(data.value);
	    else if (data.id === 'runLoop') {
	        if (!loopEnabled && data.value) {
	            loopEnabled = true;
	            window.requestAnimationFrame(loop);
	        }
	    }
	});
	module.exports = Engine;

/***/ },
/* 2 */
/*!***********************************!*\
  !*** ../~/famous/core/Context.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var RenderNode = __webpack_require__(/*! ./RenderNode */ 3);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 7);
	var ElementAllocator = __webpack_require__(/*! ./ElementAllocator */ 9);
	var Transform = __webpack_require__(/*! ./Transform */ 6);
	var Transitionable = __webpack_require__(/*! ../transitions/Transitionable */ 10);
	var _zeroZero = [
	    0,
	    0
	];
	var usePrefix = !('perspective' in document.documentElement.style);
	function _getElementSize() {
	    var element = this.container;
	    return [
	        element.clientWidth,
	        element.clientHeight
	    ];
	}
	var _setPerspective = usePrefix ? function (element, perspective) {
	    element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
	} : function (element, perspective) {
	    element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
	};
	function Context(container) {
	    this.container = container;
	    this._allocator = new ElementAllocator(container);
	    this._node = new RenderNode();
	    this._eventOutput = new EventHandler();
	    this._size = _getElementSize.call(this);
	    this._perspectiveState = new Transitionable(0);
	    this._perspective = undefined;
	    this._nodeContext = {
	        allocator: this._allocator,
	        transform: Transform.identity,
	        opacity: 1,
	        origin: _zeroZero,
	        align: _zeroZero,
	        size: this._size
	    };
	    this._eventOutput.on('resize', function () {
	        this.setSize(_getElementSize.call(this));
	    }.bind(this));
	}
	Context.prototype.getAllocator = function getAllocator() {
	    return this._allocator;
	};
	Context.prototype.add = function add(obj) {
	    return this._node.add(obj);
	};
	Context.prototype.migrate = function migrate(container) {
	    if (container === this.container)
	        return;
	    this.container = container;
	    this._allocator.migrate(container);
	};
	Context.prototype.getSize = function getSize() {
	    return this._size;
	};
	Context.prototype.setSize = function setSize(size) {
	    if (!size)
	        size = _getElementSize.call(this);
	    this._size[0] = size[0];
	    this._size[1] = size[1];
	};
	Context.prototype.update = function update(contextParameters) {
	    if (contextParameters) {
	        if (contextParameters.transform)
	            this._nodeContext.transform = contextParameters.transform;
	        if (contextParameters.opacity)
	            this._nodeContext.opacity = contextParameters.opacity;
	        if (contextParameters.origin)
	            this._nodeContext.origin = contextParameters.origin;
	        if (contextParameters.align)
	            this._nodeContext.align = contextParameters.align;
	        if (contextParameters.size)
	            this._nodeContext.size = contextParameters.size;
	    }
	    var perspective = this._perspectiveState.get();
	    if (perspective !== this._perspective) {
	        _setPerspective(this.container, perspective);
	        this._perspective = perspective;
	    }
	    this._node.commit(this._nodeContext);
	};
	Context.prototype.getPerspective = function getPerspective() {
	    return this._perspectiveState.get();
	};
	Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
	    return this._perspectiveState.set(perspective, transition, callback);
	};
	Context.prototype.emit = function emit(type, event) {
	    return this._eventOutput.emit(type, event);
	};
	Context.prototype.on = function on(type, handler) {
	    return this._eventOutput.on(type, handler);
	};
	Context.prototype.removeListener = function removeListener(type, handler) {
	    return this._eventOutput.removeListener(type, handler);
	};
	Context.prototype.pipe = function pipe(target) {
	    return this._eventOutput.pipe(target);
	};
	Context.prototype.unpipe = function unpipe(target) {
	    return this._eventOutput.unpipe(target);
	};
	module.exports = Context;

/***/ },
/* 3 */
/*!**************************************!*\
  !*** ../~/famous/core/RenderNode.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Entity = __webpack_require__(/*! ./Entity */ 4);
	var SpecParser = __webpack_require__(/*! ./SpecParser */ 5);
	function RenderNode(object) {
	    this._object = null;
	    this._child = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = false;
	    this._isModifier = false;
	    this._resultCache = {};
	    this._prevResults = {};
	    this._childResult = null;
	    if (object)
	        this.set(object);
	}
	RenderNode.prototype.add = function add(child) {
	    var childNode = child instanceof RenderNode ? child : new RenderNode(child);
	    if (this._child instanceof Array)
	        this._child.push(childNode);
	    else if (this._child) {
	        this._child = [
	            this._child,
	            childNode
	        ];
	        this._hasMultipleChildren = true;
	        this._childResult = [];
	    } else
	        this._child = childNode;
	    return childNode;
	};
	RenderNode.prototype.get = function get() {
	    return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null);
	};
	RenderNode.prototype.set = function set(child) {
	    this._childResult = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = child.render ? true : false;
	    this._isModifier = child.modify ? true : false;
	    this._object = child;
	    this._child = null;
	    if (child instanceof RenderNode)
	        return child;
	    else
	        return this;
	};
	RenderNode.prototype.getSize = function getSize() {
	    var result = null;
	    var target = this.get();
	    if (target && target.getSize)
	        result = target.getSize();
	    if (!result && this._child && this._child.getSize)
	        result = this._child.getSize();
	    return result;
	};
	function _applyCommit(spec, context, cacheStorage) {
	    var result = SpecParser.parse(spec, context);
	    var keys = Object.keys(result);
	    for (var i = 0; i < keys.length; i++) {
	        var id = keys[i];
	        var childNode = Entity.get(id);
	        var commitParams = result[id];
	        commitParams.allocator = context.allocator;
	        var commitResult = childNode.commit(commitParams);
	        if (commitResult)
	            _applyCommit(commitResult, context, cacheStorage);
	        else
	            cacheStorage[id] = commitParams;
	    }
	}
	RenderNode.prototype.commit = function commit(context) {
	    var prevKeys = Object.keys(this._prevResults);
	    for (var i = 0; i < prevKeys.length; i++) {
	        var id = prevKeys[i];
	        if (this._resultCache[id] === undefined) {
	            var object = Entity.get(id);
	            if (object.cleanup)
	                object.cleanup(context.allocator);
	        }
	    }
	    this._prevResults = this._resultCache;
	    this._resultCache = {};
	    _applyCommit(this.render(), context, this._resultCache);
	};
	RenderNode.prototype.render = function render() {
	    if (this._isRenderable)
	        return this._object.render();
	    var result = null;
	    if (this._hasMultipleChildren) {
	        result = this._childResult;
	        var children = this._child;
	        for (var i = 0; i < children.length; i++) {
	            result[i] = children[i].render();
	        }
	    } else if (this._child)
	        result = this._child.render();
	    return this._isModifier ? this._object.modify(result) : result;
	};
	module.exports = RenderNode;

/***/ },
/* 4 */
/*!**********************************!*\
  !*** ../~/famous/core/Entity.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var entities = [];
	function get(id) {
	    return entities[id];
	}
	function set(id, entity) {
	    entities[id] = entity;
	}
	function register(entity) {
	    var id = entities.length;
	    set(id, entity);
	    return id;
	}
	function unregister(id) {
	    set(id, null);
	}
	module.exports = {
	    register: register,
	    unregister: unregister,
	    get: get,
	    set: set
	};

/***/ },
/* 5 */
/*!**************************************!*\
  !*** ../~/famous/core/SpecParser.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transform = __webpack_require__(/*! ./Transform */ 6);
	function SpecParser() {
	    this.result = {};
	}
	SpecParser._instance = new SpecParser();
	SpecParser.parse = function parse(spec, context) {
	    return SpecParser._instance.parse(spec, context);
	};
	SpecParser.prototype.parse = function parse(spec, context) {
	    this.reset();
	    this._parseSpec(spec, context, Transform.identity);
	    return this.result;
	};
	SpecParser.prototype.reset = function reset() {
	    this.result = {};
	};
	function _vecInContext(v, m) {
	    return [
	        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
	        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
	        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
	    ];
	}
	var _zeroZero = [
	    0,
	    0
	];
	SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
	    var id;
	    var target;
	    var transform;
	    var opacity;
	    var origin;
	    var align;
	    var size;
	    if (typeof spec === 'number') {
	        id = spec;
	        transform = parentContext.transform;
	        align = parentContext.align || _zeroZero;
	        if (parentContext.size && align && (align[0] || align[1])) {
	            var alignAdjust = [
	                align[0] * parentContext.size[0],
	                align[1] * parentContext.size[1],
	                0
	            ];
	            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
	        }
	        this.result[id] = {
	            transform: transform,
	            opacity: parentContext.opacity,
	            origin: parentContext.origin || _zeroZero,
	            align: parentContext.align || _zeroZero,
	            size: parentContext.size
	        };
	    } else if (!spec) {
	        return;
	    } else if (spec instanceof Array) {
	        for (var i = 0; i < spec.length; i++) {
	            this._parseSpec(spec[i], parentContext, sizeContext);
	        }
	    } else {
	        target = spec.target;
	        transform = parentContext.transform;
	        opacity = parentContext.opacity;
	        origin = parentContext.origin;
	        align = parentContext.align;
	        size = parentContext.size;
	        var nextSizeContext = sizeContext;
	        if (spec.opacity !== undefined)
	            opacity = parentContext.opacity * spec.opacity;
	        if (spec.transform)
	            transform = Transform.multiply(parentContext.transform, spec.transform);
	        if (spec.origin) {
	            origin = spec.origin;
	            nextSizeContext = parentContext.transform;
	        }
	        if (spec.align)
	            align = spec.align;
	        if (spec.size || spec.proportions) {
	            var parentSize = size;
	            size = [
	                size[0],
	                size[1]
	            ];
	            if (spec.size) {
	                if (spec.size[0] !== undefined)
	                    size[0] = spec.size[0];
	                if (spec.size[1] !== undefined)
	                    size[1] = spec.size[1];
	            }
	            if (spec.proportions) {
	                if (spec.proportions[0] !== undefined)
	                    size[0] = size[0] * spec.proportions[0];
	                if (spec.proportions[1] !== undefined)
	                    size[1] = size[1] * spec.proportions[1];
	            }
	            if (parentSize) {
	                if (align && (align[0] || align[1]))
	                    transform = Transform.thenMove(transform, _vecInContext([
	                        align[0] * parentSize[0],
	                        align[1] * parentSize[1],
	                        0
	                    ], sizeContext));
	                if (origin && (origin[0] || origin[1]))
	                    transform = Transform.moveThen([
	                        -origin[0] * size[0],
	                        -origin[1] * size[1],
	                        0
	                    ], transform);
	            }
	            nextSizeContext = parentContext.transform;
	            origin = null;
	            align = null;
	        }
	        this._parseSpec(target, {
	            transform: transform,
	            opacity: opacity,
	            origin: origin,
	            align: align,
	            size: size
	        }, nextSizeContext);
	    }
	};
	module.exports = SpecParser;

/***/ },
/* 6 */
/*!*************************************!*\
  !*** ../~/famous/core/Transform.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transform = {};
	Transform.precision = 0.000001;
	Transform.identity = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1
	];
	Transform.multiply4x4 = function multiply4x4(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
	        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
	        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
	        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
	        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
	    ];
	};
	Transform.multiply = function multiply(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
	        0,
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
	        0,
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
	        0,
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
	        1
	    ];
	};
	Transform.thenMove = function thenMove(m, t) {
	    if (!t[2])
	        t[2] = 0;
	    return [
	        m[0],
	        m[1],
	        m[2],
	        0,
	        m[4],
	        m[5],
	        m[6],
	        0,
	        m[8],
	        m[9],
	        m[10],
	        0,
	        m[12] + t[0],
	        m[13] + t[1],
	        m[14] + t[2],
	        1
	    ];
	};
	Transform.moveThen = function moveThen(v, m) {
	    if (!v[2])
	        v[2] = 0;
	    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
	    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
	    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
	    return Transform.thenMove(m, [
	        t0,
	        t1,
	        t2
	    ]);
	};
	Transform.translate = function translate(x, y, z) {
	    if (z === undefined)
	        z = 0;
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        x,
	        y,
	        z,
	        1
	    ];
	};
	Transform.thenScale = function thenScale(m, s) {
	    return [
	        s[0] * m[0],
	        s[1] * m[1],
	        s[2] * m[2],
	        0,
	        s[0] * m[4],
	        s[1] * m[5],
	        s[2] * m[6],
	        0,
	        s[0] * m[8],
	        s[1] * m[9],
	        s[2] * m[10],
	        0,
	        s[0] * m[12],
	        s[1] * m[13],
	        s[2] * m[14],
	        1
	    ];
	};
	Transform.scale = function scale(x, y, z) {
	    if (z === undefined)
	        z = 1;
	    if (y === undefined)
	        y = x;
	    return [
	        x,
	        0,
	        0,
	        0,
	        0,
	        y,
	        0,
	        0,
	        0,
	        0,
	        z,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateX = function rotateX(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        cosTheta,
	        sinTheta,
	        0,
	        0,
	        -sinTheta,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateY = function rotateY(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        cosTheta,
	        0,
	        -sinTheta,
	        0,
	        0,
	        1,
	        0,
	        0,
	        sinTheta,
	        0,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateZ = function rotateZ(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        cosTheta,
	        sinTheta,
	        0,
	        0,
	        -sinTheta,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotate = function rotate(phi, theta, psi) {
	    var cosPhi = Math.cos(phi);
	    var sinPhi = Math.sin(phi);
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    var cosPsi = Math.cos(psi);
	    var sinPsi = Math.sin(psi);
	    var result = [
	        cosTheta * cosPsi,
	        cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
	        sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
	        0,
	        -cosTheta * sinPsi,
	        cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
	        sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
	        0,
	        sinTheta,
	        -sinPhi * cosTheta,
	        cosPhi * cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    return result;
	};
	Transform.rotateAxis = function rotateAxis(v, theta) {
	    var sinTheta = Math.sin(theta);
	    var cosTheta = Math.cos(theta);
	    var verTheta = 1 - cosTheta;
	    var xxV = v[0] * v[0] * verTheta;
	    var xyV = v[0] * v[1] * verTheta;
	    var xzV = v[0] * v[2] * verTheta;
	    var yyV = v[1] * v[1] * verTheta;
	    var yzV = v[1] * v[2] * verTheta;
	    var zzV = v[2] * v[2] * verTheta;
	    var xs = v[0] * sinTheta;
	    var ys = v[1] * sinTheta;
	    var zs = v[2] * sinTheta;
	    var result = [
	        xxV + cosTheta,
	        xyV + zs,
	        xzV - ys,
	        0,
	        xyV - zs,
	        yyV + cosTheta,
	        yzV + xs,
	        0,
	        xzV + ys,
	        yzV - xs,
	        zzV + cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    return result;
	};
	Transform.aboutOrigin = function aboutOrigin(v, m) {
	    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
	    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
	    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
	    return Transform.thenMove(m, [
	        t0,
	        t1,
	        t2
	    ]);
	};
	Transform.skew = function skew(phi, theta, psi) {
	    return [
	        1,
	        Math.tan(theta),
	        0,
	        0,
	        Math.tan(psi),
	        1,
	        0,
	        0,
	        0,
	        Math.tan(phi),
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.skewX = function skewX(angle) {
	    return [
	        1,
	        0,
	        0,
	        0,
	        Math.tan(angle),
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.skewY = function skewY(angle) {
	    return [
	        1,
	        Math.tan(angle),
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.perspective = function perspective(focusZ) {
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        -1 / focusZ,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.getTranslate = function getTranslate(m) {
	    return [
	        m[12],
	        m[13],
	        m[14]
	    ];
	};
	Transform.inverse = function inverse(m) {
	    var c0 = m[5] * m[10] - m[6] * m[9];
	    var c1 = m[4] * m[10] - m[6] * m[8];
	    var c2 = m[4] * m[9] - m[5] * m[8];
	    var c4 = m[1] * m[10] - m[2] * m[9];
	    var c5 = m[0] * m[10] - m[2] * m[8];
	    var c6 = m[0] * m[9] - m[1] * m[8];
	    var c8 = m[1] * m[6] - m[2] * m[5];
	    var c9 = m[0] * m[6] - m[2] * m[4];
	    var c10 = m[0] * m[5] - m[1] * m[4];
	    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
	    var invD = 1 / detM;
	    var result = [
	        invD * c0,
	        -invD * c4,
	        invD * c8,
	        0,
	        -invD * c1,
	        invD * c5,
	        -invD * c9,
	        0,
	        invD * c2,
	        -invD * c6,
	        invD * c10,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
	    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
	    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
	    return result;
	};
	Transform.transpose = function transpose(m) {
	    return [
	        m[0],
	        m[4],
	        m[8],
	        m[12],
	        m[1],
	        m[5],
	        m[9],
	        m[13],
	        m[2],
	        m[6],
	        m[10],
	        m[14],
	        m[3],
	        m[7],
	        m[11],
	        m[15]
	    ];
	};
	function _normSquared(v) {
	    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
	}
	function _norm(v) {
	    return Math.sqrt(_normSquared(v));
	}
	function _sign(n) {
	    return n < 0 ? -1 : 1;
	}
	Transform.interpret = function interpret(M) {
	    var x = [
	        M[0],
	        M[1],
	        M[2]
	    ];
	    var sgn = _sign(x[0]);
	    var xNorm = _norm(x);
	    var v = [
	        x[0] + sgn * xNorm,
	        x[1],
	        x[2]
	    ];
	    var mult = 2 / _normSquared(v);
	    if (mult >= Infinity) {
	        return {
	            translate: Transform.getTranslate(M),
	            rotate: [
	                0,
	                0,
	                0
	            ],
	            scale: [
	                0,
	                0,
	                0
	            ],
	            skew: [
	                0,
	                0,
	                0
	            ]
	        };
	    }
	    var Q1 = [
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    Q1[0] = 1 - mult * v[0] * v[0];
	    Q1[5] = 1 - mult * v[1] * v[1];
	    Q1[10] = 1 - mult * v[2] * v[2];
	    Q1[1] = -mult * v[0] * v[1];
	    Q1[2] = -mult * v[0] * v[2];
	    Q1[6] = -mult * v[1] * v[2];
	    Q1[4] = Q1[1];
	    Q1[8] = Q1[2];
	    Q1[9] = Q1[6];
	    var MQ1 = Transform.multiply(Q1, M);
	    var x2 = [
	        MQ1[5],
	        MQ1[6]
	    ];
	    var sgn2 = _sign(x2[0]);
	    var x2Norm = _norm(x2);
	    var v2 = [
	        x2[0] + sgn2 * x2Norm,
	        x2[1]
	    ];
	    var mult2 = 2 / _normSquared(v2);
	    var Q2 = [
	        1,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    Q2[5] = 1 - mult2 * v2[0] * v2[0];
	    Q2[10] = 1 - mult2 * v2[1] * v2[1];
	    Q2[6] = -mult2 * v2[0] * v2[1];
	    Q2[9] = Q2[6];
	    var Q = Transform.multiply(Q2, Q1);
	    var R = Transform.multiply(Q, M);
	    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
	    R = Transform.multiply(R, remover);
	    Q = Transform.multiply(remover, Q);
	    var result = {};
	    result.translate = Transform.getTranslate(M);
	    result.rotate = [
	        Math.atan2(-Q[6], Q[10]),
	        Math.asin(Q[2]),
	        Math.atan2(-Q[1], Q[0])
	    ];
	    if (!result.rotate[0]) {
	        result.rotate[0] = 0;
	        result.rotate[2] = Math.atan2(Q[4], Q[5]);
	    }
	    result.scale = [
	        R[0],
	        R[5],
	        R[10]
	    ];
	    result.skew = [
	        Math.atan2(R[9], result.scale[2]),
	        Math.atan2(R[8], result.scale[2]),
	        Math.atan2(R[4], result.scale[0])
	    ];
	    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
	        result.rotate[1] = Math.PI - result.rotate[1];
	        if (result.rotate[1] > Math.PI)
	            result.rotate[1] -= 2 * Math.PI;
	        if (result.rotate[1] < -Math.PI)
	            result.rotate[1] += 2 * Math.PI;
	        if (result.rotate[0] < 0)
	            result.rotate[0] += Math.PI;
	        else
	            result.rotate[0] -= Math.PI;
	        if (result.rotate[2] < 0)
	            result.rotate[2] += Math.PI;
	        else
	            result.rotate[2] -= Math.PI;
	    }
	    return result;
	};
	Transform.average = function average(M1, M2, t) {
	    t = t === undefined ? 0.5 : t;
	    var specM1 = Transform.interpret(M1);
	    var specM2 = Transform.interpret(M2);
	    var specAvg = {
	        translate: [
	            0,
	            0,
	            0
	        ],
	        rotate: [
	            0,
	            0,
	            0
	        ],
	        scale: [
	            0,
	            0,
	            0
	        ],
	        skew: [
	            0,
	            0,
	            0
	        ]
	    };
	    for (var i = 0; i < 3; i++) {
	        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
	        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
	        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
	        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
	    }
	    return Transform.build(specAvg);
	};
	Transform.build = function build(spec) {
	    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
	    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
	    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
	    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
	};
	Transform.equals = function equals(a, b) {
	    return !Transform.notEquals(a, b);
	};
	Transform.notEquals = function notEquals(a, b) {
	    if (a === b)
	        return false;
	    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
	};
	Transform.normalizeRotation = function normalizeRotation(rotation) {
	    var result = rotation.slice(0);
	    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
	        result[0] = -result[0];
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] > Math.PI * 0.5) {
	        result[0] = result[0] - Math.PI;
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] < -Math.PI * 0.5) {
	        result[0] = result[0] + Math.PI;
	        result[1] = -Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    while (result[1] < -Math.PI)
	        result[1] += 2 * Math.PI;
	    while (result[1] >= Math.PI)
	        result[1] -= 2 * Math.PI;
	    while (result[2] < -Math.PI)
	        result[2] += 2 * Math.PI;
	    while (result[2] >= Math.PI)
	        result[2] -= 2 * Math.PI;
	    return result;
	};
	Transform.inFront = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0.001,
	    1
	];
	Transform.behind = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    -0.001,
	    1
	];
	module.exports = Transform;

/***/ },
/* 7 */
/*!****************************************!*\
  !*** ../~/famous/core/EventHandler.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventEmitter = __webpack_require__(/*! ./EventEmitter */ 8);
	function EventHandler() {
	    EventEmitter.apply(this, arguments);
	    this.downstream = [];
	    this.downstreamFn = [];
	    this.upstream = [];
	    this.upstreamListeners = {};
	}
	EventHandler.prototype = Object.create(EventEmitter.prototype);
	EventHandler.prototype.constructor = EventHandler;
	EventHandler.setInputHandler = function setInputHandler(object, handler) {
	    object.trigger = handler.trigger.bind(handler);
	    if (handler.subscribe && handler.unsubscribe) {
	        object.subscribe = handler.subscribe.bind(handler);
	        object.unsubscribe = handler.unsubscribe.bind(handler);
	    }
	};
	EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
	    if (handler instanceof EventHandler)
	        handler.bindThis(object);
	    object.pipe = handler.pipe.bind(handler);
	    object.unpipe = handler.unpipe.bind(handler);
	    object.on = handler.on.bind(handler);
	    object.addListener = object.on;
	    object.removeListener = handler.removeListener.bind(handler);
	};
	EventHandler.prototype.emit = function emit(type, event) {
	    EventEmitter.prototype.emit.apply(this, arguments);
	    var i = 0;
	    for (i = 0; i < this.downstream.length; i++) {
	        if (this.downstream[i].trigger)
	            this.downstream[i].trigger(type, event);
	    }
	    for (i = 0; i < this.downstreamFn.length; i++) {
	        this.downstreamFn[i](type, event);
	    }
	    return this;
	};
	EventHandler.prototype.trigger = EventHandler.prototype.emit;
	EventHandler.prototype.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function)
	        return target.subscribe(this);
	    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index < 0)
	        downstreamCtx.push(target);
	    if (target instanceof Function)
	        target('pipe', null);
	    else if (target.trigger)
	        target.trigger('pipe', null);
	    return target;
	};
	EventHandler.prototype.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function)
	        return target.unsubscribe(this);
	    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index >= 0) {
	        downstreamCtx.splice(index, 1);
	        if (target instanceof Function)
	            target('unpipe', null);
	        else if (target.trigger)
	            target.trigger('unpipe', null);
	        return target;
	    } else
	        return false;
	};
	EventHandler.prototype.on = function on(type, handler) {
	    EventEmitter.prototype.on.apply(this, arguments);
	    if (!(type in this.upstreamListeners)) {
	        var upstreamListener = this.trigger.bind(this, type);
	        this.upstreamListeners[type] = upstreamListener;
	        for (var i = 0; i < this.upstream.length; i++) {
	            this.upstream[i].on(type, upstreamListener);
	        }
	    }
	    return this;
	};
	EventHandler.prototype.addListener = EventHandler.prototype.on;
	EventHandler.prototype.subscribe = function subscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index < 0) {
	        this.upstream.push(source);
	        for (var type in this.upstreamListeners) {
	            source.on(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};
	EventHandler.prototype.unsubscribe = function unsubscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index >= 0) {
	        this.upstream.splice(index, 1);
	        for (var type in this.upstreamListeners) {
	            source.removeListener(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};
	module.exports = EventHandler;

/***/ },
/* 8 */
/*!****************************************!*\
  !*** ../~/famous/core/EventEmitter.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function EventEmitter() {
	    this.listeners = {};
	    this._owner = this;
	}
	EventEmitter.prototype.emit = function emit(type, event) {
	    var handlers = this.listeners[type];
	    if (handlers) {
	        for (var i = 0; i < handlers.length; i++) {
	            handlers[i].call(this._owner, event);
	        }
	    }
	    return this;
	};
	EventEmitter.prototype.on = function on(type, handler) {
	    if (!(type in this.listeners))
	        this.listeners[type] = [];
	    var index = this.listeners[type].indexOf(handler);
	    if (index < 0)
	        this.listeners[type].push(handler);
	    return this;
	};
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prototype.removeListener = function removeListener(type, handler) {
	    var listener = this.listeners[type];
	    if (listener !== undefined) {
	        var index = listener.indexOf(handler);
	        if (index >= 0)
	            listener.splice(index, 1);
	    }
	    return this;
	};
	EventEmitter.prototype.bindThis = function bindThis(owner) {
	    this._owner = owner;
	};
	module.exports = EventEmitter;

/***/ },
/* 9 */
/*!********************************************!*\
  !*** ../~/famous/core/ElementAllocator.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function ElementAllocator(container) {
	    if (!container)
	        container = document.createDocumentFragment();
	    this.container = container;
	    this.detachedNodes = {};
	    this.nodeCount = 0;
	}
	ElementAllocator.prototype.migrate = function migrate(container) {
	    var oldContainer = this.container;
	    if (container === oldContainer)
	        return;
	    if (oldContainer instanceof DocumentFragment) {
	        container.appendChild(oldContainer);
	    } else {
	        while (oldContainer.hasChildNodes()) {
	            container.appendChild(oldContainer.firstChild);
	        }
	    }
	    this.container = container;
	};
	ElementAllocator.prototype.allocate = function allocate(type) {
	    type = type.toLowerCase();
	    if (!(type in this.detachedNodes))
	        this.detachedNodes[type] = [];
	    var nodeStore = this.detachedNodes[type];
	    var result;
	    if (nodeStore.length > 0) {
	        result = nodeStore.pop();
	    } else {
	        result = document.createElement(type);
	        this.container.appendChild(result);
	    }
	    this.nodeCount++;
	    return result;
	};
	ElementAllocator.prototype.deallocate = function deallocate(element) {
	    var nodeType = element.nodeName.toLowerCase();
	    var nodeStore = this.detachedNodes[nodeType];
	    nodeStore.push(element);
	    this.nodeCount--;
	};
	ElementAllocator.prototype.getNodeCount = function getNodeCount() {
	    return this.nodeCount;
	};
	module.exports = ElementAllocator;

/***/ },
/* 10 */
/*!*************************************************!*\
  !*** ../~/famous/transitions/Transitionable.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var MultipleTransition = __webpack_require__(/*! ./MultipleTransition */ 11);
	var TweenTransition = __webpack_require__(/*! ./TweenTransition */ 13);
	function Transitionable(start) {
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	    this.state = 0;
	    this.velocity = undefined;
	    this._callback = undefined;
	    this._engineInstance = null;
	    this._currentMethod = null;
	    this.set(start);
	}
	var transitionMethods = {};
	Transitionable.register = function register(methods) {
	    var success = true;
	    for (var method in methods) {
	        if (!Transitionable.registerMethod(method, methods[method]))
	            success = false;
	    }
	    return success;
	};
	Transitionable.registerMethod = function registerMethod(name, engineClass) {
	    if (!(name in transitionMethods)) {
	        transitionMethods[name] = engineClass;
	        return true;
	    } else
	        return false;
	};
	Transitionable.unregisterMethod = function unregisterMethod(name) {
	    if (name in transitionMethods) {
	        delete transitionMethods[name];
	        return true;
	    } else
	        return false;
	};
	function _loadNext() {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    if (this.actionQueue.length <= 0) {
	        this.set(this.get());
	        return;
	    }
	    this.currentAction = this.actionQueue.shift();
	    this._callback = this.callbackQueue.shift();
	    var method = null;
	    var endValue = this.currentAction[0];
	    var transition = this.currentAction[1];
	    if (transition instanceof Object && transition.method) {
	        method = transition.method;
	        if (typeof method === 'string')
	            method = transitionMethods[method];
	    } else {
	        method = TweenTransition;
	    }
	    if (this._currentMethod !== method) {
	        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
	            this._engineInstance = new method();
	        } else {
	            this._engineInstance = new MultipleTransition(method);
	        }
	        this._currentMethod = method;
	    }
	    this._engineInstance.reset(this.state, this.velocity);
	    if (this.velocity !== undefined)
	        transition.velocity = this.velocity;
	    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
	}
	Transitionable.prototype.set = function set(endState, transition, callback) {
	    if (!transition) {
	        this.reset(endState);
	        if (callback)
	            callback();
	        return this;
	    }
	    var action = [
	        endState,
	        transition
	    ];
	    this.actionQueue.push(action);
	    this.callbackQueue.push(callback);
	    if (!this.currentAction)
	        _loadNext.call(this);
	    return this;
	};
	Transitionable.prototype.reset = function reset(startState, startVelocity) {
	    this._currentMethod = null;
	    this._engineInstance = null;
	    this._callback = undefined;
	    this.state = startState;
	    this.velocity = startVelocity;
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	};
	Transitionable.prototype.delay = function delay(duration, callback) {
	    var endValue;
	    if (this.actionQueue.length)
	        endValue = this.actionQueue[this.actionQueue.length - 1][0];
	    else if (this.currentAction)
	        endValue = this.currentAction[0];
	    else
	        endValue = this.get();
	    return this.set(endValue, {
	        duration: duration,
	        curve: function () {
	            return 0;
	        }
	    }, callback);
	};
	Transitionable.prototype.get = function get(timestamp) {
	    if (this._engineInstance) {
	        if (this._engineInstance.getVelocity)
	            this.velocity = this._engineInstance.getVelocity();
	        this.state = this._engineInstance.get(timestamp);
	    }
	    return this.state;
	};
	Transitionable.prototype.isActive = function isActive() {
	    return !!this.currentAction;
	};
	Transitionable.prototype.halt = function halt() {
	    return this.set(this.get());
	};
	module.exports = Transitionable;

/***/ },
/* 11 */
/*!*****************************************************!*\
  !*** ../~/famous/transitions/MultipleTransition.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Utility = __webpack_require__(/*! ../utilities/Utility */ 12);
	function MultipleTransition(method) {
	    this.method = method;
	    this._instances = [];
	    this.state = [];
	}
	MultipleTransition.SUPPORTS_MULTIPLE = true;
	MultipleTransition.prototype.get = function get() {
	    for (var i = 0; i < this._instances.length; i++) {
	        this.state[i] = this._instances[i].get();
	    }
	    return this.state;
	};
	MultipleTransition.prototype.set = function set(endState, transition, callback) {
	    var _allCallback = Utility.after(endState.length, callback);
	    for (var i = 0; i < endState.length; i++) {
	        if (!this._instances[i])
	            this._instances[i] = new this.method();
	        this._instances[i].set(endState[i], transition, _allCallback);
	    }
	};
	MultipleTransition.prototype.reset = function reset(startState) {
	    for (var i = 0; i < startState.length; i++) {
	        if (!this._instances[i])
	            this._instances[i] = new this.method();
	        this._instances[i].reset(startState[i]);
	    }
	};
	module.exports = MultipleTransition;

/***/ },
/* 12 */
/*!****************************************!*\
  !*** ../~/famous/utilities/Utility.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Utility = {};
	Utility.Direction = {
	    X: 0,
	    Y: 1,
	    Z: 2
	};
	Utility.after = function after(count, callback) {
	    var counter = count;
	    return function () {
	        counter--;
	        if (counter === 0)
	            callback.apply(this, arguments);
	    };
	};
	Utility.loadURL = function loadURL(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function onreadystatechange() {
	        if (this.readyState === 4) {
	            if (callback)
	                callback(this.responseText);
	        }
	    };
	    xhr.open('GET', url);
	    xhr.send();
	};
	Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
	    var element = document.createElement('div');
	    element.innerHTML = html;
	    var result = document.createDocumentFragment();
	    while (element.hasChildNodes())
	        result.appendChild(element.firstChild);
	    return result;
	};
	Utility.clone = function clone(b) {
	    var a;
	    if (typeof b === 'object') {
	        a = b instanceof Array ? [] : {};
	        for (var key in b) {
	            if (typeof b[key] === 'object' && b[key] !== null) {
	                if (b[key] instanceof Array) {
	                    a[key] = new Array(b[key].length);
	                    for (var i = 0; i < b[key].length; i++) {
	                        a[key][i] = Utility.clone(b[key][i]);
	                    }
	                } else {
	                    a[key] = Utility.clone(b[key]);
	                }
	            } else {
	                a[key] = b[key];
	            }
	        }
	    } else {
	        a = b;
	    }
	    return a;
	};
	module.exports = Utility;

/***/ },
/* 13 */
/*!**************************************************!*\
  !*** ../~/famous/transitions/TweenTransition.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function TweenTransition(options) {
	    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this._startTime = 0;
	    this._startValue = 0;
	    this._updateTime = 0;
	    this._endValue = 0;
	    this._curve = undefined;
	    this._duration = 0;
	    this._active = false;
	    this._callback = undefined;
	    this.state = 0;
	    this.velocity = undefined;
	}
	TweenTransition.Curves = {
	    linear: function (t) {
	        return t;
	    },
	    easeIn: function (t) {
	        return t * t;
	    },
	    easeOut: function (t) {
	        return t * (2 - t);
	    },
	    easeInOut: function (t) {
	        if (t <= 0.5)
	            return 2 * t * t;
	        else
	            return -2 * t * t + 4 * t - 1;
	    },
	    easeOutBounce: function (t) {
	        return t * (3 - 2 * t);
	    },
	    spring: function (t) {
	        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
	    }
	};
	TweenTransition.SUPPORTS_MULTIPLE = true;
	TweenTransition.DEFAULT_OPTIONS = {
	    curve: TweenTransition.Curves.linear,
	    duration: 500,
	    speed: 0
	};
	var registeredCurves = {};
	TweenTransition.registerCurve = function registerCurve(curveName, curve) {
	    if (!registeredCurves[curveName]) {
	        registeredCurves[curveName] = curve;
	        return true;
	    } else {
	        return false;
	    }
	};
	TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
	    if (registeredCurves[curveName]) {
	        delete registeredCurves[curveName];
	        return true;
	    } else {
	        return false;
	    }
	};
	TweenTransition.getCurve = function getCurve(curveName) {
	    var curve = registeredCurves[curveName];
	    if (curve !== undefined)
	        return curve;
	    else
	        throw new Error('curve not registered');
	};
	TweenTransition.getCurves = function getCurves() {
	    return registeredCurves;
	};
	function _interpolate(a, b, t) {
	    return (1 - t) * a + t * b;
	}
	function _clone(obj) {
	    if (obj instanceof Object) {
	        if (obj instanceof Array)
	            return obj.slice(0);
	        else
	            return Object.create(obj);
	    } else
	        return obj;
	}
	function _normalize(transition, defaultTransition) {
	    var result = { curve: defaultTransition.curve };
	    if (defaultTransition.duration)
	        result.duration = defaultTransition.duration;
	    if (defaultTransition.speed)
	        result.speed = defaultTransition.speed;
	    if (transition instanceof Object) {
	        if (transition.duration !== undefined)
	            result.duration = transition.duration;
	        if (transition.curve)
	            result.curve = transition.curve;
	        if (transition.speed)
	            result.speed = transition.speed;
	    }
	    if (typeof result.curve === 'string')
	        result.curve = TweenTransition.getCurve(result.curve);
	    return result;
	}
	TweenTransition.prototype.setOptions = function setOptions(options) {
	    if (options.curve !== undefined)
	        this.options.curve = options.curve;
	    if (options.duration !== undefined)
	        this.options.duration = options.duration;
	    if (options.speed !== undefined)
	        this.options.speed = options.speed;
	};
	TweenTransition.prototype.set = function set(endValue, transition, callback) {
	    if (!transition) {
	        this.reset(endValue);
	        if (callback)
	            callback();
	        return;
	    }
	    this._startValue = _clone(this.get());
	    transition = _normalize(transition, this.options);
	    if (transition.speed) {
	        var startValue = this._startValue;
	        if (startValue instanceof Object) {
	            var variance = 0;
	            for (var i in startValue)
	                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
	            transition.duration = Math.sqrt(variance) / transition.speed;
	        } else {
	            transition.duration = Math.abs(endValue - startValue) / transition.speed;
	        }
	    }
	    this._startTime = Date.now();
	    this._endValue = _clone(endValue);
	    this._startVelocity = _clone(transition.velocity);
	    this._duration = transition.duration;
	    this._curve = transition.curve;
	    this._active = true;
	    this._callback = callback;
	};
	TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    this.state = _clone(startValue);
	    this.velocity = _clone(startVelocity);
	    this._startTime = 0;
	    this._duration = 0;
	    this._updateTime = 0;
	    this._startValue = this.state;
	    this._startVelocity = this.velocity;
	    this._endValue = this.state;
	    this._active = false;
	};
	TweenTransition.prototype.getVelocity = function getVelocity() {
	    return this.velocity;
	};
	TweenTransition.prototype.get = function get(timestamp) {
	    this.update(timestamp);
	    return this.state;
	};
	function _calculateVelocity(current, start, curve, duration, t) {
	    var velocity;
	    var eps = 1e-7;
	    var speed = (curve(t) - curve(t - eps)) / eps;
	    if (current instanceof Array) {
	        velocity = [];
	        for (var i = 0; i < current.length; i++) {
	            if (typeof current[i] === 'number')
	                velocity[i] = speed * (current[i] - start[i]) / duration;
	            else
	                velocity[i] = 0;
	        }
	    } else
	        velocity = speed * (current - start) / duration;
	    return velocity;
	}
	function _calculateState(start, end, t) {
	    var state;
	    if (start instanceof Array) {
	        state = [];
	        for (var i = 0; i < start.length; i++) {
	            if (typeof start[i] === 'number')
	                state[i] = _interpolate(start[i], end[i], t);
	            else
	                state[i] = start[i];
	        }
	    } else
	        state = _interpolate(start, end, t);
	    return state;
	}
	TweenTransition.prototype.update = function update(timestamp) {
	    if (!this._active) {
	        if (this._callback) {
	            var callback = this._callback;
	            this._callback = undefined;
	            callback();
	        }
	        return;
	    }
	    if (!timestamp)
	        timestamp = Date.now();
	    if (this._updateTime >= timestamp)
	        return;
	    this._updateTime = timestamp;
	    var timeSinceStart = timestamp - this._startTime;
	    if (timeSinceStart >= this._duration) {
	        this.state = this._endValue;
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
	        this._active = false;
	    } else if (timeSinceStart < 0) {
	        this.state = this._startValue;
	        this.velocity = this._startVelocity;
	    } else {
	        var t = timeSinceStart / this._duration;
	        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
	    }
	};
	TweenTransition.prototype.isActive = function isActive() {
	    return this._active;
	};
	TweenTransition.prototype.halt = function halt() {
	    this.reset(this.get());
	};
	TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
	TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
	TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
	TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
	TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
	TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
	TweenTransition.customCurve = function customCurve(v1, v2) {
	    v1 = v1 || 0;
	    v2 = v2 || 0;
	    return function (t) {
	        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
	    };
	};
	module.exports = TweenTransition;

/***/ },
/* 14 */
/*!******************************************!*\
  !*** ../~/famous/core/OptionsManager.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 7);
	function OptionsManager(value) {
	    this._value = value;
	    this.eventOutput = null;
	}
	OptionsManager.patch = function patchObject(source, data) {
	    var manager = new OptionsManager(source);
	    for (var i = 1; i < arguments.length; i++)
	        manager.patch(arguments[i]);
	    return source;
	};
	function _createEventOutput() {
	    this.eventOutput = new EventHandler();
	    this.eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this.eventOutput);
	}
	OptionsManager.prototype.patch = function patch() {
	    var myState = this._value;
	    for (var i = 0; i < arguments.length; i++) {
	        var data = arguments[i];
	        for (var k in data) {
	            if (k in myState && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
	                if (!myState.hasOwnProperty(k))
	                    myState[k] = Object.create(myState[k]);
	                this.key(k).patch(data[k]);
	                if (this.eventOutput)
	                    this.eventOutput.emit('change', {
	                        id: k,
	                        value: this.key(k).value()
	                    });
	            } else
	                this.set(k, data[k]);
	        }
	    }
	    return this;
	};
	OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
	OptionsManager.prototype.key = function key(identifier) {
	    var result = new OptionsManager(this._value[identifier]);
	    if (!(result._value instanceof Object) || result._value instanceof Array)
	        result._value = {};
	    return result;
	};
	OptionsManager.prototype.get = function get(key) {
	    return key ? this._value[key] : this._value;
	};
	OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
	OptionsManager.prototype.set = function set(key, value) {
	    var originalValue = this.get(key);
	    this._value[key] = value;
	    if (this.eventOutput && value !== originalValue)
	        this.eventOutput.emit('change', {
	            id: key,
	            value: value
	        });
	    return this;
	};
	OptionsManager.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};
	OptionsManager.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};
	OptionsManager.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};
	OptionsManager.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};
	module.exports = OptionsManager;

/***/ },
/* 15 */
/*!**************************************!*\
  !*** ../~/famous-polyfills/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./classList.js */ 16);
	__webpack_require__(/*! ./functionPrototypeBind.js */ 17);
	__webpack_require__(/*! ./requestAnimationFrame.js */ 18);

/***/ },
/* 16 */
/*!******************************************!*\
  !*** ../~/famous-polyfills/classList.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 2011-06-15
	 *
	 * By Eli Grey, http://eligrey.com
	 * Public Domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */
	
	/*global self, document, DOMException */
	
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
	
	if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {
	
	(function (view) {
	
	"use strict";
	
	var
	      classListProp = "classList"
	    , protoProp = "prototype"
	    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
	    , objCtr = Object
	    , strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	    }
	    , arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var
	              i = 0
	            , len = this.length
	        ;
	        for (; i < len; i++) {
	            if (i in this && this[i] === item) {
	                return i;
	            }
	        }
	        return -1;
	    }
	    // Vendors: please allow content code to instantiate DOMExceptions
	    , DOMEx = function (type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	    }
	    , checkTokenAndGetIndex = function (classList, token) {
	        if (token === "") {
	            throw new DOMEx(
	                  "SYNTAX_ERR"
	                , "An invalid or illegal string was specified"
	            );
	        }
	        if (/\s/.test(token)) {
	            throw new DOMEx(
	                  "INVALID_CHARACTER_ERR"
	                , "String contains an invalid character"
	            );
	        }
	        return arrIndexOf.call(classList, token);
	    }
	    , ClassList = function (elem) {
	        var
	              trimmedClasses = strTrim.call(elem.className)
	            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
	            , i = 0
	            , len = classes.length
	        ;
	        for (; i < len; i++) {
	            this.push(classes[i]);
	        }
	        this._updateClassName = function () {
	            elem.className = this.toString();
	        };
	    }
	    , classListProto = ClassList[protoProp] = []
	    , classListGetter = function () {
	        return new ClassList(this);
	    }
	;
	// Most DOMException implementations don't allow calling DOMException's toString()
	// on non-DOMExceptions. Error's toString() is sufficient here.
	DOMEx[protoProp] = Error[protoProp];
	classListProto.item = function (i) {
	    return this[i] || null;
	};
	classListProto.contains = function (token) {
	    token += "";
	    return checkTokenAndGetIndex(this, token) !== -1;
	};
	classListProto.add = function (token) {
	    token += "";
	    if (checkTokenAndGetIndex(this, token) === -1) {
	        this.push(token);
	        this._updateClassName();
	    }
	};
	classListProto.remove = function (token) {
	    token += "";
	    var index = checkTokenAndGetIndex(this, token);
	    if (index !== -1) {
	        this.splice(index, 1);
	        this._updateClassName();
	    }
	};
	classListProto.toggle = function (token) {
	    token += "";
	    if (checkTokenAndGetIndex(this, token) === -1) {
	        this.add(token);
	    } else {
	        this.remove(token);
	    }
	};
	classListProto.toString = function () {
	    return this.join(" ");
	};
	
	if (objCtr.defineProperty) {
	    var classListPropDesc = {
	          get: classListGetter
	        , enumerable: true
	        , configurable: true
	    };
	    try {
	        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	    } catch (ex) { // IE 8 doesn't support enumerable:true
	        if (ex.number === -0x7FF5EC54) {
	            classListPropDesc.enumerable = false;
	            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        }
	    }
	} else if (objCtr[protoProp].__defineGetter__) {
	    elemCtrProto.__defineGetter__(classListProp, classListGetter);
	}
	
	}(self));
	
	}


/***/ },
/* 17 */
/*!******************************************************!*\
  !*** ../~/famous-polyfills/functionPrototypeBind.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	if (!Function.prototype.bind) {
	    Function.prototype.bind = function (oThis) {
	        if (typeof this !== "function") {
	            // closest thing possible to the ECMAScript 5 internal IsCallable function
	            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	        }
	
	        var aArgs = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP = function () {},
	        fBound = function () {
	            return fToBind.apply(this instanceof fNOP && oThis
	                ? this
	                : oThis,
	                aArgs.concat(Array.prototype.slice.call(arguments)));
	        };
	
	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP();
	
	        return fBound;
	    };
	}


/***/ },
/* 18 */
/*!******************************************************!*\
  !*** ../~/famous-polyfills/requestAnimationFrame.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// adds requestAnimationFrame functionality
	// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/
	
	window.requestAnimationFrame || (window.requestAnimationFrame =
	  window.webkitRequestAnimationFrame ||
	  window.mozRequestAnimationFrame    ||
	  window.oRequestAnimationFrame      ||
	  window.msRequestAnimationFrame     ||
	  function(callback, element) {
	    return window.setTimeout(function() {
	      callback(+new Date());
	  }, 1000 / 60);
	});


/***/ },
/* 19 */
/*!***********************************!*\
  !*** ../~/famous/core/famous.css ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(/*! ../~/style-loader/addStyle.js */ 20)
		// The css code:
		(__webpack_require__(/*! !../~/css-loader!../~/famous/core/famous.css */ 21));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 20 */
/*!*************************************!*\
  !*** ../~/style-loader/addStyle.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function addStyle(cssCode) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElement);
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		return function() {
			head.removeChild(styleElement);
		};
	}


/***/ },
/* 21 */
/*!***************************************************!*\
  !*** ../~/css-loader!../~/famous/core/famous.css ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2015\n */\n\n.famous-root {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    opacity: .999999; /* ios8 hotfix */\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n";

/***/ },
/* 22 */
/*!***********************************************!*\
  !*** ../~/famous-flex/src/widgets/styles.css ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(/*! ../~/style-loader/addStyle.js */ 20)
		// The css code:
		(__webpack_require__(/*! !../~/css-loader!../~/famous-flex/src/widgets/styles.css */ 23));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 23 */
/*!***************************************************************!*\
  !*** ../~/css-loader!../~/famous-flex/src/widgets/styles.css ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"/**\n * This Source Code is licensed under the MIT license. If a copy of the\n * MIT-license was not distributed with this file, You can obtain one at:\n * http://opensource.org/licenses/mit-license.html.\n *\n * @author: Hein Rutjes (IjzerenHein)\n * @license MIT\n * @copyright Gloey Apps, 2015\n */\n\n/* datepicker */\n.ff-datepicker.item {\n  text-align: center;\n}\n.ff-datepicker.item > div {\n  /* align content vertically */\n  position: relative;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n.ff-datepicker.top, .ff-datepicker.middle, .ff-datepicker.bottom {\n  pointer-events: none;\n}\n\n\n/* tabbar common */\n.ff-tabbar.item {\n  text-align: center;\n  white-space: nowrap;\n  color: #333333;\n  cursor: pointer;\n}\n.ff-tabbar.item > div {\n  /* align content vertically */\n  position: relative;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n.ff-tabbar.selectedItemOverlay {\n  border-bottom: 6px solid #1185c3;\n}\n";

/***/ },
/* 24 */
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(/*! ../~/style-loader/addStyle.js */ 20)
		// The css code:
		(__webpack_require__(/*! !../~/css-loader!./styles.css */ 25));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 25 */
/*!************************************!*\
  !*** ../~/css-loader!./styles.css ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"body {\n  color: #555555;\n}\ntextarea {\n  font-family: 'droid sans mono', monospace, 'courier new', courier, sans-serif;\n  font-size: 17px;\n}\n";

/***/ },
/* 26 */
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ },
/* 27 */
/*!***************************************!*\
  !*** ../~/fastclick/lib/fastclick.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 28 */
/*!************************************************!*\
  !*** ../~/famous-flex/src/LayoutController.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/*global console*/
	/*eslint no-console: 0*/
	
	/**
	 * LayoutController lays out renderables according to a layout-
	 * function and a data-source.
	 *
	 * Events:
	 *
	 * |event      |description|
	 * |-----------|-----------|
	 * |layoutstart|Emitted before the layout function is executed.|
	 * |layoutend  |Emitted after the layout function has been executed.|
	 * |reflow     |Emitted after one or more renderables have been changed.|
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 12);
	    var Entity = __webpack_require__(/*! famous/core/Entity */ 4);
	    var ViewSequence = __webpack_require__(/*! famous/core/ViewSequence */ 29);
	    var OptionsManager = __webpack_require__(/*! famous/core/OptionsManager */ 14);
	    var EventHandler = __webpack_require__(/*! famous/core/EventHandler */ 7);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 30);
	    var LayoutNodeManager = __webpack_require__(/*! ./LayoutNodeManager */ 31);
	    var LayoutNode = __webpack_require__(/*! ./LayoutNode */ 33);
	    var FlowLayoutNode = __webpack_require__(/*! ./FlowLayoutNode */ 34);
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 6);
	    __webpack_require__(/*! ./helpers/LayoutDockHelper */ 41);
	
	    /**
	     * @class
	     * @param {Object} options Options.
	     * @param {Function|Object} [options.layout] Layout function or layout-literal.
	     * @param {Object} [options.layoutOptions] Options to pass in to the layout-function.
	     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object with key/value pairs.
	     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when omitted the default direction of the layout is used)
	     * @param {Bool} [options.flow] Enables flow animations when the layout changes (default: `false`).
	     * @param {Object} [options.flowOptions] Options used by nodes when reflowing.
	     * @param {Bool} [options.flowOptions.reflowOnResize] Smoothly reflows renderables on resize (only used when flow = true) (default: `true`).
	     * @param {Object} [options.flowOptions.spring] Spring options used by nodes when reflowing (default: `{dampingRatio: 0.8, period: 300}`).
	     * @param {Object} [options.flowOptions.properties] Properties which should be enabled or disabled for flowing.
	     * @param {Spec} [options.flowOptions.insertSpec] Size, transform, opacity... to use when inserting new renderables into the scene (default: `{}`).
	     * @param {Spec} [options.flowOptions.removeSpec] Size, transform, opacity... to use when removing renderables from the scene (default: `{}`).
	     * @param {Bool} [options.alwaysLayout] When set to true, always calls the layout function on every render-cycle (default: `false`).
	     * @param {Bool} [options.autoPipeEvents] When set to true, automatically calls .pipe on all renderables when inserted (default: `false`).
	     * @param {Object} [options.preallocateNodes] Optimisation option to improve initial scrolling/animation performance by pre-allocating nodes, e.g.: `{count: 50, spec: {size:[0, 0], transform: Transform.identity}}`.
	     * @alias module:LayoutController
	     */
	    function LayoutController(options, nodeManager) {
	
	        // Commit
	        this.id = Entity.register(this);
	        this._isDirty = true;
	        this._contextSizeCache = [0, 0];
	        this._commitOutput = {};
	
	        // Create an object to we can capture the famo.us cleanup call on
	        // LayoutController.
	        this._cleanupRegistration = {
	          commit: function() {
	              return undefined;
	          },
	          cleanup: function(context) {
	              this.cleanup(context);
	          }.bind(this)
	        };
	        this._cleanupRegistration.target = Entity.register(this._cleanupRegistration);
	        this._cleanupRegistration.render = function() {
	          return this.target;
	        }.bind(this._cleanupRegistration);
	
	        // Setup input event handler
	        this._eventInput = new EventHandler();
	        EventHandler.setInputHandler(this, this._eventInput);
	
	        // Setup event handlers
	        this._eventOutput = new EventHandler();
	        EventHandler.setOutputHandler(this, this._eventOutput);
	
	        // Data-source
	        //this._dataSource = undefined;
	        //this._nodesById = undefined;
	        //this._viewSequence = undefined;
	
	        // Layout
	        this._layout = {
	            //function: undefined,
	            //literal: undefined,
	            //capabilities: undefined,
	            options: Object.create({})
	        };
	        //this._direction = undefined;
	        this._layout.optionsManager = new OptionsManager(this._layout.options);
	        this._layout.optionsManager.on('change', function() {
	            this._isDirty = true;
	        }.bind(this));
	
	        // Create options
	        this.options = Object.create(LayoutController.DEFAULT_OPTIONS);
	        this._optionsManager = new OptionsManager(this.options);
	
	        // Create node manager that manages (Flow)LayoutNode instances
	        if (nodeManager) {
	            this._nodes = nodeManager;
	        }
	        else if (options && options.flow) {
	            this._nodes = new LayoutNodeManager(FlowLayoutNode, _initFlowLayoutNode.bind(this));
	        }
	        else {
	            this._nodes = new LayoutNodeManager(LayoutNode);
	        }
	
	        // Set options
	        this.setDirection(undefined);
	        if (options) {
	            this.setOptions(options);
	        }
	    }
	
	    LayoutController.DEFAULT_OPTIONS = {
	        flow: false,
	        flowOptions: {
	            reflowOnResize: true,
	            properties: {
	                opacity: true,
	                align: true,
	                origin: true,
	                size: true,
	                translate: true,
	                skew: true,
	                rotate: true,
	                scale: true
	            },
	            spring: {
	                dampingRatio: 0.8,
	                period: 300
	            }
	            /*insertSpec: {
	                opacity: undefined,
	                size: undefined,
	                transform: undefined,
	                origin: undefined,
	                align: undefined
	            },
	            removeSpec: {
	                opacity: undefined,
	                size: undefined,
	                transform: undefined,
	                origin: undefined,
	                align: undefined
	            }*/
	        }
	    };
	
	    /**
	     * Called whenever a layout-node is created/re-used. Initializes
	     * the node with the `insertSpec` if it has been defined.
	     */
	    function _initFlowLayoutNode(node, spec) {
	        if (!spec && this.options.flowOptions.insertSpec) {
	            node.setSpec(this.options.flowOptions.insertSpec);
	        }
	    }
	
	    /**
	     * Patches the LayoutController instance's options with the passed-in ones.
	     *
	     * @param {Options} options An object of configurable options for the LayoutController instance.
	     * @param {Function|Object} [options.layout] Layout function or layout-literal.
	     * @param {Object} [options.layoutOptions] Options to pass in to the layout-function.
	     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object with key/value pairs.
	     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when omitted the default direction of the layout is used)
	     * @param {Object} [options.flowOptions] Options used by nodes when reflowing.
	     * @param {Bool} [options.flowOptions.reflowOnResize] Smoothly reflows renderables on resize (only used when flow = true) (default: `true`).
	     * @param {Object} [options.flowOptions.spring] Spring options used by nodes when reflowing (default: `{dampingRatio: 0.8, period: 300}`).
	     * @param {Object} [options.flowOptions.properties] Properties which should be enabled or disabled for flowing.
	     * @param {Spec} [options.flowOptions.insertSpec] Size, transform, opacity... to use when inserting new renderables into the scene (default: `{}`).
	     * @param {Spec} [options.flowOptions.removeSpec] Size, transform, opacity... to use when removing renderables from the scene (default: `{}`).
	     * @param {Bool} [options.alwaysLayout] When set to true, always calls the layout function on every render-cycle (default: `false`).
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setOptions = function(options) {
	        if ((options.alignment !== undefined) && (options.alignment !== this.options.alignment)) {
	            this._isDirty = true;
	        }
	        this._optionsManager.setOptions(options);
	        if (options.nodeSpring) {
	            console.warn('nodeSpring options have been moved inside `flowOptions`. Use `flowOptions.spring` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    spring: options.nodeSpring
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.reflowOnResize !== undefined) {
	            console.warn('reflowOnResize options have been moved inside `flowOptions`. Use `flowOptions.reflowOnResize` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    reflowOnResize: options.reflowOnResize
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.insertSpec) {
	            console.warn('insertSpec options have been moved inside `flowOptions`. Use `flowOptions.insertSpec` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    insertSpec: options.insertSpec
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.removeSpec) {
	            console.warn('removeSpec options have been moved inside `flowOptions`. Use `flowOptions.removeSpec` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    removeSpec: options.removeSpec
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.dataSource) {
	            this.setDataSource(options.dataSource);
	        }
	        if (options.layout) {
	            this.setLayout(options.layout, options.layoutOptions);
	        }
	        else if (options.layoutOptions) {
	            this.setLayoutOptions(options.layoutOptions);
	        }
	        if (options.direction !== undefined) {
	            this.setDirection(options.direction);
	        }
	        if (options.flowOptions && this.options.flow) {
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.preallocateNodes) {
	            this._nodes.preallocateNodes(options.preallocateNodes.count || 0, options.preallocateNodes.spec);
	        }
	        return this;
	    };
	
	    /**
	     * Helper function to enumerate all the renderables in the datasource
	     */
	    function _forEachRenderable(callback) {
	        var dataSource = this._dataSource;
	        if (dataSource instanceof Array) {
	            for (var i = 0, j = dataSource.length; i < j; i++) {
	                callback(dataSource[i]);
	            }
	        }
	        else if (dataSource instanceof ViewSequence) {
	            var renderable;
	            while (dataSource) {
	                renderable = dataSource.get();
	                if (!renderable) {
	                    break;
	                }
	                callback(renderable);
	                dataSource = dataSource.getNext();
	            }
	        }
	        else {
	            for (var key in dataSource) {
	                callback(dataSource[key]);
	            }
	        }
	    }
	
	    /**
	     * Sets the collection of renderables which are layed out according to
	     * the layout-function.
	     *
	     * The data-source can be either an Array, ViewSequence or Object
	     * with key/value pairs.
	     *
	     * @param {Array|Object|ViewSequence} dataSource Array, ViewSequence or Object.
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setDataSource = function(dataSource) {
	        this._dataSource = dataSource;
	        this._initialViewSequence = undefined;
	        this._nodesById = undefined;
	        if (dataSource instanceof Array) {
	            this._viewSequence = new ViewSequence(dataSource);
	            this._initialViewSequence = this._viewSequence;
	        }
	        else if ((dataSource instanceof ViewSequence) || dataSource.getNext) {
	            this._viewSequence = dataSource;
	            this._initialViewSequence = dataSource;
	        }
	        else if (dataSource instanceof Object){
	            this._nodesById = dataSource;
	        }
	        if (this.options.autoPipeEvents) {
	            if (this._dataSource.pipe) {
	                this._dataSource.pipe(this);
	                this._dataSource.pipe(this._eventOutput);
	            }
	            else {
	                _forEachRenderable.call(this, function(renderable) {
	                    if (renderable && renderable.pipe) {
	                        renderable.pipe(this);
	                        renderable.pipe(this._eventOutput);
	                    }
	                }.bind(this));
	            }
	        }
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Get the data-source.
	     *
	     * @return {Array|ViewSequence|Object} data-source
	     */
	    LayoutController.prototype.getDataSource = function() {
	        return this._dataSource;
	    };
	
	    /**
	     * Set the new layout.
	     *
	     * @param {Function|Object} layout Layout function or layout-literal
	     * @param {Object} [options] Options to pass in to the layout-function
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setLayout = function(layout, options) {
	
	        // Set new layout funtion
	        if (layout instanceof Function) {
	            this._layout._function = layout;
	            this._layout.capabilities = layout.Capabilities;
	            this._layout.literal = undefined;
	
	        // If the layout is an object, treat it as a layout-literal
	        }
	        else if (layout instanceof Object) {
	            this._layout.literal = layout;
	            this._layout.capabilities = undefined; // todo - derive from literal somehow?
	            var helperName = Object.keys(layout)[0];
	            var Helper = LayoutUtility.getRegisteredHelper(helperName);
	            this._layout._function = Helper ? function(context, options2) {
	                var helper = new Helper(context, options2);
	                helper.parse(layout[helperName]);
	            } : undefined;
	        }
	        else {
	            this._layout._function = undefined;
	            this._layout.capabilities = undefined;
	            this._layout.literal = undefined;
	        }
	
	        // Update options
	        if (options) {
	            this.setLayoutOptions(options);
	        }
	
	        // Update direction
	        this.setDirection(this._configuredDirection);
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Get the current layout.
	     *
	     * @return {Function|Object} Layout function or layout literal
	     */
	    LayoutController.prototype.getLayout = function() {
	        return this._layout.literal || this._layout._function;
	    };
	
	    /**
	     * Set the options for the current layout. Use this function after
	     * `setLayout` to update one or more options for the layout-function.
	     *
	     * @param {Object} [options] Options to pass in to the layout-function
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setLayoutOptions = function(options) {
	        this._layout.optionsManager.setOptions(options);
	        return this;
	    };
	
	    /**
	     * Get the current layout options.
	     *
	     * @return {Object} Layout options
	     */
	    LayoutController.prototype.getLayoutOptions = function() {
	        return this._layout.options;
	    };
	
	    /**
	     * Calculates the actual in-use direction based on the given direction
	     * and supported capabilities of the layout-function.
	     */
	    function _getActualDirection(direction) {
	
	        // When the direction is configured in the capabilities, look it up there
	        if (this._layout.capabilities && this._layout.capabilities.direction) {
	
	            // Multiple directions are supported
	            if (Array.isArray(this._layout.capabilities.direction)) {
	                for (var i = 0; i < this._layout.capabilities.direction.length; i++) {
	                    if (this._layout.capabilities.direction[i] === direction) {
	                        return direction;
	                    }
	                }
	                return this._layout.capabilities.direction[0];
	            }
	
	            // Only one direction is supported, we must use that
	            else {
	                return this._layout.capabilities.direction;
	            }
	        }
	
	        // Use Y-direction as a fallback
	        return (direction === undefined) ? Utility.Direction.Y : direction;
	    }
	
	    /**
	     * Set the direction of the layout. When no direction is set, the default
	     * direction of the layout function is used.
	     *
	     * @param {Utility.Direction} direction Direction (e.g. Utility.Direction.X)
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setDirection = function(direction) {
	        this._configuredDirection = direction;
	        var newDirection = _getActualDirection.call(this, direction);
	        if (newDirection !== this._direction) {
	            this._direction = newDirection;
	            this._isDirty = true;
	        }
	    };
	
	    /**
	     * Get the direction (e.g. Utility.Direction.Y). By default, this function
	     * returns the direction that was configured by setting `setDirection`. When
	     * the direction has not been set, `undefined` is returned.
	     *
	     * When no direction has been set, the first direction is used that is specified
	     * in the capabilities of the layout-function. To obtain the actual in-use direction,
	     * use `getDirection(true)`. This method returns the actual in-use direction and
	     * never returns undefined.
	     *
	     * @param {Boolean} [actual] Set to true to obtain the actual in-use direction
	     * @return {Utility.Direction} Direction or undefined
	     */
	    LayoutController.prototype.getDirection = function(actual) {
	        return actual ? this._direction : this._configuredDirection;
	    };
	
	    /**
	     * Get the spec (size, transform, etc..) for the given renderable or
	     * Id.
	     *
	     * @param {Renderable|String} node Renderabe or Id to look for
	     * @param {Bool} [normalize] When set to `true` normalizes the origin/align into the transform translation (default: `false`).
	     * @param {Bool} [endState] When set to `true` returns the flowing end-state spec rather than the current spec.
	     * @return {Spec} spec or undefined
	     */
	    LayoutController.prototype.getSpec = function(node, normalize, endState) {
	        if (!node) {
	            return undefined;
	        }
	        if ((node instanceof String) || (typeof node === 'string')) {
	            if (!this._nodesById) {
	               return undefined;
	            }
	            node = this._nodesById[node];
	            if (!node) {
	                return undefined;
	            }
	
	            // If the result was an array, return that instead
	            if (node instanceof Array) {
	                return node;
	            }
	        }
	        if (this._specs) {
	            for (var i = 0; i < this._specs.length; i++) {
	                var spec = this._specs[i];
	                if (spec.renderNode === node) {
	                    if (endState && spec.endState) {
	                        spec = spec.endState;
	                    }
	                    // normalize align & origin into transform
	                    if (normalize && spec.transform && spec.size && (spec.align || spec.origin)) {
	                        var transform = spec.transform;
	                        if (spec.align && (spec.align[0] || spec.align[1])) {
	                            transform = Transform.thenMove(transform, [spec.align[0] * this._contextSizeCache[0], spec.align[1] * this._contextSizeCache[1], 0]);
	                        }
	                        if (spec.origin && (spec.origin[0] || spec.origin[1])) {
	                            transform = Transform.moveThen([-spec.origin[0] * spec.size[0], -spec.origin[1] * spec.size[1], 0], transform);
	                        }
	                        return {
	                            opacity: spec.opacity,
	                            size: spec.size,
	                            transform: transform
	                        };
	                    }
	                    return spec;
	                }
	            }
	        }
	        return undefined;
	    };
	
	    /**
	     * Forces a reflow of the layout the next render cycle.
	     *
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.reflowLayout = function() {
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Resets the current flow state, so that all renderables
	     * are immediately displayed in their end-state.
	     *
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.resetFlowState = function() {
	        if (this.options.flow) {
	            this._resetFlowState = true;
	        }
	        return this;
	    };
	
	    /**
	     * Inserts a renderable into the data-source.
	     *
	     * The optional argument `insertSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is inserted using an animation starting with
	     * size, origin, opacity, transform, etc... as specified in `insertSpec'.
	     *
	     * @param {Number|String} indexOrId Index (0 = before first, -1 at end), within dataSource array or id (String)
	     * @param {Object} renderable Renderable to add to the data-source
	     * @param {Spec} [insertSpec] Size, transform, etc.. to start with when inserting
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.insert = function(indexOrId, renderable, insertSpec) {
	
	        // Add the renderable in case of an id (String)
	        if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	
	            // Create data-source if neccesary
	            if (this._dataSource === undefined) {
	                this._dataSource = {};
	                this._nodesById = this._dataSource;
	            }
	
	            // Insert renderable
	            if (this._nodesById[indexOrId] === renderable) {
	                return this;
	            }
	            this._nodesById[indexOrId] = renderable;
	        }
	
	        // Add the renderable using an index
	        else {
	
	            // Create data-source if neccesary
	            if (this._dataSource === undefined) {
	                this._dataSource = [];
	                this._viewSequence = new ViewSequence(this._dataSource);
	                this._initialViewSequence = this._viewSequence;
	            }
	
	            // Insert into array
	            var dataSource = this._viewSequence || this._dataSource;
	            var array = _getDataSourceArray.call(this);
	            if (array && (indexOrId === array.length)) {
	                indexOrId = -1;
	            }
	            if (indexOrId === -1) {
	                dataSource.push(renderable);
	            }
	            else if (indexOrId === 0) {
	                if (dataSource === this._viewSequence) {
	                    dataSource.splice(0, 0, renderable);
	                    if (this._viewSequence.getIndex() === 0) {
	                        var nextViewSequence = this._viewSequence.getNext();
	                        if (nextViewSequence && nextViewSequence.get()) {
	                            this._viewSequence = nextViewSequence;
	                        }
	                    }
	                }
	                else {
	                    dataSource.splice(0, 0, renderable);
	                }
	            }
	            else {
	                dataSource.splice(indexOrId, 0, renderable);
	            }
	        }
	
	        // When a custom insert-spec was specified, store that in the layout-node
	        if (insertSpec) {
	            this._nodes.insertNode(this._nodes.createNode(renderable, insertSpec));
	        }
	
	        // Auto pipe events
	        if (this.options.autoPipeEvents && renderable && renderable.pipe) {
	            renderable.pipe(this);
	            renderable.pipe(this._eventOutput);
	        }
	
	        // Force a reflow
	        this._isDirty = true;
	
	        return this;
	    };
	
	    /**
	     * Adds a renderable to the end of a sequential data-source.
	     *
	     * The optional argument `insertSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is inserted using an animation starting with
	     * size, origin, opacity, transform, etc... as specified in `insertSpec'.
	     *
	     * @param {Object} renderable Renderable to add to the data-source
	     * @param {Spec} [insertSpec] Size, transform, etc.. to start with when inserting
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.push = function(renderable, insertSpec) {
	        return this.insert(-1, renderable, insertSpec);
	    };
	
	    /**
	     * Helper function for finding the view-sequence node at the given position.
	     */
	    function _getViewSequenceAtIndex(index, startViewSequence) {
	        var viewSequence = startViewSequence || this._viewSequence;
	        var i = viewSequence ? viewSequence.getIndex() : index;
	        if (index > i) {
	            while (viewSequence) {
	                viewSequence = viewSequence.getNext();
	                if (!viewSequence) {
	                    return undefined;
	                }
	                i = viewSequence.getIndex();
	                if (i === index) {
	                    return viewSequence;
	                }
	                else if (index < i) {
	                    return undefined;
	                }
	            }
	        }
	        else if (index < i) {
	            while (viewSequence) {
	                viewSequence = viewSequence.getPrevious();
	                if (!viewSequence) {
	                    return undefined;
	                }
	                i = viewSequence.getIndex();
	                if (i === index) {
	                    return viewSequence;
	                }
	                else if (index > i) {
	                    return undefined;
	                }
	            }
	        }
	        return viewSequence;
	    }
	
	    /**
	     * Helper that return the underlying array datasource if available.
	     */
	    function _getDataSourceArray() {
	      if (Array.isArray(this._dataSource)) {
	        return this._dataSource;
	      }
	      else if (this._viewSequence || this._viewSequence._) {
	        return this._viewSequence._.array;
	      }
	      return undefined;
	    }
	
	    /**
	     * Get the renderable at the given index or Id.
	     *
	     * @param {Number|String} indexOrId Index within dataSource array or id (String)
	     * @return {Renderable} renderable or `undefined`
	     */
	    LayoutController.prototype.get = function(indexOrId) {
	      if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	        return this._nodesById[indexOrId];
	      }
	      var viewSequence = _getViewSequenceAtIndex.call(this, indexOrId);
	      return viewSequence ? viewSequence.get() : undefined;
	    };
	
	    /**
	     * Swaps two renderables at the given positions.
	     *
	     * This method is only supported for dataSources of type Array or ViewSequence.
	     *
	     * @param {Number} index Index of the renderable to swap
	     * @param {Number} index2 Index of the renderable to swap with
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.swap = function(index, index2) {
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	            throw '.swap is only supported for dataSources of type Array or ViewSequence';
	        }
	        if (index === index2) {
	          return this;
	        }
	        if ((index < 0) || (index >= array.length)) {
	          throw 'Invalid index (' + index + ') specified to .swap';
	        }
	        if ((index2 < 0) || (index2 >= array.length)) {
	          throw 'Invalid second index (' + index2 + ') specified to .swap';
	        }
	        var renderNode = array[index];
	        array[index] = array[index2];
	        array[index2] = renderNode;
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Replaces a renderable at the given index or id.
	     *
	     * @param {Number|String} indexOrId Index within dataSource array or id (String)
	     * @param {Renderable} renderable renderable to replace with
	     * @param {Bool} [noAnimation] When set to `true`, replaces the renderable without any flowing animation.
	     * @return {Renderable} old renderable that has been replaced
	     */
	    LayoutController.prototype.replace = function(indexOrId, renderable, noAnimation) {
	        var oldRenderable;
	        if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	            oldRenderable = this._nodesById[indexOrId];
	            if (oldRenderable !== renderable) {
	                if (noAnimation && oldRenderable) {
	                    var node = this._nodes.getNodeByRenderNode(oldRenderable);
	                    if (node) {
	                        node.setRenderNode(renderable);
	                    }
	                }
	                this._nodesById[indexOrId] = renderable;
	                this._isDirty = true;
	            }
	            return oldRenderable;
	        }
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	          return undefined;
	        }
	        if ((indexOrId < 0) || (indexOrId >= array.length)) {
	          throw 'Invalid index (' + indexOrId + ') specified to .replace';
	        }
	        oldRenderable = array[indexOrId];
	        if (oldRenderable !== renderable) {
	          array[indexOrId] = renderable;
	          this._isDirty = true;
	        }
	        return oldRenderable;
	    };
	
	    /**
	     * Moves a renderable to a new index.
	     *
	     * This method is only supported for dataSources of type Array or ViewSequence.
	     *
	     * @param {Number} index Index of the renderable to move.
	     * @param {Number} newIndex New index of the renderable.
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.move = function(index, newIndex) {
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	            throw '.move is only supported for dataSources of type Array or ViewSequence';
	        }
	        if ((index < 0) || (index >= array.length)) {
	          throw 'Invalid index (' + index + ') specified to .move';
	        }
	        if ((newIndex < 0) || (newIndex >= array.length)) {
	          throw 'Invalid newIndex (' + newIndex + ') specified to .move';
	        }
	        var item = array.splice(index, 1)[0];
	        array.splice(newIndex, 0, item);
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Removes a renderable from the data-source.
	     *
	     * The optional argument `removeSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is removed using an animation ending at
	     * the size, origin, opacity, transform, etc... as specified in `removeSpec'.
	     *
	     * @param {Number|String|Renderable} indexOrId Index, id (String) or renderable to remove.
	     * @param {Spec} [removeSpec] Size, transform, etc.. to end with when removing
	     * @return {Renderable} renderable that has been removed
	     */
	    LayoutController.prototype.remove = function(indexOrId, removeSpec) {
	        var renderNode;
	
	        // Remove the renderable in case of an id (String)
	        if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	
	            // Find and remove renderable from data-source
	            if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	                renderNode = this._nodesById[indexOrId];
	                if (renderNode) {
	                    delete this._nodesById[indexOrId];
	                }
	            }
	            else {
	                for (var key in this._nodesById) {
	                    if (this._nodesById[key] === indexOrId) {
	                        delete this._nodesById[key];
	                        renderNode = indexOrId;
	                        break;
	                    }
	                }
	            }
	        }
	
	        // Remove the renderable using an index
	        else if ((indexOrId instanceof Number) || (typeof indexOrId === 'number')) {
	            var array = _getDataSourceArray.call(this);
	            if (!array || (indexOrId < 0) || (indexOrId >= array.length)) {
	                throw 'Invalid index (' + indexOrId + ') specified to .remove (or dataSource doesn\'t support remove)';
	            }
	            renderNode = array[indexOrId];
	            this._dataSource.splice(indexOrId, 1);
	        }
	
	        // Remove by renderable
	        else {
	            indexOrId = this._dataSource.indexOf(indexOrId);
	            if (indexOrId >= 0) {
	                this._dataSource.splice(indexOrId, 1);
	                renderNode = indexOrId;
	            }
	        }
	
	        // When a node is removed from the view-sequence, the current this._viewSequence
	        // node may not be part of the valid view-sequence anymore. This seems to be a bug
	        // in the famo.us ViewSequence implementation/concept. The following check was added
	        // to ensure that always a valid viewSequence node is selected into the ScrollView.
	        if (this._viewSequence && renderNode) {
	            var viewSequence = _getViewSequenceAtIndex.call(this, this._viewSequence.getIndex(), this._initialViewSequence);
	            viewSequence = viewSequence || _getViewSequenceAtIndex.call(this, this._viewSequence.getIndex() - 1, this._initialViewSequence);
	            viewSequence = viewSequence || this._dataSource;
	            this._viewSequence = viewSequence;
	        }
	
	        // When a custom remove-spec was specified, store that in the layout-node
	        if (renderNode && removeSpec) {
	            var node = this._nodes.getNodeByRenderNode(renderNode);
	            if (node) {
	                node.remove(removeSpec || this.options.flowOptions.removeSpec);
	            }
	        }
	
	        // Force a reflow
	        if (renderNode) {
	            this._isDirty = true;
	        }
	
	        return renderNode;
	    };
	
	    /**
	     * Removes all renderables from the data-source.
	     *
	     * The optional argument `removeSpec` is only used when `flow` mode is enabled.
	     * When specified, the renderables are removed using an animation ending at
	     * the size, origin, opacity, transform, etc... as specified in `removeSpec'.
	     *
	     * @param {Spec} [removeSpec] Size, transform, etc.. to end with when removing
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.removeAll = function(removeSpec) {
	        if (this._nodesById) {
	            var dirty = false;
	            for (var key in this._nodesById) {
	                delete this._nodesById[key];
	                dirty = true;
	            }
	            if (dirty) {
	                this._isDirty = true;
	            }
	        }
	        else if (this._dataSource){
	            this.setDataSource([]);
	        }
	        if (removeSpec) {
	            var node = this._nodes.getStartEnumNode();
	            while (node) {
	                node.remove(removeSpec || this.options.flowOptions.removeSpec);
	                node = node._next;
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Return size of contained element or `undefined` when size is not defined.
	     *
	     * @return {Array.Number} [width, height]
	     */
	    LayoutController.prototype.getSize = function() {
	        return this._size || this.options.size;
	    };
	
	    /**
	     * Generate a render spec from the contents of this component.
	     *
	     * @private
	     * @method render
	     * @return {Object} Render spec for this component
	     */
	    LayoutController.prototype.render = function render() {
	        return this.id;
	    };
	
	    /**
	     * Apply changes from this component to the corresponding document element.
	     * This includes changes to classes, styles, size, content, opacity, origin,
	     * and matrix transforms.
	     *
	     * @private
	     * @method commit
	     * @param {Context} context commit context
	     */
	    LayoutController.prototype.commit = function commit(context) {
	        var transform = context.transform;
	        var origin = context.origin;
	        var size = context.size;
	        var opacity = context.opacity;
	
	        // Reset the flow-state when requested
	        if (this._resetFlowState) {
	            this._resetFlowState = false;
	            this._isDirty = true;
	            this._nodes.removeAll();
	        }
	
	        // When the size or layout function has changed, reflow the layout
	        if (size[0] !== this._contextSizeCache[0] ||
	            size[1] !== this._contextSizeCache[1] ||
	            this._isDirty ||
	            this._nodes._trueSizeRequested ||
	            this.options.alwaysLayout){
	
	            // Emit start event
	            var eventData = {
	                target: this,
	                oldSize: this._contextSizeCache,
	                size: size,
	                dirty: this._isDirty,
	                trueSizeRequested: this._nodes._trueSizeRequested
	            };
	            this._eventOutput.emit('layoutstart', eventData);
	
	            // When the layout has changed, and we are not just scrolling,
	            // disable the locked state of the layout-nodes so that they
	            // can freely transition between the old and new state.
	            if (this.options.flow) {
	                var lock = false;
	                if (!this.options.flowOptions.reflowOnResize) {
	                    if (!this._isDirty &&
	                        ((size[0] !== this._contextSizeCache[0]) ||
	                         (size[1] !== this._contextSizeCache[1]))) {
	                        lock = undefined;
	                    }
	                    else {
	                      lock = true;
	                    }
	                }
	                if (lock !== undefined) {
	                    var node = this._nodes.getStartEnumNode();
	                    while (node) {
	                        node.releaseLock(lock);
	                        node = node._next;
	                    }
	                }
	            }
	
	            // Update state
	            this._contextSizeCache[0] = size[0];
	            this._contextSizeCache[1] = size[1];
	            this._isDirty = false;
	
	            // Prepare for layout
	            var scrollEnd;
	            if (this.options.size && (this.options.size[this._direction] === true)) {
	                scrollEnd = 1000000; // calculate scroll-length
	            }
	            var layoutContext = this._nodes.prepareForLayout(
	                this._viewSequence,     // first node to layout
	                this._nodesById, {      // so we can do fast id lookups
	                    size: size,
	                    direction: this._direction,
	                    scrollEnd: scrollEnd
	                }
	            );
	
	            // Layout objects
	            if (this._layout._function) {
	                this._layout._function(
	                    layoutContext,          // context which the layout-function can use
	                    this._layout.options    // additional layout-options
	                );
	            }
	
	            // Mark non-invalidated nodes for removal
	            this._nodes.removeNonInvalidatedNodes(this.options.flowOptions.removeSpec);
	
	            // Cleanup any nodes in case of a VirtualViewSequence
	            this._nodes.removeVirtualViewSequenceNodes();
	
	            // Calculate scroll-length and use that as the true-size (height)
	            if (scrollEnd) {
	                scrollEnd = 0;
	                node = this._nodes.getStartEnumNode();
	                while (node) {
	                    if (node._invalidated && node.scrollLength) {
	                        scrollEnd += node.scrollLength;
	                    }
	                    node = node._next;
	                }
	                this._size = this._size || [0, 0];
	                this._size[0] = this.options.size[0];
	                this._size[1] = this.options.size[1];
	                this._size[this._direction] = scrollEnd;
	            }
	
	            // Update output and optionally emit event
	            var result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
	            this._specs = result.specs;
	            this._commitOutput.target = result.specs;
	            this._eventOutput.emit('layoutend', eventData);
	            this._eventOutput.emit('reflow', {
	                target: this
	            });
	        }
	        else if (this.options.flow) {
	
	            // Update output and optionally emit event
	            result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
	            this._specs = result.specs;
	            this._commitOutput.target = result.specs;
	            if (result.modified) {
	                this._eventOutput.emit('reflow', {
	                    target: this
	                });
	            }
	        }
	
	        // Render child-nodes every commit
	        var target = this._commitOutput.target;
	        for (var i = 0, j = target.length; i < j; i++) {
	            if (target[i].renderNode) {
	                target[i].target = target[i].renderNode.render();
	            }
	        }
	
	        // Add our cleanup-registration id also to the list, so that the
	        // cleanup function is called by famo.us when the LayoutController is
	        // removed from the render-tree.
	        if (!target.length || (target[target.length-1] !== this._cleanupRegistration)) {
	            target.push(this._cleanupRegistration);
	        }
	
	        // Translate dependent on origin
	        if (origin && ((origin[0] !== 0) || (origin[1] !== 0))) {
	            transform = Transform.moveThen([-size[0]*origin[0], -size[1]*origin[1], 0], transform);
	        }
	        this._commitOutput.size = size;
	        this._commitOutput.opacity = opacity;
	        this._commitOutput.transform = transform;
	        return this._commitOutput;
	    };
	
	    /**
	     * Called whenever the layout-controller is removed from the render-tree.
	     *
	     * @private
	     * @param {Context} context cleanup context
	     */
	    LayoutController.prototype.cleanup = function(context) {
	        if (this.options.flow) {
	            this._resetFlowState = true;
	        }
	    };
	
	    module.exports = LayoutController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 29 */
/*!****************************************!*\
  !*** ../~/famous/core/ViewSequence.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function ViewSequence(options) {
	    if (!options)
	        options = [];
	    if (options instanceof Array)
	        options = { array: options };
	    this._ = null;
	    this.index = options.index || 0;
	    if (options.array)
	        this._ = new this.constructor.Backing(options.array);
	    else if (options._)
	        this._ = options._;
	    if (this.index === this._.firstIndex)
	        this._.firstNode = this;
	    if (this.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = this;
	    if (options.loop !== undefined)
	        this._.loop = options.loop;
	    if (options.trackSize !== undefined)
	        this._.trackSize = options.trackSize;
	    this._previousNode = null;
	    this._nextNode = null;
	}
	ViewSequence.Backing = function Backing(array) {
	    this.array = array;
	    this.firstIndex = 0;
	    this.loop = false;
	    this.firstNode = null;
	    this.lastNode = null;
	    this.cumulativeSizes = [[
	            0,
	            0
	        ]];
	    this.sizeDirty = true;
	    this.trackSize = false;
	};
	ViewSequence.Backing.prototype.getValue = function getValue(i) {
	    var _i = i - this.firstIndex;
	    if (_i < 0 || _i >= this.array.length)
	        return null;
	    return this.array[_i];
	};
	ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
	    this.array[i - this.firstIndex] = value;
	};
	ViewSequence.Backing.prototype.getSize = function getSize(index) {
	    return this.cumulativeSizes[index];
	};
	ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {
	    index = index || this.array.length;
	    var size = [
	        0,
	        0
	    ];
	    for (var i = 0; i < index; i++) {
	        var nodeSize = this.array[i].getSize();
	        if (!nodeSize)
	            return undefined;
	        if (size[0] !== undefined) {
	            if (nodeSize[0] === undefined)
	                size[0] = undefined;
	            else
	                size[0] += nodeSize[0];
	        }
	        if (size[1] !== undefined) {
	            if (nodeSize[1] === undefined)
	                size[1] = undefined;
	            else
	                size[1] += nodeSize[1];
	        }
	        this.cumulativeSizes[i + 1] = size.slice();
	    }
	    this.sizeDirty = false;
	    return size;
	};
	ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
	    if (!this.array[0])
	        return;
	    var i = 0;
	    var index = this.firstIndex;
	    var indexShiftAmount = insertCount - removeCount;
	    var node = this.firstNode;
	    while (index < start - 1) {
	        node = node.getNext();
	        index++;
	    }
	    var spliceStartNode = node;
	    for (i = 0; i < removeCount; i++) {
	        node = node.getNext();
	        if (node)
	            node._previousNode = spliceStartNode;
	    }
	    var spliceResumeNode = node ? node.getNext() : null;
	    spliceStartNode._nextNode = null;
	    node = spliceStartNode;
	    for (i = 0; i < insertCount; i++)
	        node = node.getNext();
	    index += insertCount;
	    if (node !== spliceResumeNode) {
	        node._nextNode = spliceResumeNode;
	        if (spliceResumeNode)
	            spliceResumeNode._previousNode = node;
	    }
	    if (spliceResumeNode) {
	        node = spliceResumeNode;
	        index++;
	        while (node && index < this.array.length + this.firstIndex) {
	            if (node._nextNode)
	                node.index += indexShiftAmount;
	            else
	                node.index = index;
	            node = node.getNext();
	            index++;
	        }
	    }
	    if (this.trackSize)
	        this.sizeDirty = true;
	};
	ViewSequence.prototype.getPrevious = function getPrevious() {
	    var len = this._.array.length;
	    if (!len) {
	        this._previousNode = null;
	    } else if (this.index === this._.firstIndex) {
	        if (this._.loop) {
	            this._previousNode = this._.lastNode || new this.constructor({
	                _: this._,
	                index: this._.firstIndex + len - 1
	            });
	            this._previousNode._nextNode = this;
	        } else {
	            this._previousNode = null;
	        }
	    } else if (!this._previousNode) {
	        this._previousNode = new this.constructor({
	            _: this._,
	            index: this.index - 1
	        });
	        this._previousNode._nextNode = this;
	    }
	    return this._previousNode;
	};
	ViewSequence.prototype.getNext = function getNext() {
	    var len = this._.array.length;
	    if (!len) {
	        this._nextNode = null;
	    } else if (this.index === this._.firstIndex + len - 1) {
	        if (this._.loop) {
	            this._nextNode = this._.firstNode || new this.constructor({
	                _: this._,
	                index: this._.firstIndex
	            });
	            this._nextNode._previousNode = this;
	        } else {
	            this._nextNode = null;
	        }
	    } else if (!this._nextNode) {
	        this._nextNode = new this.constructor({
	            _: this._,
	            index: this.index + 1
	        });
	        this._nextNode._previousNode = this;
	    }
	    return this._nextNode;
	};
	ViewSequence.prototype.indexOf = function indexOf(item) {
	    return this._.array.indexOf(item);
	};
	ViewSequence.prototype.getIndex = function getIndex() {
	    return this.index;
	};
	ViewSequence.prototype.toString = function toString() {
	    return '' + this.index;
	};
	ViewSequence.prototype.unshift = function unshift(value) {
	    this._.array.unshift.apply(this._.array, arguments);
	    this._.firstIndex -= arguments.length;
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.push = function push(value) {
	    this._.array.push.apply(this._.array, arguments);
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.splice = function splice(index, howMany) {
	    var values = Array.prototype.slice.call(arguments, 2);
	    this._.array.splice.apply(this._.array, [
	        index - this._.firstIndex,
	        howMany
	    ].concat(values));
	    this._.reindex(index, howMany, values.length);
	};
	ViewSequence.prototype.swap = function swap(other) {
	    var otherValue = other.get();
	    var myValue = this.get();
	    this._.setValue(this.index, otherValue);
	    this._.setValue(other.index, myValue);
	    var myPrevious = this._previousNode;
	    var myNext = this._nextNode;
	    var myIndex = this.index;
	    var otherPrevious = other._previousNode;
	    var otherNext = other._nextNode;
	    var otherIndex = other.index;
	    this.index = otherIndex;
	    this._previousNode = otherPrevious === this ? other : otherPrevious;
	    if (this._previousNode)
	        this._previousNode._nextNode = this;
	    this._nextNode = otherNext === this ? other : otherNext;
	    if (this._nextNode)
	        this._nextNode._previousNode = this;
	    other.index = myIndex;
	    other._previousNode = myPrevious === other ? this : myPrevious;
	    if (other._previousNode)
	        other._previousNode._nextNode = other;
	    other._nextNode = myNext === other ? this : myNext;
	    if (other._nextNode)
	        other._nextNode._previousNode = other;
	    if (this.index === this._.firstIndex)
	        this._.firstNode = this;
	    else if (this.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = this;
	    if (other.index === this._.firstIndex)
	        this._.firstNode = other;
	    else if (other.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = other;
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.get = function get() {
	    return this._.getValue(this.index);
	};
	ViewSequence.prototype.getSize = function getSize() {
	    var target = this.get();
	    return target ? target.getSize() : null;
	};
	ViewSequence.prototype.render = function render() {
	    if (this._.trackSize && this._.sizeDirty)
	        this._.calculateSize();
	    var target = this.get();
	    return target ? target.render.apply(target, arguments) : null;
	};
	module.exports = ViewSequence;

/***/ },
/* 30 */
/*!*********************************************!*\
  !*** ../~/famous-flex/src/LayoutUtility.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/*global console*/
	/*eslint no-console:0*/
	
	/**
	 * Utility class for famous-flex.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 12);
	
	    /**
	     * @class
	     * @alias module:LayoutUtility
	     */
	    function LayoutUtility() {
	    }
	    LayoutUtility.registeredHelpers = {};
	
	    var Capabilities = {
	        SEQUENCE: 1,
	        DIRECTION_X: 2,
	        DIRECTION_Y: 4,
	        SCROLLING: 8
	    };
	    LayoutUtility.Capabilities = Capabilities;
	
	    /**
	     *  Normalizes the margins argument.
	     *
	     *  @param {Array.Number} margins
	     */
	    LayoutUtility.normalizeMargins = function(margins) {
	        if (!margins) {
	            return [0, 0, 0, 0];
	        }
	        else if (!Array.isArray(margins)) {
	            return [margins, margins, margins, margins];
	        }
	        else if (margins.length === 0) {
	            return [0, 0, 0, 0];
	        }
	        else if (margins.length === 1) {
	            return [margins[0], margins[0], margins[0], margins[0]];
	        }
	        else if (margins.length === 2) {
	            return [margins[0], margins[1], margins[0], margins[1]];
	        }
	        else {
	            return margins;
	        }
	    };
	
	    /**
	     * Makes a (shallow) copy of a spec.
	     *
	     * @param {Spec} spec Spec to clone
	     * @return {Spec} cloned spec
	     */
	    LayoutUtility.cloneSpec = function(spec) {
	        var clone = {};
	        if (spec.opacity !== undefined) {
	            clone.opacity = spec.opacity;
	        }
	        if (spec.size !== undefined) {
	            clone.size = spec.size.slice(0);
	        }
	        if (spec.transform !== undefined) {
	            clone.transform = spec.transform.slice(0);
	        }
	        if (spec.origin !== undefined) {
	            clone.origin = spec.origin.slice(0);
	        }
	        if (spec.align !== undefined) {
	            clone.align = spec.align.slice(0);
	        }
	        return clone;
	    };
	
	    /**
	     * Compares two arrays for equality.
	     */
	    function _isEqualArray(a, b) {
	        if (a === b) {
	            return true;
	        }
	        if ((a === undefined) || (b === undefined)) {
	            return false;
	        }
	        var i = a.length;
	        if (i !== b.length){
	            return false;
	        }
	        while (i--) {
	            if (a[i] !== b[i]) {
	                return false;
	            }
	        }
	        return true;
	    }
	
	    /**
	     * Compares two specs for equality.
	     *
	     * @param {Spec} spec1 Spec to compare
	     * @param {Spec} spec2 Spec to compare
	     * @return {Boolean} true/false
	     */
	    LayoutUtility.isEqualSpec = function(spec1, spec2) {
	        if (spec1.opacity !== spec2.opacity) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.size, spec2.size)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.transform, spec2.transform)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.origin, spec2.origin)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.align, spec2.align)) {
	            return false;
	        }
	        return true;
	    };
	
	    /**
	     * Helper function that returns a string containing the differences
	     * between two specs.
	     *
	     * @param {Spec} spec1 Spec to compare
	     * @param {Spec} spec2 Spec to compare
	     * @return {String} text
	     */
	    LayoutUtility.getSpecDiffText = function(spec1, spec2) {
	        var result = 'spec diff:';
	        if (spec1.opacity !== spec2.opacity) {
	            result += '\nopacity: ' + spec1.opacity + ' != ' + spec2.opacity;
	        }
	        if (!_isEqualArray(spec1.size, spec2.size)) {
	            result += '\nsize: ' + JSON.stringify(spec1.size) + ' != ' + JSON.stringify(spec2.size);
	        }
	        if (!_isEqualArray(spec1.transform, spec2.transform)) {
	            result += '\ntransform: ' + JSON.stringify(spec1.transform) + ' != ' + JSON.stringify(spec2.transform);
	        }
	        if (!_isEqualArray(spec1.origin, spec2.origin)) {
	            result += '\norigin: ' + JSON.stringify(spec1.origin) + ' != ' + JSON.stringify(spec2.origin);
	        }
	        if (!_isEqualArray(spec1.align, spec2.align)) {
	            result += '\nalign: ' + JSON.stringify(spec1.align) + ' != ' + JSON.stringify(spec2.align);
	        }
	        return result;
	    };
	
	    /**
	     * Helper function to call whenever a critical error has occurred.
	     *
	     * @param {String} message error-message
	     */
	    LayoutUtility.error = function(message) {
	        console.log('ERROR: ' + message);
	        throw message;
	    };
	
	    /**
	     * Helper function to call whenever a warning error has occurred.
	     *
	     * @param {String} message warning-message
	     */
	    LayoutUtility.warning = function(message) {
	        console.log('WARNING: ' + message);
	    };
	
	    /**
	     * Helper function to log 1 or more arguments. All the arguments
	     * are concatenated to produce a single string which is logged.
	     *
	     * @param {String|Array|Object} args arguments to stringify and concatenate
	     */
	    LayoutUtility.log = function(args) {
	        var message = '';
	        for (var i = 0; i < arguments.length; i++) {
	            var arg = arguments[i];
	            if ((arg instanceof Object) || (arg instanceof Array)) {
	                message += JSON.stringify(arg);
	            }
	            else {
	                message += arg;
	            }
	        }
	        console.log(message);
	    };
	
	    /**
	     * Combines two sets of options into a single set.
	     *
	     * @param {Object} options1 base set of options
	     * @param {Object} options2 set of options to merge into `options1`
	     * @param {Bool} [forceClone] ensures that a clone is returned rather that one of the original options objects
	     * @return {Object} Combined options
	     */
	    LayoutUtility.combineOptions = function(options1, options2, forceClone) {
	        if (options1 && !options2 && !forceClone) {
	            return options1;
	        }
	        else if (!options1 && options2 && !forceClone) {
	            return options2;
	        }
	        var options = Utility.clone(options1 || {});
	        if (options2) {
	            for (var key in options2) {
	                options[key] = options2[key];
	            }
	        }
	        return options;
	    };
	
	    /**
	     * Registers a layout-helper so it can be used as a layout-literal for
	     * a layout-controller. The LayoutHelper instance must support the `parse`
	     * function, which is fed the layout-literal content.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * Layout.registerHelper('dock', LayoutDockHelper);
	     *
	     * var layoutController = new LayoutController({
	     *   layout: { dock: [,
	     *     ['top', 'header', 50],
	     *     ['bottom', 'footer', 50],
	     *     ['fill', 'content'],
	     *   ]},
	     *   dataSource: {
	     *     header: new Surface({content: 'Header'}),
	     *     footer: new Surface({content: 'Footer'}),
	     *     content: new Surface({content: 'Content'}),
	     *   }
	     * })
	     * ```
	     *
	     * @param {String} name name of the helper (e.g. 'dock')
	     * @param {Function} Helper Helper to register (e.g. LayoutDockHelper)
	     */
	    LayoutUtility.registerHelper = function(name, Helper) {
	        if (!Helper.prototype.parse) {
	            LayoutUtility.error('The layout-helper for name "' + name + '" is required to support the "parse" method');
	        }
	        if (this.registeredHelpers[name] !== undefined) {
	            LayoutUtility.warning('A layout-helper with the name "' + name + '" is already registered and will be overwritten');
	        }
	        this.registeredHelpers[name] = Helper;
	    };
	
	    /**
	     * Unregisters a layout-helper.
	     *
	     * @param {String} name name of the layout-helper
	     */
	    LayoutUtility.unregisterHelper = function(name) {
	        delete this.registeredHelpers[name];
	    };
	
	    /**
	     * Gets a registered layout-helper by its name.
	     *
	     * @param {String} name name of the layout-helper
	     * @return {Function} layout-helper or undefined
	     */
	    LayoutUtility.getRegisteredHelper = function(name) {
	        return this.registeredHelpers[name];
	    };
	
	    // Layout function
	    module.exports = LayoutUtility;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 31 */
/*!*************************************************!*\
  !*** ../~/famous-flex/src/LayoutNodeManager.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * LayoutNodeManager is a private class used internally by LayoutController, ScrollController
	 * and ScrollView. It manages the layout-nodes that are rendered and exposes the layout-context
	 * which is passed along to the layout-function.
	 *
	 * LayoutNodeManager keeps track of every rendered node through an ordered double-linked
	 * list. The first time the layout-function is called, the linked list is created.
	 * After that, the linked list is updated to reflect the output of the layout-function.
	 * When the layout is unchanged, then the linked-list exactly matches the order of the
	 * accessed nodes in the layout-function, and no layout-nodes need to be created or
	 * re-ordered.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutContext = __webpack_require__(/*! ./LayoutContext */ 32);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 30);
	
	    var MAX_POOL_SIZE = 100;
	
	    /**
	     * @class
	     * @param {LayoutNode} LayoutNode Layout-nodes to create
	     * @param {Function} initLayoutNodeFn function to use when initializing new nodes
	     * @alias module:LayoutNodeManager
	     */
	    function LayoutNodeManager(LayoutNode, initLayoutNodeFn) {
	        this.LayoutNode = LayoutNode;
	        this._initLayoutNodeFn = initLayoutNodeFn;
	        this._layoutCount = 0;
	        this._context = new LayoutContext({
	            next: _contextNext.bind(this),
	            prev: _contextPrev.bind(this),
	            get: _contextGet.bind(this),
	            set: _contextSet.bind(this),
	            resolveSize: _contextResolveSize.bind(this),
	            size: [0, 0]
	            //,cycle: 0
	        });
	        this._contextState = {
	            // enumation state for the context
	            //nextSequence: undefined,
	            //prevSequence: undefined,
	            //next: undefined
	            //prev: undefined
	            //start: undefined
	        };
	        this._pool = {
	            layoutNodes: {
	                size: 0
	                //first: undefined
	            },
	            resolveSize: [0, 0]
	        };
	        //this._first = undefined; // first item in the linked list
	        //this._nodesById = undefined;
	        //this._trueSizeRequested = false;
	    }
	
	    /**
	     * Prepares the manager for a new layout iteration, after which it returns the
	     * context which can be used by the layout-function.
	     *
	     * @param {ViewSequence} viewSequence first node to layout
	     * @param {Object} [nodesById] dictionary to use when looking up nodes by id
	     * @return {LayoutContext} context which can be passed to the layout-function
	     */
	    LayoutNodeManager.prototype.prepareForLayout = function(viewSequence, nodesById, contextData) {
	
	        // Reset all nodes
	        var node = this._first;
	        while (node) {
	            node.reset();
	            node = node._next;
	        }
	
	        // Prepare data
	        var context = this._context;
	        this._layoutCount++;
	        this._nodesById = nodesById;
	        this._trueSizeRequested = false;
	        this._reevalTrueSize =
	            contextData.reevalTrueSize ||
	            !context.size ||
	            (context.size[0] !== contextData.size[0]) ||
	            (context.size[1] !== contextData.size[1]);
	
	        // Prepare context for enumation
	        var contextState = this._contextState;
	        contextState.startSequence = viewSequence;
	        contextState.nextSequence = viewSequence;
	        contextState.prevSequence = viewSequence;
	        contextState.start = undefined;
	        contextState.nextGetIndex = 0;
	        contextState.prevGetIndex = 0;
	        contextState.nextSetIndex = 0;
	        contextState.prevSetIndex = 0;
	        contextState.addCount = 0;
	        contextState.removeCount = 0;
	        contextState.lastRenderNode = undefined;
	
	        // Prepare content
	        context.size[0] = contextData.size[0];
	        context.size[1] = contextData.size[1];
	        context.direction = contextData.direction;
	        context.reverse = contextData.reverse;
	        context.alignment = contextData.reverse ? 1 : 0;
	        context.scrollOffset = contextData.scrollOffset || 0;
	        context.scrollStart = contextData.scrollStart || 0;
	        context.scrollEnd = contextData.scrollEnd || context.size[context.direction];
	        //context.cycle++;
	        return context;
	    };
	
	    /**
	     * When the layout-function no longer lays-out the node, then it is not longer
	     * being invalidated. In this case the destination is set to the removeSpec
	     * after which the node is animated towards the remove-spec.
	     *
	     * @param {Spec} [removeSpec] spec towards which the no longer layed-out nodes are animated
	     */
	    LayoutNodeManager.prototype.removeNonInvalidatedNodes = function(removeSpec) {
	        var node = this._first;
	        while (node) {
	
	            // If a node existed, but it is no longer being layed out,
	            // then set it to the '_removing' state.
	            if (!node._invalidated && !node._removing) {
	                node.remove(removeSpec);
	            }
	
	            // Move to next node
	            node = node._next;
	        }
	    };
	
	    /**
	     * Cleans up any unaccessed virtual nodes that have been created by a VirtualViewSequence.
	     */
	    LayoutNodeManager.prototype.removeVirtualViewSequenceNodes = function() {
	        if (this._contextState.startSequence && this._contextState.startSequence.cleanup) {
	            this._contextState.startSequence.cleanup();
	        }
	    };
	
	    /**
	     * Builds the render-spec and destroy any layout-nodes that no longer
	     * return a render-spec.
	     *
	     * @return {Array.Spec} array of Specs
	     */
	    LayoutNodeManager.prototype.buildSpecAndDestroyUnrenderedNodes = function(translate) {
	        var specs = [];
	        var result = {
	            specs: specs,
	            modified: false
	        };
	        var node = this._first;
	        while (node) {
	            var modified = node._specModified;
	            var spec = node.getSpec();
	            if (spec.removed) {
	
	                // Destroy node
	                var destroyNode = node;
	                node = node._next;
	                _destroyNode.call(this, destroyNode);
	
	                // Mark as modified
	                result.modified = true;
	            }
	            else {
	
	                // Update stats
	                if (modified) {
	                    if (spec.transform && translate) {
	                        spec.transform[12] += translate[0];
	                        spec.transform[13] += translate[1];
	                        spec.transform[14] += translate[2];
	                        spec.transform[12] = Math.round(spec.transform[12] * 100000) / 100000;
	                        spec.transform[13] = Math.round(spec.transform[13] * 100000) / 100000;
	                        if (spec.endState) {
	                            spec.endState.transform[12] += translate[0];
	                            spec.endState.transform[13] += translate[1];
	                            spec.endState.transform[14] += translate[2];
	                            spec.endState.transform[12] = Math.round(spec.endState.transform[12] * 100000) / 100000;
	                            spec.endState.transform[13] = Math.round(spec.endState.transform[13] * 100000) / 100000;
	                        }
	                    }
	                    result.modified = true;
	                }
	
	                // Add node to result output
	                specs.push(spec);
	                node = node._next;
	            }
	        }
	        this._contextState.addCount = 0;
	        this._contextState.removeCount = 0;
	        return result;
	    };
	
	    /**
	     * Get the layout-node by its renderable.
	     *
	     * @param {Object} renderable renderable
	     * @return {LayoutNode} layout-node or undefined
	     */
	    LayoutNodeManager.prototype.getNodeByRenderNode = function(renderable) {
	        var node = this._first;
	        while (node) {
	            if (node.renderNode === renderable) {
	                return node;
	            }
	            node = node._next;
	        }
	        return undefined;
	    };
	
	    /**
	     * Inserts a layout-node into the linked-list.
	     *
	     * @param {LayoutNode} node layout-node to insert
	     */
	    LayoutNodeManager.prototype.insertNode = function(node) {
	        node._next = this._first;
	        if (this._first) {
	            this._first._prev = node;
	        }
	        this._first = node;
	    };
	
	    /**
	     * Sets the options for all nodes.
	     *
	     * @param {Object} options node options
	     */
	    LayoutNodeManager.prototype.setNodeOptions = function(options) {
	        this._nodeOptions = options;
	        var node = this._first;
	        while (node) {
	            node.setOptions(options);
	            node = node._next;
	        }
	        node = this._pool.layoutNodes.first;
	        while (node) {
	            node.setOptions(options);
	            node = node._next;
	        }
	    };
	
	    /**
	     * Pre-allocate layout-nodes ahead of using them.
	     *
	     * @param {Number} count number of nodes to pre-allocate with the given spec
	     * @param {Spec} [spec] render-spec (defined the node properties which to pre-allocate)
	     */
	    LayoutNodeManager.prototype.preallocateNodes = function(count, spec) {
	        var nodes = [];
	        for (var i = 0; i < count ; i++) {
	            nodes.push(this.createNode(undefined, spec));
	        }
	        for (i = 0; i < count ; i++) {
	            _destroyNode.call(this, nodes[i]);
	        }
	    };
	
	    /**
	     * Creates a layout-node
	     *
	     * @param {Object} renderNode render-node for whom to create a layout-node for
	     * @return {LayoutNode} layout-node
	     */
	    LayoutNodeManager.prototype.createNode = function(renderNode, spec) {
	        var node;
	        if (this._pool.layoutNodes.first) {
	            node = this._pool.layoutNodes.first;
	            this._pool.layoutNodes.first = node._next;
	            this._pool.layoutNodes.size--;
	            node.constructor.apply(node, arguments);
	        }
	        else {
	            node = new this.LayoutNode(renderNode, spec);
	            if (this._nodeOptions) {
	                node.setOptions(this._nodeOptions);
	            }
	        }
	        node._prev = undefined;
	        node._next = undefined;
	        node._viewSequence = undefined;
	        node._layoutCount = 0;
	        if (this._initLayoutNodeFn) {
	            this._initLayoutNodeFn.call(this, node, spec);
	        }
	        return node;
	    };
	
	    /**
	     * Removes all nodes.
	     */
	    LayoutNodeManager.prototype.removeAll = function() {
	        var node = this._first;
	        while (node) {
	          var next = node._next;
	          _destroyNode.call(this, node);
	          node = next;
	        }
	        this._first = undefined;
	    };
	
	    /**
	     * Destroys a layout-node
	     */
	    function _destroyNode(node) {
	
	        // Remove node from linked-list
	        if (node._next) {
	            node._next._prev = node._prev;
	        }
	        if (node._prev) {
	            node._prev._next = node._next;
	        }
	        else {
	            this._first = node._next;
	        }
	
	        // Destroy the node
	        node.destroy();
	
	        // Add node to pool
	        if (this._pool.layoutNodes.size < MAX_POOL_SIZE) {
	            this._pool.layoutNodes.size++;
	            node._prev = undefined;
	            node._next = this._pool.layoutNodes.first;
	            this._pool.layoutNodes.first = node;
	        }
	    }
	
	    /**
	     * Gets start layout-node for enumeration.
	     *
	     * @param {Bool} [next] undefined = all, true = all next, false = all previous
	     * @return {LayoutNode} layout-node or undefined
	     */
	    LayoutNodeManager.prototype.getStartEnumNode = function(next) {
	        if (next === undefined) {
	            return this._first;
	        }
	        else if (next === true) {
	            return (this._contextState.start && this._contextState.startPrev) ? this._contextState.start._next : this._contextState.start;
	        }
	        else if (next === false) {
	            return (this._contextState.start && !this._contextState.startPrev) ? this._contextState.start._prev : this._contextState.start;
	        }
	    };
	
	    /**
	     * Checks the integrity of the linked-list.
	     */
	    /*function _checkIntegrity() {
	        var node = this._first;
	        var count = 0;
	        var prevNode;
	        while (node) {
	            if (!node._prev && (node !== this._first)) {
	                throw 'No prev but not first';
	            }
	            if (node._prev !== prevNode) {
	                throw 'Bork';
	            }
	            prevNode = node;
	            node = node._next;
	            count++;
	        }
	    }
	
	    function _checkContextStateIntegrity() {
	        var node = this._contextState.start;
	        while (node) {
	            if (node === this._contextState.next) {
	                break;
	            }
	            if (!node._invalidated) {
	                throw 'WTF';
	            }
	            node = node._next;
	        }
	        node = this._contextState.start;
	        while (node) {
	            if (node === this._contextState.prev) {
	                break;
	            }
	            if (!node._invalidated) {
	                throw 'WTF';
	            }
	            node = node._prev;
	        }
	    }*/
	
	    /**
	     * Creates or gets a layout node.
	     */
	    function _contextGetCreateAndOrderNodes(renderNode, prev) {
	
	        // The first time this function is called, the current
	        // prev/next position is obtained.
	        var node;
	        var state = this._contextState;
	        if (!state.start) {
	            node = this._first;
	            while (node) {
	                if (node.renderNode === renderNode) {
	                    break;
	                }
	                node = node._next;
	            }
	            if (!node) {
	                node = this.createNode(renderNode);
	                node._next = this._first;
	                if (this._first) {
	                    this._first._prev = node;
	                }
	                this._first = node;
	            }
	            state.start = node;
	            state.startPrev = prev;
	            state.prev = node;
	            state.next = node;
	            return node;
	        }
	
	        // Check whether node already exist at the correct position
	        // in the linked-list. If so, return that node immediately
	        // and advance the prev/next pointer for the next/prev
	        // lookup operation.
	        if (prev) {
	            if (state.prev._prev && (state.prev._prev.renderNode === renderNode)) {
	                state.prev = state.prev._prev;
	                return state.prev;
	            }
	        }
	        else {
	            if (state.next._next && (state.next._next.renderNode === renderNode)) {
	                state.next = state.next._next;
	                return state.next;
	            }
	        }
	
	        // Lookup the node anywhere in the list..
	        node = this._first;
	        while (node) {
	            if (node.renderNode === renderNode) {
	                break;
	            }
	            node = node._next;
	        }
	
	        // Create new node if neccessary
	        if (!node) {
	            node = this.createNode(renderNode);
	        }
	
	        // Node existed, remove from linked-list
	        else {
	            if (node._next) {
	                node._next._prev = node._prev;
	            }
	            if (node._prev) {
	                node._prev._next = node._next;
	            }
	            else {
	                this._first = node._next;
	            }
	            node._next = undefined;
	            node._prev = undefined;
	        }
	
	        // Insert node into the linked list
	        if (prev) {
	            if (state.prev._prev) {
	                node._prev = state.prev._prev;
	                state.prev._prev._next = node;
	            }
	            else {
	                this._first = node;
	            }
	            state.prev._prev = node;
	            node._next = state.prev;
	            state.prev = node;
	        }
	        else {
	            if (state.next._next) {
	                node._next = state.next._next;
	                state.next._next._prev = node;
	            }
	            state.next._next = node;
	            node._prev = state.next;
	            state.next = node;
	        }
	
	        return node;
	    }
	
	    /**
	     * Get the next render-node
	     */
	    function _contextNext() {
	
	        // Get the next node from the sequence
	        if (!this._contextState.nextSequence) {
	            return undefined;
	        }
	        if (this._context.reverse) {
	            this._contextState.nextSequence = this._contextState.nextSequence.getNext();
	            if (!this._contextState.nextSequence) {
	                return undefined;
	            }
	        }
	        var renderNode = this._contextState.nextSequence.get();
	        if (!renderNode) {
	            this._contextState.nextSequence = undefined;
	            return undefined;
	        }
	        var nextSequence = this._contextState.nextSequence;
	        if (!this._context.reverse) {
	            this._contextState.nextSequence = this._contextState.nextSequence.getNext();
	        }
	        if (this._contextState.lastRenderNode === renderNode) {
	          throw 'ViewSequence is corrupted, should never contain the same renderNode twice, index: ' + nextSequence.getIndex();
	        }
	        this._contextState.lastRenderNode = renderNode;
	        return {
	            renderNode: renderNode,
	            viewSequence: nextSequence,
	            next: true,
	            index: ++this._contextState.nextGetIndex
	        };
	    }
	
	    /**
	     * Get the previous render-node
	     */
	    function _contextPrev() {
	
	        // Get the previous node from the sequence
	        if (!this._contextState.prevSequence) {
	            return undefined;
	        }
	        if (!this._context.reverse) {
	            this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
	            if (!this._contextState.prevSequence) {
	                return undefined;
	            }
	        }
	        var renderNode = this._contextState.prevSequence.get();
	        if (!renderNode) {
	            this._contextState.prevSequence = undefined;
	            return undefined;
	        }
	        var prevSequence = this._contextState.prevSequence;
	        if (this._context.reverse) {
	            this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
	        }
	        if (this._contextState.lastRenderNode === renderNode) {
	          throw 'ViewSequence is corrupted, should never contain the same renderNode twice, index: ' + prevSequence.getIndex();
	        }
	        this._contextState.lastRenderNode = renderNode;
	        return {
	            renderNode: renderNode,
	            viewSequence: prevSequence,
	            prev: true,
	            index: --this._contextState.prevGetIndex
	        };
	    }
	
	    /**
	     * Resolve id into a context-node.
	     */
	     function _contextGet(contextNodeOrId) {
	        if (this._nodesById && ((contextNodeOrId instanceof String) || (typeof contextNodeOrId === 'string'))) {
	            var renderNode = this._nodesById[contextNodeOrId];
	            if (!renderNode) {
	                return undefined;
	            }
	
	            // Return array
	            if (renderNode instanceof Array) {
	                var result = [];
	                for (var i = 0, j = renderNode.length; i < j; i++) {
	                    result.push({
	                        renderNode: renderNode[i],
	                        arrayElement: true
	                    });
	                }
	                return result;
	            }
	
	            // Create context node
	            return {
	                renderNode: renderNode,
	                byId: true
	            };
	        }
	        else {
	            return contextNodeOrId;
	        }
	    }
	
	    /**
	     * Set the node content
	     */
	    function _contextSet(contextNodeOrId, set) {
	        var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
	        if (contextNode) {
	            var node = contextNode.node;
	            if (!node) {
	                if (contextNode.next) {
	                     if (contextNode.index < this._contextState.nextSetIndex) {
	                        LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
	                     }
	                     this._contextState.nextSetIndex = contextNode.index;
	                }
	                else if (contextNode.prev) {
	                     if (contextNode.index > this._contextState.prevSetIndex) {
	                        LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
	                     }
	                     this._contextState.prevSetIndex = contextNode.index;
	                }
	                node = _contextGetCreateAndOrderNodes.call(this, contextNode.renderNode, contextNode.prev);
	                node._viewSequence = contextNode.viewSequence;
	                node._layoutCount++;
	                if (node._layoutCount === 1) {
	                    this._contextState.addCount++;
	                }
	                contextNode.node = node;
	            }
	            node.usesTrueSize = contextNode.usesTrueSize;
	            node.trueSizeRequested = contextNode.trueSizeRequested;
	            node.set(set, this._context.size);
	            contextNode.set = set;
	        }
	        return set;
	    }
	
	    /**
	     * Resolve the size of the layout-node from the renderable itsself
	     */
	    function _contextResolveSize(contextNodeOrId, parentSize) {
	        var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
	        var resolveSize = this._pool.resolveSize;
	        if (!contextNode) {
	            resolveSize[0] = 0;
	            resolveSize[1] = 0;
	            return resolveSize;
	        }
	
	        // Get in use size
	        var renderNode = contextNode.renderNode;
	        var size = renderNode.getSize();
	        if (!size) {
	            return parentSize;
	        }
	
	        // Check if true-size is used and it must be reavaluated.
	        // This particular piece of code specifically handles true-size Surfaces in famo.us.
	        // It contains portions that ensure that the true-size of a Surface is re-evaluated
	        // and also workaround code that backs up the size of a Surface, so that when the surface
	        // is re-added to the DOM (e.g. when scrolling) it doesn't temporarily have a size of 0.
	        var configSize = renderNode.size && (renderNode._trueSizeCheck !== undefined) ? renderNode.size : undefined;
	        if (configSize && ((configSize[0] === true) || (configSize[1] === true))) {
	            contextNode.usesTrueSize = true;
	            var backupSize = renderNode._backupSize;
	            if (renderNode._contentDirty || renderNode._trueSizeCheck) {
	              this._trueSizeRequested = true;
	              contextNode.trueSizeRequested = true;
	            }
	            if (renderNode._trueSizeCheck) {
	
	                // Fix for true-size renderables. When true-size is used, the size
	                // is incorrect for one render-cycle due to the fact that Surface.commit
	                // updates the content after asking the DOM for the offsetHeight/offsetWidth.
	                // The code below backs the size up, and re-uses that when this scenario
	                // occurs.
	                if (backupSize && (configSize !== size)) {
	                    var newWidth = (configSize[0] === true) ? Math.max(backupSize[0], size[0]) : size[0];
	                    var newHeight = (configSize[1] === true) ? Math.max(backupSize[1], size[1]) : size[1];
	                    backupSize[0] = newWidth;
	                    backupSize[1] = newHeight;
	                    size = backupSize;
	                    renderNode._backupSize = undefined;
	                    backupSize = undefined;
	                }
	            }
	            if (this._reevalTrueSize || (backupSize && ((backupSize[0] !== size[0]) || (backupSize[1] !== size[1])))) {
	                renderNode._trueSizeCheck = true; // force request of true-size from DOM
	                renderNode._sizeDirty = true;
	                this._trueSizeRequested = true;
	            }
	
	            // Backup the size of the node
	            if (!backupSize) {
	                renderNode._backupSize = [0, 0];
	                backupSize = renderNode._backupSize;
	            }
	            backupSize[0] = size[0];
	            backupSize[1] = size[1];
	        }
	
	        // Ensure re-layout when a child layout-controller is using true-size and it
	        // has ben changed.
	        configSize = renderNode._nodes ? renderNode.options.size : undefined;
	        if (configSize && ((configSize[0] === true) || (configSize[1] === true))) {
	            if (this._reevalTrueSize || renderNode._nodes._trueSizeRequested) {
	                contextNode.usesTrueSize = true;
	                contextNode.trueSizeRequested = true;
	                this._trueSizeRequested = true;
	            }
	        }
	
	        // Resolve 'undefined' to parent-size and true to 0
	        if ((size[0] === undefined) || (size[0] === true) || (size[1] === undefined) || (size[1] === true)) {
	            resolveSize[0] = size[0];
	            resolveSize[1] = size[1];
	            size = resolveSize;
	            if (size[0] === undefined) {
	                size[0] = parentSize[0];
	            }
	            else if (size[0] === true) {
	                size[0] = 0;
	                this._trueSizeRequested = true;
	                contextNode.trueSizeRequested = true;
	            }
	            if (size[1] === undefined) {
	                size[1] = parentSize[1];
	            }
	            else if (size[1] === true) {
	                size[1] = 0;
	                this._trueSizeRequested = true;
	                contextNode.trueSizeRequested = true;
	            }
	        }
	        return size;
	    }
	
	    module.exports = LayoutNodeManager;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 32 */
/*!*********************************************!*\
  !*** ../~/famous-flex/src/LayoutContext.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/**
	 * LayoutContext is the interface for a layout-function to access
	 * renderables in the data-source and set their size, position, tranformation, etc...
	 *
	 * The `next`, `prev` and `get` functions return an opaque object which represents
	 * the renderable that is to be layed out. To access the actual renderable, use the
	 * `.renderNode` property of this opaque object.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     * @class
	     * @alias module:LayoutContext
	     */
	    function LayoutContext(methods) {
	        for (var n in methods) {
	            this[n] = methods[n];
	        }
	    }
	
	    /**
	     * {Property} Size in which to layout the renderables.
	     */
	    LayoutContext.prototype.size = undefined;
	
	    /**
	     * {Property} Direction in which to layout the renderables (0 = X, 1 = Y).
	     */
	    LayoutContext.prototype.direction = undefined;
	
	    /**
	     * {Property} {Number} Scrolling offset at which to start laying out next/prev renderables.
	     */
	    LayoutContext.prototype.scrollOffset = undefined;
	
	    /**
	     * {Property} {Number} Top/left boundary to which to layout renderables (default: 0).
	     */
	    LayoutContext.prototype.scrollStart = undefined;
	
	    /**
	     * {Property} {Number} Bottom/right boundary to which to continue laying out renderables.
	     */
	    LayoutContext.prototype.scrollEnd = undefined;
	
	    /**
	     * Get the context-node for the next renderable in the data-source. When
	     * the end of the data-source is reached, `undefined` is returned.
	     * Use this function to enumerate the contents of a data-source that is
	     * either an Array or a ViewSequence.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   var height = 0;
	     *   var node = context.next(); // get first next node
	     *   while (node) {
	     *     context.set(node, {
	     *       size: [context.size[0], 100],
	     *       translate: [0, height, 0]
	     *     });
	     *     height += 100;
	     *     node = context.next(); // get next node
	     *   }
	     * }
	     * ```
	     *
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.next = function() {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Get the context-node for the previous renderable in the data-source. When
	     * the start of the data-source is reached, `undefined` is returned.
	     * Use this function to enumerate the contents of a data-source that is
	     * either an Array or a ViewSequence.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   var height = 0;
	     *   var node = context.prev(); // get first previous
	     *   while (node) {
	     *     height -= 100;
	     *     context.set(node, {
	     *       size: [context.size[0], 100],
	     *       translate: [0, height, 0]
	     *     });
	     *     node = context.prev(); // get prev node
	     *   }
	     * }
	     * ```
	     *
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.prev = function() {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Get the context-node for a renderable with a specific id. This function
	     * should be used to access data-sources which are key-value collections.
	     * When a data-source is an Array or a ViewSequence, use `next()`.
	     * In many cases it is not neccesary to use `get()`, instead you can pass
	     * the id of the renderable straight to the `set` function.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var size = context.size;
	     *     var left = context.get('left');
	     *     context.set(left, { size: [100, size[1]] });
	     *
	     *     var right = context.get('right');
	     *     context.set(right, {
	     *       size: [100, size[1]],
	     *       translate: [size[1] - 100, 0, 0]
	     *     });
	     *
	     *     var middle = context.get('middle');
	     *     context.set(middle, {
	     *       size: [size[0] - 200, size[1]],
	     *       translate: [100, 0, 0]
	     *     });
	     *   },
	     *   dataSource: {
	     *     left: new Surface({content: 'left'}),
	     *     right: new Surface({content: 'right'}),
	     *     middle: new Surface({content: 'middle'})
	     *   }
	     * });
	     * ```
	     *
	     * **Arrays:**
	     *
	     * A value at a specific id in the datasource can also be an array. To access the
	     * context-nodes in the array use `get()` to get the array and the elements in the
	     * array:
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var size = context.size;
	     *     var left = 0;
	     *
	     *     // Position title
	     *     context.set('title', { size: [100, size[1]] });
	     *     left += 100;
	     *
	     *     // Position left-items (array)
	     *     var leftItems = context.get('leftItems');
	     *     for (var i = 0; i < leftItems.length; i++) {
	     *       var leftItem = context.get(leftItems[i]);
	     *       context.set(leftItem, {
	     *         size: [100, size[1]],
	     *         translate: [left, 0, 0]
	     *       });
	     *       left += 100;
	     *     }
	     *   },
	     *   dataSource: {
	     *     title: new Surface({content: 'title'}),
	     *     leftItems: [
	     *       new Surface({content: 'item1'}),
	     *       new Surface({content: 'item2'})
	     *     ]
	     *   }
	     * });
	     * ```
	     *
	     * @param {Object|String} node context-node or node-id
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.get = function(node) {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Set the size, origin, align, translation, scale, rotate, skew & opacity for a context-node.
	     *
	     * **Overview of all supported properties:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   context.set('mynode', {
	     *     size: [100, 20],
	     *     origin: [0.5, 0.5],
	     *     align: [0.5, 0.5],
	     *     translate: [50, 10, 0],
	     *     scale: [1, 1, 1],
	     *     skew: [0, 0, 0],
	     *     rotate: [Math.PI, 0, 0],
	     *     opacity: 1
	     *   })
	     * }
	     * ```
	     *
	     * @param {Object|String} node context-node or node-id
	     * @param {Object} set properties: size, origin, align, translate, scale, rotate, skew & opacity
	     */
	    LayoutContext.prototype.set = function(node, set) {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Resolve the size of a context-node by accessing the `getSize` function
	     * of the renderable.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var centerSize = context.resolveSize('center');
	     *     context.set('center', {origin: [0.5, 0.5]});
	     *     context.set('centerRight', {
	     *       origin: [0.5, 0.5],
	     *       translate: [centerSize[0] / 2, 0, 0]
	     *     });
	     *   },
	     *   dataSource: {
	     *     center: new Surface({content: 'center'}),
	     *     centerRight: new Surface({content: 'centerRight'}),
	     *   }
	     * });
	     * ```
	     *
	     * **When the size of the renderable is calculated by the DOM (`true` size)**
	     *
	     * When the layout-function performs its layout for the first time, it is
	     * possible that the renderable has not yet been rendered and its size
	     * is unknown. In this case, the LayoutController will cause a second
	     * reflow of the layout the next render-cycle, ensuring that the renderables
	     * are layed out as expected.
	     *
	     * @param {Object|String} node context-node, node-id or array-element
	     * @return {Size} size of the node
	     */
	    LayoutContext.prototype.resolveSize = function(node) {
	        // dummy implementation, override in constructor
	    };
	
	    module.exports = LayoutContext;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 33 */
/*!******************************************!*\
  !*** ../~/famous-flex/src/LayoutNode.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/**
	 * Internal LayoutNode class used by `LayoutController`.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 6);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 30);
	
	    /**
	     * @class
	     * @param {Object} renderNode Render-node which this layout-node represents
	     * @alias module:LayoutNode
	     */
	    function LayoutNode(renderNode, spec) {
	        this.renderNode = renderNode;
	        this._spec = spec ? LayoutUtility.cloneSpec(spec) : {};
	        this._spec.renderNode = renderNode; // also store in spec
	        this._specModified = true;
	        this._invalidated = false;
	        this._removing = false;
	        //this.scrollLength = undefined;
	        //this.trueSizeRequested = false;
	    }
	
	    /**
	     * Called to update the underlying render-node
	     */
	    LayoutNode.prototype.setRenderNode = function(renderNode) {
	        this.renderNode = renderNode;
	        this._spec.renderNode = renderNode;
	    };
	
	    /**
	     * Called to update the options for the node
	     */
	    LayoutNode.prototype.setOptions = function(options) {
	        // override to implement
	    };
	
	    /**
	     * Called when the node is destroyed
	     */
	    LayoutNode.prototype.destroy = function() {
	        this.renderNode = undefined;
	        this._spec.renderNode = undefined;
	        this._viewSequence = undefined;
	    };
	
	    /**
	     * Reset the end-state. This function is called on all layout-nodes prior to
	     * calling the layout-function. So that the layout-function starts with a clean slate.
	     */
	    LayoutNode.prototype.reset = function() {
	        this._invalidated = false;
	        this.trueSizeRequested = false;
	    };
	
	    /**
	     * Set the spec of the node
	     *
	     * @param {Object} spec
	     */
	    LayoutNode.prototype.setSpec = function(spec) {
	        this._specModified = true;
	        if (spec.align) {
	            if (!spec.align) {
	                this._spec.align = [0, 0];
	            }
	            this._spec.align[0] = spec.align[0];
	            this._spec.align[1] = spec.align[1];
	        }
	        else {
	            this._spec.align = undefined;
	        }
	        if (spec.origin) {
	            if (!spec.origin) {
	                this._spec.origin = [0, 0];
	            }
	            this._spec.origin[0] = spec.origin[0];
	            this._spec.origin[1] = spec.origin[1];
	        }
	        else {
	            this._spec.origin = undefined;
	        }
	        if (spec.size) {
	            if (!spec.size) {
	                this._spec.size = [0, 0];
	            }
	            this._spec.size[0] = spec.size[0];
	            this._spec.size[1] = spec.size[1];
	        }
	        else {
	            this._spec.size = undefined;
	        }
	        if (spec.transform) {
	            if (!spec.transform) {
	                this._spec.transform = spec.transform.slice(0);
	            }
	            else {
	                for (var i = 0; i < 16; i++) {
	                    this._spec.transform[i] = spec.transform[i];
	                }
	            }
	        }
	        else {
	            this._spec.transform = undefined;
	        }
	        this._spec.opacity = spec.opacity;
	    };
	
	    /**
	     * Set the content of the node
	     *
	     * @param {Object} set
	     */
	    LayoutNode.prototype.set = function(set, size) {
	        this._invalidated = true;
	        this._specModified = true;
	        this._removing = false;
	        var spec = this._spec;
	        spec.opacity = set.opacity;
	        if (set.size) {
	            if (!spec.size) {
	                spec.size = [0, 0];
	            }
	            spec.size[0] = set.size[0];
	            spec.size[1] = set.size[1];
	        }
	        else {
	            spec.size = undefined;
	        }
	        if (set.origin) {
	            if (!spec.origin) {
	                spec.origin = [0, 0];
	            }
	            spec.origin[0] = set.origin[0];
	            spec.origin[1] = set.origin[1];
	        }
	        else {
	            spec.origin = undefined;
	        }
	        if (set.align) {
	            if (!spec.align) {
	                spec.align = [0, 0];
	            }
	            spec.align[0] = set.align[0];
	            spec.align[1] = set.align[1];
	        }
	        else {
	            spec.align = undefined;
	        }
	
	        if (set.skew || set.rotate || set.scale) {
	            this._spec.transform = Transform.build({
	                translate: set.translate || [0, 0, 0],
	                skew: set.skew || [0, 0, 0],
	                scale: set.scale || [1, 1, 1],
	                rotate: set.rotate || [0, 0, 0]
	            });
	        }
	        else if (set.translate) {
	            this._spec.transform = Transform.translate(set.translate[0], set.translate[1], set.translate[2]);
	        }
	        else {
	            this._spec.transform = undefined;
	        }
	        this.scrollLength = set.scrollLength;
	    };
	
	    /**
	     * Creates the render-spec
	     */
	    LayoutNode.prototype.getSpec = function() {
	        this._specModified = false;
	        this._spec.removed = !this._invalidated;
	        return this._spec;
	    };
	
	    /**
	     * Marks the node for removal
	     */
	    LayoutNode.prototype.remove = function(removeSpec) {
	        this._removing = true;
	    };
	
	    module.exports = LayoutNode;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 34 */
/*!**********************************************!*\
  !*** ../~/famous-flex/src/FlowLayoutNode.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * Internal LayoutNode class used by `LayoutNodeManager`.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var OptionsManager = __webpack_require__(/*! famous/core/OptionsManager */ 14);
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 6);
	    var Vector = __webpack_require__(/*! famous/math/Vector */ 37);
	    var Particle = __webpack_require__(/*! famous/physics/bodies/Particle */ 38);
	    var Spring = __webpack_require__(/*! famous/physics/forces/Spring */ 35);
	    var PhysicsEngine = __webpack_require__(/*! famous/physics/PhysicsEngine */ 40);
	    var LayoutNode = __webpack_require__(/*! ./LayoutNode */ 33);
	    var Transitionable = __webpack_require__(/*! famous/transitions/Transitionable */ 10);
	
	    /**
	     * @class
	     * @extends LayoutNode
	     * @param {Object} renderNode Render-node which this layout-node represents
	     * @param {Spec} spec Initial state
	     * @param {Object} physicsEngines physics-engines to use
	     * @alias module:FlowLayoutNode
	     */
	    function FlowLayoutNode(renderNode, spec) {
	        LayoutNode.apply(this, arguments);
	
	        if (!this.options) {
	            this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	            this._optionsManager = new OptionsManager(this.options);
	        }
	
	        if (!this._pe) {
	            this._pe = new PhysicsEngine();
	            this._pe.sleep();
	        }
	
	        if (!this._properties) {
	            this._properties = {};
	        }
	        else {
	            for (var propName in this._properties) {
	                this._properties[propName].init = false;
	            }
	        }
	
	        if (!this._lockTransitionable) {
	            this._lockTransitionable = new Transitionable(1);
	        }
	        else {
	            this._lockTransitionable.halt();
	            this._lockTransitionable.reset(1);
	        }
	
	        this._specModified = true;
	        this._initial = true;
	        this._spec.endState = {};
	        if (spec) {
	            this.setSpec(spec);
	        }
	    }
	    FlowLayoutNode.prototype = Object.create(LayoutNode.prototype);
	    FlowLayoutNode.prototype.constructor = FlowLayoutNode;
	
	    FlowLayoutNode.DEFAULT_OPTIONS = {
	        spring: {
	            dampingRatio: 0.8,
	            period: 300
	        },
	        properties: {
	            opacity: true,
	            align: true,
	            origin: true,
	            size: true,
	            translate: true,
	            skew: true,
	            rotate: true,
	            scale: true
	        },
	        particleRounding: 0.001
	    };
	
	    /**
	     * Defaults
	     */
	    var DEFAULT = {
	        opacity: 1,
	        opacity2D: [1, 0],
	        size: [0, 0],
	        origin: [0, 0],
	        align: [0, 0],
	        scale: [1, 1, 1],
	        translate: [0, 0, 0],
	        rotate: [0, 0, 0],
	        skew: [0, 0, 0]
	    };
	
	    /**
	     * Verifies that the integrity of the layout-node is oke.
	     */
	    /*function _verifyIntegrity() {
	        var i;
	        for (var propName in this._properties) {
	            var prop = this._properties[propName];
	            if (prop.particle) {
	                if (isNaN(prop.particle.getEnergy())) {
	                    throw 'invalid particle energy: ' + propName;
	                }
	                var value = prop.particle.getPosition();
	                for (i = 0; i < value.length; i++) {
	                    if (isNaN(value[i])) {
	                       throw 'invalid particle value: ' + propName + '(' + i + ')';
	                    }
	                }
	                value = prop.endState.get();
	                for (i = 0; i < value.length; i++) {
	                    if (isNaN(value[i])) {
	                       throw 'invalid endState value: ' + propName + '(' + i + ')';
	                    }
	                }
	            }
	        }
	    }*/
	
	    /**
	     * Sets the configuration options
	     */
	    FlowLayoutNode.prototype.setOptions = function(options) {
	        this._optionsManager.setOptions(options);
	        var wasSleeping = this._pe.isSleeping();
	        for (var propName in this._properties) {
	            var prop = this._properties[propName];
	            if (options.spring && prop.force) {
	                prop.force.setOptions(this.options.spring);
	            }
	            if (options.properties && (options.properties[propName] !== undefined)) {
	                if (this.options.properties[propName].length) {
	                    prop.enabled = this.options.properties[propName];
	                }
	                else {
	                    prop.enabled = [
	                        this.options.properties[propName],
	                        this.options.properties[propName],
	                        this.options.properties[propName]
	                    ];
	                }
	            }
	        }
	        if (wasSleeping) {
	            this._pe.sleep();
	        }
	        return this;
	    };
	
	    /**
	     * Set the properties from a spec.
	     */
	    FlowLayoutNode.prototype.setSpec = function(spec) {
	        var set;
	        if (spec.transform) {
	            set = Transform.interpret(spec.transform);
	        }
	        if (!set) {
	            set = {};
	        }
	        set.opacity = spec.opacity;
	        set.size = spec.size;
	        set.align = spec.align;
	        set.origin = spec.origin;
	
	        var oldRemoving = this._removing;
	        var oldInvalidated = this._invalidated;
	        this.set(set);
	        this._removing = oldRemoving;
	        this._invalidated = oldInvalidated;
	    };
	
	    /**
	     * Reset the end-state. This function is called on all layout-nodes prior to
	     * calling the layout-function. So that the layout-function starts with a clean slate.
	     */
	    FlowLayoutNode.prototype.reset = function() {
	        if (this._invalidated) {
	            for (var propName in this._properties) {
	                this._properties[propName].invalidated = false;
	            }
	            this._invalidated = false;
	        }
	        this.trueSizeRequested = false;
	        this.usesTrueSize = false;
	    };
	
	    /**
	     * Markes the node for removal.
	     */
	    FlowLayoutNode.prototype.remove = function(removeSpec) {
	
	        // Transition to the remove-spec state
	        this._removing = true;
	        if (removeSpec) {
	            this.setSpec(removeSpec);
	        }
	        else {
	            this._pe.sleep();
	            this._specModified = false;
	        }
	
	        // Mark for removal
	        this._invalidated = false;
	    };
	
	    /**
	     * Temporarily releases the flowing-lock that is applied to the node.
	     * E.g., when changing position, resizing, the lock should be released so that
	     * the renderables can smoothly transition to their new positions.
	     */
	    FlowLayoutNode.prototype.releaseLock = function(enable) {
	        this._lockTransitionable.halt();
	        this._lockTransitionable.reset(0);
	        if (enable) {
	          this._lockTransitionable.set(1, {
	              duration: this.options.spring.period || 1000
	          });
	        }
	    };
	
	    /**
	     * Helper function for getting the property value.
	     */
	    function _getRoundedValue3D(prop, def, precision, lockValue) {
	        if (!prop || !prop.init) {
	            return def;
	        }
	        return [
	            prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / precision) * precision) : prop.endState.x,
	            prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / precision) * precision) : prop.endState.y,
	            prop.enabled[2] ? (Math.round((prop.curState.z + ((prop.endState.z - prop.curState.z) * lockValue)) / precision) * precision) : prop.endState.z
	        ];
	    }
	
	    /**
	     * Creates the render-spec
	     */
	    FlowLayoutNode.prototype.getSpec = function() {
	
	        // When the end state was reached, return the previous spec
	        var endStateReached = this._pe.isSleeping();
	        if (!this._specModified && endStateReached) {
	            this._spec.removed = !this._invalidated;
	            return this._spec;
	        }
	        this._initial = false;
	        this._specModified = !endStateReached;
	        this._spec.removed = false;
	
	        // Step physics engine when not sleeping
	        if (!endStateReached) {
	            this._pe.step();
	        }
	
	        // Build fresh spec
	        var spec = this._spec;
	        var precision = this.options.particleRounding;
	        var lockValue = this._lockTransitionable.get();
	
	        // opacity
	        var prop = this._properties.opacity;
	        if (prop && prop.init) {
	            spec.opacity = prop.enabled[0] ? (Math.round(Math.max(0, Math.min(1, prop.curState.x)) / precision) * precision) : prop.endState.x;
	            spec.endState.opacity = prop.endState.x;
	        }
	        else {
	            spec.opacity = undefined;
	            spec.endState.opacity = undefined;
	        }
	
	        // size
	        prop = this._properties.size;
	        if (prop && prop.init) {
	            spec.size = spec.size || [0, 0];
	            spec.size[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.size[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.size = spec.endState.size || [0, 0];
	            spec.endState.size[0] = prop.endState.x;
	            spec.endState.size[1] = prop.endState.y;
	        }
	        else {
	            spec.size = undefined;
	            spec.endState.size = undefined;
	        }
	
	        // align
	        prop = this._properties.align;
	        if (prop && prop.init) {
	            spec.align = spec.align || [0, 0];
	            spec.align[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.align[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.align = spec.endState.align || [0, 0];
	            spec.endState.align[0] = prop.endState.x;
	            spec.endState.align[1] = prop.endState.y;
	        }
	        else {
	            spec.align = undefined;
	            spec.endState.align = undefined;
	        }
	
	        // origin
	        prop = this._properties.origin;
	        if (prop && prop.init) {
	            spec.origin = spec.origin || [0, 0];
	            spec.origin[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.origin[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.origin = spec.endState.origin || [0, 0];
	            spec.endState.origin[0] = prop.endState.x;
	            spec.endState.origin[1] = prop.endState.y;
	        }
	        else {
	            spec.origin = undefined;
	            spec.endState.origin = undefined;
	        }
	
	        // translate
	        var translate = this._properties.translate;
	        var translateX;
	        var translateY;
	        var translateZ;
	        if (translate && translate.init) {
	            translateX = translate.enabled[0] ? (Math.round((translate.curState.x + ((translate.endState.x - translate.curState.x) * lockValue)) / precision) * precision) : translate.endState.x;
	            translateY = translate.enabled[1] ? (Math.round((translate.curState.y + ((translate.endState.y - translate.curState.y) * lockValue)) / precision) * precision) : translate.endState.y;
	            translateZ = translate.enabled[2] ? (Math.round((translate.curState.z + ((translate.endState.z - translate.curState.z) * lockValue)) / precision) * precision) : translate.endState.z;
	        }
	        else {
	            translateX = 0;
	            translateY = 0;
	            translateZ = 0;
	        }
	
	        // scale, skew, scale
	        var scale = this._properties.scale;
	        var skew = this._properties.skew;
	        var rotate = this._properties.rotate;
	        if (scale || skew || rotate) {
	            spec.transform = Transform.build({
	                translate: [translateX, translateY, translateZ],
	                skew: _getRoundedValue3D.call(this, skew, DEFAULT.skew, this.options.particleRounding, lockValue),
	                scale: _getRoundedValue3D.call(this, scale, DEFAULT.scale, this.options.particleRounding, lockValue),
	                rotate: _getRoundedValue3D.call(this, rotate, DEFAULT.rotate, this.options.particleRounding, lockValue)
	            });
	            spec.endState.transform = Transform.build({
	                translate: translate ? [translate.endState.x, translate.endState.y, translate.endState.z] : DEFAULT.translate,
	                scale: scale ? [scale.endState.x, scale.endState.y, scale.endState.z] : DEFAULT.scale,
	                skew: skew ? [skew.endState.x, skew.endState.y, skew.endState.z] : DEFAULT.skew,
	                rotate: rotate ? [rotate.endState.x, rotate.endState.y, rotate.endState.z] : DEFAULT.rotate
	            });
	        }
	        else if (translate) {
	            if (!spec.transform) {
	                spec.transform = Transform.translate(translateX, translateY, translateZ);
	            }
	            else {
	                spec.transform[12] = translateX;
	                spec.transform[13] = translateY;
	                spec.transform[14] = translateZ;
	            }
	            if (!spec.endState.transform) {
	                spec.endState.transform = Transform.translate(translate.endState.x, translate.endState.y, translate.endState.z);
	            }
	            else {
	                spec.endState.transform[12] = translate.endState.x;
	                spec.endState.transform[13] = translate.endState.y;
	                spec.endState.transform[14] = translate.endState.z;
	            }
	        }
	        else {
	            spec.transform = undefined;
	            spec.endState.transform = undefined;
	        }
	        return this._spec;
	    };
	
	    /**
	     * Helper function to set the property of a node (e.g. opacity, translate, etc..)
	     */
	    function _setPropertyValue(prop, propName, endState, defaultValue, immediate, isTranslate) {
	
	        // Get property
	        prop = prop || this._properties[propName];
	
	        // Update the property
	        if (prop && prop.init) {
	            prop.invalidated = true;
	            var value = defaultValue;
	            if (endState !== undefined) {
	                value = endState;
	            }
	            else if (this._removing) {
	                value = prop.particle.getPosition();
	            }
	            //if (isTranslate && (this._lockDirection !== undefined) && (this._lockTransitionable.get() === 1)) {
	            //    immediate = true; // this is a bit dirty, it should check !_lockDirection for non changes as well before setting immediate to true
	            //}
	            // set new end state (the quick way)
	            prop.endState.x = value[0];
	            prop.endState.y = (value.length > 1) ? value[1] : 0;
	            prop.endState.z = (value.length > 2) ? value[2] : 0;
	            if (immediate) {
	                // set current state (the quick way)
	                prop.curState.x = prop.endState.x;
	                prop.curState.y = prop.endState.y;
	                prop.curState.z = prop.endState.z;
	                // reset velocity (the quick way)
	                prop.velocity.x = 0;
	                prop.velocity.y = 0;
	                prop.velocity.z = 0;
	            }
	            else if ((prop.endState.x !== prop.curState.x) ||
	                     (prop.endState.y !== prop.curState.y) ||
	                     (prop.endState.z !== prop.curState.z)) {
	                this._pe.wake();
	            }
	            return;
	        }
	        else {
	
	            // Create property if neccesary
	            var wasSleeping = this._pe.isSleeping();
	            if (!prop) {
	                prop = {
	                    particle: new Particle({
	                        position: (this._initial || immediate) ? endState : defaultValue
	                    }),
	                    endState: new Vector(endState)
	                };
	                prop.curState = prop.particle.position;
	                prop.velocity = prop.particle.velocity;
	                prop.force = new Spring(this.options.spring);
	                prop.force.setOptions({
	                    anchor: prop.endState
	                });
	                this._pe.addBody(prop.particle);
	                prop.forceId = this._pe.attach(prop.force, prop.particle);
	                this._properties[propName] = prop;
	            }
	            else {
	                prop.particle.setPosition((this._initial || immediate) ? endState : defaultValue);
	                prop.endState.set(endState);
	            }
	            if (!this._initial && !immediate) {
	                this._pe.wake();
	            }
	            else if (wasSleeping) {
	                this._pe.sleep(); // nothing has changed, put back to sleep
	            }
	            if (this.options.properties[propName] && this.options.properties[propName].length) {
	                prop.enabled = this.options.properties[propName];
	            }
	            else {
	                prop.enabled = [
	                  this.options.properties[propName],
	                  this.options.properties[propName],
	                  this.options.properties[propName]
	                ];
	            }
	            prop.init = true;
	            prop.invalidated = true;
	        }
	    }
	
	    /**
	     * Get value if not equals.
	     */
	    function _getIfNE2D(a1, a2) {
	        return ((a1[0] === a2[0]) && (a1[1] === a2[1])) ? undefined : a1;
	    }
	    function _getIfNE3D(a1, a2) {
	        return ((a1[0] === a2[0]) && (a1[1] === a2[1]) && (a1[2] === a2[2])) ? undefined : a1;
	    }
	
	    /**
	     * context.set(..)
	     */
	    FlowLayoutNode.prototype.set = function(set, defaultSize) {
	        if (defaultSize) {
	            this._removing = false;
	        }
	        this._invalidated = true;
	        this.scrollLength = set.scrollLength;
	        this._specModified = true;
	
	        // opacity
	        var prop = this._properties.opacity;
	        var value = (set.opacity === DEFAULT.opacity) ? undefined : set.opacity;
	        if ((value !== undefined) || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'opacity', (value === undefined) ? undefined : [value, 0], DEFAULT.opacity2D);
	        }
	
	        // set align
	        prop = this._properties.align;
	        value = set.align ? _getIfNE2D(set.align, DEFAULT.align) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'align', value, DEFAULT.align);
	        }
	
	        // set orgin
	        prop = this._properties.origin;
	        value = set.origin ? _getIfNE2D(set.origin, DEFAULT.origin) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'origin', value, DEFAULT.origin);
	        }
	
	        // set size
	        prop = this._properties.size;
	        value = set.size || defaultSize;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'size', value, defaultSize, this.usesTrueSize);
	        }
	
	        // set translate
	        prop = this._properties.translate;
	        value = set.translate;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'translate', value, DEFAULT.translate, undefined, true);
	        }
	
	        // set scale
	        prop = this._properties.scale;
	        value = set.scale ? _getIfNE3D(set.scale, DEFAULT.scale) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'scale', value, DEFAULT.scale);
	        }
	
	        // set rotate
	        prop = this._properties.rotate;
	        value = set.rotate ? _getIfNE3D(set.rotate, DEFAULT.rotate) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'rotate', value, DEFAULT.rotate);
	        }
	
	        // set skew
	        prop = this._properties.skew;
	        value = set.skew ? _getIfNE3D(set.skew, DEFAULT.skew) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'skew', value, DEFAULT.skew);
	        }
	    };
	
	    module.exports = FlowLayoutNode;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 35 */
/*!********************************************!*\
  !*** ../~/famous/physics/forces/Spring.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Force = __webpack_require__(/*! ./Force */ 36);
	var Vector = __webpack_require__(/*! ../../math/Vector */ 37);
	function Spring(options) {
	    Force.call(this);
	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this.disp = new Vector(0, 0, 0);
	    _init.call(this);
	}
	Spring.prototype = Object.create(Force.prototype);
	Spring.prototype.constructor = Spring;
	var pi = Math.PI;
	var MIN_PERIOD = 150;
	Spring.FORCE_FUNCTIONS = {
	    FENE: function (dist, rMax) {
	        var rMaxSmall = rMax * 0.99;
	        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
	        return r / (1 - r * r / (rMax * rMax));
	    },
	    HOOK: function (dist) {
	        return dist;
	    }
	};
	Spring.DEFAULT_OPTIONS = {
	    period: 300,
	    dampingRatio: 0.1,
	    length: 0,
	    maxLength: Infinity,
	    anchor: undefined,
	    forceFunction: Spring.FORCE_FUNCTIONS.HOOK
	};
	function _calcStiffness() {
	    var options = this.options;
	    options.stiffness = Math.pow(2 * pi / options.period, 2);
	}
	function _calcDamping() {
	    var options = this.options;
	    options.damping = 4 * pi * options.dampingRatio / options.period;
	}
	function _init() {
	    _calcStiffness.call(this);
	    _calcDamping.call(this);
	}
	Spring.prototype.setOptions = function setOptions(options) {
	    if (options.anchor !== undefined) {
	        if (options.anchor.position instanceof Vector)
	            this.options.anchor = options.anchor.position;
	        if (options.anchor instanceof Vector)
	            this.options.anchor = options.anchor;
	        if (options.anchor instanceof Array)
	            this.options.anchor = new Vector(options.anchor);
	    }
	    if (options.period !== undefined) {
	        if (options.period < MIN_PERIOD) {
	            options.period = MIN_PERIOD;
	            console.warn('The period of a SpringTransition is capped at ' + MIN_PERIOD + ' ms. Use a SnapTransition for faster transitions');
	        }
	        this.options.period = options.period;
	    }
	    if (options.dampingRatio !== undefined)
	        this.options.dampingRatio = options.dampingRatio;
	    if (options.length !== undefined)
	        this.options.length = options.length;
	    if (options.forceFunction !== undefined)
	        this.options.forceFunction = options.forceFunction;
	    if (options.maxLength !== undefined)
	        this.options.maxLength = options.maxLength;
	    _init.call(this);
	    Force.prototype.setOptions.call(this, options);
	};
	Spring.prototype.applyForce = function applyForce(targets, source) {
	    var force = this.force;
	    var disp = this.disp;
	    var options = this.options;
	    var stiffness = options.stiffness;
	    var damping = options.damping;
	    var restLength = options.length;
	    var maxLength = options.maxLength;
	    var anchor = options.anchor || source.position;
	    var forceFunction = options.forceFunction;
	    var i;
	    var target;
	    var p2;
	    var v2;
	    var dist;
	    var m;
	    for (i = 0; i < targets.length; i++) {
	        target = targets[i];
	        p2 = target.position;
	        v2 = target.velocity;
	        anchor.sub(p2).put(disp);
	        dist = disp.norm() - restLength;
	        if (dist === 0)
	            return;
	        m = target.mass;
	        stiffness *= m;
	        damping *= m;
	        disp.normalize(stiffness * forceFunction(dist, maxLength)).put(force);
	        if (damping)
	            if (source)
	                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
	            else
	                force.add(v2.mult(-damping)).put(force);
	        target.applyForce(force);
	        if (source)
	            source.applyForce(force.mult(-1));
	    }
	};
	Spring.prototype.getEnergy = function getEnergy(targets, source) {
	    var options = this.options;
	    var restLength = options.length;
	    var anchor = source ? source.position : options.anchor;
	    var strength = options.stiffness;
	    var energy = 0;
	    for (var i = 0; i < targets.length; i++) {
	        var target = targets[i];
	        var dist = anchor.sub(target.position).norm() - restLength;
	        energy += 0.5 * strength * dist * dist;
	    }
	    return energy;
	};
	module.exports = Spring;

/***/ },
/* 36 */
/*!*******************************************!*\
  !*** ../~/famous/physics/forces/Force.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(/*! ../../math/Vector */ 37);
	var EventHandler = __webpack_require__(/*! ../../core/EventHandler */ 7);
	function Force(force) {
	    this.force = new Vector(force);
	    this._eventOutput = new EventHandler();
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Force.prototype.setOptions = function setOptions(options) {
	    this._eventOutput.emit('change', options);
	};
	Force.prototype.applyForce = function applyForce(targets) {
	    var length = targets.length;
	    while (length--) {
	        targets[length].applyForce(this.force);
	    }
	};
	Force.prototype.getEnergy = function getEnergy() {
	    return 0;
	};
	module.exports = Force;

/***/ },
/* 37 */
/*!**********************************!*\
  !*** ../~/famous/math/Vector.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function Vector(x, y, z) {
	    if (arguments.length === 1 && x !== undefined)
	        this.set(x);
	    else {
	        this.x = x || 0;
	        this.y = y || 0;
	        this.z = z || 0;
	    }
	    return this;
	}
	var _register = new Vector(0, 0, 0);
	Vector.prototype.add = function add(v) {
	    return _setXYZ.call(_register, this.x + v.x, this.y + v.y, this.z + v.z);
	};
	Vector.prototype.sub = function sub(v) {
	    return _setXYZ.call(_register, this.x - v.x, this.y - v.y, this.z - v.z);
	};
	Vector.prototype.mult = function mult(r) {
	    return _setXYZ.call(_register, r * this.x, r * this.y, r * this.z);
	};
	Vector.prototype.div = function div(r) {
	    return this.mult(1 / r);
	};
	Vector.prototype.cross = function cross(v) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var vx = v.x;
	    var vy = v.y;
	    var vz = v.z;
	    return _setXYZ.call(_register, z * vy - y * vz, x * vz - z * vx, y * vx - x * vy);
	};
	Vector.prototype.equals = function equals(v) {
	    return v.x === this.x && v.y === this.y && v.z === this.z;
	};
	Vector.prototype.rotateX = function rotateX(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, x, y * cosTheta - z * sinTheta, y * sinTheta + z * cosTheta);
	};
	Vector.prototype.rotateY = function rotateY(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, z * sinTheta + x * cosTheta, y, z * cosTheta - x * sinTheta);
	};
	Vector.prototype.rotateZ = function rotateZ(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, x * cosTheta - y * sinTheta, x * sinTheta + y * cosTheta, z);
	};
	Vector.prototype.dot = function dot(v) {
	    return this.x * v.x + this.y * v.y + this.z * v.z;
	};
	Vector.prototype.normSquared = function normSquared() {
	    return this.dot(this);
	};
	Vector.prototype.norm = function norm() {
	    return Math.sqrt(this.normSquared());
	};
	Vector.prototype.normalize = function normalize(length) {
	    if (arguments.length === 0)
	        length = 1;
	    var norm = this.norm();
	    if (norm > 1e-7)
	        return _setFromVector.call(_register, this.mult(length / norm));
	    else
	        return _setXYZ.call(_register, length, 0, 0);
	};
	Vector.prototype.clone = function clone() {
	    return new Vector(this);
	};
	Vector.prototype.isZero = function isZero() {
	    return !(this.x || this.y || this.z);
	};
	function _setXYZ(x, y, z) {
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    return this;
	}
	function _setFromArray(v) {
	    return _setXYZ.call(this, v[0], v[1], v[2] || 0);
	}
	function _setFromVector(v) {
	    return _setXYZ.call(this, v.x, v.y, v.z);
	}
	function _setFromNumber(x) {
	    return _setXYZ.call(this, x, 0, 0);
	}
	Vector.prototype.set = function set(v) {
	    if (v instanceof Array)
	        return _setFromArray.call(this, v);
	    if (typeof v === 'number')
	        return _setFromNumber.call(this, v);
	    return _setFromVector.call(this, v);
	};
	Vector.prototype.setXYZ = function (x, y, z) {
	    return _setXYZ.apply(this, arguments);
	};
	Vector.prototype.set1D = function (x) {
	    return _setFromNumber.call(this, x);
	};
	Vector.prototype.put = function put(v) {
	    if (this === _register)
	        _setFromVector.call(v, _register);
	    else
	        _setFromVector.call(v, this);
	};
	Vector.prototype.clear = function clear() {
	    return _setXYZ.call(this, 0, 0, 0);
	};
	Vector.prototype.cap = function cap(cap) {
	    if (cap === Infinity)
	        return _setFromVector.call(_register, this);
	    var norm = this.norm();
	    if (norm > cap)
	        return _setFromVector.call(_register, this.mult(cap / norm));
	    else
	        return _setFromVector.call(_register, this);
	};
	Vector.prototype.project = function project(n) {
	    return n.mult(this.dot(n));
	};
	Vector.prototype.reflectAcross = function reflectAcross(n) {
	    n.normalize().put(n);
	    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
	};
	Vector.prototype.get = function get() {
	    return [
	        this.x,
	        this.y,
	        this.z
	    ];
	};
	Vector.prototype.get1D = function () {
	    return this.x;
	};
	module.exports = Vector;

/***/ },
/* 38 */
/*!**********************************************!*\
  !*** ../~/famous/physics/bodies/Particle.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(/*! ../../math/Vector */ 37);
	var Transform = __webpack_require__(/*! ../../core/Transform */ 6);
	var EventHandler = __webpack_require__(/*! ../../core/EventHandler */ 7);
	var Integrator = __webpack_require__(/*! ../integrators/SymplecticEuler */ 39);
	function Particle(options) {
	    options = options || {};
	    var defaults = Particle.DEFAULT_OPTIONS;
	    this.position = new Vector();
	    this.velocity = new Vector();
	    this.force = new Vector();
	    this._engine = null;
	    this._isSleeping = true;
	    this._eventOutput = null;
	    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
	    this.inverseMass = 1 / this.mass;
	    this.setPosition(options.position || defaults.position);
	    this.setVelocity(options.velocity || defaults.velocity);
	    this.force.set(options.force || [
	        0,
	        0,
	        0
	    ]);
	    this.transform = Transform.identity.slice();
	    this._spec = {
	        size: [
	            true,
	            true
	        ],
	        target: {
	            transform: this.transform,
	            origin: [
	                0.5,
	                0.5
	            ],
	            target: null
	        }
	    };
	}
	Particle.DEFAULT_OPTIONS = {
	    position: [
	        0,
	        0,
	        0
	    ],
	    velocity: [
	        0,
	        0,
	        0
	    ],
	    mass: 1
	};
	var _events = {
	    start: 'start',
	    update: 'update',
	    end: 'end'
	};
	var now = Date.now;
	Particle.prototype.isBody = false;
	Particle.prototype.isActive = function isActive() {
	    return !this._isSleeping;
	};
	Particle.prototype.sleep = function sleep() {
	    if (this._isSleeping)
	        return;
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};
	Particle.prototype.wake = function wake() {
	    if (!this._isSleeping)
	        return;
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	    this._prevTime = now();
	    if (this._engine)
	        this._engine.wake();
	};
	Particle.prototype.setPosition = function setPosition(position) {
	    this.position.set(position);
	};
	Particle.prototype.setPosition1D = function setPosition1D(x) {
	    this.position.x = x;
	};
	Particle.prototype.getPosition = function getPosition() {
	    this._engine.step();
	    return this.position.get();
	};
	Particle.prototype.getPosition1D = function getPosition1D() {
	    this._engine.step();
	    return this.position.x;
	};
	Particle.prototype.setVelocity = function setVelocity(velocity) {
	    this.velocity.set(velocity);
	    if (!(velocity[0] === 0 && velocity[1] === 0 && velocity[2] === 0))
	        this.wake();
	};
	Particle.prototype.setVelocity1D = function setVelocity1D(x) {
	    this.velocity.x = x;
	    if (x !== 0)
	        this.wake();
	};
	Particle.prototype.getVelocity = function getVelocity() {
	    return this.velocity.get();
	};
	Particle.prototype.setForce = function setForce(force) {
	    this.force.set(force);
	    this.wake();
	};
	Particle.prototype.getVelocity1D = function getVelocity1D() {
	    return this.velocity.x;
	};
	Particle.prototype.setMass = function setMass(mass) {
	    this.mass = mass;
	    this.inverseMass = 1 / mass;
	};
	Particle.prototype.getMass = function getMass() {
	    return this.mass;
	};
	Particle.prototype.reset = function reset(position, velocity) {
	    this.setPosition(position || [
	        0,
	        0,
	        0
	    ]);
	    this.setVelocity(velocity || [
	        0,
	        0,
	        0
	    ]);
	};
	Particle.prototype.applyForce = function applyForce(force) {
	    if (force.isZero())
	        return;
	    this.force.add(force).put(this.force);
	    this.wake();
	};
	Particle.prototype.applyImpulse = function applyImpulse(impulse) {
	    if (impulse.isZero())
	        return;
	    var velocity = this.velocity;
	    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
	};
	Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
	    Integrator.integrateVelocity(this, dt);
	};
	Particle.prototype.integratePosition = function integratePosition(dt) {
	    Integrator.integratePosition(this, dt);
	};
	Particle.prototype._integrate = function _integrate(dt) {
	    this.integrateVelocity(dt);
	    this.integratePosition(dt);
	};
	Particle.prototype.getEnergy = function getEnergy() {
	    return 0.5 * this.mass * this.velocity.normSquared();
	};
	Particle.prototype.getTransform = function getTransform() {
	    this._engine.step();
	    var position = this.position;
	    var transform = this.transform;
	    transform[12] = position.x;
	    transform[13] = position.y;
	    transform[14] = position.z;
	    return transform;
	};
	Particle.prototype.modify = function modify(target) {
	    var _spec = this._spec.target;
	    _spec.transform = this.getTransform();
	    _spec.target = target;
	    return this._spec;
	};
	function _createEventOutput() {
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Particle.prototype.emit = function emit(type, data) {
	    if (!this._eventOutput)
	        return;
	    this._eventOutput.emit(type, data);
	};
	Particle.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};
	Particle.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};
	Particle.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};
	Particle.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};
	module.exports = Particle;

/***/ },
/* 39 */
/*!**********************************************************!*\
  !*** ../~/famous/physics/integrators/SymplecticEuler.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var SymplecticEuler = {};
	SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {
	    var v = body.velocity;
	    var w = body.inverseMass;
	    var f = body.force;
	    if (f.isZero())
	        return;
	    v.add(f.mult(dt * w)).put(v);
	    f.clear();
	};
	SymplecticEuler.integratePosition = function integratePosition(body, dt) {
	    var p = body.position;
	    var v = body.velocity;
	    p.add(v.mult(dt)).put(p);
	};
	SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
	    var L = body.angularMomentum;
	    var t = body.torque;
	    if (t.isZero())
	        return;
	    L.add(t.mult(dt)).put(L);
	    t.clear();
	};
	SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
	    var q = body.orientation;
	    var w = body.angularVelocity;
	    if (w.isZero())
	        return;
	    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
	};
	module.exports = SymplecticEuler;

/***/ },
/* 40 */
/*!********************************************!*\
  !*** ../~/famous/physics/PhysicsEngine.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(/*! ../core/EventHandler */ 7);
	function PhysicsEngine(options) {
	    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this._particles = [];
	    this._bodies = [];
	    this._agentData = {};
	    this._forces = [];
	    this._constraints = [];
	    this._buffer = 0;
	    this._prevTime = now();
	    this._isSleeping = false;
	    this._eventHandler = null;
	    this._currAgentId = 0;
	    this._hasBodies = false;
	    this._eventHandler = null;
	}
	var TIMESTEP = 17;
	var MIN_TIME_STEP = 1000 / 120;
	var MAX_TIME_STEP = 17;
	var now = Date.now;
	var _events = {
	    start: 'start',
	    update: 'update',
	    end: 'end'
	};
	PhysicsEngine.DEFAULT_OPTIONS = {
	    constraintSteps: 1,
	    sleepTolerance: 1e-7,
	    velocityCap: undefined,
	    angularVelocityCap: undefined
	};
	PhysicsEngine.prototype.setOptions = function setOptions(opts) {
	    for (var key in opts)
	        if (this.options[key])
	            this.options[key] = opts[key];
	};
	PhysicsEngine.prototype.addBody = function addBody(body) {
	    body._engine = this;
	    if (body.isBody) {
	        this._bodies.push(body);
	        this._hasBodies = true;
	    } else
	        this._particles.push(body);
	    body.on('start', this.wake.bind(this));
	    return body;
	};
	PhysicsEngine.prototype.removeBody = function removeBody(body) {
	    var array = body.isBody ? this._bodies : this._particles;
	    var index = array.indexOf(body);
	    if (index > -1) {
	        for (var agentKey in this._agentData) {
	            if (this._agentData.hasOwnProperty(agentKey)) {
	                this.detachFrom(this._agentData[agentKey].id, body);
	            }
	        }
	        array.splice(index, 1);
	    }
	    if (this.getBodies().length === 0)
	        this._hasBodies = false;
	};
	function _mapAgentArray(agent) {
	    if (agent.applyForce)
	        return this._forces;
	    if (agent.applyConstraint)
	        return this._constraints;
	}
	function _attachOne(agent, targets, source) {
	    if (targets === undefined)
	        targets = this.getParticlesAndBodies();
	    if (!(targets instanceof Array))
	        targets = [targets];
	    agent.on('change', this.wake.bind(this));
	    this._agentData[this._currAgentId] = {
	        agent: agent,
	        id: this._currAgentId,
	        targets: targets,
	        source: source
	    };
	    _mapAgentArray.call(this, agent).push(this._currAgentId);
	    return this._currAgentId++;
	}
	PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
	    this.wake();
	    if (agents instanceof Array) {
	        var agentIDs = [];
	        for (var i = 0; i < agents.length; i++)
	            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
	        return agentIDs;
	    } else
	        return _attachOne.call(this, agents, targets, source);
	};
	PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
	    _getAgentData.call(this, agentID).targets.push(target);
	};
	PhysicsEngine.prototype.detach = function detach(id) {
	    var agent = this.getAgent(id);
	    var agentArray = _mapAgentArray.call(this, agent);
	    var index = agentArray.indexOf(id);
	    agentArray.splice(index, 1);
	    delete this._agentData[id];
	};
	PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
	    var boundAgent = _getAgentData.call(this, id);
	    if (boundAgent.source === target)
	        this.detach(id);
	    else {
	        var targets = boundAgent.targets;
	        var index = targets.indexOf(target);
	        if (index > -1)
	            targets.splice(index, 1);
	    }
	};
	PhysicsEngine.prototype.detachAll = function detachAll() {
	    this._agentData = {};
	    this._forces = [];
	    this._constraints = [];
	    this._currAgentId = 0;
	};
	function _getAgentData(id) {
	    return this._agentData[id];
	}
	PhysicsEngine.prototype.getAgent = function getAgent(id) {
	    return _getAgentData.call(this, id).agent;
	};
	PhysicsEngine.prototype.getParticles = function getParticles() {
	    return this._particles;
	};
	PhysicsEngine.prototype.getBodies = function getBodies() {
	    return this._bodies;
	};
	PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
	    return this.getParticles().concat(this.getBodies());
	};
	PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
	    var particles = this.getParticles();
	    for (var index = 0, len = particles.length; index < len; index++)
	        fn.call(this, particles[index], dt);
	};
	PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
	    if (!this._hasBodies)
	        return;
	    var bodies = this.getBodies();
	    for (var index = 0, len = bodies.length; index < len; index++)
	        fn.call(this, bodies[index], dt);
	};
	PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
	    this.forEachParticle(fn, dt);
	    this.forEachBody(fn, dt);
	};
	function _updateForce(index) {
	    var boundAgent = _getAgentData.call(this, this._forces[index]);
	    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
	}
	function _updateForces() {
	    for (var index = this._forces.length - 1; index > -1; index--)
	        _updateForce.call(this, index);
	}
	function _updateConstraint(index, dt) {
	    var boundAgent = this._agentData[this._constraints[index]];
	    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
	}
	function _updateConstraints(dt) {
	    var iteration = 0;
	    while (iteration < this.options.constraintSteps) {
	        for (var index = this._constraints.length - 1; index > -1; index--)
	            _updateConstraint.call(this, index, dt);
	        iteration++;
	    }
	}
	function _updateVelocities(body, dt) {
	    body.integrateVelocity(dt);
	    if (this.options.velocityCap)
	        body.velocity.cap(this.options.velocityCap).put(body.velocity);
	}
	function _updateAngularVelocities(body, dt) {
	    body.integrateAngularMomentum(dt);
	    body.updateAngularVelocity();
	    if (this.options.angularVelocityCap)
	        body.angularVelocity.cap(this.options.angularVelocityCap).put(body.angularVelocity);
	}
	function _updateOrientations(body, dt) {
	    body.integrateOrientation(dt);
	}
	function _updatePositions(body, dt) {
	    body.integratePosition(dt);
	    body.emit(_events.update, body);
	}
	function _integrate(dt) {
	    _updateForces.call(this, dt);
	    this.forEach(_updateVelocities, dt);
	    this.forEachBody(_updateAngularVelocities, dt);
	    _updateConstraints.call(this, dt);
	    this.forEachBody(_updateOrientations, dt);
	    this.forEach(_updatePositions, dt);
	}
	function _getParticlesEnergy() {
	    var energy = 0;
	    var particleEnergy = 0;
	    this.forEach(function (particle) {
	        particleEnergy = particle.getEnergy();
	        energy += particleEnergy;
	    });
	    return energy;
	}
	function _getAgentsEnergy() {
	    var energy = 0;
	    for (var id in this._agentData)
	        energy += this.getAgentEnergy(id);
	    return energy;
	}
	PhysicsEngine.prototype.getAgentEnergy = function (agentId) {
	    var agentData = _getAgentData.call(this, agentId);
	    return agentData.agent.getEnergy(agentData.targets, agentData.source);
	};
	PhysicsEngine.prototype.getEnergy = function getEnergy() {
	    return _getParticlesEnergy.call(this) + _getAgentsEnergy.call(this);
	};
	PhysicsEngine.prototype.step = function step() {
	    if (this.isSleeping())
	        return;
	    var currTime = now();
	    var dtFrame = currTime - this._prevTime;
	    this._prevTime = currTime;
	    if (dtFrame < MIN_TIME_STEP)
	        return;
	    if (dtFrame > MAX_TIME_STEP)
	        dtFrame = MAX_TIME_STEP;
	    _integrate.call(this, TIMESTEP);
	    this.emit(_events.update, this);
	    if (this.getEnergy() < this.options.sleepTolerance)
	        this.sleep();
	};
	PhysicsEngine.prototype.isSleeping = function isSleeping() {
	    return this._isSleeping;
	};
	PhysicsEngine.prototype.isActive = function isSleeping() {
	    return !this._isSleeping;
	};
	PhysicsEngine.prototype.sleep = function sleep() {
	    if (this._isSleeping)
	        return;
	    this.forEach(function (body) {
	        body.sleep();
	    });
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};
	PhysicsEngine.prototype.wake = function wake() {
	    if (!this._isSleeping)
	        return;
	    this._prevTime = now();
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	};
	PhysicsEngine.prototype.emit = function emit(type, data) {
	    if (this._eventHandler === null)
	        return;
	    this._eventHandler.emit(type, data);
	};
	PhysicsEngine.prototype.on = function on(event, fn) {
	    if (this._eventHandler === null)
	        this._eventHandler = new EventHandler();
	    this._eventHandler.on(event, fn);
	};
	module.exports = PhysicsEngine;

/***/ },
/* 41 */
/*!********************************************************!*\
  !*** ../~/famous-flex/src/helpers/LayoutDockHelper.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * LayoutDockHelper helps positioning nodes using docking principles.
	 *
	 * **Example:**
	 *
	 * ```javascript
	 * var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');
	 *
	 * function HeaderFooterLayout(context, options) {
	 *   var dock = new LayoutDockHelper(context);
	 *   dock.top('header', options.headerSize);
	 *   dock.bottom('footer', options.footerSize);
	 *   dock.fill('content');
	 * };
	 * ```
	 *
	 * You can also use layout-literals to create layouts using docking semantics:
	 *
	 * ```javascript
	 * var layoutController = new LayoutController({
	 *   layout: {dock: [
	 *     ['top', 'header', 40],
	 *     ['bottom', 'footer', 40, 1], // z-index +1
	 *     ['fill', 'content']
	 *   ]},
	 *   dataSource: {
	 *     header: new Surface({content: 'header'}),
	 *     footer: new Surface({content: 'footer'}),
	 *     content: new Surface({content: 'content'}),
	 *   }
	 * });
	 * ```
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutUtility = __webpack_require__(/*! ../LayoutUtility */ 30);
	
	    /**
	     * @class
	     * @param {LayoutContext} context layout-context
	     * @param {Object} [options] additional options
	     * @param {Object} [options.margins] margins to start out with (default: 0px)
	     * @param {Number} [options.translateZ] z-index to use when translating objects (default: 0)
	     * @alias module:LayoutDockHelper
	     */
	    function LayoutDockHelper(context, options) {
	        var size = context.size;
	        this._size = size;
	        this._context = context;
	        this._options = options;
	        this._z = (options && options.translateZ) ? options.translateZ : 0;
	        if (options && options.margins) {
	            var margins = LayoutUtility.normalizeMargins(options.margins);
	            this._left = margins[3];
	            this._top = margins[0];
	            this._right = size[0] - margins[1];
	            this._bottom = size[1] - margins[2];
	        }
	        else {
	            this._left = 0;
	            this._top = 0;
	            this._right = size[0];
	            this._bottom = size[1];
	        }
	    }
	
	    /**
	     * Parses the layout-rules based on a JSON data object.
	     * The object should be an array with the following syntax:
	     * `[[rule, node, value, z], [rule, node, value, z], ...]`
	     *
	     * **Example:**
	     *
	     * ```JSON
	     * [
	     *   ['top', 'header', 50],
	     *   ['bottom', 'footer', 50, 10], // z-index: 10
	     *   ['margins', [10, 5]], // marginate remaining space: 10px top/bottom, 5px left/right
	     *   ['fill', 'content']
	     * ]
	     * ```
	     *
	     * @param {Object} data JSON object
	     */
	    LayoutDockHelper.prototype.parse = function(data) {
	        for (var i = 0; i < data.length; i++) {
	            var rule = data[i];
	            var value = (rule.length >= 3) ? rule[2] : undefined;
	            if (rule[0] === 'top') {
	                this.top(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'left') {
	                this.left(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'right') {
	                this.right(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'bottom') {
	                this.bottom(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'fill') {
	                this.fill(rule[1], (rule.length >=3) ? rule[2] : undefined);
	            }
	            else if (rule[0] === 'margins') {
	                this.margins(rule[1]);
	            }
	        }
	    };
	
	    /**
	     * Dock the node to the top.
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `height` argument argument is used for padding
	     * @param {Number} [height] height of the layout-node, when omitted the height of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.top = function(node, height, z) {
	        if (height instanceof Array) {
	            height = height[1];
	        }
	        if (height === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            height = size[1];
	        }
	        this._context.set(node, {
	            size: [this._right - this._left, height],
	            origin: [0, 0],
	            align: [0, 0],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        this._top += height;
	        return this;
	    };
	
	    /**
	     * Dock the node to the left
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `width` argument argument is used for padding
	     * @param {Number} [width] width of the layout-node, when omitted the width of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.left = function(node, width, z) {
	        if (width instanceof Array) {
	            width = width[0];
	        }
	        if (width === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            width = size[0];
	        }
	        this._context.set(node, {
	            size: [width, this._bottom - this._top],
	            origin: [0, 0],
	            align: [0, 0],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        this._left += width;
	        return this;
	    };
	
	    /**
	     * Dock the node to the bottom
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `height` argument argument is used for padding
	     * @param {Number} [height] height of the layout-node, when omitted the height of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.bottom = function(node, height, z) {
	        if (height instanceof Array) {
	            height = height[1];
	        }
	        if (height === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            height = size[1];
	        }
	        this._context.set(node, {
	            size: [this._right - this._left, height],
	            origin: [0, 1],
	            align: [0, 1],
	            translate: [this._left, -(this._size[1] - this._bottom), (z === undefined) ? this._z : z]
	        });
	        this._bottom -= height;
	        return this;
	    };
	
	    /**
	     * Dock the node to the right.
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `width` argument argument is used for padding
	     * @param {Number} [width] width of the layout-node, when omitted the width of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.right = function(node, width, z) {
	        if (width instanceof Array) {
	            width = width[0];
	        }
	        if (node) {
	            if (width === undefined) {
	                var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	                width = size[0];
	            }
	            this._context.set(node, {
	                size: [width, this._bottom - this._top],
	                origin: [1, 0],
	                align: [1, 0],
	                translate: [-(this._size[0] - this._right), this._top, (z === undefined) ? this._z : z]
	            });
	        }
	        if (width) {
	            this._right -= width;
	        }
	        return this;
	    };
	
	    /**
	     * Fills the node to the remaining content.
	     *
	     * @param {LayoutNode|String} node layout-node to dock
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.fill = function(node, z) {
	        this._context.set(node, {
	            size: [this._right - this._left, this._bottom - this._top],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        return this;
	    };
	
	    /**
	     * Applies indent margins to the remaining content.
	     *
	     * @param {Number|Array} margins margins shorthand (e.g. '5', [10, 10], [5, 10, 5, 10])
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.margins = function(margins) {
	        margins = LayoutUtility.normalizeMargins(margins);
	        this._left += margins[3];
	        this._top += margins[0];
	        this._right -= margins[1];
	        this._bottom -= margins[2];
	        return this;
	    };
	
	    // Register the helper
	    LayoutUtility.registerHelper('dock', LayoutDockHelper);
	
	    module.exports = LayoutDockHelper;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 42 */
/*!***********************************!*\
  !*** ../~/famous/core/Surface.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var ElementOutput = __webpack_require__(/*! ./ElementOutput */ 43);
	function Surface(options) {
	    ElementOutput.call(this);
	    this.options = {};
	    this.properties = {};
	    this.attributes = {};
	    this.content = '';
	    this.classList = [];
	    this.size = null;
	    this._classesDirty = true;
	    this._stylesDirty = true;
	    this._attributesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;
	    this._trueSizeCheck = true;
	    this._dirtyClasses = [];
	    if (options)
	        this.setOptions(options);
	    this._currentTarget = null;
	}
	Surface.prototype = Object.create(ElementOutput.prototype);
	Surface.prototype.constructor = Surface;
	Surface.prototype.elementType = 'div';
	Surface.prototype.elementClass = 'famous-surface';
	Surface.prototype.setAttributes = function setAttributes(attributes) {
	    for (var n in attributes) {
	        if (n === 'style')
	            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
	        this.attributes[n] = attributes[n];
	    }
	    this._attributesDirty = true;
	};
	Surface.prototype.getAttributes = function getAttributes() {
	    return this.attributes;
	};
	Surface.prototype.setProperties = function setProperties(properties) {
	    for (var n in properties) {
	        this.properties[n] = properties[n];
	    }
	    this._stylesDirty = true;
	    return this;
	};
	Surface.prototype.getProperties = function getProperties() {
	    return this.properties;
	};
	Surface.prototype.addClass = function addClass(className) {
	    if (this.classList.indexOf(className) < 0) {
	        this.classList.push(className);
	        this._classesDirty = true;
	    }
	    return this;
	};
	Surface.prototype.removeClass = function removeClass(className) {
	    var i = this.classList.indexOf(className);
	    if (i >= 0) {
	        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
	        this._classesDirty = true;
	    }
	    return this;
	};
	Surface.prototype.toggleClass = function toggleClass(className) {
	    var i = this.classList.indexOf(className);
	    if (i >= 0) {
	        this.removeClass(className);
	    } else {
	        this.addClass(className);
	    }
	    return this;
	};
	Surface.prototype.setClasses = function setClasses(classList) {
	    var i = 0;
	    var removal = [];
	    for (i = 0; i < this.classList.length; i++) {
	        if (classList.indexOf(this.classList[i]) < 0)
	            removal.push(this.classList[i]);
	    }
	    for (i = 0; i < removal.length; i++)
	        this.removeClass(removal[i]);
	    for (i = 0; i < classList.length; i++)
	        this.addClass(classList[i]);
	    return this;
	};
	Surface.prototype.getClassList = function getClassList() {
	    return this.classList;
	};
	Surface.prototype.setContent = function setContent(content) {
	    if (this.content !== content) {
	        this.content = content;
	        this._contentDirty = true;
	    }
	    return this;
	};
	Surface.prototype.getContent = function getContent() {
	    return this.content;
	};
	Surface.prototype.setOptions = function setOptions(options) {
	    if (options.size)
	        this.setSize(options.size);
	    if (options.classes)
	        this.setClasses(options.classes);
	    if (options.properties)
	        this.setProperties(options.properties);
	    if (options.attributes)
	        this.setAttributes(options.attributes);
	    if (options.content)
	        this.setContent(options.content);
	    return this;
	};
	function _cleanupClasses(target) {
	    for (var i = 0; i < this._dirtyClasses.length; i++)
	        target.classList.remove(this._dirtyClasses[i]);
	    this._dirtyClasses = [];
	}
	function _applyStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = this.properties[n];
	    }
	}
	function _cleanupStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = '';
	    }
	}
	function _applyAttributes(target) {
	    for (var n in this.attributes) {
	        target.setAttribute(n, this.attributes[n]);
	    }
	}
	function _cleanupAttributes(target) {
	    for (var n in this.attributes) {
	        target.removeAttribute(n);
	    }
	}
	function _xyNotEquals(a, b) {
	    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
	}
	Surface.prototype.setup = function setup(allocator) {
	    var target = allocator.allocate(this.elementType);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (var i = 0; i < this.elementClass.length; i++) {
	                target.classList.add(this.elementClass[i]);
	            }
	        } else {
	            target.classList.add(this.elementClass);
	        }
	    }
	    target.style.display = '';
	    this.attach(target);
	    this._opacity = null;
	    this._currentTarget = target;
	    this._stylesDirty = true;
	    this._classesDirty = true;
	    this._attributesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;
	    this._originDirty = true;
	    this._transformDirty = true;
	};
	Surface.prototype.commit = function commit(context) {
	    if (!this._currentTarget)
	        this.setup(context.allocator);
	    var target = this._currentTarget;
	    var size = context.size;
	    if (this._classesDirty) {
	        _cleanupClasses.call(this, target);
	        var classList = this.getClassList();
	        for (var i = 0; i < classList.length; i++)
	            target.classList.add(classList[i]);
	        this._classesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this._stylesDirty) {
	        _applyStyles.call(this, target);
	        this._stylesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this._attributesDirty) {
	        _applyAttributes.call(this, target);
	        this._attributesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this.size) {
	        var origSize = context.size;
	        size = [
	            this.size[0],
	            this.size[1]
	        ];
	        if (size[0] === undefined)
	            size[0] = origSize[0];
	        if (size[1] === undefined)
	            size[1] = origSize[1];
	        if (size[0] === true || size[1] === true) {
	            if (size[0] === true) {
	                if (this._trueSizeCheck || this._size[0] === 0) {
	                    var width = target.offsetWidth;
	                    if (this._size && this._size[0] !== width) {
	                        this._size[0] = width;
	                        this._sizeDirty = true;
	                    }
	                    size[0] = width;
	                } else {
	                    if (this._size)
	                        size[0] = this._size[0];
	                }
	            }
	            if (size[1] === true) {
	                if (this._trueSizeCheck || this._size[1] === 0) {
	                    var height = target.offsetHeight;
	                    if (this._size && this._size[1] !== height) {
	                        this._size[1] = height;
	                        this._sizeDirty = true;
	                    }
	                    size[1] = height;
	                } else {
	                    if (this._size)
	                        size[1] = this._size[1];
	                }
	            }
	            this._trueSizeCheck = false;
	        }
	    }
	    if (_xyNotEquals(this._size, size)) {
	        if (!this._size)
	            this._size = [
	                0,
	                0
	            ];
	        this._size[0] = size[0];
	        this._size[1] = size[1];
	        this._sizeDirty = true;
	    }
	    if (this._sizeDirty) {
	        if (this._size) {
	            target.style.width = this.size && this.size[0] === true ? '' : this._size[0] + 'px';
	            target.style.height = this.size && this.size[1] === true ? '' : this._size[1] + 'px';
	        }
	        this._eventOutput.emit('resize');
	    }
	    if (this._contentDirty) {
	        this.deploy(target);
	        this._eventOutput.emit('deploy');
	        this._contentDirty = false;
	        this._trueSizeCheck = true;
	    }
	    ElementOutput.prototype.commit.call(this, context);
	};
	Surface.prototype.cleanup = function cleanup(allocator) {
	    var i = 0;
	    var target = this._currentTarget;
	    this._eventOutput.emit('recall');
	    this.recall(target);
	    target.style.display = 'none';
	    target.style.opacity = '';
	    target.style.width = '';
	    target.style.height = '';
	    _cleanupStyles.call(this, target);
	    _cleanupAttributes.call(this, target);
	    var classList = this.getClassList();
	    _cleanupClasses.call(this, target);
	    for (i = 0; i < classList.length; i++)
	        target.classList.remove(classList[i]);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (i = 0; i < this.elementClass.length; i++) {
	                target.classList.remove(this.elementClass[i]);
	            }
	        } else {
	            target.classList.remove(this.elementClass);
	        }
	    }
	    this.detach(target);
	    this._currentTarget = null;
	    allocator.deallocate(target);
	};
	Surface.prototype.deploy = function deploy(target) {
	    var content = this.getContent();
	    if (content instanceof Node) {
	        while (target.hasChildNodes())
	            target.removeChild(target.firstChild);
	        target.appendChild(content);
	    } else
	        target.innerHTML = content;
	};
	Surface.prototype.recall = function recall(target) {
	    var df = document.createDocumentFragment();
	    while (target.hasChildNodes())
	        df.appendChild(target.firstChild);
	    this.setContent(df);
	};
	Surface.prototype.getSize = function getSize() {
	    return this._size ? this._size : this.size;
	};
	Surface.prototype.setSize = function setSize(size) {
	    this.size = size ? [
	        size[0],
	        size[1]
	    ] : null;
	    this._sizeDirty = true;
	    return this;
	};
	module.exports = Surface;

/***/ },
/* 43 */
/*!*****************************************!*\
  !*** ../~/famous/core/ElementOutput.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Entity = __webpack_require__(/*! ./Entity */ 4);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 7);
	var Transform = __webpack_require__(/*! ./Transform */ 6);
	var usePrefix = !('transform' in document.documentElement.style);
	var devicePixelRatio = window.devicePixelRatio || 1;
	function ElementOutput(element) {
	    this._matrix = null;
	    this._opacity = 1;
	    this._origin = null;
	    this._size = null;
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    this.eventForwarder = function eventForwarder(event) {
	        this._eventOutput.emit(event.type, event);
	    }.bind(this);
	    this.id = Entity.register(this);
	    this._element = null;
	    this._sizeDirty = false;
	    this._originDirty = false;
	    this._transformDirty = false;
	    this._invisible = false;
	    if (element)
	        this.attach(element);
	}
	ElementOutput.prototype.on = function on(type, fn) {
	    if (this._element)
	        this._element.addEventListener(type, this.eventForwarder);
	    this._eventOutput.on(type, fn);
	};
	ElementOutput.prototype.removeListener = function removeListener(type, fn) {
	    this._eventOutput.removeListener(type, fn);
	};
	ElementOutput.prototype.emit = function emit(type, event) {
	    if (event && !event.origin)
	        event.origin = this;
	    var handled = this._eventOutput.emit(type, event);
	    if (handled && event && event.stopPropagation)
	        event.stopPropagation();
	    return handled;
	};
	ElementOutput.prototype.pipe = function pipe(target) {
	    return this._eventOutput.pipe(target);
	};
	ElementOutput.prototype.unpipe = function unpipe(target) {
	    return this._eventOutput.unpipe(target);
	};
	ElementOutput.prototype.render = function render() {
	    return this.id;
	};
	function _addEventListeners(target) {
	    for (var i in this._eventOutput.listeners) {
	        target.addEventListener(i, this.eventForwarder);
	    }
	}
	function _removeEventListeners(target) {
	    for (var i in this._eventOutput.listeners) {
	        target.removeEventListener(i, this.eventForwarder);
	    }
	}
	function _formatCSSTransform(m) {
	    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
	    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
	    var result = 'matrix3d(';
	    for (var i = 0; i < 15; i++) {
	        result += m[i] < 0.000001 && m[i] > -0.000001 ? '0,' : m[i] + ',';
	    }
	    result += m[15] + ')';
	    return result;
	}
	var _setMatrix;
	if (usePrefix) {
	    _setMatrix = function (element, matrix) {
	        element.style.webkitTransform = _formatCSSTransform(matrix);
	    };
	} else {
	    _setMatrix = function (element, matrix) {
	        element.style.transform = _formatCSSTransform(matrix);
	    };
	}
	function _formatCSSOrigin(origin) {
	    return 100 * origin[0] + '% ' + 100 * origin[1] + '%';
	}
	var _setOrigin = usePrefix ? function (element, origin) {
	    element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
	} : function (element, origin) {
	    element.style.transformOrigin = _formatCSSOrigin(origin);
	};
	var _setInvisible = usePrefix ? function (element) {
	    element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
	    element.style.opacity = 0;
	} : function (element) {
	    element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
	    element.style.opacity = 0;
	};
	function _xyNotEquals(a, b) {
	    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
	}
	ElementOutput.prototype.commit = function commit(context) {
	    var target = this._element;
	    if (!target)
	        return;
	    var matrix = context.transform;
	    var opacity = context.opacity;
	    var origin = context.origin;
	    var size = context.size;
	    if (!matrix && this._matrix) {
	        this._matrix = null;
	        this._opacity = 0;
	        _setInvisible(target);
	        return;
	    }
	    if (_xyNotEquals(this._origin, origin))
	        this._originDirty = true;
	    if (Transform.notEquals(this._matrix, matrix))
	        this._transformDirty = true;
	    if (this._invisible) {
	        this._invisible = false;
	        this._element.style.display = '';
	    }
	    if (this._opacity !== opacity) {
	        this._opacity = opacity;
	        target.style.opacity = opacity >= 1 ? '0.999999' : opacity;
	    }
	    if (this._transformDirty || this._originDirty || this._sizeDirty) {
	        if (this._sizeDirty)
	            this._sizeDirty = false;
	        if (this._originDirty) {
	            if (origin) {
	                if (!this._origin)
	                    this._origin = [
	                        0,
	                        0
	                    ];
	                this._origin[0] = origin[0];
	                this._origin[1] = origin[1];
	            } else
	                this._origin = null;
	            _setOrigin(target, this._origin);
	            this._originDirty = false;
	        }
	        if (!matrix)
	            matrix = Transform.identity;
	        this._matrix = matrix;
	        var aaMatrix = this._size ? Transform.thenMove(matrix, [
	            -this._size[0] * origin[0],
	            -this._size[1] * origin[1],
	            0
	        ]) : matrix;
	        _setMatrix(target, aaMatrix);
	        this._transformDirty = false;
	    }
	};
	ElementOutput.prototype.cleanup = function cleanup() {
	    if (this._element) {
	        this._invisible = true;
	        this._element.style.display = 'none';
	    }
	};
	ElementOutput.prototype.attach = function attach(target) {
	    this._element = target;
	    _addEventListeners.call(this, target);
	};
	ElementOutput.prototype.detach = function detach() {
	    var target = this._element;
	    if (target) {
	        _removeEventListeners.call(this, target);
	        if (this._invisible) {
	            this._invisible = false;
	            this._element.style.display = '';
	        }
	    }
	    this._element = null;
	    return target;
	};
	module.exports = ElementOutput;

/***/ },
/* 44 */
/*!***********************************************!*\
  !*** ../~/famous/surfaces/TextareaSurface.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Surface = __webpack_require__(/*! ../core/Surface */ 42);
	function TextareaSurface(options) {
	    this._placeholder = options.placeholder || '';
	    this._value = options.value || '';
	    this._name = options.name || '';
	    this._wrap = options.wrap || '';
	    this._cols = options.cols || '';
	    this._rows = options.rows || '';
	    Surface.apply(this, arguments);
	    this.on('click', this.focus.bind(this));
	}
	TextareaSurface.prototype = Object.create(Surface.prototype);
	TextareaSurface.prototype.constructor = TextareaSurface;
	TextareaSurface.prototype.elementType = 'textarea';
	TextareaSurface.prototype.elementClass = 'famous-surface';
	TextareaSurface.prototype.setPlaceholder = function setPlaceholder(str) {
	    this._placeholder = str;
	    this._contentDirty = true;
	    return this;
	};
	TextareaSurface.prototype.focus = function focus() {
	    if (this._currentTarget)
	        this._currentTarget.focus();
	    return this;
	};
	TextareaSurface.prototype.blur = function blur() {
	    if (this._currentTarget)
	        this._currentTarget.blur();
	    return this;
	};
	TextareaSurface.prototype.setValue = function setValue(str) {
	    this._value = str;
	    this._contentDirty = true;
	    return this;
	};
	TextareaSurface.prototype.getValue = function getValue() {
	    if (this._currentTarget) {
	        return this._currentTarget.value;
	    } else {
	        return this._value;
	    }
	};
	TextareaSurface.prototype.setName = function setName(str) {
	    this._name = str;
	    this._contentDirty = true;
	    return this;
	};
	TextareaSurface.prototype.getName = function getName() {
	    return this._name;
	};
	TextareaSurface.prototype.setWrap = function setWrap(str) {
	    this._wrap = str;
	    this._contentDirty = true;
	    return this;
	};
	TextareaSurface.prototype.setColumns = function setColumns(num) {
	    this._cols = num;
	    this._contentDirty = true;
	    return this;
	};
	TextareaSurface.prototype.setRows = function setRows(num) {
	    this._rows = num;
	    this._contentDirty = true;
	    return this;
	};
	TextareaSurface.prototype.deploy = function deploy(target) {
	    if (this._placeholder !== '')
	        target.placeholder = this._placeholder;
	    if (this._value !== '')
	        target.value = this._value;
	    if (this._name !== '')
	        target.name = this._name;
	    if (this._wrap !== '')
	        target.wrap = this._wrap;
	    if (this._cols !== '')
	        target.cols = this._cols;
	    if (this._rows !== '')
	        target.rows = this._rows;
	};
	module.exports = TextareaSurface;

/***/ },
/* 45 */
/*!*******************************!*\
  !*** ../~/cassowary/bin/c.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/**
	 * Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)
	 * Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros
	 *
	 * Use of this source code is governed by the LGPL, which can be found in the
	 * COPYING.LGPL file.
	 *
	 * This is a compiled version of Cassowary/JS. For source versions or to
	 * contribute, see the github project:
	 *
	 *  https://github.com/slightlyoff/cassowary-js-refactor
	 *
	 */
	
	(function() {
	(function(a){"use strict";try{(function(){}).bind(a)}catch(b){Object.defineProperty(Function.prototype,"bind",{value:function(a){var b=this;return function(){return b.apply(a,arguments)}},enumerable:!1,configurable:!0,writable:!0})}var c=a.HTMLElement!==void 0,d=function(a){for(var b=null;a&&a!=Object.prototype;){if(a.tagName){b=a.tagName;break}a=a.prototype}return b||"div"},e=1e-8,f={},g=function(a,b){if(a&&b){if("function"==typeof a[b])return a[b];var c=a.prototype;if(c&&"function"==typeof c[b])return c[b];if(c!==Object.prototype&&c!==Function.prototype)return"function"==typeof a.__super__?g(a.__super__,b):void 0}},h=a.c={debug:!1,trace:!1,verbose:!1,traceAdded:!1,GC:!1,GEQ:1,LEQ:2,inherit:function(b){var e=null,g=null;b["extends"]&&(g=b["extends"],delete b["extends"]),b.initialize&&(e=b.initialize,delete b.initialize);var h=e||function(){};Object.defineProperty(h,"__super__",{value:g?g:Object,enumerable:!1,configurable:!0,writable:!1}),b._t&&(f[b._t]=h);var i=h.prototype=Object.create(g?g.prototype:Object.prototype);if(this.extend(i,b),c&&g&&g.prototype instanceof a.HTMLElement){var j=h,k=d(i),l=function(a){return a.__proto__=i,j.apply(a,arguments),i.created&&a.created(),i.decorate&&a.decorate(),a};this.extend(i,{upgrade:l}),h=function(){return l(a.document.createElement(k))},h.prototype=i,this.extend(h,{ctor:j})}return h},extend:function(a,b){return this.own(b,function(c){var d=Object.getOwnPropertyDescriptor(b,c);try{"function"==typeof d.get||"function"==typeof d.set?Object.defineProperty(a,c,d):"function"==typeof d.value||"_"===c.charAt(0)?(d.writable=!0,d.configurable=!0,d.enumerable=!1,Object.defineProperty(a,c,d)):a[c]=b[c]}catch(e){}}),a},own:function(b,c,d){return Object.getOwnPropertyNames(b).forEach(c,d||a),b},traceprint:function(a){h.verbose&&console.log(a)},fnenterprint:function(a){console.log("* "+a)},fnexitprint:function(a){console.log("- "+a)},assert:function(a,b){if(!a)throw new h.InternalError("Assertion failed: "+b)},plus:function(a,b){return a instanceof h.Expression||(a=new h.Expression(a)),b instanceof h.Expression||(b=new h.Expression(b)),a.plus(b)},minus:function(a,b){return a instanceof h.Expression||(a=new h.Expression(a)),b instanceof h.Expression||(b=new h.Expression(b)),a.minus(b)},times:function(a,b){return("number"==typeof a||a instanceof h.Variable)&&(a=new h.Expression(a)),("number"==typeof b||b instanceof h.Variable)&&(b=new h.Expression(b)),a.times(b)},divide:function(a,b){return("number"==typeof a||a instanceof h.Variable)&&(a=new h.Expression(a)),("number"==typeof b||b instanceof h.Variable)&&(b=new h.Expression(b)),a.divide(b)},approx:function(a,b){if(a===b)return!0;var c,d;return c=a instanceof h.Variable?a.value:a,d=b instanceof h.Variable?b.value:b,0==c?e>Math.abs(d):0==d?e>Math.abs(c):Math.abs(c-d)<Math.abs(c)*e},_inc:function(a){return function(){return a++}}(0),parseJSON:function(a){return JSON.parse(a,function(a,b){if("object"!=typeof b||"string"!=typeof b._t)return b;var c=b._t,d=f[c];if(c&&d){var e=g(d,"fromJSON");if(e)return e(b,d)}return b})}};"function"=="function"&&"undefined"!=typeof module&&"undefined"==typeof load&&(a.exports=h)})(this),function(a){"use strict";var b=function(a){var b=a.hashCode?a.hashCode:""+a;return b},c=function(a,b){Object.keys(a).forEach(function(c){b[c]=a[c]})},d={};a.HashTable=a.inherit({initialize:function(){this.size=0,this._store={},this._keyStrMap={},this._deleted=0},set:function(a,c){var d=b(a);this._store.hasOwnProperty(d)||this.size++,this._store[d]=c,this._keyStrMap[d]=a},get:function(a){if(!this.size)return null;a=b(a);var c=this._store[a];return c!==void 0?this._store[a]:null},clear:function(){this.size=0,this._store={},this._keyStrMap={}},_compact:function(){var a={};c(this._store,a),this._store=a},_compactThreshold:100,_perhapsCompact:function(){this._size>64||this._deleted>this._compactThreshold&&(this._compact(),this._deleted=0)},"delete":function(a){a=b(a),this._store.hasOwnProperty(a)&&(this._deleted++,delete this._store[a],this.size>0&&this.size--)},each:function(a,b){if(this.size){this._perhapsCompact();var c=this._store,d=this._keyStrMap;Object.keys(this._store).forEach(function(e){a.call(b||null,d[e],c[e])},this)}},escapingEach:function(a,b){if(this.size){this._perhapsCompact();for(var c=this,e=this._store,f=this._keyStrMap,g=d,h=Object.keys(e),i=0;h.length>i;i++)if(function(d){c._store.hasOwnProperty(d)&&(g=a.call(b||null,f[d],e[d]))}(h[i]),g){if(void 0!==g.retval)return g;if(g.brk)break}}},clone:function(){var b=new a.HashTable;return this.size&&(b.size=this.size,c(this._store,b._store),c(this._keyStrMap,b._keyStrMap)),b},equals:function(b){if(b===this)return!0;if(!(b instanceof a.HashTable)||b._size!==this._size)return!1;for(var c=Object.keys(this._store),d=0;c.length>d;d++){var e=c[d];if(this._keyStrMap[e]!==b._keyStrMap[e]||this._store[e]!==b._store[e])return!1}return!0},toString:function(){var b="";return this.each(function(a,c){b+=a+" => "+c+"\n"}),b}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.HashSet=a.inherit({_t:"c.HashSet",initialize:function(){this.storage=[],this.size=0},add:function(a){var b=this.storage;b.indexOf(a),-1==b.indexOf(a)&&b.push(a),this.size=this.storage.length},values:function(){return this.storage},has:function(a){var b=this.storage;return-1!=b.indexOf(a)},"delete":function(a){var b=this.storage.indexOf(a);return-1==b?null:(this.storage.splice(b,1)[0],this.size=this.storage.length,void 0)},clear:function(){this.storage.length=0},each:function(a,b){this.size&&this.storage.forEach(a,b)},escapingEach:function(a,b){this.size&&this.storage.forEach(a,b)},toString:function(){var a=this.size+" {",b=!0;return this.each(function(c){b?b=!1:a+=", ",a+=c}),a+="}\n"},toJSON:function(){var a=[];return this.each(function(b){a.push(b.toJSON())}),{_t:"c.HashSet",data:a}},fromJSON:function(b){var c=new a.HashSet;return b.data&&(c.size=b.data.length,c.storage=b.data),c}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Error=a.inherit({initialize:function(a){a&&(this._description=a)},_name:"c.Error",_description:"An error has occured in Cassowary",set description(a){this._description=a},get description(){return"("+this._name+") "+this._description},get message(){return this.description},toString:function(){return this.description}});var b=function(b,c){return a.inherit({"extends":a.Error,initialize:function(){a.Error.apply(this,arguments)},_name:b||"",_description:c||""})};a.ConstraintNotFound=b("c.ConstraintNotFound","Tried to remove a constraint never added to the tableu"),a.InternalError=b("c.InternalError"),a.NonExpression=b("c.NonExpression","The resulting expression would be non"),a.NotEnoughStays=b("c.NotEnoughStays","There are not enough stays to give specific values to every variable"),a.RequiredFailure=b("c.RequiredFailure","A required constraint cannot be satisfied"),a.TooDifficult=b("c.TooDifficult","The constraints are too difficult to solve")}(this.c||module.parent.exports||{}),function(a){"use strict";var b=1e3;a.SymbolicWeight=a.inherit({_t:"c.SymbolicWeight",initialize:function(){this.value=0;for(var a=1,c=arguments.length-1;c>=0;--c)this.value+=arguments[c]*a,a*=b},toJSON:function(){return{_t:this._t,value:this.value}}})}(this.c||module.parent.exports||{}),function(a){a.Strength=a.inherit({initialize:function(b,c,d,e){this.name=b,this.symbolicWeight=c instanceof a.SymbolicWeight?c:new a.SymbolicWeight(c,d,e)},get required(){return this===a.Strength.required},toString:function(){return this.name+(this.isRequired?"":":"+this.symbolicWeight)}}),a.Strength.required=new a.Strength("<Required>",1e3,1e3,1e3),a.Strength.strong=new a.Strength("strong",1,0,0),a.Strength.medium=new a.Strength("medium",0,1,0),a.Strength.weak=new a.Strength("weak",0,0,1)}(this.c||(true?module.parent.exports.c:{})),function(a){"use strict";a.AbstractVariable=a.inherit({isDummy:!1,isExternal:!1,isPivotable:!1,isRestricted:!1,_init:function(b,c){this.hashCode=a._inc(),this.name=(c||"")+this.hashCode,b&&(b.name!==void 0&&(this.name=b.name),b.value!==void 0&&(this.value=b.value),b.prefix!==void 0&&(this._prefix=b.prefix))},_prefix:"",name:"",value:0,toJSON:function(){var a={};return this._t&&(a._t=this._t),this.name&&(a.name=this.name),this.value!==void 0&&(a.value=this.value),this._prefix&&(a._prefix=this._prefix),this._t&&(a._t=this._t),a},fromJSON:function(b,c){var d=new c;return a.extend(d,b),d},toString:function(){return this._prefix+"["+this.name+":"+this.value+"]"}}),a.Variable=a.inherit({_t:"c.Variable","extends":a.AbstractVariable,initialize:function(b){this._init(b,"v");var c=a.Variable._map;c&&(c[this.name]=this)},isExternal:!0}),a.DummyVariable=a.inherit({_t:"c.DummyVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"d")},isDummy:!0,isRestricted:!0,value:"dummy"}),a.ObjectiveVariable=a.inherit({_t:"c.ObjectiveVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"o")},value:"obj"}),a.SlackVariable=a.inherit({_t:"c.SlackVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"s")},isPivotable:!0,isRestricted:!0,value:"slack"})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Point=a.inherit({initialize:function(b,c,d){if(b instanceof a.Variable)this._x=b;else{var e={value:b};d&&(e.name="x"+d),this._x=new a.Variable(e)}if(c instanceof a.Variable)this._y=c;else{var f={value:c};d&&(f.name="y"+d),this._y=new a.Variable(f)}},get x(){return this._x},set x(b){b instanceof a.Variable?this._x=b:this._x.value=b},get y(){return this._y},set y(b){b instanceof a.Variable?this._y=b:this._y.value=b},toString:function(){return"("+this.x+", "+this.y+")"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Expression=a.inherit({initialize:function(b,c,d){a.GC&&console.log("new c.Expression"),this.constant="number"!=typeof d||isNaN(d)?0:d,this.terms=new a.HashTable,b instanceof a.AbstractVariable?this.setVariable(b,"number"==typeof c?c:1):"number"==typeof b&&(isNaN(b)?console.trace():this.constant=b)},initializeFromHash:function(b,c){return a.verbose&&(console.log("*******************************"),console.log("clone c.initializeFromHash"),console.log("*******************************")),a.GC&&console.log("clone c.Expression"),this.constant=b,this.terms=c.clone(),this},multiplyMe:function(a){this.constant*=a;var b=this.terms;return b.each(function(c,d){b.set(c,d*a)}),this},clone:function(){a.verbose&&(console.log("*******************************"),console.log("clone c.Expression"),console.log("*******************************"));var b=new a.Expression;return b.initializeFromHash(this.constant,this.terms),b},times:function(b){if("number"==typeof b)return this.clone().multiplyMe(b);if(this.isConstant)return b.times(this.constant);if(b.isConstant)return this.times(b.constant);throw new a.NonExpression},plus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,1):b instanceof a.Variable?this.clone().addVariable(b,1):void 0},minus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,-1):b instanceof a.Variable?this.clone().addVariable(b,-1):void 0},divide:function(b){if("number"==typeof b){if(a.approx(b,0))throw new a.NonExpression;return this.times(1/b)}if(b instanceof a.Expression){if(!b.isConstant)throw new a.NonExpression;return this.times(1/b.constant)}},addExpression:function(b,c,d,e){return b instanceof a.AbstractVariable&&(b=new a.Expression(b),a.trace&&console.log("addExpression: Had to cast a var to an expression")),c=c||1,this.constant+=c*b.constant,b.terms.each(function(a,b){this.addVariable(a,b*c,d,e)},this),this},addVariable:function(b,c,d,e){null==c&&(c=1),a.trace&&console.log("c.Expression::addVariable():",b,c);var f=this.terms.get(b);if(f){var g=f+c;0==g||a.approx(g,0)?(e&&e.noteRemovedVariable(b,d),this.terms.delete(b)):this.setVariable(b,g)}else a.approx(c,0)||(this.setVariable(b,c),e&&e.noteAddedVariable(b,d));return this},setVariable:function(a,b){return this.terms.set(a,b),this},anyPivotableVariable:function(){if(this.isConstant)throw new a.InternalError("anyPivotableVariable called on a constant");var b=this.terms.escapingEach(function(a){return a.isPivotable?{retval:a}:void 0});return b&&void 0!==b.retval?b.retval:null},substituteOut:function(b,c,d,e){a.trace&&(a.fnenterprint("CLE:substituteOut: "+b+", "+c+", "+d+", ..."),a.traceprint("this = "+this));var f=this.setVariable.bind(this),g=this.terms,h=g.get(b);g.delete(b),this.constant+=h*c.constant,c.terms.each(function(b,c){var i=g.get(b);if(i){var j=i+h*c;a.approx(j,0)?(e.noteRemovedVariable(b,d),g.delete(b)):f(b,j)}else f(b,h*c),e&&e.noteAddedVariable(b,d)}),a.trace&&a.traceprint("Now this is "+this)},changeSubject:function(a,b){this.setVariable(a,this.newSubject(b))},newSubject:function(b){a.trace&&a.fnenterprint("newSubject:"+b);var c=1/this.terms.get(b);return this.terms.delete(b),this.multiplyMe(-c),c},coefficientFor:function(a){return this.terms.get(a)||0},get isConstant(){return 0==this.terms.size},toString:function(){var b="",c=!1;if(!a.approx(this.constant,0)||this.isConstant){if(b+=this.constant,this.isConstant)return b;c=!0}return this.terms.each(function(a,d){c&&(b+=" + "),b+=d+"*"+a,c=!0}),b},equals:function(b){return b===this?!0:b instanceof a.Expression&&b.constant===this.constant&&b.terms.equals(this.terms)},Plus:function(a,b){return a.plus(b)},Minus:function(a,b){return a.minus(b)},Times:function(a,b){return a.times(b)},Divide:function(a,b){return a.divide(b)}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.AbstractConstraint=a.inherit({initialize:function(b,c){this.hashCode=a._inc(),this.strength=b||a.Strength.required,this.weight=c||1},isEditConstraint:!1,isInequality:!1,isStayConstraint:!1,get required(){return this.strength===a.Strength.required},toString:function(){return this.strength+" {"+this.weight+"} ("+this.expression+")"}});var b=a.AbstractConstraint.prototype.toString,c=function(b,c,d){a.AbstractConstraint.call(this,c||a.Strength.strong,d),this.variable=b,this.expression=new a.Expression(b,-1,b.value)};a.EditConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isEditConstraint:!0,toString:function(){return"edit:"+b.call(this)}}),a.StayConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isStayConstraint:!0,toString:function(){return"stay:"+b.call(this)}});var d=a.Constraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(b,c,d){a.AbstractConstraint.call(this,c,d),this.expression=b}});a.Inequality=a.inherit({"extends":a.Constraint,_cloneOrNewCle:function(b){return b.clone?b.clone():new a.Expression(b)},initialize:function(b,c,e,f,g){var h=b instanceof a.Expression,i=e instanceof a.Expression,j=b instanceof a.AbstractVariable,k=e instanceof a.AbstractVariable,l="number"==typeof b,m="number"==typeof e;if((h||l)&&k){var n=b,o=c,p=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else if(j&&(i||m)){var n=e,o=c,p=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else{if(h&&m){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(l&&i){var s=e,o=c,t=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(h&&i){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(t),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(s));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(s),-1)}}else{if(h)return d.call(this,b,c,e);if(c==a.GEQ)d.call(this,new a.Expression(e),f,g),this.expression.multiplyMe(-1),this.expression.addVariable(b);else{if(c!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");d.call(this,new a.Expression(e),f,g),this.expression.addVariable(b,-1)}}}},isInequality:!0,toString:function(){return d.prototype.toString.call(this)+" >= 0) id: "+this.hashCode}}),a.Equation=a.inherit({"extends":a.Constraint,initialize:function(b,c,e,f){if(b instanceof a.Expression&&!c||c instanceof a.Strength)d.call(this,b,c,e);else if(b instanceof a.AbstractVariable&&c instanceof a.Expression){var g=b,h=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.AbstractVariable&&"number"==typeof c){var g=b,k=c,i=e,j=f;d.call(this,new a.Expression(k),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.Expression&&c instanceof a.AbstractVariable){var h=b,g=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else{if(!(b instanceof a.Expression||b instanceof a.AbstractVariable||"number"==typeof b)||!(c instanceof a.Expression||c instanceof a.AbstractVariable||"number"==typeof c))throw"Bad initializer to c.Equation";b=b instanceof a.Expression?b.clone():new a.Expression(b),c=c instanceof a.Expression?c.clone():new a.Expression(c),d.call(this,b,e,f),this.expression.addExpression(c,-1)}a.assert(this.strength instanceof a.Strength,"_strength not set")},toString:function(){return d.prototype.toString.call(this)+" = 0)"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.EditInfo=a.inherit({initialize:function(a,b,c,d,e){this.constraint=a,this.editPlus=b,this.editMinus=c,this.prevEditConstant=d,this.index=e},toString:function(){return"<cn="+this.constraint+", ep="+this.editPlus+", em="+this.editMinus+", pec="+this.prevEditConstant+", index="+this.index+">"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Tableau=a.inherit({initialize:function(){this.columns=new a.HashTable,this.rows=new a.HashTable,this._infeasibleRows=new a.HashSet,this._externalRows=new a.HashSet,this._externalParametricVars=new a.HashSet},noteRemovedVariable:function(b,c){a.trace&&console.log("c.Tableau::noteRemovedVariable: ",b,c);var d=this.columns.get(b);c&&d&&d.delete(c)},noteAddedVariable:function(a,b){b&&this.insertColVar(a,b)},getInternalInfo:function(){var a="Tableau Information:\n";return a+="Rows: "+this.rows.size,a+=" (= "+(this.rows.size-1)+" constraints)",a+="\nColumns: "+this.columns.size,a+="\nInfeasible Rows: "+this._infeasibleRows.size,a+="\nExternal basic variables: "+this._externalRows.size,a+="\nExternal parametric variables: ",a+=this._externalParametricVars.size,a+="\n"},toString:function(){var a="Tableau:\n";return this.rows.each(function(b,c){a+=b,a+=" <==> ",a+=c,a+="\n"}),a+="\nColumns:\n",a+=this.columns,a+="\nInfeasible rows: ",a+=this._infeasibleRows,a+="External basic variables: ",a+=this._externalRows,a+="External parametric variables: ",a+=this._externalParametricVars},insertColVar:function(b,c){var d=this.columns.get(b);d||(d=new a.HashSet,this.columns.set(b,d)),d.add(c)},addRow:function(b,c){a.trace&&a.fnenterprint("addRow: "+b+", "+c),this.rows.set(b,c),c.terms.each(function(a){this.insertColVar(a,b),a.isExternal&&this._externalParametricVars.add(a)},this),b.isExternal&&this._externalRows.add(b),a.trace&&a.traceprint(""+this)},removeColumn:function(b){a.trace&&a.fnenterprint("removeColumn:"+b);var c=this.columns.get(b);c?(this.columns.delete(b),c.each(function(a){var c=this.rows.get(a);c.terms.delete(b)},this)):a.trace&&console.log("Could not find var",b,"in columns"),b.isExternal&&(this._externalRows.delete(b),this._externalParametricVars.delete(b))},removeRow:function(b){a.trace&&a.fnenterprint("removeRow:"+b);var c=this.rows.get(b);return a.assert(null!=c),c.terms.each(function(c){var e=this.columns.get(c);null!=e&&(a.trace&&console.log("removing from varset:",b),e.delete(b))},this),this._infeasibleRows.delete(b),b.isExternal&&this._externalRows.delete(b),this.rows.delete(b),a.trace&&a.fnexitprint("returning "+c),c},substituteOut:function(b,c){a.trace&&a.fnenterprint("substituteOut:"+b+", "+c),a.trace&&a.traceprint(""+this);var d=this.columns.get(b);d.each(function(a){var d=this.rows.get(a);d.substituteOut(b,c,a,this),a.isRestricted&&0>d.constant&&this._infeasibleRows.add(a)},this),b.isExternal&&(this._externalRows.add(b),this._externalParametricVars.delete(b)),this.columns.delete(b)},columnsHasKey:function(a){return!!this.columns.get(a)}})}(this.c||module.parent.exports||{}),function(a){var b=a.Tableau,c=b.prototype,d=1e-8,e=a.Strength.weak;a.SimplexSolver=a.inherit({"extends":a.Tableau,initialize:function(){a.Tableau.call(this),this._stayMinusErrorVars=[],this._stayPlusErrorVars=[],this._errorVars=new a.HashTable,this._markerVars=new a.HashTable,this._objective=new a.ObjectiveVariable({name:"Z"}),this._editVarMap=new a.HashTable,this._editVarList=[],this._slackCounter=0,this._artificialCounter=0,this._dummyCounter=0,this.autoSolve=!0,this._fNeedsSolving=!1,this._optimizeCount=0,this.rows.set(this._objective,new a.Expression),this._stkCedcns=[0],a.trace&&a.traceprint("objective expr == "+this.rows.get(this._objective))},addLowerBound:function(b,c){var d=new a.Inequality(b,a.GEQ,new a.Expression(c));return this.addConstraint(d)},addUpperBound:function(b,c){var d=new a.Inequality(b,a.LEQ,new a.Expression(c));return this.addConstraint(d)},addBounds:function(a,b,c){return this.addLowerBound(a,b),this.addUpperBound(a,c),this},add:function(){for(var a=0;arguments.length>a;a++)this.addConstraint(arguments[a]);return this},addConstraint:function(b){a.trace&&a.fnenterprint("addConstraint: "+b);var c=Array(2),d=Array(1),e=this.newExpression(b,c,d);if(d=d[0],this.tryAddingDirectly(e)||this.addWithArtificialVariable(e),this._fNeedsSolving=!0,b.isEditConstraint){var f=this._editVarMap.size,g=c[0],h=c[1];!g instanceof a.SlackVariable&&console.warn("cvEplus not a slack variable =",g),!h instanceof a.SlackVariable&&console.warn("cvEminus not a slack variable =",h),a.debug&&console.log("new c.EditInfo("+b+", "+g+", "+h+", "+d+", "+f+")");var i=new a.EditInfo(b,g,h,d,f);this._editVarMap.set(b.variable,i),this._editVarList[f]={v:b.variable,info:i}}return this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},addConstraintNoException:function(b){a.trace&&a.fnenterprint("addConstraintNoException: "+b);try{return this.addConstraint(b),!0}catch(c){return!1}},addEditVar:function(b,c){return a.trace&&a.fnenterprint("addEditVar: "+b+" @ "+c),this.addConstraint(new a.EditConstraint(b,c||a.Strength.strong))},beginEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this._infeasibleRows.clear(),this._resetStayConstants(),this._stkCedcns.push(this._editVarMap.size),this},endEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this.resolve(),this._stkCedcns.pop(),this.removeEditVarsTo(this._stkCedcns[this._stkCedcns.length-1]),this},removeAllEditVars:function(){return this.removeEditVarsTo(0)},removeEditVarsTo:function(b){try{for(var c=this._editVarList.length,d=b;c>d;d++)this._editVarList[d]&&this.removeConstraint(this._editVarMap.get(this._editVarList[d].v).constraint);return this._editVarList.length=b,a.assert(this._editVarMap.size==b,"_editVarMap.size == n"),this}catch(e){throw new a.InternalError("Constraint not found in removeEditVarsTo")}},addPointStays:function(b){return a.trace&&console.log("addPointStays",b),b.forEach(function(a,b){this.addStay(a.x,e,Math.pow(2,b)),this.addStay(a.y,e,Math.pow(2,b))},this),this},addStay:function(b,c,d){var f=new a.StayConstraint(b,c||e,d||1);return this.addConstraint(f)},removeConstraint:function(a){return this.removeConstraintInternal(a),this},removeConstraintInternal:function(b){a.trace&&a.fnenterprint("removeConstraintInternal: "+b),a.trace&&a.traceprint(""+this),this._fNeedsSolving=!0,this._resetStayConstants();var c=this.rows.get(this._objective),d=this._errorVars.get(b);a.trace&&a.traceprint("eVars == "+d),null!=d&&d.each(function(e){var f=this.rows.get(e);null==f?c.addVariable(e,-b.weight*b.strength.symbolicWeight.value,this._objective,this):c.addExpression(f,-b.weight*b.strength.symbolicWeight.value,this._objective,this),a.trace&&a.traceprint("now eVars == "+d)},this);var e=this._markerVars.get(b);if(this._markerVars.delete(b),null==e)throw new a.InternalError("Constraint not found in removeConstraintInternal");if(a.trace&&a.traceprint("Looking to remove var "+e),null==this.rows.get(e)){var f=this.columns.get(e);a.trace&&a.traceprint("Must pivot -- columns are "+f);var g=null,h=0;f.each(function(b){if(b.isRestricted){var c=this.rows.get(b),d=c.coefficientFor(e);if(a.trace&&a.traceprint("Marker "+e+"'s coefficient in "+c+" is "+d),0>d){var f=-c.constant/d;(null==g||h>f||a.approx(f,h)&&b.hashCode<g.hashCode)&&(h=f,g=b)}}},this),null==g&&(a.trace&&a.traceprint("exitVar is still null"),f.each(function(a){if(a.isRestricted){var b=this.rows.get(a),c=b.coefficientFor(e),d=b.constant/c;(null==g||h>d)&&(h=d,g=a)}},this)),null==g&&(0==f.size?this.removeColumn(e):f.escapingEach(function(a){return a!=this._objective?(g=a,{brk:!0}):void 0},this)),null!=g&&this.pivot(e,g)}if(null!=this.rows.get(e)&&this.removeRow(e),null!=d&&d.each(function(a){a!=e&&this.removeColumn(a)},this),b.isStayConstraint){if(null!=d)for(var j=0;this._stayPlusErrorVars.length>j;j++)d.delete(this._stayPlusErrorVars[j]),d.delete(this._stayMinusErrorVars[j])}else if(b.isEditConstraint){a.assert(null!=d,"eVars != null");var k=this._editVarMap.get(b.variable);this.removeColumn(k.editMinus),this._editVarMap.delete(b.variable)}return null!=d&&this._errorVars.delete(d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},reset:function(){throw a.trace&&a.fnenterprint("reset"),new a.InternalError("reset not implemented")},resolveArray:function(b){a.trace&&a.fnenterprint("resolveArray"+b);var c=b.length;this._editVarMap.each(function(a,d){var e=d.index;c>e&&this.suggestValue(a,b[e])},this),this.resolve()},resolvePair:function(a,b){this.suggestValue(this._editVarList[0].v,a),this.suggestValue(this._editVarList[1].v,b),this.resolve()},resolve:function(){a.trace&&a.fnenterprint("resolve()"),this.dualOptimize(),this._setExternalVariables(),this._infeasibleRows.clear(),this._resetStayConstants()},suggestValue:function(b,c){a.trace&&console.log("suggestValue("+b+", "+c+")");var d=this._editVarMap.get(b);if(!d)throw new a.Error("suggestValue for variable "+b+", but var is not an edit variable");var e=c-d.prevEditConstant;return d.prevEditConstant=c,this.deltaEditConstant(e,d.editPlus,d.editMinus),this},solve:function(){return this._fNeedsSolving&&(this.optimize(this._objective),this._setExternalVariables()),this},setEditedValue:function(b,c){if(!this.columnsHasKey(b)&&null==this.rows.get(b))return b.value=c,this;if(!a.approx(c,b.value)){this.addEditVar(b),this.beginEdit();try{this.suggestValue(b,c)}catch(d){throw new a.InternalError("Error in setEditedValue")}this.endEdit()}return this},addVar:function(b){if(!this.columnsHasKey(b)&&null==this.rows.get(b)){try{this.addStay(b)}catch(c){throw new a.InternalError("Error in addVar -- required failure is impossible")}a.trace&&a.traceprint("added initial stay on "+b)}return this},getInternalInfo:function(){var a=c.getInternalInfo.call(this);return a+="\nSolver info:\n",a+="Stay Error Variables: ",a+=this._stayPlusErrorVars.length+this._stayMinusErrorVars.length,a+=" ("+this._stayPlusErrorVars.length+" +, ",a+=this._stayMinusErrorVars.length+" -)\n",a+="Edit Variables: "+this._editVarMap.size,a+="\n"},getDebugInfo:function(){return""+this+this.getInternalInfo()+"\n"},toString:function(){var a=c.getInternalInfo.call(this);return a+="\n_stayPlusErrorVars: ",a+="["+this._stayPlusErrorVars+"]",a+="\n_stayMinusErrorVars: ",a+="["+this._stayMinusErrorVars+"]",a+="\n",a+="_editVarMap:\n"+this._editVarMap,a+="\n"},getConstraintMap:function(){return this._markerVars},addWithArtificialVariable:function(b){a.trace&&a.fnenterprint("addWithArtificialVariable: "+b);var c=new a.SlackVariable({value:++this._artificialCounter,prefix:"a"}),d=new a.ObjectiveVariable({name:"az"}),e=b.clone();a.trace&&a.traceprint("before addRows:\n"+this),this.addRow(d,e),this.addRow(c,b),a.trace&&a.traceprint("after addRows:\n"+this),this.optimize(d);var f=this.rows.get(d);if(a.trace&&a.traceprint("azTableauRow.constant == "+f.constant),!a.approx(f.constant,0))throw this.removeRow(d),this.removeColumn(c),new a.RequiredFailure;var g=this.rows.get(c);if(null!=g){if(g.isConstant)return this.removeRow(c),this.removeRow(d),void 0;var h=g.anyPivotableVariable();this.pivot(h,c)}a.assert(null==this.rows.get(c),"rowExpression(av) == null"),this.removeColumn(c),this.removeRow(d)},tryAddingDirectly:function(b){a.trace&&a.fnenterprint("tryAddingDirectly: "+b);var c=this.chooseSubject(b);return null==c?(a.trace&&a.fnexitprint("returning false"),!1):(b.newSubject(c),this.columnsHasKey(c)&&this.substituteOut(c,b),this.addRow(c,b),a.trace&&a.fnexitprint("returning true"),!0)},chooseSubject:function(b){a.trace&&a.fnenterprint("chooseSubject: "+b);var c=null,d=!1,e=!1,f=b.terms,g=f.escapingEach(function(a,b){if(d){if(!a.isRestricted&&!this.columnsHasKey(a))return{retval:a}}else if(a.isRestricted){if(!e&&!a.isDummy&&0>b){var f=this.columns.get(a);(null==f||1==f.size&&this.columnsHasKey(this._objective))&&(c=a,e=!0)}}else c=a,d=!0},this);if(g&&void 0!==g.retval)return g.retval;if(null!=c)return c;var h=0,g=f.escapingEach(function(a,b){return a.isDummy?(this.columnsHasKey(a)||(c=a,h=b),void 0):{retval:null}},this);if(g&&void 0!==g.retval)return g.retval;if(!a.approx(b.constant,0))throw new a.RequiredFailure;return h>0&&b.multiplyMe(-1),c},deltaEditConstant:function(b,c,d){a.trace&&a.fnenterprint("deltaEditConstant :"+b+", "+c+", "+d);var e=this.rows.get(c);if(null!=e)return e.constant+=b,0>e.constant&&this._infeasibleRows.add(c),void 0;var f=this.rows.get(d);if(null!=f)return f.constant+=-b,0>f.constant&&this._infeasibleRows.add(d),void 0;var g=this.columns.get(d);g||console.log("columnVars is null -- tableau is:\n"+this),g.each(function(a){var c=this.rows.get(a),e=c.coefficientFor(d);c.constant+=e*b,a.isRestricted&&0>c.constant&&this._infeasibleRows.add(a)},this)},dualOptimize:function(){a.trace&&a.fnenterprint("dualOptimize:");for(var b=this.rows.get(this._objective);this._infeasibleRows.size;){var c=this._infeasibleRows.values()[0];this._infeasibleRows.delete(c);var d=null,e=this.rows.get(c);if(e&&0>e.constant){var g,f=Number.MAX_VALUE,h=e.terms;if(h.each(function(c,e){if(e>0&&c.isPivotable){var h=b.coefficientFor(c);g=h/e,(f>g||a.approx(g,f)&&c.hashCode<d.hashCode)&&(d=c,f=g)}}),f==Number.MAX_VALUE)throw new a.InternalError("ratio == nil (MAX_VALUE) in dualOptimize");this.pivot(d,c)}}},newExpression:function(b,c,d){a.trace&&(a.fnenterprint("newExpression: "+b),a.traceprint("cn.isInequality == "+b.isInequality),a.traceprint("cn.required == "+b.required));var e=b.expression,f=new a.Expression(e.constant),g=new a.SlackVariable,h=new a.DummyVariable,i=new a.SlackVariable,j=new a.SlackVariable,k=e.terms;if(k.each(function(a,b){var c=this.rows.get(a);c?f.addExpression(c,b):f.addVariable(a,b)},this),b.isInequality){if(a.trace&&a.traceprint("Inequality, adding slack"),++this._slackCounter,g=new a.SlackVariable({value:this._slackCounter,prefix:"s"}),f.setVariable(g,-1),this._markerVars.set(b,g),!b.required){++this._slackCounter,i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(i,1);
	var l=this.rows.get(this._objective);l.setVariable(i,b.strength.symbolicWeight.value*b.weight),this.insertErrorVar(b,i),this.noteAddedVariable(i,this._objective)}}else if(b.required)a.trace&&a.traceprint("Equality, required"),++this._dummyCounter,h=new a.DummyVariable({value:this._dummyCounter,prefix:"d"}),f.setVariable(h,1),this._markerVars.set(b,h),a.trace&&a.traceprint("Adding dummyVar == d"+this._dummyCounter);else{a.trace&&a.traceprint("Equality, not required"),++this._slackCounter,j=new a.SlackVariable({value:this._slackCounter,prefix:"ep"}),i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(j,-1),f.setVariable(i,1),this._markerVars.set(b,j);var l=this.rows.get(this._objective);a.trace&&console.log(l);var m=b.strength.symbolicWeight.value*b.weight;0==m&&(a.trace&&a.traceprint("cn == "+b),a.trace&&a.traceprint("adding "+j+" and "+i+" with swCoeff == "+m)),l.setVariable(j,m),this.noteAddedVariable(j,this._objective),l.setVariable(i,m),this.noteAddedVariable(i,this._objective),this.insertErrorVar(b,i),this.insertErrorVar(b,j),b.isStayConstraint?(this._stayPlusErrorVars.push(j),this._stayMinusErrorVars.push(i)):b.isEditConstraint&&(c[0]=j,c[1]=i,d[0]=e.constant)}return 0>f.constant&&f.multiplyMe(-1),a.trace&&a.fnexitprint("returning "+f),f},optimize:function(b){a.trace&&a.fnenterprint("optimize: "+b),a.trace&&a.traceprint(""+this),this._optimizeCount++;var c=this.rows.get(b);a.assert(null!=c,"zRow != null");for(var g,h,e=null,f=null;;){if(g=0,h=c.terms,h.escapingEach(function(a,b){return a.isPivotable&&g>b?(g=b,e=a,{brk:1}):void 0},this),g>=-d)return;a.trace&&console.log("entryVar:",e,"objectiveCoeff:",g);var i=Number.MAX_VALUE,j=this.columns.get(e),k=0;if(j.each(function(b){if(a.trace&&a.traceprint("Checking "+b),b.isPivotable){var c=this.rows.get(b),d=c.coefficientFor(e);a.trace&&a.traceprint("pivotable, coeff = "+d),0>d&&(k=-c.constant/d,(i>k||a.approx(k,i)&&b.hashCode<f.hashCode)&&(i=k,f=b))}},this),i==Number.MAX_VALUE)throw new a.InternalError("Objective function is unbounded in optimize");this.pivot(e,f),a.trace&&a.traceprint(""+this)}},pivot:function(b,c){a.trace&&console.log("pivot: ",b,c);var d=!1;d&&console.time(" SimplexSolver::pivot"),null==b&&console.warn("pivot: entryVar == null"),null==c&&console.warn("pivot: exitVar == null"),d&&console.time("  removeRow");var e=this.removeRow(c);d&&console.timeEnd("  removeRow"),d&&console.time("  changeSubject"),e.changeSubject(c,b),d&&console.timeEnd("  changeSubject"),d&&console.time("  substituteOut"),this.substituteOut(b,e),d&&console.timeEnd("  substituteOut"),d&&console.time("  addRow"),this.addRow(b,e),d&&console.timeEnd("  addRow"),d&&console.timeEnd(" SimplexSolver::pivot")},_resetStayConstants:function(){a.trace&&console.log("_resetStayConstants");for(var b=0;this._stayPlusErrorVars.length>b;b++){var c=this.rows.get(this._stayPlusErrorVars[b]);null==c&&(c=this.rows.get(this._stayMinusErrorVars[b])),null!=c&&(c.constant=0)}},_setExternalVariables:function(){a.trace&&a.fnenterprint("_setExternalVariables:"),a.trace&&a.traceprint(""+this),this._externalParametricVars.each(function(b){null!=this.rows.get(b)?a.trace&&console.log("Error: variable"+b+" in _externalParametricVars is basic"):b.value=0},this),this._externalRows.each(function(a){var b=this.rows.get(a);a.value!=b.constant&&(a.value=b.constant)},this),this._fNeedsSolving=!1,this.onsolved()},onsolved:function(){},insertErrorVar:function(b,c){a.trace&&a.fnenterprint("insertErrorVar:"+b+", "+c);var d=this._errorVars.get(c);d||(d=new a.HashSet,this._errorVars.set(b,d)),d.add(c)}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Timer=a.inherit({initialize:function(){this.isRunning=!1,this._elapsedMs=0},start:function(){return this.isRunning=!0,this._startReading=new Date,this},stop:function(){return this.isRunning=!1,this._elapsedMs+=new Date-this._startReading,this},reset:function(){return this.isRunning=!1,this._elapsedMs=0,this},elapsedTime:function(){return this.isRunning?(this._elapsedMs+(new Date-this._startReading))/1e3:this._elapsedMs/1e3}})}(this.c||module.parent.exports||{}),__cassowary_parser=function(){function a(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var b={parse:function(b,c){function k(a){g>e||(e>g&&(g=e,h=[]),h.push(a))}function l(){var a,b,c,d,f;if(d=e,f=e,a=z(),null!==a){if(c=m(),null!==c)for(b=[];null!==c;)b.push(c),c=m();else b=null;null!==b?(c=z(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)}else a=null,e=f;return null!==a&&(a=function(a,b){return b}(d,a[1])),null===a&&(e=d),a}function m(){var a,b,c,d;return c=e,d=e,a=P(),null!==a?(b=s(),null!==b?a=[a,b]:(a=null,e=d)):(a=null,e=d),null!==a&&(a=function(a,b){return b}(c,a[0])),null===a&&(e=c),a}function n(){var a;return b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),a}function o(){var a;return/^[a-zA-Z]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[a-zA-Z]")),null===a&&(36===b.charCodeAt(e)?(a="$",e++):(a=null,0===f&&k('"$"')),null===a&&(95===b.charCodeAt(e)?(a="_",e++):(a=null,0===f&&k('"_"')))),a}function p(){var a;return f++,/^[\t\x0B\f \xA0\uFEFF]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\t\\x0B\\f \\xA0\\uFEFF]")),f--,0===f&&null===a&&k("whitespace"),a}function q(){var a;return/^[\n\r\u2028\u2029]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\n\\r\\u2028\\u2029]")),a}function r(){var a;return f++,10===b.charCodeAt(e)?(a="\n",e++):(a=null,0===f&&k('"\\n"')),null===a&&("\r\n"===b.substr(e,2)?(a="\r\n",e+=2):(a=null,0===f&&k('"\\r\\n"')),null===a&&(13===b.charCodeAt(e)?(a="\r",e++):(a=null,0===f&&k('"\\r"')),null===a&&(8232===b.charCodeAt(e)?(a="\u2028",e++):(a=null,0===f&&k('"\\u2028"')),null===a&&(8233===b.charCodeAt(e)?(a="\u2029",e++):(a=null,0===f&&k('"\\u2029"')))))),f--,0===f&&null===a&&k("end of line"),a}function s(){var a,c,d;return d=e,a=z(),null!==a?(59===b.charCodeAt(e)?(c=";",e++):(c=null,0===f&&k('";"')),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=y(),null!==a?(c=r(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=z(),null!==a?(c=t(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d))),a}function t(){var a,c;return c=e,f++,b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),f--,null===a?a="":(a=null,e=c),a}function u(){var a;return f++,a=v(),null===a&&(a=x()),f--,0===f&&null===a&&k("comment"),a}function v(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function w(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=q()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=q()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function x(){var a,c,d,g,h,i,j;if(h=e,"//"===b.substr(e,2)?(a="//",e+=2):(a=null,0===f&&k('"//"')),null!==a){for(c=[],i=e,j=e,f++,d=q(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,d=q(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?a=[a,c]:(a=null,e=h)}else a=null,e=h;return a}function y(){var a,b;for(a=[],b=p(),null===b&&(b=w(),null===b&&(b=x()));null!==b;)a.push(b),b=p(),null===b&&(b=w(),null===b&&(b=x()));return a}function z(){var a,b;for(a=[],b=p(),null===b&&(b=r(),null===b&&(b=u()));null!==b;)a.push(b),b=p(),null===b&&(b=r(),null===b&&(b=u()));return a}function A(){var a,b;return b=e,a=C(),null===a&&(a=B()),null!==a&&(a=function(a,b){return{type:"NumericLiteral",value:b}}(b,a)),null===a&&(e=b),a}function B(){var a,c,d;if(d=e,/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]")),null!==c)for(a=[];null!==c;)a.push(c),/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]"));else a=null;return null!==a&&(a=function(a,b){return parseInt(b.join(""))}(d,a)),null===a&&(e=d),a}function C(){var a,c,d,g,h;return g=e,h=e,a=B(),null!==a?(46===b.charCodeAt(e)?(c=".",e++):(c=null,0===f&&k('"."')),null!==c?(d=B(),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)):(a=null,e=h),null!==a&&(a=function(a,b){return parseFloat(b.join(""))}(g,a)),null===a&&(e=g),a}function D(){var a,c,d,g;if(g=e,/^[\-+]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\-+]")),a=null!==a?a:"",null!==a){if(/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]")),null!==d)for(c=[];null!==d;)c.push(d),/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]"));else c=null;null!==c?a=[a,c]:(a=null,e=g)}else a=null,e=g;return a}function E(){var a,b;return f++,b=e,a=F(),null!==a&&(a=function(a,b){return b}(b,a)),null===a&&(e=b),f--,0===f&&null===a&&k("identifier"),a}function F(){var a,b,c,d,g;if(f++,d=e,g=e,a=o(),null!==a){for(b=[],c=o();null!==c;)b.push(c),c=o();null!==b?a=[a,b]:(a=null,e=g)}else a=null,e=g;return null!==a&&(a=function(a,b,c){return b+c.join("")}(d,a[0],a[1])),null===a&&(e=d),f--,0===f&&null===a&&k("identifier"),a}function G(){var a,c,d,g,h,i,j;return i=e,a=E(),null!==a&&(a=function(a,b){return{type:"Variable",name:b}}(i,a)),null===a&&(e=i),null===a&&(a=A(),null===a&&(i=e,j=e,40===b.charCodeAt(e)?(a="(",e++):(a=null,0===f&&k('"("')),null!==a?(c=z(),null!==c?(d=P(),null!==d?(g=z(),null!==g?(41===b.charCodeAt(e)?(h=")",e++):(h=null,0===f&&k('")"')),null!==h?a=[a,c,d,g,h]:(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j),null!==a&&(a=function(a,b){return b}(i,a[2])),null===a&&(e=i))),a}function H(){var a,b,c,d,f;return a=G(),null===a&&(d=e,f=e,a=I(),null!==a?(b=z(),null!==b?(c=H(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)):(a=null,e=f),null!==a&&(a=function(a,b,c){return{type:"UnaryExpression",operator:b,expression:c}}(d,a[0],a[2])),null===a&&(e=d)),a}function I(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"')),null===a&&(33===b.charCodeAt(e)?(a="!",e++):(a=null,0===f&&k('"!"')))),a}function J(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=H(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=K(),null!==d?(f=z(),null!==f?(g=H(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=K(),null!==d?(f=z(),null!==f?(g=H(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;c.length>e;e++)d={type:"MultiplicativeExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function K(){var a;return 42===b.charCodeAt(e)?(a="*",e++):(a=null,0===f&&k('"*"')),null===a&&(47===b.charCodeAt(e)?(a="/",e++):(a=null,0===f&&k('"/"'))),a}function L(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=J(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=M(),null!==d?(f=z(),null!==f?(g=J(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=M(),null!==d?(f=z(),null!==f?(g=J(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;c.length>e;e++)d={type:"AdditiveExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function M(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"'))),a}function N(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=L(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=O(),null!==d?(f=z(),null!==f?(g=L(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=O(),null!==d?(f=z(),null!==f?(g=L(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;c.length>e;e++)d={type:"Inequality",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function O(){var a;return"<="===b.substr(e,2)?(a="<=",e+=2):(a=null,0===f&&k('"<="')),null===a&&(">="===b.substr(e,2)?(a=">=",e+=2):(a=null,0===f&&k('">="')),null===a&&(60===b.charCodeAt(e)?(a="<",e++):(a=null,0===f&&k('"<"')),null===a&&(62===b.charCodeAt(e)?(a=">",e++):(a=null,0===f&&k('">"'))))),a}function P(){var a,c,d,g,h,i,j,l,m;if(j=e,l=e,a=N(),null!==a){for(c=[],m=e,d=z(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=z(),null!==h?(i=N(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==d;)c.push(d),m=e,d=z(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=z(),null!==h?(i=N(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==c?a=[a,c]:(a=null,e=l)}else a=null,e=l;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;c.length>e;e++)d={type:"Equality",operator:c[e][1],left:d,right:c[e][3]};return d}(j,a[0],a[1])),null===a&&(e=j),a}function Q(a){a.sort();for(var b=null,c=[],d=0;a.length>d;d++)a[d]!==b&&(c.push(a[d]),b=a[d]);return c}function R(){for(var a=1,c=1,d=!1,f=0;Math.max(e,g)>f;f++){var h=b.charAt(f);"\n"===h?(d||a++,c=1,d=!1):"\r"===h||"\u2028"===h||"\u2029"===h?(a++,c=1,d=!0):(c++,d=!1)}return{line:a,column:c}}var d={start:l,Statement:m,SourceCharacter:n,IdentifierStart:o,WhiteSpace:p,LineTerminator:q,LineTerminatorSequence:r,EOS:s,EOF:t,Comment:u,MultiLineComment:v,MultiLineCommentNoLineTerminator:w,SingleLineComment:x,_:y,__:z,Literal:A,Integer:B,Real:C,SignedInteger:D,Identifier:E,IdentifierName:F,PrimaryExpression:G,UnaryExpression:H,UnaryOperator:I,MultiplicativeExpression:J,MultiplicativeOperator:K,AdditiveExpression:L,AdditiveOperator:M,InequalityExpression:N,InequalityOperator:O,LinearExpression:P};if(void 0!==c){if(void 0===d[c])throw Error("Invalid rule name: "+a(c)+".")}else c="start";var e=0,f=0,g=0,h=[],S=d[c]();if(null===S||e!==b.length){var T=Math.max(e,g),U=b.length>T?b.charAt(T):null,V=R();throw new this.SyntaxError(Q(h),U,T,V.line,V.column)}return S},toSource:function(){return this._source}};return b.SyntaxError=function(b,c,d,e,f){function g(b,c){var d,e;switch(b.length){case 0:d="end of input";break;case 1:d=b[0];break;default:d=b.slice(0,b.length-1).join(", ")+" or "+b[b.length-1]}return e=c?a(c):"end of input","Expected "+d+" but "+e+" found."}this.name="SyntaxError",this.expected=b,this.found=c,this.message=g(b,c),this.offset=d,this.line=e,this.column=f},b.SyntaxError.prototype=Error.prototype,b}();
	}).call(
	  (true) ?
	      (module.compiled = true && module) : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ../~/webpack/buildin/module.js */ 46)(module)))

/***/ },
/* 46 */
/*!**************************************!*\
  !*** ../~/webpack/buildin/module.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 47 */
/*!*********************************************!*\
  !*** ../~/autolayout.js/dist/autolayout.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {/**
	* This Source Code is licensed under the MIT license. If a copy of the
	* MIT-license was not distributed with this file, You can obtain one at:
	* http://opensource.org/licenses/mit-license.html.
	*
	* @author: Hein Rutjes (IjzerenHein)
	* @license MIT
	* @copyright Gloey Apps, 2015
	*
	* @library autolayout.js
	* @version 0.0.1
	* @generated 06-06-2015
	*/
	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AutoLayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	/**
	 * Layout attributes.
	 * @enum {String}
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var Attribute = {
	    CONST: 'const',
	    NOTANATTRIBUTE: 'const',
	    /** left aligned */
	    LEFT: 'left',
	    /** right aligned */
	    RIGHT: 'right',
	    TOP: 'top',
	    BOTTOM: 'bottom',
	    WIDTH: 'width',
	    HEIGHT: 'height',
	    CENTERX: 'centerX',
	    CENTERY: 'centerY'
	    /*LEADING: 'leading',
	    TRAILING: 'trailing'*/
	};
	exports['default'] = Attribute;
	module.exports = exports['default'];
	
	},{}],2:[function(require,module,exports){
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Attribute = require('./Attribute');
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	var _Relation = require('./Relation');
	
	var _Relation2 = _interopRequireDefault(_Relation);
	
	var _VisualFormat = require('./VisualFormat');
	
	var _VisualFormat2 = _interopRequireDefault(_VisualFormat);
	
	var _View = require('./View');
	
	var _View2 = _interopRequireDefault(_View);
	
	var _SubView = require('./SubView');
	
	var _SubView2 = _interopRequireDefault(_SubView);
	
	/**
	 * AutoLayout.
	 *
	 * @namespace AutoLayout
	 * @property {Attribute} Attribute
	 * @property {Relation} Relation
	 * @property {VisualFormat} VisualFormat
	 * @property {View} View
	 * @property {SubView} SubView
	 */
	var AutoLayout = {
	  Attribute: _Attribute2['default'],
	  Relation: _Relation2['default'],
	  VisualFormat: _VisualFormat2['default'],
	  View: _View2['default'],
	  SubView: _SubView2['default']
	};
	
	exports['default'] = AutoLayout;
	module.exports = exports['default'];
	
	},{"./Attribute":1,"./Relation":3,"./SubView":4,"./View":5,"./VisualFormat":6}],3:[function(require,module,exports){
	/**
	 * Relation types.
	 * @enum {String}
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var Relation = {
	    /** Less than or equal */
	    LEQ: 'leq',
	    /** Equal */
	    EQU: 'equ',
	    /** Greater than or equal */
	    GEQ: 'geq'
	};
	exports['default'] = Relation;
	module.exports = exports['default'];
	
	},{}],4:[function(require,module,exports){
	(function (global){
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _cassowaryBinC = (typeof window !== "undefined" ? window.c : typeof global !== "undefined" ? global.c : null);
	
	var _cassowaryBinC2 = _interopRequireDefault(_cassowaryBinC);
	
	var _Attribute = require('./Attribute');
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	/**
	 * A SubView is automatically generated when constraints are added to a View.
	 *
	 * @class SubView
	 * @param {Object} name Name of the sub-view.
	 */
	
	var SubView = (function () {
	    function SubView(options) {
	        _classCallCheck(this, SubView);
	
	        this._name = options.name;
	        this._solver = options.solver;
	        this._attr = {};
	        if (!options.name) {
	            this._attr[_Attribute2['default'].LEFT] = new _cassowaryBinC2['default'].Variable({ value: 0 });
	            this._solver.addConstraint(new _cassowaryBinC2['default'].StayConstraint(this._attr[_Attribute2['default'].LEFT], _cassowaryBinC2['default'].Strength.required, 0));
	            this._attr[_Attribute2['default'].TOP] = new _cassowaryBinC2['default'].Variable({ value: 0 });
	            this._solver.addConstraint(new _cassowaryBinC2['default'].StayConstraint(this._attr[_Attribute2['default'].TOP], _cassowaryBinC2['default'].Strength.required, 0));
	            this._attr[_Attribute2['default'].WIDTH] = new _cassowaryBinC2['default'].Variable({ value: 0 });
	            this._solver.addEditVar(this._attr[_Attribute2['default'].WIDTH]);
	            this._attr[_Attribute2['default'].HEIGHT] = new _cassowaryBinC2['default'].Variable({ value: 0 });
	            this._solver.addEditVar(this._attr[_Attribute2['default'].HEIGHT]);
	        }
	    }
	
	    _createClass(SubView, [{
	        key: 'name',
	
	        /**
	         * Name of the sub-view.
	         * @type {String}
	         */
	        get: function () {
	            return this._name;
	        }
	    }, {
	        key: 'left',
	
	        /**
	         * Left value (`Attribute.LEFT`).
	         * @type {Number}
	         */
	        get: function () {
	            return this._getAttr(_Attribute2['default'].LEFT).value;
	        }
	    }, {
	        key: 'right',
	
	        /**
	         * Right value (`Attribute.RIGHT`).
	         * @type {Number}
	         */
	        get: function () {
	            return this._getAttr(_Attribute2['default'].RIGHT).value;
	        }
	    }, {
	        key: 'width',
	
	        /**
	         * Width value (`Attribute.WIDTH`).
	         * @type {Number}
	         */
	        get: function () {
	            return this._getAttr(_Attribute2['default'].WIDTH).value;
	        }
	    }, {
	        key: 'height',
	
	        /**
	         * Height value (`Attribute.HEIGHT`).
	         * @type {Number}
	         */
	        get: function () {
	            return this._getAttr(_Attribute2['default'].HEIGHT).value;
	        }
	    }, {
	        key: 'top',
	
	        /**
	         * Top value (`Attribute.TOP`).
	         * @type {Number}
	         */
	        get: function () {
	            return this._getAttr(_Attribute2['default'].TOP).value;
	        }
	    }, {
	        key: 'bottom',
	
	        /**
	         * Bottom value (`Attribute.BOTTOM`).
	         * @type {Number}
	         */
	        get: function () {
	            return this._getAttr(_Attribute2['default'].BOTTOM).value;
	        }
	    }, {
	        key: 'centerX',
	
	        /**
	         * Horizontal center (`Attribute.CENTERX`).
	         * @type {Number}
	         */
	        get: function () {
	            return this._getAttr(_Attribute2['default'].CENTERX).value;
	        }
	    }, {
	        key: 'centerY',
	
	        /**
	         * Vertical center (`Attribute.CENTERY`).
	         * @type {Number}
	         */
	        get: function () {
	            return this._getAttr(_Attribute2['default'].CENTERY).value;
	        }
	    }, {
	        key: 'getValue',
	
	        /**
	         * Gets the value of one of the attributes.
	         *
	         * @param {String|Attribute} attr Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
	         * @return {Number} value or `undefined`
	         */
	        value: function getValue(attr) {
	            return this._attr[attr] ? this._attr[attr].value : undefined;
	        }
	    }, {
	        key: '_getAttr',
	
	        /**
	         * @private
	         */
	        value: function _getAttr(attr) {
	            if (this._attr[attr]) {
	                return this._attr[attr];
	            }
	            switch (attr) {
	                case _Attribute2['default'].LEFT:
	                case _Attribute2['default'].TOP:
	                case _Attribute2['default'].WIDTH:
	                case _Attribute2['default'].HEIGHT:
	                    this._attr[attr] = new _cassowaryBinC2['default'].Variable({ value: 0 });
	                    break;
	                case _Attribute2['default'].RIGHT:
	                    this._getAttr(_Attribute2['default'].LEFT);
	                    this._getAttr(_Attribute2['default'].WIDTH);
	                    this._attr[_Attribute2['default'].RIGHT] = new _cassowaryBinC2['default'].Variable();
	                    this._solver.addConstraint(new _cassowaryBinC2['default'].Equation(this._attr[_Attribute2['default'].RIGHT], _cassowaryBinC2['default'].plus(this._attr[_Attribute2['default'].LEFT], this._attr[_Attribute2['default'].WIDTH])));
	                    break;
	                case _Attribute2['default'].BOTTOM:
	                    this._getAttr(_Attribute2['default'].TOP);
	                    this._getAttr(_Attribute2['default'].HEIGHT);
	                    this._attr[_Attribute2['default'].BOTTOM] = new _cassowaryBinC2['default'].Variable();
	                    this._solver.addConstraint(new _cassowaryBinC2['default'].Equation(this._attr[_Attribute2['default'].BOTTOM], _cassowaryBinC2['default'].plus(this._attr[_Attribute2['default'].TOP], this._attr[_Attribute2['default'].HEIGHT])));
	                    break;
	                case _Attribute2['default'].CENTERX:
	                    this._getAttr(_Attribute2['default'].LEFT);
	                    this._getAttr(_Attribute2['default'].WIDTH);
	                    this._attr[_Attribute2['default'].CENTERX] = new _cassowaryBinC2['default'].Variable();
	                    this._solver.addConstraint(new _cassowaryBinC2['default'].Equation(this._attr[_Attribute2['default'].CENTERX], _cassowaryBinC2['default'].plus(this._attr[_Attribute2['default'].LEFT], _cassowaryBinC2['default'].divide(this._attr[_Attribute2['default'].WIDTH], 2))));
	                    break;
	                case _Attribute2['default'].CENTERY:
	                    this._getAttr(_Attribute2['default'].TOP);
	                    this._getAttr(_Attribute2['default'].HEIGHT);
	                    this._attr[_Attribute2['default'].CENTERY] = new _cassowaryBinC2['default'].Variable();
	                    this._solver.addConstraint(new _cassowaryBinC2['default'].Equation(this._attr[_Attribute2['default'].CENTERY], _cassowaryBinC2['default'].plus(this._attr[_Attribute2['default'].TOP], _cassowaryBinC2['default'].divide(this._attr[_Attribute2['default'].HEIGHT], 2))));
	                    break;
	            }
	            return this._attr[attr];
	        }
	    }]);
	
	    return SubView;
	})();
	
	exports['default'] = SubView;
	module.exports = exports['default'];
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"./Attribute":1}],5:[function(require,module,exports){
	(function (global){
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _cassowaryBinC = (typeof window !== "undefined" ? window.c : typeof global !== "undefined" ? global.c : null);
	
	var _cassowaryBinC2 = _interopRequireDefault(_cassowaryBinC);
	
	var _VisualFormat = require('./VisualFormat');
	
	var _VisualFormat2 = _interopRequireDefault(_VisualFormat);
	
	var _Attribute = require('./Attribute');
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	var _Relation = require('./Relation');
	
	var _Relation2 = _interopRequireDefault(_Relation);
	
	var _SubView = require('./SubView');
	
	var _SubView2 = _interopRequireDefault(_SubView);
	
	function _getConst(name, value) {
	    var vr = new _cassowaryBinC2['default'].Variable({ value: value });
	    this._solver.addConstraint(new _cassowaryBinC2['default'].StayConstraint(vr, _cassowaryBinC2['default'].Strength.required, 0));
	    return vr;
	}
	
	function _getSubView(viewName) {
	    if (!viewName) {
	        return this._parentSubView;
	    } else {
	        this._subViews[viewName] = this._subViews[viewName] || new _SubView2['default']({
	            name: viewName,
	            solver: this._solver
	        });
	        return this._subViews[viewName];
	    }
	}
	
	function _addConstraint(constraint) {
	    //this.constraints.push(constraint);
	    var attr1 = _getSubView.call(this, constraint.view1)._getAttr(constraint.attr1);
	    var attr2 = constraint.attr2 === _Attribute2['default'].CONST ? _getConst.call(this, undefined, constraint.constant) : _getSubView.call(this, constraint.view2)._getAttr(constraint.attr2);
	    var relation = undefined;
	    switch (constraint.relation) {
	        case _Relation2['default'].LEQ:
	            //relation = new c.Inequality(attr1, c.LEQ, c.plus(attr2, )
	            break;
	        case _Relation2['default'].EQU:
	            if (constraint.multiplier === 1 && !constraint.constant || constraint.attr2 === _Attribute2['default'].CONST) {
	                relation = new _cassowaryBinC2['default'].Equation(attr1, attr2);
	            } else if (constraint.multiplier !== 1 && constraint.constant) {
	                throw 'todo';
	            } else if (constraint.constant) {
	                relation = new _cassowaryBinC2['default'].Equation(attr2, _cassowaryBinC2['default'].plus(attr1, constraint.constant));
	            } else {
	                throw 'todo';
	            }
	            break;
	        case _Relation2['default'].GEQ:
	            break;
	        default:
	            throw 'Invalid relation specified: ' + constraint.relation;
	    }
	    this._solver.addConstraint(relation);
	}
	
	var View = (function () {
	
	    /**
	     * @class View
	     * @param {Object} [options] Configuration options.
	     * @param {Number} [options.width] Initial width of the view.
	     * @param {Number} [options.height] Initial height of the view.
	     * @param {Object|Array} [options.constraints] One or more constraint definitions.
	     * @param {String|Array} [options.visualFormat] Visual format string or array of vfl strings.
	     */
	
	    function View(options) {
	        _classCallCheck(this, View);
	
	        this._solver = new _cassowaryBinC2['default'].SimplexSolver();
	        this._subViews = {};
	        this._parentSubView = new _SubView2['default']({
	            solver: this._solver
	        });
	        //this.constraints = [];
	        if (options) {
	            if (options.width !== undefined || options.height !== undefined) {
	                this.setSize(options.width, options.height);
	            }
	            if (options.constraints) {
	                this.addConstraints(options.constraints);
	            }
	            if (options.visualFormat) {
	                this.addVisualFormat(options.visualFormat);
	            }
	        }
	    }
	
	    _createClass(View, [{
	        key: 'setSize',
	
	        /**
	         * Sets the width and height of the view.
	         *
	         * @param {Number} width Width of the view.
	         * @param {Number} height Height of the view.
	         * @return {AutoLayout} this
	         */
	        value: function setSize(width, height /*, depth*/) {
	            if (this._width === width && this._height === height) {
	                return undefined;
	            }
	            if (width !== undefined && this._width !== width) {
	                this._width = width;
	                this._solver.suggestValue(this._parentSubView._getAttr(_Attribute2['default'].WIDTH), this._width);
	            }
	            if (height !== undefined && this._height !== height) {
	                this._height = height;
	                this._solver.suggestValue(this._parentSubView._getAttr(_Attribute2['default'].HEIGHT), this._height);
	            }
	            this._solver.resolve();
	            return this;
	        }
	    }, {
	        key: 'width',
	
	        /**
	         * Width that was set using `setSize`.
	         * @type {Number}
	         */
	        get: function () {
	            return this._width;
	        }
	    }, {
	        key: 'height',
	
	        /**
	         * Height that was set using `setSize`.
	         * @type {Number}
	         */
	        get: function () {
	            return this._height;
	        }
	    }, {
	        key: 'addConstraint',
	
	        /**
	         * Adds one or more constraint definitions.
	         *
	         * A constraint definition has the following format:
	         *
	         * ```javascript
	         * constraint: {
	         *   view1: {String},
	         *   attr1: {AutoLayout.Attribute},
	         *   relation: {AutoLayout.Relation},
	         *   view2: {String},
	         *   attr2: {AutoLayout.Attribute},
	         *   multiplier: {Number},
	         *   constant: {Number}
	         * }
	         * ```
	         * @param {Object|Array} constraints One or more constraint definitions.
	         * @return {AutoLayout} this
	         */
	        value: function addConstraint(constraint) {
	            if (Array.isArray(constraint)) {
	                for (var i = 0; i < constraint.length; i++) {
	                    _addConstraint.call(this, constraint[i]);
	                }
	            } else {
	                _addConstraint.call(this, constraint);
	            }
	            return this;
	        }
	    }, {
	        key: 'addVisualFormat',
	
	        /**
	         * Adds one or more constraints from a visual-format definition.
	         * See `VisualFormat.parse`.
	         *
	         * @param {String|Array} visualFormat Visual format string or array of vfl strings.
	         * @return {AutoLayout} this
	         */
	        value: function addVisualFormat(visualFormat) {
	            return this.addConstraint(_VisualFormat2['default'].parse(visualFormat));
	        }
	    }, {
	        key: 'subViews',
	
	        /**
	         * Dictionary of `SubView` objects that have been created when adding constraints.
	         * @type {Object.SubView}
	         */
	        get: function () {
	            return this._subViews;
	        }
	    }]);
	
	    return View;
	})();
	
	exports['default'] = View;
	module.exports = exports['default'];
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"./Attribute":1,"./Relation":3,"./SubView":4,"./VisualFormat":6}],6:[function(require,module,exports){
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _parserParser = require('./parser/parser');
	
	var _parserParser2 = _interopRequireDefault(_parserParser);
	
	var _Attribute = require('./Attribute');
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	/**
	 * VisualFormat
	 *
	 * @namespace VisualFormat
	 */
	
	var VisualFormat = (function () {
	    function VisualFormat() {
	        _classCallCheck(this, VisualFormat);
	    }
	
	    _createClass(VisualFormat, null, [{
	        key: 'parseLine',
	
	        /**
	         * Parses a single line of vfl into an array of constraint definitions.
	         *
	         * @param {String} visualFormat Visual format string (cannot contain line-endings!).
	         * @return {Array} Array of constraint definitions.
	         */
	        value: function parseLine(visualFormat) {
	            if (visualFormat.length === 0) {
	                return [];
	            }
	            var constraints = [];
	            var res = _parserParser2['default'].parse(visualFormat);
	            var horizontal = res.orientation === 'horizontal';
	            var view1 = undefined;
	            var view2 = undefined;
	            var relation = undefined;
	            var attr1 = undefined;
	            var attr2 = undefined;
	            var item = undefined;
	            for (var i = 0; i < res.cascade.length; i++) {
	                item = res.cascade[i];
	                if (!Array.isArray(item) && item.hasOwnProperty('view')) {
	                    view1 = view2;
	                    view2 = item.view;
	                    if (view1 !== undefined && view2 !== undefined && relation) {
	                        attr1 = horizontal ? _Attribute2['default'].RIGHT : _Attribute2['default'].BOTTOM;
	                        attr2 = horizontal ? _Attribute2['default'].LEFT : _Attribute2['default'].TOP;
	                        if (!view1) {
	                            attr1 = horizontal ? _Attribute2['default'].LEFT : _Attribute2['default'].TOP;
	                        }
	                        if (!view2) {
	                            attr2 = horizontal ? _Attribute2['default'].RIGHT : _Attribute2['default'].BOTTOM;
	                        }
	                        constraints.push({
	                            view1: view1,
	                            attr1: attr1,
	                            relation: relation.relation,
	                            view2: view2,
	                            attr2: attr2,
	                            multiplier: 1,
	                            constant: relation.constant
	                        });
	                    }
	                    relation = undefined;
	
	                    // process view size constraints
	                    if (item.constraints) {
	                        for (var n = 0; n < item.constraints.length; n++) {
	                            constraints.push({
	                                view1: item.view,
	                                attr1: horizontal ? _Attribute2['default'].WIDTH : _Attribute2['default'].HEIGHT,
	                                relation: item.constraints[n].relation,
	                                view2: undefined,
	                                attr2: _Attribute2['default'].CONST,
	                                multiplier: 1,
	                                constant: item.constraints[n].constant
	                            });
	                        }
	                    }
	                } else {
	                    relation = item[0];
	                }
	            }
	            return constraints;
	        }
	    }, {
	        key: 'parse',
	
	        /**
	         * Parses one or more visual format strings into an array of constraint definitions.
	         *
	         * @param {String|Array} visualFormat One or more visual format strings.
	         * @param {String} [lineSeperator] String that defines the end of a line (default `\n`)
	         * @return {Array} Array of constraint definitions.
	         */
	        value: function parse(visualFormat, lineSeperator) {
	            lineSeperator = lineSeperator || '\n';
	            if (!Array.isArray(visualFormat) && visualFormat.indexOf(lineSeperator) < 0) {
	                return this.parseLine(visualFormat);
	            }
	
	            // Decompose visual-format into an array of strings, and within those strings
	            // search for line-endings, and treat each line as a seperate visual-format.
	            visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
	            var lines = undefined;
	            var constraints = [];
	            for (var i = 0; i < visualFormat.length; i++) {
	                lines = visualFormat[i].split(lineSeperator);
	                for (var j = 0; j < lines.length; j++) {
	                    constraints = constraints.concat(this.parseLine(lines[j]));
	                }
	            }
	            return constraints;
	        }
	    }]);
	
	    return VisualFormat;
	})();
	
	exports['default'] = VisualFormat;
	module.exports = exports['default'];
	
	},{"./Attribute":1,"./parser/parser":7}],7:[function(require,module,exports){
	"use strict";
	
	module.exports = (function () {
	  /*
	   * Generated by PEG.js 0.8.0.
	   *
	   * http://pegjs.majda.cz/
	   */
	
	  function peg$subclass(child, parent) {
	    function ctor() {
	      this.constructor = child;
	    }
	    ctor.prototype = parent.prototype;
	    child.prototype = new ctor();
	  }
	
	  function SyntaxError(message, expected, found, offset, line, column) {
	    this.message = message;
	    this.expected = expected;
	    this.found = found;
	    this.offset = offset;
	    this.line = line;
	    this.column = column;
	
	    this.name = "SyntaxError";
	  }
	
	  peg$subclass(SyntaxError, Error);
	
	  function parse(input) {
	    var options = arguments.length > 1 ? arguments[1] : {},
	        peg$FAILED = {},
	        peg$startRuleFunctions = { visualFormatString: peg$parsevisualFormatString },
	        peg$startRuleFunction = peg$parsevisualFormatString,
	        peg$c0 = peg$FAILED,
	        peg$c1 = null,
	        peg$c2 = ":",
	        peg$c3 = { type: "literal", value: ":", description: "\":\"" },
	        peg$c4 = [],
	        peg$c5 = function peg$c5(o, superto, view, views, tosuper) {
	      return {
	        orientation: o ? o[0] : "horizontal",
	        cascade: (superto || []).concat([view], [].concat.apply([], views), tosuper || [])
	      };
	    },
	        peg$c6 = "H",
	        peg$c7 = { type: "literal", value: "H", description: "\"H\"" },
	        peg$c8 = "V",
	        peg$c9 = { type: "literal", value: "V", description: "\"V\"" },
	        peg$c10 = function peg$c10(orient) {
	      return orient == "H" ? "horizontal" : "vertical";
	    },
	        peg$c11 = "|",
	        peg$c12 = { type: "literal", value: "|", description: "\"|\"" },
	        peg$c13 = function peg$c13() {
	      return { view: null };
	    },
	        peg$c14 = "[",
	        peg$c15 = { type: "literal", value: "[", description: "\"[\"" },
	        peg$c16 = "]",
	        peg$c17 = { type: "literal", value: "]", description: "\"]\"" },
	        peg$c18 = function peg$c18(view, predicates) {
	      return extend(view, predicates ? { constraints: predicates } : {});
	    },
	        peg$c19 = "-",
	        peg$c20 = { type: "literal", value: "-", description: "\"-\"" },
	        peg$c21 = function peg$c21(predicateList) {
	      return predicateList;
	    },
	        peg$c22 = function peg$c22() {
	      return [{ relation: "equ", constant: "default", $parserOffset: offset() }];
	    },
	        peg$c23 = "",
	        peg$c24 = function peg$c24() {
	      return [{ relation: "equ", constant: 0, $parserOffset: offset() }];
	    },
	        peg$c25 = function peg$c25(n) {
	      return [{ relation: "equ", constant: n, $parserOffset: offset() }];
	    },
	        peg$c26 = "(",
	        peg$c27 = { type: "literal", value: "(", description: "\"(\"" },
	        peg$c28 = ",",
	        peg$c29 = { type: "literal", value: ",", description: "\",\"" },
	        peg$c30 = ")",
	        peg$c31 = { type: "literal", value: ")", description: "\")\"" },
	        peg$c32 = function peg$c32(p, ps) {
	      return [p].concat(ps.map(function (p) {
	        return p[1];
	      }));
	    },
	        peg$c33 = "@",
	        peg$c34 = { type: "literal", value: "@", description: "\"@\"" },
	        peg$c35 = function peg$c35(r, o, p) {
	      return extend({ relation: "equ" }, r || {}, o, p ? p[1] : {});
	    },
	        peg$c36 = "==",
	        peg$c37 = { type: "literal", value: "==", description: "\"==\"" },
	        peg$c38 = function peg$c38() {
	      return { relation: "equ", $parserOffset: offset() };
	    },
	        peg$c39 = "<=",
	        peg$c40 = { type: "literal", value: "<=", description: "\"<=\"" },
	        peg$c41 = function peg$c41() {
	      return { relation: "leq", $parserOffset: offset() };
	    },
	        peg$c42 = ">=",
	        peg$c43 = { type: "literal", value: ">=", description: "\">=\"" },
	        peg$c44 = function peg$c44() {
	      return { relation: "geq", $parserOffset: offset() };
	    },
	        peg$c45 = function peg$c45(n) {
	      return { priority: n };
	    },
	        peg$c46 = function peg$c46(n) {
	      return { constant: n };
	    },
	        peg$c47 = /^[a-zA-Z0-9\-_]/,
	        peg$c48 = { type: "class", value: "[a-zA-Z0-9\\-_]", description: "[a-zA-Z0-9\\-_]" },
	        peg$c49 = function peg$c49(v) {
	      return { view: v };
	    },
	        peg$c50 = /^[0-9]/,
	        peg$c51 = { type: "class", value: "[0-9]", description: "[0-9]" },
	        peg$c52 = function peg$c52(digits) {
	      return parseInt(digits.join(""), 10);
	    },
	        peg$currPos = 0,
	        peg$reportedPos = 0,
	        peg$cachedPos = 0,
	        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
	        peg$maxFailPos = 0,
	        peg$maxFailExpected = [],
	        peg$silentFails = 0,
	        peg$result;
	
	    if ("startRule" in options) {
	      if (!(options.startRule in peg$startRuleFunctions)) {
	        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	      }
	
	      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
	    }
	
	    function text() {
	      return input.substring(peg$reportedPos, peg$currPos);
	    }
	
	    function offset() {
	      return peg$reportedPos;
	    }
	
	    function line() {
	      return peg$computePosDetails(peg$reportedPos).line;
	    }
	
	    function column() {
	      return peg$computePosDetails(peg$reportedPos).column;
	    }
	
	    function expected(description) {
	      throw peg$buildException(null, [{ type: "other", description: description }], peg$reportedPos);
	    }
	
	    function error(message) {
	      throw peg$buildException(message, null, peg$reportedPos);
	    }
	
	    function peg$computePosDetails(pos) {
	      function advance(details, startPos, endPos) {
	        var p, ch;
	
	        for (p = startPos; p < endPos; p++) {
	          ch = input.charAt(p);
	          if (ch === "\n") {
	            if (!details.seenCR) {
	              details.line++;
	            }
	            details.column = 1;
	            details.seenCR = false;
	          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
	            details.line++;
	            details.column = 1;
	            details.seenCR = true;
	          } else {
	            details.column++;
	            details.seenCR = false;
	          }
	        }
	      }
	
	      if (peg$cachedPos !== pos) {
	        if (peg$cachedPos > pos) {
	          peg$cachedPos = 0;
	          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
	        }
	        advance(peg$cachedPosDetails, peg$cachedPos, pos);
	        peg$cachedPos = pos;
	      }
	
	      return peg$cachedPosDetails;
	    }
	
	    function peg$fail(expected) {
	      if (peg$currPos < peg$maxFailPos) {
	        return;
	      }
	
	      if (peg$currPos > peg$maxFailPos) {
	        peg$maxFailPos = peg$currPos;
	        peg$maxFailExpected = [];
	      }
	
	      peg$maxFailExpected.push(expected);
	    }
	
	    function peg$buildException(message, expected, pos) {
	      function cleanupExpected(expected) {
	        var i = 1;
	
	        expected.sort(function (a, b) {
	          if (a.description < b.description) {
	            return -1;
	          } else if (a.description > b.description) {
	            return 1;
	          } else {
	            return 0;
	          }
	        });
	
	        while (i < expected.length) {
	          if (expected[i - 1] === expected[i]) {
	            expected.splice(i, 1);
	          } else {
	            i++;
	          }
	        }
	      }
	
	      function buildMessage(expected, found) {
	        function stringEscape(s) {
	          function hex(ch) {
	            return ch.charCodeAt(0).toString(16).toUpperCase();
	          }
	
	          return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
	            return "\\x0" + hex(ch);
	          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
	            return "\\x" + hex(ch);
	          }).replace(/[\u0180-\u0FFF]/g, function (ch) {
	            return "\\u0" + hex(ch);
	          }).replace(/[\u1080-\uFFFF]/g, function (ch) {
	            return "\\u" + hex(ch);
	          });
	        }
	
	        var expectedDescs = new Array(expected.length),
	            expectedDesc,
	            foundDesc,
	            i;
	
	        for (i = 0; i < expected.length; i++) {
	          expectedDescs[i] = expected[i].description;
	        }
	
	        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
	
	        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
	
	        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
	      }
	
	      var posDetails = peg$computePosDetails(pos),
	          found = pos < input.length ? input.charAt(pos) : null;
	
	      if (expected !== null) {
	        cleanupExpected(expected);
	      }
	
	      return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
	    }
	
	    function peg$parsevisualFormatString() {
	      var s0, s1, s2, s3, s4, s5, s6, s7;
	
	      s0 = peg$currPos;
	      s1 = peg$currPos;
	      s2 = peg$parseorientation();
	      if (s2 !== peg$FAILED) {
	        if (input.charCodeAt(peg$currPos) === 58) {
	          s3 = peg$c2;
	          peg$currPos++;
	        } else {
	          s3 = peg$FAILED;
	          if (peg$silentFails === 0) {
	            peg$fail(peg$c3);
	          }
	        }
	        if (s3 !== peg$FAILED) {
	          s2 = [s2, s3];
	          s1 = s2;
	        } else {
	          peg$currPos = s1;
	          s1 = peg$c0;
	        }
	      } else {
	        peg$currPos = s1;
	        s1 = peg$c0;
	      }
	      if (s1 === peg$FAILED) {
	        s1 = peg$c1;
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$currPos;
	        s3 = peg$parsesuperview();
	        if (s3 !== peg$FAILED) {
	          s4 = peg$parseconnection();
	          if (s4 !== peg$FAILED) {
	            s3 = [s3, s4];
	            s2 = s3;
	          } else {
	            peg$currPos = s2;
	            s2 = peg$c0;
	          }
	        } else {
	          peg$currPos = s2;
	          s2 = peg$c0;
	        }
	        if (s2 === peg$FAILED) {
	          s2 = peg$c1;
	        }
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parseview();
	          if (s3 !== peg$FAILED) {
	            s4 = [];
	            s5 = peg$currPos;
	            s6 = peg$parseconnection();
	            if (s6 !== peg$FAILED) {
	              s7 = peg$parseview();
	              if (s7 !== peg$FAILED) {
	                s6 = [s6, s7];
	                s5 = s6;
	              } else {
	                peg$currPos = s5;
	                s5 = peg$c0;
	              }
	            } else {
	              peg$currPos = s5;
	              s5 = peg$c0;
	            }
	            while (s5 !== peg$FAILED) {
	              s4.push(s5);
	              s5 = peg$currPos;
	              s6 = peg$parseconnection();
	              if (s6 !== peg$FAILED) {
	                s7 = peg$parseview();
	                if (s7 !== peg$FAILED) {
	                  s6 = [s6, s7];
	                  s5 = s6;
	                } else {
	                  peg$currPos = s5;
	                  s5 = peg$c0;
	                }
	              } else {
	                peg$currPos = s5;
	                s5 = peg$c0;
	              }
	            }
	            if (s4 !== peg$FAILED) {
	              s5 = peg$currPos;
	              s6 = peg$parseconnection();
	              if (s6 !== peg$FAILED) {
	                s7 = peg$parsesuperview();
	                if (s7 !== peg$FAILED) {
	                  s6 = [s6, s7];
	                  s5 = s6;
	                } else {
	                  peg$currPos = s5;
	                  s5 = peg$c0;
	                }
	              } else {
	                peg$currPos = s5;
	                s5 = peg$c0;
	              }
	              if (s5 === peg$FAILED) {
	                s5 = peg$c1;
	              }
	              if (s5 !== peg$FAILED) {
	                peg$reportedPos = s0;
	                s1 = peg$c5(s1, s2, s3, s4, s5);
	                s0 = s1;
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c0;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c0;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	
	      return s0;
	    }
	
	    function peg$parseorientation() {
	      var s0, s1;
	
	      s0 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 72) {
	        s1 = peg$c6;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) {
	          peg$fail(peg$c7);
	        }
	      }
	      if (s1 === peg$FAILED) {
	        if (input.charCodeAt(peg$currPos) === 86) {
	          s1 = peg$c8;
	          peg$currPos++;
	        } else {
	          s1 = peg$FAILED;
	          if (peg$silentFails === 0) {
	            peg$fail(peg$c9);
	          }
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c10(s1);
	      }
	      s0 = s1;
	
	      return s0;
	    }
	
	    function peg$parsesuperview() {
	      var s0, s1;
	
	      s0 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 124) {
	        s1 = peg$c11;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) {
	          peg$fail(peg$c12);
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c13();
	      }
	      s0 = s1;
	
	      return s0;
	    }
	
	    function peg$parseview() {
	      var s0, s1, s2, s3, s4;
	
	      s0 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 91) {
	        s1 = peg$c14;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) {
	          peg$fail(peg$c15);
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parseviewName();
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parsepredicateListWithParens();
	          if (s3 === peg$FAILED) {
	            s3 = peg$c1;
	          }
	          if (s3 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 93) {
	              s4 = peg$c16;
	              peg$currPos++;
	            } else {
	              s4 = peg$FAILED;
	              if (peg$silentFails === 0) {
	                peg$fail(peg$c17);
	              }
	            }
	            if (s4 !== peg$FAILED) {
	              peg$reportedPos = s0;
	              s1 = peg$c18(s2, s3);
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c0;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	
	      return s0;
	    }
	
	    function peg$parseconnection() {
	      var s0, s1, s2, s3;
	
	      s0 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 45) {
	        s1 = peg$c19;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) {
	          peg$fail(peg$c20);
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parsepredicateList();
	        if (s2 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 45) {
	            s3 = peg$c19;
	            peg$currPos++;
	          } else {
	            s3 = peg$FAILED;
	            if (peg$silentFails === 0) {
	              peg$fail(peg$c20);
	            }
	          }
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c21(s2);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      if (s0 === peg$FAILED) {
	        s0 = peg$currPos;
	        if (input.charCodeAt(peg$currPos) === 45) {
	          s1 = peg$c19;
	          peg$currPos++;
	        } else {
	          s1 = peg$FAILED;
	          if (peg$silentFails === 0) {
	            peg$fail(peg$c20);
	          }
	        }
	        if (s1 !== peg$FAILED) {
	          peg$reportedPos = s0;
	          s1 = peg$c22();
	        }
	        s0 = s1;
	        if (s0 === peg$FAILED) {
	          s0 = peg$currPos;
	          s1 = peg$c23;
	          if (s1 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c24();
	          }
	          s0 = s1;
	        }
	      }
	
	      return s0;
	    }
	
	    function peg$parsepredicateList() {
	      var s0;
	
	      s0 = peg$parsesimplePredicate();
	      if (s0 === peg$FAILED) {
	        s0 = peg$parsepredicateListWithParens();
	      }
	
	      return s0;
	    }
	
	    function peg$parsesimplePredicate() {
	      var s0, s1;
	
	      s0 = peg$currPos;
	      s1 = peg$parsenumber();
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c25(s1);
	      }
	      s0 = s1;
	
	      return s0;
	    }
	
	    function peg$parsepredicateListWithParens() {
	      var s0, s1, s2, s3, s4, s5, s6;
	
	      s0 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 40) {
	        s1 = peg$c26;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) {
	          peg$fail(peg$c27);
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parsepredicate();
	        if (s2 !== peg$FAILED) {
	          s3 = [];
	          s4 = peg$currPos;
	          if (input.charCodeAt(peg$currPos) === 44) {
	            s5 = peg$c28;
	            peg$currPos++;
	          } else {
	            s5 = peg$FAILED;
	            if (peg$silentFails === 0) {
	              peg$fail(peg$c29);
	            }
	          }
	          if (s5 !== peg$FAILED) {
	            s6 = peg$parsepredicate();
	            if (s6 !== peg$FAILED) {
	              s5 = [s5, s6];
	              s4 = s5;
	            } else {
	              peg$currPos = s4;
	              s4 = peg$c0;
	            }
	          } else {
	            peg$currPos = s4;
	            s4 = peg$c0;
	          }
	          while (s4 !== peg$FAILED) {
	            s3.push(s4);
	            s4 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 44) {
	              s5 = peg$c28;
	              peg$currPos++;
	            } else {
	              s5 = peg$FAILED;
	              if (peg$silentFails === 0) {
	                peg$fail(peg$c29);
	              }
	            }
	            if (s5 !== peg$FAILED) {
	              s6 = peg$parsepredicate();
	              if (s6 !== peg$FAILED) {
	                s5 = [s5, s6];
	                s4 = s5;
	              } else {
	                peg$currPos = s4;
	                s4 = peg$c0;
	              }
	            } else {
	              peg$currPos = s4;
	              s4 = peg$c0;
	            }
	          }
	          if (s3 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 41) {
	              s4 = peg$c30;
	              peg$currPos++;
	            } else {
	              s4 = peg$FAILED;
	              if (peg$silentFails === 0) {
	                peg$fail(peg$c31);
	              }
	            }
	            if (s4 !== peg$FAILED) {
	              peg$reportedPos = s0;
	              s1 = peg$c32(s2, s3);
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c0;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	
	      return s0;
	    }
	
	    function peg$parsepredicate() {
	      var s0, s1, s2, s3, s4, s5;
	
	      s0 = peg$currPos;
	      s1 = peg$parserelation();
	      if (s1 === peg$FAILED) {
	        s1 = peg$c1;
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parseobjectOfPredicate();
	        if (s2 !== peg$FAILED) {
	          s3 = peg$currPos;
	          if (input.charCodeAt(peg$currPos) === 64) {
	            s4 = peg$c33;
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;
	            if (peg$silentFails === 0) {
	              peg$fail(peg$c34);
	            }
	          }
	          if (s4 !== peg$FAILED) {
	            s5 = peg$parsepriority();
	            if (s5 !== peg$FAILED) {
	              s4 = [s4, s5];
	              s3 = s4;
	            } else {
	              peg$currPos = s3;
	              s3 = peg$c0;
	            }
	          } else {
	            peg$currPos = s3;
	            s3 = peg$c0;
	          }
	          if (s3 === peg$FAILED) {
	            s3 = peg$c1;
	          }
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c35(s1, s2, s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	
	      return s0;
	    }
	
	    function peg$parserelation() {
	      var s0, s1;
	
	      s0 = peg$currPos;
	      if (input.substr(peg$currPos, 2) === peg$c36) {
	        s1 = peg$c36;
	        peg$currPos += 2;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) {
	          peg$fail(peg$c37);
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c38();
	      }
	      s0 = s1;
	      if (s0 === peg$FAILED) {
	        s0 = peg$currPos;
	        if (input.substr(peg$currPos, 2) === peg$c39) {
	          s1 = peg$c39;
	          peg$currPos += 2;
	        } else {
	          s1 = peg$FAILED;
	          if (peg$silentFails === 0) {
	            peg$fail(peg$c40);
	          }
	        }
	        if (s1 !== peg$FAILED) {
	          peg$reportedPos = s0;
	          s1 = peg$c41();
	        }
	        s0 = s1;
	        if (s0 === peg$FAILED) {
	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 2) === peg$c42) {
	            s1 = peg$c42;
	            peg$currPos += 2;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) {
	              peg$fail(peg$c43);
	            }
	          }
	          if (s1 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c44();
	          }
	          s0 = s1;
	        }
	      }
	
	      return s0;
	    }
	
	    function peg$parseobjectOfPredicate() {
	      var s0;
	
	      s0 = peg$parseconstant();
	      if (s0 === peg$FAILED) {
	        s0 = peg$parseviewName();
	      }
	
	      return s0;
	    }
	
	    function peg$parsepriority() {
	      var s0, s1;
	
	      s0 = peg$currPos;
	      s1 = peg$parsenumber();
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c45(s1);
	      }
	      s0 = s1;
	
	      return s0;
	    }
	
	    function peg$parseconstant() {
	      var s0, s1;
	
	      s0 = peg$currPos;
	      s1 = peg$parsenumber();
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c46(s1);
	      }
	      s0 = s1;
	
	      return s0;
	    }
	
	    function peg$parseviewName() {
	      var s0, s1, s2, s3;
	
	      s0 = peg$currPos;
	      s1 = peg$currPos;
	      s2 = [];
	      if (peg$c47.test(input.charAt(peg$currPos))) {
	        s3 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s3 = peg$FAILED;
	        if (peg$silentFails === 0) {
	          peg$fail(peg$c48);
	        }
	      }
	      if (s3 !== peg$FAILED) {
	        while (s3 !== peg$FAILED) {
	          s2.push(s3);
	          if (peg$c47.test(input.charAt(peg$currPos))) {
	            s3 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s3 = peg$FAILED;
	            if (peg$silentFails === 0) {
	              peg$fail(peg$c48);
	            }
	          }
	        }
	      } else {
	        s2 = peg$c0;
	      }
	      if (s2 !== peg$FAILED) {
	        s2 = input.substring(s1, peg$currPos);
	      }
	      s1 = s2;
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c49(s1);
	      }
	      s0 = s1;
	
	      return s0;
	    }
	
	    function peg$parsenumber() {
	      var s0, s1, s2;
	
	      s0 = peg$currPos;
	      s1 = [];
	      if (peg$c50.test(input.charAt(peg$currPos))) {
	        s2 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s2 = peg$FAILED;
	        if (peg$silentFails === 0) {
	          peg$fail(peg$c51);
	        }
	      }
	      if (s2 !== peg$FAILED) {
	        while (s2 !== peg$FAILED) {
	          s1.push(s2);
	          if (peg$c50.test(input.charAt(peg$currPos))) {
	            s2 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s2 = peg$FAILED;
	            if (peg$silentFails === 0) {
	              peg$fail(peg$c51);
	            }
	          }
	        }
	      } else {
	        s1 = peg$c0;
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c52(s1);
	      }
	      s0 = s1;
	
	      return s0;
	    }
	
	    function extend(dst) {
	      for (var i = 1; i < arguments.length; i++) {
	        for (var k in arguments[i]) {
	          dst[k] = arguments[i][k];
	        }
	      }
	      return dst;
	    }
	
	    peg$result = peg$startRuleFunction();
	
	    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	      return peg$result;
	    } else {
	      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	        peg$fail({ type: "end", description: "end of input" });
	      }
	
	      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
	    }
	  }
	
	  return {
	    SyntaxError: SyntaxError,
	    parse: parse
	  };
	})();
	
	},{}]},{},[2])(2)
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map