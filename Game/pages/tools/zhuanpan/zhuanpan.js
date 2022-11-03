var app = getApp();

var t = require("1AFD92650DD3C3DF7C9BFA62F77CB015.js"), e = (t && t.__esModule, 
[ "真心话", "PASS", "喝一杯", "下家喝光", "大冒险", "找人亲一下", "喝两杯", "真心话", "大家干杯", "再转一次", "随意喝", "大冒险", "喝半杯", "找人干杯", "喝光", "上家喝光" ]), i = getApp();

Page({
    $$timer: null,
    $$title: "",
    data: {
        punishments: [],
        degree: 0,
        selectedTxt: "大冒险",
        isEnd: !1,
        riskType: "",
        editIdx: -1,
        showReset: !1,
        entering: !1,
        clicked: !0
    },
    onLoad: function() {
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })
        this.audio = wx.createInnerAudioContext(), this.audio.src = "/Game/pages/tools/zhuanpan/zhuanpan.mp3", 
        this.setData({
            showReset: !1,
            punishments: [].concat(e)
        });
    },
    onReady: function() {
        var t = this;
        this.setData({
            entering: !0
        }), setTimeout(function() {
            t.setData({
                entering: !1
            });
        }, 1e3);
    },
    onHide: function() {},
    calculateTop: function() {
        var t = this, e = this.data.punishments, n = this.createSelectorQuery();
        e.forEach(function(t, e) {
            n.select("#punishment-" + e).boundingClientRect();
        }), n.exec(function(n) {
            try {
                if (n && n.length) {
                    var a = n[0].top, s = 0;
                    if (n.forEach(function(t, e) {
                        t.top < a && (a = t.top, s = e);
                    }), s >= 0) {
                        var o = e[s];
                        t.data.selectedTxt !== o && t.setData({
                            selectedTxt: o
                        });
                    }
                }
            } catch (t) {
                i.onError(t, JSON.stringify(n));
            }
        });
    },
    onPlay: function() {
        var e = this;
        if (!this.$$timer) {
            this.audio.stop(), this.audio.play();
            var i = this.data.degree;
            this.setData({
                isEnd: !1,
                riskType: "",
                clicked: !1,
                degree: i + 540 + 22.5 * (0, t.$generateRandom)(16)
            }), this.$$timer = setInterval(this.calculateTop.bind(this), 100), setTimeout(function() {
                e.setData({
                    clicked: !0
                });
            }, 0), setTimeout(function() {
                e.$$timer && (clearInterval(e.$$timer), e.$$timer = null, e.data.selectedTxt, e.setData({
                    isEnd: !0
                }));
            }, 2500);
        }
    },
    onExit: function() {},
    onModify: function(t) {
        var e = t.currentTarget.dataset.idx;
        this.$$title = this.data.punishments[e], this.setData({
            editIdx: +e,
            titleInitial: this.$$title
        });
    },
    onCloseEdit: function() {
        this.setData({
            editIdx: -1
        });
    },
    onConfirmTitle: function() {
        var t = this.data.editIdx, e = {
            editIdx: -1,
            titleInitial: "",
            showReset: !0
        };
        t >= 0 && (e["punishments[" + t + "]"] = this.$$title), this.setData(e), wx.setStorage({
            key: "roulette_self_punishments",
            data: this.data.punishments
        }), this.$$title = "";
    },
    onTitleInput: function(t) {
        var e = t.detail.value;
        this.$$title = e;
    },
    onReset: function() {
        wx.removeStorage({
            key: "roulette_self_punishments"
        }), this.setData({
            punishments: [].concat(e),
            showReset: !1
        });
    },
    onShareAppMessage: function() {
        return {
            title: "随机大转盘",
            path: "/Game/pages/tools/zhuanpan/zhuanpan"
        };
    }
});