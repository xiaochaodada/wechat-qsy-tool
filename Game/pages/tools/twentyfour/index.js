var t = getApp();

Page({
    data: {
        totalTimuNum: 5,
        numbersTop: 5,
        currentProgress: 0,
        btnHeight: 200,
        currentTimuPageObject: [ {
            visibility: "visiable",
            selected: "",
            value: "",
            disp: ""
        }, {
            visibility: "visiable",
            selected: "",
            value: "",
            disp: ""
        }, {
            visibility: "visiable",
            selected: "",
            value: "",
            disp: ""
        }, {
            visibility: "visiable",
            selected: "",
            value: "",
            disp: ""
        } ],
        currentTimuObject: {
            nums: [],
            answer: ""
        },
        operatorStatus: [ "", "", "", "" ],
        loadTime: 0,
        maskStatus: "none",
        videomaskStatus: "none",
        modeMaskStatus: "none",
        helpvideoUrl: "",
        gameMode: "normal",
        stagePercent: 0,
        stageCost: 0,
        normalCheck: "checked",
        hardCheck: ""
    },
    onLoad: function(t) {
        var e = wx.getSystemInfoSync().screenWidth, a = .54;
        wx.getSystemInfoSync().screenHeight / e > 2 && (this.setData({
            numbersTop: 0
        }), a = .74);
        var s = 337.5 * a;
        this.setData({
            btnHeight: s,
            loadTime: new Date().getTime()
        }), this.createTimu();
    },
    createTimu: function() {
        var t = this.data.currentTimuPageObject, e = this.data.gameMode, a = this.getRandNum(e);
        this.setData({
            currentTimuObject: a
        });
        for (var s = 0; s < 4; s++) t[s].value = a.nums[s], t[s].disp = a.nums[s], t[s].visibility = "visiable", 
        t[s].selected = "", t[s].index = s, t[s].fontsize = 4;
        this.setData({
            currentTimuPageObject: t
        });
    },
    swithMode: function() {
        this.setData({
            currentProgress: 0,
            loadTime: new Date().getTime()
        }), this.createTimu();
    },
    closeVideo: function() {
        this.setData({
            videomaskStatus: "none"
        });
    },
    btnreplay: function() {
        for (var t = this.data.currentTimuPageObject, e = this.data.currentTimuObject, a = 0; a < 4; a++) t[a].value = e.nums[a], 
        t[a].disp = e.nums[a], t[a].visibility = "visiable", t[a].selected = "", t[a].index = a, 
        t[a].fontsize = 4;
        this.setData({
            currentTimuPageObject: t
        });
    },
    radiotap: function() {
        this.setData({
            modeMaskStatus: "none"
        });
    },
    daanMasktap: function() {
        this.setData({
            maskStatus: "none"
        });
    },
    radioChange: function(t) {
        var e = "normal";
        "1" == t.detail.value && (e = "hard"), this.setData({
            modeMaskStatus: "none",
            gameMode: e
        }), this.swithMode();
    },
    btndaan: function() {
        var t = this.data.currentTimuObject;
        wx.showModal({
            title: "解题思路",
            showCancel: !1,
            content: t.answer,
            confirmText: "我知道了",
            confirmColor: "#3abccc",
            success: function(t) {
                t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
            }
        });
    },
    btnjump: function() {
        this.createTimu();
    },
    btnmode: function() {
        var t = "", e = "checked";
        "hard" == this.data.gameMode && (e = "", t = "checked"), this.setData({
            modeMaskStatus: "block",
            hardCheck: t,
            normalCheck: e
        });
    },
    btnNum: function(t) {
        var e = this.data.currentTimuPageObject, a = this.data.operatorStatus, s = t.target.dataset, i = s.index;
        if (s.value, "selected" == e[i].selected) e[i].selected = "", this.setData({
            currentTimuPageObject: e
        }); else {
            for (var n = 0, o = -1, r = 0, u = -1, c = 0; c < 4; c++) "selected" == e[c].selected && (n++, 
            o = c);
            for (c = 0; c < 4; c++) "selected" == a[c] && (r++, u = c);
            for (c = 0; c < 4; c++) e[c].selected = "";
            if (e[i].selected = "selected", this.setData({
                currentTimuPageObject: e
            }), 1 == n && 1 == r) {
                var h = e[o].value, l = e[i].value, d = 0;
                0 == u ? d = h + l : 1 == u ? d = h - l : 2 == u ? d = h * l : 3 == u && (d = h / l), 
                e[i].value = d;
                var m = d.toString().split(".");
                for (e[i].disp = d, 2 == m.length && m[1].length > 2 && (m[1].startsWith("000") ? e[i].disp = m[0] : (e[i].fontsize = 2, 
                e[i].disp = d.toFixed(3))), d > 1e4 ? e[i].fontsize = 2 : d > 100 && (e[i].fontsize = 3), 
                e[o].visibility = "hidden", c = 0; c < 4; c++) a[c] = "";
                this.setData({
                    currentTimuPageObject: e,
                    operatorStatus: a
                }), this.checkAnswer();
            }
        }
    },
    checkAnswer: function() {
        for (var e = this.data.currentTimuPageObject, a = this.data.currentProgress, s = 0, i = 0, n = 0; n < 4; n++) "visiable" == e[n].visibility && (s++, 
        i = e[n].value);
        if (1 == s && Math.abs(i - 24) < .001) {
            a++, this.setData({
                currentProgress: a
            });
            var o = this;
            if (a == this.data.totalTimuNum) {
                var r = {};
                return r.gameMode = "normal" == this.data.gameMode ? 0 : 1, r.timecost = (new Date().getTime() - this.data.loadTime) / 1e3, 
                r.avgcost = r.timecost / this.data.totalTimuNum, void wx.navigateTo({
                    url: "../twentyfour/success?params=" + JSON.stringify(r),
                    success: function() {}
                });
            }
            wx.showToast({
                title: "回答正确",
                icon: "",
                duration: 400,
                success: function() {
                    o.setData({
                        stageCost: s
                    })
                    o.setData({
                        maskStatus: "none"
                    })
                     o.createTimu();
              
                }
            });
        }
    },
    checkOperatorStatus: function(t) {
        var e = this.data.operatorStatus;
        if ("selected" == e[t]) e[t] = "", this.setData({
            operatorStatus: e
        }); else {
            for (var a = 0; a < 4; a++) e[a] = "";
            e[t] = "selected", this.setData({
                operatorStatus: e
            });
        }
    },
    btnplus: function() {
        this.checkOperatorStatus(0);
    },
    btnminus: function() {
        this.checkOperatorStatus(1);
    },
    btnmulti: function() {
        this.checkOperatorStatus(2);
    },
    btndivide: function() {
        this.checkOperatorStatus(3);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "挑战24点！",
            path: "/Game/pages/tools/twentyfour/index",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    getRandNum: function(t) {
        var e = {}, a = new Array(), s = !1;
        do {
            s = !1;
            for (var i = 0; i < 4; i++) "normal" == t ? (a[i] = Math.round(8 * Math.random() + 1), 
            s = !0) : (a[i] = Math.round(12 * Math.random() + 1), a[i] > 9 && (s = !0));
            e.nums = a, e.answer = this.isSolvable(a);
        } while (!s || null == e.answer);
        return e;
    },
    isSolvable: function(t) {
        var e = this.valid(t);
        return null == e || "" == e.value ? null : e.value.split("\n")[0];
    },
    tb: function(t, e, a, s) {
        this[1] = t, this[2] = e, this[4] = a, this[8] = s;
    },
    tdisoper: function(t, e, a, s) {
        this[0] = t, this[1] = e, this[2] = a, this[3] = s;
    },
    oper: function(t, e, a) {
        return 3 == t ? e * a : 2 == t ? e / a : 1 == t ? parseFloat(e) + parseFloat(a) : 0 == t ? e - a : void 0;
    },
    valid: function(t) {
        for (var e = new this.tdisoper("-", "+", "÷", "×"), a = new this.tb(t[0], t[1], t[2], t[3]), s = {
            value: ""
        }, i = 1; i <= 8; i *= 2) for (var n = 1; n <= 8; n *= 2) for (var o = 1; o <= 8; o *= 2) for (var r = 1; r <= 8; r *= 2) if (15 == (i | n | o | r)) for (var u = 0; u <= 3; u++) for (var c = 0; c <= 3; c++) for (var h = 0; h <= 3; h++) {
            var l = this.oper(u, a[i], a[n]), d = this.oper(c, l, a[o]), m = (this.oper(h, d, a[r]), 
            this.oper(h, this.oper(c, this.oper(u, a[i], a[n]), a[o]), a[r]));
            Math.abs(m - 24) < 1e-5 && (s.value = s.value + "((" + a[i] + e[u] + a[n] + ")" + e[c] + a[o] + ")" + e[h] + a[r] + "\n"), 
            m = this.oper(u, a[i], this.oper(h, this.oper(c, a[n], a[o]), a[r])), Math.abs(m - 24) < 1e-5 && (s.value = s.value + a[i] + e[u] + "((" + a[n] + e[c] + a[o] + ")" + e[h] + a[r] + ")\n"), 
            m = this.oper(h, this.oper(u, a[i], this.oper(c, a[n], a[o])), a[r]), Math.abs(m - 24) < 1e-5 && (s.value = s.value + "(" + a[i] + e[u] + "(" + a[n] + e[c] + a[o] + "))" + e[h] + a[r] + "\n"), 
            m = this.oper(u, a[i], this.oper(c, a[n], this.oper(h, a[o], a[r]))), Math.abs(m - 24) < 1e-5 && (s.value = s.value + a[i] + e[u] + "(" + a[n] + e[c] + "(" + a[o] + e[h] + a[r] + "))\n"), 
            m = this.oper(c, this.oper(u, a[i], a[n]), this.oper(h, a[o], a[r])), Math.abs(m - 24) < 1e-5 && (s.value = s.value + "(" + a[i] + e[u] + a[n] + ")" + e[c] + "(" + a[o] + e[h] + a[r] + ")\n");
        }
        return s;
    }
});