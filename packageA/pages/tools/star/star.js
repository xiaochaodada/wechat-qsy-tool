var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("util")), a = getApp();

Page({
    data: {
        tips_two: "方便下次问星",
        show: !1,
        answer: "",
        imageUrl: "https://www.lxl66.cn/tu/",
        animationData1: {},
        animationData2: {},
        animationData3: {},
        animationData4: {},
        animationData5: {}
    },
    onLoad: function(t) {
        this.setData({
            isIpx: a.globalData.isIpx
        });
    },
    lightUp: function() {
        var a = this;
        this.setData({
            answer: t.default.getAnswer(),
            splash: !0,
            show: !0
        });
        var i = wx.createAnimation({
            duration: 6e3,
            timingFunction: "linear"
        }), n = wx.createAnimation({
            duration: 6e3,
            timingFunction: "linear"
        }), e = wx.createAnimation({
            duration: 3e3,
            timingFunction: "ease-in-out"
        }), o = wx.createAnimation({
            duration: 6e3,
            timingFunction: "linear"
        }), r = wx.createAnimation({
            delay: 2e3,
            duration: 6e3,
            timingFunction: "ease-in-out"
        });
        i.opacity(1).rotate(720).step(), n.opacity(1).rotate(-720).step(), e.opacity(0).step(), 
        o.opacity(1).step(), r.opacity(1).step(), this.setData({
            animationData1: i.export(),
            animationData2: n.export(),
            animationData3: e.export(),
            animationData4: o.export(),
            animationData5: r.export()
        }), setTimeout(function() {
            a.setData({
                show: !0
            });
        }, 2e3);
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "默念心中困惑，六芒星会给你答案。",
            path: "/packageA/pages/tools/star/star"
        };
    },
    ask: function() {
        wx.reLaunch({
            url: "/packageA/pages/tools/star/star"
        });
    },
    returns:function () {
        wx.switchTab({
            url: "/pages/pdd-goods/pdd-goods"
        });
    }
});