// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.7, 0.7, 0.7);
scene.add( new THREE.GridHelper(10, 10) )
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 1, 4);
camera.lookAt(0, -1, -1);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.BufferGeometry();
geo.morphAttributes.position = [];
geo.morphTargetsRelative = true;
// home data position
const data_pos = [
  -0.5,-1.0, 1.0, -1.0,-1.0, 0.0, 0.0,-1.5,-4.0, 1.0,-1.0, 0.0, 0.0,-2.0, 0.0, 0.0, 
   0.0, 0.0, 1.0, 1.0,-0.7, 1.0, 1.0, 0.7, 2.0, 1.0, 0.0, -1.0, 1.0,-0.7, -1.0, 1.0, 0.7, -2.0, 1.0, 0.0
];
geo.setAttribute('position', new THREE.Float32BufferAttribute(data_pos, 3) );
geo.setIndex([0,5,1, 0,3,5, 0,4,3, 0,1,4,  5,3,2, 4,2,3, 4,1,2, 1,5,2,     6,7,8, 5,7,6,   10,9,11, 5,9,10 ]);
// position deltas 0 - move tail up and down
const data_pos_deltas0 = [
   0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos_deltas0, 3 );
// position deltas 1 - move head side to side
const data_pos_deltas1 = [
   1, 0, 0,0, 0, 0.5,0, 0, 0,0, 0,-0.5,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0
];
geo.morphAttributes.position[ 1 ] = new THREE.Float32BufferAttribute( data_pos_deltas1, 3 );
// position deltas 2 - move wings
const data_pos_deltas2 = [
   0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0,-2,-1,0,-2,-1,0,-2,-1,0,-2,-1,0,-2,-1,0,-2,-1
];
geo.morphAttributes.position[ 2 ] = new THREE.Float32BufferAttribute( data_pos_deltas2, 3 );
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshNormalMaterial({
     side: THREE.DoubleSide
});
// ---------- ----------
// GEOMETRY 2 - non indexed geometry from geo
// ---------- ----------
const geo2 = geo.toNonIndexed();
// ---------- ----------
// MESH
// ---------- ----------
const mesh = new THREE.Mesh(geo2, material);
scene.add(mesh);
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
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 * 8 % 1) / 0.5;
    const a3 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
    const a4 = 1 - Math.abs(0.5 - a1 * 20 % 1) / 0.5;
    mesh.morphTargetInfluences[ 0 ] = a2;
    mesh.morphTargetInfluences[ 1 ] = a3;
    mesh.morphTargetInfluences[ 2 ] = a4;
    mesh.geometry.computeVertexNormals();
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