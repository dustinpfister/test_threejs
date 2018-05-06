
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(65, 4 / 3, .5, 10);
    camera.position.set(-1.5, 2.5, 1.5);
    camera.lookAt(0, 0, 0);

    var controls = new THREE.OrbitControls(camera);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Loader
    var loader = new THREE.BufferGeometryLoader();

    // load a resource
    loader.load(
        // resource URL
        //'loader-buffer-geometry/js/three_2.json',
        '/json/static/cube_thing.json',

        // onLoad callback
        function (geometry) {

        // create a mesh with the geometry
        // and a material, and add it to the scene
        var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({}));
        scene.add(mesh);

        var loop = function () {

            requestAnimationFrame(loop);

            // render the scene
            renderer.render(scene, camera);

        }

        loop();

    });

}
    ());

/*
var frame = 0,
maxFrame = 500;

var loop = function () {

var per = frame / maxFrame,

r = Math.PI * 2 * per;

mesh.rotation.set(0, r, 0);

requestAnimationFrame(loop);

renderer.render(scene, camera);

frame += 1;
frame = frame % maxFrame;

};
*/
