var t = getApp(), e = require("relationship.js");

Page(function(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}({
    data: {
        second_height: 0,
        screenData: "我",
        result: "",
        id1: "丈夫",
        id2: "妻子",
        id3: "back",
        id4: "clean",
        id5: "爸爸",
        id6: "妈妈",
        id7: "哥哥",
        id8: "弟弟",
        id9: "姐姐",
        id10: "妹妹",
        id11: "儿子",
        id12: "女儿",
        id13: "each",
        id14: "=",
        id15: "?",
        isTrue: !1,
        sex: 1,
        chdf_text: "我称呼对方"
    },
    onLoad: function(t) {},
    onShow: function() {
    },
    onShareAppMessage: function() {},
    switchChange: function(t) {
        t.detail.value ? this.setData({
            sex: 0
        }) : this.setData({
            sex: 1
        });
    },
    clickButton: function(t) {
        var i = this.data.screenData.toString(), s = this.data.result.toString(), a = t.target.id;
        if (a == this.data.id3) {
            if ("我" == i) return;
            this.setData({
                chdf_text: "我称呼对方"
            }), i = i.substring(0, i.length - 3), s = d = e({
                text: i,
                sex: this.data.sex,
                reverse: !1,
                type: "default"
            });
        } else if (a == this.data.id4) i = "我", s = "", this.setData({
            chdf_text: "我称呼对方"
        }); else {
            i = i.substring(0, i.length);
            var d = e({
                text: i,
                sex: this.data.sex,
                reverse: !1,
                type: "default"
            });
            if (console.log(d), a == this.data.id14) {
                if (this.setData({
                    chdf_text: "我称呼对方"
                }), i.length >= 22) return void (s = "关系有点远，年长就叫老祖宗吧~");
                s = d;
            } else if (a == this.data.id13) {
                if (i.length >= 22) return void (s = "关系有点远，年长就叫老祖宗吧~");
                this.data.isTrue ? (d = e({
                    text: i,
                    sex: this.data.sex,
                    reverse: !1,
                    type: "default"
                }), this.setData({
                    isTrue: !1,
                    chdf_text: "我称呼对方"
                })) : (d = e({
                    text: i,
                    sex: this.data.sex,
                    reverse: !0,
                    type: "default"
                }), this.setData({
                    isTrue: !0,
                    chdf_text: "对方称呼我"
                })), s = d;
            } else a == this.data.id15 ? wx.switchTab({
                url: "/pages/index/index"
            }) : i.length >= 22 ? s = "关系有点远，年长就叫老祖宗~\n同龄人就叫帅哥美女吧" : 1 == this.data.sex && a == this.data.id1 && "我" == i || 0 == this.data.sex && a == this.data.id2 && "我" == i || (this.setData({
                chdf_text: "我称呼对方"
            }), d = e({
                text: i = i + "的" + a,
                sex: this.data.sex,
                reverse: !1,
                type: "default"
            }), console.log(d), this.isNull(d) && (d = "哎呀，关系太复杂了啊，我算不出来"), s = d);
        }
        this.setData({
            screenData: i,
            result: s
        });
    },
    isNull: function(t) {
        return 0 == t.length;
    }
}, "onShareAppMessage", function() {
    return {
        title: "亲戚关系(称呼)计算器",
        path: "/packageA/pages/tools/qqch/index"
    };
}));