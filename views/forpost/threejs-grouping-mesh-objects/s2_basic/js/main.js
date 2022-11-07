(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CREATING A GROUP
    //-------- ----------
    const group = new THREE.Group(), radius = 2, count = 8;
    let i = 0;
    while (i < count) {
        // creating a mesh
        const bx = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial()),
        r = Math.PI * 2 / count * i;
        // set position of mesh
        bx.position.set(
            Math.cos(r) * radius,
            0,
            Math.sin(r) * radius);
        // add mesh to the group
        group.add(bx);
        i += 1;
    }
    scene.add(group);
    // changing position and rotation of the group
    group.position.set(-4, 0, -4);
    group.rotation.z = Math.PI / 180 * 90;
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
