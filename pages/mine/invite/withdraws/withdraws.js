var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        exshow: !1,
        result: [{
            id: '0',
            name: '提现到微信'
        }, {
            id: '1',
            name: '提现到支付宝'
        }],
        withdrawtype: 0,
        mode: app.globalData.mode
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            mode: app.globalData.mode,
            config_base_list: app.globalData.config_base_list,
            user_id: app.globalData.user_id
        })
        if (this.data.config_base_list.Other_switches.switch_function != 1) {
            wx.setNavigationBarTitle({
                title: "提现" + this.data.config_base_list.user_information.unit
            })
            this.withdraw()
        }

       
    },
    withdraw: function () {
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
                        type: 'withdraw'
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function (res) {
                        console.log(res)
                        if (res.data.code == 200) {
                            var description = res.data.data.description.split('\\' + 'n');
                            that.setData({
                                withdraw: res.data.data,
                                description: description
                            })
                            console.log(description)
                            wx.hideLoading()
                        } else {
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
    soumettre: function () {
        var that = this;
        console.log("提现姓名", that.data.name)
        console.log("提现账号", that.data.number)
        console.log("当前提现类型", that.data.withdrawtype)
        if (that.data.name == null || that.data.name == "" || that.data.number == null || that.data.number == "") {
            wx.showModal({
                title: '提示',
                content: '请把提现信息填写完整。',
                showCancel: !1
            })
            return
        }

        wx.showLoading({
            title: "提现中"
        })
        wx.login({
            success: function (res) {
                wx.request({
                    url: app.globalData.tonyon + '/api/WeChat/user/api/withdraw.php',
                    method: "POST",
                    data: {
                        code: res.code,
                        appid: app.globalData.appid,
                        integral: that.data.currentMoney,
                        name: that.data.name,
                        number: that.data.number,
                        type: that.data.withdrawtype
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function (res) {
                        console.log(res)
                        if (res.data.code == 200) {
                            wx.hideLoading()
                            that.setData({
                                exshow: !1
                            })
                            wx.showModal({
                                title: '提示',
                                content: res.data.msg,
                                showCancel: !1
                            })
                        } else {
                            wx.hideLoading()
                            wx.showModal({
                                title: '提示',
                                content: res.data.msg,
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
    exchange: function (t) {
        this.setData({
            exshow: !1
        });
    },
    input_name: function (t) {
        this.setData({
            name: t.detail.value
        });
    },
    input_number: function (t) {
        this.setData({
            number: t.detail.value
        });
    },
    openClose: function () {
        if (this.data.iswithdrawShow == 1) {
            this.setData({
                iswithdrawShow: !1
            });
        } else {
            this.setData({
                iswithdrawShow: !0
            });
        }

    },
    optionTap: function (a) {
        var type = a.target.dataset.id;
        console.log("获取到提现类型", type)
        this.setData({
            iswithdrawShow: !1,
            withdrawtype: type
        });
    },
    onWithDraw: function (a) {
        var that = this;
        console.log("输入金额", that.data.currentMoney)
        console.log("最少金额", that.data.withdraw.amount)
        if (this.data.currentMoney == null || this.data.currentMoney == "" || this.data.currentMoney == 0) {
            wx.showModal({
                title: '提示',
                content: '请输入提现数量再进行操作。',
                showCancel: !1
            })
            return
        } else if (parseFloat(that.data.currentMoney) < parseFloat(that.data.withdraw.amount)) {
            wx.showModal({
                title: '提示',
                content: '最少要提现' + that.data.withdraw.amount + that.data.config_base_list.user_information.unit,
                showCancel: !1
            })
            return
        } else {
            this.setData({
                exshow: !0
            });
        }

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
    onInputChanged: function (e) {
        this.setData({
            currentMoney: e.detail.value
        })
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