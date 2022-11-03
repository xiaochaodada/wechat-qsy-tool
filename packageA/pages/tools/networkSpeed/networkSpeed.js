
Page({
    data: {
        speed: 0,
        speedAsMb: 0,
        speedAsType: "0M宽带",
        testUrl: "https://cdn.bootcss.com/angular.js/2.0.0-beta.17/angular2-all.umd.js",
        size: 1692,
        speedTypeList: [ {
            name: "0M宽带",
            min: 0,
            max: 77
        }, {
            name: "1M宽带",
            min: 77,
            max: 128
        }, {
            name: "2M宽带",
            min: 154,
            max: 256
        }, {
            name: "3M宽带",
            min: 231,
            max: 384
        }, {
            name: "4M宽带",
            min: 307,
            max: 512
        }, {
            name: "6M宽带",
            min: 462,
            max: 620
        }, {
            name: "8M宽带",
            min: 614,
            max: 1024
        }, {
            name: "12M宽带",
            min: 922,
            max: 1536
        }, {
            name: "20M宽带",
            min: 1537,
            max: 2560
        }, {
            name: "30M宽带",
            min: 2561,
            max: 3840
        }, {
            name: "50M宽带",
            min: 3841,
            max: 6400
        }, {
            name: "100M宽带",
            min: 7680,
            max: 12800
        } ],
        systemInfo: {
            mobilePhone: "锤子",
            mobileModel: "R10 plus",
            systemVersion: "Smartisan OS",
            networkType: "4G",
            wechatVersion: "6.6.6"
        }
    },
    onLoad: function(e) {
        this.startSpeedMeasure();
    },
    startSpeedMeasure: function(e) {
        var t = this;
        t.getSystemInfo(), t.getSpeed("https://fanyi.baidu.com/", '1692');
    },
    getSpeed: function(e, t) {
        var n = this, s = t, a = new Date(), o = 0;
        wx.showLoading({
            title: "测速中....",
            mask: !0
        }), wx.downloadFile({
            url: e,
            success: function(e) {
                var t = new Date();
                o = Math.round(1e3 * s / (t - a)), console.log("start:" + a + "\nend:" + t + "\nspeed:" + o), 
                n.setData({
                    speed: o
                }), n.speedConversion(o), wx.hideLoading();
            },
            fail: function(e) {
                wx.hideLoading(), wx.showToast({
                    title: "测速失败,请稍后重试。",
                    icon: "none"
                });
            }
        });
    },
    getSystemInfo: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                console.log(e), t.setData({
                    "systemInfo.mobilePhone": e.brand,
                    "systemInfo.mobileModel": e.model,
                    "systemInfo.systemVersion": e.system,
                    "systemInfo.wechatVersion": e.version
                });
            },
            fail: function(e) {
                console.log("get system info fail!!!");
            }
        }), wx.getNetworkType({
            success: function(e) {
                t.setData({
                    "systemInfo.networkType": e.networkType
                });
            },
            fail: function(e) {
                t.setData({
                    "systemInfo.networkType": "无法获取"
                });
            }
        });
    },
    speedConversion: function(e) {
        var t = this, n = t.data.speedTypeList, s = "0M宽带", a = (e / 1024).toFixed(2);
        t.setData({
            speedAsMb: a
        });
        for (var o = 0; o < n.length; o++) e >= n[o].min && (s = n[o].name);
        t.setData({
            speedAsType: s
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "网络测速",
            path: "/packageA/pages/tools/networkSpeed/networkSpeed"
        };
    }
});