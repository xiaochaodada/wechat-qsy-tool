var app = getApp();
var check = require('../../../../utils/cache')
Page({
    data: {
        speed: 5,
        personIndex: 0,
        personList: [ {
            id: 0,
            person: "标准女声"
        }, {
            id: 2,
            person: "标准男声"
        }, {
            id: 3,
            person: "大哥哥"
        }, {
            id: 4,
            person: "小姐姐"
        } ],
        personArr: [],
        text: "",
        voiceUrl: "",
        voicShortUrl: "",
        voiceApi: "3"
    },
    onLoad: function(t) {
        var e = this, o = e.data.personList.map(function(t, e) {
            return t.person;
        });
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode
        })
        wx.getStorage({
            key: "fontToVoice_voiceApi",
            success: function(t) {
                e.setData({
                    voiceApi: t.data
                });
            }
        }), e.setData({
            personArr: o
        }), e.saveAndGetData("", !0);
    },
    clear: function(t) {
        var e = this;
        wx.showModal({
            title: "暖心提示",
            content: "真的要清空吗？",
            confirmColor: "#fb7299",
            success: function(t) {
                t.confirm && (e.setData({
                    text: ""
                }), wx.showToast({
                    title: "已清空",
                    icon: "none"
                })), t.cancel && console.log("用户取消了清空");
            }
        }), e.saveAndGetData("", !1);
    },
    paste: function(t) {
        var e = this;
        console.log("粘贴"), wx.getClipboardData({
            success: function(t) {
                e.setData({
                    text: t.data
                }), e.saveAndGetData(t.data, !1);
            }
        });
    },
    copyUrl: function(t) {
        wx.setClipboardData({
            data: this.data.voiceUrl,
            success: function(t) {
                wx.showToast({
                    title: "已复制",
                    icon: "none"
                });
            }
        });
    },
    saveFile: function(t) {
        wx.downloadFile({
            url: this.data.voiceUrl,
            success: function(t) {
                200 === t.statusCode && wx.saveFile({
                    tempFilePath: t.tempFilePath,
                    success: function(t) {
                        wx.showModal({
                            title: "保存成功",
                            content: "已保存到" + t.savedFilePath
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "哎呀，保存失败",
                            icon: "none"
                        });
                    }
                });
            }
        });
    },
    setPerson: function(t) {
        var e = this;
        wx.showActionSheet({
            itemList: e.data.personArr,
            success: function(t) {
                e.setData({
                    personIndex: t.tapIndex
                });
            }
        });
    },
    saveAndGetData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = this;
        0 == (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) ? wx.setStorage({
            key: "fontToVoice_text",
            data: t
        }) : wx.getStorage({
            key: "fontToVoice_text",
            success: function(t) {
                e.setData({
                    text: t.data
                });
            }
        });
    },
    inputSave: function(t) {
        this.saveAndGetData(t.detail.value, !1);
    },
    createVoice: function(t) {
        var e = this, o = encodeURIComponent(t.detail.value.text), a = t.detail.value.speed, n = e.data.personList[e.data.personIndex].id;
        console.log("\n" + a + "\n" + n + "\n" + o)
        

        check.checktext(t.detail.value.text,function () {
            e.setData({
                voiceUrl: "http://fanyi.baidu.com/gettts?lan=zh&spd=5&source=web&text=" + o
            }), wx.showToast({
                title: "耶~成功了",
                icon: "none"
            }), e.audioPlay();
        },function () {
            console.log("错误")
            wx.showToast({
                title: '此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本',
                icon: "none",
                duration: 2e3
            })
        })
      
        
        
   
    },
    audioPlay: function(t) {
        var e = wx.createInnerAudioContext();
        e.src = this.data.voiceUrl, e.play();
    },
    onShow: function() {
    },
    onShareAppMessage: function(t) {
        return {
            title: "文字转语音",
            path: "/packageA/pages/tools/fontToVoice/fontToVoice"
        };
    }
});