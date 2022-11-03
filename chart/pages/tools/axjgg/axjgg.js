var app = getApp(),
    i = null;
    var check = require('../../../../utils/cache')
Page({
    data: {
        spgg_save: "",
        show_lock: "N",
        jlsp_show_lock: "N",
        sycs: 99,
        is_save: 0,
        show_jlgg: "1",
        ts: 0,
        show_ggts: "0",
        show_ggtsy: "",
        show_shouquan: !1,
        items: [{
            name: "A",
            value: "一图一格",
            checked: "true"
        }, {
            name: "B",
            value: "多图一格"
        }, {
            name: "C",
            value: "一图填满"
        }],
        sel_img_type: "A",
        maskFlag: !1,
        loop_save: 1,
        windowWidth: 0,
        boxWidth: 0,
        width: 0,
        minWidth: 0,
        curr_templet: 0,
        showSetColor: !1,
        bg_color: "rgb(255, 105, 180)",
        bg_color_r: "255",
        bg_color_g: "105",
        bg_color_b: "180",
        color_list: [{
            id: "1",
            color: "red"
        }, {
            id: "2",
            color: "#FFFF00"
        }, {
            id: "3",
            color: "#33CC33"
        }, {
            id: "4",
            color: "#0066CC"
        }, {
            id: "5",
            color: "#9933CC"
        }, {
            id: "6",
            color: "#FF33CC"
        }, {
            id: "7",
            color: "white"
        }, {
            id: "8",
            color: "#CCCCCC"
        }, {
            id: "9",
            color: "#000000"
        }],
        templet: [{
            id: 0,
            imgArray: [{
                img_count: 3,
                value: [0, 0, 0, 0, 0, 1, 0, 1, 1]
            }, {
                img_count: 5,
                value: [0, 0, 0, 1, 0, 1, 1, 1, 1]
            }, {
                img_count: 3,
                value: [0, 0, 0, 1, 0, 0, 1, 1, 0]
            }, {
                img_count: 8,
                value: [1, 1, 1, 1, 1, 1, 0, 1, 1]
            }, {
                img_count: 9,
                value: [1, 1, 1, 1, 1, 1, 1, 1, 1]
            }, {
                img_count: 8,
                value: [1, 1, 1, 1, 1, 1, 1, 1, 0]
            }, {
                img_count: 1,
                value: [0, 0, 1, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 7,
                value: [1, 1, 1, 1, 1, 1, 0, 1, 0]
            }, {
                img_count: 1,
                value: [1, 0, 0, 0, 0, 0, 0, 0, 0]
            }]
        }, {
            id: 1,
            imgArray: [{
                img_count: 6,
                value: [1, 1, 1, 1, 1, 0, 1, 0, 0]
            }, {
                img_count: 4,
                value: [1, 1, 1, 0, 1, 0, 0, 0, 0]
            }, {
                img_count: 6,
                value: [1, 1, 1, 0, 1, 1, 0, 0, 1]
            }, {
                img_count: 1,
                value: [0, 0, 0, 0, 0, 0, 1, 0, 0]
            }, {
                img_count: 0,
                value: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 1,
                value: [0, 0, 0, 0, 0, 0, 0, 0, 1]
            }, {
                img_count: 8,
                value: [1, 1, 0, 1, 1, 1, 1, 1, 1]
            }, {
                img_count: 2,
                value: [0, 0, 0, 0, 0, 0, 1, 0, 1]
            }, {
                img_count: 8,
                value: [0, 1, 1, 1, 1, 1, 1, 1, 1]
            }]
        }, {
            id: 2,
            imgArray: [{
                img_count: 2,
                value: [0, 0, 0, 0, 0, 1, 0, 1, 0]
            }, {
                img_count: 3,
                value: [0, 0, 0, 1, 0, 1, 0, 1, 0]
            }, {
                img_count: 2,
                value: [0, 0, 0, 1, 0, 0, 0, 1, 0]
            }, {
                img_count: 3,
                value: [1, 0, 0, 1, 0, 0, 0, 1, 0]
            }, {
                img_count: 0,
                value: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 3,
                value: [0, 0, 1, 0, 0, 1, 0, 1, 0]
            }, {
                img_count: 1,
                value: [0, 0, 1, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 3,
                value: [0, 0, 0, 1, 0, 1, 0, 1, 0]
            }, {
                img_count: 1,
                value: [1, 0, 0, 0, 0, 0, 0, 0, 0]
            }]
        }, {
            id: 3,
            imgArray: [{
                img_count: 3,
                value: [0, 0, 0, 0, 0, 0, 1, 1, 1]
            }, {
                img_count: 3,
                value: [0, 0, 0, 0, 0, 0, 1, 1, 1]
            }, {
                img_count: 3,
                value: [0, 0, 0, 0, 0, 0, 1, 1, 1]
            }, {
                img_count: 5,
                value: [1, 0, 0, 1, 1, 1, 0, 0, 1]
            }, {
                img_count: 5,
                value: [0, 0, 1, 1, 1, 1, 1, 0, 0]
            }, {
                img_count: 6,
                value: [1, 0, 1, 1, 0, 1, 1, 0, 1]
            }, {
                img_count: 3,
                value: [1, 1, 1, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 3,
                value: [1, 1, 1, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 3,
                value: [1, 1, 1, 0, 0, 0, 0, 0, 0]
            }]
        }, {
            id: 4,
            imgArray: [{
                img_count: 7,
                value: [1, 1, 1, 0, 1, 0, 1, 1, 1]
            }, {
                img_count: 2,
                value: [0, 0, 0, 0, 0, 0, 1, 0, 1]
            }, {
                img_count: 0,
                value: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 2,
                value: [0, 0, 1, 0, 0, 1, 0, 0, 0]
            }, {
                img_count: 9,
                value: [1, 1, 1, 1, 1, 1, 1, 1, 1]
            }, {
                img_count: 2,
                value: [1, 0, 0, 1, 0, 0, 0, 0, 0]
            }, {
                img_count: 0,
                value: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 1,
                value: [0, 1, 0, 0, 0, 0, 0, 0, 0]
            }, {
                img_count: 7,
                value: [1, 0, 1, 1, 0, 1, 1, 1, 1]
            }]
        }, {
            id: 5,
            imgArray: [{
                img_count: 3,
                value: [0, 0, 0, 0, 0, 1, 0, 1, 1]
            }, {
                img_count: 2,
                value: [0, 0, 0, 0, 0, 1, 0, 0, 1]
            }, {
                img_count: 3,
                value: [0, 0, 0, 1, 1, 0, 0, 1, 0]
            }, {
                img_count: 3,
                value: [0, 0, 1, 0, 0, 1, 0, 0, 1]
            }, {
                img_count: 3,
                value: [0, 0, 1, 0, 0, 1, 0, 0, 1]
            }, {
                img_count: 4,
                value: [0, 1, 0, 1, 1, 0, 0, 1, 0]
            }, {
                img_count: 3,
                value: [0, 0, 1, 0, 1, 1, 0, 0, 0]
            }, {
                img_count: 3,
                value: [0, 0, 1, 1, 0, 1, 0, 0, 0]
            }, {
                img_count: 3,
                value: [0, 1, 0, 1, 1, 0, 0, 0, 0]
            }]
        }],
        img_list: [{
            id: "1",
            text: "01",
            img_count: 3,
            img_arr: [{
                id: "0101",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0102",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0103",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0104",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0105",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0106",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0107",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0108",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0109",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }]
        }, {
            id: "2",
            text: "02",
            img_count: 5,
            img_arr: [{
                id: "0201",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0202",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0203",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0204",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0205",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0206",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0207",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0208",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0209",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }]
        }, {
            id: "3",
            text: "03",
            img_count: 3,
            img_arr: [{
                id: "0301",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0302",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0303",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0304",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0305",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0306",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0307",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0308",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0309",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }]
        }, {
            id: "4",
            text: "04",
            img_count: 8,
            img_arr: [{
                id: "0401",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0402",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0403",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0404",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0405",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0406",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0407",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0408",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0409",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }]
        }, {
            id: "5",
            text: "05",
            img_count: 9,
            img_arr: [{
                id: "0501",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0502",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0503",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0504",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0505",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0506",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0507",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0508",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0509",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }]
        }, {
            id: "6",
            text: "06",
            img_count: 8,
            img_arr: [{
                id: "0601",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0602",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0603",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0604",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0605",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0606",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0607",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0608",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0609",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }]
        }, {
            id: "7",
            text: "07",
            img_count: 1,
            img_arr: [{
                id: "0701",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0702",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0703",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0704",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0705",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0706",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0707",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0708",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0709",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }]
        }, {
            id: "8",
            text: "08",
            img_count: 7,
            img_arr: [{
                id: "0801",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0802",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0803",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0804",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0805",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0806",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0807",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0808",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0809",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }]
        }, {
            id: "9",
            text: "09",
            img_count: 1,
            img_arr: [{
                id: "0901",
                voided: 1,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0902",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0903",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0904",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0905",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0906",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0907",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0908",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }, {
                id: "0909",
                voided: 0,
                url: "",
                width: 0,
                height: 0
            }]
        }]
    },
    onLoad: function(e) {
        var o = this,
            a = this;
        // this.setData({
        //     spgg_save: t.globalData.spgg_save
        // })
        this.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode,
        })
        this.data.sycs = 99, console.log("sycs"), console.log(this.data.sycs);
        var d = wx.getStorageSync("show_lock") || "N";
        this.setData({
            windowWidth: wx.getSystemInfoSync().windowWidth,
            show_lock: d
        });
        var s = this.data.windowWidth - 10;
        s = 9 * parseInt(s / 9), this.setData({
            boxWidth: s,
            width: s / 3,
            minWidth: s / 9
        })


        wx.setStorageSync("show_lock", "N"), o.setData({
            jlsp_show_lock: "N",
            show_lock: "N",
            sel_img_type: "C",
            items: [{
                name: "A",
                value: "一图一格",
                checked: "false"
            }, {
                name: "B",
                value: "多图一格",
                checked: "false"
            }, {
                name: "C",
                value: "一图填满",
                checked: "true"
            }]
        });
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：", t.detail.value), console.log(t), this.data.sel_img_type = t.detail.value;
    },
    bindtap_yttm: function(t) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "完整观看视频后就能解锁一图填满",
            confirmText: "去解锁",
            cancelColor: "#D9D9D9",
            confirmColor: "#32CD32",
            success: function(t) {
                if (t.confirm) return console.log("用户点击确定"), void(i && (e.data.jlsp_show_lock = "Y",
                    i.load().then(function() {
                        return i.show();
                    }).catch(function(t) {
                        return console.log(t.errMsg);
                    })));
                t.cancel && console.log("用户点击取消");
            }
        });
    },
    selectTemplet: function(t) {
        var i = 0,
            e = 0,
            o = 0,
            a = t.currentTarget.id,
            d = this.data.templet[a],
            s = this.data.img_list;
        if (this.data.curr_templet != a) {
            for (i = 0; i < 9; i++)
                for (o = d.imgArray[i].img_count, s[i].id = (i + 1).toString(),
                    s[i].text = "0" + (i + 1).toString(), s[i].img_count = o, e = 0; e < 9; e++) s[i].img_arr[e].id = "0" + (i + 1).toString() + "0" + (e + 1).toString(),
                    s[i].img_arr[e].voided = d.imgArray[i].value[e], s[i].img_arr[e].url = "", s[i].img_arr[e].width = 0,
                    s[i].img_arr[e].height = 0;
            this.setData({
                curr_templet: a,
                img_list: s
            });
        }
    },
    input_number: function(t) {
        var i = t.detail.value;
        if (!(i < 0 && i > 99)) {
            var e = 0,
                o = 0,
                a = 0,
                d = 0,
                s = 0,
                l = this.data.img_list,
                h = new Array(),
                r = new Array(),
                g = "";
            for (h = ["000111101,101101101,101111000", "000010110,010010010,010111000", "000111001,001111100,100111000", "000111001,001111001,001111000", "000101101,101111001,001001000", "000111100,100111001,001111000", "000111100,100111101,101111000", "000111001,001001001,001001000", "000111101,101111101,101111000", "000111101,101111001,001111000"],
                e = 0; e < 9; e++)
                for (l[e].id = (e + 1).toString(), l[e].text = "0" + (e + 1).toString(),
                    l[e].img_count = 0, o = 0; o < 9; o++) l[e].img_arr[o].id = "0" + (e + 1).toString() + "0" + (o + 1).toString(),
                    l[e].img_arr[o].voided = 0, l[e].img_arr[o].url = "", l[e].img_arr[o].width = 0,
                    l[e].img_arr[o].height = 0;
            if (1 == i.toString().length) {
                for (r = h[i].split(","), e = 0; e < 9; e++)
                    if (e % 3 == 1)
                        for (o = 0; o < 9; o++) g = r[(e + 2) / 3 - 1].substring(o, o + 1),
                            l[e].img_arr[o].voided = g;
            } else {
                for (d = i.toString().substring(0, 1), s = i.toString().substring(1, 2), r = h[1 * d].split(","),
                    e = 0; e < 9; e++)
                    if (e % 3 == 0)
                        for (o = 0; o < 9; o++) g = r[e / 3].substring(o, o + 1),
                            (o + 1) % 3 == 0 ? l[e + 1].img_arr[o - 2].voided = g : l[e].img_arr[o + 1].voided = g;
                for (r = null, r = new Array(), r = h[1 * s].split(","), e = 0; e < 9; e++)
                    if ((e + 1) % 3 == 0)
                        for (o = 0; o < 9; o++) g = r[(e + 1) / 3 - 1].substring(o, o + 1),
                            o % 3 == 0 ? l[e - 1].img_arr[o + 2].voided = g : l[e].img_arr[o - 1].voided = g;
            }
            for (e = 0; e < 9; e++) {
                for (a = 0, o = 0; o < 9; o++) 1 == l[e].img_arr[o].voided && (a += 1);
                l[e].img_count = a;
            }
            this.setData({
                curr_templet: "",
                img_list: l
            });
        }
    },
    closeMask: function() {
        this.setData({
            maskFlag: !1
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            show_shouquan: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "爱心九宫格/数字九宫格",
            path: "/chart/pages/tools/axjgg/axjgg",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    MaxImgClick: function(t) {//图片检测
        var i = this,
            e = 0,
            o = 0,
            a = 0,
            d = 0,
            s = "",
            l = "",
            h = 0,
            r = 0,
            g = t.currentTarget.id,
            c = i.data.img_list[g - 1].img_count,
            n = i.data.img_list,
            u = "";
        c <= 0 || ("A" == i.data.sel_img_type ? wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album"],
            success: function(t) {
                s = t.tempFilePaths[e]
                
                check.checkimg(t.tempFilePaths[e],function(){
                    wx.getImageInfo({
                        src: t.tempFilePaths[e],
                        success: function(t) {
                            for (h = t.width, r = t.height, o = 0; o < 9; o++) 1 == n[g - 1].img_arr[o].voided && (n[g - 1].img_arr[o].url = s,
                                n[g - 1].img_arr[o].width = h, n[g - 1].img_arr[o].height = r);
                            i.setData({
                                img_list: n
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
        }) : "C" == i.data.sel_img_type ? wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album"],
            success: function(t) {
                s = t.tempFilePaths[e]
                check.checkimg(t.tempFilePaths[e],function(){
                    wx.getImageInfo({
                        src: t.tempFilePaths[e],
                        success: function(t) {
                            for (h = t.width, r = t.height, g = 1; g <= 9; g++)
                                for (o = 0; o < 9; o++) 1 == n[g - 1].img_arr[o].voided && (n[g - 1].img_arr[o].url = s,
                                    n[g - 1].img_arr[o].width = h, n[g - 1].img_arr[o].height = r);
                            i.setData({
                                img_list: n
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
        }) : (console.log(n), wx.showModal({
            title: "提示",
            content: "请选择 " + c + " 张照片",
            success: function(t) {
                t.confirm ? wx.chooseImage({
                    count: c,
                    sizeType: ["original", "compressed"],
                    sourceType: ["album"],
                    success: function(t) {
                        for (a = 0, u = t.tempFilePaths, e = 0; e < u.length; e++) s = u[e]
                        
                        check.checkimg(u[e],function(){
                            wx.getImageInfo({
                                src: u[e],
                                success: function(t) {
                                    for (h = t.width, r = t.height, l = t.path, o = a; o < 9; o++) a++, 1 == n[g - 1].img_arr[o].voided && (n[g - 1].img_arr[o].url = l,
                                        n[g - 1].img_arr[o].width = h, n[g - 1].img_arr[o].height = r, o = 10, console.log(a));
                                    (d += 1) == u.length && i.setData({
                                        img_list: n
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
                }) : console.log("用户点击取消");
            }
        })));
    },
    generate: function() {
        var t = this;
        t.setData({
            show_shouquan: !1
        }), wx.getSetting({
            success: function(i) {
                console.log("getSetting: success"), i.authSetting["scope.writePhotosAlbum"] ? (console.log("1-已经授权《保存图片》权限"),
                    t.saveImg()) : (console.log("1-没有授权《保存图片》权限"), wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        console.log("2-授权《保存图片》权限成功"), t.saveImg();
                    },
                    fail: function() {
                        console.log("2-授权《保存图片》权限失败"), wx.openSetting({
                            success: function(t) {
                                console.log("openSetting: success");
                            },
                            fail: function(i) {
                                console.log("openSetting: fail"), t.setData({
                                    show_shouquan: !0
                                });
                            }
                        });
                    }
                }));
            },
            fail: function(t) {
                console.log("getSetting: success"), console.log(t);
            }
        });
    },
    saveImg: function() {
        var t = this,
            e = 0,
            o = 0,
            a = 0,
            d = 0,
            s = 0,
            l = 0,
            h = 0,
            r = "",
            g = t.data.img_list,
            c = wx.createCanvasContext("myCanvas_A"),
            n = 3 * t.data.width,
            u = 3 * t.data.minWidth,
            m = this.data.sycs,
            _ = this.data.ts;
        //判断视频广告
        for (t.data.ts = 0, console.log("继续保存中"), wx.showLoading({
                title: "绘制中..."
            }), c.setFillStyle(t.data.bg_color), c.fillRect(0, 0, 3 * n, 3 * n), e = 0; e < 9; e++)
            for (console.log("循环大方块" + e.toString()),
                o = 0; o < 9; o++) a = g[e].img_arr[o].voided, console.log("循环小方框" + o.toString()),
                console.log("voiede" + a.toString()), 1 == a && (r = g[e].img_arr[o].url, d = n * (e % 3) + u * (o % 3),
                    s = n * Math.floor(e / 3) + u * Math.floor(o / 3), c.save(), c.beginPath(), c.setLineWidth(0),
                    c.rect(d, s, u, u), c.clip(), (l = g[e].img_arr[o].width) == (h = g[e].img_arr[o].height) ? (l = u,
                        h = u) : l > h ? d -= ((l = l / h * u) - (h = u)) / 2 : s -= ((h = h / l * u) - (l = u)) / 2,
                    c.drawImage(r, d, s, l, h), c.restore());
        console.log("test"), c.draw(!1, function(i) {
            console.log("绘制完成？"), wx.showLoading({
                title: "保存中."
            }), setTimeout(function() {
                var i = 3 * t.data.width * 3;
                console.log("绘制完成2"), wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: i,
                    height: i,
                    destWidth: i,
                    destHeight: i,
                    canvasId: "myCanvas_A",
                    success: function(i) {
                        var e = i.tempFilePath;
                        console.log(e, "o11"), wx.showLoading({
                            title: "保存中.."
                        }), wx.saveImageToPhotosAlbum({
                            filePath: e,
                            success: function() {
                                wx.hideLoading({
                                    complete: function(t) {}
                                }), t.setData({
                                    maskFlag: !0
                                });
                            }
                        });
                    }
                });
            }, 1e3);
        });
        //看视频广告

    },
    loopSaveImg2: function(t) {
        var i, e, o, a, d = this,
            s = 3 * d.data.width;
        a = 3 * s, i = (t - 1) % 3 * (o = s), e = Math.floor((t - 1) / 3) * o, wx.canvasToTempFilePath({
            x: i,
            y: e,
            width: o,
            height: o,
            destWidth: a,
            destHeight: a,
            fileType: "jpg",
            canvasId: "myCanvas_A",
            success: function(i) {
                wx.saveImageToPhotosAlbum({
                    filePath: i.tempFilePath,
                    success: function(i) {
                        9 == t ? d.saveMaxImage() : (t += 1, d.loopSaveImg2(t));
                    },
                    fail: function(t) {}
                });
            }
        });
    },
    saveMaxImage: function() {
        var t = this,
            i = 3 * t.data.width * 3;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: i,
            height: i,
            destWidth: 3 * i,
            destHeight: 3 * i,
            canvasId: "myCanvas_A",
            success: function(i) {
                wx.saveImageToPhotosAlbum({
                    filePath: i.tempFilePath,
                    success: function(i) {
                        wx.hideLoading(), t.setData({
                            maskFlag: !0
                        }), "1" == t.data.show_jlgg && (sycs -= 1, sycs <= 0 && (sycs = 0), t.setData({
                            sycs: 99
                        }), wx.setStorageSync("sycs", sycs), console.log(sycs)), t.setData({
                            is_save: 0
                        });
                    },
                    fail: function(t) {}
                });
            }
        });
    },
    setColor: function(t) {
        this.setData({
            showSetColor: !0
        });
    },
    clossSetColor: function(t) {
        this.setData({
            showSetColor: !1
        });
    },
    set_color: function(t) {
        var i = t.currentTarget.id,
            e = this.data.color_list;
        this.setData({
            bg_color: e[i - 1].color
        });
    },
    sliderRchange: function(t) {
        var i, e = t.detail.value.toString();
        i = "rgb(" + e + "," + this.data.bg_color_g + "," + this.data.bg_color_b + ")",
            this.setData({
                bg_color: i,
                bg_color_r: e
            });
    },
    sliderGchange: function(t) {
        var i, e = this.data.bg_color_r,
            o = t.detail.value.toString();
        i = "rgb(" + e + "," + o + "," + this.data.bg_color_b + ")", this.setData({
            bg_color: i,
            bg_color_g: o
        });
    },
    sliderBchange: function(t) {
        var i, e = this.data.bg_color_r,
            o = this.data.bg_color_g,
            a = t.detail.value.toString();
        i = "rgb(" + e + "," + o + "," + a + ")", this.setData({
            bg_color: i,
            bg_color_b: a
        });
    }
});