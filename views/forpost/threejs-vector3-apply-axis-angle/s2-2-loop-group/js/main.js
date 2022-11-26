(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // HELPERS
    // ---------- ---------- ----------
    // make a single mesh object
    const makeMesh = () => {
        const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1, 30, 30),
            new THREE.MeshNormalMaterial());
        mesh.geometry.rotateX(Math.PI * 0.5);
        mesh.position.set(1, 0, 1);
        return mesh;
    };
    // update a group by an alpha value
    const updateGroup = (group, alpha) => {
        const len = group.children.length;
        const gud = group.userData;
        group.children.forEach( (mesh, i) => {
            const v = gud.v;
            const degree = gud.angle / len * i * alpha;
            mesh.position.set(1, 0, 0).applyAxisAngle(v.normalize(), Math.PI / 180 * degree).multiplyScalar(gud.unitLen);
            mesh.lookAt(0, 0, 0);
        });
    };
    // make a group of mesh objects
    const makeGroup = (opt) => {
        opt = opt || {};
        opt.count = opt.count === undefined ? 10 : opt.count;
        const group = new THREE.Group();
        const gud = group.userData;
        gud.v = opt.v || new THREE.Vector3(0, 1, 0);
        gud.angle = opt.angle === undefined ? 360 : opt.angle;
        gud.unitLen = opt.unitLen === undefined ? 1 : opt.unitLen;
        let i = 0;
        while(i < opt.count){
            group.add( makeMesh() );
            i += 1;
        }
        updateGroup(group, 1);
        return group;
    };
    // ---------- ---------- ----------
    // GROUP
    // ---------- ---------- ----------
    const group1 = makeGroup( { count: 10, angle: 360, v: new THREE.Vector3(0, 1, 0), unitLen: 5 } );
    scene.add(group1);
    const group2 = makeGroup( { count: 10, angle: 270, v: new THREE.Vector3(0, 1, 1), unitLen: 5  } );
    scene.add(group2);
    const group3 = makeGroup( { count: 10, angle: 360, v: new THREE.Vector3(1, 1, 0), unitLen: 5  } );
    scene.add(group3);
    // ---------- ---------- ----------
    // LOOP
    // ---------- ---------- ----------
    const v = new THREE.Vector3(0, 1, 0);
    const fps = 30;
    const frameMax = 100;
    let frame = 0;
    let lt = new Date();
    // update method
    const update = function (frame, frameMax) {
        const a1 = frame / frameMax;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        updateGroup(group1, a2);
        updateGroup(group2, a2);
        updateGroup(group3, a2);
    };
    // loop method
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update(frame, frameMax);
            renderer.render(scene, camera);
            frame += 1;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());
