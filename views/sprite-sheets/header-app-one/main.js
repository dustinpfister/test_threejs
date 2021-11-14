(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    var ship = new THREE.Mesh(new THREE.ConeGeometry(1, 4, 3, 1), 
        new THREE.MeshBasicMaterial({
            wireframe: true
        })
    );

    scene.add(ship);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(ship.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('sheet').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());