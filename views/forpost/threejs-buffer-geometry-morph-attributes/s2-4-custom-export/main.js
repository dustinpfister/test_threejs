// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.4, 0.4, 0.4);
scene.add( new THREE.GridHelper(10, 10) )
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 3, 4);
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
// render
// ---------- ----------
mesh.morphTargetInfluences[ 0 ] = 0;
mesh.morphTargetInfluences[ 1 ] = 0;
mesh.morphTargetInfluences[ 2 ] = 0;
mesh.geometry.computeVertexNormals();
renderer.render(scene, camera);
// ---------- ----------
// EXPORT
// ---------- ----------

const sceneObject = geo2.toJSON();

const replacer = function(key, value){
    // works but arrays are now strings
    //if(value instanceof Array){
    //    return JSON.stringify(value);
    //}
    return value;
}

console.log( JSON.stringify(sceneObject, replacer, 2) );

