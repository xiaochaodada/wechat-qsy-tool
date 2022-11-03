const app = getApp();
var systemInfo = wx.getSystemInfoSync();
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
    isShow: false, //是否已经弹出
    anim_Main: {}, //旋转动画
    anim_kefu: {}, //item位移,透明度
    anim_gift: {}, //item位移,透明度
    anim_share: {}, //item位移,透明度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击弹出或者收起
    showOrHide: function() {
      if (this.data.isShow) {
        //缩回动画
        this.takeback();
        this.setData({
          isShow: false
        })
      } else {
        //弹出动画
        this.popp();
        this.setData({
          isShow: true
        })
      }
    },
    kefu: function() {
      this.showOrHide()
    },
    gift: function() {
      this.showOrHide()
    },
    share: function() {
      this.showOrHide()
    },

    //弹出动画
    popp: function() {
      //main按钮顺时针旋转
      var animation_Main = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animation_gift = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animation_kefu = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animation_share = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animation_Main.rotateZ(0).step();
      animation_share.translate(0, -300 / 750 * systemInfo.windowWidth).rotateZ(0).opacity(1).step();
      animation_gift.translate(0, -400 / 750 * systemInfo.windowWidth).rotateZ(0).opacity(1).step();
      animation_kefu.translate(0, -500 / 750 * systemInfo.windowWidth).rotateZ(0).opacity(1).step();
      this.setData({
        anim_Main: animation_Main.export(),
        anim_gift: animation_gift.export(),
        anim_kefu: animation_kefu.export(),
        anim_share: animation_share.export(),
      })
    },
    //收回动画
    takeback: function() {
      //main按钮逆时针旋转
      var animation_Main = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animation_gift = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animation_kefu = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animation_share = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animation_Main.rotateZ(0).step();
      animation_kefu.translate(0, -95).rotateZ(0).opacity(0).step();
      animation_gift.translate(0, -95).rotateZ(0).opacity(0).step();
      animation_share.translate(0, -95).rotateZ(0).opacity(0).step();
      this.setData({
        anim_Main: animation_Main.export(),
        anim_gift: animation_gift.export(),
        anim_kefu: animation_kefu.export(),
        anim_share: animation_share.export(),
      })
    },
    kefu_Event: function() {
      wx.showModal({
        title: '提示',
        content: '111',
        showCancel: false,
        confirmText: '知道了'
      })
    },
    gift_Event: function() {
      wx.showModal({
        title: '提示',
        content: '222',
        showCancel: false,
        confirmText: '知道了'
      })
    },
    share_Event: function() {
      wx.showModal({
        title: '提示',
        content: '333',
        showCancel: false,
        confirmText: '知道了'
      })
    }
  }
})