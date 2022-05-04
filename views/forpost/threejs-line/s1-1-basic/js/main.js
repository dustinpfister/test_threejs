(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    var points = [];
    points.push(
        new THREE.Vector3(-10, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(-10, 10, 0));
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    // CREATE THE LINE
    var line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
    scene.add(line);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(649, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());