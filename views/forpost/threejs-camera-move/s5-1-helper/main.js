//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const getBias = function(per){
    return 1 - Math.abs(per - 0.5) / 0.5;
};
// create camera helper
const createCamera = function(opt){
    opt = opt || {};
    const width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.userData.subject = new THREE.Vector3();
    return camera;
};
const camMoveMethod = {};
// follow subject1 method
camMoveMethod.followSubject1 = function(camera, per){
    const bias = getBias(per);
    return {
        position: new THREE.Vector3(-8, 5, -8 + 16 * bias), 
        lookAt: camera.userData.subject
    };
};
// follow subject2 method
camMoveMethod.followSubject2 = function(camera, per){
    const rad = Math.PI * 2 * per,
    x = Math.cos(rad) * 6,
    y = -4 + 8 * getBias(per),
    z = Math.sin(rad) * 6;
    return {
        position: new THREE.Vector3(x, y, z), 
        lookAt: camera.userData.subject
    };
};
// move camera update helper
const moveCamera = function (camera, per, moveFunc) {
    const camState = moveFunc(camera, per);
    // set the position and lookAt values with the
    // data in the returned camState object
    camera.position.copy(camState.position)
    camera.lookAt(camState.lookAt);
};
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
mesh.position.set(3, 0, 0);
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.userData.subject = mesh.position;
let secs = 0,
methodSecs = 0,
methodIndex = 0,
methodName = '',
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 60, // fps rate to move camera
frame = 0,
frameMax = 600,
lt = new Date();
const loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000,
    per = Math.round(frame) / frameMax,
    bias = getBias(per);
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        methodSecs += secs;
        if(methodSecs >= 5){
            methodSecs = 0;
            methodIndex += 1;
            methodIndex %= Object.keys(camMoveMethod).length;
        }
        // calling camera update method
        methodName = Object.keys(camMoveMethod)[methodIndex];
        moveCamera(camera, per, camMoveMethod[methodName]);
        // moving mesh
        mesh.position.x = -2 + 4 * bias;
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
