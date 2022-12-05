(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // get a geo position vector3 by a given alpha value
    const getGeoPosByAlpha = (geo, alpha) => {
        const pos = geo.getAttribute('position');
        const count = pos.count;
        const index = Math.round( ( count - 1 ) * alpha );
        const v = new THREE.Vector3();
        v.x = pos.getX(index);
        v.y = pos.getY(index);
        v.z = pos.getZ(index);
        return v;
    };
    // create a 'pointer' mesh object
    const createPointerMesh = () => {
        return new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            new THREE.MeshNormalMaterial()
        );
    };
    //-------- ----------
    // MESH OBJECTS
    //-------- ----------
    // mesh_sphere that will be the position property used
    const mesh_sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2, 20, 20),
        new THREE.MeshBasicMaterial({ wireframe: true})
    );
    scene.add(mesh_sphere);
    // the mesh that will be positioned to mesh_sphere
    const mesh_pointer = createPointerMesh();
    scene.add(mesh_pointer);
    //-------- ----------
    // SET mesh_pointer to vector in mesh_sphere
    //-------- ----------
    const v = getGeoPosByAlpha(mesh_sphere.geometry, 0.43);
    mesh_pointer.position.copy(v);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());