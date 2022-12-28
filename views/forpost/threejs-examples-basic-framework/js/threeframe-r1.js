// threeframe.js - r1 - from threejs-examples-basic-framework
(function (threeFrame) {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create a main app loop function, for the given api object
    const createLoopFunction = function (api) {
        api.lt = new Date();
        api.loop = function () {
            const now = new Date(),
            secs = (now - api.lt) / 1000;
            if(tf.active){
                requestAnimationFrame(api.loop);
                if (secs >= 1 / api.fps_target) {
                    api.update(api, secs); ;
                    api.renderer.render(api.scene, api.camera);
                    api.lt = now;
                }
            }
        };
    };
    // create a basic scene
    const createAPIObject = function (opt) {
        // SCENE
        const scene = new THREE.Scene();
        // CAMERA
        const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
        // RENDERER
        const renderer = new THREE.WebGL1Renderer();
        ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
        renderer.render(scene, camera);
        // return an object with refs to scene and other items of interest
        const tf = {
            userData: opt.userData || {},
            scene: scene,
            camera: camera,
            renderer: renderer,
            canvas: renderer.domElement,
            fps_target: 24,
            active: false,
            lt:null,        // lt and null set up by create loop function helper
            loop: null,
            init: opt.init,
            update: opt.update
        };
        createLoopFunction(tf);
        return tf;
    };
    //-------- ----------
    // PUBLIC METHODS
    //-------- ----------
    // create a main project object
    threeFrame.create = function (opt) {
        opt = opt || {};
        // create api
        const api = createAPIObject(opt);
        // call init method
        api.init(api);
        //loop();
        return api;
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
