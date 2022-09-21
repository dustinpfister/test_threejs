(function () {
    //-------- ----------
    // Scene, camera renderer
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.75, 2.00, 1.75);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // ADDING LINES AND MESH OBJECTS TO SCENE
    //-------- ----------
    // sphere geometry and...
    const sphereGeo = new THREE.SphereGeometry(0.5, 15, 20);
    // AN EDGE GEOMETRY CREATED FROM IT WITH THRESHOLD ANGLE of 10
    const line1 = new THREE.LineSegments(
            new THREE.EdgesGeometry(sphereGeo, 10),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    line1.position.set(-0.75, 0, 0);
    // SAME EDGE GEOMETRY BUT WITH DEFULT THRESHOLD ANGLE
    const line2 = new THREE.LineSegments(
            new THREE.EdgesGeometry(sphereGeo, 1),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    line2.position.set(0.75, 0, 0);
    const mesh1 = new THREE.LineSegments(
            sphereGeo,
            new THREE.MeshBasicMaterial({
                color: new THREE.Color('gray'),
                wireframe: true
            }));
    mesh1.position.set(0, 0, -1.75);
    scene.add(line1);
    scene.add(line2);
    scene.add(mesh1);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
