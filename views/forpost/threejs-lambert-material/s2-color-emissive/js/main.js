(function () {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // add plane to the scene
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1500, 1500, 8, 8),
        new THREE.MeshLambertMaterial({
            color: 0x00afaf,
            emissive: 0x2a2a2a,
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
    }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    // render
    renderer.render(scene, camera);
 
}
    ());