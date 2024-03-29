(function (utils) {
    // add arrow helper method
    utils.addArrow = function (obj3d, x, y, z, len, color) {
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
    utils.addCube = function (obj3d, x, y, z, size, color, wireframe) {
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
    utils.createBasicScene = function () {
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
            draw: function () {
                renderer.render(scene, camera);
            }
        };
    };
}(typeof utils === 'undefined' ? this['utils'] = {}: utils));
