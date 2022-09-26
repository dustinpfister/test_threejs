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
    const MESH_GEO = new THREE.SphereGeometry(0.5, 20, 20);
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
    const len = 20;
    // STRT AND END VECTORS TO LERP TO AND FROM
    const v_start = new THREE.Vector3(-25,-20, 0);
    const v_end = new THREE.Vector3(6, 5, 0);
    while(i < len){
        const mesh = makeMesh();
        const alpha = i / len;
        // UISNG COPY AND LERP TO SET POSITION
        mesh.position.copy(v_start).lerp(v_end, alpha);
        // scale
        const s = 5 - 4.75 * alpha;
        mesh.scale.set(s, s, s);
        // add to scene
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