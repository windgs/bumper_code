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


if (!CC_JSB) {
    window.b2 = require('../../../external/box2d/box2d');
    if (CC_QQPLAY) {
        // can only define global variable in this way
        b2 = window.b2;
    }
}

require('./CCPhysicsManager');
require('./CCRigidBody');
require('./CCPhysicsContact');

require('./collider/CCPhysicsCollider');
require('./collider/CCPhysicsChainCollider');
require('./collider/CCPhysicsCircleCollider');
require('./collider/CCPhysicsBoxCollider');
require('./collider/CCPhysicsPolygonCollider');

require('./joint/CCJoint');
require('./joint/CCDistanceJoint');
require('./joint/CCRevoluteJoint');
require('./joint/CCMouseJoint');
require('./joint/CCMotorJoint');
require('./joint/CCPrismaticJoint');
require('./joint/CCWeldJoint');
require('./joint/CCWheelJoint');
require('./joint/CCRopeJoint');

if (!CC_JSB) {
    require('./platform/CCPhysicsDebugDraw');
    require('./platform/CCPhysicsUtils');
    require('./platform/CCPhysicsContactListner');
    require('./platform/CCPhysicsAABBQueryCallback');
    require('./platform/CCPhysicsRayCastCallback');
}