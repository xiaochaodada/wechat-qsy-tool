var t = require("api"),
    a = require("util");
var app = getApp();

Page({
    data: {
        astroDetailInfo: {},
        astroDetailData: {},
        tabActiveList: [{
            active: !0,
            day: "今天"
        }, {
            active: !1,
            day: "明天"
        }, {
            active: !1,
            day: "本周"
        }, {
            active: !1,
            day: "本月"
        }, {
            active: !1,
            day: "年度"
        }],
        showAstroList: !1,
        comAstro: [
            ["aries", "白羊座", "3.21-4.19", "火"],
            ["taurus", "金牛座", "4.20-5.20", "土"],
            ["gemini", "双子座", "5.21-6.21", "风"],
            ["cancer", "巨蟹座", "6.22-7.22", "水"],
            ["leo", "狮子座", "7.23-8.22", "火"],
            ["virgo", "处女座", "8.23-9.22", "土"],
            ["libra", "天秤座", "9.23-10.23", "风"],
            ["scorpio", "天蝎座", "10.24-11.22", "水"],
            ["sagittarius", "射手座", "11.23-12.21", "火"],
            ["capricorn", "摩羯座", "12.22-1.19", "土"],
            ["aquarius", "水瓶座", "1.20-2.18", "风"],
            ["pisces", "双鱼座", "2.19-3.20", "水"]
        ],
        tabIndex: 1
    },
    title: "",
    desc: "",
    isQuerying: !1,
    dateNow: new Date(),
    astroUrl: app.globalData.tonyon + "/api/WeChat/user/tools/xz.php",
    astroName: "aries",
    onLoad: function(t) {
        var a = this;
        this.astroName = t.name && t.name.length > 0 ? t.name : "aries", console.log(this.astroName),
            this.data.comAstro.forEach(function(t) {
                t[4] = t[0] === a.astroName;
            }), this.initAstroData(this.astroName);

        a.setData({
            config: app.globalData.config_base_list,
            mode: app.globalData.mode
        })
    },
    onUnload: function() {
        var t = getCurrentPages(),
            a = t[t.length - 2];
        console.log(a);
    },
    initAstroData: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        this.setData({
            comAstro: this.data.comAstro,
            astroDetailInfo: this.getAstroCnameDate(t)
        }), this.getAstroInfo(t, a);
    },
    onShareAppMessage: function() {
        return {
            title: this.title,
            path: "/packageA/pages/tools/astro/index?name=" + this.astroName
        };
    },
    switchAstro: function(t) {
        var a = t.currentTarget.dataset.index,
            e = t.currentTarget.dataset.name;
        this.data.comAstro[a][4] || (this.data.comAstro.forEach(function(t) {
                t[4] = t[0] === e;
            }), this.setData({
                comAstro: this.data.comAstro,
                tabActiveList: this.data.tabActiveList
            }), this.astroName = e, this.initAstroData(this.astroName, this.data.tabIndex),
            this.toggleAstro());
    },
    toggleAstro: function() {
        this.setData({
            showAstroList: !this.data.showAstroList
        });
    },
    catchmove: function() {},
    getAstroCnameDate: function(t) {
        for (var a = {}, e = 0; e < this.data.comAstro.length; e++)
            if (this.data.comAstro[e][0] === t) return a.img = "astro-icon/xzxq-" + t + "-icon@3x.png",
                a.backImage = "astro-icon/xzxq-" + t + "-img@3x.png", a.eName = this.data.comAstro[e][0].toUpperCase(),
                a.cName = this.data.comAstro[e][1], a.cDate = this.data.comAstro[e][2], a.name = t,
                a.astroType = this.data.comAstro[e][3] + "象星座", a;
    },
    tabItemTap: function(t) {
        var a = parseInt(t.currentTarget.dataset.index, 10);
        this.data.tabActiveList[a].active || this.isQuerying || (this.isQuerying = !0, this.data.tabActiveList.forEach(function(t, e) {
            t.active = e === a;
        }), this.setData({
            tabActiveList: this.data.tabActiveList,
            tabIndex: a + 1
        }), this.getAstroInfo(this.astroName, a + 1));
    },
    getAstroInfo: function(a, e) {
        var s = this;
        t.getStorage({
            key: "wnl_astrodata"
        }).then(function(r) {
            var o = s.dateNow.getTime(),
                i = r.data.time;
            if (a !== r.data.astroName || a === r.data.astroName && o - i >= 18e5) s.getAstroInfoServer(a, e);
            else {
                r.data.data.week.luck || r.data.data.week.beware || (r.data.data.week.luck = s.getRandomAstro(),
                    r.data.data.week.beware = s.getRandomAstro(r.data.data.week.luck), t.setStorage({
                        key: "wnl_astrodata",
                        data: r.data
                    }));
                var n = s.getAstroData(r.data, e);
                s.setData({
                    astroDetailData: n
                }), s.setShareData(n), s.isQuerying = !1;
            }
        }, function() {
            s.getAstroInfoServer(a, e);
        });
    },
    getAstroInfoServer: function(a, e) {
        wx.showLoading({
            title: "获取中"
        })
        var s = this;
        wx.login({
            success: function(res) {
                t.request({
                    url: s.astroUrl,
                    method: "POST",
                    data: {
                        name: a,
                        code: res.code,
                        appid: app.globalData.appid
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    }
                }).then(function(r) {
                    if (200 === parseInt(r.statusCode, 10) && "" !== r.data) {
                        wx.hideLoading()
                        r.data.data.week.luck || r.data.data.week.beware || (r.data.data.week.luck = s.getRandomAstro(),
                            r.data.data.week.beware = s.getRandomAstro(r.data.data.week.luck));
                        var o = s.getAstroData(r.data, e);
                        s.setData({
                                astroDetailData: o
                            }), r.data.astroName = a, r.data.time = new Date().getTime(), s.setShareData(o),
                            t.setStorage({
                                key: "wnl_astrodata",
                                data: r.data
                            });
                    }
                    s.isQuerying = !1;
                }, function() {
                    s.isQuerying = !1;
                });
            },
            fail: function() {

            }
        })
    },
    setShareData: function(t) {
        this.title = "今日" + this.data.astroDetailInfo.cName + "\n\t\t综合运势" + t.zhys + "星，爱情运势" + t.aqys + "星，\n\t\t事业运势" + t.gzzt + "星，财富运势" + t.lctz + "星";
    },
    getAstroData: function(t, e) {
        var s = {},
            r = this.dateNow.getDay(),
            o = this.dateNow.getMonth(),
            i = this.dateNow.getFullYear(),
            n = this.dateNow.getDate(),
            d = new Date(i, o, n);
        d.setDate(d.getDate() + 1);
        var c = new Date(i, o, n - r),
            h = new Date(i, o, n + (6 - r));
        switch (e) {
            case 1:
                (s = t.data.today).dateString = a.formatDate(this.dateNow, "M.dd") + " " + this.getNowWeek(r);
                break;

            case 2:
                (s = t.data.tomorrow).dateString = a.formatDate(d, "M.dd") + " " + this.getNowWeek(r + 1);
                break;

            case 3:
                (s = t.data.week).dateString = a.formatDate(c, "M.dd") + "-" + a.formatDate(h, "M.dd");
                break;

            case 4:
                (s = t.data.month).dateString = a.formatDate(this.dateNow, "M月");
                break;

            case 5:
                (s = t.data.year).dateString = i + "年";
        }
        return s.stzs && (s.stzs = parseInt(s.stzs, 10)), s;
    },
    getRandomAstro: function(t) {
        var a = this.data.comAstro[Math.floor(12 * Math.random())][1];
        return t === a ? this.getRandomAstro(t) : a;
    },
    getNowWeek: function(t) {
        var a = "";
        switch (t) {
            case 0:
                a = "周日";
                break;

            case 1:
                a = "周一";
                break;

            case 2:
                a = "周二";
                break;

            case 3:
                a = "周三";
                break;

            case 4:
                a = "周四";
                break;

            case 5:
                a = "周五";
                break;

            case 6:
                a = "周六";
        }
        return a;
    }
});