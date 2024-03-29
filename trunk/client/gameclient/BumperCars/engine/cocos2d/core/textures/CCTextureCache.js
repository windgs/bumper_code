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

var Texture2D = require('./CCTexture2D');

/**
 * cc.textureCache is a singleton object, it's the global cache for cc.Texture2D
 * @class textureCache
 * @static
 */
var textureCache = /** @lends cc.textureCache# */{
    _textures: {},
    _textureColorsCache: {},
    _textureKeySeq: (0 | Math.random() * 1000),

    handleLoadedTexture: null,

    /**
     * Description
     * @method description
     * @return {String}
     */
    description: function () {
        return "<TextureCache | Number of textures = " + this._textures.length + ">";
    },

    /**
     * Returns an already created texture. Returns null if the texture doesn't exist.
     * @method getTextureForKey
     * @param {String} textureKeyName
     * @return {Texture2D|Null}
     * @example {@link cocos2d/core/textures/getTextureForKey.js}
     */
    getTextureForKey: function(textureKeyName){
        return this._textures[textureKeyName];
    },

    /*
     * @method getKeyByTexture
     * @param {HTMLImageElement} texture
     * @return {String|Null}
     * @example {@link cocos2d/core/textures/getKeyByTexture.js}
     */
    getKeyByTexture: function (texture) {
        for (var key in this._textures) {
            if (this._textures[key] === texture) {
                return key;
            }
        }
        return null;
    },

    _generalTextureKey: function (id) {
        return "_textureKey_" + id;
    },

    /**
     * @method getTextureColors
     * @param {HTMLImageElement} texture
     * @return {Array}
     * @example {@link cocos2d/core/textures/getTextureColors.js}
     */
    getTextureColors: function (texture) {
        var image = texture._image;
        var key = this.getKeyByTexture(image);
        if (!key) {
            if (image instanceof HTMLImageElement)
                key = image.src;
            else
                key = this._generalTextureKey(texture.__instanceId);
        }

        if (!this._textureColorsCache[key])
            this._textureColorsCache[key] = texture._generateTextureCacheForColor();
        return this._textureColorsCache[key];
    },

    /**
     * !#en get all textures
     * !#zh 获取所有贴图
     * @method getAllTextures
     * @return {Texture2D[]}
     */
    getAllTextures: function () {
        var texs = [];
        for (var key in this._textures) {
            var item = this._textures[key];
            texs.push(item);
        }
        return texs;
    },

    /**
     * <p>Purges the dictionary of loaded textures. <br />
     * Call this method if you receive the "Memory Warning"  <br />
     * In the short term: it will free some resources preventing your app from being killed  <br />
     * In the medium term: it will allocate more resources <br />
     * In the long term: it will be the same</p>
     * @method removeAllTextures
     * @example {@link cocos2d/core/textures/removeAllTextures.js}
     */
    removeAllTextures: function () {
        var locTextures = this._textures;
        for (var selKey in locTextures) {
            if (locTextures[selKey])
                locTextures[selKey]._releaseTexture();
        }
        this._textures = {};
    },

    /**
     * Deletes a texture from the cache given a texture.
     * @method removeTexture
     * @param {HTMLImageElement} texture
     * @example {@link cocos2d/core/textures/removeTexture.js}
     */
    removeTexture: function (texture) {
        if (!texture)
            return;

        var locTextures = this._textures;
        for (var selKey in locTextures) {
            if (locTextures[selKey] === texture) {
                locTextures[selKey]._releaseTexture();
                delete(locTextures[selKey]);
            }
        }
    },

    /**
     * Deletes a texture from the cache given a its key name.
     * @method removeTextureForKey
     * @param {String} textureKeyName
     * @example {@link cocos2d/core/textures/removeTextureForKey.js}
     */
    removeTextureForKey: function (textureKeyName) {
        if (CC_DEBUG && textureKeyName instanceof cc.Texture2D) {
            // TODO - remove at 2.0
            cc.warn('textureCache.removeTextureForKey(key) - The type of the key should be string, not Texture2D. You should call texture.destroy() if you already have the texture object.');
        }

        if (typeof textureKeyName !== 'string')
            return;

        var texture = this._textures[textureKeyName];
        if (texture) {
            texture._releaseTexture();
            delete this._textures[textureKeyName];
        }
    },
    
    /**
     * Returns a Texture2D object given an file image <br />
     * If the file image was not previously loaded, it will create a new Texture2D
     * object and it will return it. It will use the filename as a key.
     * Otherwise it will return a reference of a previously loaded image. <br />
     * Supported image extensions: .png, .jpg, .gif
     * @method addImage
     * @param {String} url
     * @param {Function} cb
     * @param {Object} target
     * @return {Texture2D}
     * @example {@link cocos2d/core/textures/addImage.js}
     */
    addImage (url, cb, target) {
        if (CC_DEBUG && url instanceof cc.Texture2D) {
            // TODO - remove at 2.0
            cc.warn('textureCache.addImage(url) - The type of the url should be string, not Texture2D. You don\'t need to call addImage if you already have the texture object.');
        }

        cc.assertID(url, 3103);

        var locTexs = this._textures;
        var tex = locTexs[url];
        if (tex) {
            if(tex.loaded) {
                cb && cb.call(target, tex);
            }
            else {
                tex.once("load", function(){
                    cb && cb.call(target, tex);
                }, target);
            }
        }
        else {
            tex = locTexs[url] = new Texture2D();
            tex.url = url;
            cc.loader.load(url, function (err, texture) {
                if (err) {
                    return cb && cb.call(target, err || new Error('Unknown error'));
                }

                textureCache.handleLoadedTexture(url);

                cb && cb.call(target, tex);
            });
        }

        return tex;
    },
    addImageAsync: null,

    /**
     * Cache the image data.
     * @method cacheImage
     * @param {String} path
     * @param {HTMLImageElement|HTMLCanvasElement} texture
     */
    cacheImage: function (path, texture) {
        cc.assertID(path, 3009);

        if (texture instanceof Texture2D) {
            this._textures[path] = texture;
            return;
        }
        var texture2d = new Texture2D();
        texture2d.initWithElement(texture);
        texture2d.handleLoadedTexture();
        this._textures[path] = texture2d;
    },

    /**
     * Output to cc.log the current contents of this TextureCache.<br>
     * This will attempt to calculate the size of each texture, and the total texture memory in use.
     */
    dumpCachedTextureInfo: function () {
        var count = 0;
        var totalBytes = 0, locTextures = this._textures;

        for (var key in locTextures) {
            var selTexture = locTextures[key];
            count++;
            if (selTexture.getHtmlElementObj() instanceof  HTMLImageElement)
                cc.logID(3005, key, selTexture.getHtmlElementObj().src, selTexture.getPixelWidth(), selTexture.getPixelHeight());
            else {
                cc.logID(3006, key, selTexture.getPixelWidth(), selTexture.getPixelHeight());
            }
            totalBytes += selTexture.getPixelWidth() * selTexture.getPixelHeight() * 4;
        }

        var locTextureColorsCache = this._textureColorsCache;
        for (key in locTextureColorsCache) {
            var selCanvasColorsArr = locTextureColorsCache[key];
            for (var selCanvasKey in selCanvasColorsArr) {
                var selCanvas = selCanvasColorsArr[selCanvasKey];
                count++;
                cc.logID(3006, key, selCanvas.width, selCanvas.height);
                totalBytes += selCanvas.width * selCanvas.height * 4;
            }

        }
        cc.logID(3007, count, totalBytes / 1024, (totalBytes / (1024.0 * 1024.0)).toFixed(2));
    },

    _clear: function () {
        this._textures = {};
        this._textureColorsCache = {};
        this._textureKeySeq = (0 | Math.random() * 1000);
    },

    handleLoadedTexture (url) {
        var locTexs = this._textures;
        var tex = locTexs[url];
        if (!tex) {
            cc.assertID(url, 3009);
            tex = locTexs[url] = new Texture2D();
            tex.url = url;
        }
        tex.handleLoadedTexture();
    }
};

textureCache.addImageAsync = textureCache.addImage;

cc.textureCache = module.exports = textureCache;