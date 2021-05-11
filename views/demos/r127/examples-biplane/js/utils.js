
var utils = {};

utils.pi2 = Math.PI * 2;

utils.getPerValues = function (frame, maxFrame, base) {
    frame = frame === undefined ? 0 : frame;
    maxFrame = maxFrame === undefined ? 100 : maxFrame;
    base = base || 2;
    var per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    return {
        frame: frame,
        maxFrame: maxFrame,
        fps: 30,
        per: per,
        bias: bias,
        base: base,
        biasLog: Math.log(1 + bias * (base - 1)) / Math.log(base)
    };
};

// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};

utils.normalizeRadian = function (radian) {
    return utils.mod(radian, utils.pi2);
};
