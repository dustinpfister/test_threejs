/* 
 *
 * The full source code of threejs doc example can be found here:
 * https://github.com/mrdoob/three.js/blob/dev/docs/scenes/bones-browser.html
 *
 * see r111 demo for a code where I am trying ot get this to work on rpi which might be a hopeless endeavor
 */
//****** **********
// camera and renderer
//****** **********
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//****** **********
// WEBGL2 CHECK
//****** **********
if(renderer.capabilities.isWebGL2){
    console.log('Looks like we have WebGL2 to work with here');
    //****** **********
    // BONES and SKELETON
    //****** **********
    const bones = [];
    const a = new THREE.Bone();
    const b = new THREE.Bone();
    a.position.y = -2.5;
    b.position.y = 5;
    // adding b as a child of a
    a.add(b);
    // even though b is a child of a I must push them both to the bones array
    bones.push(a, b);
    const skeleton = new THREE.Skeleton( bones );
    //****** **********
    // GEMOERTY and SKINNED MESH
    //****** **********
    const geometry = new THREE.CylinderGeometry( 1, 1, 5, 15, 15, false);
    // create the skin indices and skin weights manually
    // (typically a loader would read this data from a 3D model for you)
    const sizing = {
        halfHeight: 2,
        segmentHeight: 100
    };
    const position = geometry.attributes.position;
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
    geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
    geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );
    // material and skinned mesh
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.SkinnedMesh( geometry, material );
    mesh.bind( skeleton );
    scene.add( mesh );
    // must add root bone
    const rootBone = skeleton.bones[ 0 ];
    mesh.add( rootBone );
    //****** **********
    // RENDER
    //****** **********
    var loop = function(){
        requestAnimationFrame(loop);
    var x = -0.3 + 0.6 * Math.random();
    var y = -0.3 + 0.6 * Math.random();
    var z = -0.3 + 0.6 * Math.random();
    skeleton.bones[ 0 ].rotation.set(x, y, z);

    //mesh.position.x = -1 + 2 * Math.random()

//console.log(skeleton.bones[ 0 ])
    renderer.render(scene, camera);
}
loop();
}else{
    console.log('We do not have webgl2');
}
//****** **********
// RENDER
//****** **********
renderer.render(scene, camera);
