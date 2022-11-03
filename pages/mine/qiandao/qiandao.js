var app = getApp(),
    i = null,
    cache = require('../../../utils/cache.js'),
    timestamp = Date.parse(new Date()),
    date = new Date(timestamp),
    Y = date.getFullYear(),
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    day = Y + '-' + M + '-' + D;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        let Download_Video_frequency = wx.getStorageSync("Download_Video_frequency" + cache.getDateStr(0));
        console.log(Download_Video_frequency)
        that.setData({
            config_base_list: app.globalData.config_base_list,
            mode: app.globalData.mode,
            user_id: app.globalData.user_id
        })
        let Subscription_check = wx.getStorageSync("Subscription_check");
        if (Subscription_check == true) {
            that.setData({
                Subscription_check: 1
            })
        }

        let task_data = wx.getStorageSync("task_data");
        console.log(task_data)
        console.log(task_data['date'])
        if (task_data['date'] != day) {
            var task_datas = '{"date": "' + day + '", "task_1": "", "task_2": 0, "task_3": 0, "task_4": 0}';
            console.log(JSON.parse(task_datas))
            wx.setStorage({
                key: "task_data",
                data: JSON.parse(task_datas)
            })

            that.setData({
                task_data: JSON.parse(task_datas)
            })
        } else {
            // if (that.data.config_base_list.user_task == null || that.data.config_base_list.user_task == '') {
            //     that.setData({
            //         task_data: task_data
            //     })
            // } else {
            //     that.setData({
            //         task_data: JSON.parse(that.data.config_base_list.user_task)
            //     })
            // }
            that.setData({
                task_data: task_data
            })
        }

        let frequency = wx.getStorageSync("frequency" + day),
            frequencys = wx.getStorageSync("frequencys" + day);
        wx.removeStorageSync("frequency" + cache.getDateStr(-1))
        wx.removeStorageSync("frequencys" + cache.getDateStr(-1))

        if (frequency && frequencys) {
            that.setData({
                frequency: frequency,
                frequencys: frequencys
            })
        }
    },
    checkin: function() {
        var that = this;
        var xiafa = 0;
        if (that.data.Subscription_check == 1) {
            let tmpIds = that.data.config_base_list.Other_switches.Template_qiandao;
            wx.requestSubscribeMessage({
                tmplIds: tmpIds,
                success(res) {
                    let tmpId = tmpIds[0];
                    console.log("返回", res)
                    if (res[tmpId] == "reject") {
                        xiafa = 0
                        wx.showModal({
                            title: '温馨提示',
                            content: '您当前开启了“签到提醒”,但没有同意订阅。请同意订阅或关闭“签到提醒”再来签到哦。',
                            cancelText: "我知道了",
                            confirmColor: '#1AAD19',
                            confirmText: "前往修改",
                            success(ress) {
                                ress.confirm && wx.openSetting({
                                    withSubscriptions:true,
                                    success: function(e) {}
                                });
                            }
                        })
                    } else if (res[tmpId] == "accept") {
                        xiafa = 1
                        qiandao(xiafa)
                    } else if (res[tmpId] == "ban") {
                        wx.showModal({
                            title: '温馨提示',
                            content: '您当前开启了“签到提醒”,但没有同意订阅。请同意订阅或关闭“签到提醒”再来签到哦。',
                            cancelText: "我知道了",
                            confirmColor: '#1AAD19',
                            confirmText: "前往修改",
                            success(ress) {
                                ress.confirm && wx.openSetting({
                                    success: function (e) { }
                                });
                            }
                        })
                    } else {
                        xiafa = 0
                        qiandao(xiafa)
                    }

                },
                fail(eee) {
                    console.log(eee)
                    wx.showModal({
                        title: '温馨提示',
                        content: '您当前开启了“签到提醒”,但没有同意订阅。请同意订阅或关闭“签到提醒”再来签到哦。',
                        cancelText: "我知道了",
                        confirmColor: '#1AAD19',
                        confirmText: "前往修改",
                        success(ress) {
                            ress.confirm && wx.openSetting({
                                success: function (e) { }
                            });
                        }
                    })
                }
            })
        } else {
            qiandao(xiafa)
        }

        function qiandao(xiafa) {
            wx.showLoading({
                title: "签到中"
            })
            wx.login({
                success: function(res) {
                    // console.log(res.code)
                    // return
                    wx.request({
                        url: app.globalData.tonyon + '/api/WeChat/user/api/qiandao.php',
                        method: "POST",
                        data: {
                            code: res.code,
                            appid: app.globalData.appid,
                            subscription: xiafa
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        success: function(res) {
                            console.log(res)
                            console.log(xiafa)
                            if (res.data.code == 200) {
                                that.setData({
                                    frequency: res.data.frequency,
                                    frequencys: res.data.frequencys
                                })
                                wx.setStorage({
                                    key: "frequency" + day,
                                    data: res.data.frequency
                                })
                                wx.setStorage({
                                    key: "frequencys" + day,
                                    data: res.data.frequencys
                                })
                                wx.hideLoading()
                                wx.showModal({
                                    title: '签到成功',
                                    content: res.data.msg,
                                    showCancel: !1,
                                    success(res) {
                                        if (res.confirm) {}
                                    }
                                })
                            } else {
                                wx.hideLoading()
                                wx.showModal({
                                    title: '温馨提示',
                                    content: res.data.msg,
                                    showCancel: !1,
                                    success(res) {
                                        if (res.confirm) {}
                                    }
                                })
                            }


                        },
                        fail: function() {
                            wx.showModal({
                                title: '提示',
                                content: '签到失败，请稍后重试。',
                                showCancel: !1
                            })
                        }
                    })
                },
                fail: function() {
                    wx.showModal({
                        title: '提示',
                        content: '领取失败，请稍后重试！',
                        showCancel: !1
                    })
                }
            })
        }
    },
    task: function(id) {
        var that = this;
        console.log("任务id",id)
        if (that.isInteger(id)) {
            task_id = id;
        } else {
            var task_id = id.target.dataset.id,
                task_2 = id.target.dataset.task;
        }
        wx.showLoading({
            title: "领取中"
        })
        if (task_2) {
            that.xiugai_initVideoAd(function() {
                that.task(2)
            })
            return;
        }
        if (task_id == 4) {
            if (!cache.Download_Video_frequency(5)) {
                wx.hideLoading()
                wx.showModal({
                    title: '温馨提示',
                    content: '你还未完成任务,请按说明完成任务才能领取。',
                    showCancel: !1
                })
                return;
            }
        }
        console.log('task_id:', task_id)
        if (!that.isInteger(task_id)) {
            wx.showModal({
                title: '提示',
                content: '你的操作太飘逸了。朕，不允许哦。',
                showCancel: !1
            })
            wx.hideLoading()
        } else {
            wx.login({
                success: function(res) {
                    wx.request({
                        url: app.globalData.tonyon + '/api/WeChat/user/api/task.php',
                        method: "POST",
                        data: {
                            code: res.code,
                            appid: app.globalData.appid,
                            task_id: task_id
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        success: function(res) {
                            console.log(res.data)
                            if (res.data.code == 200) {
                                that.setData({
                                    task_data: res.data.data
                                })
                                that.task_json()
                                wx.hideLoading()
                                if (task_id == 4) {
                                    cache.Download_Video_frequency(1)
                                }
                                wx.showModal({
                                    title: res.data.msg,
                                    content: res.data.msg,
                                    showCancel: !1,
                                    success(res) {
                                        if (res.confirm) {}
                                    }
                                })
                            } else {
                                wx.hideLoading()
                                wx.showModal({
                                    title: '温馨提示',
                                    content: res.data.msg,
                                    showCancel: !1,
                                    success(res) {
                                        if (res.confirm) {}
                                    }
                                })
                            }


                        },
                        fail: function() {
                            wx.showModal({
                                title: '提示',
                                content: '领取失败，请稍后重试。',
                                showCancel: !1
                            })
                        }
                    })
                }
            })
        }
    },
    onSubmitRemind: function() {
        let that = this,
            Subscription_check = wx.getStorageSync("Subscription_check");
        if (Subscription_check == true) {
            console.log('111')
            wx.removeStorage({
                key: 'Subscription_check'
            })
            that.setData({
                Subscription_check: !1
            })
        } else {
            wx.setStorage({
                key: "Subscription_check",
                data: true
            })
            that.setData({
                Subscription_check: 1
            })
        }

    },
    task_json: function() {
        let that = this,
            task_data = wx.getStorageSync("task_data");
        wx.setStorage({
            key: "task_data",
            data: that.data.task_data
        })
    },
    isInteger: function(obj) { 
        return obj % 1 === 0
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
    //调用视频
    xiugai_initVideoAd: function(e) {
        var that = this;
        this.openVideoAd(function() {
            wx.showToast({
                title: "领取中"
            }), e();
        }, function() {
            wx.showModal({
                title: "使用提示",
                content: '未观看完，请重新观看完广告，感谢您的支持！',
                showCancel: !1
            });
        }, function() {
            wx.showModal({
                title: "提示",
                content: "您目前暂无广告可看,请稍后重试。",
                showCancel: !1,
                success: function(o) {}
            });
        });
    },
    //看视频
    openVideoAd: function(t, e, o) {
        var that = this;
        wx.createRewardedVideoAd ? (wx.showLoading({
            title: "视频加载中"
        }), i && (i.offClose(), i.offError(), i.offLoad()), (i = wx.createRewardedVideoAd({
            adUnitId: that.data.config_base_list.advertisements.videoAD_ID ? that.data.config_base_list.advertisements.videoAD_ID : "adunit-3f31575d9d370dbe"
        })).load().then(function() {
            wx.hideLoading(), i.onClose(function(o) {
                o && o.isEnded ? t && t() : (e && e(), console.log("播放中途退出"));
            }), i.show();
        }).catch(function(t) {
            wx.hideLoading();
        }), i.onLoad(function() {
            wx.hideLoading(), console.log("video 视频加载成功");
        }), i.onError(function(t) {
            wx.hideLoading(), o && o(), console.log(t);
        })) : wx.showModal({
            title: "提示",
            content: "您的微信版本过低，不支持此功能，请升级。"
        });
    },
    //关闭弹窗
    hideModal: function(t) {
        this.setData({
            modalName: null
        });
    },
    track: function() {
        var that = this;
        that.setData({
            list: wx.getStorageSync("uploadrecord") || []
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