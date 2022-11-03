var e = require("../../utils/network.js");

Component({
    properties: {
        data: {
            type: Object,
            value: {}
        },
        img_file: {
            type: String,
            value: ""
        },
        img_path: {
            type: String,
            value: ""
        }
    },
    data: {
        filter_type: {
            name: "滤镜",
            value: "",
            index: 0,
            filterList: [ {
                label: "请选择",
                value: ""
            }, {
                label: "黑白",
                value: "black_white"
            }, {
                label: "平静",
                value: "calm"
            }, {
                label: "晴天",
                value: "sunny"
            }, {
                label: "旅程",
                value: "trip"
            }, {
                label: "美肤",
                value: "beautify"
            }, {
                label: "王家卫",
                value: "wangjiawei"
            }, {
                label: "唯美",
                value: "cutie"
            }, {
                label: "可人儿",
                value: "macaron"
            }, {
                label: "纽约",
                value: "new_york"
            }, {
                label: "樱花",
                value: "sakura"
            }, {
                label: "十七岁",
                value: "17_years_old"
            }, {
                label: "柔光灯",
                value: "clight"
            }, {
                label: "下午茶",
                value: "tea_time"
            }, {
                label: "亮肤",
                value: "whiten"
            }, {
                label: "卓别林",
                value: "chaplin"
            }, {
                label: "花香",
                value: "flowers"
            }, {
                label: "回忆",
                value: "memory"
            }, {
                label: "冰美人",
                value: "ice_lady"
            }, {
                label: "巴黎",
                value: "paris"
            }, {
                label: "时光",
                value: "times"
            }, {
                label: "LOMO",
                value: "lomo"
            }, {
                label: "旧时光",
                value: "old_times"
            }, {
                label: "早春",
                value: "spring"
            }, {
                label: "故事",
                value: "story"
            }, {
                label: "阿宝色",
                value: "abao"
            }, {
                label: "补光灯",
                value: "wlight"
            }, {
                label: "暖暖",
                value: "warm"
            }, {
                label: "绚烂",
                value: "glitter"
            }, {
                label: "薰衣草",
                value: "lavender"
            }, {
                label: "香奈儿",
                value: "chanel"
            }, {
                label: "布拉格",
                value: "prague"
            }, {
                label: "旧梦",
                value: "old_dream"
            }, {
                label: "桃花",
                value: "blossom"
            }, {
                label: "粉黛",
                value: "pink"
            }, {
                label: "江南",
                value: "jiang_nan"
            } ]
        },
        setting: {
            whitening: {
                name: "美白",
                value: 50
            },
            smoothing: {
                name: "磨皮",
                value: 50
            },
            thinface: {
                name: "瘦脸",
                value: 50
            },
            shrink_face: {
                name: "小脸",
                value: 50
            },
            enlarge_eye: {
                name: "大眼",
                value: 50
            },
            remove_eyebrow: {
                name: "去眉毛",
                value: 50
            }
        }
    },
    methods: {
        onChange: function(e) {
            var a = e.currentTarget.id, l = e.detail.value, t = this.data.setting;
            t[a].value = l, this.setData({
                setting: t
            }), this.request();
        },
        preImg: function() {
            wx.previewImage({
                urls: [ "data:image/jpeg;base64," + this.data.img_file ]
            });
        },
        onFilterChange: function(e) {
            var a = e.detail.value, l = this.data.filter_type;
            l.index = a, this.setData({
                filter_type: l
            }), this.request();
        },
        request: function() {
            var a = this, l = {};
            for (var t in this.data.setting) l[t] = this.data.setting[t].value;
            var i = this.data.filter_type;
            l.filter_type = i.filterList[i.index].value, l.success = function(e) {
                a.setData({
                    img_file: e.result
                });
            }, l.img_path = this.data.img_path, e.network.beautify(l);
        }
    }
});