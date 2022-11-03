var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("4B902B46724258DF2DF64341527F07B6.js")), e = require("AB72E210724258DFCD148A17058F07B6.js");
var app = getApp();

Page({
    data: {
        space: 4
    },
    textStr: "我爱你",
    numStr: "520",
    onLoad: function(t) {
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })
    },
    onReady: function() {
        this._formatText();
    },
    wordartInput: function(t) {
        this.textStr = t.detail.value, this._formatText();
    },
    numInput: function(t) {
        this.numStr = t.detail.value, this._formatText();
    },
    _formatText: function() {
        this._formatMode();
    },
    _formatMode: function() {
        for (var e = this.textStr, a = t.default.convert1(this.numStr), r = t.default.convert1(this.numStr), n = Math.min(e.length, this.numStr.length), o = 0; o < n; o++) {
            var i = e[o];
            i = this.ToDBC(i);
            for (var h = a[o], c = r[o], s = 0; s < h.length; s++) for (var u = 0; u < h[s].length; u++) 1 == h[s][u] ? (h[s][u] = i, 
            c[s][u] = i) : 0 == u ? (h[s][u] = " ".repeat(this.data.space), c[s][u] = " ".repeat(this.data.space)) : (h[s][u] = "　", 
            c[s][u] = "　");
        }
        for (var f = [], d = [], l = 0; l < n; l++) for (var p = a[l], m = r[l], x = 0; x < p.length; x++) f[x] ? (f[x] = f[x].concat(p[x]), 
        d[x] = d[x].concat(m[x])) : (f[x] = p[x].slice(0), d[x] = m[x].slice(0));
        for (var g = "", v = [], C = 0; C < f.length; C++) {
            for (var S = 1; S < f[0].length; S++) g += f[C][S], v.push(d[C][S]);
            C < f.length - 1 && (g += "\n", v.push("\n"));
        }
        this.setData({
            text: g,
            textHtml: v
        });
    },
    ToDBC: function(t) {
        var e = t;
        return 32 == t.charCodeAt(0) && (e = String.fromCharCode(12288)), t.charCodeAt(0) < 127 && (e = String.fromCharCode(t.charCodeAt() + 65248)), 
        e;
    },
    tapCopy: function() {
        var t = this;
        this.data.text && e.checkMsg(this.textStr).then(function(a) {
            87014 == a.errCode ? wx.showModal({
                title: "提示",
                content: "你输入的内容包含了非法文本，请修改！",
                showCancel: !1,
                confirmText: "知道了"
            }) : e.copyText(t.data.text);
        }).catch(function(a) {
            e.copyText(t.data.text);
        });
    },
    changeSpace: function(t) {
        var e = t.currentTarget.dataset.id;
        e != this.data.space && (this.setData({
            space: e
        }), this._formatMode());
    },
    onShareAppMessage: function() {
        return {
            title: "朋友圈数字型文字排列",
            path: "/packageA/pages/tools/wx520/wx520"
        };
    }
});