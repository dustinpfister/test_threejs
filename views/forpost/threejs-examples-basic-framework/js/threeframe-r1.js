// threeframe.js - r1 - from threejs-examples-basic-framework
(function (threeFrame) {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // no operation
    const NOOP = function(){};
    // create a main app loop function, for the given api object
    const createLoopFunction = function (tf) {
        tf.lt = new Date();
        tf.loop = function () {
            const now = new Date(),
            secs = (now - tf.lt) / 1000;
            if(tf.active){
                requestAnimationFrame(tf.loop);
                if (secs >= 1 / tf.fps_target) {
                    tf.update(tf, secs, tf.userData, tf.scene, tf.camera, tf.renderer); ;
                    tf.renderer.render(tf.scene, tf.camera);
                    tf.lt = now;
                }
            }
        };
    };
    // create a basic scene
    const createAPIObject = function (opt) {
        // SCENE
        const scene = opt.scene || new THREE.Scene();
        // CAMERA
        const camera = opt.camera || new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
        // RENDERER
        const renderer = opt.renderer || new THREE.WebGL1Renderer();
        ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
        renderer.render(scene, camera);
        // return an object with refs to scene and other items of interest
        const tf = {
            userData: opt.userData || {},
            scene: scene,
            camera: camera,
            renderer: renderer,
            canvas: renderer.domElement,
            fps_target: opt.fps_target === undefined ? 24 : opt.fps_target,
            active: opt.active === undefined ? false : opt.active,
            lt:null,        // lt and null set up by create loop function helper
            loop: null,
            init: opt.init || NOOP,
            update: opt.update || NOOP
        };
        createLoopFunction(tf);
        if(tf.active){
            threeFrame.start(tf);
        }
        return tf;
    };
    //-------- ----------
    // PUBLIC METHODS
    //-------- ----------
    // create a main project object
    threeFrame.create = function (opt) {
        opt = opt || {};
        // create mainb tf api object
        const tf = createAPIObject(opt);
        // call init method
        tf.init(tf, tf.userData, tf.scene, tf.camera, tf.renderer);
        // return the tf object
        return tf;
    };
    // start the loop
    threeFrame.start = (tf) => {
        tf.active = true;
        tf.lt = new Date();
        tf.loop();
    };
    // start the loop
    threeFrame.stop = (tf) => {
        tf.active = false;
        tf.lt = new Date();
    };
}(typeof threeFrame === 'undefined' ? this['threeFrame'] = {} : threeFrame));
