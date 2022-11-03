var app = getApp();
Page({
    data: {
        block: {},
        randNum: "",
        score: 0,
        time: 30,
        isHidden: !0
    },
    onLoad: function(t) {
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })
        this.createBlock(0), this.stop();
    },
    again: function() {
        wx.redirectTo({
            url: "../blind/blind"
        });
    },
    stop: function() {
        var t = this, a = setInterval(function() {
            if (t.data.time > 0) {
                var n = t.data.time;
                n -= 1, t.setData({
                    time: n
                });
            } else clearInterval(a), t.setData({
                isHidden: !1
            });
        }, 1e3);
    },
    createBlock: function(t) {
        var a = [ 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9 ], n = t < a.length ? a[t] : 9, o = Math.pow(n, 2), e = this.createColor(n), i = e[1], r = e[0];
        r = "rgb(" + (r = r.map(function(t) {
            return t + 15 * Math.max(9 - n, 1);
        })).join(",") + ")";
        var c = new Array(o).fill(i), d = Math.floor(Math.random() * o);
        c[d] = r, this.setData({
            block: {
                lv: n,
                color: c
            },
            randNum: d
        });
    },
    createColor: function(t) {
        var a;
        a = 15 * Math.max(9 - t, 1);
        var n = [ Math.round(Math.random() * (255 - a)), Math.round(Math.random() * (255 - a)), Math.round(Math.random() * (255 - a)) ];
        return [ n, "rgb(" + n.join(",") + ")" ];
    },
    nextBlock: function(t) {
        if (t.currentTarget.dataset.id == this.data.randNum) {
            var a = this.data.score + 1;
            this.setData({
                score: a
            }), this.createBlock(a);
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "色盲测试小游戏",
            path: "/Game/pages/tools/blind/blind"
        };
    }
});