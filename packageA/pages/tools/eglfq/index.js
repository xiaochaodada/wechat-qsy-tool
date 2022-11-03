var t = wx.createInnerAudioContext(), app = getApp();
// 插屏
t.obeyMuteSwitch = !1, t.autoplay = !0, t.onPlay(function() {
    console.log("开始播放");
}), t.onError(function(t) {
    console.log(t);
}), Page({
    data: {
        ad: !1,
        bgimg: "3",
        src: "https://www.lxl66.cn/mp3/2.mp3"
    },
    onLoad: function(t) {
        var n = this;
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode
        })
        setTimeout(function() {
            n.setData({
                ad: !0
            });
            var t = null;
            wx.createInterstitialAd && ((t = wx.createInterstitialAd({
                adUnitId: n.data.config.advertisements.videoAD_ID
            })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {})), 
            t && t.show().catch(function(t) {
                console.error(t);
            });
        }, 2e3);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        t.destroy();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "恶搞理发器",
            path: "/packageA/pages/tools/eglfq/index"
        };
    },
    start: function() {
        wx.vibrateShort();
        var n = this.data.bgimg;
        console.log(n);
        var o = "";
        "3" == n ? (n = "2", o = encodeURI("https://www.lxl66.cn/mp3/3.mp3"), this.setData({
            bgimg: n,
            src: o
        }), t.stop(), t.src = o, t.play()) : "2" == n ? (n = "1", o = encodeURI("https://www.lxl66.cn/mp3/2.mp3"), 
        this.setData({
            bgimg: n,
            src: o
        }), t.stop(), t.src = o, t.play()) : "1" == n && (n = "3", o = "", this.setData({
            bgimg: n,
            src: o
        }), t.stop());
    }
});