// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){};
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
//-------- ----------
// LOADING
//-------- ----------
DAE_loader({
    // custom cloner
    cloner: (obj, scene_source ) => {
        // If the current object is a mesh
        if(obj.type === 'Mesh'){
            // use the basic material, but with the same map
            const mat = new THREE.MeshBasicMaterial({
                map: obj.material.map
            });
            // clone by cretaing a whole new mesh object
            const mesh = new THREE.Mesh(obj.geometry, mat);
            mesh.name = obj.name;
            // copy rotation, but not position
            mesh.rotation.copy(obj.rotation);
            // add as a source object
            scene_source.add(mesh);
        }else{
            // log out other kinds of objects just to see what else I am skiping
            console.log('\n\n');
            console.log('Other type of object from DAE file');
            console.log(obj.type);
            console.log(obj);
            console.log('\n\n');
        }
    },
    urls_dae: [
        '/dae/house_two/house_2.dae'
    ],
    urls_resource: [
        '/dae/house_two/skins/windows/'
    ]
})
.then( (scene_source) => {
    console.log('done loading');
 
    scene.add( new THREE.GridHelper(10, 40) )
    const mesh_house = scene_source.getObjectByName('house_0').clone();
    scene.add( mesh_house );
 
    camera.position.set(-2, 1, -2);
    camera.lookAt(mesh_house.position);
    loop();
})
.catch( (e) => {
    console.warn(e);
});