var app = getApp(),
  func = require('../../utils/func.js'),
  timing, saveFun, adInit, cache = require('../../utils/cache.js'),
  config_base_list = {},
  download_url = '';
//https://css.5266s.top/video.mp4?url=
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  data: {
    appConfig: [],
    backUrl: "",
    isDownloadDialog: false,
    downloadPercentage: 0,
    downloadStatus: "连接中",
    downloadBytesWritten: "0KB",
    downloadBytesExpectedToWrite: "0KB",
    downloadSpeed: "0 B/S",
    downloadSecond: 0,
    isSaveRoute: false,
    saveRoute: "",
  },
  methods: {
    base64encode(value) {
      return func.base64encode(value)
    },
    load: function (url, type, back_url) {
      config_base_list = app.globalData.config_base_list
      var items = config_base_list.api_downloads;
      download_url = items[Math.floor(Math.random() * items.length)]
      console.log("我是什么类型", typeof url == 'object');
      var that = this;
      if (url == null || url == "" || back_url == "") {
        wx.showModal({
          title: "提示",
          content: "下载地址不能为空",
          success: function (t) {}
        });
        return;
      }
      if (typeof url == 'object') {
        var urlCount = url.length;
        for (let index in url) {
          console.log("图片链接", url[index]);
          that.download(url[index], type, url[index]);
        }
      } else {
        that.download(url, type, back_url);
      }
    },
    download (url, type, back_url) {
      console.log('下载链接url',url)
      var that = this;
      var i = 0,
        a = 0,
        d = 0,
        c = 0,
        w = !1;
      that.authorize(function () {
        that.setData({
          isDownloadDialog: true
        }), (saveFun = that.sava(url, type, back_url)).onProgressUpdate(function (t) {
          w || (that.setData({
              downloadBytesExpectedToWrite: that.filesize(t
                .totalBytesExpectedToWrite)
            }), w = !0), 100 === t.progress ? (clearInterval(
              timing)) : i = t.totalBytesWritten / 1024, d = t
            .totalBytesExpectedToWrite - t.totalBytesWritten,
            that.setData({
              downloadStatus: "下载中",
              downloadBytesWritten: that.filesize(t.totalBytesWritten),
              downloadPercentage: t.progress
            });
        });
      }, function () {
        wx.showModal({
          title: "提示",
          content: "保存到相册需要您的授权，请允许授权保存到相册权限。",
          success: function (t) {
            t.confirm && wx.openSetting({
              success: function (t) {}
            });
          }
        });
      }, type), timing = setInterval(function () {
        var t = Math.round(d / parseInt(i - a).toString() / 600);
        t ? that.setData({
          downloadSecond: t
        }) : that.setData({
          downloadSecond: 999
        }), parseInt(i - a).toString().length >= 4 ? that.setData({
          downloadSpeed: ((i - a) / 1024).toFixed(2) + " MB/S"
        }) : (that.setData({
          downloadSpeed: parseInt(i - a) + "KB/S"
        }), "0" == parseInt(i - a) && c < 10 ? c++ : c >= 10 && (that.resetData(),
          clearInterval(timing))), a = i;
      }, 1e3);
    },
    authorize(t, e, type) {
      if (type == 'audio') {
        return t && t();
      }
      wx.getSetting({
        success: function (res) {
          res.authSetting["scope.writePhotosAlbum"] ? t && t() : wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function () {
              t && t();
            },
            fail: function (o) {
              wx.hideLoading(), wx.showModal({
                title: "提示",
                content: "小程序需要您的授权保存，是否重新授权？",
                showCancel: !0,
                cancelText: "否",
                confirmText: "是",
                success: function (r) {
                  r.confirm ? wx.openSetting({
                    success: function (re) {
                      re.authSetting[
                          "scope.writePhotosAlbum"
                        ] ? t && t() : e &&
                        e();
                    }
                  }) : e && e();
                }
              });
            }
          });
        }
      });
    },
    sava: function (url, type, back_url) {
      var that = this;
      switch (type) {
        case "video":
          return wx.downloadFile({
            url: url,
            success: function (res) {
              if (res.statusCode !== 200) {
                that.resetData()
                wx.showModal({
                  title: "下载失败",
                  content: "视频链接已失效，请重新解析。如有疑问请联系客服。",
                  confirmText: "复制链接",
                  confirmColor: "#1AAD19",
                  success: function (e) {
                    e.confirm && wx.setClipboardData({
                      data: back_url,
                      success: function (t) {
                        wx.showToast({
                          title: "复制成功"
                        });
                      }
                    });
                  }
                });
                return
              }
              console.log('保存结果', res)
              wx.saveVideoToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (t) {
                  console.log('保存结果:', t)

                  that.resetData()
                  that.setDownloadNum()

                  wx.showToast({
                    title: "已保存到相册",
                    icon: "none",
                    duration: 1500
                  });
                  return
                },
                fail: function (e) {
                  console.log('保存失败:', e)

                  return that.resetData(), wx.showModal({
                    title: "保存失败",
                    content: "出现此问题的一般原因为：1、视频损坏，2、视频格式错误；请复制链接，安卓手机用“QQ浏览器”下载，苹果手机用“Documents”下载。如有疑问请联系客服。",
                    confirmText: "复制链接",
                    confirmColor: "#1AAD19",
                    success: function (e) {
                      e.confirm && wx.setClipboardData({
                        data: back_url,
                        success: function (t) {
                          wx.showToast({
                            title: "复制成功"
                          });
                        }
                      });
                    }
                  });
                }
              });
            },
            fail: function (e) {
              return -1 != e.errMsg.indexOf("max file size") ? (that.resetData(), wx
                  .showModal({
                    title: "温馨提示",
                    content: "当前视频比较大，超出小程序保存大小，请复制视频链接到浏览器或APP进行下载",
                    cancelText: "我知道了",
                    confirmText: "查看教程",
                    success: function (t) {
                      t.confirm && wx.navigateTo({
                        url: "/pages/question/question"
                      });
                    }
                  })) : -1 != e.errMsg.indexOf("url not in domain list") ? (that
                  .resetData(), that.download((url.indexOf(download_url) != -1 ? url : download_url +
                    that.base64encode(url)), type, back_url)) : -1 != e.errMsg
                .indexOf(
                  "abort") ? that.resetData() : (that
                  .resetData(), wx.showModal({
                    title: "下载失败",
                    content: "出现此问题的一般原因为：微信限制下载允许的最大视频为50MB；此视频已超过大小50MB；请复制链接，安卓手机用“QQ浏览器”下载，苹果手机用“快捷指令”下载。如有疑问请联系客服。错误代码：" +
                      e.errMsg,
                    confirmText: "复制链接",
                    confirmColor: "#1AAD19",
                    success: function (e) {
                      e.confirm && wx.setClipboardData({
                        data: back_url,
                        success: function (t) {
                          wx.showToast({
                            title: "复制成功"
                          });
                        }
                      });
                    }
                  }));
            }
          });
        case 'audio':
          return wx.downloadFile({
            url: t,
            success: function (t) {
              if (t.statusCode === 200) {
                wx.saveFile({
                  tempFilePath: t.tempFilePath,
                  success: function (t) {
                    var o = t.savedFilePath;
                    that.showSaveRoute(o);

                    that.setDownloadNum()

                  }
                });
              } else {
                that.resetData(), wx.showModal({
                  title: "保存失败",
                  content: "下载失败，请复制音乐链接，打开手机浏览器下载",
                  confirmText: "复制链接",
                  confirmColor: "#1AAD19",
                  success: function (e) {
                    e.confirm && wx.setClipboardData({
                      data: back_url,
                      success: function (t) {
                        wx.showToast({
                          title: "复制成功"
                        });
                      }
                    });
                  }
                });
              }
            },
            fail: function () {
              wx.showModal({
                title: "保存失败",
                content: "下载失败，请复制音乐链接到浏览器下载。如有疑问请联系客服。",
                confirmText: "复制链接",
                confirmColor: "#1AAD19",
                success: function (e) {
                  e.confirm && wx.setClipboardData({
                    data: back_url,
                    success: function (t) {
                      wx.showToast({
                        title: "复制成功"
                      });
                    }
                  });
                }
              });

            },
            complete: function () {
              wx.hideLoading();
            }
          });
        default:
          console.log('替换图片下载接口',
          download_url.replace(/\.php/, ".jpg"))
          console.log('替换图片下载接口：',
          url)
          
          var suffix = url.substring(url.lastIndexOf('.') + 1),
            filePath = null,
            fileName = null;
          if (suffix.indexOf("jpg") == -1 && suffix.indexOf("png") == -1 && suffix.indexOf("jpge") == -
            1 && suffix.indexOf("jpg") == -1) {
            fileName = new Date().valueOf();
            filePath = wx.env.USER_DATA_PATH + '/' + fileName + '.jpg';
          }
          // console.log('下载的文件', filePath)
          return wx.downloadFile({
            url: url,
            filePath: (filePath != null ? filePath : null),
            success: function (res) {
              wx.saveImageToPhotosAlbum({
                filePath: fileName == null ? res.tempFilePath : res.filePath,
                success: function (t) {
                  that.resetData(), that.setDownloadNum(), wx.showToast({
                    title: "已保存到相册",
                    icon: "none",
                    duration: 1500
                  });
                },
                fail: function (e) {
                  e.errMsg.indexOf("abort") ? (console.log("停止下载", e), that
                      .resetData()) : that.resetData(), wx
                    .showModal({
                      title: "保存失败",
                      content: "出现此问题的一般原因为：1、图片损坏，2、图片格式错误；请复制链接到浏览器保存。如有疑问请联系客服。",
                      confirmText: "复制链接",
                      confirmColor: "#1AAD19",
                      success: function (e) {
                        e.confirm && wx.setClipboardData({
                          data: back_url,
                          success: function (t) {
                            wx.showToast({
                              title: "复制成功"
                            });
                          }
                        });
                      }
                    });
                }
              });
            },
            fail: function (e) {
              return e.errMsg.indexOf("max file size") != -1 ? (that.resetData(), wx
                .showModal({
                  title: "温馨提示",
                  content: "当前图片比较大，超出小程序保存大小，请复制图片链接到浏览器或APP进行下载",
                  cancelText: "我知道了",
                  confirmText: "查看教程",
                  success: function (t) {
                    t.confirm && wx.navigateTo({
                      url: "/pages/question/question"
                    });
                  }
                })) : -1 != e.errMsg.indexOf("url not in domain list") ? (that
                .resetData(), that.download((url.indexOf(download_url) != -1 ? url : (download_url.replace(/\.php/, ".jpg")) +
                  that.base64encode(url)), type, back_url)) : void(-1 != e.errMsg
                .indexOf(
                  "abort") ? that.resetData() : (
                  that.resetData(), wx.showModal({
                    title: "下载失败",
                    content: "出现此问题的一般原因为：1、图片损坏，2、图片格式错误；请复制链接到浏览器保存。如有疑问请联系客服。错误代码：" +
                      e.errMsg,
                    confirmText: "复制链接",
                    confirmColor: "#1AAD19",
                    success: function (e) {
                      e.confirm && wx.setClipboardData({
                        data: back_url,
                        success: function (t) {
                          wx.showToast({
                            title: "复制成功"
                          });
                        }
                      });
                    }
                  })));
            }
          });
      }
    },
    filesize(t) {
      if (!t) return "0B";
      return t < 1024 ? t + "B" : t < Math.pow(1024, 2) ? (t / 1024).toFixed(2) + "K" : t < Math.pow(1024, 3) ? (
        t / Math.pow(1024, 2)).toFixed(2) + "M" : t < Math.pow(1024, 4) ? (t / Math.pow(1024, 3)).toFixed(
        2) + "G" : (t / Math.pow(1024, 4)).toFixed(2) + "T";
    },
    cancalDownload() {
      //中断下载
      saveFun.abort();
      //关闭定时器
      clearInterval(timing);
      this.resetData();
      wx.showToast({
        title: "已取消下载",
        icon: "none",
        duration: 1e3
      });
    },
    resetData() {
      this.setData({
        isDownloadDialog: false,
        downloadStatus: "连接中",
        downloadBytesExpectedToWrite: "0KB",
        downloadBytesWritten: "0KB",
        downloadPercentage: 0,
        downloadSpeed: "0 B/S",
        downloadSecond: 0
      });
    },
    setDownloadNum() {
      wx.getStorage({
        key: 'down_count',
        success(res) {
          cache.set('down_count', res.data + 1)
        }
      });
    },
    initVideoAd(t) {
      var that = this;
      this.openVideoAd(function () {
        that.setDownloadNum(), t(), wx.showToast({
          title: "解锁成功"
        });
      }, function () {
        wx.showModal({
          title: "使用提示",
          content: that.appConfig.exit_download_tips,
          showCancel: !1
        });
      }, function () {
        wx.showModal({
          title: "提示",
          content: "您目前暂无广告可看",
          showCancel: !1,
          success: function (e) {
            e.confirm && t();
          }
        });
      });
    },
    openVideoAd(t, o, n) {
      wx.createRewardedVideoAd ? (wx.showLoading({
        title: "视频加载中"
      }), adInit && (adInit.offClose(), adInit.offError(), adInit.offLoad()), (adInit = wx
        .createRewardedVideoAd({
          adUnitId: this.appConfig.ad_config.encourage_video ? this.appConfig.ad_config
            .encourage_video : "adunit-5c5db30d5db5319e"
        })).load().then(function () {
        wx.hideLoading(), adInit.onClose(function (e) {
          e && e.isEnded ? t && t() : (o && o(), console.log("播放中途退出"));
        }), adInit.show();
      }).catch(function (t) {
        wx.hideLoading();
      }), adInit.onLoad(function () {
        wx.hideLoading(), console.log("video 视频加载成功");
      }), adInit.onError(function (t) {
        wx.hideLoading(), n && n(), console.log(t);
      })) : wx.showModal({
        title: "提示",
        content: "您的微信版本过低，不支持此功能，请升级。"
      });
    },
    hideSaveRoute() {
      this.setData({
        isSaveRoute: false,
        saveRoute: ""
      });
    },
    showSaveRoute(t) {
      this.setData({
        isSaveRoute: !0,
        saveRoute: t
      });
    },

  }
});