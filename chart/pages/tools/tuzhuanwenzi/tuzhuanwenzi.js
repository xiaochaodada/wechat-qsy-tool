var e = require("../utils/tuzhuanwenzi"), t = wx.getSystemInfoSync(), n = getApp();

Page({
    data: {
        showToast: !1,
        toastText: "",
        networkType: "",
        isIpx: -1 !== t.model.indexOf("iPhone X")
    },
    onLoad: function() {
        // getApp().pageOnLoad(this);
        var t = this;
        (0, e.sendLog)({}, 13, 700121);
        var o = this;
        wx.getNetworkType({
            success: function(e) {
                "none" === e.networkType && (o.setData({
                    networkType: "none"
                }), wx.showToast({
                    title: "请您连接网络",
                    icon: "none",
                    mask: !0
                }));
            }
        }), wx.onNetworkStatusChange(function(e) {
            t.setData({
                networkType: e.networkType
            });
        }), n.globalData.userInfo ? this.setData({
            userInfo: n.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? n.userInfoReadyCallback = function(e) {
            t.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(e) {
                n.globalData.userInfo = e.userInfo, t.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    handleEntranceClick: function(t) {
        var n = this;
        wx.chooseImage({
            sourceType: [ t ],
            sizeType: [ "compressed" ],
            success: function(t) {
                var o = t.tempFiles;
                (0, e.sendLog)({
                    number: o.length
                }, 13, 700129), (0, e.checkFileSize)(o, 10485760) || n.uploadImage(o).then(function(e) {
                    var t = 0;
                    return wx.hideLoading(), o.forEach(function(e, n) {
                        e.words_result && e.words_result.length > 0 && t++;
                    }), 0 == t ? n.setData({
                        showToast: !0,
                        toastText: "识别失败，请保持文字清晰"
                    }) : t !== o.length && n.setData({
                        showToast: !0,
                        toastText: "成功转换" + t + "张，失败" + (o.length - t) + "张"
                    }), setTimeout(function() {
                        n.setData({
                            showToast: !1,
                            toastText: ""
                        });
                    }, 3e3), t;
                }).then(function(e) {
                    0 != e && (e === o.length ? (wx.setStorageSync("contents", JSON.stringify(o)), wx.navigateTo({
                        url: "/chart/pages/tools/tuzhuanwenzi/editText"
                    })) : setTimeout(function() {
                        wx.setStorageSync("contents", JSON.stringify(o)), wx.navigateTo({
                            url: "/chart/pages/tools/tuzhuanwenzi/editText"
                        });
                    }, 3e3));
                });
            },
            fail: function() {
                console.log("选取图片失败");
            }
        });
    },
    openAlbum: function() {
        "none" !== this.data.networkType ? ((0, e.sendLog)({}, 13, 700123), this.handleEntranceClick("album")) : wx.showToast({
            title: "请您连接网络",
            icon: "none",
            mask: !0
        });
    },
    openCamera: function() {
        "none" !== this.data.networkType ? ((0, e.sendLog)({}, 13, 700122), this.handleEntranceClick("camera")) : wx.showToast({
            title: "请您连接网络",
            icon: "none",
            mask: !0
        });
    },
    uploadImage: function(e) {
        var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return new Promise(function(t, o) {
            wx.showLoading({
                title: "正在转换" + (n + 1) + "/" + e.length,
                mask: !0
            }), wx.uploadFile({
                url: "https://appwk.baidu.com/naapi/api/totxt",
                filePath: e[n].path,
                name: "image",
                formData: {
                    na_uncheck: 1,
                    parse_type: 2
                },
                success: function(e) {
                    var n = {
                        words_result: []
                    };
                    if (200 === e.statusCode && !n.error_code) {
                        n = e.data;
                        try {
                            n = JSON.parse(n);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    t(n);
                },
                fail: function() {
                    t({
                        words_result: []
                    });
                }
            });
        }).then(function(o) {
            if (Object.assign(e[n], o), ++n <= e.length - 1) return t.uploadImage(e, n);
        });
    },
    onShareAppMessage: function() {
        return (0, e.sendLog)({}, 13, 700124), {
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