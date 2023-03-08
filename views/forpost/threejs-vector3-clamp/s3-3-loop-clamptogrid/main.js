//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight();
dl.position.set(1, 2, 3);
scene.add(dl);
//-------- ----------
// CONST
//-------- ----------
const V_MIN = new THREE.Vector3( -4.5, 0.5, -4.5 );
const V_MAX = new THREE.Vector3( 4.5, 0.5, 4.5 );
const COLORS = [0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xff00ff];
const CHECKS = ['x,1,180','x,2,0','z,3,270','z,4,90'].map((str) => { return str.split(',') });
//-------- ----------
// HELPERS
//-------- ----------
const createGroup = (count) => {
    const group = new THREE.Group();
    let i = 0;
    while(i < count){
        const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshPhongMaterial() );
        const mud = mesh.userData;
        mud.heading = Math.PI * 2 * Math.random();
        group.add(mesh);
        i += 1;
    }
    return group;
};
const getHeading = (degHome) => {
    return Math.PI / 180 * (degHome - 45 + 90 * Math.random());
};
const updateGroup = (group, delta) => {
    group.children.forEach( (mesh, i) => {
        const mud = mesh.userData;
        const v_delta = new THREE.Vector3();
        v_delta.x = Math.cos(mud.heading) * delta;
        v_delta.z = Math.sin(mud.heading) * delta;
        mesh.position.add(v_delta).clamp(V_MIN, V_MAX);
        let ic = 0;
        while(ic < 4){
            const axis = CHECKS[ic][0];
            const maxValue = ic % 2 === 0 ? V_MAX[axis]: V_MIN[axis];
            if(mesh.position[axis] === maxValue){
                mesh.material.color = new THREE.Color(COLORS[ CHECKS[ic][1] ]);
                mud.heading = getHeading(CHECKS[ic][2]);
                break;
            }
            ic += 1;
        }
    });
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const group = createGroup(50);
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(12, 12, 12);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 500;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     updateGroup(group, 0.1)
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