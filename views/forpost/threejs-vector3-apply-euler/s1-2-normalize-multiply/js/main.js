
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-5, 5, 2);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // setPos helper using applyEuler, normalize, and multiply scalar
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
    const createCube = function(a, b, len){
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshNormalMaterial());
        cube.position.copy( vectorFromAngles(a, b, len) );
        cube.lookAt(0, 0, 0);
        return cube;
    };
    //-------- ----------
    // MESH
    //-------- ----------
    scene.add( createCube(0,  135, 2) );
    scene.add( createCube(45, 135, 2) );
    scene.add( createCube(90, 135, 2) );
 
    scene.add( createCube(0,  90, 2) );
    scene.add( createCube(45, 90, 2) );
    scene.add( createCube(90, 90, 2) );
 
    scene.add( createCube(0,  45, 2) );
    scene.add( createCube(45, 45, 2) );
    scene.add( createCube(90, 45, 2) );
 
    scene.add( createCube(0, 0, 2) );
    scene.add( createCube(0, 180, 2) );
 
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
