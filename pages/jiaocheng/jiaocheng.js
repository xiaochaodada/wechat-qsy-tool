// pages/jiaocheng/jiaocheng.js
var app = getApp(),
    i = null,
    page = 1,//当前页数
    cache = require('../../utils/cache.js');
Component({
    /**
     * 页面的初始数据
     */
    data: {
        //aqsy: [],
        d_mask: !1,
        id_url: null,
        is_display: !0,
        is_load: 1,
        CourseClassList: [],//分类列表
        currentIndex: 0,//选中id
        navScrollLeft: 0,//分类进度
        windowWidth: 0,//宽
        CourseContent: '',//文章内容
        CourseList: [],//当前列表
        listLoading: 1,//列表加载
        loadingDottom: 0,//底部
        adPage: 6,//广告载入页
    },


    /**
     * 生命周期函数--监听页面显示
     */
    methods: {

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
            this.getCourseClassList()
            var that = this;
            wx.getSystemInfo({
                success: function (o) {
                    that.setData({
                        windowWidth: o.windowWidth
                    });
                }
            });
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },
        onShow: function () {
            if (this.data.is_load) {
                this.get_config_api_jiaocheng();
            }
        },
        get_config_api_jiaocheng: function () {
            var that = this;
            if (app.globalData.config_base_list == null) {
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '页面加载失败，请重新尝试！',
                    confirmText: '重载',
                    success: function () {
                        wx.reLaunch({
                            url: '/pages/index/index'
                        })
                    }
                })
            } else {
                that.setData({
                    config_base_list: app.globalData.config_base_list,
                    mode: app.globalData.mode
                });
            }
            return;

        },
        getCourseClassList: function () {
            var that = this;
            wx.request({
                url: app.globalData.tonyon + "/api/public/getCourseClassList.php?appid=" + app.globalData.appid,
                method: "GET",
                success: function (a) {
                    console.log(a.data)
                    if (a.data.data) {
                        that.setData({
                            CourseClassList: a.data.data,
                        });
                        that.getCourseList(that.data.CourseClassList[that.data.currentIndex].cid)
                        if(that.data.is_load == 1){
                            that.getCourseList();
                        }
                    } else {
                        wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: '暂无教程，请过几天重试。',
                            confirmText: '我知道了',
                            success: function () {

                            }
                        })
                    }
                },
                fail: function () {
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
        getCourseList: function (cid) {
            var that = this;
            that.setData({
                listLoading: 1
            })
            if (that.data.loadingDottom == 1) {
                return;
            }
            wx.request({
                url: app.globalData.tonyon + "/api/public/getCourseList.php?cid=" + cid + "&appid=" + app.globalData.appid + "&page=" + page,
                method: "GET",
                success: function (a) {
                    console.log(a.data)
                    that.setData({
                        CourseList: that.data.CourseList.concat(a.data.data),
                        listLoading: 0,
                        adPage: a.data.page
                    });
                    console.log((a.data.data).length)
                    if ((a.data.data).length != a.data.page) {
                        that.setData({
                            loadingDottom: 1
                        })
                    }
                    if(that.data.is_load == 1){
                        that.setData({
                            is_load: 0
                        })
                    }
                },
                fail: function () {
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
        getCourse: function (id) {
            var that = this;
            wx.request({
                url: app.globalData.tonyon + "/api/public/getCourse.php?id=" + id + "&appid=" + app.globalData.appid,
                method: "GET",
                success: function (a) {
                    console.log(a.data)
                    that.setData({
                        CourseContent: a.data.data,
                    });
                },
                fail: function () {
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
        switchClass: function (i) {
            console.log(i);
            var that = this;
            var o = i.currentTarget.dataset.current, s = this.data.CourseClassList[o].cid, l = this.data.windowWidth / 5;
            if (this.setData({
                navScrollLeft: (o - 2) * l
            }), this.data.currentIndex == o) return !1;
            this.setData({
                currentIndex: o,
                navScrollLeft: (o - 2) * l,
                loadingDottom: 0,
                CourseList: []
            }), page = 1, that.getCourseList(that.data.CourseClassList[that.data.currentIndex].cid)
        },
        switchTab: function (i) {
            var that = this;
            if (console.log(i), "touch" == i.detail.source) {
                var o = i.detail.current, l = this.data.CourseClassList[o].cid, a = this.data.CourseClassList[o].name;

                var e = this.data.windowWidth / 5;
                this.setData({
                    currentIndex: o,
                    navScrollLeft: (o - 2) * e,
                    loadingDottom: 0,
                    CourseList: []
                }), page = 1, that.getCourseList(that.data.CourseClassList[that.data.currentIndex].cid)
            }
        },


        show_kefu: function (t) {
            this.setData({
                d_mask: !0
            });
        },
        close_kefu: function () {
            var that = this;
            that.Copy_url(that.data.id_url);
            this.setData({
                d_mask: !1
            });
        },
        Copy_url: function (t) {
            var that = this;
            console.log(that.data.config_base_list.jiaocheng[t].url);
            wx.setClipboardData({
                data: that.data.config_base_list.jiaocheng[t].url,
                success: function (a) {
                    wx.hideToast();
                    wx.showModal({
                        title: "温馨提示",
                        content: '教程下载地址复制成功，请打开百度网盘手机App会自动识别保存，或者前往浏览器下载。',
                        confirmText: "朕知道了",
                        confirmColor: "#1AAD19",
                        showCancel: false,
                        complete: function (e) {
                            console.log(e);
                        }
                    });
                }
            });
        },
        loadCourse: function (t) {
            console.log(t)
            if (t.currentTarget.dataset.display == "2" && this.data.config_base_list.user_information.vip != "1") {
                wx.showModal({
                    title: '提示',
                    content: '获取失败，此文章为vip专属，如你是vip，请点"重载"重新查看。',
                    confirmText: '重载',
                    success: function (t) {
                        t.confirm ? wx.reLaunch({
                            url: '/pages/index/index'
                        }) : '';
                    }
                })
                return false;
            }
            var e = "../../course/pages/course/course?id=" + t.currentTarget.id;
            wx.navigateTo({
                url: e
            });
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
            var that = this;
            that.setData({
                loadingDottom: 0,
                CourseList: []
            }), page = 1, that.getCourseList(that.data.CourseClassList[that.data.currentIndex].cid)
        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {
            var that = this;
            if (that.data.loadingDottom != 1) {
                page++, that.getCourseList(that.data.CourseClassList[that.data.currentIndex].cid)
            }
        },
        onLoadMore: function () {
            var that = this;
            if (that.data.loadingDottom != 1) {
                page++, that.getCourseList(that.data.CourseClassList[that.data.currentIndex].cid)
            }
        },
        handleClickCancel: function () {
            console.log("遮罩")
            return;
        },
        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function (e) {
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
                title: i.name,
                path: '/pages/jiaocheng/jiaocheng',
                imageUrl: i.img,
                success: function (a) {
                    wx.showToast({
                        title: "分享成功",
                        icon: "success",
                        duration: 2e3
                    });
                    console.log(a);
                },
                fail: function (a) {
                    wx.showToast({
                        title: "分享失败",
                        icon: "none",
                        duration: 2e3
                    });
                    console.log(a);
                }

            };
        }
    }
})