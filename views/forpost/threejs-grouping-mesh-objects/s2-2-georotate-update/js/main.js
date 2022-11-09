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
    // create a single cone and rotate the geo once
    const createConeMesh = () => {
        const geo = new THREE.ConeGeometry(0.5, 1, 10, 10);
        geo.rotateX(Math.PI * 0.5);
        const cone = new THREE.Mesh(
            geo,
            new THREE.MeshNormalMaterial());
        return cone;
    };
    // update a group
    const conCircleUpdate = (group, v3_lookat, radius) => {
        // position the mesh
        const count = group.children.length;
        let i = 0;
        while (i < count) {
            const cone = group.children[i];
            const vs = new THREE.Vector3(0, 0, 1);
            const e = new THREE.Euler(0, Math.PI / 180 * 360 * (i / count), 0 );
            cone.position.copy(vs).applyEuler(e).multiplyScalar( radius );
            // set look at point
            cone.lookAt(v3_lookat);
            i += 1;
        };
    };
    // create a cone circle
    const createConeCircle = function (opt) {
        opt = opt || {};
        opt.count = opt.count === undefined ? 4 : opt.count;
        const group = new THREE.Group();
        let i = 0;
        while (i < opt.count) {
            // creating a mesh
            const cone = createConeMesh();
            // add mesh to the group
            group.add(cone);
            conCircleUpdate(group, new THREE.Vector3(0, 0, 0), 1);
            i += 1;
        }
        return group;
    };
    //-------- ----------
    // GROUPS
    //-------- ----------
    const group1 = createConeCircle({count: 6});
    scene.add(group1);
    const group2 = createConeCircle({count: 10});
    conCircleUpdate(group2, new THREE.Vector3(0, 5, 0), 4);
    scene.add(group2);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());