// pages/moreApp/moreApp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreApps: [],
    config: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.moreApps == '') {
      this.getMoreApp()
    }
    this.setData({
      config: getApp().globalData.config_base_list
    })
  },
  getMoreApp: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.tonyon + '/api/getMoreApp.php',
      method: "POST",
      data: {
        appId: getApp().globalData.appid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          moreApps: res.data
        })
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '获取失败，请稍后重试。',
          showCancel: !1
        })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})