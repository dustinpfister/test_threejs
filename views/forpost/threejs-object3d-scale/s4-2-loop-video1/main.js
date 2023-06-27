// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(7,7,7);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// create a demo group
const demoGroupCreate = (count) => {
    const demoGroup = new THREE.Group();
    let i = 0;
    while(i < count){
        const material = new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 1
        });
        const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), material );
        demoGroup.add(mesh);
        i += 1;
    }
    return demoGroup;
};
// set up demo group with hard coded state and call a for mesh method when done
const demoGroupInit = function(demoGroup, forMesh){
    forMesh = forMesh || function(){};
    const len = demoGroup.children.length; 
    demoGroup.children.forEach(function(mesh, i){
        mesh.material.opacity = 1;
        mesh.position.x = 0;
        mesh.position.z = -5 + 10 * (i / (len -1 ));
        mesh.scale.set(1, 1, 1);
        mesh.rotation.set(0, 0, 0);
        forMesh(mesh, i);
    });
    demoGroup.position.set(0, 0, 0);
    demoGroup.rotation.set(0, 0, 0);
};
// update method 1 that effects scale
const demoGroupUpdate1 = (demogroup, a1) => {
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    // update scale and other values
    const len = demoGroup.children.length;
    demoGroupInit(demoGroup, function(mesh, i){
        mesh.material.opacity = 1;
        // POSITION FOR EACH MESH
        const orderPer = (i + 1) / len,
        orderBias = 1 - Math.abs(0.5 - orderPer) / 0.5,
        radian = Math.PI * 0.5 + (-Math.PI + Math.PI * orderBias) * a2,
        radius = 5 - 10 * orderPer;
        mesh.position.x = Math.cos(radian) * radius;
        mesh.position.z = Math.sin(radian) * radius;
        // SCALE FOR EACH MESH
        const scalar = 1 + ( -0.25 + 1.50 * orderPer * a2) * orderPer;
        mesh.scale.multiplyScalar(scalar);
        // ROTATION FOR EACH MESH
        mesh.rotation.y = Math.PI * 0.5 * a2 * orderPer;
        mesh.rotation.x = Math.PI * 8 * orderPer * a2;
    });
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const demoGroup = demoGroupCreate(15);
demoGroupInit(demoGroup);
scene.add(demoGroup);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    // alpha values
    const a1 = frame / frameMax;
    demoGroupUpdate1(demoGroup, a1)
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
