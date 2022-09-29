(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    const MESH_GEO = new THREE.SphereGeometry(0.5, 10, 10);
    const MESH_MATERIAL = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.8});
    const makeMesh = () => {
        const mesh = new THREE.Mesh(
            MESH_GEO,
            MESH_MATERIAL);
        return mesh;
    };
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    let i = 0;
    const len = 15;
    while(i < len){
        const mesh = makeMesh();
        const alpha = i / len;
        // SETTING MESH POSITION USING set, normalize, and multiplyScalar
        // methods as a way to set a direction and unit length
        const y = -2 + 5 * alpha;
        const unitLength = -5.5 + 15 * alpha;
        mesh.position.set(-5, y, 0).normalize().multiplyScalar(unitLength);
        scene.add(mesh);
        i += 1;
    }
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());