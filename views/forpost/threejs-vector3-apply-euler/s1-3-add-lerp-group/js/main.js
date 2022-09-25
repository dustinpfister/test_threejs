
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
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
    //-------- ----------
    // MESH
    //-------- ----------

    let aCount = 4;
    let len = 100;
    const group = new THREE.Group();
    let i = 0;
    while(i < len){
        const p = i / len;
        const a = 360 * aCount * p;
        const v = vectorFromAngles(a, 180 * p, 2)
        group.add( createCube(v, 1 - 0.75 * p) );
        i += 1;
    }

    scene.add(group);

 
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
