(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) )
    scene.background = new THREE.Color('blue');
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // I WILL WANT A LIGHT SOURCE
    var dl = new THREE.DirectionalLight(0xffffff, 1.0);
    dl.position.set(4, 2, 1);
    scene.add(dl);
    // INSTANCE OF THE STANDARD MATERIAL
    var material = new THREE.MeshStandardMaterial({
        color: 0xff0000
    });
    // MESH with SPJHERE Geometry with the material 
    scene.add(new THREE.Mesh(
        // SPHERE GEOMETRY
        new THREE.SphereGeometry(1, 30, 30),
        material
    ));
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        controls.update();         // UPDATE CONTROLS
        renderer.render(scene, camera); // render
    };
    loop();
}
    ());