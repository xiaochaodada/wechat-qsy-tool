var app = getApp(),
    i = null,
    exprs = wx.getStorageSync("uploadrecord") || [],
    cache = require('../../utils/cache.js');
// 在页面中定义插屏广告
let interstitialAd = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        is_load: !0,
        Video_id: 1,
        Type: 1,
        Duration: 3,
        CreationTime: 4,
        ExpirationDate: 5,
        Filesize: 6,
        list: exprs,
        appid: '111',
        downloadProcess: 0,
        isCompressed: !1,
        bgShow: !0
    },

    /**
     * 生命周期函数--监听页面显示
     */


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var chaping = app.globalData.config_base_list.advertisements.chaping;
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: chaping
            })
            interstitialAd.onLoad((res) => {
                console.log("插屏加载成功：", res)
            })
            interstitialAd.onError((err) => {
                console.log("插屏加载失败：", err)
            })
            interstitialAd.onClose(() => {})
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    onShow: function() {
        var that = this;
        if (this.data.is_load) {
            this.get_config_api_xiugai();
        }
        let isCompressed = wx.getStorageSync("isCompressed");
        if (isCompressed == true) {
            this.setData({
                isCompressed: 1
            })
        }
        this.uploadrecord();

        console.log(this.data.list.length);
        //this.record();
    },
    del_data: function() {
        var that = this;
        wx.showModal({
            title: '警告',
            content: '清空记录后将不可恢复，确定？',
            success(res) {
                console.log(res);
                if (res.confirm) {
                    wx.removeStorage({
                        key: 'uploadrecord'
                    })
                    that.track()
                } else if (res.cancel) {}
            }
        })
    },
    changeCompress: function() {
        let isCompressed = wx.getStorageSync("isCompressed");
        if (isCompressed == true) {
            wx.getNetworkType({
                success: function(res) {
                    var networkType = res.networkType
                    if (networkType != 'wifi') {
                        wx.showToast({
                            title: "提醒：取消将消耗较多流量",
                            icon: "none",
                            duration: 2e3
                        })
                        wx.removeStorage({
                            key: 'isCompressed'
                        })
                    } else {
                        wx.removeStorage({
                            key: 'isCompressed'
                        })
                    }
                },
                fail: function(b) {
                    wx.removeStorage({
                        key: 'isCompressed'
                    })
                }
            })
        } else {
            wx.setStorage({
                key: "isCompressed",
                data: true
            })
        }
    },
    get_config_api_xiugai: function() {
        var that = this;
        if (app.globalData.config_base_list == null) {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '页面加载失败，请重新尝试！',
                confirmText: '重载',
                success: function() {
                    wx.reLaunch({
                        url: '/pages/index/index'
                    })
                }
            })
        } else {
            that.setData({
                config_base_list: app.globalData.config_base_list,
                is_load: !1,
                mode: app.globalData.mode,
                user_id: app.globalData.user_id
            });
            if (that.data.mode == 1 || that.data.mode == 3) {
                if (that.data.config_base_list.advertisements.chaping && that.data.config_base_list.user_information.vip != '1') {
                    if (interstitialAd) {
                        interstitialAd.show().catch((err) => {
                            console.error(err)
                        })
                    }
                }
            } else if (that.data.mode == 2) {
                if (that.data.config_base_list.advertisements.chaping) {
                    if (interstitialAd) {
                        interstitialAd.show().catch((err) => {
                            console.error(err)
                        })
                    }
                }
            }
        }
    },

    showModal_gg: function(id) {
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '由于此功能占资源极大，需观看一次完整视频广告，即可使用此功能。',
            confirmText: '观看视频',
            confirmColor: '#1AAD19',
            cancelText: '下次再说',
            success: function(t) {
                t.confirm && that.xiugai_initVideoAd(function() {
                    that.login(id)
                })
            }
        })
    },

    showModal: function(msg) {
        wx.hideLoading()
        wx.showModal({
            title: "温馨提示",
            content: msg,
            confirmText: "知道了",
            confirmColor: "#1AAD19",
            showCancel: false,
            success(confirmText) {
                if (confirmText.confirm) {
                    wx.navigateBack({})
                } else if (confirmText.cancel) {
                    wx.navigateBack({})
                }
            }
        });
    },
    //删除记录
    DEL: function(e) {
        var that = this;
        var arr = wx.getStorageSync("uploadrecord");
        var key = e.currentTarget.dataset.key;
        console.log(key)
        wx.showModal({
            title: '警告',
            content: '删除记录后将不可恢复，确定？',
            success(res) {
                console.log(res);
                if (res.confirm) {
                    arr.splice(key, 1);
                    wx.setStorageSync("uploadrecord", arr);
                    wx.showToast({
                        title: "删除成功",
                        duration: 1000
                    });
                    setTimeout(function() {
                        that.track();
                    }, 1000);
                } else if (res.cancel) {}
            }
        })
    },


    uploadrecord: function() {
        var that = this;
        that.setData({
            list: wx.getStorageSync("uploadrecord") || []
        })
        console.log(that.data.list)
    },
    //查询下载
    query_download: function(a) {
        var query_video_id = a.currentTarget.dataset.download.Video_id,
            video_key = a.currentTarget.dataset.key,
            video_look = a.currentTarget.dataset.look,
            video_arr = wx.getStorageSync("uploadrecord"),
            query_Type = a.currentTarget.dataset.download.Type,
            that = this;
        console.log(video_look)
        if (console.log(video_arr[video_key]['lock']), video_arr[video_key]['lock'] == 1 || !that.data.config_base_list.advertisements.videoAD_ID || (that.data.config_base_list.advertisements.chaping && that.data.config_base_list.user_information.vip == '1')) {
            wx.showLoading({
                title: '请求' + (video_look == 1 ? "查看" : "下载") + '中'
            });
            wx.request({
                url: app.globalData.video_api + '/tasks/' + query_video_id,
                method: "GET",
                success: function(e) {
                    console.log(e);
                    switch (e.data.code) {
                        case 200:
                            if (query_Type == 0) {
                                wx.hideLoading();
                                wx.showModal({
                                    title: "下载失败",
                                    content: video_look == 1 ? "MP3格式暂不支持查看,请前往下载即可。" : "由于提取声音保存格式为MP3格式，这将导致小程序里面无法下载MP3格式。\r\n请把链接复制前往浏览器进行下载。",
                                    confirmText: "复制链接",
                                    confirmColor: "#1AAD19",
                                    success: function(v) {
                                        v.confirm && wx.setClipboardData({
                                            data: app.globalData.video_api + '/download/' + e.data.result.download,
                                            success: function(t) {
                                                wx.showToast({
                                                    title: "复制成功"
                                                });
                                            }
                                        });
                                    }
                                })
                            } else {
                                if (video_look==1) {
                                    console.log("查看视频")
                                    wx.navigateTo({
                                        url: '../../../../../packageB/pages/preview-download/preview-download?type=' + query_Type + "&url=" + e.data.result.download,
                                        success: function() {
                                            wx.hideLoading()
                                        },
                                        fail: function() {
                                            wx.hideLoading()
                                            console.log("跳转失败")
                                        }
                                    })
                                } else {
                                    that.download_video(e.data.result.download);
                                }
                                console.log(e.data.result.download)
                            }
                            break;
                        case 403:
                            wx.hideLoading()
                            wx.showModal({
                                title: "温馨提示",
                                content: e.data.msg,
                                confirmText: "知道了",
                                confirmColor: "#1AAD19",
                                showCancel: false,
                                complete: function(e) {
                                    console.log(e);
                                }
                            });
                            break;
                        case 404:
                            wx.hideLoading()
                            wx.showModal({
                                title: "温馨提示",
                                content: '当前下载的视频已过期，请重新上传视频文件进行下载。',
                                confirmText: "知道了",
                                confirmColor: "#1AAD19",
                                showCancel: false,
                                complete: function(e) {
                                    console.log(e);
                                }
                            });
                            break;
                        default:
                            wx.hideLoading()
                            wx.showModal({
                                title: "温馨提示",
                                content: e.data.msg,
                                confirmText: "知道了",
                                confirmColor: "#1AAD19",
                                showCancel: false,
                                complete: function(e) {
                                    console.log(e);
                                }
                            });
                            break;
                    }
                    console.log(e);
                },
                fail: function(c) {
                    wx.hideLoading()
                    console.log(c);

                }
            })
        } else {
            console.log("未看广告")
            wx.showModal({
                title: '温馨提示',
                content: '由于视频剪辑功能占资源极大，需观看一次完整视频广告，即可下载此条视频。',
                confirmText: '观看视频',
                confirmColor: '#1AAD19',
                cancelText: '下次再说',
                success: function(t) {
                    t.confirm && that.xiugai_initVideoAd(function() {
                        video_arr[video_key]['lock'] = 1;
                        wx.setStorageSync("uploadrecord", video_arr);
                        that.track();
                        that.query_download(a);
                    });
                }
            })
        }
    },
    //处理下载
    download_video: function(url) {
        var that = this;
        wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
                that.setData({
                    modalName: "downloadProcessModal"
                })
                console.log(url)
                wx.downloadFile({
                    url: app.globalData.video_api + '/download/' + url,
                    success: function(t) {
                        200 === t.statusCode && wx.saveVideoToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function(t) {
                                wx.hideLoading()
                                wx.showToast({
                                    title: "已保存到相册",
                                    icon: "none",
                                    duration: 1500
                                });
                            },
                            fail: function(e) {
                                wx.hideLoading()
                                wx.showModal({
                                    title: "下载失败",
                                    content: '出现此问题一般原因为：\r\n1.微信限制下载允许最大视频为100MB；\r\n2.网络请求超时，请复制视频链接，安卓手机用QQ浏览器下载，苹果手机用Documents进行下载。\r\n如有疑问请联系客服。',
                                    confirmText: "复制链接",
                                    confirmColor: "#1AAD19",
                                    success: function(e) {
                                        e.confirm && wx.setClipboardData({
                                            data: app.globalData.video_api + '/download/' + url,
                                            success: function(t) {
                                                wx.showToast({
                                                    title: "复制成功"
                                                });
                                            }
                                        });
                                    }
                                }), console.log(e.errMsg);
                            }
                        });
                    },
                    fail(m) {
                        wx.hideLoading()
                        wx.showModal({
                            title: "温馨提示",
                            content: m.errMsg + '\r\n有问题请联系客服。',
                            confirmText: "知道了",
                            confirmColor: "#1AAD19",
                            showCancel: false,
                            complete: function(e) {
                                console.log(e);
                            }
                        });
                        console.log(m.errMsg);
                    }
                }).onProgressUpdate(function(t) {
                    100 === t.progress ? (that.hideModal(), that.setData({
                        downloadProcess: 0
                    })) : that.setData({
                        downloadProcess: t.progress
                    });

                    // 100 === t.progress ? (wx.hideLoading()) : wx.showLoading({
                    //   title: '下载进度:' + t.progress + "%"
                    // });
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "保存到相册需要您的授权，请允许授权保存到相册权限。",
                    success: function(e) {
                        e.confirm && wx.openSetting({
                            success: function(e) {}
                        });
                    }
                })
            }
        })
    },
    //调用视频
    xiugai_initVideoAd: function(e) {
        var that = this;
        this.openVideoAd(function() {
            cache.set('video_xiugai', "true", 0)
            wx.showToast({
                title: "解锁成功！"
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
                content: "您目前暂无广告可看",
                showCancel: !1,
                success: function(o) {
                    o.confirm && e();
                }
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(e) {
        var that = this;
        var i = e.target.dataset.content;
        console.log(e);
        // if ("button" === e.from) {
        //   var i = e.target.dataset.content;
        //   if (that.data.config_base_list.parameter.is_display) {
        //     var quantity = cache.get('ID_' + i.id);
        //     console.log("第一1", quantity);
        //     //cache.set('ID_' + id, "true", 86400)
        //     if (!(quantity === "" && quantity == null && quantity == '0') && !isNaN(quantity)) { //是整数
        //       wx.showModal({
        //         title: '温馨提示',
        //         content: '查看',
        //         confirmText: '观看视频',
        //         confirmColor: '#1AAD19',
        //         cancelText: '下次再说',
        //         success: function (t) {
        //           if (t.confirm ){
        //             return {
        //               title: i.name,
        //               imageUrl: i.img,
        //               path: '/pages/jiaocheng/jiaocheng',
        //             }
        //           }

        //         }
        //       })
        //       console.log('1');
        //     } else {
        //       cache.set('ID_' + i.id, "1", '');
        //       console.log('第一次：写入成功1次', i.id);
        //       return {
        //         title: i.name,
        //         imageUrl: i.img,
        //         path: '/pages/jiaocheng/jiaocheng',
        //       }
        //       //cache.set('ID_' + id, "true", '0')
        //     }
        //   } 
        //   } 
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