var app = getApp(),
    func = require('../../utils/func.js'),
    cache = require('../../utils/cache.js'),
    i = null,
    isqsy = true,
    isdownload = true;
Component({
    /*pageLifetimes: {
      show: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
          selected: 1
        });
      }
    },
    properties: {},*/
    data: {
        types: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
        opened: !1,
        //首页链接提交框
        pageUrl: null,
        //获取成功后的视频信息
        videoInfo: null,
        //选择画质下载
        video_quality: null,
        //画质选择
        pindex: 0,
        //剪贴板链接
        tempClipboardData: null,
        //提交解析loding
        isAnalyseLoading: !1,
        //下载进度
        downloadProcess: 0,
        //每个配置内容
        config_base_list: [],
        //全局配置内容
        config_data_list: {
            "Api": "https://api.85xn.cn/api/test.php",
            "Down_Api": "https://down.qsy.ink/down?url="
        },
        //解析记录查询
        history: null,
        //轮播图
        showtype: 0,
        //图片TAB
        cover_tab: 0,
        photoCurrent: 0,
        photoList: null,
        tabbarBtnTxt: ["保存当前图片到相册", "保存选中图片到相册"],
        //首页加载
        isloading: !1,
        scrollTop: 0,
        modalName: 0,
        timer: '弹窗', //定时器名字
        countDownNum: '10', ///倒计时
        mode: 0
    },
    methods: {
        onLoad: function (options) {
            var that = this;


            if (options.history) {
                that.setData({
                    pageUrl: options.history,
                    history: options.history
                }), that.qsy();
            } else {
                // that.checking_link();
            }
            that.get_config()
        },
        onShow: function () {
            if (this.data.history) {
                this.setData({
                    history: null
                })
            } else {
                // this.checking_link()
            }
        },
        countDown: function () {
            console.log('倒计时开始')
            let that = this;
            let countDownNum = that.data.countDownNum; //获取倒计时初始值
            var t = new Date().toLocaleDateString();
            //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
            that.data.timer = setInterval(function () { //这里把setInterval赋值给变量名为timer的变量
                //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
                if (countDownNum == 0) {
                    wx.setStorage({
                        key: "showAddMeBtn",
                        data: t
                    })
                    that.setData({
                        showAddMeBtn: false
                    })
                    clearInterval(that.data.timer);
                    //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
                    //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
                    //clearInterval(that.data.timer);
                    //关闭定时器之后，可作其他处理codes go here
                } else {
                    //每隔一秒countDownNum就减一，实现同步
                    countDownNum--;
                    //然后把countDownNum存进data，好让用户知道时间在倒计着
                    that.setData({
                        countDownNum: countDownNum
                    })
                    if (countDownNum == 0) {
                        wx.setStorage({
                            key: "showAddMeBtn",
                            data: t
                        })
                        that.setData({
                            showAddMeBtn: false
                        })
                    }
                    console.log('倒计时' + that.data.countDownNum)
                }
            }, 1000)
        },
        showAddMeBtn: function () {
            let showAddMeBtn_data = wx.getStorageSync("showAddMeBtn");
            let window = wx.getStorageSync("Close_the_window");
            var curtime = new Date().toLocaleDateString();
            if (window == '1') {
                this.setData({
                    showAddMeBtn: false
                })
            } else {
                if (showAddMeBtn_data == curtime) {
                    this.setData({
                        showAddMeBtn: false
                    })
                } else {
                    this.setData({
                        showAddMeBtn: true
                    })
                    this.countDown()
                }
            }
        },
        get_config: function () {
            var that = this,
                config = app.globalData.config_base_list;
            if (config) {
                if (app.globalData.mode == 1) {
                    that.setData({
                        mode: app.globalData.mode,
                        vip: config.user_information.vip,
                        maturity: config.user_information.maturity
                    });
                } else if (app.globalData.mode == 2) {
                    that.setData({
                        mode: app.globalData.mode,
                        maturity: config.user_information.frequency
                    });
                } else if (app.globalData.mode == 3) {
                    that.setData({
                        mode: app.globalData.mode,
                        vip: config.user_information.vip,
                        maturity: config.user_information.maturity,
                        Account: config.user_information.Account,
                        unit: config.user_information.unit,
                    });
                } else {
                    that.setData({
                        mode: app.globalData.mode
                    });
                }
                that.setData({
                    config_base_list: config,
                    user_id: app.globalData.user_id
                });
            } else {
                console.log("加载失败")
            }
        },
        //远程加载小程序配置
        get_config_api: function () {
            var that = this;
            that.setData({
                isloading: !0
                //1是显示，0不显示
            })
            wx.login({
                success: function (res) {
                    wx.request({
                        url: that.data.invite ? (app.globalData.tonyon + "/api/WeChat/user/api/invite.php") : (app.globalData.tonyon + "/api/WeChat/user/user_api.php"),
                        method: "POST",
                        data: {
                            code: res.code,
                            appid: app.globalData.appid,
                            page: 'index',
                            inviter_id: that.data.invite ? that.data.inviter_id : ''
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        success: function (a) {
                            console.log(a)
                            if (that.data.invite) {
                                if (a.data.code == 0 || a.data.code == "-1") {
                                    that.setData({
                                        invite: !1
                                    })
                                    that.get_config_api();
                                    return;
                                }
                            }
                            if (a.data.mode == 1) {
                                that.setData({
                                    mode: a.data.mode,
                                    vip: a.data.data.user_information.vip,
                                    maturity: a.data.data.user_information.maturity
                                });
                            } else if (a.data.mode == 2) {
                                that.setData({
                                    mode: a.data.mode,
                                    maturity: a.data.data.user_information.frequency
                                });
                            } else if (a.data.mode == 3) {
                                that.setData({
                                    mode: a.data.mode,
                                    vip: a.data.data.user_information.vip,
                                    maturity: a.data.data.user_information.maturity,
                                    Account: a.data.data.user_information.Account,
                                    unit: a.data.data.user_information.unit,
                                });
                            } else {
                                that.setData({
                                    mode: a.data.mode
                                });
                            }
                            that.setData({
                                config_base_list: a.data.data,
                                user_id: a.data.user,
                                isloading: !1,
                                receive: a.data.login_times,
                                show_name: a.data.data.app_name
                            });
                            wx.setNavigationBarTitle({
                                title: a.data.data.app_name
                            })



                            app.globalData.config_base_list = a.data.data;
                            app.globalData.user_id = a.data.user;
                            app.globalData.pinduoduo = a.data.pinduoduo;
                            app.globalData.pinduoduo_client_id = a.data.pinduoduo_client_id;
                            app.globalData.pinduoduo_client_secret = a.data.pinduoduo_client_secret;
                            app.globalData.pinduoduo_pid = a.data.pinduoduo_pid;
                            app.globalData.mode = a.data.mode; //模式
                        },
                        fail: function () {
                            wx.showModal({
                                title: '提示',
                                showCancel: false,
                                content: '网络请求超时',
                                confirmText: '重载',
                                success: function () {
                                    wx.reLaunch({
                                        url: '/pages/index/index'
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
                                url: '/pages/index/index'
                            })
                        }
                    })
                }

            })
        },
        //首页input输入框内容
        pageUrlInput: function (t) {
            var that = this;
            this.setData({
                pageUrl: t.detail.value,
                isAnalyseLoading: !1,
                videoInfo: null,
                photoList: null,
                video_quality: null
            });
            // wx.getClipboardData({
            //     success: function(o) {
            //         var a = that.fetchUrl(o.data);
            //         that.isUrl(a) ? that.setData({
            //             pageUrl: a,
            //             isAnalyseLoading: !1,
            //             videoInfo: null,
            //             photoList: null,
            //             video_quality: null
            //         }) : wx.showToast({
            //             title: "输入的不是链接，请重新输入！",
            //             icon: "none",
            //             duration: 1500
            //         });
            //     },
            //     fail: function() {
            //         console.log("获取剪贴板失败");
            //     }
            // });
        },
        xiafa_SubscribeMessage: function () {
            console.log("下发")
            var that = this,
                xiafas = 0;
            let xiafa = wx.getStorageSync("xiafa" + cache.getDateStr(0));
            wx.removeStorageSync("xiafa" + cache.getDateStr(-1))
            if (that.data.config_base_list.xiafa_SubscribeMessage == 1) {
                if (xiafa) {
                    console.log(xiafa)
                    that.qsy(xiafas)
                } else {
                    wx.showModal({
                        title: '温馨提示',
                        content: '作者邀请您来订阅“新功能开放通知”,有好玩的功能会通知你哦。(记得勾选不再询问)',
                        cancelText: "继续解析",
                        confirmColor: '#1AAD19',
                        confirmText: "我要订阅",
                        success(ress) {
                            if (ress.confirm) {
                                wx.setStorage({
                                    key: "xiafa" + cache.getDateStr(0),
                                    data: 1
                                })
                                let tmpIds = that.data.config_base_list.Other_switches.Template_jiexi;
                                wx.requestSubscribeMessage({
                                    tmplIds: tmpIds,
                                    success(res) {
                                        let tmpId = tmpIds[0];
                                        console.log("返回", res)
                                        if (res[tmpId] == "reject") {
                                            xiafa = 0
                                            wx.showModal({
                                                title: '温馨提示',
                                                content: '作者邀请您来订阅“新功能开放通知”,有好玩的功能会通知你哦。(记得勾选不再询问)',
                                                cancelText: "继续解析",
                                                confirmColor: '#1AAD19',
                                                confirmText: "前往修改",
                                                success(ress) {
                                                    ress.confirm && wx.openSetting({
                                                        withSubscriptions: true,
                                                        success: function (e) { }
                                                    })
                                                    ress.cancel && that.qsy(xiafas)
                                                }
                                            })
                                        } else if (res[tmpId] == "accept") {
                                            xiafas = 1
                                            that.qsy(xiafas)
                                        } else if (res[tmpId] == "ban") {
                                            wx.showModal({
                                                title: '温馨提示',
                                                content: '作者邀请您来订阅“新功能开放通知”,有好玩的功能会通知你哦。(记得勾选不再询问)',
                                                cancelText: "继续解析",
                                                confirmColor: '#1AAD19',
                                                confirmText: "前往修改",
                                                success(ress) {
                                                    ress.confirm && wx.openSetting({
                                                        success: function (e) { }
                                                    })
                                                    ress.cancel && that.qsy(xiafas)
                                                }
                                            })
                                        } else {
                                            xiafas = 0
                                            that.qsy(xiafas)
                                        }

                                    },
                                    fail(eee) {
                                        console.log(eee)
                                        wx.showModal({
                                            title: '温馨提示',
                                            content: '作者邀请您来订阅“新功能开放通知”,有好玩的功能会通知你哦。(记得勾选不再询问)',
                                            cancelText: "继续解析",
                                            confirmColor: '#1AAD19',
                                            confirmText: "前往修改",
                                            success(ress) {
                                                ress.confirm && wx.openSetting({
                                                    success: function (e) { }
                                                })
                                                ress.cancel && that.qsy(xiafas)
                                            }
                                        })
                                    }
                                })
                            } else {
                                that.qsy(xiafas)
                            }
                        }
                    })
                }
            } else {
                that.qsy(xiafas)
            }
        },
        //去水印按钮点击事件
        qsy: function (o) {
            var that = this,
                Url = that.fetchUrl(that.data.pageUrl),
                xiafas = o;
            console.log(Url)
            // Url = that.data.pageUrl;
            if (!Url) return that.setData({
                modalName: "MessageModal",
                message: "请您先输入视频分享链接",
                isAnalyseLoading: !1
            });
            if (!that.isUrl(Url) && (Url = that.fetchUrl(Url), !that.isUrl(Url))) return that.setData({
                modalName: "MessageModal",
                message: "链接格式不正确,请以http或https开头",
                isAnalyseLoading: !1
            });
            if (isqsy) {
                isqsy = false;
                //下面添加需要执行的事件
                that.setData({
                    isAnalyseLoading: !0,
                    videoInfo: null,
                    photoList: null,
                    video_quality: null,
                    pageUrl: Url
                });

                try {
                    wx.login({
                        success: function (res) {
                            console.log("获取到解析次数CODE：", res.code)
                            wx.request({
                                url: that.data.mode != 2 && that.data.config_base_list.Api ? that.data.config_base_list.Api : that.data.mode == 2 ? (app.globalData.tonyon + "/api/WeChat/user/num_api.php") : app.globalData.jiexi_api,
                                method: "POST",
                                data: {
                                    url: Url,
                                    code: res.code,
                                    appid: app.globalData.appid,
                                    subscription: xiafas
                                },
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: function (e) {
                                    that.setData({
                                        isAnalyseLoading: !1
                                    });
                                    isqsy = true;
                                    if (e.data.code == 200) {
                                        wx.showToast({
                                            title: that.data.config_base_list.analysis_text,
                                            icon: "none",
                                            duration: 1500
                                        });
                                        wx.getStorage({
                                            key: 'down_count',
                                            success(res) {
                                                cache.set('down_count', res.data + 1)
                                            }
                                        });
                                        that.setData({
                                            videoInfo: e.data.data,
                                            video_quality: e.data.data.quality ? e.data.data.quality : null,
                                            photoList: e.data.data.atlas ? e.data.data.atlas : null,
                                            showtype: e.data.data.url || e.data.data.quality ? 0 : 1
                                        });
                                        that.initNote();
                                    } else {
                                        isqsy = true;
                                        that.setData({
                                            modalName: "MessageModal",
                                            message: e.data.msg
                                        });
                                    }
                                },
                                fail: function () {
                                    that.setData({
                                        isAnalyseLoading: !1
                                    });
                                    wx.showModal({
                                        title: '提示',
                                        content: '网络请求超时，请点重试！',
                                        confirmText: '重试',
                                        success(res) {
                                            if (res.confirm) {
                                                isqsy = true;
                                                that.qsy();
                                            } else if (res.cancel) {
                                                isqsy = true;
                                                console.log('用户点击取消')
                                            }
                                        }
                                    })
                                },
                            });
                        },
                        fail: function () {
                            that.setData({
                                isAnalyseLoading: !1
                            });
                            wx.showModal({
                                title: '提示',
                                content: '网络请求超时，请点重试！',
                                confirmText: '重试',
                                success(res) {
                                    if (res.confirm) {
                                        isqsy = true;
                                        that.qsy();
                                    } else if (res.cancel) {
                                        isqsy = true;
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        }
                    })

                } catch (t) {
                    that.setData({
                        isAnalyseLoading: !1
                    });
                    wx.showModal({
                        title: '提示',
                        content: '网络请求超时，请点重试！',
                        confirmText: '重试',
                        success(res) {
                            if (res.confirm) {
                                isqsy = true;
                                that.qsy();
                            } else if (res.cancel) {
                                isqsy = true;
                                console.log('用户点击取消')
                            }
                        }
                    });
                }
                //定时器
                // setTimeout(function() {
                //     isqsy = true;
                // }, 5000);
            } else {
                that.setData({
                    modalName: "MessageModal",
                    message: "你操作的太快了，请稍后休息再试！",
                    isAnalyseLoading: !1
                })
            }
        },
        Download: function (e) {
            var that = this;
            if (isdownload) {
                isdownload = false;
                //下面添加需要执行的事件
                var items = that.data.config_base_list.api_downloads,
                    down_api = items[Math.floor(Math.random() * items.length)],
                    apiDownloads = that.data.config_base_list.apiDownloads,
                    apiDownloadsPic = that.data.config_base_list.apiDownloadsPic,
                    type = e.currentTarget.dataset.type,
                    line = e.currentTarget.dataset.line,
                    link = e.currentTarget.dataset.link;
                if (that.data.config_base_list.advertisements.videoAD_ID) {
                    if (that.AdvertisementAppear(true) == true || that.data.vip == '1') {
                        if (type == 'video') {
                            if (line == '0') {
                                that.download_video(down_api + func.base64encode(link));
                            } else {
                                that.download_video(link);
                            }
                        } else if (type == 'image') {
                            if (line == '0') {
                                that.download_image(that.downloadPicUrl(that.data.videoInfo.cover, apiDownloads, apiDownloadsPic));
                            } else if (line == '1') {
                                for (var o = that.data.videoInfo.atlas, i = 0; i < o.length; i++) {
                                    that.download_image(that.downloadPicUrl(o[i], apiDownloads, apiDownloadsPic));
                                }
                            } else if (line == '2') {
                                for (var t = 0, a = 0, o = this.data.photoList, i = 0; i < o.length; i++) 1 == o[i].status && a++;
                                if (a < 1) {
                                    wx.showToast({
                                        title: '请先选择要保存的图片！',
                                        icon: 'none',
                                        duration: 2000
                                    })
                                } else {
                                    for (var s = 0; s < o.length; s++) 1 == o[s].status && (t++, this.download_image(that.downloadPicUrl(o[s].img_url, apiDownloads, apiDownloadsPic)));
                                }
                            }
                        }

                    } else {
                        wx.showModal({
                            title: '温馨提示',
                            content: '观看一次完整视频，解锁24小时完全使用\r\n提示：只要看完广告，即可无限制使用（全天24小时内）免费工具。\r\n运营成本太高，谢谢您的 谅解~',
                            confirmText: '观看视频',
                            confirmColor: '#1AAD19',
                            cancelText: '下次再说',
                            success: function (t) {
                                t.confirm && that.initVideoAd(function () {
                                    that.download_gg(type, line, link);
                                });
                            }
                        })
                    }
                } else {
                    if (type == 'video') {
                        if (line == '0') {
                            that.download_video(down_api + func.base64encode(link));
                        } else {
                            that.download_video(link);
                        }
                    } else if (type == 'image') {
                        if (line == '0') {
                            that.download_image(that.downloadPicUrl(that.data.videoInfo.cover, apiDownloads, apiDownloadsPic));
                        } else if (line == '1') {
                            for (var o = that.data.videoInfo.atlas, i = 0; i < o.length; i++) {
                                that.download_image(that.downloadPicUrl(o[i], apiDownloads, apiDownloadsPic));
                            }
                        } else if (line == '2') {
                            for (var t = 0, a = 0, o = this.data.photoList, i = 0; i < o.length; i++) 1 == o[i].status && a++;
                            if (a < 1) {
                                wx.showToast({
                                    title: '请先选择要保存的图片！',
                                    icon: 'none',
                                    duration: 2000
                                })
                            } else {
                                for (var s = 0; s < o.length; s++) 1 == o[s].status && (t++, this.download_image(that.downloadPicUrl(o[s].img_url, apiDownloads, apiDownloadsPic)));
                            }
                        }
                    }
                }
                //定时器
                setTimeout(function () {
                    isdownload = true;
                }, 5000);
            } else {
                that.setData({
                    modalName: "MessageModal",
                    message: "你操作的太快了，请稍后休息再试！",
                    isAnalyseLoading: !1
                })
            }
        },
        download_gg: function (type, line, link) {
            var that = this,
                apiDownloads = that.data.config_base_list.apiDownloads,
                apiDownloadsPic = that.data.config_base_list.apiDownloadsPic,
                items = that.data.config_base_list.api_downloads,
                down_api = items[Math.floor(Math.random() * items.length)];
            if (type == 'video') {
                if (line == '0') {
                    that.download_video(down_api + func.base64encode(link));
                } else {
                    that.download_video(link);
                }
            } else if (type == 'image') {
                if (line == '0') {
                    that.download_image(that.downloadPicUrl(that.data.videoInfo.cover, apiDownloads, apiDownloadsPic));
                } else if (line == '1') {
                    for (var o = that.data.videoInfo.atlas, i = 0; i < o.length; i++) {
                        that.download_image(that.downloadPicUrl(o[i], apiDownloads, apiDownloadsPic));
                    }
                } else if (line == '2') {
                    for (var t = 0, a = 0, o = that.data.photoList, i = 0; i < o.length; i++) 1 == o[i].status && a++;
                    if (a < 1) {
                        wx.showToast({
                            title: '请先选择要保存的图片！',
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        for (var s = 0; s < o.length; s++) 1 == o[s].status && (t++, this.download_image(that.downloadPicUrl(o[s].img_url, apiDownloads, apiDownloadsPic)));
                    }
                }
            }
        },
        downloadPicUrl: function (picUrl, apiDownloads, apiDownloadsPic) {
            if (!apiDownloads || !apiDownloadsPic) {
                return picUrl;
            }
            console.log("图片")
            for (var i = 0; i < apiDownloadsPic.length; i++) {
                console.log("支持图片链接", apiDownloadsPic[i])
                if (picUrl.indexOf(apiDownloadsPic[i]) != -1) {
                    return picUrl;
                }
            }
            return apiDownloads[Math.floor(Math.random() * apiDownloads.length)] + "/Download/download.jpg?url=" + func.base64encode(picUrl);
        },
        download_video: function (link) {
            var that = this;
            wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                    that.history();
                    that.setData({
                        modalName: "downloadProcessModal"
                    });
                    console.log("下载链接:", link);
                    const DownloadTask = wx.downloadFile({
                        url: link,
                        success: function (t) {
                            console.log(t)
                            if (t.statusCode == 200) {
                                wx.saveVideoToPhotosAlbum({
                                    filePath: t.tempFilePath,
                                    success: function (t) {
                                        wx.showToast({
                                            title: "已保存到相册\n" + that.data.config_base_list.save_text,
                                            icon: "none",
                                            duration: 1500
                                        });
                                        cache.Download_Video_frequency()
                                    },
                                    fail: function (e) {
                                        wx.showModal({
                                            title: "下载失败",
                                            content: that.data.config_base_list.downloadErrorMsg,
                                            confirmText: "复制链接",
                                            confirmColor: "#1AAD19",
                                            success: function (e) {
                                                e.confirm && wx.setClipboardData({
                                                    data: that.data.videoInfo.url ? that.data.videoInfo.url : link,
                                                    success: function (t) {
                                                        wx.showToast({
                                                            title: "复制成功"
                                                        });
                                                    }
                                                });
                                            }
                                        }), console.log(e.errMsg);
                                    }
                                });
                            } else {
                                wx.showModal({
                                    title: "下载失败",
                                    content: that.data.config_base_list.downloadErrorMsg,
                                    confirmText: "复制链接",
                                    confirmColor: "#1AAD19",
                                    success: function (e) {
                                        e.confirm && wx.setClipboardData({
                                            data: that.data.videoInfo.url ? that.data.videoInfo.url : link,
                                            success: function (t) {
                                                wx.showToast({
                                                    title: "复制成功"
                                                });
                                            }
                                        });
                                    }
                                }), console.log(e.errMsg);
                            }


                        },
                        fail(err) {
                            console.log("错误信息", err)
                        }
                    });
                    DownloadTask.onProgressUpdate(function (t) {
                        // console.log("进度:",t)
                        if (t.progress == 100) {
                            that.hideModal();
                            that.setData({
                                downloadProcess: 0
                            });
                        } else {
                            that.setData({
                                downloadProcess: t.progress
                            });
                        }
                    });
                },
                fail: function () {
                    wx.showModal({
                        title: "提示",
                        content: "保存到相册需要您的授权，请允许授权保存到相册权限。",
                        success: function (e) {
                            e.confirm && wx.openSetting({
                                success: function (e) { }
                            });
                        }
                    })
                }
            })
        },
        //下载图片内容
        download_image: function (link) {
            var that = this;
            wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                    that.setData({
                        modalName: "downloadProcessModal"
                    });
                    const DownloadTask = wx.downloadFile({
                        url: link,
                        success: function (t) {
                            console.log(t)
                            wx.saveImageToPhotosAlbum({
                                filePath: t.tempFilePath,
                                success: function (t) {
                                    wx.showToast({
                                        title: "已保存到相册\n" + that.data.config_base_list.save_text,
                                        icon: "none",
                                        duration: 1500
                                    })
                                    cache.Download_Video_frequency()
                                },
                                fail: function (e) {
                                    wx.showModal({
                                        title: "下载失败",
                                        content: that.data.config_base_list.downloadErrorMsg,
                                        confirmText: "复制链接",
                                        confirmColor: "#1AAD19",
                                        success: function (e) {
                                            e.confirm && wx.setClipboardData({
                                                data: that.data.videoInfo.cover ? that.data.videoInfo.cover : link,
                                                success: function (t) {
                                                    wx.showToast({
                                                        title: "复制成功"
                                                    });
                                                }
                                            });
                                        }
                                    }), console.log(e.errMsg);
                                }
                            });
                        }
                    });

                    DownloadTask.onProgressUpdate(function (t) {
                        // console.log("进度:",t)
                        if (t.progress == 100) {
                            that.hideModal();
                            that.setData({
                                downloadProcess: 0
                            });
                        } else {
                            that.setData({
                                downloadProcess: t.progress
                            });
                        }
                    });
                },
                fail: function () {
                    wx.showModal({
                        title: "提示",
                        content: "保存到相册需要您的授权，请允许授权保存到相册权限。",
                        success: function (e) {
                            e.confirm && wx.openSetting({
                                success: function (e) { }
                            });
                        }
                    })
                }
            })
        },
        //储存解析记录
        history: function () {
            var notesExprs = function (expr) {
                //获取存储数据的数组
                var exprs = wx.getStorageSync("history") || []
                //向数组中添加新的元素
                exprs.unshift(expr)
                //将添加的元素存储到本地
                wx.setStorageSync("history", exprs)
            }

            var str = {
                "url": this.data.pageUrl,
                "video": this.data.videoInfo.url,
                "title": this.data.videoInfo.title,
                "cover": this.data.videoInfo.cover,
                "date": new Date().toLocaleDateString() + " " + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
            };
            var exprsss = wx.getStorageSync("history") || [];
            if (exprsss.length > 15) {
                var arr = wx.getStorageSync("history");
                arr.splice(14, 1);
                wx.setStorageSync("history", arr);
                notesExprs(str);
            } else {
                notesExprs(str);
            }
        },
        //复制视频详情内容
        Copy_video_info: function (t) {
            var that = this;
            var copy = t;
            if (that.data.config_base_list.advertisements.videoAD_ID) {
                if (that.AdvertisementAppear(true) == true || that.data.vip == '1') {
                    console.log("已观看，复制成功");
                    that.history();
                    wx.setClipboardData({
                        data: t.currentTarget.dataset.content,
                        success: function (a) {
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
                        success: function (t) {
                            t.confirm && that.initVideoAd(function () {
                                that.history();
                                wx.setClipboardData({
                                    data: copy.currentTarget.dataset.content,
                                    success: function (a) {
                                        wx.showToast({
                                            title: copy.currentTarget.dataset.tip,
                                            duration: 12000
                                        });
                                    }
                                });
                            });
                        }
                    })
                }
            } else {
                that.history();
                wx.setClipboardData({
                    data: t.currentTarget.dataset.content,
                    success: function (a) {
                        wx.showToast({
                            title: t.currentTarget.dataset.tip,
                            duration: 1200
                        });
                    }
                });
            }


        },
        //初始化检测事件解析按钮
        clipboard_qsy: function () {
            this.setData({
                modalName: null,
                pageUrl: this.data.tempClipboardData
            }), this.xiafa_SubscribeMessage();
        },
        //关闭弹窗
        hideModal: function (t) {
            this.setData({
                modalName: null
            });
        },
        //删除已解析内容
        clearInput: function () {
            this.setData({
                pageUrl: "",
                videoInfo: null,
                photoList: null,
                video_quality: null,
                isAnalyseLoading: !1
            });
        },
        //检查输入框是否为链接
        isUrl: function (t) {
            return !!t && (t.startsWith("http://") || t.startsWith("https://"));
        },
        //过滤字符串中的URL
        fetchUrl: function (t) {
            var o = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#!\$\(\)\\|]*[\w\-\@?^=%&\/~\+#!\$\(\)\\|])?/,
                a = t.match(o);
            return a ? a[0] : null;
        },
        //初始化检测事件
        checking_link: function () {
            var t = this;
            wx.getClipboardData({
                success: function (a) {
                    var e = t.fetchUrl(a.data)
                    if (t.isUrl(e)) {
                        t.setData({
                            tempClipboardData: e,
                            modalName: "clipboardUrlDetected",
                            clipboardUrl: e
                        });
                    }
                }
            });
        },
        //轮播图
        changeShowtype: function (t) {
            var n = t.currentTarget.dataset.type;
            console.log(n);
            if (n == 0) {
                var d = 0;
            } else if (n == 1) {
                var d = 1;
            } else if (n == 2) {
                var d = 2;
            } else {
                var d = 0;
            }
            this.setData({
                showtype: d
            });
        },
        //图片TAB
        change_cover_tab: function (t) {
            var n = t.currentTarget.dataset.type;
            console.log(n);
            if (n == 0) {
                var d = 0;
            } else if (n == 1) {
                var d = 1;
            } else if (n == 2) {
                var d = 2;
            } else {
                var d = 0;
            }
            this.setData({
                cover_tab: d
            });
        },
        onAdplay(e) {
            console.log('onAdplay', e)
        },
        onAdload(e) {
            console.log('onAdload', e)
        },
        onAdclose(e) {
            console.log('onAdclose', e)
        },
        onAdError(e) {
            console.log('onAdError', e)
        },
        //复制QQ群号
        qqquncopy: function () {
            var a = this.data.config_base_list.contact.Analytic_display2;
            wx.setClipboardData({
                data: a,
                success: function (t) {
                    wx.showToast({
                        title: "复制成功",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        },
        //打开视频修改页面
        video_xiugai: function () {
            wx.switchTab({
                url: '/pages/xiugai/xiugai',
            })
        },
        //复制标题内容
        title_copy: function () {
            var a = this.data.videoInfo.title;
            wx.setClipboardData({
                data: a,
                success: function (t) {
                    wx.showToast({
                        title: "标题复制成功",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        },
        choosePhoto: function (t) {
            var a = t.currentTarget.dataset.index,
                e = this.data.photoList,
                o = e[a].status;
            e[a].status = !o, this.setData({
                photoList: e
            });
        },
        changePhoto: function (t) {
            var a = t.detail.current;
            this.setData({
                photoCurrent: a
            });
        },
        initNote: function () {
            var i = this.data.photoList,
                s = new Array();
            if (i && i.length > 0) {
                for (var n = 0; n < i.length; n++) s[n] = {
                    img_url: i[n],
                    status: 0
                };
            }
            this.setData({
                photoList: s
            })
        },
        bindPickerChange: function (e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                pindex: e.detail.value
            })
        },
        initVideoAd: function (e) {
            var that = this;
            this.openVideoAd(function () {
                that.AdvertisementAppear()
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
        tipKeFuMsg: function (t) {
            wx.playBackgroundAudio({
                dataUrl: "http://tts.baidu.com/text2audio?idx=1&tex=" + encodeURIComponent(this.data.config_base_list.home_notice) + "&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5"
            });
        },
        onPageScroll: function (t) {
            var that = this;
            t.scrollTop <= 0 ? t.scrollTop = 0 : t.scrollTop > wx.getSystemInfoSync().windowHeight && (t.scrollTop = wx.getSystemInfoSync().windowHeight),
                t.scrollTop > that.data.scrollTop || t.scrollTop >= that.data.scrollHeight, console.log(t.scrollTop)
            setTimeout(function () {
                that.setData({
                    scrollTop: t.scrollTop
                    //   modalName: t.scrollTop > 0 ? t.scrollTop : that.checking_link()
                });
            }, 0);
        },
        // onClose1: function(t) {
        //   this.setData({
        //     scrollTop: 0
        //   });
        // },
        // _eventbackToTop: function() {
        //   wx.pageScrollTo({
        //     scrollTop: 0,
        //     duration: 300
        //   });
        // },
        goxiugai: function () {
            wx.switchTab({
                url: "/pages/index/index"
            });
        },
        goquestion: function () {
            wx.navigateTo({
                url: "/pages/question/question"
            });
        },
        qiandao: function () {
            wx.navigateTo({
                url: "/pages/mine/qiandao/qiandao"
            });
        },
        previewImage: function (e) {
            let that = this;
            let src = that.data.config_base_list.contact.appreciate_img;
            wx.previewImage({
                current: src,
                urls: [src]
            })
        },
        AdvertisementAppear: function (v) {
            var that = this,
                jurisdiction = app.globalData.config_base_list.advertisements.videoAD_appear;
            console.log(jurisdiction)
            if (v == true) { //查
                if (jurisdiction == 0) {
                    //当天
                    console.log("当天")
                    let Appear = wx.getStorageSync("Appear" + cache.getDateStr(0));
                    wx.removeStorageSync("Appear" + cache.getDateStr(-1))
                    if (Appear) {
                        console.log("当天2")
                        return true;
                    } else {
                        console.log("当天3")
                        return false;
                    }
                } else if (jurisdiction == 1) {
                    //24小时
                    console.log("24小时")
                    var timestamp = Date.parse(new Date()) / 1000;
                    if (cache.get('Home_VideoAD') && cache.get('Home_VideoAD_deadtime') > timestamp) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    //24小时
                    var timestamp = Date.parse(new Date()) / 1000;
                    if (cache.get('Home_VideoAD') && cache.get('Home_VideoAD_deadtime') > timestamp) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else { //设置
                if (jurisdiction == 0) {
                    //当天
                    console.log("当天1")
                    wx.setStorage({
                        key: "Appear" + cache.getDateStr(0),
                        data: 1
                    })
                } else if (jurisdiction == 1) {
                    //24小时
                    console.log("24小时1")
                    cache.set('Home_VideoAD', "true", 86400)
                } else {
                    cache.set('Home_VideoAD', "true", 86400)
                }
            }

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

});