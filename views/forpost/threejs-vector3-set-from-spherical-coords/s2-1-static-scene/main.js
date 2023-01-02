
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('black');
 
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    //camera.position.set(-17, 10, -17);
    camera.position.setFromSphericalCoords(
        25,
        THREE.MathUtils.degToRad(70),
        THREE.MathUtils.degToRad(225)
    );
    camera.lookAt(0, 0, 0);
    scene.add(camera);
 
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);

    // A Mesh with a Sphere for geometry and using the Standard Material
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(3, 30, 30),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('red'),
            wireframe: true
        })
    );
    scene.add(mesh);
 
    // USING setFromSphericalCoords to set position of the Mesh
    var radius = 10,
    phi = THREE.MathUtils.degToRad(90),
    theta = THREE.MathUtils.degToRad(270);
    mesh.position.setFromSphericalCoords(radius, phi, theta);
 
    // render
    renderer.render(scene, camera);
 
}
    ());
