var app = getApp();
Page({
    data: {
        dateInfo: [],
        flag: 0
    },
    onLoad: function() {

    },
    isDate: function(t) {
        return !0;
    },
    sendRequest: function(t) {
        wx.showLoading({
            title: "查询中..."
        });
        var n = this;
        wx.login({
            success: function(res) {
                wx.request({
                    url: app.globalData.tonyon + "/api/WeChat/user/tools/mobile.php",
                    data: {
                        phone: t,
                        appid: app.globalData.appid,
                        code: res.code
                    },
                    method:"POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(t) {
                        console.log(t), "200" == t.data.resultcode ? n.setData({
                            dateInfo: t.data.result,
                            flag: 1
                        }) : wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            duration: 2e3
                        }), wx.hideLoading();
                    }
                });
            },
            fail: function() {

            }
        })

    },
    formSubmit: function(t) {
        var e = t.detail.value.date;
        console.log(e);
        var a = this.isDate(e);
        !0 === a ? this.sendRequest(e) : wx.showToast({
            title: a,
            icon: "none",
            duration: 2e3
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "手机号码归属查询",
            path: "/packageA/pages/tools/mobile/mobile"
        };
    }
});