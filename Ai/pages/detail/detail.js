var e = require("../../utils/tools.js");

Page({
    data: {},
    onLoad: function(a) {
        var t = JSON.parse(decodeURIComponent(a.data)), r = null, s = t.img_path, c = "";
        t.image_reset ? c = t.image_reset : t.body_image ? c = t.body_image : t.result && "string" == typeof t.result && (c = t.result);
        var o = a.type;
        switch (wx.setNavigationBarTitle({
            title: {
                detect: "人脸检测",
                beautify: "美颜",
                feature: "特征分析",
                skin: "皮肤状况",
                gesture: "手势识别",
                segment: "人体抠图",
                idcard: "身份证识别",
                drivercard: "驾驶证识别",
                vehiclecard: "行驶证识别",
                bankcard: "银行卡识别",
                plate: "车牌识别",
                scene: "场景识别"
            }[o]
        }), o) {
          case "detect":
            t = e.tools.detect(t);
            break;

          case "beautify":
            t = e.tools.beautify(t);
            break;

          case "feature":
            t = e.tools.feature(t);
            break;

          case "skin":
            t = e.tools.skin(t);
            break;

          case "gesture":
            t = e.tools.gesture(t);
            break;

          case "segment":
            t = e.tools.segment(t);
            break;

          case "idcard":
            t = e.tools.idcard(t);
            break;

          case "drivercard":
            t = e.tools.drivercard(t);
            break;

          case "vehiclecard":
            t = e.tools.vehiclecard(t);
            break;

          case "bankcard":
            t = e.tools.bankcard(t);
            break;

          case "plate":
            t = e.tools.plate(t);
            break;

          case "scene":
            t = e.tools.scene(t);
        }
        this.setData({
            img_path: s,
            img_file: c,
            data: t,
            type: o,
            arrayRes: r
        });
    }
});