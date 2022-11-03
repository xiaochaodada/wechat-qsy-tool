
function t(t, i, n) {
    return i in t ? Object.defineProperty(t, i, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = n, t;
}

var i, n = getApp(), e = wx.createInnerAudioContext();

e.src = "/Game/pages/tools/huarong/click.mp3";

var o = null, a = null;

 Page((t(i = {
    data: {
        windowWidth: n.windowWidthh,
        numData: [],
        m: "00",
        s: "00",
        step: 0,
        nowDifficulty: 4,
        maxDifficulty: 10
    },
    onLoad: function(t) {
        this.ad_set();
    },
    ad_show: function() {
        a && a.show(function() {
            wx.showToast({
                title: "看完视频就刷新哟",
                icon: "loading",
                duration: 2e3
            });
        });
    }
}, "onLoad", function() {
    this.initNum(this.data.nowDifficulty);
}), t(i, "isStart", !1), t(i, "goGame", function() {
    this.isStart || (this.isStart = !0, this.isPass = !1, this.setData({
        m: "00",
        s: "00",
        step: 0
    }), this.disorganize(this.data.numData), this.countdown());
}), t(i, "reset", function() {
    this.isStart = !1, this.isPass = !1, this.initNum(this.data.nowDifficulty), clearInterval(this.timer), 
    this.timer = null, this.time = 0;
}), t(i, "gameOver", function() {
    var t = this.data.numData;
    if (t[t.length - 1].isEmpty && t[t.length - 2].num == t.length - 1) {
        var i = !0;
        for (var n in t) if (t[n].num != parseInt(n) + 1) {
            i = !1;
            break;
        }
        i && (clearInterval(this.timer), this.timer = null, this.time = 0, this.isPass = !0, 
        this.isStart = !1, wx.showModal({
            title: "提示",
            content: "您已过关啦！",
            showCancel: !1
        }));
    }
}), t(i, "adGet", function() {
    qq.createRewardedVideoAd && (videoAd = qq.createRewardedVideoAd({
        adUnitId: ""
    }), videoAd.onError(function(t) {}), videoAd.onClose(function(t) {
        (t && t.isEnded || void 0 === t) && console.log("广告奖励发放");
    }));
}), t(i, "openVideoAd", function() {
    console.log("打开激励视频"), this.adGet(), this.goGame(), videoAd && videoAd.show().catch(function(t) {
        videoAd.load().then(function() {
            return videoAd.show();
        });
    });
}), t(i, "isPass", !1), t(i, "goMove", function(t) {
    if (!this.isPass && this.isStart) {
        var i = t.currentTarget.dataset.index, n = this.data.nowDifficulty, o = this.data.numData, a = this.data.step;
        for (var s in o) if (i == s) {
            var r = "";
            if (o[i - n] && o[i - n].isEmpty) r = i - n; else if (o[i + n] && o[i + n].isEmpty) r = i + n; else if (o[i - 1] && o[i - 1].isEmpty) {
                for (var c = 1; c < n; c++) if (i == n * c) return;
                r = i - 1;
            } else {
                if (!o[i + 1] || !o[i + 1].isEmpty) return;
                for (var d = 1; d < n; d++) if (i == n * d - 1) return;
                r = i + 1;
            }
            var u = [ o[r], o[s] ];
            o[s] = u[0], o[r] = u[1], a += 1, e.play();
            break;
        }
        this.setData({
            step: a,
            numData: o
        }), this.gameOver();
    }
}), t(i, "initNum", function(t) {
    var i = this.data.nowDifficulty, n = this.data.maxDifficulty;
    if (t >= i && t <= n) {
        for (var e = [], o = 1; o < t * t; o++) e.push({
            num: o,
            isEmpty: !1
        });
        e.push({
            num: t * t,
            isEmpty: !0
        }), this.setData({
            m: "00",
            s: "00",
            step: 0,
            numData: e
        });
    } else console.error("初始化题目错误：难度超出限制大小");
}), t(i, "disorganize", function(t) {
    for (this.data.nowDifficulty, t.sort(function() {
        return .5 - Math.random();
    }); !t[t.length - 1].isEmpty; ) t.sort(function() {
        return .5 - Math.random();
    });
    for (var i = 0, n = 0; n < t.length; n++) for (var e = n + 1; e < t.length; e++) t[n].num > t[e].num && (i += 1);
    i % 2 == 0 ? this.setData({
        numData: t
    }) : this.disorganize(t);
}), t(i, "timer", null), t(i, "time", 0), t(i, "countdown", function() {
    var t = this;
    clearInterval(t.timer), t.timer = null, t.timer = setInterval(function() {
        if (t.time += 1, t.time > 3600) return clearInterval(t.timer), t.timer = null, t.time = 0, 
        void wx.showModal({
            title: "超时提示",
            content: "您的游戏时间已超时，请重新开始游戏",
            showCancel: !1,
            success: function(i) {
                t.isPass = !0, t.isStart = !1, t.setData({
                    m: "00",
                    s: "00",
                    step: 0
                });
            }
        });
        if (t.time < 60) t.setData({
            s: t.time < 10 ? "0" + t.time : t.time,
            m: "00"
        }); else {
            var i = parseInt(t.time / 60), n = t.time - 60 * i;
            t.setData({
                m: i < 10 ? "0" + i : i,
                s: n < 10 ? "0" + n : n
            });
        }
    }, 1e3);
}), t(i, "choose", function() {
    var t = this, i = this.data.nowDifficulty;
    wx.showActionSheet({
        itemList: [ "3 × 3", "4 × 4", "5 × 5", "6 × 6", "7 × 7", "8 × 8" ],
        success: function(n) {
            n.tapIndex + 3 != i && (t.setData({
                nowDifficulty: n.tapIndex + 3
            }), t.reset());
        }
    });
}), t(i, "ad_set", function() {
    wx.createRewardedVideoAd && ((a = wx.createRewardedVideoAd({
        adUnitId: ""
    })).onLoad(function() {
        console.log("拉取激励广告成功");
    }), a.onError(function(t) {
        console.log("拉取激励广告失败");
    }), a.onClose(function(t) {
        t && t.isEnded ? console.log("激励广告加载完成") : console.log("激励广告被强制关闭");
    }));
}), t(i, "onShareAppMessage", function(t) {
    return {
        title: "数字华容道，等你来挑战！",
        path: "/Game/pages/tools/huarong/index"
    };
}), i))