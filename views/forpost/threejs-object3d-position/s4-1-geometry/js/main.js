(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    camera.position.set(0, 8, 8);
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
            new THREE.SphereGeometry(0.2, 20, 20),
            new THREE.MeshNormalMaterial()
        );
    };
    //-------- ----------
    // POSITION TO MESH OBJECTS
    //-------- ----------
    const material_posto = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.15});
    const group = new THREE.Group();
    scene.add(group);
    // sphere that will be the position property used
    const mesh1 = new THREE.Mesh( new THREE.SphereGeometry(2, 14, 14), material_posto );
    group.add(mesh1);
    // torus that will be the position property used
    const mesh2 = new THREE.Mesh( new THREE.TorusGeometry(1.5, 0.75, 14, 14), material_posto);
    mesh2.position.set(-5, 0, 0);
    mesh2.geometry.rotateX(Math.PI * 0.5)
    group.add(mesh2);
    // cone that will be the position property used
    const mesh3 = new THREE.Mesh( new THREE.ConeGeometry(2, 4, 14, 14), material_posto);
    mesh3.position.set(5, 0, -5);
    group.add(mesh3);
    //-------- ----------
    // POINTER MESH OBJECTS
    //-------- ----------
    let i = 0;
    const count = 16;
    while(i < count){
        const a1 = i / count;
        group.children.forEach(( mesh ) => {
            const mesh_pointer = createPointerMesh();
            const v = getGeoPosByAlpha(mesh.geometry, a1);
            mesh_pointer.position.copy(v).add(mesh.position);
            scene.add(mesh_pointer);
        });
        i += 1;
    }
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());