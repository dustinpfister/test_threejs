// threeframe.js - r1 - from threejs-examples-basic-framework
(function (threeFrame) {
    //-------- ----------
    // HELPERS
    //-------- ----------
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
        return {
            userData: opt.userData || {},
            scene: scene,
            camera: camera,
            renderer: renderer,
            canvas: renderer.domElement,
            fps_target: 24,
            init: opt.init,
            update: opt.update
        };
    };
    // create a main app loop function, for the given api object
    const createLoopFunction = function (api) {
        let lt = new Date();
        const loop = function () {
            const now = new Date(),
            secs = (now - lt) / 1000;
            requestAnimationFrame(loop);
            if (secs >= 1 / api.fps_target) {
                api.update(api, secs); ;
                api.renderer.render(api.scene, api.camera);
                lt = now;
            }
        };
        return loop;
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
        // start loop
        const loop = createLoopFunction(api);
        loop();
        return api;
    };
}(typeof threeFrame === 'undefined' ? this['threeFrame'] = {} : threeFrame));
