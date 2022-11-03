var app = getApp(), func = require('../../utils/func.js');

Page({
    data: {
        aid: "",
        secret: "",
        name: "解析助手会员",
        pay_type: "jsapi",
        order_uid: '',
        notify_url: app.globalData.tonyon + "/api/WeChat/user/pay/notify.php",
        more: {},
        appId: "wx6eeed4ca124a1abf",
        halfScreenShow: !1,
        month: 2,
        member: {},
        exec: !1,
        localTime: new Date().getTime(),
        platform: app.globalData.platform
    },
    onLoad: function() {
          var that =this;
        if (app.globalData.config_base_list == null) {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '页面加载失败，请重新尝试！',
                confirmText: '重载',
                success: function () {
                    wx.reLaunch({
                        url: '/pages/index/index'
                    })
                }
            })
        } else {
            that.setData({
                config_base_list: app.globalData.config_base_list,
                price: app.globalData.config_base_list.pay_config.price2,
                aid: app.globalData.config_base_list.pay_config.user_id,
                secret: app.globalData.config_base_list.pay_config.secret
            });
            var e = app.globalData.user_id;
            this.setData({
                order_uid: e
            });
            console.log(that.data.order_uid)
        }
    },
    submit: function(e,v) {
           var that =this;
        wx.showLoading({
            title: "正在处理"
        });
                wx.request({
                    url: app.globalData.tonyon + '/api/WeChat/user/pay/submit.php',
                    method: "POST",
                    data: {
                        content: e,
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function (res) {
                        console.log(res)
                        if (res.data.code == 200) {
                            wx.hideLoading()
                            wx.showModal({
                                title: '提示',
                                content: '订单创建成功,请前往支付。',
                                cancelText: "暂不支付",
                                confirmColor: '#1AAD19',
                                confirmText: "前往支付",
                                success(ress) {
                                    if (ress.confirm) {
                                        v()
                                    } else {
                                       
                                    }
                                }
                            })
                           
                        } else {
                            wx.hideLoading()
                            wx.showModal({
                                title: '提示',
                                content: '订单创建失败，请稍后重试。',
                                showCancel: !1
                            })
                        }

                    },
                    fail: function () {
                        wx.showModal({
                            title: '提示',
                            content: '订单创建失败，请稍后重试。',
                            showCancel: !1
                        })
                    }
                })
          
    },
    onShow: function() {
     
    },
    fan: function() {
        wx.showModal({
            title: '福利活动',
            content: '邀请新用户成为你下级,当用户开通会员时，你将获得下级用户支付金额的' + this.data.config_base_list.pay_config.percentage+"%,永不上限，更有其他邀请奖励哦。",
            cancelText: "我知道了",
            confirmColor: '#1AAD19',
            confirmText: "前往邀请",
            success(ress) {
                if (ress.confirm) {
                    wx.navigateTo({
                        url: '/pages/mine/invite/invite'
                    })
                } else {

                }
            }
        })
    },

    choosePackage: function(e) {
        console.log(e)
        var that = this,t = e.currentTarget.dataset.count, a = t = parseInt(t);
        var price = 'price' + a;
        console.log(price)
        this.setData({
            month: t,
            price: that.data.config_base_list.pay_config[price]
        });
    },
    pay: function() {
        var e = this, t = this.buildOrderNo(), a = this.data, r = a.aid, o = a.name, i = a.pay_type, s = a.price, c = a.order_uid, u = a.notify_url, l = a.more, d = a.secret, p = a.appId;
        
        l = JSON.stringify({
            trade_no: t,
            appid: app.globalData.appid,
            userid: c,
            tid: this.data.month,
            name: o,
            money: s
        })
        console.log(l)
        e.submit(l,function(){
            console.log(l)
            wx.navigateToMiniProgram({
                appId: p,
                path: "pages/index/index",
                extraData: {
                    aid: r,
                    name: o,
                    pay_type: i,
                    price: s,
                    order_id: t,
                    order_uid: c,
                    notify_url: u,
                    more: l,
                    sign: func.md5([o, i, s, t, u, d].join("")).toUpperCase()
                },
                fail: function (e) {
                    var t = e.errMsg.split(":")[1];
                    "fail cancel" !== t && wx.showToast({
                        title: t,
                        icon: "none"
                    });
                },
                success: function (t) {
                    e.setData({
                        exec: !0
                    }), console.log("res", t);
                }
            });
        })
        
    },
    buildOrderNo: function() {
        var e = app.globalData.user_id;
        this.setData({
            order_uid: e
        });
        const now = new Date()
        const year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        String(month).length < 2 ? (month = Number("0" + month)) : month;
        String(day).length < 2 ? (day = Number("0" + day)) : day;
        String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
        String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
        String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
        const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
        var outTradeNo = yyyyMMddHHmmss + '_' + Math.random().toString(36).substr(2, 9);
        console.log(outTradeNo)
        return outTradeNo;
    },
    showHalfScreen: function() {
        this.setData({
            halfScreenShow: !0
        });
    },
    android: function() {
        // return "android" === __wxConfig.platform.toLowerCase();
    },
    onUnload: function() {
        // wx.offAppShow();
    }
});