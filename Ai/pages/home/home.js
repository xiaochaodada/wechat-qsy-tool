var e = require("../../utils/network.js");
var cache = require("../../../utils/cache");

Page({
    data: {
        face: [ {
            img: "../../image/face.png",
            title: "颜值评估",
            func: "onDetect"
        }, {
            img: "../../image/beautify.png",
            title: "美颜",
            func: "onBeautify"
        }, {
            img: "../../image/feature.png",
            title: "特征分析",
            func: "onFeature"
        }, {
            img: "../../image/skin.png",
            title: "皮肤状况",
            func: "onSkin"
        } ],
        body: [ {
            img: "../../image/gesture.png",
            title: "手势识别",
            func: "onGesture"
        }, {
            img: "../../image/segment.png",
            title: "人体抠图",
            func: "onSegment"
        }, {}, {} ],
        card: [ {
            img: "../../image/idcard.png",
            title: "身份证",
            func: "onIdCard"
        }, {
            img: "../../image/drivercard.png",
            title: "驾驶证",
            func: "onDriverCard"
        }, {
            img: "../../image/vehiclecard.png",
            title: "行驶证",
            func: "onVehicleCard"
        }, {
            img: "../../image/bankcard.png",
            title: "银行卡",
            func: "onBankCard"
        } ],
        other: [  {
            img: "../../image/carplate.png",
            title: "车牌识别",
            func: "onPlate"
        }, {
            img: "../../image/scene.png",
            title: "场景识别",
            func: "onScene"
        }, {} ]
    },
    onLoad: function(e) {},
    chooseImage: function(n) {
        wx.chooseImage({
            count: 1,
            success: function(t) {
                wx.showLoading({
                    title: "加载中..."
                });
                var i = t.tempFilePaths[0];
                console.log('路径地址：',i)
                cache.checkimg(i,function(){
                    e.network[n.func]({
                        img_path: i,
                        success: function(e) {
                            wx.hideLoading();
                            var t = e;
                            t.img_path = i, wx.navigateTo({
                                url: "/Ai/pages/detail/detail?data=" + encodeURIComponent(JSON.stringify(t)) + "&type=" + n.type
                            });
                        }
                    });
                },function(){
                      console.log('图片失败')
                      wx.showToast({
                        title: '此图片可能包含有政治有害、色情、赌博等违法违规不当信息,请重新选择其他图片，如果误判请联系客服。',
                        icon: "none",
                        duration: 2e3
                    })
                })
       
            }
        });
    },
    onDetect: function(e) {
        this.chooseImage({
            func: "detect",
            type: "detect"
        });
    },
    onBeautify: function(e) {
        this.chooseImage({
            func: "beautify",
            type: "beautify"
        });
    },
    onFeature: function(e) {
        this.chooseImage({
            func: "facialfeatures",
            type: "feature"
        });
    },
    onSkin: function(e) {
        this.chooseImage({
            func: "skinanalyze",
            type: "skin"
        });
    },
    onGesture: function(e) {
        this.chooseImage({
            func: "gesture",
            type: "gesture"
        });
    },
    onSegment: function(e) {
        this.chooseImage({
            func: "segment",
            type: "segment"
        });
    },
    onIdCard: function(e) {
        this.chooseImage({
            func: "ocridcard",
            type: "idcard"
        });
    },
    onDriverCard: function(e) {
        this.chooseImage({
            func: "ocrdriverlicense",
            type: "drivercard"
        });
    },
    onVehicleCard: function(e) {
        this.chooseImage({
            func: "ocrvehiclelicense",
            type: "vehiclecard"
        });
    },
    onBankCard: function(e) {
        this.chooseImage({
            func: "ocrbankcard",
            type: "bankcard"
        });
    },
    onPlate: function(e) {
        this.chooseImage({
            func: "licenseplate",
            type: "plate"
        });
    },
    onScene: function(e) {
        this.chooseImage({
            func: "detectsceneandobject",
            type: "scene"
        });
    }
});