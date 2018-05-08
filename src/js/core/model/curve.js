function Curve(opt) {
    CS(this, opt);
    defineValue(this, "bx", NaN);
    defineValue(this, "by", NaN);
    defineValue(this, "ex", NaN);
    defineValue(this, "ey", NaN);
}
CE(Curve, Entity);

Object.defineProperties(Curve.prototype, {
    begin: {
        get: function () {
            return {x: this.bx, y: this.by};
        }, set: function (v) {
            this.bx = v.x, this.by = v.y;
        }
    }, end: {
        get: function () {
            return {x: this.ex, y: this.ey};
        }, set: function (v) {
            this.ex = v.x, this.ey = v.y;
        }
    }
});
Object.assign(Curve.prototype, {
    getPolygon: function () {
        return [];
    },
    isValid: function () {
        return isFinite(this.bx) && isFinite(this.by) && isFinite(this.ex) && isFinite(this.ey);
    },
    getLength: function () {
        return NaN;
    }
});

