// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5, 0.5, 0.5);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// THE COINT DOWN GROUP - using let here so that I can re-assign in loader code below
// ---------- ----------
let group_cd = countDown.create();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1, 3, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30,  // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    countDown.set( group_cd, frame );
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
//-------- ----------
// LOAD CUSTOM SCENE OBJECT FOR NUMBERS
//-------- ----------
DAE_loader({
    urls_dae: ['/dae/count_down_basic/cd4-nums.dae'],
    urls_resource: ['/dae/count_down_basic/skins/depth_256/'],
    cloner: function(obj, scene_source, scene_result, result){
        if(obj.type === 'Mesh' ){
            obj.position.set(0,0,0);
            obj.material = new THREE.MeshBasicMaterial({ map: obj.material.map });
            scene_source.add(obj.clone());
        }
    }
})
.then((scene_source) => {
    group_cd = countDown.create({
        scene_source: scene_source,
        digitCount: 3
    });
    scene.add(group_cd);
    loop();
});

