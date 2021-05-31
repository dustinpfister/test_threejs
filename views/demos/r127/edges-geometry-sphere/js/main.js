(function () {
    // sphere geometry and...
    var sphereGeo = new THREE.SphereGeometry(0.5, 15, 20);
    // AN EDGE GEOMETRY CREATED FROM IT WITH THRESHOLD ANGLE of 10
    var line1 = new THREE.LineSegments(
            new THREE.EdgesGeometry(sphereGeo, 10),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    line1.position.set(-0.75, 0, 0);
    // SAME EDGE GEOMETRY BUT WITH DEFULT THRESHOLD ANGLE
    var line2 = new THREE.LineSegments(
            new THREE.EdgesGeometry(sphereGeo, 1),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    line2.position.set(0.75, 0, 0);

    var mesh1 = new THREE.LineSegments(
            sphereGeo,
            new THREE.MeshBasicMaterial({
                color: new THREE.Color('gray'),
                wireframe: true
            }));
    mesh1.position.set(0, 0, -1.75);

    // Scene, camera renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line1);
    scene.add(line2);
    scene.add(mesh1);
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.75, 2.00, 1.75);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
