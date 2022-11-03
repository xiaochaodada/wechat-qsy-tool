var a = require("./js/js.js"), app = getApp();

Page({
    data: {
        motto: "Hello World",
        nvabarData: {
            showCapsule: 1,
            title: "真心话大冒险"
        },
        userInfo: {},
        isReal: !0,
        textData: "抱住左边第一位异性的大腿，深情的闻一闻",
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    selectType: function(a) {
        var e = "btn-l" === a.target.id;
        this.setData({
            isReal: e
        }), this.changeData();
    },
    changeData: function(e) {
        "true" == e || this.clickMusic();
        var t;
        t = this.data.isReal ? this.getRandomData(a.realList) : this.getRandomData(a.adventureList), 
        this.setData({
            textData: t
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "你的真心话大冒险",
            path: "/Game/pages/tools/zindex/zindex",
            succeess: function(a) {
                console.log(a);
            }
        };
    },
    getRandomData: function(a) {
        var e = a.length;
        if (0 === e) return "题库都被你刷光啦，敬请期待更多有趣冒险";
        var t = parseInt(Math.random() * e), n = a[t];
        return a.splice(t, 1), n;
    },
    onLoad: function() {
        var a = this;

    },
    clickMusic: function() {
        var a = wx.createInnerAudioContext();
        a.autoplay = !0, a.src = "/images/video/dice_click.mp3", a.onPlay(function() {
            console.log("开始播放");
        }), a.onError(function(a) {
            console.log(a.errMsg), console.log(a.errCode);
        });
    }
});