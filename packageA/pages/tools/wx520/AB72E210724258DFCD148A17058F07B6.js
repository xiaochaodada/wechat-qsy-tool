var t = function(t) {
    return new Promise(function(n, e) {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: t.dWidth,
            height: t.dHeight,
            destWidth: t.dWidth,
            destHeight: t.dHeight,
            canvasId: t.canvasId,
            fileType: "jpg",
            quality: .8,
            success: function(t) {
                var e = t.tempFilePath;
                n(e);
            },
            fail: function(t) {
                e(t);
            }
        });
    });
}, n = function(t) {
    return new Promise(function(n, e) {
        wx.getFileSystemManager().readFile({
            filePath: t,
            success: function(t) {
                n(t.data);
            },
            fail: function(t) {
                e(t);
            }
        });
    });
}, e = function(t) {
    return new Promise(function(n, e) {
        wx.cloud.callFunction({
            name: "checkImg",
            data: {
                imgBuffer: t
            },
            success: function(t) {
                n(t.result);
            },
            fail: function(t) {
                e(t);
            }
        });
    });
}, c = function(t) {
    return new Promise(function(n, e) {
        wx.cloud.callFunction({
            name: "checkMsg",
            data: {
                content: t
            },
            success: function(t) {
                n(t.result);
            },
            fail: function(t) {
                e(t);
            }
        });
    });
}, i = function(t) {
    wx.setClipboardData({
        data: t,
        success: function(t) {
            wx.showToast({
                title: "已复制"
            });
        }
    });
};

module.exports = {
    checkMsg: c,
    checkImg: function(c) {
        return function(t) {
            var n = t.imgUrl, e = t.width, c = t.height, i = Math.min(160, e), o = c * i / e;
            return new Promise(function(u, a) {
                t.ctx.drawImage(n, 0, 0, e, c), t.dWidth = i, t.dHeight = o, t.ctx.draw(!1, function() {
                    u(t);
                });
            });
        }(c).then(t).then(n).then(e);
    },
    copyText: i,
    startCheckMsg: function(t) {
        c(t).then(function(n) {
            87014 == n.errCode ? wx.showModal({
                title: "提示",
                content: "你输入的内容包含了非法文本，请修改！",
                showCancel: !1,
                confirmText: "知道了"
            }) : i(t);
        }).catch(function(n) {
            console.log(n), i(t);
        });
    }
};