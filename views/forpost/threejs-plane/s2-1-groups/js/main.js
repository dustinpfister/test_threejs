(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // MESH - ADDING GROUPS
    // ---------- ----------
    // An Array of materials
    const materialArray = [
        new THREE.MeshBasicMaterial({
            color: 0xe0e0e0,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: 0x505050,
            side: THREE.DoubleSide
        })
    ];
    // PLANE
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 7, 1, 2),
        materialArray);
    // USING ADD GROUP METHOD TO SET MATERIAL
    // INDEX VLAUES
    plane.geometry.addGroup(0, 3, 0);
    plane.geometry.addGroup(3, 3, 1);
    plane.geometry.addGroup(6, 3, 1);
    plane.geometry.addGroup(9, 3, 0);
    plane.geometry.rotateX(Math.PI * 0.5);
    scene.add(plane);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());