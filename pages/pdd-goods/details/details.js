var app = getApp(),
    func = require('../../../utils/func.js');;

Page({
    data: {
        fen: 0,
        is_index: 0,
        myuser_id: 1,
        goods: []
    },
    onLoad: function(t) {
        var that = this;
        if (app.globalData.pinduoduo_client_id != null && app.globalData.pinduoduo_client_secret != null && app.globalData.pinduoduo_pid != null) {
            that.data.goods_id = t.goods_id;
            console.log(that.data.goods_id)
            that.details(that.data.goods_id)
        }else{
            wx.showNavigationBarLoading()
            wx.showLoading({
                title: '加载中',
            })
            that.setData({
                goods_id: t.goods_id,
            })
            that.get_pinduoduo_api()
        }
    },
    //远程加载小程序配置
    get_pinduoduo_api: function () {
        var that = this;
        wx.login({
            success: function (res) {
                wx.request({
                    url: app.globalData.tonyon + "/api/WeChat/user/user_api.php",
                    method: "POST",
                    data: {
                        code: res.code,
                        appid: app.globalData.appid
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function (a) {
                        that.setData({
                            config_base_list: a.data.data,
                            vip: a.data.vip
                        });
                        app.globalData.pinduoduo = a.data.pinduoduo;
                        app.globalData.pinduoduo_client_id = a.data.pinduoduo_client_id;
                        app.globalData.pinduoduo_client_secret = a.data.pinduoduo_client_secret;
                        app.globalData.pinduoduo_pid = a.data.pinduoduo_pid;
                        that.details(that.data.goods_id)
                        wx.hideLoading()
                    },
                    fail: function () {
                        wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: '网络请求超时',
                            confirmText: '重载',
                            success: function () {
                                wx.reLaunch({
                                    url: '/pages/pdd-goods/pdd-goods'
                                })
                            }
                        })
                    }
                })
            },
            fail: function () {
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '网络请求超时',
                    confirmText: '重载',
                    success: function () {
                        wx.reLaunch({
                            url: '/pages/pdd-goods/pdd-goods'
                        })
                    }
                })
            }

        })
    },
    details: function(goods_id) {
        wx.showNavigationBarLoading()
        wx.showLoading({
            title: '加载中',
        })
        var that = this,
            client_id = app.globalData.pinduoduo_client_id,
            client_secret = app.globalData.pinduoduo_client_secret,
            pid = app.globalData.pinduoduo_pid;
        var timestamp = Date.parse(new Date()),
            timestamp = timestamp / 1000,
            s = client_secret + "client_id" + client_id + "goods_id_list[" + goods_id + "]pid" + pid + "timestamp" + timestamp + "typepdd.ddk.goods.detail" + client_secret,
            n = func.md5(s);
        n = n.toUpperCase();
        wx.request({
            url: 'https://gw-api.pinduoduo.com/api/router?type=pdd.ddk.goods.detail&timestamp=' + timestamp + '&client_id=' + client_id + '&sign=' + n,
            method: "POST",
            data: {
                goods_id_list: "[" + goods_id + "]",
                pid: pid
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            success: function(res) {
                console.log(res.data.goods_detail_response.goods_details)
                var goods_list = res.data.goods_detail_response.goods_details[0];
                goods_list.coupon_start_time = func.js_date_time(goods_list.coupon_start_time)
                goods_list.coupon_end_time = func.js_date_time(goods_list.coupon_end_time)
                console.log(goods_list)
                console.log(goods_list.coupon_start_time)
                that.setData({
                    goods: goods_list
                })
                var timestamp = Date.parse(new Date()),
                    timestamp = timestamp / 1000,
                    s = client_secret + "client_id" + client_id + "generate_we_apptruegoods_id_list[" + goods_list.goods_id + "]p_id" + pid + "timestamp" + timestamp + "typepdd.ddk.goods.promotion.url.generate" + client_secret,
                    n = func.md5(s);
                n = n.toUpperCase();
                wx.request({
                    url: 'https://gw-api.pinduoduo.com/api/router?type=pdd.ddk.goods.promotion.url.generate&timestamp=' + timestamp + '&client_id=' + client_id + '&sign=' + n,
                    method: "POST",
                    data: {
                        goods_id_list: "[" + goods_list.goods_id + "]",
                        generate_we_app: true,
                        p_id: pid
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(res) {
                        var pdd_wx_url = res.data.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info,
                            pdd_app_id = pdd_wx_url.app_id,
                            pdd_page_path = pdd_wx_url.page_path;
                        console.log(pdd_wx_url)
                        goods_list['pdd_app_id'] = pdd_app_id
                        goods_list['pdd_page_path'] = pdd_page_path
                        console.log(goods_list)
                        that.setData({
                            goods: goods_list,
                            appID: pdd_app_id,
                            path: pdd_page_path,
                            goods_thumbnail_url: goods_list.goods_thumbnail_url,
                            share_goods_name: "【拼多多】优惠券" + (goods_list.coupon_discount) / 100 + "元\r\n原价¥" + goods_list.min_group_price / 100 + "券后价¥" + (goods_list.min_group_price - goods_list.coupon_discount) / 100
                        })
                        wx.hideLoading()
                        wx.hideNavigationBarLoading()
                    }
                })
            }
        })
    },

    mai: function() {
        var a = this;
        console.log(a.data.appID)
        console.log(a.data.path)
        wx.navigateToMiniProgram({
            appId: a.data.appID,
            path: a.data.path,
            envVersion: "release",
            success: function(a) {
                console.log("成功");
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    onReady: function() {},
    fen: function() {
        wx.navigateTo({
            url: "../share/share?goods_id=" + this.data.goods_id + "&user_id=" + this.data.user_id
        });
    },
    home_pages: function() {
       wx.reLaunch({
           url: "../../index/index",
           complete:function(t){
               console.log(t)
           }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this;
        return "button" === a.from && console.log(a.target), {
            title: t.data.share_goods_name,
            path: '/pages/pdd-goods/details/details?goods_id=' + t.data.goods_id,
            imageUrl: t.data.goods_thumbnail_url,
            success: function(a) {},
            fail: function(a) {}
        };
    }
});