var app = getApp();
Component({
    properties: {
        bgShow: Boolean,
        isBag: Boolean,
        receive:String
    },
    data: {
        showAddMeBtn: !0,
        title: ''
    },

    methods: {
        onClickAddToMinProgramCloseBtn: function() {
            var t = new Date().toLocaleDateString();
            wx.setStorage({
                key: "showAddMeBtn",
                data: t
            }), this.setData({
                showAddMeBtn: !1
            });
        },
        onFirstBagCloseClick: function() {
            this.setData({
                bgShow: !1,
                isBag: !1
            });
        },
        red_envelopes: function() {
            console.log(this.properties.receive)
            if (this.properties.receive == 'tiyanka'){
               this.setData({
                   title:'去广告体验卡(1天)'
               })
            }
            this.setData({
                isBag: !0,
                bgShow: !1
            })
        },
        receive: function () {
            var that = this;
            wx.login({
                success: function (res) {
                    wx.request({
                        url: app.globalData.tonyon + '/api/WeChat/user/honbao.php',
                        method: "POST",
                        data: {
                            code: res.code,
                            appid: app.globalData.appid,
                            type: that.properties.receive,
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                        success: function (a) {
                            wx.showModal({
                                title: '提示',
                                content: a.data.msg,
                                showCancel: !1,
                                success(res) {
                                    if (res.confirm) {
                                        that.setData({
                                            isBag: !1,
                                            bgShow: !1
                                        })
                                    }
                                    if(a.data.code == 200){
                                        wx.reLaunch({
                                            url: '/pages/index/index'
                                        })
                                    }
                                }
                            })
              
                        },
                        fail: function () {
                            wx.showModal({
                                title: '提示',
                                content: '领取失败，请稍后重试！',
                                showCancel: !1
                            })
                        }
                    })
                },
                fail:function(){
                    wx.showModal({
                        title: '提示',
                        content: '领取失败，请稍后重试！',
                        showCancel: !1
                    })
                }
                })

        },
    }
});