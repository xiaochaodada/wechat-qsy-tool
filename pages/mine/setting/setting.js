// pages/more/setting/setting.js
var app = getApp(),
  cache = require('../../../utils/cache.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isAndroid: !1,
    isShowMask: !1,
    //每个配置内容
    config_base_list: [],
    //全局配置内容
    config_data_list: {
      "Api": "https://www.qsy.ink/Api/api"
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
      var that = this;
      wx.getSystemInfo({
        success(res) {
          if (res.platform == "ios") {
            that.setData({
              isAndroid: !1
            })
            //ios平台
          } else if (res.platform == "android") {
            that.setData({
              isAndroid: !0
            })
            //android平台
          } else if (res.platform == "devtools") {
            that.setData({
              isAndroid: !1
            })
            //开发工具
          }
        }
      })
    },
    onShow: function() {
      this.setData({
        config_base_list: app.globalData.config_base_list,
        config_data_list: app.globalData.config_data_list
      })
    },
    clearCache: function() {
      wx.showActionSheet({
        itemList: ["清理缓存"],
        success(res) {
          wx.showLoading({
            title: '清理中',
          });
          wx.clearStorage();
          wx.hideLoading();
          wx.showToast({
            title: "清理成功",
            icon: 'success',
            duration: 2000
          });
          setTimeout(function() {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }, 2000);
        }
      })
    },
    addDesktop: function() {
      this.setData({
        isShowMask: !0
      })
    },
    hideMask: function() {
      this.setData({
        isShowMask: !1
      })
    },
    openSettingClicked: function() {
      wx.openSetting({
        success: function(e) {},
        fail: function(e) {
          wx.showToast({
            icon: "none",
            title: "打开权限管理失败~"
          });
        }
      });
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
  }
})