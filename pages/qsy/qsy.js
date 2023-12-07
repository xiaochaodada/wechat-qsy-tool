var app = getApp(),
  func = require('../../utils/func.js'),
  cache = require('../../utils/cache.js'),
  i = null,
  videoAd = null,
  motivationVideo = null,
  downloadInfo = {},
  isqsy = true;
Component({

  data: {
    //首页链接提交框
    pageUrl: null,
    //获取解析的信息
    qsyInfo: {},
    //视频画质选择
    video_list: [],
    qualityIndex: 0,
    //剪贴板链接
    tempClipboardData: null,
    //提交解析loding
    isAnalyseLoading: !1,
    //下载进度
    downloadProcess: 0,
    //每个配置内容
    config_base_list: [],
    //解析记录查询
    history: null,
    //轮播图
    showtype: 0,
    //图片TAB
    cover_tab: 0,
    imageCurrent: 0,
    images: [],
    form_images: [],
    //首页加载
    isloading: false,
    scrollTop: 0,
    modalName: 0,
    timer: '弹窗', //定时器名字
    mode: 0,
    motivationVideoSuccess: true
  },
  methods: {
    save_resources(e) {
      downloadInfo = {}
      let that = this
      console.log('保存', e)
      if (that.data.motivationVideoSuccess && motivationVideo) {
        cache.checkDayCache().then(() => {
          that.download(e)
        }).catch(() => {
          downloadInfo = e
          console.log('播放激励视频')
          wx.showModal({
            title: "温馨提示",
            content: "观看一次完整视频，解锁当天完全使用\r\n提示：只要看完广告，即可无限制使用免费工具。\r\n运营成本太高，谢谢您的谅解~",
            confirmText: "观看",
            confirmColor: "#1AAD19",
            cancelText: "取消",
            success: function (e) {
              if (e.confirm) {
                //重新播放
                if (videoAd) {
                  videoAd.show().catch(() => {
                    // 失败重试
                    videoAd.load()
                      .then(() => videoAd.show())
                      .catch(err => {
                        that.setData({
                          motivationVideoSuccess: false
                        })
                        that.downloadImage()
                        console.error('激励视频 广告显示失败', err)
                      })
                  })
                }
              }
            }
          })

        })
      } else {
        console.log('免费下载')
        that.download(e)
      }


    },
    download(e) {
      if(!e)e=downloadInfo
      const {
        currentTarget: {
          dataset: {
            type,
            url
          }
        }
      } = e
      const downloadRef = this.selectComponent('#download');
      var that = this,
        download_white_list = [];
      console.log("URL", url);
      console.log("type", type);

      var back_url = url;
      if (type == 'video') {
        // for (let index in download_white_list) {
        //   console.log("支持视频链接", download_white_list[index])
        //   if (url.indexOf(download_white_list[index]) != -1) {
        //     downloadRef.load(url, type, back_url);
        //     break;
        //   }
        // }
        downloadRef.load(url, type, back_url);
      } else if (type === 'images') {
        downloadRef.load(that.data.images, 'image', that.data.images);
      } else if (type === 'form_images') {
        let form_images = that.data.form_images
        let images = new Array();
        for (var index = 0; index < form_images.length; index++) {
          if (form_images[index].status) {
            images.push(form_images[index].img_url)
            downloadRef.load(form_images[index].img_url, 'image', form_images[index].img_url);
          }
        }
      } else if (type === 'copy') {
        wx.setClipboardData({
          data: url,
          success: function (t) {
            wx.showToast({
              title: "复制成功"
            });
          }
        });
      } else {
        downloadRef.load(url, type, back_url);
      }
    },
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
      that.get_config().then(() => {
        motivationVideo = that.data.config_base_list.advertisements.videoAD_ID
        if (wx.createRewardedVideoAd && motivationVideo) {
          videoAd = wx.createRewardedVideoAd({
            adUnitId: motivationVideo
          })
          videoAd.onLoad(() => {})
          videoAd.onError((err) => {
            console.error('激励视频光告加载失败', err)
            that.setData({
              motivationVideoSuccess: false
            })
          })
          videoAd.onClose((res) => {
            if (res && res.isEnded) {
              cache.setDayCache()
              that.download()
            } else {
              // 播放中途退出，不下发游戏奖励
              wx.showModal({
                title: "温馨提示",
                content: that.data.config_base_list.advertisements.rewardedVideoAdTips,
                confirmText: "继续观看",
                confirmColor: "#1AAD19",
                cancelText: "取消",
                success: function (e) {
                  if (e.confirm) {
                    //重新播放
                    if (videoAd) {
                      videoAd.show().catch(() => {
                        // 失败重试
                        videoAd.load()
                          .then(() => videoAd.show())
                          .catch(err => {
                            that.setData({
                              motivationVideoSuccess: false
                            })
                            that.download()
                            console.error('激励视频 广告显示失败', err)
                          })
                      })
                    }

                  }
                }
              })
            }
          })
        }

      })
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

    get_config() {
      var that = this,
        config = app.globalData.config_base_list;
      return new Promise((resolve, reject) => {
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
          resolve()
        } else {
          console.log("加载失败")
          reject()
        }
      });
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
        isAnalyseLoading: false,
        qsyInfo: {},
        images: [],
        video_list: []
      });
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

      //下面添加需要执行的事件
      that.setData({
        isAnalyseLoading: true,
        qsyInfo: {},
        images: [],
        pageUrl: Url,
        video_list: []
      });

      try {
        wx.login({
          success: function (res) {
            console.log("获取用户CODE：", res.code)
            wx.request({
              url: app.globalData.jiexi_api,
              method: "POST",
              data: {
                url: Url,
                code: res.code,
                appid: app.globalData.appid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log('res', res)
                const {
                  data: {
                    data,
                    msg,
                    code
                  }
                } = res
                that.setData({
                  isAnalyseLoading: false
                })
                if (code === 0) {
                  wx.showToast({
                    title: that.data.config_base_list.analysis_text,
                    icon: "none",
                    duration: 1500
                  });
                  //data.video_list.length > 0 ? data.video_list.length - 1 : 0
                  let qualityIndex = 0
                  if (data.video_list.length > 0) {
                    data.url = data.video_list[qualityIndex].url
                  }
                  that.setData({
                    qsyInfo: data,
                    video_list: data.video_list,
                    qualityIndex: qualityIndex,
                    images: data.images,
                    showtype: data.url ? 0 : 1
                  });
                  that.initNote();
                } else {
                  that.setData({
                    modalName: "MessageModal",
                    message: e.data.msg
                  });
                }
              },
              fail: function () {
                that.retry_qsy()
              },
            });
          },
          fail: function () {
            that.retry_qsy()
          }
        })

      } catch (t) {
        that.retry_qsy()
      }
    },
    retry_qsy() {
      let that = this
      that.setData({
        isAnalyseLoading: false
      });
      wx.showModal({
        title: '提示',
        content: '网络请求超时，请点重试！(3)',
        confirmText: '重试',
        success(res) {
          if (res.confirm) {
            that.qsy();
          }
        }
      });
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
        "video": this.data.qsyInfo.url,
        "title": this.data.qsyInfo.title,
        "cover": this.data.qsyInfo.cover,
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
    
    //初始化检测事件解析按钮
    clipboard_qsy: function () {
      this.setData({
        modalName: null,
        pageUrl: this.data.tempClipboardData
      }), that.qsy()
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
        qsyInfo: {},
        images: [],
        isAnalyseLoading: false
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
      var a = this.data.qsyInfo.title;
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
    //勾选中下载的图片
    choosePhoto(t) {
      var index = t.currentTarget.dataset.index,
        images = this.data.form_images,
        status = images[index].status;
      images[index].status = !status
      this.setData({
        form_images: images
      });
    },
    //当前查看的图片
    changePhoto(t) {
      this.setData({
        imageCurrent: t.detail.current
      });
    },
    initNote: function () {
      var images = this.data.images,
        form_images = new Array();
      if (images && images.length > 0) {
        for (var i = 0; i < images.length; i++) {
          form_images[i] = {
            img_url: images[i],
            status: 0
          };
        }
      }
      this.setData({
        form_images: form_images
      })
    },
    //选择画质
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e)
      let qsyInfo = this.data.qsyInfo
      qsyInfo.url = this.data.video_list[e.detail.value].url
      this.setData({
        qualityIndex: e.detail.value,
        qsyInfo: qsyInfo
      })
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