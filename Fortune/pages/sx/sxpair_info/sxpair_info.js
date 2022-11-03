function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = getApp(),
    t = require("../util.js"),
    o = require("/drawImg.js");
var data_list = require("../data/list.js");


Page({
    data: {
        list: data_list.sxdata,
        mhei: a.globalData.sheight,
        infodata: "",
        male: 1,
        female: 1,
        malename: "鼠",
        femalename: "鼠",
        userInfo: "",
        iscollect: !1,
        sharelayer: !1,
        modalHidden: !1,
        showModalStatus: !1,
        mengshow: !1,
        bottom: "-100%",
        openSettingBtnHidden: !0,
        hide_qcode: 1,
        id: ""
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "获取中"
        })
        var o = this,
            n = o.options.id,
            s = decodeURIComponent(this.options.scene);
        if (s) {
            var i = a._get(s, "id");
            i && (n = i);
            var l = n.split("_")[0],
                c = n.split("_")[1];
            o.setData({
                id: n,
                male: l,
                female: c
            });
        }
        console.log("id", o.data.id)
        console.log("male", parseInt(l) + 1)
        console.log("female", parseInt(c) + 1)
        o.query(function() {
            var e = "../image/sx/sx_" + (parseInt(l) + 1) + ".png",
                a = "../image/sx/sx_" + (parseInt(c) + 1) + ".png",
                t = "../../../res/images/xcx.jpg";
                console.log("图片1",e)
            o.getImageInfo("sxmale", e) //第一
            o.getImageInfo("sxfemale", a) //第二
            o.getImageInfo("sxqcode", t) //小程序
       wx.hideLoading()
        })
    },
    query: function(query) {
        var that = this;
        var num1 = parseInt(that.data.male), num2 = parseInt(that.data.female);
        wx.login({
            success: function(res) {
                wx.request({
                    url: a.globalData.tonyon + "/api/WeChat/user/tools/sx.php",
                    method: "POST",
                    data: {
                        num1: num1 + 1,
                        num2: num2 + 1,
                        appid: a.globalData.appid,
                        code: res.code,
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                    success: function(res) {
                        console.log(res)
                        that.setData({
                            infodata: res.data.result.data,
                            male: num1,
                            female: num2
                        });
                        query()
                    },
                    fail: function() {
                        console.log("失败")
                    }
                })
            },
            fail: function() {
                console.log("失败")
            }
        })
    },
    share: function(e) {
        var a = this;
        console.log("data", a.data), a.hideModal(), o.setData({
            desc: a.data.infodata,
            title: "生肖配对详情",
            peibi: "VS",
            img_user: a.data.userimg,
            maleurl: "/" + a.data.sxmale,
            femaleurl: "/" + a.data.sxfemale,
            qcode: a.data.sxqcode,
            userInfo: a.data.userInfo,
            malename: a.data.list[a.data.male].name,
            femalename: a.data.list[a.data.female].name
        }), a.setData({
            hide_qcode: 0
        }), o.draw(a);
    },
    showModal: function(e) {
        var a = this;
        t.showModal(a);
    },
    hideModal: function(e) {
        var a = this;
        t.hideModal(a);
    },
    getUserInfo: function(e) {
        var a = this;
        e.detail.userInfo ? (wx.getUserInfo({
            success: function(t) {
                console.log(t), a.setData({
                    userInfo: e.detail.userInfo
                }), a.getImageInfo("userimg", e.detail.userInfo.avatarUrl);
            }
        }), console.log("同意")) : wx.showModal({
            title: "警告",
            content: "您点击了拒绝授权，将无法保存图片，请授权之后再进入!!!",
            showCancel: !1,
            confirmText: "返回授权",
            success: function(e) {
                e.confirm && console.log("用户点击了“返回授权”");
            }
        });
    },
    closeQcode: function() {
        this.setData({
            hide_qcode: 1
        });
    },
    getImageInfo: function(a, t) {
        var o = this;
        wx.getImageInfo({
            src: t,
            success: function(t) {
                var n = t.path;
                o.setData(e({}, a, n));
            },
            fail: function(e) {
                console.log("图片信息", e)
            }
        });
    },
    test: function() {
        var e = encodeURIComponent("id=4_7");
        wx.navigateTo({
            url: "/Fortune/pages/sx/sxpair_info/sxpair_info?scene=" + e
        });
    },
    handleSetting: function(e) {
        var a = this;
        e.detail.authSetting["scope.writePhotosAlbum"] && (a.setData({
            openSettingBtnHidden: !0
        }), o.save_file(a));
    },
    goback: function(e) {
        wx.navigateBack({
            delta: 1
        });
    },
    onShareAppMessage: function(e) {
        return "button" === e.from && console.log(e.target), {
            title: "生肖配对详情",
            path: "/Fortune/pages/sx/sxpair_info/sxpair_info?id=" + this.data.male + "_" + this.data.female
        };
    }
});