
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(65, 4 / 3, .5, 10);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(2, 2, 2);
    scene.add(light);
 
    var light2 = new THREE.PointLight(0xffffff, 1, 100);
    light2.position.set(-2, -2, -2);
    scene.add(light2);
 
    var frame = 0,
    maxFrame = 200,
    mesh;
    var loop = function () {
        var per = frame / maxFrame;
        requestAnimationFrame(loop);
        mesh.rotation.set(Math.PI / 2, Math.PI * 2 * per, 0);
        // render the scene
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
    };
 
    // Loader
    var loader = new THREE.BufferGeometryLoader();
 
    // load a resource
    loader.load(
        // URL
        '/forpost/threejs-buffer-geometry-loader/buffer-geo/three_2.json',
        // Load Done
        function ( geometry ) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({}));
            scene.add(mesh);
            renderer.render(scene, camera);
        },
        // Progress
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Error
        function ( err ) {
            console.log( 'An error happened' );
        }
    );
}
    ());
