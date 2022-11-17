// webgl.js - r0 - plain javaScript webgl test tools based on the threejs JSM module found
// at : https://github.com/mrdoob/three.js/blob/r146/examples/jsm/capabilities/WebGL.js
const WebGL = {};
// can the client use WEBGL1
WebGL.isWebGL = function () {
    try {
        var canvas = document.createElement('canvas');
        return !!(window['WebGLRenderingContext'] &&
        (canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
};
// can the client use WEBGL2
WebGL.isWebGL2 = function () {
    try {
        const canvas = document.createElement( 'canvas' );
        return !! ( window.WebGL2RenderingContext && canvas.getContext( 'webgl2' ) );
    } catch ( e ) {
        return false;
    }
};
