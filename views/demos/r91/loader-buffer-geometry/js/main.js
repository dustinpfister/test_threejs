
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // instantiate a loader
    var loader = new THREE.BufferGeometryLoader();

    // load a resource
    loader.load(
        // resource URL
        'loader-buffer-geometry/js/three_1.json',

        // onLoad callback
        function (geometry) {

        console.log(geometry);

        var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
                    //color: 0xff0000,
                    //wireframe: true
                }));

        scene.add(mesh);
        renderer.render(scene, camera);

    });

    /*
    var loader = new THREE.JSONLoader();

    loader.load(

    'loader-json/js/three_1.json',

    function(){

    console.log('foo?');

    },
    function(){},
    function(){}

    );
     */

}
    ());
