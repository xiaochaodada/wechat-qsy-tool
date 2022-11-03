var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, t = function(e) {
    wx.request({
        url: e
    });
};

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), o = t.getMonth() + 1, i = t.getDate(), r = t.getHours(), u = t.getMinutes(), c = t.getSeconds();
        return [ n, o, i ].map(e).join("/") + " " + [ r, u, c ].map(e).join(":");
    },
    sendLog: function(e, n, o) {
        var i = 7, r = new Date().getTime(), u = [], c = wx.getSystemInfoSync();
        if (n = n || 13, o = o || 1e5, /iPhone/.test(c.model) ? i = 6 : /iPad/.test(c.model) && (i = 5), 
        e) {
            if (u = [ "https://wkctj.baidu.com/click.gif?pid=1&bid=" + n + "&fr=" + i + "&act_id=" + o, "url=" + encodeURIComponent("http://wkna-mini-app.baidu.com?ie=utf-8"), "t=" + r, "refer=" ], 
            e) for (var m in e) e.hasOwnProperty(m) && u.push(m + "=" + encodeURIComponent(e[m]));
            t(u.join("&"));
        }
    },
    checkFileSize: function(e, t) {
        return e.some(function(e) {
            return e.size > t && (wx.showToast({
                icon: "none",
                title: "图片大小不能超过10M",
                mask: !0
            }), !0);
        });
    }
};