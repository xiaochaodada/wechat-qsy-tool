var app = getApp();
Page({
    data: {
        nfc: ""
    },
    onLoad: function() {
        var e = this;
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })
        if (wx.getSystemInfo({
                success: function(n) {
                    console.log(n), e.setData({
                        brand: n.brand,
                        model: n.model,
                        pixelRatio: n.pixelRatio,
                        windowWidth: n.windowWidth,
                        windowHeight: n.windowHeight,
                        screenWidth: n.screenWidth,
                        screenHeight: n.screenHeight,
                        version: n.version,
                        platform: n.platform,
                        system: n.system,
                        fontSizeSetting: n.fontSizeSetting + "px",
                        SDKVersion: n.SDKVersion,
                        benchmarkLevel: n.benchmarkLevel,
                        statusBarHeight: n.statusBarHeight + "px"
                    });
                }
            }), wx.getNetworkType({
                success: function(n) {
                    var t = n.networkType;
                    e.setData({
                        networkType: t
                    });
                }
            }), wx.onNetworkStatusChange(function(n) {
                console.log(n.isConnected), console.log(n.networkType);
                var t = n.networkType;
                e.setData({
                    networkType: "none" !== t ? t : "无网络"
                });
            }), wx.startWifi({
                success: function(n) {
                    console.log(n.errMsg)
                    try {
                        wx.getConnectedWifi({
                            success: function(n) {
                                console.log("wifi_info:", n), n.wifi && e.setData({
                                    SSID: n.wifi.SSID,
                                    BSSID: n.wifi.BSSID,
                                    secure: n.wifi.secure ? "安全" : "危险",
                                    signalStrength: n.wifi.signalStrength > 80 ? "强" : signalStrength > 50 ? "中" : "弱"
                                });
                            },
                            fail: function(e) {
                                console.log("wifi_info_fail:", e);
                            },
                            complete: function() {
                                wx.stopWifi({
                                    success: function(e) {
                                        console.log(e.errMsg);
                                    }
                                });
                            }
                        });
                    } catch (error) {}
                }
            }), wx.getHCEState({
                success: function(n) {
                    console.log(n), e.setData({
                        nfc: "支持"
                    });
                },
                fail: function(n) {
                    console.log("fail", n), e.setData({
                        nfc: "不支持"
                    });
                }
            }), wx.getUpdateManager) {
            var n = wx.getUpdateManager();
            n.onCheckForUpdate(function(e) {}), n.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "更新到最新版小程序，获得更好体验。",
                    success: function(e) {
                        e.confirm && n.applyUpdate();
                    }
                });
            }), n.onUpdateFailed(function() {});
        } else wx.showModal({
            title: "提示",
            content: "您的微信版本过低，可以下载最新微信版本，获取更多的小程序功能",
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        });
    },
    alicopy: function(e) {
        wx.setClipboardData ? wx.setClipboardData({
            data: e.currentTarget.dataset.ali,
            success: function(e) {
                wx.showToast({
                    title: "打开支付宝搜索即可领取红包",
                    icon: "none",
                    duration: 4e3
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    setClip: function() {
        var e = this.data,
            n = "",
            t = "";
        e.SSID && (n = "\n\r WiFi名字：" + e.SSID + "\n\r WiFi地址：" + e.BSSID + "\n\r WiFi安全：" + e.secure + "\n\r WiFi信号：" + e.signalStrength),
            e.benchmarkLevel && (t = "\n\r 性能等级：" + e.benchmarkLevel), wx.setClipboardData({
                data: "  手机品牌：" + e.brand + "\n\r 手机型号：" + e.model + "\n\r 客户端平台：" + e.platform + "\n\r 操作系统版本：" + e.system + "\n\r 微信版本号：" + e.version + "\n\r 基础库版本：" + e.SDKVersion + "\n\r 设备像素比：" + e.pixelRatio + "\n\r 状态栏的高度：" + e.statusBarHeight + "\n\r 屏幕宽度：" + e.screenWidth + "\n\r 屏幕高度：" + e.screenHeight + "\n\r 可使用窗口宽度：" + e.windowWidth + "\n\r 可使用窗口高度：" + e.windowHeight + "\n\r 用户字体大小：" + e.fontSizeSetting + "\n\r 当前网络状态：" + e.networkType + n + "\n\r 是否支持NFC：" + e.nfc + t,
                success: function(e) {}
            });
    },
    onShareAppMessage: function() {
        return {
            title: "手机真伪查询",
            path: "/packageA/pages/tools/sjzw/index"
        };
    }
});