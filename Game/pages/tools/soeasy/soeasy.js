var app = getApp();
Page({
    data: {
        score: 0,
        text: "",
        width: 0,
        answer: "",
        timer: "",
        youxi_history: 0,
        isHidden: !0
    },
    onLoad: function(t) {
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })
        wx.getStorageSync("youxi_history") && this.setData({
            youxi_history: wx.getStorageSync("youxi_history")
        }), this.generateQuestion();
    },
    generateQuestion: function() {
        var t, a, e, n = this.data.score, s = [], i = [], o = parseInt(n / 5) + 2, r = this.randNum();
        for (s.push(r), e = r; s.length < o; ) {
            t = .5 >= Math.random();
            var h = this.randNum();
            (a = t ? e + h : e - h) > 3 || a < 1 ? console.log("again") : (s.push(h), i.push(t), 
            e = a);
        }
        this.updateText(s, i, e);
    },
    updateText: function(t, a, e) {
        for (var n = t[0], s = 0; s < t.length - 1; s++) n += a[s] ? "+" : "-", n += t[s + 1];
        n += " = ?", this.setData({
            text: n,
            answer: e
        });
    },
    again: function() {
        wx.redirectTo({
            url: "../soeasy/soeasy"
        });
    },
    randNum: function() {
        return Math.floor(3 * Math.random()) + 1;
    },
    click_btn: function(t) {
        var a = this, e = t.currentTarget.dataset.num, n = this.data.answer, s = this.data.score, i = this.data.youxi_history;
        clearInterval(this.data.timer), e == n ? (s += 1, a.setData({
            score: s
        }), this.generateQuestion(), this.timing()) : (a.setData({
            isHidden: !1
        }), s > i && (wx.setStorage({
            key: "youxi_history",
            data: s
        }), a.setData({
            youxi_history: s
        })));
    },
    timing: function() {
        var t = this, a = 100, e = setInterval(function() {
            if (a -= 1, t.setData({
                width: a
            }), 0 == a) {
                clearInterval(e), t.setData({
                    isHidden: !1
                });
                var n = t.data.score;
                n > t.data.youxi_history && (wx.setStorage({
                    key: "youxi_history",
                    data: n
                }), t.setData({
                    youxi_history: n
                }));
            }
        }, 20);
        this.setData({
            timer: e
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "极速口算小游戏",
            path: "/Game/pages/tools/soeasy/soeasy"
        };
    }
});