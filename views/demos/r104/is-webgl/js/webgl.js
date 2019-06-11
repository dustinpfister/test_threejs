var isWebGL = function (ctxNum) {
    try {
        var canvas = document.createElement('canvas');
        return !!(window['WebGLRenderingContext'] &&
        (canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
};


/*
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
*/