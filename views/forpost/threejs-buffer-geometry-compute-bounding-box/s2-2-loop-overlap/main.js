//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CONST
//-------- ----------
const MESH_COUNT = 100;
const MAX_UNIT_LENGTH = 5;
//-------- ----------
// HELPERS
//-------- ----------
const resetMesh = (mesh) => {
    const mud = mesh.userData;
    mud.dir = new THREE.Vector3();
    mud.dir.x = 0.01 + 0.99 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
    mud.dir.y = 0.01 + 0.99 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
    mud.dir.z = 0.01 + 0.99 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
    mud.dir.normalize();
    mud.unit_length = 0;
    mud.unit_length_delta = 0.15 + 0.35 * Math.random();
    mud.hits = 0;
    mud.overlap = false;
};
const makeMesh = () => {
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5), material);
    mesh.geometry.computeBoundingBox();
    resetMesh(mesh);
    return mesh
};
const hitCheck = (mesh_target) => {
    const mud_target = mesh_target.userData;
    mud_target.overlap = false
    scene.traverse((obj) => {
        if(obj.type === 'Mesh'){
            const mesh = obj;
            if(mesh != mesh_target){
                const box = mesh.geometry.boundingBox.clone().translate(mesh.position);
                const box_target = mesh_target.geometry.boundingBox.clone().translate(mesh_target.position);
                
                if(box.intersectsBox( box_target) ){
                    const mud = mesh.userData;
                    mud.hits += 1;
                    mud_target.hits += 1;
                    mud.overlap = mud_target.overlap = true;
                }
            }
        }
    });
}
//-------- ----------
// OBJECTS
//-------- ----------
let i = 0;
while(i < MESH_COUNT){
    const mesh = makeMesh();
    scene.add(mesh);
    i += 1;
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = FPS_MOVEMENT * 5; // 5 sec animation
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    scene.traverse((obj) => {
        if(obj.type === 'Mesh'){
            const mesh = obj;
            const mud = mesh.userData;
            mud.unit_length += mud.unit_length_delta;
            if(mud.unit_length >= MAX_UNIT_LENGTH){
                resetMesh(mesh);
            }
            mesh.position.copy(mud.dir).multiplyScalar(mud.unit_length);
            hitCheck(mesh);
			let a_hits = (mud.hits / 100);
			a_hits = a_hits > 1 ? 1 : a_hits;
			const v = 1 - 0.75 * a_hits;
			
			
            mesh.material.color = new THREE.Color(v, v, v);
            if(mud.overlap){
                mesh.material.color = new THREE.Color(v,0,0);
            }
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