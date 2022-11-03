Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.network = void 0;

var e = require("./urls"),
    r = getApp(),
    t = r.globalData.apikey,
    i = r.globalData.apisecret,
    n = r.globalData.accesstoken,
    s = {
        detect: function(r) {
            r.url = e.urls.detect, r.extraform = {
                return_attributes: "gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus"
            }, this.request(r);
        },
        beautify: function(r) {
            r.url = e.urls.beautify, r.extraform = {
                whitening: r.whitening ? r.whitening : 50,
                smoothing: r.smoothing ? r.smoothing : 50,
                thinface: r.thinface ? r.thinface : 50,
                shrink_face: r.shrink_face ? r.shrink_face : 50,
                enlarge_eye: r.enlarge_eye ? r.enlarge_eye : 50,
                remove_eyebrow: r.remove_eyebrow ? r.remove_eyebrow : 50,
                filter_type: r.filter_type ? r.filter_type : ""
            }, this.request(r);
        },
        facialfeatures: function(r) {
            r.url = e.urls.facialfeatures, r.extraform = {
                return_imagereset: 1
            }, this.request(r);
        },
        skinanalyze: function(r) {
            r.url = e.urls.skinanalyze, this.request(r);
        },
        gesture: function(r) {
            r.url = e.urls.gesture, this.request(r);
        },
        segment: function(r) {
            r.url = e.urls.segment, r.extraform = {
                return_grayscale: 0
            }, this.request(r);
        },
        ocridcard: function(r) {
            r.url = e.urls.ocridcard, this.request(r);
        },
        ocrdriverlicense: function(r) {
            r.url = e.urls.ocrdriverlicense, this.request(r);
        },
        ocrvehiclelicense: function(r) {
            r.url = e.urls.ocrvehiclelicense, this.request(r);
        },
        ocrbankcard: function(r) {
            r.url = e.urls.ocrbankcard, this.request(r);
        },
        licenseplate: function(r) {
            r.url = e.urls.licenseplate, this.request(r);
        },
        detectsceneandobject: function(r) {
            r.url = e.urls.detectsceneandobject, this.request(r);
        },
        request: function(e) {
            var r = this;

            wx.login({
                success: function(res) {
                    var n = {
                        appid: getApp().globalData.appid,
                        code: res.code
                    };
                    for (var s in e.extraform) n[s] = e.extraform[s];
                    wx.uploadFile({
                        url: getApp().globalData.tonyon + "/api/WeChat/user/tools/face.php?act=" + e.url,
                        filePath: e.img_path,
                        name: "image_file",
                        timeout: 8e3,
                        formData: n,
                        success: function(t) {
                            var i = JSON.parse(t.data),
                                n = i.error_message;
                            n ? r.delError(n) : e.success(i);
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "请求超时,请重试。",
                                icon: "none"
                            });
                        }
                    })
                }
            })

        },
        delError: function(e) {
            var r = {
                IMAGE_ERROR_UNSUPPORTED_FORMAT: "请选择图片文件",
                INVALID_IMAGE_SIZE: "图像尺寸过大或过小",
                IMAGE_FILE_TOO_LARGE: "图片文件过大",
                IMAGE_DOWNLOAD_TIMEOUT: "图片上传超时",
                NO_FACE_FOUND: "未检测到人脸",
                INVALID_IMAGE_FACE: "人脸不完整",
                INVALID_IMAGE_T: "检测失败",
                NO_LICENSE_PLATE_FOUND: "未检测到车牌",
                CONCURRENCY_LIMIT_EXCEEDED: "操作频繁，请重试",
                INTERNAL_ERROR: "服务器错误，请重试"
            };
            for (var t in r) - 1 != e.search(t) && (e = r[t]);
            wx.showToast({
                title: e,
                icon: "none"
            });
        }
    };

exports.network = s;