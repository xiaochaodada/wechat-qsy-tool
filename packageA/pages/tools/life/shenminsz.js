function t(t, a, e) {
    var n = a / e * 86400 / 60;
    n = n.toFixed(0);
    var i = Math.floor(n / 60), m = n % 60;
    m < 10 && (m = "0" + m);
    var o = "";
    i < 6 ? o = "凌晨 " + i + ":" + m : i >= 6 && i < 12 ? o = "上午 " + i + ":" + m : i >= 12 && i < 18 ? o = "下午 " + i + ":" + m : i >= 18 && i < 24 && (o = "晚上 " + i + ":" + m);
    var u = i, s = m, r = wx.createAnimation({
        duration: 1e3,
        timingFunction: "ease-in-out"
    });
    r.rotate(360 * u / 12).step();
    var l = wx.createAnimation({});
    l.rotate(360 * s / 60).step(), t.setData({
        "resultData.animation_hour": r,
        "resultData.animation_minute": l,
        "resultData.nowTime": o
    });
}

function a(t, a) {
    var e = a / 60, n = e / 60, i = n / 24, m = i / 7, o = i / 365, u = 12 * o;
    return e = parseInt(e), n = parseInt(n), i = parseInt(i), m = parseInt(m), [ {
        mNumb: o = parseInt(o),
        mType: "年"
    }, {
        mNumb: u = parseInt(u),
        mType: "月"
    }, {
        mNumb: m,
        mType: "周"
    }, {
        mNumb: i,
        mType: "天"
    }, {
        mNumb: n,
        mType: "时"
    }, {
        mNumb: e,
        mType: "分"
    } ];
}

function e(t, a, e) {
    var n = a, i = Math.floor(n / 86400);
    n -= 86400 * i;
    var m = Math.floor(n / 3600);
    n -= 3600 * m;
    var o = Math.floor(n / 60);
    return [ {
        mNumb: i,
        mType: "天"
    }, {
        mNumb: m,
        mType: "时"
    }, {
        mNumb: o,
        mType: "分"
    }, {
        mNumb: n -= 60 * o,
        mType: "秒"
    } ];
}

function n(t, a) {
    var e = t, n = e.data.mDate.split("-")[0];
    return "" == e.data.mName ? (i("请输入您的名字"), !1) : "" == e.data.mDate || e.data.mExpect < 0 ? (i("请正确填写年龄与预期寿命值"), 
    !1) : !(a - n >= e.data.mExpect && (i("预期寿命值不得小于现在年龄"), 1));
}

function i(t) {
    wx.showModal({
        title: "提示",
        content: t,
        showCancel: !1,
        success: function(t) {
            t.confirm && console.log("用户点击确定");
        }
    });
}

function m(t) {
    return e("lifeclock/randomword", {}, t);
}


Page({
    data: {
        mode: [ "index", "input", "result" ],
        currentMode: "index",
        mName: "",
        mExpect: 80,
        mDate: "",
        timestamp_exist: 0,
        timestamp_all: 0
    },
    onLoad: function() {
    },
    inputName: function(t) {
        var a = t.detail.value;
        this.setData({
            mName: a,
            "inputdata.mName": a
        });
    },
    bindDateChange: function(t) {
        this.setData({
            "inputdata.date": t.detail.value,
            mDate: t.detail.value
        }), console.log("picker发送选择改变，携带值为", this.data.mDate + "&&" + this.data.inputdata.data);
    },
    inputExpect: function(t) {
        var a = t.detail.value;
        a < 0 && (a = 80, i("预期年纪不得小于0,默认80")), this.setData({
            mExpect: a,
            "inputdata.mAge": a
        });
    },
    backAction: function(t) {
        this.setData({
            currentMode: "index"
        });
    },
    toInputViewAction: function(t) {
        this.setData({
            currentMode: "input",
            mName: "",
            mExpect: 80,
            mDate: "",
            "inputdata.date": "",
            "inputdata.mName": "",
            "inputdata.mAge": ""
        });
    },
    startCalculate: function(i) {
        var m = Date.parse(new Date()), o = new Date(m), u = this.data.mDate, s = Date.parse(new Date(u)) / 1e3, r = m / 1e3 - s, l = 31536e3 * this.data.mExpect, p = s + l - m / 1e3;
        if (this.setData({
            timestamp_exist: r,
            timestamp_all: p
        }), n(this, o.getFullYear())) {
            t(this, r, l);
            var c = a(0, r), d = e(0, p);
            this.loadRandomword(), this.setData({
                currentMode: "result",
                "resultData.existTime": c,
                "resultData.surplusTime": d
            });
        }
    },
    loadRandomword: function() {
        var t = this;
        m(new function() {
            this.success = function(a) {
                console.log(a), null != a && "" != a || (a = "../images/res/img/sentence.png"), 
                t.setData({
                    "resultData.img_url": a
                });
            }, this.fail = function(t, a) {
                console.log(a);
            }, this.complete = function() {};
        }());
    },
    onShareAppMessage: function(t) {
        return {
            title: "生命之钟",
            path: "/packageA/pages/tools/life/shenminsz"
        };
    }
});