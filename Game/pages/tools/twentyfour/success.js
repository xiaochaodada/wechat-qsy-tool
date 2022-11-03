var app = getApp();
Page({
    data: {
        screenHeight: 500,
        requestObj: {},
        stars: 9,
        score: "",
        maskStatus: "none"
    },
    onLoad: function(t) {},
    btnHome: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    btnagain: function() {
        wx.redirectTo({
            url: "/Game/pages/tools/twentyfour/index"
        });
    },
    openRule: function() {
        this.setData({
            maskStatus: "block"
        });
    },
    closeMask: function() {
        this.setData({
            maskStatus: "none"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "挑战24点！",
            path: "/Game/pages/tools/twentyfour/index"
        };
    }
});