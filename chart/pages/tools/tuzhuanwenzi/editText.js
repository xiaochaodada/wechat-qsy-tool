var t = require("../utils/tuzhuanwenzi"), n = getApp(), e = wx.getSystemInfoSync(), o = n.globalData.sheight
Page({
    data: {
        scrollViewHeight: o,
        contents: "",
        isIpx: -1 !== e.model.indexOf("iPhone X")
    },
    init: function() {
        var t = this;
        wx.getStorage({
            key: "contents",
            success: function(n) {
                var e = "", o = [];
                try {
                    o = JSON.parse(n.data);
                } catch (t) {
                    o = [];
                }
                o.forEach(function(t, n) {
                    if (t.words_result) {
                        var o = t.words_result.reduce(function(t, n, e, o) {
                            return t + n.words + "\n";
                        }, "");
                        e += o + "\n";
                    }
                }), t.setData({
                    contents: e
                });
            }
        });
    },
    onLoad: function() {
        var t = this;
        wx.getStorage({
            key: "contents",
            success: function(n) {
                var e = "", o = [];
                try {
                    o = JSON.parse(n.data);
                } catch (t) {
                    o = [];
                }
                o.forEach(function(t, n) {
                    if (t.words_result) {
                        var o = t.words_result.reduce(function(t, n, e, o) {
                            return t + n.words + "\n";
                        }, "");
                        e += o + "\n";
                    }
                }), t.setData({
                    contents: e
                });
            }
        });
    },
    copyContent: function() {
        (0, t.sendLog)({}, 13, 700127), wx.setClipboardData({
            data: this.data.contents,
            success: function() {
                wx.showToast({
                    title: "已复制全文"
                });
            }
        });
    },
    focusEvent: function() {
        (0, t.sendLog)({}, 13, 700128);
    },
    saveContent: function(t) {
        this.setData({
            contents: t.detail.value
        });
    },
    sendFriends: function() {
        (0, t.sendLog)({}, 13, 700126);
    },
    onShareAppMessage: function() {
        return (0, t.sendLog)({}, 13, 700124), {
            title: "最好用的图片转文字工具",
            path: "/chart/pages/tools/tuzhuanwenzi/tuzhuanwenzi",
            success: function() {
                console.log("success");
            },
            fail: function() {
                console.log("fail");
            }
        };
    }
});