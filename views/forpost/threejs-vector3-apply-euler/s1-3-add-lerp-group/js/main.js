
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Vector from angles method
    const vectorFromAngles = function (a, b, len) {
        a = a === undefined ? 0 : a;
        b = b === undefined ? 0 : b;
        len = len === undefined ? 1 : len;
        const startVec = new THREE.Vector3(1, 0, 0);
        const e = new THREE.Euler(
                0,
                THREE.MathUtils.degToRad(a),
                THREE.MathUtils.degToRad(-90 + b));
        return startVec.applyEuler(e).normalize().multiplyScalar(len);
    };
    // create a cube
    const createCube = function(pos, size){
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshNormalMaterial());
        cube.position.copy( pos || new THREE.Vector3() );
        cube.lookAt(0, 0, 0);
        return cube;
    };
    // create a group
    const createGroup = (len) => {
        const group = new THREE.Group();
        let i = 0;
        while(i < len){
            group.add( createCube(null, 1) );
            i += 1;
        }
        return group;
    };
    // set a group
    const setGroup = (group, aCount, unitLength, vd, vlt, alpha) => {
        aCount = aCount === undefined ? 1 : aCount;
        unitLength = unitLength === undefined ? 1 : unitLength;
        vd = vd === undefined ? new THREE.Vector3() : vd;       // vector delta for each object effected by i / len
        vlt = vlt === undefined ? new THREE.Vector3() : vlt;    // vector to lerp to for each mesh positon
        alpha = alpha === undefined ? 0 : alpha;
        let len = group.children.length;
        let i = 0;
        while(i < len){
            const p = i / len;
            const a = 360 * aCount * p;
            // using my vector from angles method
            const v = vectorFromAngles(a, 180 * p, unitLength);
            // adding another Vector
            v.add( vd.clone().multiplyScalar(p) );
            const cube = group.children[i];
            cube.position.copy(v.lerp(vlt, alpha));
            cube.lookAt(0, 0, 0);
            const s = 1 - 0.75 * p;
            cube.scale.set(s, s, s);
            i += 1;
        }
    }
    //-------- ----------
    // MESH
    //-------- ----------
    const group = createGroup(100);
    const vd = new THREE.Vector3(6, 0, 0);
    const vlt = new THREE.Vector3(-10, 2, 0);
    setGroup(group, 4, 3, vd, vlt, 0.25);
    scene.add(group);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
