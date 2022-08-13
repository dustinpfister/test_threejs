//****** **********
// SCENE, CAMERA and RENDERER
//****** **********
const scene = new THREE.Scene();
scene.add(  new THREE.GridHelper(10, 10) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//****** **********
// BONES and SKELETON
//****** **********
const bones = [];
const a = new THREE.Bone();
const b = new THREE.Bone();
b.position.y = 2;
// adding b as a child of a
a.add(b);
// even though b is a child of a I must push them both to the bones array
bones.push(a, b);
const skeleton = new THREE.Skeleton( bones );
//****** **********
// GEMOERTY and SKINNED MESH
//****** **********
const geometry = new THREE.CylinderGeometry( 5, 5, 5, 5, 15, false);
// buffer geometry must be used with skinned mesh
var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);


// create the skin indices and skin weights manually
// (typically a loader would read this data from a 3D model for you)
const sizing = {
    halfHeight: 100,
    segmentHeight: 200
};
const position = bufferGeometry.attributes.position;
const vertex = new THREE.Vector3();
const skinIndices = [];
const skinWeights = [];
for ( let i = 0; i < position.count; i ++ ) {
	vertex.fromBufferAttribute( position, i );
	// compute skinIndex and skinWeight based on some configuration data
	const y = ( vertex.y + sizing.halfHeight );
	const skinIndex = Math.floor( y / sizing.segmentHeight );
	const skinWeight = ( y % sizing.segmentHeight ) / sizing.segmentHeight;
	skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
	skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );
}
bufferGeometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
bufferGeometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );


const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.SkinnedMesh( bufferGeometry, material );
mesh.bind( skeleton );
scene.add( mesh );

const rootBone = skeleton.bones[ 0 ];
mesh.add( rootBone );

skeleton.bones[ 0 ].rotation.x = -0.1;
skeleton.bones[ 1 ].rotation.x = 0.2;

//****** **********
// RENDER
//****** **********
renderer.render(scene, camera);
