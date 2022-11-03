Page({
    data: {
        result: ""
    },
    onLoad: function(t) {
    },
    chooseImage: function(t) {
        var e = this;
        wx.scanCode({
            success: function(t) {
                console.log("扫描结果为：" + t.result), wx.showToast({
                    title: "扫描成功",
                    icon: "success"
                }), e.setData({
                    result: t.result
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "扫描失败",
                    icon: "none"
                });
            }
        });
    },
    copy: function(t) {
        var e = this;
        wx.setClipboardData({
            data: e.data.result,
            success: function(t) {
                wx.showToast({
                    title: "已复制",
                    icon: "none"
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "二维码转字符",
            path: "/chart/pages/tools/scanQrcode/scanQrcode"
        };
    }
});