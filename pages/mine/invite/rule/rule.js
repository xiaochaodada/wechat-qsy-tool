var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var Invitation_rules = app.globalData.Invitation_rules.Invitation_rules;
        // console.log(cache.getDateStr(-1))
        console.log(Invitation_rules)
        Invitation_rules = Invitation_rules.replace(/{{appname}}/, app.globalData.config_base_list.app_name);
        Invitation_rules = Invitation_rules.replace(/{{reward}}/, app.globalData.Invitation_rules.reward);
        Invitation_rules = Invitation_rules.replace(/{{reward2}}/, app.globalData.Invitation_rules.reward2);    
        Invitation_rules = Invitation_rules.replace(/{{unit}}/, app.globalData.config_base_list.user_information.unit);   
        Invitation_rules = Invitation_rules.replace(/{{unit}}/, app.globalData.config_base_list.user_information.unit);    
        Invitation_rules = Invitation_rules.replace(/{{wxzhanghao}}/, app.globalData.config_base_list.wxzhanghao);
        Invitation_rules = Invitation_rules.replace(/{{qqqun}}/, app.globalData.config_base_list.qqqun);
        Invitation_rules = Invitation_rules.split('\\' + 'n');
        console.log(Invitation_rules)
        this.setData({
            rules: Invitation_rules,
            original_intention: app.globalData.Invitation_rules.original_intention,
            user_id: app.globalData.user_id,
            config_base_list:app.globalData.config_base_list
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