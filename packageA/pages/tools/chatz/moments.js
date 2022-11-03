

function e(e) {
    var t = e.charCodeAt(0);
    return 1 == e.length && t >= 0 && t <= 127 ? w.ASIC_WIDTHS[t] : m.isEmojiCharacter(e) ? w.EMOJ_WIDTH : 1 == e.length && 1 == v.getDianzhenInfo(t).gotDianzhen ? w.CHINESE_WIDTH : 0;
}

function t() {
    q != T && 0 != D && (q != b ? q != H ? q != k || function() {
        p = h / i;
        var e = c.charCodeAt(u);
        if (1 == g) {
            var t = v.getDianzhenInfo(e);
            if (1 == t.gotDianzhen) {
                for (var r = new Array(), n = 0; n < 16; n++) {
                    for (var o = new Array(), s = parseInt(t.dianzhen.substr(4 * n, 2), 16), d = 128, l = 0; l < 8; l++) 0 != (s & d) ? o.push(!0) : o.push(!1), 
                    d >>= 1;
                    d = 128;
                    for (var _ = parseInt(t.dianzhen.substr(4 * n + 2, 2), 16), l = 0; l < 8; l++) 0 != (_ & d) ? o.push(!0) : o.push(!1), 
                    d >>= 1;
                    r.push(o);
                }
                var m = !0, w = new Array();
                w.push("\n");
                for (var C = 0; C < 16; C++) {
                    for (var n = Math.round(15 * C / 15), o = "", D = 0, S = 0; S < 39; S++) D >= S + 1 || (D <= S - 1 && (o += x, 
                    D += 1), l = Math.round(15 * S / 38), 1 == (1 != r[n][l]) ? (o += x, D += 1) : (o += y, 
                    D += p, m = !1));
                    o += "\n", w.push(o);
                }
                return w.push("\n"), 1 == m && ((w = new Array()).push("\n"), w.push("\n")), f.push(w), 
                z.size > 50 && z.clear(), z.set(c.charAt(u), w), u++, void (q = b);
            }
        }
        var A = wx.createCanvasContext("id_helper_canvas");
        A.setFontSize(52), A.setFillStyle("#ffffff"), A.fillRect(0, 0, 60, 60), A.setFillStyle("#000000"), 
        A.setTextAlign("center"), A.setTextBaseline("bottom"), A.fillText(c.charAt(u).toString(), 30, 60), 
        A.draw(!1, a), q = M;
    }() : function() {
        for (var e = "", t = 0; t < 10; t++) e += x;
        _.data.measure_help_showed = !0, _.data.measure_help_content = e, _.setData({
            measure_help_showed: _.data.measure_help_showed,
            measure_help_content: _.data.measure_help_content
        }, o), q = F;
    }() : function() {
        for (0 == l && (l = !0, c = A, u = 0, f = new Array()); u < c.length && z.has(c.charAt(u)); ) {
            var t = c.charAt(u);
            f.push(z.get(t)), u++;
        }
        if (u == c.length) {
            var a = wx.createCanvasContext("id_helper_canvas");
            return a.setFillStyle("#ffffff"), a.fillRect(0, 0, 60, 60), a.draw(!1, r), void (q = E);
        }
        if (function(e) {
            var t = e.charCodeAt(0);
            return 1 == e.length && t >= 0 && t <= 127 || !!m.isEmojiCharacter(e) || 1 == e.length && 1 == v.getDianzhenInfo(t).gotDianzhen;
        }(y)) return h = e(y), i = e(x), void (q = k);
        if (0 == I.has(y)) {
            for (var o = "", s = 0; s < 10; s++) o += y;
            return _.data.measure_help_showed = !0, _.data.measure_help_content = o, _.setData({
                measure_help_showed: _.data.measure_help_showed,
                measure_help_content: _.data.measure_help_content
            }, n), void (q = j);
        }
        h = I.get(y), 0 == I.has(x) ? q = H : (i = I.get(x), q = k);
    }());
}

function a() {
    0 != D ? (wx.canvasGetImageData({
        canvasId: "id_helper_canvas",
        x: 0,
        y: 0,
        width: 60,
        height: 60,
        success: function(e) {
            if (0 != D) {
                for (var t = !0, a = new Array(), r = 0, n = 0, o = 0; o < 18; o++) {
                    r = n + 1, n = Math.floor(59 * (o + .5) / 17);
                    for (var s = Math.round(59 * o / 17), h = "", i = 0, d = 0; d < 39; d++) if (!(i >= d + 1)) {
                        i <= d - 1 && (h += x, i += 1);
                        var l, _, v, m, w, C, g = Math.round(59 * d / 38);
                        if (o > 0 && o < 17) {
                            for (var S = 0, A = r; A <= n; A++) l = 240 * A + 4 * g, _ = e.data[l], v = e.data[l + 1], 
                            m = e.data[l + 2], w = e.data[l + 3], _ > 127 && v > 127 && m > 127 && w > 127 && S++;
                            C = S > (n - r + 1) / 2;
                        } else l = 240 * s + 4 * g, _ = e.data[l], v = e.data[l + 1], m = e.data[l + 2], 
                        w = e.data[l + 3], C = _ > 127 && v > 127 && m > 127 && w > 127;
                        1 == C ? (h += x, i += 1) : (h += y, i += p, t = !1);
                    }
                    h += "\n", a.push(h);
                }
                1 == t && ((a = new Array()).push("\n"), a.push("\n")), f.push(a), z.size > 50 && z.clear(), 
                z.set(c.charAt(u), a), u++;
            }
        },
        fail: function(e) {
            console.log("canvasGetImageData failed:" + e.errMsg);
        },
        complete: function() {
            q = b;
        }
    }), q = R) : q = b;
}

function r() {
    0 != l ? (s = f, _.onCoverterTimerDone(), q = T) : q = b;
}

function n() {
    var e = wx.createSelectorQuery();
    e.select("#id_measure_help").boundingClientRect(), e.exec(function(e) {
        return h = e[0].width, 1 == l && (I.set(y, h), I.size > 80 && I.clear()), 0 == I.has(x) ? void (q = H) : (_.data.measure_help_showed = !1, 
        _.data.measure_help_content = "", _.setData({
            measure_help_showed: _.data.measure_help_showed,
            measure_help_content: _.data.measure_help_content
        }), i = I.get(x), void (q = k));
    }), q = G;
}

function o() {
    var e = wx.createSelectorQuery();
    e.select("#id_measure_help").boundingClientRect(), e.exec(function(e) {
        i = e[0].width, 1 == l && (I.set(x, i), I.size > 80 && I.clear()), _.data.measure_help_showed = !1, 
        _.data.measure_help_content = "", _.setData({
            measure_help_showed: _.data.measure_help_showed,
            measure_help_content: _.data.measure_help_content
        }), q = k;
    }), q = P;
}

var s, h, i, d, l, u, c, f, p, _, v = require("hanzi_dianzhen_container.js"), m = require("common.js"), w = require("width_const.js"), C = (getApp(), 
[ "🌸", "🌺", "🌹", "🌷", "💑", "🙃", "😎", "💏", "🐶", "🐷", "🍁", "🔥", "🍎", "🍓", "🍅", "💖" ]), g = !0, D = !1, S = !1, A = "", y = "", x = ".", z = new Map(), I = new Map(), T = 1, b = 2, E = 3, M = 4, R = 5, j = 6, G = 7, H = 8, F = 9, P = 10, k = 11, q = T;

Page({
    data: {
        previewedStr: "",
        toSendDisabled: !0,
        measure_help_showed: !1,
        measure_help_content: "",
        firstElementChar: ""
    },
    onLoad: function(e) {
        _ = this;
        var a = Math.floor(Math.random() * C.length);
        this.data.firstElementChar = C[a], y = this.data.firstElementChar, this.setData({
            firstElementChar: this.data.firstElementChar
        }), d = setInterval(t, 100);
    },
    onReady: function() {},
    onShow: function() {
        D = !0;
    },
    onHide: function() {
        D = !1;
    },
    onUnload: function() {
        clearInterval(d);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "朋友◎特效文字",
            path: "packageA/pages/tools/chatz/moments"
        };
    },
    covertCoreDataToCopyed: function() {
        for (var e = "\n", t = 0; t < s.length; t++) for (var a = 0; a < s[t].length; a++) e += s[t][a];
        return e;
    },
    covertCoreDataToPreviewed: function() {
        return this.covertCoreDataToCopyed();
    },
    onCoverterTimerDone: function() {
        if (this.data.previewedStr = this.covertCoreDataToPreviewed(), this.setData({
            previewedStr: this.data.previewedStr
        }), 1 == S) {
            wx.hideToast();
            var e = this.covertCoreDataToCopyed();
            wx.setClipboardData({
                data: e
            }), S = !1;
        }
    },
    toSendClicked: function(e) {
        var t = this.covertCoreDataToCopyed();
        wx.setClipboardData({
            data: t
        });
    },
    startGenerateCoreData: function() {
        l = !1, q = b;
    },
    onElementCharChanged: function(e) {
        if (0 != e.detail.value.length) return e.detail.value == x ? "" : (2 == (y = e.detail.value).length && 0 == m.isEmojiCharacter(y) && (y = y.charAt(0)), 
        z.clear(), this.startGenerateCoreData(), y);
    },
    onRawStrChanged: function(e) {
        A = e.detail.value;
        for (var t = !0, a = 0; a < A.length; a++) if (32 != A.charCodeAt(a)) {
            t = !1;
            break;
        }
        t != this.data.toSendDisabled && (this.data.toSendDisabled = t, this.setData({
            toSendDisabled: this.data.toSendDisabled
        })), this.startGenerateCoreData();
    }
});