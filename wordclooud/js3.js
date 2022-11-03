(global.webpackJsonp = global.webpackJsonp || []).push([ [ "common/main" ], {
    "115c": function(n, o, e) {
        e.r(o);
        var u = e("9b53");
        for (var t in u) "default" !== t && function(n) {
            e.d(o, n, function() {
                return u[n];
            });
        }(t);
        e("860e");
        var c = e("2877"), a = Object(c.a)(u.default, void 0, void 0, !1, null, null, null);
        o.default = a.exports;
    },
    "71d0": function(n, o, e) {},
    "7b1d": function(n, o, e) {
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0;
        var u = {
            onLaunch: function() {
                console.log("App Launch");
            },
            onShow: function() {
                console.log("App Show");
            },
            onHide: function() {
                console.log("App Hide");
            }
        };
        o.default = u;
    },
    "860e": function(n, o, e) {
        var u = e("71d0");
        e.n(u).a;
    },
    "9b53": function(n, o, e) {
        e.r(o);
        var u = e("7b1d"), t = e.n(u);
        for (var c in u) "default" !== c && function(n) {
            e.d(o, n, function() {
                return u[n];
            });
        }(c);
        o.default = t.a;
    }
}, [ [ "e817", "common/runtime", "common/vendor" ] ] ]);