var wxParse = require("../wxParse/wxParse.js"), app = getApp(), i = null, cache = require('../../../utils/cache.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        config_base_list: [],//数据
        mode: 1,
        CourseContent: [],//内容
        display: "none",//是否显示文章
        displayAudio: "none",//mp3
        detailSummaryHeight: "",//是否显示视频广告
        showerror: "none",//访问错误
        howToView: "0",//查看方式
        errMessage: "",//错误信息
        id: null,//文章id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.getCourse(options.id)
    },
    getCourse: function (id) {
        var that = this;
        wx.showLoading({
            title: "加载中...",
        });
        wx.request({
            url: getApp().globalData.tonyon + "/api/public/getCourse.php?id=" + id + "&appid=" + getApp().globalData.appid,
            method: "GET",
            success: function (res) {
                console.log(res.data)
                if (res.data.data.display == "0") {
                    that.setData({
                        CourseContent: res.data.data,
                        id: res.data.data.id,
                        display: "block",
                        howToView: "0"
                    });
                } else if (res.data.data.display == "1") {
                    that.setData({
                        CourseContent: res.data.data,
                        id: res.data.data.id,
                        display: "block",
                        detailSummaryHeight: "400px",
                        howToView: "1"
                    });
                } else if (res.data.data.display == "2" && that.data.config_base_list.user_information.vip == "1") {
                    that.setData({
                        CourseContent: res.data.data,
                        id: res.data.data.id,
                        howToView: "2",
                        showerror: "block",
                        errMessage: "此文章需会员查看，如是会员请重新进入小程序查看。"
                    });
                } else {
                    that.setData({
                        CourseContent: res.data.data,
                        id: res.data.data.id,
                        howToView: "2",
                        showerror: "block",
                        errMessage: "未知错误，请联系管理员咨询。"
                    });
                }
                if (res.data.data.content) {
                    // 设置页面标题
                    wx.setNavigationBarTitle({
                        title: res.data.data.name
                    });
                    wxParse.wxParse("article", "html", that.data.CourseContent.content, that, 5)
                } else {
                    that.setData({
                        id: res.data.data.id,
                        howToView: "2",
                        showerror: "block",
                        errMessage: "文章获取失败，请联系管理员咨询。"
                    });
                }
                wx.hideLoading()
            },
            fail: function () {
                wx.hideLoading()
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '网络请求超时',
                    confirmText: '重载',
                    success: function () {
                        wx.reLaunch({
                            url: '/pages/jiaocheng/jiaocheng'
                        })
                    }
                })
            }
        })
    },
    wxParseTagATap: function (e) {
        var self = this;
        var href = e.currentTarget.dataset.src;
        let appid = e.currentTarget.dataset.appid;
        let redirectype = e.currentTarget.dataset.redirectype;
        let path = e.currentTarget.dataset.path;


        // 判断a标签src里是不是插入的文档链接
        let isDoc = /\.(doc|docx|xls|xlsx|ppt|pptx|pdf)$/.test(href)

        if (isDoc) {
            this.openLinkDoc(e)
            return
        }
        console.log(e)
        if (redirectype) {
            if (redirectype == 'apppage') { //跳转到小程序内部页面         
                wx.navigateTo({
                    url: path
                })
            } else if (redirectype == 'webpage') //跳转到web-view内嵌的页面
            {
                href = '../webpage/webpage?url=' + href;
                wx.navigateTo({
                    url: href
                })
            }
            else if (redirectype == 'miniapp') //跳转其他小程序
            {
                wx.navigateToMiniProgram({
                    appId: appid,
                    path: path
                })
            }
            return;
        }
        self.copyLink(href);

    },
    copyLink: function (url) {
        wx.setClipboardData({
            data: url,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        wx.showToast({
                            title: '链接已复制',
                            image: '../images/link.png',
                            duration: 2000
                        })
                    }
                })
            }
        })
    },
    // 打开文档
    openLinkDoc(e) {
        let self = this
        let url
        let fileType

        // 如果是a标签href中插入的文档
        let src = e.currentTarget.dataset.src
        var n = 0;
        for (var i = 0; i < self.data.downloadFileDomain.length; i++) {

            if (src.indexOf(self.data.downloadFileDomain[i].domain) != -1) {
                n++;
                break;
            }
        }

        if (n == 0) {
            self.copyLink(src);
            return;
        }

        let docType
        let isDoc = /\.(doc|docx|xls|xlsx|ppt|pptx|pdf)$/.test(src)

        if (src && isDoc) {
            url = src
            fileType = /doc|docx|xls|xlsx|ppt|pptx|pdf$/.exec(src)[0]
        } else {
            url = e.currentTarget.dataset.filelink
            fileType = e.currentTarget.dataset.filetype
        }

        wx.downloadFile({
            url: url,
            success: function (res) {
                const filePath = res.tempFilePath
                wx.openDocument({
                    filePath: filePath,
                    fieldType: fileType
                })
            },
            fail: function (error) {
                console.log('下载文档失败:' + error)
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
        this.setData({
            config_base_list: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })
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
    onShareAppMessage: function (res) {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
        console.log(res);
        return {
            title: '分享【"' + this.data.CourseContent.name + '"】的文章',
            path: '/course/pages/course/course?id=' + this.data.CourseContent.id,
            imageUrl: this.data.CourseContent.img,
            success: function (res) {
                // 转发成功
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
                // 转发失败
            }
        }
    },
    // 自定义分享朋友圈
    onShareTimeline: function () {
        let imageUrl = this.data.CourseContent.img;
        return {
            title: this.data.CourseContent.name,
            query: {
                id: this.data.CourseContent.id
            },
            imageUrl
        }
    },
    showAd: function (e) {
        var that = this;
        var id = that.data.id;
        var timestamp = Date.parse(new Date()) / 1000;
        if (that.data.mode == 1 && that.data.config_base_list.advertisements.videoAD_ID || that.data.mode == 3 && that.data.config_base_list.advertisements.videoAD_ID || that.data.mode == 2) {
            if (cache.get('ID_' + id) && cache.get('ID_' + id + '_deadtime') > timestamp) {
                //显示
                that.setData({
                    detailSummaryHeight: ""
                })
            } else {
                wx.showModal({
                    title: '温馨提示',
                    content: '观看一次完整视频广告，本文章24小时无限制查看。',
                    confirmText: '观看视频',
                    confirmColor: '#1AAD19',
                    cancelText: '下次再说',
                    success: function (t) {
                        t.confirm && that.jiaocheng_initVideoAd(function () {
                            //显示
                            that.setData({
                                detailSummaryHeight: ""
                            })
                        }, id);
                    }
                })
            }
        } else {
            //显示
            that.setData({
                detailSummaryHeight: ""
            })
        }

    },
    jiaocheng_initVideoAd: function (e, id) {
        var that = this;
        this.openVideoAd(function () {
            cache.set('ID_' + id, "true", 86400)
            console.log(id);
            wx.showToast({
                title: "解锁成功，24小时内无限制查看！"
            }), e();
        }, function () {
            wx.showModal({
                title: "使用提示",
                content: '查看失败，请重新观看完广告，感谢您的支持！',
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
        }, id);
    },
    //视频
    openVideoAd: function (t, e, o, id) {
        var that = this;
        console.log("openVideoAd");
        console.log(id);
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
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }

})