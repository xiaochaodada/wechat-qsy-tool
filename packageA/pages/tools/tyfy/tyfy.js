var app = getApp(), cache = require('../../../../utils/cache.js');;
Page({
    data: {
        dateInfo: [],
        flag: 0,
        casArray: ['同义词', '反义词'],
        casIndex:0
    },
    onLoad: function () { },
    sendRequest: function (a) {
        console.log(a)
        wx.showLoading({
            title: "查询中..."
        });
        var n = this;
        cache.checktext(a, function () {
            wx.showLoading({
                title: "查询中..."
            });
            wx.login({
                success: function (res) {
                    wx.request({
                        url: app.globalData.tonyon + "/api/WeChat/user/tools/tyfy.php",
                        data: {
                            type: n.data.casIndex == 0 ? '1' : (n.data.casIndex == 1 ? '2' : '1'),
                            text: a,
                            appid: app.globalData.appid,
                            code: res.code
                        },
                        method: "POST",
                        header: {
                            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        success: function (t) {
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
                fail: function () {

                }
            })
        }, function () {
            console.log("错误")
            wx.showToast({
                title: '此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本',
                icon: "none",
                duration: 2e3
            })
        })
    },
    formSubmit: function (t) {
        var a = t.detail.value.date;
        console.log(a);
         this.sendRequest(a)
    },
    bindDateChange: function (t) {
        this.setData({
            date: t.detail.value
        });
    },
    bindCasPickerChange: function (e) {
        console.log('选的是', e.detail.value)
        console.log('选的是', this.data.casArray[e.detail.value])
        this.setData({
            casIndex: e.detail.value
        })

    },
    onShareAppMessage: function (t) {
        return {
            title: "同义反义词",
            path: "/packageA/pages/tools/tyfy/tyfy"
        };
    }
});