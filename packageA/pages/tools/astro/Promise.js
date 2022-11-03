var t, e = require("../../../../wordclooud/js/interopRequireDefault")(require("../../../../wordclooud/js/typeof")), n = "function" == typeof Symbol && "symbol" == (0, 
e.default)(Symbol.iterator) ? function(t) {
    return (0, e.default)(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : (0, 
    e.default)(t);
};

t = function() {
    function t(t) {
        return "function" == typeof t || "object" == (void 0 === t ? "undefined" : n(t)) && null !== t;
    }
    function e(t) {
        return "function" == typeof t;
    }
    function r() {
        var t = setTimeout;
        return function() {
            return t(o, 1);
        };
    }
    function o() {
        for (var t = 0; t < A; t += 2) (0, O[t])(O[t + 1]), O[t] = void 0, O[t + 1] = void 0;
        A = 0;
    }
    function i(t, e) {
        var n = arguments, r = this, o = new this.constructor(u);
        void 0 === o[Y] && m(o);
        var i = r._state;
        return i ? function() {
            var t = n[i - 1];
            E(function() {
                return y(i, o, t, r._result);
            });
        }() : p(r, o, t, e), o;
    }
    function s(t) {
        if (t && "object" == (void 0 === t ? "undefined" : n(t)) && t.constructor === this) return t;
        var e = new this(u);
        return f(e, t), e;
    }
    function u() {}
    function c(t) {
        try {
            return t.then;
        } catch (t) {
            return K.error = t, K;
        }
    }
    function a(t, n, r) {
        n.constructor === t.constructor && r === i && n.constructor.resolve === s ? function(t, e) {
            e._state === D ? h(t, e._result) : e._state === F ? d(t, e._result) : p(e, void 0, function(e) {
                return f(t, e);
            }, function(e) {
                return d(t, e);
            });
        }(t, n) : r === K ? d(t, K.error) : void 0 === r ? h(t, n) : e(r) ? function(t, e, n) {
            E(function(t) {
                var r = !1, o = function(t, e, n, r) {
                    try {
                        t.call(e, n, r);
                    } catch (t) {
                        return t;
                    }
                }(n, e, function(n) {
                    r || (r = !0, e !== n ? f(t, n) : h(t, n));
                }, function(e) {
                    r || (r = !0, d(t, e));
                }, t._label);
                !r && o && (r = !0, d(t, o));
            }, t);
        }(t, n, r) : h(t, n);
    }
    function f(e, n) {
        e === n ? d(e, new TypeError("You cannot resolve a promise with itself")) : t(n) ? a(e, n, c(n)) : h(e, n);
    }
    function l(t) {
        t._onerror && t._onerror(t._result), v(t);
    }
    function h(t, e) {
        t._state === k && (t._result = e, t._state = D, 0 !== t._subscribers.length && E(v, t));
    }
    function d(t, e) {
        t._state === k && (t._state = F, t._result = e, E(l, t));
    }
    function p(t, e, n, r) {
        var o = t._subscribers, i = o.length;
        t._onerror = null, o[i] = e, o[i + D] = n, o[i + F] = r, 0 === i && t._state && E(v, t);
    }
    function v(t) {
        var e = t._subscribers, n = t._state;
        if (0 !== e.length) {
            for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3) r = e[s], 
            o = e[s + n], r ? y(n, r, o, i) : o(i);
            t._subscribers.length = 0;
        }
    }
    function _() {
        this.error = null;
    }
    function y(t, n, r, o) {
        var i = e(r), s = void 0, u = void 0, c = void 0, a = void 0;
        if (i) {
            if ((s = function(t, e) {
                try {
                    return t(e);
                } catch (t) {
                    return L.error = t, L;
                }
            }(r, o)) === L ? (a = !0, u = s.error, s = null) : c = !0, n === s) return void d(n, new TypeError("A promises callback cannot return that same promise."));
        } else s = o, c = !0;
        n._state !== k || (i && c ? f(n, s) : a ? d(n, u) : t === D ? h(n, s) : t === F && d(n, s));
    }
    function m(t) {
        t[Y] = N++, t._state = void 0, t._result = void 0, t._subscribers = [];
    }
    function b(t, e) {
        this._instanceConstructor = t, this.promise = new t(u), this.promise[Y] || m(this.promise), 
        g(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 
        0 === this.length ? h(this.promise, this._result) : (this.length = this.length || 0, 
        this._enumerate(), 0 === this._remaining && h(this.promise, this._result))) : d(this.promise, new Error("Array Methods must be provided an Array"));
    }
    function w(t) {
        this[Y] = N++, this._result = this._state = void 0, this._subscribers = [], u !== t && ("function" != typeof t && function() {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
        }(), this instanceof w ? function(t, e) {
            try {
                e(function(e) {
                    f(t, e);
                }, function(e) {
                    d(t, e);
                });
            } catch (e) {
                d(t, e);
            }
        }(this, t) : function() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }());
    }
    var g = Array.isArray ? Array.isArray : function(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    }, A = 0, S = void 0, j = void 0, E = function(t, e) {
        O[A] = t, O[A + 1] = e, 2 === (A += 2) && (j ? j(o) : q());
    }, T = "undefined" != typeof window ? window : void 0, x = T || {}, M = x.MutationObserver || x.WebKitMutationObserver, P = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process), C = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, O = new Array(1e3), q = void 0;
    q = P ? function() {
        return process.nextTick(o);
    } : M ? function() {
        var t = 0, e = new M(o), n = document.createTextNode("");
        return e.observe(n, {
            characterData: !0
        }), function() {
            n.data = t = ++t % 2;
        };
    }() : C ? function() {
        var t = new MessageChannel();
        return t.port1.onmessage = o, function() {
            return t.port2.postMessage(0);
        };
    }() : void 0 === T && "function" == typeof require ? function() {
        try {
            var t = require("vertx");
            return void 0 !== (S = t.runOnLoop || t.runOnContext) ? function() {
                S(o);
            } : r();
        } catch (t) {
            return r();
        }
    }() : r();
    var Y = Math.random().toString(36).substring(16), k = void 0, D = 1, F = 2, K = new _(), L = new _(), N = 0;
    return b.prototype._enumerate = function() {
        for (var t = this.length, e = this._input, n = 0; this._state === k && n < t; n++) this._eachEntry(e[n], n);
    }, b.prototype._eachEntry = function(t, e) {
        var n = this._instanceConstructor, r = n.resolve;
        if (r === s) {
            var o = c(t);
            if (o === i && t._state !== k) this._settledAt(t._state, e, t._result); else if ("function" != typeof o) this._remaining--, 
            this._result[e] = t; else if (n === w) {
                var f = new n(u);
                a(f, t, o), this._willSettleAt(f, e);
            } else this._willSettleAt(new n(function(e) {
                return e(t);
            }), e);
        } else this._willSettleAt(r(t), e);
    }, b.prototype._settledAt = function(t, e, n) {
        var r = this.promise;
        r._state === k && (this._remaining--, t === F ? d(r, n) : this._result[e] = n), 
        0 === this._remaining && h(r, this._result);
    }, b.prototype._willSettleAt = function(t, e) {
        var n = this;
        p(t, void 0, function(t) {
            return n._settledAt(D, e, t);
        }, function(t) {
            return n._settledAt(F, e, t);
        });
    }, w.all = function(t) {
        return new b(this, t).promise;
    }, w.race = function(t) {
        var e = this;
        return new e(g(t) ? function(n, r) {
            for (var o = t.length, i = 0; i < o; i++) e.resolve(t[i]).then(n, r);
        } : function(t, e) {
            return e(new TypeError("You must pass an array to race."));
        });
    }, w.resolve = s, w.reject = function(t) {
        var e = new this(u);
        return d(e, t), e;
    }, w._setScheduler = function(t) {
        j = t;
    }, w._setAsap = function(t) {
        E = t;
    }, w._asap = E, w.prototype = {
        constructor: w,
        then: i,
        catch: function(t) {
            return this.then(null, t);
        }
    }, w.polyfill = function() {
        var t = void 0;
        if ("undefined" != typeof global) t = global; else if ("undefined" != typeof self) t = self; else try {
            t = Function("return this")();
        } catch (t) {
            throw new Error("polyfill failed because global object is unavailable in this environment");
        }
        var e = t.Promise;
        if (e) {
            var n = null;
            try {
                n = Object.prototype.toString.call(e.resolve());
            } catch (t) {}
            if ("[object Promise]" === n && !e.cast) return;
        }
        t.Promise = w;
    }, w.Promise = w, w;
}, "object" == ("undefined" == typeof exports ? "undefined" : n(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (void 0).ES6Promise = t();