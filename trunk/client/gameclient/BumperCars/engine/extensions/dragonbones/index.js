/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * !#en
 * The global main namespace of DragonBones, all classes, functions,
 * properties and constants of DragonBones are defined in this namespace
 * !#zh
 * DragonBones 的全局的命名空间，
 * 与 DragonBones 相关的所有的类，函数，属性，常量都在这个命名空间中定义。
 * @module dragonBones
 * @main dragonBones
 */

/*
 * Reference:
 * http://dragonbones.com/cn/index.html
 */

dragonBones = CC_JSB ? dragonBones : require('./lib/dragonBones');

dragonBones.DisplayType = {
    Image : 0,
    Armature : 1,
    Mesh : 2
};

dragonBones.ArmatureType = {
    Armature : 0,
    MovieClip : 1,
    Stage : 2
};

dragonBones.ExtensionType = {
    FFD : 0,
    AdjustColor : 10,
    BevelFilter : 11,
    BlurFilter : 12,
    DropShadowFilter : 13,
    GlowFilter : 14,
    GradientBevelFilter : 15,
    GradientGlowFilter : 16
};

dragonBones.EventType = {
    Frame : 0,
    Sound : 1
};

dragonBones.ActionType = {
    Play : 0,
    Stop : 1,
    GotoAndPlay : 2,
    GotoAndStop : 3,
    FadeIn : 4,
    FadeOut : 5
};

dragonBones.AnimationFadeOutMode = {
    None : 0,
    SameLayer : 1,
    SameGroup : 2,
    SameLayerAndGroup : 3,
    All : 4
};

if (!CC_EDITOR || !Editor.isMainProcess) {

    if (!CC_JSB) {
        require('./CCFactory');
        require('./CCSlot');
        require('./CCTextureData');
        require('./CCArmatureDisplay');
    }

    // require the component for dragonbones
    require('./DragonBonesAsset');
    require('./DragonBonesAtlasAsset');
    require('./ArmatureDisplay')
} else {
    require('./DragonBonesAsset');
    require('./DragonBonesAtlasAsset');
}
