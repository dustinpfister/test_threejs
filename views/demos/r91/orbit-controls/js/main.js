
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4/3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
 
    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // Something to look at
    scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1), 
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })));
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    function animate() {
 
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
 
    };
 
    animate();
 
}());
