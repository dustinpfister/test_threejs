// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, -1, -1);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const geo = new THREE.BufferGeometry();
// data position
const data_pos = [
   0.0,-1.0, 1.0,
  -1.0,-1.0, 0.0,
   0.0,-1.5,-4.0,
   1.0,-1.0, 0.0,
   0.0,-2.0, 0.0,
   0.0, 0.0, 0.0
];
geo.setAttribute('position', new THREE.Float32BufferAttribute(data_pos, 3) );
geo.setIndex([0,5,1, 0,3,5, 0,4,3, 0,1,4,  5,3,2, 4,2,3, 4,1,2, 1,5,2])
geo.computeVertexNormals();


const data_pos_deltas = [
   0, 0, 0,
   0, 0, 0,
   0, 1, 0,
   0, 0, 0,
   0, 0, 0,
   0, 0, 0
];
geo.morphAttributes.position = [];
geo.morphTargetsRelative = true;
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos_deltas, 3 );

/*
const geo = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const data_pos = [];
for ( let i = 0; i < pos.count; i ++ ) {
     const x = pos.getX( i );
     const y = pos.getY( i );
     const z = pos.getZ( i );
     data_pos.push(
         x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
         y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
         z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
     );
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos, 3 );
*/
// ---------- ----------
// MATERIAL, MESH
// ---------- ----------

const material = new THREE.MeshNormalMaterial({});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);


mesh.geometry.computeVertexNormals();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
    const a3 = 1 - Math.abs(0.5 - a1 * 1 % 1) / 0.5;
    mesh.morphTargetInfluences[ 0 ] = a2;
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