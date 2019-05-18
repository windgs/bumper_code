__require=function e(t,a,n){function r(i,c){if(!a[i]){if(!t[i]){var l=i.split("/");if(l=l[l.length-1],!t[l]){var s="function"==typeof __require&&__require;if(!c&&s)return s(l,!0);if(o)return o(l,!0);throw new Error("Cannot find module '"+i+"'")}}var u=a[i]={exports:{}};t[i][0].call(u.exports,function(e){return r(t[i][1][e]||e)},u,u.exports,e,t,a,n)}return a[i].exports}for(var o="function"==typeof __require&&__require,i=0;i<n.length;i++)r(n[i]);return r}({Common:[function(e,t,a){"use strict";cc._RF.push(t,"79cffzRxpVFb4mm65bZpPa8","Common"),Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(){}return e.CreateImage=function(e,t){if(e&&t)try{var a=wx.createImage();a.onload=function(){try{var t=new cc.Texture2D;t.initWithElement(a),t.handleLoadedTexture(),e.getComponent(cc.Sprite).spriteFrame=new cc.SpriteFrame(t)}catch(t){cc.log(t),e.active=!1}},a.src=t}catch(t){cc.log(t),e.active=!1}},e.SetNodeText=function(e,t){if(e){var a=e.getComponent(cc.Label);a&&(a.string=t)}},e.SetNodeTexture=function(e,t){if(e&&t){var a=cc.loader.getRes("subdomain",cc.SpriteAtlas);if(a){var n=a.getSpriteFrame(t);if(n){var r=e.getComponent(cc.Sprite);r&&(r.spriteFrame=n)}}}},e.GetByteVal=function(e,t){for(var a="",n=0,r=0;r<e.length&&(null!=e[r].match(/[^\x00-\xff]/gi)?n+=2:n+=1,!(n>t));r++)a+=e[r];return a},e}();a.default=n,cc._RF.pop()},{}],FriendRankList:[function(e,t,a){"use strict";cc._RF.push(t,"c2499akU9VHPLW+LYRIuWlO","FriendRankList"),Object.defineProperty(a,"__esModule",{value:!0});var n=e("./RankListBase"),r=e("./GlobalVar"),o=e("./WXHelper"),i=cc._decorator,c=i.ccclass,l=(i.property,function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.showRankList=function(){var e=this,t=function(t){if(t&&t.data){console.log("\u83b7\u53d6\u7528\u6237\u597d\u53cb\u7684\u6258\u7ba1\u6570\u636e:",t),e.dataSort(t.data);for(var a=-1,n=0;n<30&&!(t.data.length<=n);n++){var o=cc.instantiate(e.prefabRankItem);o.parent=e.scrollViewContent,o.getComponent("RankItem").initView(n+1,t.data[n],r.default.rankType),o.y=-100*n,t.data[n].avatarUrl==r.default.avatarUrl&&(a=n)}var i=e.getSelfData(t.data);if(i){i.is_rank=-1!=a;var c=cc.instantiate(e.prefabRankItem);c.parent=e.node,c.getComponent("RankItem").initView(a+1,i,r.default.rankType,!0),c.y=-320}e.rankingScrollView.node.active=!0}};1==r.default.rankType?o.default.GetFriendCloudData(["kill_num"],t):2==r.default.rankType&&o.default.GetFriendCloudData(["star_num"],t)},t.prototype.getSelfData=function(e){for(var t=0;t<e.length;t++)if(e[t].avatarUrl==r.default.avatarUrl)return e[t];return null},t.prototype.dataSort=function(e){e.sort(function(e,t){var a=parseInt(e.KVDataList[0].value),n=parseInt(t.KVDataList[0].value);return e.score=a,t.score=n,n-a})},t=__decorate([c],t)}(n.default));a.default=l,cc._RF.pop()},{"./GlobalVar":"GlobalVar","./RankListBase":"RankListBase","./WXHelper":"WXHelper"}],GlobalVar:[function(e,t,a){"use strict";cc._RF.push(t,"793f7+RVhNFkJVrK2Tdj/UK","GlobalVar"),Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(){}return e.groupShareTicket=null,e.rankType=null,e.avatarUrl=null,e}();a.default=n,cc._RF.pop()},{}],GroupRankList:[function(e,t,a){"use strict";cc._RF.push(t,"85613yjyVlEYK0fnJdowJoS","GroupRankList"),Object.defineProperty(a,"__esModule",{value:!0});var n=e("./GlobalVar"),r=e("./WXHelper"),o=e("./RankListBase"),i=cc._decorator,c=i.ccclass,l=(i.property,function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.showRankList=function(){var e=this,t=function(t){if(t&&t.data){console.log("\u83b7\u53d6\u7fa4\u540c\u73a9\u7528\u6237\u7684\u6258\u7ba1\u6570\u636e:",t),e.dataSort(t.data);for(var a=0;a<t.data.length;a++){var r=cc.instantiate(e.prefabRankItem);if(r.parent=e.scrollViewContent,r.getComponent("RankItem").initView(a+1,t.data[a],n.default.rankType),r.y=-100*a,t.data[a].avatarUrl==n.default.avatarUrl){var o=cc.instantiate(e.prefabRankItem);t.data[a].is_rank=!0,o.parent=e.node,o.getComponent("RankItem").initView(a+1,t.data[a],n.default.rankType,!0),o.y=-320}}e.rankingScrollView.node.active=!0}};1==n.default.rankType?r.default.GetGroupCloudData(["kill_num"],t):2==n.default.rankType&&r.default.GetGroupCloudData(["star_num"],t)},t.prototype.dataSort=function(e){for(var t=e.length-1;t>=0;t--){var a=e[t];a&&a.KVDataList.length<=0&&e.splice(t,1)}e.sort(function(e,t){var a=parseInt(e.KVDataList[0].value),n=parseInt(t.KVDataList[0].value);return e.score=a,t.score=n,n-a})},t=__decorate([c],t)}(o.default));a.default=l,cc._RF.pop()},{"./GlobalVar":"GlobalVar","./RankListBase":"RankListBase","./WXHelper":"WXHelper"}],MainScene:[function(e,t,a){"use strict";cc._RF.push(t,"3904cQPHqBLu71IZ1DptBX+","MainScene"),Object.defineProperty(a,"__esModule",{value:!0});var n=e("./MessageType"),r=e("./GlobalVar"),o=e("./WXHelper"),i=cc._decorator,c=i.ccclass,l=i.property,s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.groupRankList=null,t.friendRankList=null,t}return __extends(t,e),t.prototype.onLoad=function(){var e=cc.view;cc.view._convertPointWithScale=function(t){var a=e._viewPortRect;t.x=(t.x-a.x)/(e._scaleX/2),t.y=(t.y-a.y)/(e._scaleY/2)},cc.view._convertTouchesWithScale=function(t){for(var a,n,r,o=e._viewPortRect,i=e._scaleX/2,c=e._scaleY/2,l=0;l<t.length;l++)n=(a=t[l])._point,r=a._prevPoint,n.x=(n.x-o.x)/i,n.y=(n.y-o.y)/c,r.x=(r.x-o.x)/i,r.y=(r.y-o.y)/c}},t.prototype.start=function(){var e=this;cc.log("\u5b50\u57df\u573a\u666f\u8fd0\u884c"),this.loadRes(),this.hideAllLayer(),wx.onMessage(function(t){cc.log("\u63a5\u6536\u4e3b\u57df\u53d1\u6765\u6d88\u606f\uff1a",t),t.messageType==n.MessagetType.MT_FriendRankList?(r.default.rankType=parseInt(t.rankType),e.showFetchFriendRankList()):t.messageType==n.MessagetType.MT_OverRankList||t.messageType==n.MessagetType.MT_JJCYPlayer||(t.messageType==n.MessagetType.MT_GroupRankList?(r.default.rankType=t.rankType,r.default.groupShareTicket=t.groupShareTicket,e.showGroupRankList()):t.messageType==n.MessagetType.MT_UpdateJJCYPlayer||t.messageType==n.MessagetType.MT_FriendRankList&&e.clear())});o.default.GetUseInfo(function(e){cc.log("\u83b7\u53d6\u7528\u6237\u4fe1\u606f\u6210\u529f---\x3e>>",e),r.default.avatarUrl=e.data[0].avatarUrl})},t.prototype.showFetchFriendRankList=function(){this.hideAllLayer();var e=this.friendRankList.getComponent("FriendRankList");e&&e.show(),this.friendRankList.active=!0},t.prototype.showGroupRankList=function(){this.hideAllLayer();var e=this.groupRankList.getComponent("GroupRankList");e&&e.show(),this.groupRankList.active=!0},t.prototype.loadRes=function(){cc.loader.loadRes("subdomain",cc.SpriteAtlas,function(e,t){cc.log("\u5b50\u57df\u8d44\u6e90\u52a0\u8f7d\u5b8c\u6210")})},t.prototype.hideAllLayer=function(){this.groupRankList&&(this.groupRankList.active=!1),this.friendRankList&&(this.friendRankList.active=!1)},t.prototype.clear=function(){var e=this.groupRankList.getComponent("GroupRankList");e&&e.clear();var t=this.friendRankList.getComponent("FriendRankList");t&&t.clear()},__decorate([l(cc.Node)],t.prototype,"groupRankList",void 0),__decorate([l(cc.Node)],t.prototype,"friendRankList",void 0),t=__decorate([c],t)}(cc.Component);a.default=s,cc._RF.pop()},{"./GlobalVar":"GlobalVar","./MessageType":"MessageType","./WXHelper":"WXHelper"}],MessageType:[function(e,t,a){"use strict";cc._RF.push(t,"078a68vmgRKI6HL2+wAyHkk","MessageType"),Object.defineProperty(a,"__esModule",{value:!0}),function(e){e[e.MT_FriendRankList=1]="MT_FriendRankList",e[e.MT_OverRankList=2]="MT_OverRankList",e[e.MT_JJCYPlayer=3]="MT_JJCYPlayer",e[e.MT_GroupRankList=4]="MT_GroupRankList",e[e.MT_UpdateJJCYPlayer=5]="MT_UpdateJJCYPlayer",e[e.MT_Clear=6]="MT_Clear"}(a.MessagetType||(a.MessagetType={})),cc._RF.pop()},{}],RankItem:[function(e,t,a){"use strict";cc._RF.push(t,"47686h4Bn1I47AjBIzX1z8m","RankItem"),Object.defineProperty(a,"__esModule",{value:!0});var n=e("./Common"),r=cc._decorator,o=r.ccclass,i=r.property,c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.bgImg=null,t.cupImg=null,t.headImg=null,t.playerName=null,t.rankNum=null,t.killRank=null,t.gradingRank=null,t}return __extends(t,e),t.prototype.start=function(){},t.prototype.initView=function(e,t,a,r){if(void 0===r&&(r=!1),e<=3||!1===t.is_rank?(this.cupImg.active=!0,this.rankNum.active=!1,!1===t.is_rank?n.default.SetNodeTexture(this.cupImg,"bw"):n.default.SetNodeTexture(this.cupImg,"No"+e)):(this.rankNum.active=!0,this.cupImg.active=!1,n.default.SetNodeText(this.rankNum,e.toString())),r&&n.default.SetNodeTexture(this.bgImg,"paimingtiao-B"),1==a)this.gradingRank.active=!1,this.killRank.active=!0,n.default.SetNodeText(this.killRank.getChildByName("Num"),t.score);else if(2==a){this.gradingRank.active=!0,this.killRank.active=!1;var o="Grading_"+(Math.floor(t.score/25)+1);n.default.SetNodeTexture(this.gradingRank.getChildByName("Icon"),o),n.default.SetNodeText(this.gradingRank.getChildByName("Num"),(t.score%25).toString())}var i=n.default.GetByteVal(t.nickname,10);n.default.CreateImage(this.headImg,t.avatarUrl),n.default.SetNodeText(this.playerName,i)},__decorate([i(cc.Node)],t.prototype,"bgImg",void 0),__decorate([i(cc.Node)],t.prototype,"cupImg",void 0),__decorate([i(cc.Node)],t.prototype,"headImg",void 0),__decorate([i(cc.Node)],t.prototype,"playerName",void 0),__decorate([i(cc.Node)],t.prototype,"rankNum",void 0),__decorate([i(cc.Node)],t.prototype,"killRank",void 0),__decorate([i(cc.Node)],t.prototype,"gradingRank",void 0),t=__decorate([o],t)}(cc.Component);a.default=c,cc._RF.pop()},{"./Common":"Common"}],RankListBase:[function(e,t,a){"use strict";cc._RF.push(t,"3020c3nFJpNCaEYA6RNrzUq","RankListBase"),Object.defineProperty(a,"__esModule",{value:!0});var n=cc._decorator,r=n.ccclass,o=n.property,i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.rankingScrollView=null,t.scrollViewContent=null,t.prefabRankItem=null,t}return __extends(t,e),t.prototype.onLoad=function(){cc.director.getWinSize().height/cc.director.getWinSize().width-16/9>.1&&(this.node.scaleY=cc.director.getWinSize().height/1334)},t.prototype.show=function(){this.removeChild(),this.showRankList()},t.prototype.clear=function(){this.removeChild()},t.prototype.removeChild=function(){this.node.removeChildByTag(1e3),this.scrollViewContent.removeAllChildren(),this.rankingScrollView.node.active=!1},t.prototype.showRankList=function(){},t.prototype.dataSort=function(e){for(var t=e.length-1;t>=0;t--){var a=e[t];a&&a.KVDataList.length<=0&&e.splice(t,1)}e.sort(function(e,t){var a=parseInt(e.KVDataList[0].value),n=parseInt(t.KVDataList[0].value);return e.score=a,t.score=n,n-a})},__decorate([o(cc.ScrollView)],t.prototype,"rankingScrollView",void 0),__decorate([o(cc.Node)],t.prototype,"scrollViewContent",void 0),__decorate([o(cc.Prefab)],t.prototype,"prefabRankItem",void 0),t=__decorate([r],t)}(cc.Component);a.default=i,cc._RF.pop()},{}],WXHelper:[function(e,t,a){"use strict";cc._RF.push(t,"c9a72pLfUBOZL5A/XD+xpBl","WXHelper"),Object.defineProperty(a,"__esModule",{value:!0});var n=e("./GlobalVar"),r=function(){function e(){}return e.IsWXContext=function(){return!0},e.GetUseInfo=function(e){wx.getUserInfo({withCredentials:!1,openIdList:["selfOpenId"],lang:"zh_CN",success:e,fail:function(){cc.log("\u83b7\u53d6\u7528\u6237\u4fe1\u606f\u5931\u8d25:")}})},e.GetGroupCloudData=function(e,t){console.log("shareTicket:",n.default.groupShareTicket),wx.getGroupCloudStorage({shareTicket:n.default.groupShareTicket,keyList:e,success:t,fail:function(e){console.log("Rank:\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25:",e)}})},e.GetFriendCloudData=function(e,t){wx.getFriendCloudStorage({keyList:e,success:function(e){console.log("wx.getFriendCloudStorage success",e),t(e)},fail:function(e){console.log("wx.getFriendCloudStorage fail",e)}})},e}();a.default=r,cc._RF.pop()},{"./GlobalVar":"GlobalVar"}]},{},["Common","FriendRankList","GlobalVar","GroupRankList","MainScene","MessageType","RankItem","RankListBase","WXHelper"]);