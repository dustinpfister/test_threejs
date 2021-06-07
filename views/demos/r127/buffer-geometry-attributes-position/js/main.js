
(function () {

    // scene
    var scene = new THREE.Scene();


    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    scene.add(mesh);


    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
