function a(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

function e(a) {
    a.setData({
        showModalStatus: !1
    }), setTimeout(function() {
        a.setData({
            mengshow: !1,
            bottom: "-100%"
        });
    }, 300);
}

var t = function(a) {
    return (a = a.toString())[1] ? a : "0" + a;
}, c = "https://api.xzw.com/com/json/";

module.exports = {
    formatTime: function(a) {
        var e = a.getFullYear(), c = a.getMonth() + 1, n = a.getDate(), o = a.getHours(), i = a.getMinutes(), l = a.getSeconds();
        return [ e, c, n ].map(t).join("/") + " " + [ o, i, l ].map(t).join(":");
    },
    showModal: function(a) {
        a.setData({
            modalHidden: !0,
            showModalStatus: !0,
            mengshow: !0,
            bottom: "0px"
        });
    },
    hideModal: e,
    setIcon: function(a, t) {
        a.setData({
            female: a.data.femalecheck,
            male: a.data.malecheck,
            femaleclickid: a.data.femalecheck,
            maleclickid: a.data.malecheck
        });
        var c = {};
        c.m = a.data.malecheck, c.f = a.data.femalecheck, wx.setStorage({
            key: t,
            data: c
        }), e(a);
    },
    cancel: function(a) {
        a.setData({
            femalecheck: a.data.female,
            malecheck: a.data.male,
            femaleclickid: a.data.female,
            maleclickid: a.data.male
        }), e(a);
    },
    scrollFun: function(e, t) {
        var c = t.currentTarget.dataset.name, n = t.detail.scrollTop, o = t.detail.scrollHeight, i = Math.round(n / (o / 14));
        i > 11 && (i = 11), i < 0 && (i = 0), e.setData(a({}, c, i));
    },
    clickIcon: function(e, t) {
        var c, n = t.currentTarget.dataset.index, o = t.currentTarget.dataset.name, i = o + "check", l = o + "clickid";
        e.setData((c = {}, a(c, i, n), a(c, l, n), c));
    },
    getData: function(a, e, t) {
        var n, o = e.data.list[a - 1].name;
        e.data.id;
        n = "xz" === t ? c + "fortune.js?id=" + a + "&ld=-1&vc=xcx&token=Mh8tGmSoW3fyH642Y+Eb3E" : c + "shengxiao.js?id=" + a + "&vc=xcx&token=Mh8tGmbZpzSxqPGmJaKeKo", 
        wx.request({
            url: n,
            success: function(t) {
                e.setData({
                    infodata: t.data.data,
                    id: a,
                    name: o
                });
            }
        });
    },
    initdata: function(a, e) {
        var t = wx.getStorageSync(e);
        t && a.setData({
            male: t.m,
            malecheck: t.m,
            maleclickid: t.m,
            female: t.f,
            femalecheck: t.f,
            femaleclickid: t.f
        });
    }
};