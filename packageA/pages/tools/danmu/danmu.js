var check = require("../../../../utils/cache");
Page({
    data: {
        color_array: [ "白", "黑", "红", "橙", "黄", "绿", "青", "蓝", "紫" ],
        font_color_index: 0,
        bg_color_index: 1
    },
    selectFontColor: function(o) {
        this.setData({
            font_color_index: o.detail.value
        });
    },
    selectBgColor: function(o) {
        this.setData({
            bg_color_index: o.detail.value
        });
    },
    createDanmu: function(o) {
        var e = o.detail.value, t = e.content;
        null != t && " " != t && "" != t || (t = "请输入弹幕内容"), console.log(e)
        check.checktext(t,function () {
            wx.navigateTo({
                url: "show_danmu?content=" + t + "&speed=" + e.speed + "&fontSize=" + e.fontSize + "&fontColor=" + e.fontColor + "&bgColor=" + e.bgColor + "&direction=" + e.direction
            });
        },function () {
            console.log("错误")
            wx.showToast({
                title: '此文本可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他文本',
                icon: "none",
                duration: 2e3
            })
        })
      
        
  
    },
    onShareAppMessage: function(o) {
    }
});