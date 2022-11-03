var e = getApp();

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        num: 0,
        allnum: 0,
        number: 0,
        name: !1,
        allname: !1,
        savename: !0,
        arr: [],
        backname: !0,
        openSettingBtnHidden: !0,
        text: "保存结束前，请勿进行其他操作",
        boxname: !0,
        cuoname: !0,
        cuoleft: 0,
        ad: !0,
        guoqing: !1
    },
    countTime: function () {
        var e = new Date(), t = e.getMonth() + 1, a = e.getDate();
        console.log("今天是" + t + "-" + a), 10 == t ? a <= 15 ? this.setData({
            guoqing: !0
        }) : this.setData({
            guoqing: !1
        }) : 9 == t && a >= 24 ? this.setData({
            guoqing: !0
        }) : this.setData({
            guoqing: !1
        });
    },
    toAvatar: function (e) {
        console.log(e);
        var t = e.detail.userInfo;
        t && (t.nickName, t.avatarUrl, wx.navigateTo({
            url: "../avatar/avatar"
        }));
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function () {
        var t = this, a = this;
        this.countTime(), wx.getSetting({
            success: function (e) {
                e.authSetting["scope.writePhotosAlbum"] || wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function () {
                        console.log("授权成功");
                    },
                    fail: function () {
                        console.log("授权失败"), a.setData({
                            saveImgBtnHidden: !0,
                            openSettingBtnHidden: !1
                        });
                    }
                });
            }
        }), wx.showShareMenu({
            withShareTicket: !0
        }), e.globalData.userInfo ? this.setData({
            userInfo: e.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? e.userInfoReadyCallback = function (e) {
            t.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function (a) {
                e.globalData.userInfo = a.userInfo, t.setData({
                    userInfo: a.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    onShareAppMessage: function () {
        return {
            title: "聊天文件快速保存",
            path: "packageA/pages/tools/wxsave/wxsave"
        };
    },
    getUserInfo: function (t) {
        console.log(t), e.globalData.userInfo = t.detail.userInfo, this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        });
    },
    upimg: function (e) {
        var t = this;
        wx.getSetting({
            success: function (a) {
                a.authSetting["scope.writePhotosAlbum"] ? t.myimg(e) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function () {
                        console.log("授权成功");
                    },
                    fail: function () {
                        console.log("授权失败"), t.setData({
                            saveImgBtnHidden: !0,
                            openSettingBtnHidden: !1
                        });
                    }
                });
            }
        });
    },
    handleSetting: function (e) {
        e.detail.authSetting["scope.writePhotosAlbum"] ? (wx.showModal({
            title: "提示",
            content: "您已授权，赶紧将图片保存在相册中吧！",
            showCancel: !1
        }), this.setData({
            saveImgBtnHidden: !1,
            openSettingBtnHidden: !0,
            name: !1
        })) : (wx.showModal({
            title: "警告",
            content: "若不打开授权，则无法将图片保存在相册中！",
            showCancel: !1
        }), this.setData({
            saveImgBtnHidden: !0,
            openSettingBtnHidden: !1
        }));
    },
    myimg: function (e) {
        var t = this;
        wx.chooseMessageFile({
            count: 100,
            type: "all",
            success: function (e) {
                console.log(e), t.setData({
                    name: !0,
                    ad: !1
                }), t.setData({
                    savename: !1
                }), t.data.allnum = e.tempFiles.length, t.setData({
                    allnum: e.tempFiles.length
                });
                for (var a = 0; a < e.tempFiles.length; a++) {
                    var n = 0, o = 0;
                    -1 == e.tempFiles[a].path.indexOf(".mp4") ? (console.log("这是图片"), wx.saveImageToPhotosAlbum({
                        filePath: e.tempFiles[a].path,
                        success: function (e) {
                            console.log("保存成功"), console.log(e), n = t.data.num, o = t.data.allnum, n++ , t.setData({
                                num: n
                            }), t.setData({
                                number: 100 / o * n
                            }), n == o && (console.log("保存完成"), t.setData({
                                backname: !1,
                                text: "保存成功",
                                boxname: !1
                            }));
                        },
                        fail: function (a) {
                            console.log("保存失败"), console.log(e), t.setData({
                                backname: !1,
                                text: "保存失败",
                                boxname: !0,
                                cuoname: !1
                            });
                        }
                    })) : (console.log("这是视频"), wx.saveVideoToPhotosAlbum({
                        filePath: e.tempFiles[a].path,
                        success: function (e) {
                            console.log("保存视频成功"), console.log(e), n = t.data.num, o = t.data.allnum, n++ , t.setData({
                                num: n
                            }), t.setData({
                                number: 100 / o * n
                            }), n == o && (console.log("保存完成"), t.setData({
                                backname: !1,
                                text: "保存成功",
                                boxname: !1
                            }));
                        },
                        fail: function (a) {
                            console.log("保存视频失败"), console.log(e), t.setData({
                                backname: !1,
                                text: "保存失败",
                                boxname: !0,
                                cuoname: !1
                            });
                        }
                    }));
                }
            }
        });
    },
    backup: function () {
        this.setData({
            num: 0,
            allnum: 0,
            number: 0,
            name: !1,
            allname: !1,
            savename: !0,
            backname: !0,
            text: "保存结束前，请勿进行其他操作",
            boxname: !0,
            ad: !0
        });
    }
});