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
    // HELPER
    //-------- ----------
    const makeCube = (size, x, y, z) => { 
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshNormalMaterial());
        mesh.position.set(x, y, z);
        return mesh;
    };
    //-------- ----------
    // CREATING A GROUP
    //-------- ----------
    const group = new THREE.Group();
    scene.add(group);
    // changing position and rotation of the group
    group.position.x = -2;
    group.rotation.y = Math.PI / 180 * 45;
    //-------- ----------
    // ADDING MESH OBJECTS TO THE GROUP
    //-------- ----------
    group.add(makeCube(1.0, 0, 0, 0));
    group.add(makeCube(0.5, 0, 2, 0));
    group.add(makeCube(0.5, 0, -2, 0));
    group.add(makeCube(0.5, 2, 0, 0));
    group.add(makeCube(0.5, -2, 0, 0));
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
