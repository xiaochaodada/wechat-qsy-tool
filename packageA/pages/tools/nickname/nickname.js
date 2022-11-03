var t = require("nick.js"), a = getApp();
var check = require('../../../../utils/cache')
Page({
    onShareAppMessage: function(t) {
        return {
            title: "翅膀昵称",
            path: "/packageA/pages/tools/nickname/nickname"
        };
    },
    data: {
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "生成效果预览区",
        newValue: [],
        nickdata: []
    },
    onShow: function() {
        // a.pages = getCurrentPages();
    },
    onLoad: function() {
        this.setData({
            nickdata: t
        });
    },
    bindKeyInput: function(t) {
        this.data.current = t.detail.value, this.setData({
            inputShowed: !0
        });
    },
    clearInput: function() {
        this.data.current = null, this.setData({
            scrollTop: 0,
            inputVal: "",
            textareaValue: "生成效果预览区",
            inputShowed: !1
        });
    },
    changeText: function(t) {
          var that = this

        check.checktext(that.data.current,function () {
            if (that.data.current) {
                if (t.target.id) {
                    var a = t.target.id.replace(/昵称/, that.data.current);
                    that.setData({
                        textareaValue: a
                    });
                }
            } else wx.showToast({
                title: "昵称不能为空",
                icon: "none",
                duration: 800
            });
            that.textCopy();
        },function () {
            console.log("错误")
            wx.showToast({
                title: '此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本',
                icon: "none",
                duration: 2e3
            })
        })
      


    
    },
    textCopy: function() {
        "生成效果预览区" != this.data.textareaValue ? wx.setClipboardData({
            data: this.data.textareaValue,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data), t.data, wx.showToast({
                            title: "复制成功"
                        });
                    }
                });
            }
        }) : wx.showToast({
            title: "还没有输入昵称",
            icon: "none",
            duration: 800
        });
    }
});