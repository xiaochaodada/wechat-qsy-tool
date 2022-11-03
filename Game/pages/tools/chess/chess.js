var t = require("util.js");
var app = getApp();
Page({
    data: {
        over: !1,
        me: !0,
        _nowi: 0,
        _nowj: 0,
        _compi: 0,
        _compj: 0,
        _myWin: [],
        _compWin: [],
        backAble: !1,
        returnAble: !1,
        chressBord: [],
        myWin: [],
        computerWin: [],
        wins: [],
        count: 0,
        context: "",
        widthC: 0,
        step: 0,
        color: "gray"
    },
    playerAI: function(a) {
        var o = this, e = o.data.over, r = o.data.me, s = (o.data._nowi, o.data._nowj, a.changedTouches[0].x), n = a.changedTouches[0].y, i = o.data.count, d = o.data.chressBord, c = o.data.wins, h = o.data.myWin, w = o.data.computerWin, f = o.data._compWin, m = o.data.step;
        if (!e && r) {
            var u = wx.getSystemInfoSync().windowWidth - 60;
            u /= 14;
            var y = Math.floor(s / u), S = Math.floor(n / u);
            if (this.setData({
                _nowi: y,
                _nowj: S
            }), 0 == d[y][S]) {
                this.drawChess(y, S, !0), d[y][S] = 1;
                for (var p = 0; p < i; p++) if (c[y][S][p] && (h[p]++, f[p] = w[p], 5 == h[p])) {
                    t.alertViewWithCancel("", "你赢了", "", "");
                    var l = wx.getStorageSync("bs") || 0, g = wx.getStorageSync("ms") || 0;
                    wx.setStorageSync("ms", ++g), (m < l || 0 == l) && (l = m, wx.setStorageSync("bs", l)), 
                    this.setData({
                        over: "true",
                        mscore: g,
                        bestStep: l,
                        cscore: wx.getStorageSync("cs") || 0
                    });
                }
                e || (r = !r, this.computerAI());
            }
        }
    },
    computerAI: function() {
        for (var a = this, o = [], e = [], r = 0, s = 0, n = 0, i = (a.data.step, 0); i < 15; i++) for (o[i] = [], 
        e[i] = [], d = 0; d < 15; d++) o[i][d] = 0, e[i][d] = 0;
        for (i = 0; i < 15; i++) for (var d = 0; d < 15; d++) if (0 == a.data.chressBord[i][d]) {
            for (c = 0; c < a.data.count; c++) a.data.wins[i][d][c] && (1 == a.data.myWin[c] ? o[i][d] += 200 : 2 == a.data.myWin[c] ? o[i][d] += 400 : 3 == a.data.myWin[c] ? o[i][d] += 2e3 : 4 == a.data.myWin[c] && (o[i][d] += 1e4), 
            1 == a.data.computerWin[c] ? e[i][d] += 220 : 2 == a.data.computerWin[c] ? e[i][d] += 420 : 3 == a.data.computerWin[c] ? e[i][d] += 2100 : 4 == a.data.computerWin[c] && (e[i][d] += 2e4));
            o[i][d] > r ? (r = o[i][d], s = i, n = d) : o[i][d] == r && e[i][d] > e[s][n] && (s = i, 
            n = d), e[i][d] > r ? (r = e[i][d], s = i, n = d) : e[i][d] == r && o[i][d] > o[s][n] && (s = i, 
            n = d);
        }
        a.data._compi = s, a.data._compj = n, this.drawChess(s, n, !1), a.data.chressBord[s][n] = 2;
        for (var c = 0; c < a.data.count; c++) if (a.data.wins[s][n][c] && (a.data.computerWin[c]++, 
        a.data._myWin[c] = a.data.myWin[c], a.data.myWin[c] = 6, 5 == a.data.computerWin[c])) {
            t.alertViewWithCancel("", "你输了", "", "");
            var h = wx.getStorageSync("cs") || 0;
            wx.setStorageSync("cs", ++h), this.setData({
                over: "true",
                cscore: h,
                mscore: wx.getStorageSync("ms") || 0
            });
        }
        a.data.over && (a.data.me = !a.data.me), a.data.backAble = !0, a.data.returnAble = !1;
    },
    onLoad: function() {
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })

        for (o = 0; o < 15; o++) for (this.data.chressBord[o] = [], t = 0; t < 15; t++) this.data.chressBord[o][t] = 0;
        for (o = 0; o < 15; o++) for (this.data.wins[o] = [], t = 0; t < 15; t++) this.data.wins[o][t] = [];
        for (o = 0; o < 15; o++) for (t = 0; t < 11; t++) {
            for (a = 0; a < 5; a++) this.data.wins[o][t + a][this.data.count] = !0;
            this.data.count++;
        }
        for (o = 0; o < 15; o++) for (t = 0; t < 11; t++) {
            for (a = 0; a < 5; a++) this.data.wins[t + a][o][this.data.count] = !0;
            this.data.count++;
        }
        for (o = 0; o < 11; o++) for (t = 0; t < 11; t++) {
            for (a = 0; a < 5; a++) this.data.wins[o + a][t + a][this.data.count] = !0;
            this.data.count++;
        }
        for (o = 0; o < 11; o++) for (var t = 14; t > 3; t--) {
            for (var a = 0; a < 5; a++) this.data.wins[o + a][t - a][this.data.count] = !0;
            this.data.count++;
        }
        for (var o = 0; o < this.data.count; o++) this.data.myWin[o] = 0, this.data._myWin[o] = 0, 
        this.data.computerWin[o] = 0, this.data._compWin[o] = 0;
        var e = wx.getSystemInfoSync().windowWidth - 30;
        this.setData({
            widthC: e,
            mscore: wx.getStorageSync("ms") || 0,
            cscore: wx.getStorageSync("cs") || 0,
            bestStep: wx.getStorageSync("bs") || 0
        });
    },
    onReady: function() {
        var t = wx.createCanvasContext("Chess");
        t.draw(), this.setData({
            context: t
        }), this.drawChessBoard();
    },
    tapMove: function(t) {},
    tapEnd: function(t) {},
    drawChessBoard: function() {
        var t = wx.getSystemInfoSync().windowWidth - 60, a = t + 15;
        t /= 14;
        var o = this.data.context;
        o.setLineWidth(1), o.setStrokeStyle("white");
        for (var e = 0; e < 15; e++) o.moveTo(15 + e * t, 15), o.lineTo(15 + e * t, a), 
        o.stroke(), o.moveTo(15, 15 + e * t), o.lineTo(a, 15 + e * t), o.stroke();
        o.draw(!0);
    },
    drawChess: function(t, a, o) {
        var e = this.data.context, r = this.data.step, s = wx.getSystemInfoSync().windowWidth - 60;
        s /= 14, e.beginPath(), e.arc(15 + t * s, 15 + a * s, 8, 0, 2 * Math.PI), e.closePath();
        var n = e.createCircularGradient(15 + t * s + 2, 15 + a * s - 2, 8, 15 + t * s + 2, 15 + a * s - 2, 0);
        o ? (n.addColorStop(0, "#0a0a0a"), n.addColorStop(1, "#636766"), this.setData({
            step: ++r,
            color: ""
        })) : (n.addColorStop(0, "#d1d1d1"), n.addColorStop(1, "#f9f9f9")), e.setFillStyle(n), 
        e.fill(), e.draw(!0);
    },
    initChess: function(t) {
        t.currentTarget.dataset.color || (this.setData({
            step: 0,
            color: "gray",
            me: !0,
            over: !1
        }), this.onReady(), this.onLoad());
    },
    bannerAd: function() {
        wx.createBannerAd({
            adUnitId: "adunit-7220592740911d99",
            style: {
                left: 10,
                top: 76,
                width: 320
            }
        }).show();
    },
    onShareAppMessage: function(t) {
        return {
            title: "五子棋",
            path: "Game/pages/tools/chess/chess"
        };
    }
});