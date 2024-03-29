/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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

var CCObject = require('../platform/CCObject');
var JS = require('../platform/js');

/**
 * !#en
 * The base class for registering asset types.
 * !#zh
 * 注册用的资源基类。
 *
 * @class RawAsset
 * @extends Object
 */
cc.RawAsset = cc.Class({
    name: 'cc.RawAsset', extends: CCObject,

    ctor: function () {
        /**
         * @property _uuid
         * @type {String}
         * @private
         */
        Object.defineProperty(this, '_uuid', {
            value: '',
            writable: true,
            // enumerable is false by default, to avoid uuid being assigned to empty string during destroy
        });
    },
});

/**
 * @method isRawAssetType
 * @param {Function} ctor
 * @returns {Boolean}
 * @static
 * @private
 */
JS.value(cc.RawAsset, 'isRawAssetType', function (ctor) {
    return cc.isChildClassOf(ctor, cc.RawAsset) && !cc.isChildClassOf(ctor, cc.Asset);
});

// TODO - DELME after 2.0
JS.value(cc.RawAsset, 'wasRawAssetType', function (ctor) {
    return ctor === cc.Texture2D ||
           ctor === cc.AudioClip ||
           ctor === cc.ParticleAsset ||
           ctor === cc.Asset;           // since 1.10, all raw asset will import as cc.Asset
});

module.exports = cc.RawAsset;
