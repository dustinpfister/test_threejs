
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    var sections = new THREE.Group();

    var sectionCount = 12,
    sectionIndex = 0;
    while(sectionIndex < sectionCount){
        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            }));
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = -6 + sectionIndex * 2;
        sections.add(mesh);
        sectionIndex += 1;
    }

    // Something to look at
    scene.add(sections);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();

}
    ());
