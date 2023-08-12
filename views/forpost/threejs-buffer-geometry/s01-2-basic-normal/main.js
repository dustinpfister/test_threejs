//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// START GEOMETRY / POSITION ATTRIBUTE / NORMAL ATTRIBUTE
//-------- ----------
const geometry = new THREE.BufferGeometry();
const data_pos = [
    0, 0, 0,
    1, 0, 0,
    1, 1, 0
];
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array( data_pos), 3) );
const data_normal = [
   0, -0, 1,
   0, -0, 1,
   0, -0, 1
];
geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array( data_normal ), 3) );
//-------- ----------
// GRID / MESH OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(
        geometry,
        new THREE.MeshNormalMaterial({
            side: THREE.FrontSide
        }));
mesh1.rotateY(Math.PI * 0.15);
scene.add(mesh1);
//-------- ----------
// VERTEX HELPERS IF THERE
//-------- ----------
if(THREE.VertexNormalsHelper){
    const vertHelper1 = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
    scene.add(vertHelper1);
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 0.5, 3);
camera.lookAt( 0, 0, 0);
renderer.render(scene, camera);
