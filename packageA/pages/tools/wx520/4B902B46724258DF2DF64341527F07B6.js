var r = function(r) {
    switch (r) {
      case 0:
        return n();

      case 1:
        return t();

      case 2:
        return e();

      case 3:
        return u();

      case 4:
        return c();

      case 5:
        return a();

      case 6:
        return o();

      case 7:
        return s();

      case 8:
        return f();

      case 9:
        return i();

      default:
        return n();
    }
}, n = function() {
    var r = [];
    return r[0] = [ 0, 1, 1, 1 ], r[1] = [ 0, 1, 0, 1 ], r[2] = [ 0, 1, 0, 1 ], r[3] = [ 0, 1, 0, 1 ], 
    r[4] = [ 0, 1, 1, 1 ], r;
}, t = function() {
    var r = [];
    return r[0] = [ 0, 1 ], r[1] = [ 0, 1 ], r[2] = [ 0, 1 ], r[3] = [ 0, 1 ], r[4] = [ 0, 1 ], 
    r;
}, e = function() {
    var r = [];
    return r[0] = [ 0, 1, 1, 1 ], r[1] = [ 0, 0, 0, 1 ], r[2] = [ 0, 1, 1, 1 ], r[3] = [ 0, 1, 0, 0 ], 
    r[4] = [ 0, 1, 1, 1 ], r;
}, u = function() {
    var r = [];
    return r[0] = [ 0, 1, 1, 1 ], r[1] = [ 0, 0, 0, 1 ], r[2] = [ 0, 1, 1, 1 ], r[3] = [ 0, 0, 0, 1 ], 
    r[4] = [ 0, 1, 1, 1 ], r;
}, c = function() {
    var r = [];
    return r[0] = [ 0, 1, 0, 1 ], r[1] = [ 0, 1, 0, 1 ], r[2] = [ 0, 1, 1, 1 ], r[3] = [ 0, 0, 0, 1 ], 
    r[4] = [ 0, 0, 0, 1 ], r;
}, a = function() {
    var r = [];
    return r[0] = [ 0, 1, 1, 1 ], r[1] = [ 0, 1, 0, 0 ], r[2] = [ 0, 1, 1, 1 ], r[3] = [ 0, 0, 0, 1 ], 
    r[4] = [ 0, 1, 1, 1 ], r;
}, o = function() {
    var r = [];
    return r[0] = [ 0, 1, 1, 1 ], r[1] = [ 0, 1, 0, 0 ], r[2] = [ 0, 1, 1, 1 ], r[3] = [ 0, 1, 0, 1 ], 
    r[4] = [ 0, 1, 1, 1 ], r;
}, s = function() {
    var r = [];
    return r[0] = [ 0, 1, 1, 1 ], r[1] = [ 0, 0, 0, 1 ], r[2] = [ 0, 0, 0, 1 ], r[3] = [ 0, 0, 0, 1 ], 
    r[4] = [ 0, 0, 0, 1 ], r;
}, f = function() {
    var r = [];
    return r[0] = [ 0, 1, 1, 1 ], r[1] = [ 0, 1, 0, 1 ], r[2] = [ 0, 1, 1, 1 ], r[3] = [ 0, 1, 0, 1 ], 
    r[4] = [ 0, 1, 1, 1 ], r;
}, i = function() {
    var r = [];
    return r[0] = [ 0, 1, 1, 1 ], r[1] = [ 0, 1, 0, 1 ], r[2] = [ 0, 1, 1, 1 ], r[3] = [ 0, 0, 0, 1 ], 
    r[4] = [ 0, 1, 1, 1 ], r;
};

module.exports = {
    convert1: function(n) {
        n || (n = "520");
        for (var t = [], e = 0; e < n.length; e++) {
            var u = Number(n[e]), c = r(u);
            t.push(c);
        }
        return t;
    }
};