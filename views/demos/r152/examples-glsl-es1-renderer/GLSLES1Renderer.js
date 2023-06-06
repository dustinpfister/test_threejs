import { Vector4 } from 'three';

// create a canvas element if none is given
function createCanvasElement() {
    const canvas = document.createElement( 'canvas' );
    canvas.style.display = 'block';
    return canvas;
}

// looking at r152 source code of WebGlrenderer as a guide
// https://github.com/mrdoob/three.js/blob/r152/src/renderers/WebGLRenderer.js
class GLSLES1Renderer {

    constructor( parameters = {} ) {

        const {
            canvas = createCanvasElement(),
            context = null
        } = parameters;

        this.domElement = canvas;

        let _width = canvas.width;
        let _height = canvas.height;
        let _pixelRatio = 1;

        const _viewport = new Vector4( 0, 0, _width, _height );

        let _gl = context;

        if(_gl === null){
           _gl = canvas.getContext( 'webgl', { } );
        }

        let state;

        this.getContext = function () {
            return _gl;
        };

        this.setSize = function ( width, height, updateStyle ) {
            _width = width;
            _height = height;
            canvas.width = Math.floor( width * _pixelRatio );
            canvas.height = Math.floor( height * _pixelRatio );
            if ( updateStyle === true ) {
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
            }
            this.setViewport( 0, 0, width, height );
        };

        this.setViewport = function ( x, y, width, height ) {
             if ( x.isVector4 ) {
                 _viewport.set( x.x, x.y, x.z, x.w );
             } else {
                 _viewport.set( x, y, width, height );
             }
             _gl.viewport( _viewport.x, _viewport.y, _viewport.z, _viewport.w );
        };

    }

};

export { GLSLES1Renderer };