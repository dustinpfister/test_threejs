//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.05, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// BACKGROUND
//-------- ----------
scene.background = new THREE.Color('#006f6f');
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, -2, 1);
scene.add(dl);
const pl = new THREE.DirectionalLight(0xffffff, 1);
pl.position.set(4, 8, 4);
scene.add(pl);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const renderer_mirror = new THREE.WebGL1Renderer();
renderer_mirror.setSize(256, 256, false);
const camera_mirror = new THREE.PerspectiveCamera(45, 1 / 1, 0.05, 1000);
camera_mirror.zoom = 0.42;
camera_mirror.updateProjectionMatrix();
// things to look at
const group = new THREE.Group();
scene.add(group);
const mesh_sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 20, 20),
    new THREE.MeshPhongMaterial({
        color: 0xff0000
    })
);
group.add( mesh_sphere );
mesh_sphere.position.set(0, 6, 0);
const mesh_box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0x00ff00
    })
);
group.add( mesh_box );
mesh_box.position.set(0, -6, 0);
const mesh_cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.75, 3, 20, 20),
    new THREE.MeshPhongMaterial({
        color: 0x0000ff
    })
);
group.add( mesh_cone );
mesh_cone.position.set(0, 0, -6);
const mesh_torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.25, 20, 20),
    new THREE.MeshPhongMaterial({
        color: 0xff00ff
    })
);
group.add( mesh_torus );
mesh_torus.position.set(0, 0, 6);
// the plane
const mesh_plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshPhongMaterial({
        emissive: 0x2f2f2f,
        map: new THREE.CanvasTexture( renderer_mirror.domElement )
    })
);
mesh_plane.geometry.rotateX( Math.PI * 1.5 );
mesh_plane.geometry.rotateY( Math.PI * 1.0 );
scene.add(mesh_plane);
// helper
//const helper = new THREE.CameraHelper(camera_mirror);
//scene.add(helper);
// position and rotation of camera_mirror
camera_mirror.position.copy(mesh_plane.position).add( new THREE.Vector3( 0, -5, 0 ) );
camera_mirror.lookAt( mesh_plane.position );
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set( 10, 5, 10 );
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a_frame = frame / frameMax;
    const a_group = a_frame * 8 % 1;
    const a2 = 1 - Math.abs(0.5 - a_frame) / 0.5;
    group.rotation.x = Math.PI * 2 * a_group;
    group.rotation.y = Math.PI * 2 * a_frame;
    renderer_mirror.render(scene, camera_mirror);
    mesh_plane.material.map.needsUpdate = true;
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
