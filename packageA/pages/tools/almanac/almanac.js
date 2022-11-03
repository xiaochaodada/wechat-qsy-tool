var app = getApp();
Page({
    data: {
        dateInfo: [],
        date: "2020-3-30",
        flag: 0
    },
    onLoad: function() {},
    isDate: function(t) {
        return !(t.length > 0 && !/^[0-9]{4}-(0?[0-9]|1[0-2])-(0?[1-9]|[12]?[0-9]|3[01])$/i.test(t)) || "你输入的日期格式错误";
    },
    sendRequest: function(a) {
        wx.showLoading({
            title: "查询中..."
        });
        var n = this;
        wx.login({
            success: function(res) {
                wx.request({
                    url: app.globalData.tonyon + "/api/WeChat/user/tools/huangli.php",
                    data: {
                        time: a,
                        appid: app.globalData.appid,
                        code: res.code
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(t) {
                        console.log(t), "0" == t.data.error_code ? n.setData({
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
        var a = t.detail.value.date;
        console.log(a);
        var e = this.isDate(a);
        !0 === e ? (this.setData({
            date: a
        }), this.sendRequest(a)) : wx.showToast({
            title: e,
            icon: "none",
            duration: 2e3
        });
    },
    bindDateChange: function(t) {
        this.setData({
            date: t.detail.value
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "老黄历测吉凶",
            path: "/packageA/pages/tools/almanac/almanac"
        };
    }
});