var isWebGL = function (ctxNum) {
    ctxNum = ctxNum === undefined ? '' : ctxNum;
    try {
        var canvas = document.createElement('canvas');
        return !!(window['WebGL' + ctxNum + 'RenderingContext'] &&
            (canvas.getContext('webgl' + ctxNum) ||
                canvas.getContext('experimental-webgl' + ctxNum)));
    } catch (e) {
        return false;
    }
};
