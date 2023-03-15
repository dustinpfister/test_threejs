//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(-5, 0, -5);
const v_end = new THREE.Vector3(5, 0, 0);
const v_control1 = v_start.clone().lerp(v_end, 0.25).add( new THREE.Vector3(0,0,20) );
const v_control2 = v_start.clone().lerp(v_end, 0.75).add( new THREE.Vector3(0,10,-10) );
const curve = new THREE.CubicBezierCurve3(v_start, v_control1, v_control2, v_end);
//-------- ----------
// HELPERS
//-------- ----------
const updateMesh = (mesh, curve, alphaDelta) => {
    const mud = mesh.userData;
    mud.a = mud.a === undefined ? 0 : mud.a;
    mud.a_last = mud.a_last === undefined ? 0.5 : mud.a_last;
    mud.speed = mud.speed === undefined ? 0.2 + 0.8 * Math.random() : mud.speed;
    if(mud.a_target === undefined || mud.a === 1){
       mud.a_last = mud.a_target;
       mud.a_target = Math.random();
       mud.a = 0;
    }
    mud.v_current = curve.getPoint( THREE.MathUtils.lerp(mud.a_last, mud.a_target, mud.a) );
    mud.a += (alphaDelta * mud.speed);
    mud.a = THREE.MathUtils.clamp(mud.a, 0, 1);
    const a_scale = 0.25 + 0.75 * ( 1 - Math.abs(0.5 - mud.a) / 0.5 );
    mesh.scale.set( a_scale, a_scale, a_scale);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const group = new THREE.Group();
scene.add(group);
let i = 0;
const geometry = new THREE.SphereGeometry(1.00, 20, 20);
const material = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 });
while(i < 50){
    const mesh = new THREE.Mesh( geometry, material );
    updateMesh(mesh, curve, 0);
    group.add(mesh);
    i += 1;
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;

    group.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            const mesh = obj;
            const mud = mesh.userData;
            mesh.position.copy( mud.v_current );
            updateMesh(mesh, curve, 0.025);
        }
    });

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
