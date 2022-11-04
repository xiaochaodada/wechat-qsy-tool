var app = getApp(),
  e = require("../../utils/open.js");
Component({
  /*pageLifetimes: {
    show: function() {
      "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
        selected: 0
      });
    }
  },
  properties: {},*/
  data: {
    xiugaistate: 1,
    urldata: "",
    oldmd5: "",
    newmd5: "",
    durationtime: "",
    videosize: "",
    tishitext: "点击上方+号添加视频修改MD5",
    //每个配置内容
    config_base_list: [],
    //全局配置内容
    config_data_list: {
      "Api": "https://"
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
        wx.showModal({
            title: '温馨提示',
            content: '此视频MD5修改会压缩视频画质，不推荐使用！\r\n您可以使用平台新功能,通过删除视频背景声音，或使用其他视频处理功能即可修改视频MD5，这个不会降低视频画质的~',
            confirmText: '前往使用',
            confirmColor: '#1AAD19',
            cancelText: '我知道了',
            success: function (t) {
                if (t.confirm) {
                    wx.switchTab({
                        url: '/pages/xiugai/xiugai',
                    })

                }

            }
        })
    },
    onShow: function() {
      var that = this;
      that.setData({
        config_base_list: app.globalData.config_base_list,
        vip: app.globalData.vip
      })
    },
    //分享小程序
    onShareAppMessage: function() {
      return {
        title: this.data.config_base_list.share_title ? this.data.config_base_list.share_title : '推荐一款超好用的视频去水印工具，免费解析不限次，大家都在用',
        path: '/pages/index/index',
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
    },
    addvideobutton: function() {
      var t = this;
      wx.chooseVideo({
        sourceType: ["album"],
        success: function(i) {
          var n = e.duration(i.duration),
            s = e.kb(i.size),
            o = wx.getFileSystemManager();
          wx.getFileInfo({
            filePath: i.tempFilePath,
            success: function(e) {
              t.setData({
                oldmd5: e.digest,
                durationtime: n,
                videosize: s
              });
            }
          }), o.saveFile({
            tempFilePath: i.tempFilePath,
            filePath: wx.env.USER_DATA_PATH + "/test.mp4",
            success: function(e) {
              o.appendFile({
                filePath: wx.env.USER_DATA_PATH + "/test.mp4",
                data: "01",
                success: function(e) {
                  wx.getFileInfo({
                    filePath: wx.env.USER_DATA_PATH + "/test.mp4",
                    success: function(e) {
                      "getFileInfo:ok" == e.errMsg && t.setData({
                        newmd5: e.digest,
                        urldata: wx.env.USER_DATA_PATH + "/test.mp4",
                        xiugaistate: 2
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    resetvideo: function() {
      var e = this;
      wx.getFileSystemManager().unlink({
        filePath: wx.env.USER_DATA_PATH + "/test.mp4",
        success: function(t) {
          "unlink:ok" == t.errMsg && e.setData({
            xiugaistate: 1
          });
        }
      });
    },
    savevideo: function() {
      var e = this,
        t = wx.getFileSystemManager();
      wx.saveVideoToPhotosAlbum({
        filePath: wx.env.USER_DATA_PATH + "/test.mp4",
        success: function(i) {
          "saveVideoToPhotosAlbum:ok" == i.errMsg && t.unlink({
            filePath: wx.env.USER_DATA_PATH + "/test.mp4",
            success: function(t) {
              "unlink:ok" == t.errMsg && e.setData({
                xiugaistate: 1,
                tishitext: "视频保存成功,请到手机相册中查看"
              });
            }
          });
        },
        fail: function(t) {
          "saveVideoToPhotosAlbum:fail auth deny" == t.errMsg ? wx.showModal({
            title: "保存失败",
            content: "你需要设置授权保存到相册",
            cancelText: "不设置",
            confirmText: "去设置",
            success: function(e) {
              e.confirm ? wx.openSetting({
                success: function(e) {}
              }) : e.cancel;
            }
          }) : "saveVideoToPhotosAlbum:fail invalid video" == t.errMsg && e.setData({
            tishitext: "视频保存失败,联系客服修复"
          });
        }
      });
    }
  }
})