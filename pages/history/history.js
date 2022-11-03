// pages/history/history.js

var app = getApp(),
    cache = require('../../utils/cache.js'),
    i = null,
    exprs = wx.getStorageSync("history") || [];

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        list: exprs,
        //每个配置内容
        config_base_list: [],
        //全局配置内容
        config_data_list: {
            "Api": "https://www.qsy.ink/jx"
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function() {

        },
        onShow: function() {
            this.history();
            console.log("config_base_list");
            console.log(this.config_base_list);

        },
        history: function() {
            var that = this;
            that.setData({
                config_base_list: app.globalData.config_base_list,
                user_id: app.globalData.user_id,
                vip: app.globalData.vip
            })
            that.setData({
                list: wx.getStorageSync("history") || []
            })
        },
        videoPlay: function(e) {
            var t = e.currentTarget.dataset.idx,
                a = this.data.downloadIndex;
            if (a) {
                var n = wx.createVideoContext("download" + a);
                n.seek(0), n.pause(), this.setData({
                    downloadIndex: t
                }), wx.createVideoContext("download" + a).play();
            } else this.setData({
                downloadIndex: t
            }), wx.createVideoContext("download" + t).play();
        },
        Download: function(e) {
            wx.reLaunch({
                url: "/pages/qsy/qsy?history=" + e.currentTarget.dataset.link
            })
        },
        DEL: function(e) {
            var that = this;
            var arr = wx.getStorageSync("history");
            var key = e.currentTarget.dataset.key;
            wx.showModal({
                title: '提示',
                content: '你确定要删除吗？',
                success(res) {
                    if (res.confirm) {
                        arr.splice(key, 1);
                        wx.setStorageSync("history", arr);
                        wx.showToast({
                            title: "删除成功",
                            icon: 'success',
                            duration: 1000
                        });
                        setTimeout(function() {
                            that.history();
                        }, 1000);
                    } else if (res.cancel) {}
                }
            })
        },
        //复制视频详情内容
        Copy_video_info: function(t) {
            var that = this;
            var timestamp = Date.parse(new Date()) / 1000;
            if (that.data.config_base_list.advertisements.videoAD_ID) {
                if (cache.get('Home_VideoAD') && cache.get('Home_VideoAD_deadtime') > timestamp || that.data.vip == '1') {
                    wx.setClipboardData({
                        data: t.currentTarget.dataset.content,
                        success: function(a) {
                            wx.showToast({
                                title: t.currentTarget.dataset.tip,
                                duration: 1200
                            });
                        }
                    });
                } else {
                    wx.showModal({
                        title: '温馨提示',
                        content: '观看一次完整视频，解锁24小时完全使用\r\n提示：只要看完广告，即可无限制使用（全天24小时内）免费工具。\r\n运营成本太高，谢谢您的谅解~',
                        confirmText: '观看视频',
                        confirmColor: '#1AAD19',
                        cancelText: '下次再说',
                        success: function(res) {
                            res.confirm && that.initVideoAd(function() {
                                wx.setClipboardData({
                                    data: t.currentTarget.dataset.content,
                                    success: function(a) {
                                        wx.showToast({
                                            title: t.currentTarget.dataset.tip,
                                            duration: 1200
                                        });
                                    }
                                });
                            });
                        }
                    })
                }
            } else {
                wx.setClipboardData({
                    data: t.currentTarget.dataset.content,
                    success: function(a) {
                        wx.showToast({
                            title: t.currentTarget.dataset.tip,
                            duration: 1200
                        });
                    }
                });
            }

        }, initVideoAd: function (e) {
            var that = this;
            this.openVideoAd(function () {
                cache.set('Home_VideoAD', "true", 86400)
                wx.showToast({
                    title: "解锁成功"
                }), e();
            }, function () {
                wx.showModal({
                    title: "使用提示",
                    content: that.data.config_base_list.advertisements.rewardedVideoAdTips,
                    showCancel: !1
                });
            }, function () {
                wx.showModal({
                    title: "提示",
                    content: "您目前暂无广告可看",
                    showCancel: !1,
                    success: function (o) {
                        o.confirm && e();
                    }
                });
            });
        },
        openVideoAd: function (t, e, o) {
            var that = this;
            wx.createRewardedVideoAd ? (wx.showLoading({
                title: "视频加载中"
            }), i && (i.offClose(), i.offError(), i.offLoad()), (i = wx.createRewardedVideoAd({
                adUnitId: that.data.config_base_list.advertisements.videoAD_ID ? that.data.config_base_list.advertisements.videoAD_ID : "adunit-3f31575d9d370dbe"
            })).load().then(function () {
                wx.hideLoading(), i.onClose(function (o) {
                    o && o.isEnded ? t && t() : (e && e(), console.log("播放中途退出"));
                }), i.show();
            }).catch(function (t) {
                wx.hideLoading();
            }), i.onLoad(function () {
                wx.hideLoading(), console.log("video 视频加载成功");
            }), i.onError(function (t) {
                wx.hideLoading(), o && o(), console.log(t);
            })) : wx.showModal({
                title: "提示",
                content: "您的微信版本过低，不支持此功能，请升级。"
            });
        },
        onShareAppMessage: function(e) {
            console.log(e);
            if ("button" === e.from) {
                var i = e.target.dataset.content;
                return {
                    title: i.title,
                    imageUrl: i.cover,
                    path: "/pages/qsy/qsy?history=" + i.url
                };
            }
            return {
                title: this.data.config_base_list.share_title,
                path: '/pages/index/index',
                imageUrl: this.data.config_base_list.share_imageUrl,
                success: function(e) {
                    wx.showToast({
                        title: "分享成功",
                        icon: "success",
                        duration: 2e3
                    });
                },
                fail: function(e) {
                    wx.showToast({
                        title: "分享失败",
                        icon: "none",
                        duration: 2e3
                    });
                }
            }
        }
    }
})