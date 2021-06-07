const geometry = new THREE.CylinderGeometry( 5, 5, 5, 5, 15, 5, 30 );

// create the skin indices and skin weights

const position = geometry.attributes.position;

const vertex = new THREE.Vector3();

const skinIndices = [];
const skinWeights = [];

const sizing = {
  halfHeight: 0.5,
  segmentHeight: 1
};

for ( let i = 0; i < position.count; i ++ ) {

	vertex.fromBufferAttribute( position, i );

	// compute skinIndex and skinWeight based on some configuration data

	const y = ( vertex.y + sizing.halfHeight );

	const skinIndex = Math.floor( y / sizing.segmentHeight );
	const skinWeight = ( y % sizing.segmentHeight ) / sizing.segmentHeight;

	skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
	skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );

}

geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );

var bones = [];

var shoulder = new THREE.Bone();
var elbow = new THREE.Bone();
var hand = new THREE.Bone();

shoulder.add( elbow );
elbow.add( hand );

bones.push( shoulder );
bones.push( elbow );
bones.push( hand );

shoulder.position.y = -5;
elbow.position.y = 0;
hand.position.y = 5;

const mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshNormalMaterial() );
var skeleton = new THREE.Skeleton( bones );

const rootBone = skeleton.bones[ 0 ];
mesh.add( rootBone );

// bind the skeleton to the mesh

mesh.bind( skeleton );

// move the bones and manipulate the model

skeleton.bones[ 0 ].rotation.x = -0.1;
skeleton.bones[ 1 ].rotation.x = 0.2;
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
