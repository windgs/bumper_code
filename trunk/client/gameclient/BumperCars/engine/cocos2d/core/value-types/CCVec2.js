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

var ValueType = require('./CCValueType');
var JS = require('../platform/js');
var CCClass = require('../platform/CCClass');

/**
 * !#en Representation of 2D vectors and points.
 * !#zh 表示 2D 向量和坐标
 *
 * @class Vec2
 * @extends ValueType
 */

/**
 * !#en
 * Constructor
 * see {{#crossLink "cc/vec2:method"}}cc.v2{{/crossLink}} or {{#crossLink "cc/p:method"}}cc.p{{/crossLink}}
 * !#zh
 * 构造函数，可查看 {{#crossLink "cc/vec2:method"}}cc.v2{{/crossLink}} 或者 {{#crossLink "cc/p:method"}}cc.p{{/crossLink}}
 * @method constructor
 * @param {number} [x=0]
 * @param {number} [y=0]
 */
function Vec2 (x, y) {
    if (x && typeof x === 'object') {
        y = x.y;
        x = x.x;
    }
    this.x = x || 0;
    this.y = y || 0;
}
JS.extend(Vec2, ValueType);
CCClass.fastDefine('cc.Vec2', Vec2, { x: 0, y: 0 });

/**
 * @property {Number} x
 */
/**
 * @property {Number} y
 */

var proto = Vec2.prototype;


/**
 * !#en clone a Vec2 value
 * !#zh 克隆一个 Vec2 值
 * @method clone
 * @return {Vec2}
 */
proto.clone = function () {
    return new Vec2(this.x, this.y);
};

/**
 * !#en TODO
 * !#zh 设置向量值。
 * @method set
 * @param {Vec2} newValue - !#en new value to set. !#zh 要设置的新值
 * @return {Vec2} returns this
 * @chainable
 */
proto.set = function (newValue) {
    this.x = newValue.x;
    this.y = newValue.y;
    return this;
};

/**
 * !#en TODO
 * !#zh 当前的向量是否与指定的向量相等。
 * @method equals
 * @param {Vec2} other
 * @return {Boolean}
 */
proto.equals = function (other) {
    return other && this.x === other.x && this.y === other.y;
};

/**
 * !#en TODO
 * !#zh 转换为方便阅读的字符串。
 * @method toString
 * @return {string}
 */
proto.toString = function () {
    return "(" +
           this.x.toFixed(2) + ", " +
           this.y.toFixed(2) + ")"
        ;
};

/**
 * !#en TODO
 * !#zh 线性插值。
 * @method lerp
 * @param {Vec2} to
 * @param {number} ratio - the interpolation coefficient
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2}
 */
proto.lerp = function (to, ratio, out) {
    out = out || new Vec2();
    var x = this.x;
    var y = this.y;
    out.x = x + (to.x - x) * ratio;
    out.y = y + (to.y - y) * ratio;
    return out;
};

/**
 * !#en Adds this vector. If you want to save result to another vector, use add() instead.
 * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
 * @method addSelf
 * @param {Vec2} vector
 * @return {Vec2} returns this
 * @chainable
 * @example
 * var v = cc.v2(10, 10);
 * v.addSelf(cc.v2(5, 5));// return Vec2 {x: 15, y: 15};
 */
proto.addSelf = function (vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
};

/**
 * !#en Adds two vectors, and returns the new result.
 * !#zh 向量加法，并返回新结果。
 * @method add
 * @param {Vec2} vector
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.add(cc.v2(5, 5));      // return Vec2 {x: 15, y: 15};
 * var v1;
 * v.add(cc.v2(5, 5), v1);  // return Vec2 {x: 15, y: 15};
 */
proto.add = function (vector, out) {
    out = out || new Vec2();
    out.x = this.x + vector.x;
    out.y = this.y + vector.y;
    return out;
};

/**
 * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
 * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
 * @method subSelf
 * @param {Vec2} vector
 * @return {Vec2} returns this
 * @chainable
 * @example
 * var v = cc.v2(10, 10);
 * v.subSelf(cc.v2(5, 5));// return Vec2 {x: 5, y: 5};
 */
proto.subSelf = function (vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
};

/**
 * !#en Subtracts one vector from this, and returns the new result.
 * !#zh 向量减法，并返回新结果。
 * @method sub
 * @param {Vec2} vector
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};
 * var v1;
 * v.sub(cc.v2(5, 5), v1);  // return Vec2 {x: 5, y: 5};
 */
proto.sub = function (vector, out) {
    out = out || new Vec2();
    out.x = this.x - vector.x;
    out.y = this.y - vector.y;
    return out;
};

/**
 * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
 * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
 * @method mulSelf
 * @param {number} num
 * @return {Vec2} returns this
 * @chainable
 * @example
 * var v = cc.v2(10, 10);
 * v.mulSelf(5);// return Vec2 {x: 50, y: 50};
 */
proto.mulSelf = function (num) {
    this.x *= num;
    this.y *= num;
    return this;
};

/**
 * !#en Multiplies by a number, and returns the new result.
 * !#zh 缩放向量，并返回新结果。
 * @method mul
 * @param {number} num
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.mul(5);      // return Vec2 {x: 50, y: 50};
 * var v1;
 * v.mul(5, v1);  // return Vec2 {x: 50, y: 50};
 */
proto.mul = function (num, out) {
    out = out || new Vec2();
    out.x = this.x * num;
    out.y = this.y * num;
    return out;
};

/**
 * !#en Multiplies two vectors.
 * !#zh 分量相乘。
 * @method scaleSelf
 * @param {Vec2} vector
 * @return {Vec2} returns this
 * @chainable
 * @example
 * var v = cc.v2(10, 10);
 * v.scaleSelf(cc.v2(5, 5));// return Vec2 {x: 50, y: 50};
 */
proto.scaleSelf = function (vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
};

/**
 * !#en Multiplies two vectors, and returns the new result.
 * !#zh 分量相乘，并返回新的结果。
 * @method scale
 * @param {Vec2} vector
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.scale(cc.v2(5, 5));      // return Vec2 {x: 50, y: 50};
 * var v1;
 * v.scale(cc.v2(5, 5), v1);  // return Vec2 {x: 50, y: 50};
 */
proto.scale = function (vector, out) {
    out = out || new Vec2();
    out.x = this.x * vector.x;
    out.y = this.y * vector.y;
    return out;
};

/**
 * !#en Divides by a number. If you want to save result to another vector, use div() instead.
 * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
 * @method divSelf
 * @param {Number} divisor
 * @return {Vec2} returns this
 * @chainable
 * @example
 * var v = cc.v2(10, 10);
 * v.divSelf(5); // return Vec2 {x: 2, y: 2};
 */
proto.divSelf = function (num) {
    this.x /= num;
    this.y /= num;
    return this;
};

/**
 * !#en Divides by a number, and returns the new result.
 * !#zh 向量除法，并返回新的结果。
 * @method div
 * @param {Number} divisor
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.div(5);      // return Vec2 {x: 2, y: 2};
 * var v1;
 * v.div(5, v1);  // return Vec2 {x: 2, y: 2};
 */
proto.div = function (num, out) {
    out = out || new Vec2();
    out.x = this.x / num;
    out.y = this.y / num;
    return out;
};

/**
 * !#en Negates the components. If you want to save result to another vector, use neg() instead.
 * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
 * @method negSelf
 * @return {Vec2} returns this
 * @chainable
 * @example
 * var v = cc.v2(10, 10);
 * v.negSelf(); // return Vec2 {x: -10, y: -10};
 */
proto.negSelf = function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
};

/**
 * !#en Negates the components, and returns the new result.
 * !#zh 返回取反后的新向量。
 * @method neg
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 * @example
 * var v = cc.v2(10, 10);
 * var v1;
 * v.neg(v1);  // return Vec2 {x: -10, y: -10};
 */
proto.neg = function (out) {
    out = out || new Vec2();
    out.x = -this.x;
    out.y = -this.y;
    return out;
};

/**
 * !#en Dot product
 * !#zh 当前向量与指定向量进行点乘。
 * @method dot
 * @param {Vec2} [vector]
 * @return {number} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.dot(cc.v2(5, 5)); // return 100;
 */
proto.dot = function (vector) {
    return this.x * vector.x + this.y * vector.y;
};

/**
 * !#en Cross product
 * !#zh 当前向量与指定向量进行叉乘。
 * @method cross
 * @param {Vec2} [vector]
 * @return {number} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.cross(cc.v2(5, 5)); // return 0;
 */
proto.cross = function (vector) {
    return this.y * vector.x - this.x * vector.y;
};

/**
 * !#en Returns the length of this vector.
 * !#zh 返回该向量的长度。
 * @method mag
 * @return {number} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.mag(); // return 14.142135623730951;
 */
proto.mag = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * !#en Returns the squared length of this vector.
 * !#zh 返回该向量的长度平方。
 * @method magSqr
 * @return {number} the result
 * @example
 * var v = cc.v2(10, 10);
 * v.magSqr(); // return 200;
 */
proto.magSqr = function () {
    return this.x * this.x + this.y * this.y;
};

/**
 * !#en Make the length of this vector to 1.
 * !#zh 向量归一化，让这个向量的长度为 1。
 * @method normalizeSelf
 * @return {Vec2} returns this
 * @chainable
 * @example
 * var v = cc.v2(10, 10);
 * v.normalizeSelf(); // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
 */
proto.normalizeSelf = function () {
    var magSqr = this.x * this.x + this.y * this.y;
    if (magSqr === 1.0)
        return this;

    if (magSqr === 0.0) {
        console.warn("Can't normalize zero vector");
        return this;
    }

    var invsqrt = 1.0 / Math.sqrt(magSqr);
    this.x *= invsqrt;
    this.y *= invsqrt;

    return this;
};

/**
 * !#en
 * Returns this vector with a magnitude of 1.<br/>
 * <br/>
 * Note that the current vector is unchanged and a new normalized vector is returned. If you want to normalize the current vector, use normalizeSelf function.
 * !#zh
 * 返回归一化后的向量。<br/>
 * <br/>
 * 注意，当前向量不变，并返回一个新的归一化向量。如果你想来归一化当前向量，可使用 normalizeSelf 函数。
 * @method normalize
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} result
 * var v = cc.v2(10, 10);
 * v.normalize();   // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
 */
proto.normalize = function (out) {
    out = out || new Vec2();
    out.x = this.x;
    out.y = this.y;
    out.normalizeSelf();
    return out;
};

/**
 * !#en Get angle in radian between this and vector.
 * !#zh 夹角的弧度。
 * @method angle
 * @param {Vec2} vector
 * @return {number} from 0 to Math.PI
 */
proto.angle = function (vector) {
    var magSqr1 = this.magSqr();
    var magSqr2 = vector.magSqr();

    if (magSqr1 === 0 || magSqr2 === 0) {
        console.warn("Can't get angle between zero vector");
        return 0.0;
    }

    var dot = this.dot(vector);
    var theta = dot / (Math.sqrt(magSqr1 * magSqr2));
    theta = cc.clampf(theta, -1.0, 1.0);
    return Math.acos(theta);
};

/**
 * !#en Get angle in radian between this and vector with direction.
 * !#zh 带方向的夹角的弧度。
 * @method signAngle
 * @param {Vec2} vector
 * @return {number} from -MathPI to Math.PI
 */
proto.signAngle = function (vector) {
    // NOTE: this algorithm will return 0.0 without signed if vectors are parallex
    // var angle = this.angle(vector);
    // var cross = this.cross(vector);
    // return Math.sign(cross) * angle;

    return Math.atan2(this.y, this.x) - Math.atan2(vector.y, vector.x);
};

/**
 * !#en rotate
 * !#zh 返回旋转给定弧度后的新向量。
 * @method rotate
 * @param {number} radians
 * @param {Vec2} [out] - optional, the receiving vector
 * @return {Vec2} the result
 */
proto.rotate = function (radians, out) {
    out = out || new Vec2();
    out.x = this.x;
    out.y = this.y;
    return out.rotateSelf(radians);
};

/**
 * !#en rotate self
 * !#zh 按指定弧度旋转向量。
 * @method rotateSelf
 * @param {number} radians
 * @return {Vec2} returns this
 * @chainable
 */
proto.rotateSelf = function (radians) {
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    var x = this.x;
    this.x = cos * x - sin * this.y;
    this.y = sin * x + cos * this.y;
    return this;
};

//_serialize: function () {
//    return [this.x, this.y];
//},
//_deserialize: function (data) {
//    this.x = data[0];
//    this.y = data[1];
//}

// static

/**
 * !#en return a Vec2 object with x = 1 and y = 1.
 * !#zh 新 Vec2 对象。
 * @property ONE
 * @type Vec2
 * @static
 */
JS.get(Vec2, 'ONE', function () {
    return new Vec2(1.0, 1.0);
});

/**
 * !#en return a Vec2 object with x = 0 and y = 0.
 * !#zh 返回 x = 0 和 y = 0 的 Vec2 对象。
 * @property ZERO
 * @type Vec2
 * @static
 */
JS.get(Vec2, 'ZERO', function () {
    return new Vec2(0.0, 0.0);
});

/**
 * !#en return a Vec2 object with x = 0 and y = 1.
 * !#zh 返回 x = 0 和 y = 1 的 Vec2 对象。
 * @property UP
 * @type Vec2
 * @static
 */
JS.get(Vec2, 'UP', function () {
    return new Vec2(0.0, 1.0);
});

/**
 * !#en return a Vec2 object with x = 1 and y = 0.
 * !#zh 返回 x = 1 和 y = 0 的 Vec2 对象。
 * @property RIGHT
 * @type Vec2
 * @static
 */
JS.get(Vec2, 'RIGHT', function () {
    return new Vec2(1.0, 0.0);
});

cc.Vec2 = Vec2;

/**
 * @module cc
 */


/**
 * !#en The convenience method to create a new {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}} 对象。
 * @method v2
 * @param {Number|Object} [x=0]
 * @param {Number} [y=0]
 * @return {Vec2}
 * @example
 * var v1 = cc.v2();
 * var v2 = cc.v2(0, 0);
 * var v3 = cc.v2(v2);
 * var v4 = cc.v2({x: 100, y: 100});
 */
cc.v2 = function v2 (x, y) {
    return new Vec2(x, y);
};

/**
 * !#en The convenience method to creates a new {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}} 对象。
 * @method p
 * @param {Number|Object} [x=0] a Number or a size object
 * @param {Number} [y=0]
 * @return {Vec2}
 * @example
 * var point1 = cc.p();
 * var point2 = cc.p(100, 100);
 * var point3 = cc.p(point2);
 * var point4 = cc.p({x: 100, y: 100});
 */
cc.p = cc.v2;


// Functional style API, for backward compatibility

/**
 * !#en Check whether a point's value equals to another.
 * !#zh 判断两个向量是否相等。
 * @method pointEqualToPoint
 * @param {Vec2} point1
 * @param {Vec2} point2
 * @return {Boolean}
 */
cc.pointEqualToPoint = function (point1, point2) {
    return point1 && point2 && (point1.x === point2.x) && (point1.y === point2.y);
};

module.exports = cc.Vec2;
