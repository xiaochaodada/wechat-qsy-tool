var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (options.query && options.query != '' && options.query != null) {
            that.setData({
                query: !0
            })
            wx.setNavigationBarTitle({
                title: "提现记录"
            })
            this.points_history_list();
        }else{
            this.points_history_list();
        }
        that.setData({
            user_id: app.globalData.user_id
        })

        
    },
    points_history_list: function () {
        var that = this;
        wx.showLoading({
            title: "获取中"
        })
        wx.login({
            success: function (res) {
                wx.request({
                    url: app.globalData.tonyon + '/api/WeChat/user/api/list_query.php',
                    method: "POST",
                    data: {
                        code: res.code,
                        appid: app.globalData.appid,
                        type: that.data.query ? 'withdraw_query' : 'points_history_list'
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function (res) {
                        console.log(res)
                        if (res.data.code == 200) {
                            that.setData({
                                points_history_list: res.data.data.points_history_list,
                            })
                            wx.hideLoading()
                        } else if (res.data.code == 0) {
                            wx.hideLoading()
                            wx.showModal({
                                title: '提示',
                                content: '暂时记录明细',
                                showCancel: !1
                            })
                        } else {
                            wx.hideLoading()
                            wx.showModal({
                                title: '提示',
                                content: '获取失败，请稍后重试。',
                                showCancel: !1
                            })
                        }


                    },
                    fail: function () {
                        wx.showModal({
                            title: '提示',
                            content: '获取失败，请稍后重试。',
                            showCancel: !1
                        })
                    }
                })
            },
            fail: function () {
                wx.showModal({
                    title: '提示',
                    content: '获取失败，请稍后重试！',
                    showCancel: !1
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
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
    }
})