var app = getApp();
var share = require('../../../utils/share'),
    i = share.promisify(wx.getImageInfo),
    n = share.promisify(wx.canvasToTempFilePath),
    s = wx.createCanvasContext("myCanvas");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hide_qcode: 1,
        ratio: app.globalData.ratio,
    },
    closeQcode: function() {
        this.setData({
            hide_qcode: 1
        });
    },
    saveImage: function() {
        var that = this;
        n({
            canvasId: "myCanvas"
        }, this).then(function(e) {
            wx.saveImageToPhotosAlbum({
                filePath: e.tempFilePath,
                success: function(e) {
                    that.setData({
                        openSettingBtnHidden: 1
                    })
                    wx.showToast({
                        title: "保存成功"
                    });
                },
                fail: function(e) {
                    wx.getSetting({
                        success: function(e) {
                            0 == e.authSetting["scope.writePhotosAlbum"] && wx.showModal({
                                title: "是否授权保存至相册",
                                content: "需要获取相册权限，请确认授权，或者点击图片长按保存至相册",
                                success: function(e) {
                                    e.confirm && wx.openSetting({});
                                }
                            });
                        }
                    });
                }
            });
        });
    },
    share_invite: function() {
        var t = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        console.log(t.data.share_url)
        var n = this,
            o = n.data.ratio
        i({
            src: n.data.share_url
        }).then(function(e) {
            s.drawImage('../../../images/share_inter.jpg', 0, 0, 600 * o, 1000 * o),
                s.drawImage(e.path, 365 * o, 775 * o, 180 * o, 180 * o),
                s.save(), s.setTextBaseline("top"), s.setTextAlign("center"), s.setFontSize(30 * o),
                s.clip(), s.draw(), t.setData({
                    hide_qcode: 0
                }), setTimeout(function() {
                    wx.hideLoading();
                    n.saveImage();
                }, 200);
        }).catch(function(e) {
            console.log(e)
            wx.hideLoading(), wx.showToast({
                title: "图片生成失败,请重试",
                icon: "none"
            });
        });
    },
    share_download: function(a) {
        var that = this;
        wx.login({
            success: function(res) {
                wx.request({
                    url: app.globalData.tonyon + '/api/WeChat/user/api/QRcode.php',
                    method: "POST",
                    data: {
                        code: res.code,
                        appid: app.globalData.appid,
                        user_id: that.data.user_id
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(res) {
                        if (res.data.img != -1) {
                            that.setData({
                                share_url: app.globalData.tonyon + '/api/WeChat/user/api/APPID/IMG/' + app.globalData.appid+'/' + res.data.img + '.jpg'

                            })
                            a()
                            // wx.downloadFile({
                            //     url: app.globalData.tonyon + '/api/WeChat/user/api/APPID/IMG/wx3a82048858980c7b/' + res.data.img + '.jpg',
                            //     success: function (t) {
                            //         that.setData({
                            //              share_url: t.tempFilePath

                            //         })
                            //         console.log(t.tempFilePath)
                            //     }
                            // })
                        } else {
                            wx.showModal({
                                title: '提示',
                                content: '获取失败，请稍后重试。',
                                showCancel: !1
                            })
                        }
                    },
                    fail: function() {
                        wx.showModal({
                            title: '提示',
                            content: '获取失败，请稍后重试。',
                            showCancel: !1
                        })
                    }
                })
            },
            fail: function() {
                wx.showModal({
                    title: '提示',
                    content: '获取失败，请稍后重试！',
                    showCancel: !1
                })
            }
        })
    },
    invite_list: function() {
        wx.navigateTo({
            url: "/pages/mine/invite/invite_list/invite_list",
            fail: function(res) {
                console.log(res)
            }
        })
    },
    invite_count: function() {
        var that = this;
        wx.showLoading({
            title: "获取中"
        })
        wx.login({
            success: function(res) {
                wx.request({
                    url: app.globalData.tonyon + '/api/WeChat/user/api/list_query.php',
                    method: "POST",
                    data: {
                        code: res.code,
                        appid: app.globalData.appid,
                        type: 'count'
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(res) {
                        console.log(res)
                        that.setData({
                            invite_count: res.data.count,
                            invite_banner: res.data.Invitation_banner
                        })
                        app.globalData.Invitation_rules = res.data.data;
                        wx.hideLoading()
                    },
                    fail: function() {
                        wx.showModal({
                            title: '提示',
                            content: '获取失败，请稍后重试。',
                            showCancel: !1
                        })
                    }
                })
            },
            fail: function() {
                wx.showModal({
                    title: '提示',
                    content: '获取失败，请稍后重试！',
                    showCancel: !1
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.share_poster)
        var that = this;
        this.setData({
            config_base_list: app.globalData.config_base_list,
            user_id: app.globalData.user_id,
            mode: app.globalData.mode
        })
        this.invite_count()
        if (options.share_poster) {
            this.share_download(function(){
                that.share_invite()
            })
        }else{
            this.share_download(function () {
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    rule: function() {
        wx.navigateTo({
            url: "/pages/mine/invite/rule/rule"
        })
    },
    withdraw: function() {
        wx.navigateTo({
            url: "/pages/mine/invite/withdraws/withdraws"
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: this.data.config_base_list.share_title ? this.data.config_base_list.share_title : '推荐一款超好用的视频去水印工具，免费解析不限次，大家都在用',
            path: '/pages/index/index?inviter_id=' + this.data.user_id,
            imageUrl: this.data.config_base_list.share_imageUrl ? this.data.config_base_list.share_imageUrl : '/images/share.jpg',
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
})