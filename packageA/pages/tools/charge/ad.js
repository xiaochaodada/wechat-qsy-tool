var n = null,app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode
        })
        wx.createRewardedVideoAd && ((n = wx.createRewardedVideoAd({
            adUnitId: this.data.config.advertisements.videoAD_ID
        })).onLoad(function() {}), n.onError(function(n) {}), n.onClose(function(n) {
            n && n.isEnded, wx.navigateBack({
                complete: function(n) {}
            });
        })), n && n.show().catch(function() {
            n.load().then(function() {
                return n.show();
            }).catch(function(n) {
                console.log("激励视频 广告显示失败");
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});