var t = require("hxw.js"), a = require("tel.js"), e = getApp();
var check = require('../../../../utils/cache')
Page({
    data: {
        banquan: e.globalData.banquan,
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "",
        newValue: []
    },
    bindKeyInput: function(t) {
        this.data.current = t.detail.value, this.setData({
            inputShowed: !0
        });
    },
    clearInput: function() {
        this.data.current = null, this.setData({
            textareaValue: ""
        });
    },
    changeText: function(e) {
      var that = this
      check.checktext(that.data.current,function () {
   
  
        if (that.data.current) switch (e.target.id) {
          case "hxw":
            for (var r = "", h = that.data.current, s = 0; s < h.length; s++) -1 != t.ftPYStr().indexOf(h.charAt(s)) ? r += t.qqPYStr().charAt(t.ftPYStr().indexOf(h.charAt(s))) : -1 != t.charPYStr().indexOf(h.charAt(s)) ? r += t.qqPYStr().charAt(t.charPYStr().indexOf(h.charAt(s))) : r += h.charAt(s);
            that.setData({
                textareaValue: r
            }), that.textCopy();
            break;

          case "ftz":
            for (r = "", h = that.data.current, s = 0; s < h.length; s++) -1 != t.charPYStr().indexOf(h.charAt(s)) ? r += t.ftPYStr().charAt(t.charPYStr().indexOf(h.charAt(s))) : -1 != t.qqPYStr().indexOf(h.charAt(s)) ? r += t.ftPYStr().charAt(t.qqPYStr().indexOf(h.charAt(s))) : r += h.charAt(s);
            that.setData({
                textareaValue: r
            }), that.textCopy();
            break;

          case "sbdh":
            for (r = "", h = that.data.current, s = 0; s < h.length; s++) r += a.tpTELStr().charAt(a.charTELStr().indexOf(h.charAt(s)));
            that.setData({
                textareaValue: "℡" + r
            }), that.textCopy();
            break;

          case "xbdh":
            for (r = "", h = that.data.current, s = 0; s < h.length; s++) r += a.ftTELStr().charAt(a.charTELStr().indexOf(h.charAt(s)));
            that.setData({
                textareaValue: "℡" + r
            }), that.textCopy();
            break;

          case "lhz":
            for (var i = String.fromCharCode(1160), c = "", n = (s = 0, (d = that.data.current).length); s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "jhw":
            for (i = String.fromCharCode(1161), c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "tmw1":
            for (i = "ζั͡ ", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += i + d.charAt(s);
            that.setData({
                textareaValue: c + "ζั͡✾"
            }), that.textCopy();
            break;

          case "tmw2":
            for (i = "ζั͡ ", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += i + d.charAt(s);
            that.setData({
                textareaValue: c + "ζั͡✿"
            }), that.textCopy();
            break;

          case "tmw3":
            for (i = "ζั͡ ", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += i + d.charAt(s);
            that.setData({
                textareaValue: c + "ζั͡❀"
            }), that.textCopy();
            break;

          case "hbw":
            for (i = String.fromCharCode(2954), c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "ctw":
            for (i = String.fromCharCode(3572), c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "kaw":
            for (i = String.fromCharCode(4326), c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += i + d.charAt(s);
            that.setData({
                textareaValue: c + i
            }), that.textCopy();
            break;

          case "pgyw":
            for (i = "ོ", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: "៚" + c + "ོ ͜✿ ҉҉҉҉҉"
            }), that.textCopy();
            break;

          case "blw":
            for (i = String.fromCharCode(794), c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "myw":
            for (i = "็้", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "sbw":
            for (i = String.fromCharCode(860), c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "htw":
            var o = String.fromCharCode(862), u = String.fromCharCode(863), l = "";
            for (s = 0, n = (x = that.data.current).length; s < n; s++) l += o + x.charAt(s) + u;
            that.setData({
                textareaValue: l
            }), that.textCopy();
            break;

          case "shtw":
            o = String.fromCharCode(831), u = String.fromCharCode(839), l = "";
            var x = that.data.current;
            for (s = 0, n = x.length; s < n; s++) l += o + x.charAt(s) + u;
            that.setData({
                textareaValue: l
            }), that.textCopy();
            break;

          case "fnw":
            for (i = "ོ", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "yfw":
            for (i = "♫", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: "∮" + c
            }), that.textCopy();
            break;

          case "scx":
            for (i = "̶", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "xhx":
            for (i = "꯭", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: "꯭" + c
            }), that.textCopy();
            break;

          case "mlw":
            for (i = "ℳℓ", c = "", s = 0, n = (d = that.data.current).length; s < n; s++) c += i + d.charAt(s);
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          case "mtz":
            i = "ืุ", c = "";
            var d = that.data.current;
            for (s = 0, n = d.length; s < n; s++) c += d.charAt(s) + i;
            that.setData({
                textareaValue: c
            }), that.textCopy();
            break;

          default:
            that.setData({});
        } else wx.showToast({
            title: "转换内容不能为空",
            icon: "none",
            duration: 800
        });

      },function () {
        console.log("错误")
        wx.showToast({
            title: '此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本',
            icon: "none",
            duration: 2e3
        })
    })
  
    },
    textCopy: function() {
        wx.setClipboardData({
            data: this.data.textareaValue,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data), t.data, wx.showToast({
                            title: "复制成功"
                        });
                    }
                });
            }
        });
    },
    onShow: function() {
        e.pages = getCurrentPages();
    },
    onShareAppMessage: function(t) {
        return {
            title: "特效字体生成：火星文、流汗字、菊花文等等",
            path: "/packageA/pages/tools/textshow/textshow"
        };
    }
});