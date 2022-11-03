var app = getApp(),
    i = null,
    cache = require('../../utils/cache.js'),
    func = require('../../utils/func.js'),
    e = !0;

Component({
    properties: {},
    data: {
        config_data_list: {},
        data: [],
        list: [],
        play: 0,
        collect: 0,
        cursor: 0,
        has_more: !1,
        halfScreenShow: !1,
        videoInfo: [],
        downloadProcess: 0,
        isdata: !1,
        statusBarHeight: app.globalData.statusBarHeight,
        pageUrl: "",
        mix_id: ""
    },
    methods: {
        onLoad: function(t) {
            this.checking_link();
        },
        onShow: function() {
            this.setData({
                config_base_list: app.globalData.config_base_list,
                mode: app.globalData.mode
            });
        },
        onReachBottom: function() {
            this.data.has_more && this.getDataAdd();
        },
        detail: function() {
            var that = this,
                batch_url = that.data.pageUrl;
            return batch_url ? that.isUrl(batch_url) || (batch_url = that.fetchUrl(batch_url), that.isUrl(batch_url)) ? (wx.showLoading({
                    title: "获取中"
                }),
                wx.login({
                    success: function(code) {
                        wx.request({
                            url: app.globalData.tonyon + '/api/WeChat/user/batch_api.php',
                            method: "POST",
                            data: {
                                code: code.code,
                                appid: app.globalData.appid,
                                url: batch_url,
                                type:that.data.mode == 2 ? 2 : 1
                            },
                            header: {
                                'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                            },
                            success: function(res) {
                                var arr_url = res.data.data;
                                res.statusCode == 200 && res.data.code == 200 && arr_url.length > 0 ? (
                                    console.log(res),
                                    wx.hideLoading(), that.setData({
                                        isdata: !0,
                                        list: arr_url,
                                        bigFile: res.data.bigFile,
                                        has_more: ''
                                    })) : (wx.hideLoading(), that.setData({
                                    modalName: "MessageModal",
                                    message: res.data.msg
                                }))

                            }
                        })
                    },
                    fail: function() {
                        wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: '网络请求超时',
                            confirmText: '重载',
                            success: function() {
                                wx.reLaunch({
                                    url: '/pages/batch/batch'
                                })
                            }
                        })
                    }
                })) : wx.showToast({
                title: "请输入正确链接",
                icon: "none",
                duration: 1500
            }) : wx.showToast({
                title: "请您先输入需要批量解析的作品链接或主页链接分享链接",
                icon: "none",
                duration: 1500
            });
        },
        goplay: function(t) {
            console.log(t);
            var that = this,
                o = t.currentTarget.dataset.index;
            if ((o.playAddr).indexOf("aweme.snssdk.com") != -1) {
                wx.showLoading({
                    title: "获取中"
                }), wx.request({
                    url: app.globalData.tonyon + '/api/getplay.php',
                    method: "POST",
                    data: {
                        url: o.playAddr
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(res) {
                        o['playAddr'] = res.data
                        wx.hideLoading(), that.setData({
                            videoInfo: o,
                            halfScreenShow: !0
                        });
                    }
                })
            } else {
                this.setData({
                    videoInfo: o,
                    halfScreenShow: !0
                });
            }

        },
        DownloadAll: function() {
            var that = this;
            let Album = wx.getStorageSync("Album_authorization");
            if (Album != '1') {
                wx.showModal({
                    title: "温馨提示",
                    content: '请授权程序允许把视频保存相册权限,才能保存视频哦！',
                    confirmText: '允许授权',
                    confirmColor: '#1AAD19',
                    cancelText: '暂不授权',
                    success: function(a) {
                        if (a.confirm) {
                            wx.authorize({
                                scope: "scope.writePhotosAlbum",
                                success: function() {
                                    wx.setStorage({
                                        key: "Album_authorization",
                                        data: '1'
                                    })
                                    that.setData({
                                        modalName: "MessageModal",
                                        message: "授权成功，请重新点击下载即可！"
                                    })
                                },
                                fail: function() {
                                    that.setData({
                                        modalName: "MessageModal",
                                        message: "授权失败,原因：无法拉起小程序授权弹窗，请重新尝试"
                                    })
                                }
                            })
                        } else if (a.cancel) {
                            that.setData({
                                modalName: "MessageModal",
                                message: "你选择的是暂不授权，将无法保存视频哦！"
                            })
                        }

                    }
                })
                return;
            }
            var timestamp = Date.parse(new Date()) / 1000;
            if ((that.data.list[0].playAddr).indexOf("aweme.snssdk.com") != -1) {
                that.setData({
                    modalName: "MessageModal",
                    message: "抖音暂时不支持批量下载,请单个点开进行下载！"
                });
            } else {
                if (that.data.config_base_list.advertisements.videoAD_ID && that.data.mode == 1 || that.data.config_base_list.advertisements.videoAD_ID && that.data.mode == 3) {
                    if (cache.get('Home_VideoAD') && cache.get('Home_VideoAD_deadtime') > timestamp || that.data.config_base_list.user_information.vip == '1') {
                        for (var o = that.data.list, a = 0; a < o.length; a++)(that.download_video(that.data.list[a].playAddr), a == o.length ? wx.hideLoading() : wx.showLoading({
                            title: "下载中"
                        }));
                    } else {
                        wx.showModal({
                            title: '温馨提示',
                            content: '观看一次完整视频，解锁24小时完全使用\r\n提示：只要看完广告，即可无限制使用（全天24小时内）免费工具。\r\n运营成本太高，谢谢您的谅解~',
                            confirmText: '观看视频',
                            confirmColor: '#1AAD19',
                            cancelText: '下次再说',
                            success: function(t) {
                                t.confirm && that.initVideoAd(function() {
                                    for (var o = that.data.list, a = 0; a < o.length; a++)(that.download_video(that.data.list[a].playAddr), a == o.length ? wx.hideLoading() : wx.showLoading({
                                        title: "下载中"
                                    }));
                                });
                            }
                        })
                    }
                } else {
                    for (var o = that.data.list, a = 0; a < o.length; a++)(that.download_video(that.data.list[a].playAddr), a == o.length ? wx.hideLoading() : wx.showLoading({
                        title: "下载中"
                    }));
                }
            }
        },
        Download: function(t) {
            var that = this;
            let Album = wx.getStorageSync("Album_authorization");
            if (Album != '1') {
                wx.showModal({
                    title: "温馨提示",
                    content: '请授权程序允许把视频保存相册权限,才能保存视频哦！',
                    confirmText: '允许授权',
                    confirmColor: '#1AAD19',
                    cancelText: '暂不授权',
                    success: function(a) {
                        if (a.confirm) {
                            wx.authorize({
                                scope: "scope.writePhotosAlbum",
                                success: function() {
                                    wx.setStorage({
                                        key: "Album_authorization",
                                        data: '1'
                                    })
                                    that.setData({
                                        modalName: "MessageModal",
                                        message: "授权成功，请重新点击下载即可！"
                                    })
                                },
                                fail: function() {
                                    that.setData({
                                        modalName: "MessageModal",
                                        message: "授权失败,原因：无法拉起小程序授权弹窗，请重新尝试"
                                    })
                                }
                            })
                        } else if (a.cancel) {
                            that.setData({
                                modalName: "MessageModal",
                                message: "你选择的是暂不授权，将无法保存视频哦！"
                            })
                        }

                    }
                })
                return;
            }

            if (e) {
                e = !1;
                var n = (t.currentTarget.dataset.type, t.currentTarget.dataset.link);
                console.log(n)
                var timestamp = Date.parse(new Date()) / 1000;
                if (that.data.config_base_list.advertisements.videoAD_ID && that.data.mode == 1 || that.data.config_base_list.advertisements.videoAD_ID && that.data.mode == 3) {
                    if (cache.get('Home_VideoAD') && cache.get('Home_VideoAD_deadtime') > timestamp || that.data.config_base_list.user_information.vip == '1') {
                        that.download_video(n), setTimeout(function() {
                            e = !0;
                        }, 5e3)
                    } else {
                        wx.showModal({
                            title: '温馨提示',
                            content: '观看一次完整视频，解锁24小时完全使用\r\n提示：只要看完广告，即可无限制使用（全天24小时内）免费工具。\r\n运营成本太高，谢谢您的谅解~',
                            confirmText: '观看视频',
                            confirmColor: '#1AAD19',
                            cancelText: '下次再说',
                            success: function(t) {
                                t.confirm && that.initVideoAd(function() {
                                    that.download_gg(n);
                                });
                            }
                        })
                    }
                } else {
                    that.download_video(n), setTimeout(function() {
                        e = !0;
                    }, 5e3)
                }
            } else that.setData({
                modalName: "MessageModal",
                message: "你操作的太快了，请稍后休息再试！"
            });
        },
        download_gg: function(t) {
            this.download_video(t);
        },
        download_video: function(t, download) {
            var that = this;
            let Album = wx.getStorageSync("Album_authorization");
            if (Album == '1') {
                wx.setStorage({
                        key: "Album_authorization",
                        data: '1'
                    }),
                    that.setData({
                        modalName: "downloadProcessModal"
                    }), wx.downloadFile({
                        url: that.data.bigFile ? that.data.config_base_list.api_downloads[0] + func.base64encode(t) : t,
                        success: function(a) {
                            200 === a.statusCode && wx.saveVideoToPhotosAlbum({
                                filePath: a.tempFilePath,
                                success: function(t) {
                                    wx.showToast({
                                        title: "已保存到相册\n依旧完全免费，欢迎多多分享",
                                        icon: "none",
                                        duration: 1500
                                    });
                                },
                                fail: function(a) {
                                    console.log(a)
                                    wx.showModal({
                                        title: "下载失败",
                                        content: that.data.config_base_list.downloadErrorMsg + "\r\n原因二：下载速度过于太快,微信限制，请过会再下载。",
                                        confirmText: "复制链接",
                                        confirmColor: "#1AAD19",
                                        success: function(a) {
                                            a.confirm && wx.setClipboardData({
                                                data: that.data.videoInfo.playAddr ? that.data.videoInfo.playAddr : t,
                                                success: function(t) {
                                                    wx.showToast({
                                                        title: "复制成功"
                                                    });
                                                }
                                            });
                                        }
                                    }), console.log(a.errMsg);
                                }
                            });
                        }
                    }).onProgressUpdate(function(t) {
                        100 === t.progress ? (that.hideModal(), that.setData({
                            downloadProcess: 0
                        })) : that.setData({
                            downloadProcess: t.progress
                        });
                    });
            } else {
                wx.showModal({
                    title: "温馨提示",
                    content: '请授权程序允许把视频保存相册权限,才能保存视频哦！',
                    confirmText: '允许授权',
                    confirmColor: '#1AAD19',
                    cancelText: '暂不授权',
                    success: function(a) {
                        if (a.confirm) {
                            wx.authorize({
                                scope: "scope.writePhotosAlbum",
                                success: function() {
                                    wx.setStorage({
                                        key: "Album_authorization",
                                        data: '1'
                                    })
                                    that.setData({
                                        modalName: "MessageModal",
                                        message: "授权成功，请重新点击下载即可！"
                                    })
                                },
                                fail: function() {
                                    that.setData({
                                        modalName: "MessageModal",
                                        message: "授权失败,原因：无法拉起小程序授权弹窗，请重新尝试"
                                    })
                                }
                            })
                        } else if (a.cancel) {
                            that.setData({
                                modalName: "MessageModal",
                                message: "你选择的是暂不授权，将无法保存视频哦！"
                            })
                        }

                    }
                })
            }
        },
        hideModal: function(t) {
            this.setData({
                modalName: null
            });
        },
        isUrl: function(t) {
            return !!t && (t.startsWith("http://") || t.startsWith("https://"));
        },
        fetchUrl: function(t) {
            var o = t.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:\/~\+#!\$\(\)\\|]*[\w\-\@?^=%&\/~\+#!\$\(\)\\|])?/);
            return o ? o[0] : null;
        },
        checking_link: function() {
            // var t = this;
            // wx.getClipboardData({
            //     success: function(o) {
            //         var a = t.fetchUrl(o.data);
            //         t.isUrl(a) && t.setData({
            //             pageUrl: a
            //         });
            //     },
            //     fail: function() {
            //         console.log("获取剪贴板失败");
            //     }
            // });
        },
        pageUrlInput: function(t) {
            this.setData({
                pageUrl: t.detail.value
            });
        },
        initVideoAd: function(t) {
            var o = this;
            this.openVideoAd(function() {
                cache.set('Home_VideoAD', "true", 86400), wx.showToast({
                    title: "解锁成功"
                }), t();
            }, function() {
                wx.showModal({
                    title: "使用提示",
                    content: o.data.config_base_list.advertisements.rewardedVideoAdTips,
                    showCancel: !1
                });
            }, function() {
                wx.showModal({
                    title: "提示",
                    content: "您目前暂无广告可看",
                    showCancel: !1,
                    success: function(o) {
                        o.confirm && t();
                    }
                });
            });
        },
        openVideoAd: function(t, o, a) {
            wx.createRewardedVideoAd ? (wx.showLoading({
                title: "视频加载中"
            }), i && (i.offClose(), i.offError(), i.offLoad()), (i = wx.createRewardedVideoAd({
                adUnitId: this.data.config_base_list.advertisements.videoAD_ID ? this.data.config_base_list.advertisements.videoAD_ID : "adunit-3f31575d9d370dbe"
            })).load().then(function() {
                wx.hideLoading(), i.onClose(function(a) {
                    a && a.isEnded ? t && t() : (o && o(), console.log("播放中途退出"));
                }), i.show();
            }).catch(function(t) {
                wx.hideLoading();
            }), i.onLoad(function() {
                wx.hideLoading(), console.log("video 视频加载成功");
            }), i.onError(function(t) {
                wx.hideLoading(), a && a(), console.log(t);
            })) : wx.showModal({
                title: "提示",
                content: "您的微信版本过低，不支持此功能，请升级。"
            });
        }
    }
});