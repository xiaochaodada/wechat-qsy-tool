function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, i = e.getDate(), r = e.getHours(), a = e.getMinutes(), l = e.getSeconds();
        return [ n, o, i ].map(t).join("/") + " " + [ r, a, l ].map(t).join(":");
    },
    alertViewWithCancel: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "提示", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "消息提示", n = (arguments[2], 
        arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "true");
        wx.showModal({
            title: t,
            content: e,
            showCancel: n
        });
    }
};