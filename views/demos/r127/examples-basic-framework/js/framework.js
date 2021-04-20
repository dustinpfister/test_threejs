
(function (threeFrame) {

    // Just an add cube method for now
    threeFrame.addCube = function (api, obj3d, x, y, z, size, materialIndex) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 0 : y;
        z = z === undefined ? 0 : z;
        size = size === undefined ? 2 : size;
        var geometry = new THREE.BoxGeometry(size, size, size);
        var cube = new THREE.Mesh(geometry, api.materials[materialIndex || 0]);
        cube.position.set(x, y, z);
        obj3d.add(cube);
        return cube;
    };

    // create a basic scene
    var createAPIObject = function (opt) {
        // scene
        var scene = new THREE.Scene();
        // camera
        var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
        camera.position.set(2.5, 2.5, 2.5);
        camera.lookAt(0, 0, 0);
        // RENDERER
        var renderer = new THREE.WebGLRenderer();
        document.getElementById('demo').appendChild(renderer.domElement);
        renderer.render(scene, camera);
        // return an object with refs to scene and other items of interest
        return {
            scene: scene,
            camera: camera,
            renderer: renderer,
            canvas: renderer.domElement,
            fps_target: 24,
            init: opt.init,
            update: opt.update,
            materials: opt.materials || [new THREE.MeshBasicMaterial({
                    color: 0x00ffff,
                    wireframe: true
                })]
        };
    };

    // create a main app loop function, for the given api object
    var createLoopFunction = function (api) {
        var lt = new Date();
        var loop = function () {
            var now = new Date(),
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

    threeFrame.create = function (opt) {
        opt = opt || {};
        // create api
        var api = createAPIObject(opt);
        // call init method
        api.init(api);
        // start loop
        var loop = createLoopFunction(api);
        loop();
    };

}
    (typeof threeFrame === 'undefined' ? this['threeFrame'] = {}
        : threeFrame));
