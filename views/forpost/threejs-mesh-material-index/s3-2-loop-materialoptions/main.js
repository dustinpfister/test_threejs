// ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.9);
dl.position.set(1, 2, 3);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
// ---------- ----------
// MATERIALS
// ---------- ----------
const opt_mat_all = {
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthFunc: THREE.AlwaysDepth
};
const createMatOpt = (opt) => {
    return Object.assign({}, opt_mat_all, opt);
};
const materials = [
    new THREE.MeshNormalMaterial(createMatOpt({
    })),
    new THREE.MeshBasicMaterial(createMatOpt({
    })),
    new THREE.MeshStandardMaterial(createMatOpt({
        color: 0xff0000
    })),
    new THREE.MeshPhongMaterial( createMatOpt({
        color: 0x00ff00, shininess: 120, specular: 0xffffff
    })),
    new THREE.MeshLambertMaterial( createMatOpt({
        color: 0x00ffff
    })),
    new THREE.MeshBasicMaterial( createMatOpt({
        wireframe: true
    }))
];
// ---------- ----------
// GEOMETRY/OBJECTS
// ---------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1, 8, 8);
const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
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
    const a2 = a1 * 4 % 1;
    mesh.rotation.x = THREE.MathUtils.degToRad(360 * a2);
    mesh.rotation.y = THREE.MathUtils.degToRad(720 * a2);
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
