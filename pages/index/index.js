var app = getApp(),
    func = require('../../utils/func.js'),
    cache = require('../../utils/cache.js'),
    i = null,
    isqsy = true,
    isdownload = true;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        video_name_item: [{
            name: "提取声音",
            icon: "video_1.png"
        }, {
            name: "尺寸裁剪",
            icon: "video_2.png"
        }, {
            name: "视频合成",
            icon: "video_3.png"
        }, {
            name: "添加水印",
            icon: "video_4.png"
        }, {
            name: "视频倒放",
            icon: "video_5.png"
        }, {
            name: "视频变速",
            icon: "video_6.png"
        }, {
            name: "裁剪时间",
            icon: "video_7.png"
        }, {
            name: "视频转GIF",
            icon: "video_8.png"
        }, {
            name: "视频压缩",
            icon: "video_9.png"
        }],
        timer: '弹窗', //定时器名字
        countDownNum: '10', ///倒计时
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        const scene = decodeURIComponent(options.scene)
        console.log(options)
        console.log("扫码邀请ID", scene)

        if (options.inviter_id && options.inviter_id != '' && options.inviter_id != null && options.inviter_id != 'undefined') {
            that.setData({
                invite: !0,
                inviter_id: options.inviter_id
            })
            console.log('邀请id获取到了', options.inviter_id)
            that.get_config_api(), that.showAddMeBtn();
        } else if (scene && scene != '' && scene != null && scene != 'undefined') {
            that.setData({
                invite: !0,
                inviter_id: scene
            })
            console.log('扫码邀请id获取到了', scene)
            that.get_config_api(), that.showAddMeBtn();
        } else {
            console.log('正常用户')
            that.get_config_api(), that.showAddMeBtn();
        }
        // that.checking_link();
    },
    onShow: function () {

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
                    url: that.data.invite ? (app.globalData.tonyon + "/api/WeChat/user/api/invite.php") : (app.globalData.tonyon + "/api/WeChat/user/new_user_api.php"),
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
                        if (a.data.pinduoduo == '1' || a.data.pinduoduo == '2' || a.data.pinduoduo == '3') {
                            if (a.data.pinduoduo == '1') {
                                wx.setTabBarItem({
                                    index: 1,
                                    text: '低价购物',
                                    iconPath: "images/shopping.png",
                                    selectedIconPath: "images/shopping_active.png"
                                })
                                wx.setTabBarBadge({
                                    index: 2,
                                    text: '....'
                                })
                            } else if (a.data.pinduoduo == '2') {
                                wx.setTabBarBadge({
                                    index: 2,
                                    text: '....'
                                })
                            } else if (a.data.pinduoduo == '3') {
                                wx.setTabBarBadge({
                                    index: 2,
                                    text: '....'
                                })
                            }

                            wx.setTabBarBadge({
                                index: 4,
                                text: 'new'
                            })

                        }
                        app.globalData.config_base_list = a.data.data;
                        app.globalData.user_id = a.data.user;
                        app.globalData.pinduoduo = a.data.pinduoduo;
                        app.globalData.pinduoduo_client_id = a.data.pinduoduo_client_id;
                        app.globalData.pinduoduo_client_secret = a.data.pinduoduo_client_secret;
                        app.globalData.pinduoduo_pid = a.data.pinduoduo_pid;
                        app.globalData.mode = a.data.mode; //模式
                    },
                    fail: function (eer) {
                        console.log(eer)
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
      this.setData({
          pageUrl: t.detail.value
      });
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
    video_button: function (id) {

        var that = this,
            id = id.currentTarget.dataset.video;
        console.log(id)
        switch (id) {
            case "0":
                wx.navigateTo({
                    url: '/pages/xiugai/xiugai'
                })
                break;
            case 1:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/currency/currency?type=acodec'
                })
                break;
            case 2:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/cutvideo/cutvideo'
                })
                break;
            case 3:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/merging/merging'
                })
                break;
            case 4:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/watermark/watermark'
                })
                break;
            case 5:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/currency/currency?type=reverse'
                })
                break;
            case 6:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/speed/speed'
                })
                break;
            case 7:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/cuttimer/cuttimer'
                })
                break;
            case 8:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/gif/gif'
                })
                break;
            case 9:
                wx.navigateTo({
                    url: '../../../../../packageB/pages/currency/currency?type=compression'
                })
                break;


        }
    },
    pages_button: function (id) {
        var that = this,
            id = id.currentTarget.dataset.pages;
        console.log(id)
        switch (id) {
            case "1":
                wx.navigateTo({
                    url: '/pages/qsy/qsy'
                })
                break;
            case "2":
                wx.navigateTo({
                    url: '../../../../../packageB/pages/movevideo/movevideo'
                })
                break;
            case "3":
                wx.navigateTo({
                    url: '/pages/batch/batch'
                })
                break;
            case "4":
                wx.navigateTo({
                    url: '../../../../../packageB/pages/currency/currency?type=vcodec'
                })
                break;
        }
    },
    hideModal: function (t) {
        this.setData({
            modalName: null
        });
    },
    //初始化检测事件解析按钮
    clipboard_qsy: function () {
        this.setData({
            modalName: null,
            pageUrl: this.data.tempClipboardData
        });
        wx.navigateTo({
            url: "/pages/qsy/qsy?history=" + this.data.tempClipboardData
        })
    },
        //删除已解析内容
        clearInput: function () {
          this.setData({
              pageUrl: ""
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
    //粘贴链接
    pasteUrl: function(){
      var t = this;
      wx.getClipboardData({
          success: function (a) {
              var e = t.fetchUrl(a.data)
              if (t.isUrl(e)) {
                  t.setData({
                      // tempClipboardData: e,
                      // modalName: "clipboardUrlDetected",
                      // clipboardUrl: e,
                      pageUrl: e
                  });
              }else{
                wx.showModal({
                  title: '温馨提示',
                  content: '粘贴失败，检测到您复制的内容不是链接。可尝试在输入框长按选择粘贴 或 手动输入链接',
                  showCancel: false,
                  confirmText: '我知道了'
                })
              }
          },
          fail: function(e){
            console.log('粘贴链接失败',e)
            if(e.errMsg === 'getClipboardData:fail no permission'){
              wx.showModal({
                title: '温馨提示',
                content: '粘贴链接失败，可尝试在输入框长按选择粘贴 或 手动输入链接',
                showCancel: false,
                confirmText: '我知道了'
              })
            }else{
              wx.showModal({
                title: '温馨提示',
                content: '粘贴链接失败，请检查是否复制成功内容 或 未给与权限。可尝试在输入框长按选择粘贴 或 手动输入链接',
                showCancel: false,
                confirmText: '我知道了'
              })
            }
            
          }
      });
    },
      //解析按钮2
      clipboard_qsy2: function () {
        if(this.data.pageUrl){
          wx.navigateTo({
            url: "/pages/qsy/qsy?history=" + this.data.pageUrl
        })
        }else{
          wx.showModal({
            title: '温馨提示',
            content: '内容不能为空，请在旁边输入框填写需要解析的链接',
            showCancel: false,
            confirmText: '我知道了'
          })
        }
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
    onShareTimeline: function () {
        return {
            title: this.data.config_base_list.share_title ? this.data.config_base_list.share_title : '推荐一款超好用的视频去水印工具，免费解析不限次，大家都在用',
            query: {
                key: '/pages/index/index'
            },
            imageUrl: this.data.config_base_list.share_imageUrl ? this.data.config_base_list.share_imageUrl : '/images/share.jpg'
        }
    },
    handleClickCancel: function () {
        console.log("遮罩")
        return;
    },
    adLoad: function () {
        console.log('原生模板广告加载成功')
    },
    adError: function (err) {
        console.log('原生模板广告加载失败', err)
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
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