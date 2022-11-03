var a = getApp(), t = require("../util.js");
var data_list = require("../data/list.js");

Page({
    data: {
        list: data_list.sxdata,
        swidth: a.globalData.swidth,
        modalHidden: !1,
        showModalStatus: !1,
        mengshow: !1,
        bottom: "-100%",
        male: 1,
        female: 1,
        malecheck: 1,
        femalecheck: 1,
        maleclickid: 1,
        femaleclickid: 1
    },
    onLoad: function(a) {
        var i = this;
        t.initdata(i, "sx");
    },
    showModal: function(a) {
        var i = this;
        t.showModal(i);
    },
    cancel: function(a) {
        var i = this;
        t.cancel(i);
    },
    setIcon: function(a) {
        var i = this;
        t.setIcon(i, "sx");
    },
    scrollFun: function(a) {
        var i = this;
        t.scrollFun(i, a);
    },
    clickIcon: function(a) {
        var i = this;
        t.clickIcon(i, a);
    },
    pair: function(a) {
        var t = "/Fortune/pages/sx/sxpair_info/sxpair_info?id=" + this.data.male + "_" + this.data.female;
        wx.navigateTo({
            url: t
        });
    },
    onShareAppMessage: function(a) {
        return "button" === a.from && console.log(a.target), {
            title: "生肖配对",
            path: "/Fortune/pages/sx/index/index"
        };
    }
});