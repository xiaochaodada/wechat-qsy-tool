var app = getApp();
Page({
    data: {
        dateInfo: [],
        flag: 0
    },
    isDate: function(t) {
        return !0;
    },
    onLoad: function() {

    },
    isInteger: function (obj) {
        return obj % 1 === 0
    },
    sendRequest: function(t) {
        if (!this.isInteger(t)){
            wx.showToast({
                title: "请输入正确的号码。",
                icon: "none",
                duration: 2e3
            })
            return
        }
        wx.showLoading({
            title: "查询中..."
        });
        var n = this;
        wx.login({
            success: function(res) {
                wx.request({
                    url: app.globalData.tonyon + "/api/WeChat/user/tools/qqtest.php",
                    data: {
                        qq: t,
                        appid: app.globalData.appid,
                        code: res.code
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(t) {
                        console.log(t), "0" == t.data.error_code ? n.setData({
                            dateInfo: t.data.result.data,
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
            title: "QQ号测试吉凶" + getApp().globalData.fengxiang,
            path: "/pages/index/index"
        };
    }
});