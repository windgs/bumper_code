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

var Enum = require('./cocos2d/core/platform/CCEnum');

// the html element displays log in web page (cc.DebugMode.INFO_FOR_WEB_PAGE)
var logList;

/**
 * !#en Enum for debug modes.
 * !#zh 调试模式
 * @enum DebugMode
 */
cc.DebugMode = Enum({
    /**
     * !#en The debug mode none.
     * !#zh 禁止模式，禁止显示任何日志信息。
     * @property NONE
     * @type {Number}
     * @static
     */
    NONE: 0,
    /**
     * !#en The debug mode info.
     * !#zh 信息模式，在 console 中显示所有日志。
     * @property INFO
     * @type {Number}
     * @static
     */
    INFO: 1,
    /**
     * !#en The debug mode warn.
     * !#zh 警告模式，在 console 中只显示 warn 级别以上的（包含 error）日志。
     * @property WARN
     * @type {Number}
     * @static
     */
    WARN: 2,
    /**
     * !#en The debug mode error.
     * !#zh 错误模式，在 console 中只显示 error 日志。
     * @property ERROR
     * @type {Number}
     * @static
     */
    ERROR: 3,
    /**
     * !#en The debug mode info for web page.
     * !#zh 信息模式（仅 WEB 端有效），在画面上输出所有信息。
     * @property INFO_FOR_WEB_PAGE
     * @type {Number}
     * @static
     */
    INFO_FOR_WEB_PAGE: 4,
    /**
     * !#en The debug mode warn for web page.
     * !#zh 警告模式（仅 WEB 端有效），在画面上输出 warn 级别以上的（包含 error）信息。
     * @property WARN_FOR_WEB_PAGE
     * @type {Number}
     * @static
     */
    WARN_FOR_WEB_PAGE: 5,
    /**
     * !#en The debug mode error for web page.
     * !#zh 错误模式（仅 WEB 端有效），在画面上输出 error 信息。
     * @property ERROR_FOR_WEB_PAGE
     * @type {Number}
     * @static
     */
    ERROR_FOR_WEB_PAGE: 6
});

/**
 * @module cc
 */

/**
 * !#en Init Debug setting.
 * !#zh 设置调试模式。
 * @method _initDebugSetting
 * @param {DebugMode} mode
 */
cc._initDebugSetting = function (mode) {
    // reset
    cc.log = cc.warn = cc.error = cc.assert = function () { };

    if (mode === cc.DebugMode.NONE)
        return;

    if (!CC_JSB && mode > cc.DebugMode.ERROR) {
        //log to web page

        function logToWebPage (msg) {
            if (!cc._canvas)
                return;

            if (!logList) {
                var logDiv = document.createElement("Div");
                logDiv.setAttribute("id", "logInfoDiv");
                logDiv.setAttribute("width", "200");
                logDiv.setAttribute("height", cc._canvas.height);
                var logDivStyle = logDiv.style;
                logDivStyle.zIndex = "99999";
                logDivStyle.position = "absolute";
                logDivStyle.top = logDivStyle.left = "0";

                logList = document.createElement("textarea");
                logList.setAttribute("rows", "20");
                logList.setAttribute("cols", "30");
                logList.setAttribute("disabled", "true");
                var logListStyle = logList.style;
                logListStyle.backgroundColor = "transparent";
                logListStyle.borderBottom = "1px solid #cccccc";
                logListStyle.borderTopWidth = logListStyle.borderLeftWidth = logListStyle.borderRightWidth = "0px";
                logListStyle.borderTopStyle = logListStyle.borderLeftStyle = logListStyle.borderRightStyle = "none";
                logListStyle.padding = "0px";
                logListStyle.margin = 0;

                logDiv.appendChild(logList);
                cc._canvas.parentNode.appendChild(logDiv);
            }

            logList.value = logList.value + msg + "\r\n";
            logList.scrollTop = logList.scrollHeight;
        }

        cc.error = function () {
            logToWebPage("ERROR :  " + cc.js.formatStr.apply(null, arguments));
        };
        cc.assert = function (cond, msg) {
            'use strict';
            if (!cond && msg) {
                msg = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments));
                logToWebPage("ASSERT: " + msg);
            }
        };
        if (mode !== cc.DebugMode.ERROR_FOR_WEB_PAGE) {
            cc.warn = function () {
                logToWebPage("WARN :  " + cc.js.formatStr.apply(null, arguments));
            };
        }
        if (mode === cc.DebugMode.INFO_FOR_WEB_PAGE) {
            cc.log = cc.info = function () {
                logToWebPage(cc.js.formatStr.apply(null, arguments));
            };
        }
    }
    else if (console && console.log.apply) {//console is null when user doesn't open dev tool on IE9
        //log to console

        // For JSB
        if (!console.error) console.error = console.log;
        if (!console.warn) console.warn = console.log;

        /**
         * !#en
         * Outputs an error message to the Cocos Creator Console (editor) or Web Console (runtime).<br/>
         * - In Cocos Creator, error is red.<br/>
         * - In Chrome, error have a red icon along with red message text.<br/>
         * !#zh
         * 输出错误消息到 Cocos Creator 编辑器的 Console 或运行时页面端的 Console 中。<br/>
         * - 在 Cocos Creator 中，错误信息显示是红色的。<br/>
         * - 在 Chrome 中，错误信息有红色的图标以及红色的消息文本。<br/>
         *
         * @method error
         * @param {any} msg - A JavaScript string containing zero or more substitution strings.
         * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
         */
        if (CC_EDITOR) {
            cc.error = Editor.error;
        }
        else if (console.error.bind) {
            // use bind to avoid pollute call stacks
            cc.error = console.error.bind(console);
        }
        else {
            cc.error = CC_JSB ? console.error : function () {
                return console.error.apply(console, arguments);
            };
        }
        cc.assert = function (cond, msg) {
            if (!cond) {
                if (msg) {
                    msg = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments));
                }
                if (CC_DEV) {
                    debugger;
                }
                if (CC_TEST) {
                    ok(false, msg);
                }
                else {
                    throw new Error(msg);
                }
            }
        }
    }
    if (mode !== cc.DebugMode.ERROR) {
        /**
         * !#en
         * Outputs a warning message to the Cocos Creator Console (editor) or Web Console (runtime).
         * - In Cocos Creator, warning is yellow.
         * - In Chrome, warning have a yellow warning icon with the message text.
         * !#zh
         * 输出警告消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。<br/>
         * - 在 Cocos Creator 中，警告信息显示是黄色的。<br/>
         * - 在 Chrome 中，警告信息有着黄色的图标以及黄色的消息文本。<br/>
         * @method warn
         * @param {any} msg - A JavaScript string containing zero or more substitution strings.
         * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
         */
        if (CC_EDITOR) {
            cc.warn = Editor.warn;
        }
        else if (console.warn.bind) {
            // use bind to avoid pollute call stacks
            cc.warn = console.warn.bind(console);
        }
        else {
            cc.warn = CC_JSB ? console.warn : function () {
                return console.warn.apply(console, arguments);
            };
        }
    }
    if (CC_EDITOR) {
        cc.log = Editor.log;
        cc.info = Editor.info;
    }
    else if (mode === cc.DebugMode.INFO) {
        /**
         * !#en Outputs a message to the Cocos Creator Console (editor) or Web Console (runtime).
         * !#zh 输出一条消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。
         * @method log
         * @param {String|any} msg - A JavaScript string containing zero or more substitution strings.
         * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
         */
        if (CC_JSB) {
            if (scriptEngineType === "JavaScriptCore") {
                // console.log has to use `console` as its context for iOS 8~9. Therefore, apply it.
                cc.log = function () {
                    return console.log.apply(console, arguments);
                };
            } else {
                cc.log = console.log;
            }
        }
        else if (console.log.bind) {
            // use bind to avoid pollute call stacks
            cc.log = console.log.bind(console);
        }
        else {
            cc.log = function () {
                return console.log.apply(console, arguments);
            };
        }
        /**
         * !#en
         * Outputs an informational message to the Cocos Creator Console (editor) or Web Console (runtime).
         * - In Cocos Creator, info is blue.
         * - In Firefox and Chrome, a small "i" icon is displayed next to these items in the Web Console's log.
         * !#zh
         * 输出一条信息消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。
         * - 在 Cocos Creator 中，Info 信息显示是蓝色的。<br/>
         * - 在 Firefox 和  Chrome 中，Info 信息有着小 “i” 图标。
         * @method info
         * @param {any} msg - A JavaScript string containing zero or more substitution strings.
         * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
         */
        if (CC_JSB) {
            cc.info = (scriptEngineType === "JavaScriptCore") ? function () {
                (console.info || console.log).apply(console, arguments);
            } : (console.info || console.log);
        }
        else {
            cc.info = function () {
                (console.info || console.log).apply(console, arguments);
            };
        }
    }
};

cc._throw = CC_EDITOR ? Editor.error : function (error) {
    var stack = error.stack;
    if (stack) {
        cc.error(CC_JSB ? (error + '\n' + stack) : stack);
    }
    else {
        cc.error(error);
    }
};

// define log methods to lookup message ID

const debugInfos = require('./DebugInfos') || {};
const ERROR_MAP_URL = 'https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md';

function getTypedFormatter (type) {
    return function () {
        var id = arguments[0];
        var msg = CC_DEBUG ? (debugInfos[id] || 'unknown id') : `${type} ${id}, please go to ${ERROR_MAP_URL}#${id} to see details.`;
        if (arguments.length === 1) {
            return msg;
        }
        else if (arguments.length === 2) {
            return CC_DEBUG ? cc.js.formatStr(msg, arguments[1]) :
                msg + ' Arguments: ' + arguments[1];
        }
        else {
            var argsArray = cc.js.shiftArguments.apply(null, arguments);
            return CC_DEBUG ? cc.js.formatStr.apply(null, [msg].concat(argsArray)) :
                msg + ' Arguments: ' + argsArray.join(', ');
        }
    };
}

var logFormatter = getTypedFormatter('Log');
cc.logID = function () {
    cc.log(logFormatter.apply(null, arguments));
};

var warnFormatter = getTypedFormatter('Warning');
cc.warnID = function () {
    cc.warn(warnFormatter.apply(null, arguments));
};

var errorFormatter = getTypedFormatter('Error');
cc.errorID = function () {
    cc.error(errorFormatter.apply(null, arguments));
};

var assertFormatter = getTypedFormatter('Assert');
cc.assertID = function (cond) {
    'use strict';
    if (cond) {
        return;
    }
    cc.assert(false, assertFormatter.apply(null, cc.js.shiftArguments.apply(null, arguments)));
};

cc._getError = getTypedFormatter('ERROR');

// output all info by default before initialized

cc._initDebugSetting(cc.DebugMode.INFO);
