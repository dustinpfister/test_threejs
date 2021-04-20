
(function (threeFrame) {

    // add arrow helper method
    threeFrame.addArrow = function (obj3d, x, y, z, len, color) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 2 : y;
        z = z === undefined ? 0 : z;
        len = len === undefined ? 3 : len;
        color = color === undefined ? 0x00ff00 : color;
        var arrow = new THREE.ArrowHelper(
                new THREE.Vector3(x, y, z).normalize(),
                new THREE.Vector3(0, 0, 0),
                len,
                color);
        obj3d.add(arrow);
        return arrow;
    };

    // add cube helper method
    threeFrame.addCube = function (obj3d, x, y, z, size, color, wireframe) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 0 : y;
        z = z === undefined ? 0 : z;
        size = size === undefined ? 2 : size;
        var geometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshBasicMaterial({
                color: color === undefined ? 0x00ff00 : color,
                wireframe: wireframe === undefined ? true : wireframe
            });
        var cube = new THREE.Mesh(geometry, material);
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
            update: opt.update
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

        var api = createAPIObject(opt);

        api.init(api);

        var loop = createLoopFunction(api);
        loop();

    };

}
    (typeof threeFrame === 'undefined' ? this['threeFrame'] = {}
        : threeFrame));
