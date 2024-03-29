/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var js = cc.js;

if (CC_DEV) {

    // cc.spriteFrameCache
    js.get(cc, "spriteFrameCache", function () {
        cc.errorID(1404);
    });

    js.obsolete(cc.textureCache, 'cc.textureCache.textureForKey', 'getTextureForKey');

    // Texture
    js.obsolete(cc.Texture2D.prototype, 'texture.releaseTexture', 'texture.destroy');

    js.get(cc.SpriteFrame.prototype, '_textureLoaded', function () {
        cc.errorID(1400, 'spriteFrame._textureLoaded', 'spriteFrame.textureLoaded()');
        return this.textureLoaded();
    });

    // Label
    if (cc.Label) {
        js.obsolete(cc.Label.prototype,  'cc.Label.file', 'font', true);
    }

    /**
     * Inject all of the properties in source objects to target object and return the target object.
     * @param {object} target
     * @param {object} source
     * @name cc.inject
     * @memberof cc
     * @deprecated
     * @returns {object}
     */
    js.get(cc, "inject", function () {
        cc.errorID(1400, 'cc.inject', 'cc.js.mixin');
        cc.warnID(1401);
        return function (lhs, rhs) {
            return js.mixin(rhs, lhs);
        };
    });

    /**
     * Copy all of the properties in source objects to target object and return the target object.
     * @param {object} target
     * @param {object} *sources
     * @name cc.extend
     * @memberof cc
     * @deprecated
     * @returns {object}
     */
    js.get(cc, "extend", function () {
        cc.errorID(1400, 'cc.extend', 'cc.js.mixin');
        return js.mixin;
    });

    /**
     * Create new DOM element by tag name
     * @name cc.newElement
     * @memberof cc
     * @deprecated
     * @returns {object}
     */
    js.get(cc, "newElement", function () {
        cc.errorID(1400, 'cc.newElement', 'document.createElement');
        return document.createElement;
    });

    js.get(cc, "isFunction", function () {
        cc.errorID(1400, 'cc.isFunction', '"typeof obj === \'function\'"');
        return function(obj) {
            return typeof obj === 'function';
        };
    });

    /**
     * Check the obj whether is number or not
     * @name cc.isNumber
     * @memberof cc
     * @deprecated
     * @param {*} obj
     * @returns {boolean}
     */
    js.get(cc, "isNumber", function () {
        cc.errorID(1400, 'cc.isNumber', 'cc.js.isNumber');
        return js.isNumber;
    });

    /**
     * Check the obj whether is string or not
     * @name cc.isString
     * @memberof cc
     * @deprecated
     * @param {*} obj
     * @returns {boolean}
     */
    js.get(cc, "isString", function () {
        cc.errorID(1400, 'cc.isString', 'cc.js.isString');
        return js.isString;
    });

    js.get(cc, "isArray", function () {
        cc.errorID(1400, 'cc.isArray', 'cc.js.isArray');
        return function(obj) {
            return Array.isArray(obj);
        };
    });

    js.get(cc, "isUndefined", function () {
        cc.errorID(1400, 'cc.isUndefined', '"typeof obj === \'undefined\'"');
        return function(obj) {
            return typeof obj === 'undefined';
        };
    });

    js.get(cc, "isObject", function () {
        cc.errorID(1400, 'cc.isObject', '"typeof obj === \'object\'"');
        return function(obj) {
            return typeof obj === 'object';
        };
    });

    /**
     * cc.Point is the class for point object, please do not use its constructor to create points, use cc.p() alias function instead.
     * @class cc.Point
     * @memberof cc
     * @deprecated
     * @param {Number} x
     * @param {Number} y
     * @see cc.Vec2
     */
    js.obsoletes(cc, 'cc', {
        'Point': 'Vec2',
    });

    /**
     * Verify Array's Type
     * @memberof cc
     * @deprecated
     * @param {Array} arr
     * @param {function} type
     * @return {Boolean}
     * @function
     */
    js.get(cc, 'arrayVerifyType', function () {
        cc.errorID(1400, 'cc.arrayVerifyType', 'cc.js.array.verifyType');
        return cc.js.array.verifyType;
    });

    /**
     * Searches for the first occurance of object and removes it. If object is not found the function has no effect.
     * @function
     * @memberof cc
     * @deprecated
     * @param {Array} arr Source Array
     * @param {*} delObj  remove object
     */
    js.get(cc, 'arrayRemoveObject', function () {
        cc.errorID(1400, 'cc.arrayRemoveObject', 'cc.js.array.remove');
        return cc.js.array.remove;
    });

    /**
     * Removes from arr all values in minusArr. For each Value in minusArr, the first matching instance in arr will be removed.
     * @function
     * @memberof cc
     * @deprecated
     * @param {Array} arr Source Array
     * @param {Array} minusArr minus Array
     */
    js.get(cc, 'arrayRemoveArray', function () {
        cc.errorID(1400, 'cc.arrayRemoveArray', 'cc.js.array.removeArray');
        return cc.js.array.removeArray;
    });

    /**
     * Inserts some objects at index
     * @function
     * @memberof cc
     * @deprecated
     * @param {Array} arr
     * @param {Array} addObjs
     * @param {Number} index
     * @return {Array}
     */
    js.get(cc, 'arrayAppendObjectsToIndex', function() {
        cc.errorID(1400, 'cc.arrayAppendObjectsToIndex', 'cc.js.array.appendObjectsAt');
        return cc.js.array.appendObjectsAt;
    });

    /**
     * Copy an array's item to a new array (its performance is better than Array.slice)
     * @memberof cc
     * @deprecated
     * @param {Array} arr
     * @return {Array}
     */
    js.get(cc, 'copyArray', function() {
        cc.errorID(1400, 'cc.copyArray', 'cc.js.array.copy');
        return cc.js.array.copy;
    });

    js.get(cc, 'PI', function () {
        cc.errorID(1400, 'cc.PI', 'Math.PI');
        return Math.PI;
    });

    if (cc.TiledLayer) {
        /**
         * Get the Tile set information for the layer.
         * @memberof cc.TiledLayer
         * @deprecated
         * @return {TMXTilesetInfo}
         * @function
         */
        js.obsolete(cc.TiledLayer.prototype, 'cc.TiledLayer.getTileset', 'getTileSet');

        /**
         * Set the Tile set information for the layer.
         * @memberof cc.TiledLayer
         * @deprecated
         * @param {TMXTilesetInfo}
         * @function
         */
        js.obsolete(cc.TiledLayer.prototype, 'cc.TiledLayer.setTileset', 'setTileSet');
    }

    Object.defineProperty(cc._SGComponent.prototype, 'visible', {
        get: function () {
            cc.warnID(1402, cc.js.getClassName(this));
            return this.enabled;
        },
        set: function (value) {
            var printWarning = this.visible;
            this.enabled = value;
        }
    });

    function deprecateEnum (obj, oldPath, newPath, hasTypePrefixBefore) {
        if (!CC_SUPPORT_JIT) {
            return;
        }
        hasTypePrefixBefore = hasTypePrefixBefore !== false;
        var enumDef = Function('return ' + newPath)();
        var entries = cc.Enum.getList(enumDef);
        var delimiter = hasTypePrefixBefore ? '_' : '.';
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i].name;
            var oldPropName;
            if (hasTypePrefixBefore) {
                var oldTypeName = oldPath.split('.').slice(-1)[0];
                oldPropName = oldTypeName + '_' + entry;
            }
            else {
                oldPropName = entry;
            }
            js.get(obj, oldPropName, function (entry) {
                cc.errorID(1400, oldPath + delimiter + entry, newPath + '.' + entry);
                return enumDef[entry];
            }.bind(null, entry));
        }
    }

    deprecateEnum(cc, 'cc.TEXT_ALIGNMENT', 'cc.TextAlignment');
    deprecateEnum(cc, 'cc.VERTICAL_TEXT_ALIGNMENT', 'cc.VerticalTextAlignment');
    if (_ccsg.ParticleSystem) {
        deprecateEnum(_ccsg.ParticleSystem, '_ccsg.ParticleSystem.TYPE', '_ccsg.ParticleSystem.Type');
        deprecateEnum(_ccsg.ParticleSystem, '_ccsg.ParticleSystem.MODE', '_ccsg.ParticleSystem.Mode');
    }
    if (cc.ParticleSystem) {
        deprecateEnum(cc.ParticleSystem, 'cc.ParticleSystem.TYPE', 'cc.ParticleSystem.PositionType');
        deprecateEnum(cc.ParticleSystem, 'cc.ParticleSystem.MODE', 'cc.ParticleSystem.EmitterMode');
    }
    // deprecateEnum(cc.ProgressTimer, 'cc.ProgressTimer.TYPE', 'cc.ProgressTimer.Type');
    deprecateEnum(cc.game, 'cc.game.DEBUG_MODE', 'cc.DebugMode');
    if (!CC_JSB) {
        deprecateEnum(cc, 'cc', 'cc.Texture2D.WrapMode', false);
    }
    if (_ccsg.EditBox) {
        deprecateEnum(cc, 'cc.KEYBOARD_RETURNTYPE', '_ccsg.EditBox.KeyboardReturnType');
        deprecateEnum(cc, 'cc.EDITBOX_INPUT_MODE', '_ccsg.EditBox.InputMode');
        deprecateEnum(cc, 'cc.EDITBOX_INPUT_FLAG', '_ccsg.EditBox.InputFlag');
    }

    function markAsRemoved (ownerCtor, removedProps, ownerName) {
        if (!ownerCtor) {
            // 可能被裁剪了
            return;
        }
        ownerName = ownerName || js.getClassName(ownerCtor);
        removedProps.forEach(function (prop) {
            function error () {
                cc.error('Sorry, %s.%s is removed.', ownerName, prop);
            }
            js.getset(ownerCtor.prototype, prop, error, error);
        });
    }

    function provideClearError (owner, obj, ownerName) {
        if (!owner) {
            // 可能被裁剪了
            return;
        }
        var className = ownerName || cc.js.getClassName(owner);
        var Info = 'Sorry, ' + className + '.%s is removed, please use %s instead.';
        for (var prop in obj) {
            function define (prop, getset) {
                function accessor (newProp) {
                    cc.error(Info, prop, newProp);
                }
                if (!Array.isArray(getset)) {
                    getset = getset.split(',')
                        .map(function (x) {
                            return x.trim();
                        });
                }
                try {
                    js.getset(owner, prop, accessor.bind(null, getset[0]), getset[1] && accessor.bind(null, getset[1]));
                }
                catch (e) {}
            }
            var getset = obj[prop];
            if (prop[0] === '*') {
                // get set
                var etProp = prop.slice(1);
                define('g' + etProp, getset);
                define('s' + etProp, getset);
            }
            else {
                prop.split(',')
                    .map(function (x) {
                        return x.trim();
                    })
                    .forEach(function (x) {
                        define(x, getset);
                    });
            }
        }
    }

    // cc.director

    provideClearError(cc.Director.prototype, {
        getSecondsPerFrame : 'getDeltaTime'
    });

    // cc.loader

    markAsRemoved(cc.Pipeline, [
        'loadJsWithImg',
        'loadCsb',
        'getUrl',
        'loadAliases',
        'register'
    ], 'cc.loader');
    provideClearError(cc.loader, {
        loadJs : 'load',
        loadTxt : 'load',
        loadJson : 'load',
        loadImg : 'load'
    }, 'cc.loader');

    // cc.Node

    markAsRemoved(cc.Node, [
        '_componentContainer',
        '_camera',
        '_additionalTransform',
        '_scheduler',
        '_actionManager',
        'actionManager',
        '_isTransitionFinished',
        '_additionalTransformDirty',
        '_shaderProgram',
        'shaderProgram',
        '_normalizedPositionDirty',
        '_normalizedPosition',
        '_usingNormalizedPosition',
        '_renderCmd',
        '_vertexZ',
        '_showNode',
        '_arrayMakeObjectsPerformSelector',
        'getActionManager',
        'setActionManager',
        'getScheduler',
        'setScheduler',
        'reorderChild',
        'draw',
        'transformAncestors',
        'onEnter',
        'onEnterTransitionDidFinish',
        'onExitTransitionDidStart',
        'onExit',
        'scheduleUpdate',
        'scheduleUpdateWithPriority',
        'unscheduleUpdate',
        'schedule',
        'scheduleOnce',
        'unschedule',
        'unscheduleAllCallbacks',
        'resumeSchedulerAndActions',
        'resume',
        'pauseSchedulerAndActions',
        'pause',
        'setAdditionalTransform',
        'updateTransform',
        'retain',
        'release',
        'visit',
        'transform',
        'getCamera',
        'grid',
        'getOrderOfArrival',
        'setOrderOfArrival',
        'getGrid',
        'setGrid',
        'getShaderProgram',
        'setShaderProgram',
        'getGLServerState',
        'setGLServerState',
        '_initRendererCmd',
        '_createRenderCmd',
        'updateDisplayedOpacity',
        'updateDisplayedColor',
        'userData',
        'userObject',
        '_cascadeColorEnabled',
        'cascadeColor',
        'isCascadeColorEnabled',
        'setCascadeColorEnabled',
        'ignoreAnchor',
        'isIgnoreAnchorPointForPosition',
        'ignoreAnchorPointForPosition'
    ]);
    provideClearError(cc.Node.prototype, {
        arrivalOrder: 'getSiblingIndex, setSiblingIndex',
        _visible: '_activeInHierarchy, active',
        _running: '_activeInHierarchy, active',
        running: 'activeInHierarchy, active',
        _realOpacity: '_opacity, _opacity',
        _realColor: '_color, _color',
        _insertChild: 'addChild',
        _addChildHelper: 'addChild',
        _detachChild: 'removeChild',
        getZOrder: 'getLocalZOrder',
        setZOrder: 'setLocalZOrder',
        boundingBox: 'getBoundingBox',
        removeFromParentAndCleanup: 'removeFromParent',
        removeAllChildrenWithCleanup: 'removeAllChildren',
        parentToNodeTransform: 'getParentToNodeTransform',
        nodeToWorldTransform: 'getNodeToWorlshaderProgramdTransform',
        worldToNodeTransform: 'getWorldToNodeTransform',
        nodeToParentTransform: 'getNodeToParentTransform',
        removeAllComponents: 'removeComponent',
        getNodeToParentAffineTransform: 'getNodeToParentTransform',
    });

    // RENDERERS

    function shouldNotUseNodeProp (component) {
        var compProto = component.prototype;
        for (var prop in cc.Node.prototype) {
            (function (prop) {
                if (!(prop in compProto) && prop[0] !== '_') {
                    Object.defineProperty(compProto, prop, {
                        get: function () {
                            var compName = cc.js.getClassName(this);    // 允许继承
                            var Info = 'Sorry, ' + compName + '.%s is undefined, please use cc.Node.%s instead.';
                            cc.error(Info, prop, prop);
                        },
                        enumerable: false,
                        configurable: true,   // 允许继承
                    });
                }
            })(prop);
        }
    }
    shouldNotUseNodeProp(cc._SGComponent);


    // cc.Sprite

    markAsRemoved(cc.Sprite, [
        'textureLoaded',
        'setBlendFunc',
        'getBlendFunc',
        'setState',
        'getState',
        'resizableSpriteWithCapInsets',
        'flippedX',
        'flippedY',
        'setFlippedX',
        'setFlippedY',
        'isFlippedX',
        'isFlippedY',
        'getCapInsets',
        'setCapInsets',
    ]);
    provideClearError(cc.Sprite, {
        create: 'node.addComponent',
        createWithTexture: 'node.addComponent',
        createWithSpriteFrameName: 'node.addComponent',
        createWithSpriteFrame: 'node.addComponent',
    });
    provideClearError(cc.Sprite.prototype, {
        getPreferredSize: 'node.getContentSize',
        setPreferredSize: 'node.setContentSize',
        updateWithSprite: 'spriteFrame',
        getSpriteFrame: 'spriteFrame',
        setSpriteFrame: 'spriteFrame',
        useOriginalSize: 'sizeMode',
    });

    // Particle
    if (cc.ParticleSystem) {
        markAsRemoved(cc.ParticleSystem, [
            'batchNode',
            'drawMode',
            'getDrawMode',
            'setDrawMode',
            'shapeType',
            'getShapeType',
            'setShapeType',
            'atlasIndex',
            'init',
            'initParticle',
            'updateWithNoTime',
        ]);
        provideClearError(cc.ParticleSystem, {
            initWithFile: 'instance.file',
            initWithDictionary: 'instance.file',
            initWithTotalParticles: 'instance.totalParticles'
        });
        provideClearError(cc.ParticleSystem.prototype, {
            destroyParticleSystem: 'destroy',
            clone: 'cc.instantiate',
            isActive: 'active',
            '*etParticleCount': 'particleCount',
            '*etDuration': 'duration',
            '*etSourcePosition': 'sourcePos',
            '*etPosVar': 'posVar',
            '*etGravity': 'gravity',
            '*etSpeed': 'speed',
            '*etSpeedVar': 'speedVar',
            '*etTangentialAccel': 'tangentialAccel',
            '*etTangentialAccelVar': 'tangentialAccelVar',
            '*etRadialAccel': 'radialAccel',
            '*etRadialAccelVar': 'radialAccelVar',
            '*etRotationIsDir': 'rotationIsDir',
            '*etStartRadius': 'startRadius',
            '*etStartRadiusVar': 'startRadiusVar',
            '*etEndRadius': 'endRadius',
            '*etEndRadiusVar': 'endRadiusVar',
            '*etRotatePerSecond': 'rotatePerS',
            '*etRotatePerSecondVar': 'rotatePerSVar',
            '*etStartColor': 'startColor',
            '*etStartColorVar': 'startColorVar',
            '*etEndColor': 'endColor',
            '*etEndColorVar': 'endColorVar',
            '*etTotalParticles': 'totalParticles',
            '*etTexture': 'texture',
        });
        js.obsoletes(cc.ParticleSystem, 'cc.ParticleSystem', {
            Type: 'PositionType',
            Mode: 'EmitterMode'
        });
    }

    if (!CC_JSB) {
        // _ccsg.Node
        markAsRemoved(_ccsg.Node, [
            '_normalizedPositionDirty',
            '_normalizedPosition',
            '_usingNormalizedPosition',
            'grid',
            'userData',
            'userObject',
            'actionManager',
            'getActionManager',
            'setActionManager',
            'getNormalizedPosition',
            'setNormalizedPosition',
            'getCamera',
            'getUserData',
            'setUserData',
            'getUserObject',
            'setUserObject',
            'getComponent',
            'addComponent',
            'removeComponent',
            'removeAllComponents',
            'enumerateChildren',
            'setCameraMask',
            'getCameraMask'
        ], '_ccsg.Node');
    }

    js.obsolete(_ccsg.Node.prototype, '_ccsg.Node.ignoreAnchorPointForPosition', 'setIgnoreAnchorPointForPosition');

    js.obsoletes(cc.Scale9Sprite.prototype, 'cc.Scale9Sprite', {
        setPreferredSize: 'setContentSize',
        getPreferredSize: 'getContentSize',
    });

    if (cc.ActionManager) {
        js.obsoletes(cc.ActionManager.prototype, 'cc.ActionManager', {
            'numberOfRunningActionsInTarget' : 'getNumberOfRunningActionsInTarget'
        });
    }

    cc.js.get(cc.Texture2D.prototype, 'getName', function () {
        cc.warnID(1400, 'texture.getName()', 'texture._glID');
        return function () {
            return this._glID || null;
        };
    });

    //ui
    if (cc.Layout) {
        js.obsolete(cc.Layout, 'cc.Layout.ResizeType', 'ResizeMode');
        js.obsolete(cc.Layout.prototype, 'cc.Layout.layoutType', 'type');
        js.obsolete(cc.Layout.prototype, 'cc.Layout.resize', 'resizeMode');
        js.obsolete(cc.Layout.prototype, 'cc.Layout._updateLayout', 'updateLayout');
    }

    markAsRemoved(cc.Scale9Sprite, [
        'resizableSpriteWithCapInsets',
        'updateWithSprite',
        'getOriginalSize',
        'setCapInsets',
        'getCapInsets',
        'setScale9Enabled',
        'isScale9Enabled',
        'getSprite',
        'setFlippedX',
        'isFlippedX',
        'setFlippedY',
        'isFlippedY'
    ]);

    // SPINE

    if (typeof sp !== 'undefined') {
        deprecateEnum(sp, 'sp.ANIMATION_EVENT_TYPE', 'sp.AnimationEventType');
        js.obsolete(sp, 'sp.SkeletonAnimation', 'Skeleton');
        provideClearError(sp.Skeleton, {
            create: 'node.addComponent',
        });
        provideClearError(sp.Skeleton.prototype, {
            '*etDebugSlotsEnabled': 'debugSlots',
            '*etDebugBonesEnabled': 'debugBones',
            'setDebugSolots': 'debugSlots',
            'setDebugBones': 'debugBones',
            '*etTimeScale': 'timeScale',
        });
    }

    // SCENE

    var ERR = '"%s" is not defined in the Scene, it is only defined in normal nodes.';
    Object.defineProperties(cc.Scene.prototype, {
        active: {
            get: function () {
                cc.error(ERR, 'active');
                return true;
            },
            set: function () {
                cc.error(ERR, 'active');
            }
        },
        activeInHierarchy: {
            get: function () {
                cc.error(ERR, 'activeInHierarchy');
                return true;
            },
        },
        getComponent: {
            get: function () {
                cc.error(ERR, 'getComponent');
                return function () {
                    return null;
                };
            }
        },
        addComponent: {
            get: function () {
                cc.error(ERR, 'addComponent');
                return function () {
                    return null;
                };
            }
        },
    });

    if (typeof dragonBones !== 'undefined') {
        js.obsolete(dragonBones.CCFactory, 'dragonBones.CCFactory.getFactory', 'getInstance');
    }

}
