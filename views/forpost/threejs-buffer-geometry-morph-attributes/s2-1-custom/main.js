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
   0,-1, 1,
  -1,-1, 0,
   0,-2,-4,
   1,-1, 0,
   0,-2, 0,
   0, 0, 0
];
geo.setAttribute('position', new THREE.Float32BufferAttribute(data_pos, 3) );
geo.setIndex([0,5,1, 0,3,5, 0,4,3, 0,1,4,  5,3,2, 4,2,3, 4,1,2, 1,5,2])
geo.computeVertexNormals();


const data_pos_deltas = [
   0, 0, 0,
   0, 0, 0,
   0, 2, 0,
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

mesh.morphTargetInfluences[ 0 ] = 0.5;
mesh.geometry.computeVertexNormals();
// ---------- ----------
// RENDER
// ---------- ----------
//mesh.rotation.set(0,0,0.8)
const loop = () => {
    requestAnimationFrame(loop);
    //mesh.rotation.z += Math.PI / 180 * 1;
    //mesh.rotation.y += Math.PI / 180 * 5;
    renderer.render(scene, camera);

};
loop();
