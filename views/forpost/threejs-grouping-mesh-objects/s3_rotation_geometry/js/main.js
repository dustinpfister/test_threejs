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
    // HELPERS
    //-------- ----------
    const createConeGroup = function (coneRotation) {
        coneRotation = coneRotation === undefined ? Math.PI * 1.5 : coneRotation;
        const group = new THREE.Group(), radius = 2,count = 8;
        let i = 0;
        while (i < count) {
            // creating a mesh
            const geo = new THREE.ConeGeometry(0.5, 1, 10, 10);
            // ROTATING THE CONE GEOMERTY
            geo.rotateX(coneRotation);
            const bx = new THREE.Mesh(
                    geo,
                    new THREE.MeshNormalMaterial()),
            r = Math.PI * 2 / count * i;
            // set position of mesh
            bx.position.set(
                Math.cos(r) * radius,
                0,
                Math.sin(r) * radius);
            bx.lookAt(0, 0, 0);
            // add mesh to the group
            group.add(bx);
            i += 1;
        }
        return group;
    };
    //-------- ----------
    // GROUPS
    //-------- ----------
    // add groups
    const group1 = createConeGroup();
    group1.position.set(-4, 0, -4);
    group1.rotation.z = Math.PI / 180 * 90;
    scene.add(group1);
    const group2 = createConeGroup(Math.PI * 0.5);
    group2.position.set(2, 0, 2);
    scene.add(group2);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());