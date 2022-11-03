module.exports.isEmojiCharacter = function(r) {
    for (var e = 0; e < r.length; e++) {
        var t = r.charCodeAt(e);
        if (55296 <= t && t <= 56319) {
            if (r.length > 1) {
                var i = 1024 * (t - 55296) + ((n = r.charCodeAt(e + 1)) - 56320) + 65536;
                if (118784 <= i && i <= 128895) return !0;
            }
        } else if (r.length > 1) {
            var n = r.charCodeAt(e + 1);
            if (8419 == n) return !0;
        } else {
            if (8448 <= t && t <= 10239) return !0;
            if (11013 <= t && t <= 11015) return !0;
            if (10548 <= t && t <= 10549) return !0;
            if (12951 <= t && t <= 12953) return !0;
            if (12349 == t || 12336 == t || 11093 == t || 11036 == t || 11035 == t || 11088 == t) return !0;
        }
    }
    return !1;
};