Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.$generateRandom = function(r) {
    for (var e = [], t = 0; t < r; t++) e.push(t);
    return e.sort(function() {
        return Math.random() - Math.random();
    }), e.slice(Math.floor(Math.random() * r))[0];
};