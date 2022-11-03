var app = getApp(),
    cache = require('../../utils/cache.js');
Component({
    /* pageLifetimes: {
       show: function() {
         "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
           selected: 2
         });
       }
     },
     properties: {},*/
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        days: 0,
        showPoster: !1,
        down_count: 0,
        //每个配置内容
        config_base_list: [],
        //全局配置内容
        dialogButtons: [{
            text: "复制备注"
        }, {
            text: "前往赞赏"
        }],
        dialogShow: !1,
        Vip: false,
        zanzhu_xian: '1',
        system: !1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function () {
            wx.removeTabBarBadge({
                index: 4
            })
        },
        onShow: function () {

            if (!app.globalData.config_base_list.Api_code) {
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '请点"重载"加载数据再来访问。',
                    confirmText: '重载',
                    success: function () {
                        wx.reLaunch({
                            url: '/pages/index/index'
                        })
                    }
                })
                return false;
            } 
            var that = this;
            var Advertising = app.globalData.config_base_list.contact.Advertising;
            // console.log(cache.getDateStr(-1))
            console.log(Advertising)
            wx.getSystemInfo({
                success: function (res) {
                    console.log(res)
                    if (res.platform == "ios") {
                        console.log('ios')
                        that.setData({
                            system: !1
                        })
                    } else {
                        that.setData({
                            system: !0
                        })
                    }
                }
            })



            if (Advertising != null && Advertising != '') {
                Advertising = Advertising.replace(/{{appreciate}}/, app.globalData.config_base_list.contact.appreciate);
                Advertising = Advertising.replace(/{{user_id}}/, app.globalData.user_id);
                Advertising = Advertising.replace(/{{wxzhanghao}}/, app.globalData.config_base_list.contact.wxzhanghao);
                Advertising = Advertising.replace(/{{qqqun}}/, app.globalData.config_base_list.contact.qqqun);
                Advertising = Advertising.split('\\' + 'n');
            }
            console.log(Advertising)
            that.setData({
                config_base_list: app.globalData.config_base_list,
                user_id: app.globalData.user_id,
                mode: app.globalData.mode,
                Advertising: Advertising
            })
            console.log(that.data.vip)
            that.setData({
                Version: app.globalData.Version,
                zanzhu: app.globalData.zanzhu
            })

            if (that.data.zanzhu == '1' && that.data.zanzhu_xian == '1') {
                that.tapHandler()
            }
            wx.getStorage({
                key: 'down_count',
                success(res) {
                    that.setData({
                        down_count: res.data
                    })
                }
            }), wx.getStorage({
                key: 'days',
                success(res) {
                    var date = new Date().getTime() - new Date(res.data).getTime(); //时间差的毫秒数
                    that.setData({
                        days: Math.floor(date / (24 * 3600 * 1000))
                    })
                }
            })
            if (that.data.mode == 1 || that.data.mode == 3) {
                if (cache.get('Home_VideoAD')) {
                    if (cache.get('Home_VideoAD_deadtime') > Date.parse(new Date()) / 1000) {
                        that.setData({
                            Vip: true
                        })
                        console.log("已在一天内看了广告，无需再次加载广告")
                    } else {
                        if (that.data.config_base_list.user_information.vip == '1') {
                            that.setData({
                                Vip: true
                            })
                        } else {
                            that.setData({
                                Vip: false
                            })
                        }
                    }
                } else {
                    if (that.data.config_base_list.user_information.vip == '1') {
                        that.setData({
                            Vip: true
                        })
                    } else {
                        that.setData({
                            Vip: false
                        })
                    }
                }
                console.log("vip:", that.data.Vip)
            }
        },
        gomd5: function () {
            wx.switchTab({
                url: "/pages/md5/md5"
            });
        },
        sharePoster: function () {
            var that = this;
            if (that.data.config_base_list.Other_switches.poster_switch == 1) {
                this.setData({
                    showPoster: !this.data.showPoster
                });
            } else if (that.data.config_base_list.Other_switches.poster_switch == 2) {
                wx.navigateTo({
                    url: "./invite/invite?share_poster=1"
                })
            } else {
                wx.showModal({
                    title: '温馨提示',
                    content: '未开启分享海报页面',
                    confirmText: '我知道了',
                    confirmColor: '#1AAD19',
                    showCancel: !1,
                    success: function (t) {}
                })
            }

        },
        tapDialogButton: function (t) {
            var that = this,
                src = that.data.config_base_list.contact.appreciate_img;
            0 == t.detail.index ? wx.setClipboardData({
                data: "我的用户ID为：" + this.data.user_id,
                success: function (t) {
                    console.log(t);
                }
            }) : 1 == t.detail.index && wx.previewImage({
                current: src,
                urls: [src]
            });
        },
        tapHandler: function () {
            var that = this;
            if (that.data.config_base_list.user_information.vip == '1') {
                wx.showModal({
                    title: '温馨提示',
                    content: '您已是赞助会员了，无需开启了！',
                    confirmText: '我知道了',
                    confirmColor: '#1AAD19',
                    showCancel: !1,
                    success: function (t) {}
                })
            } else {
                this.setData({
                    dialogShow: !0,
                    zanzhu_xian: '0',
                    dialogItem: {
                        title: "温馨提示"
                    }
                });
            }
        },
        qiandao: function () {
            wx.navigateTo({
                url: "/pages/mine/qiandao/qiandao"
            })
        },
        invite: function () {
            wx.navigateTo({
                url: "/pages/mine/invite/invite"
            })
        },
        exchange: function () {
            wx.navigateTo({
                url: "/pages/mine/exchange/exchange"
            })
        },
        points_history: function () {
            wx.navigateTo({
                url: "/pages/mine/points_history/points_history"
            })
        },
        view_rmb: function () {
            wx.navigateTo({
                url: "/pages/mine/invite/withdraws/withdraws"
            })
        },
        checkUpdate: function () {
            wx.showModal({
                title: '温馨提示',
                content: '已是最新版,无需更新。',
                confirmText: '我知道了',
                confirmColor: '#1AAD19',
                showCancel: !1,
                success: function (t) {}
            })
        },
        //分享小程序
        onShareAppMessage: function () {
            return {
                title: this.data.config_base_list.share_title ? this.data.config_base_list.share_title : '推荐一款超好用的视频去水印工具，免费解析不限次，大家都在用',
                path: '/pages/index/index?inviter_id=' + this.data.user_id,
                imageUrl: this.data.config_base_list.share_imageUrl ? this.data.config_base_list.share_imageUrl : '/images/share.jpg',
                success: function (e) {
                    wx.showToast({
                        title: "分享成功",
                        icon: "success",
                        duration: 2e3
                    });
                },
                fail: function (e) {
                    wx.showToast({
                        title: "分享失败",
                        icon: "none",
                        duration: 2e3
                    });
                }
            }
        },
    }
})