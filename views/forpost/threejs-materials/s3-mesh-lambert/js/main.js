(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) )
    scene.background = new THREE.Color('blue');
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
    camera.position.set(1.3, 1.5, 1.3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // I WILL WANT A LIGHT SOURCE
    var dl = new THREE.DirectionalLight(0xffffff, 0.5);
    dl.position.set(4, 2, 1);
    scene.add(dl);
    // INSTANCE OF THE LAMBERT MATERIAL
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0xff0000,
        emissiveIntensity: 0.5
    });
    // MESH with Box Geometry with the 
    scene.add(new THREE.Mesh(
        // box GEOMETRY
        new THREE.BoxGeometry(1, 1, 1),
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