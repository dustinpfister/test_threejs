// see r111 demo for a code that seems to be working well on Rpi
//****** **********
// camera and renderer
//****** **********
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//****** **********
// WEBGL2 CHECK
//****** **********
if(renderer.capabilities.isWebGL2){
    console.log('Looks like we have WebGL2 to work with here');
    //****** **********
    // BONES AND SKELETON
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
    const geometry = new THREE.CylinderGeometry( 5, 5, 5, 5, 15, 5, 30 );
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.SkinnedMesh( geometry, material );
    mesh.bind( skeleton );
    scene.add( mesh );
}else{
    console.log('We do not have webgl2');
}
//****** **********
// RENDER
//****** **********
renderer.render(scene, camera);
