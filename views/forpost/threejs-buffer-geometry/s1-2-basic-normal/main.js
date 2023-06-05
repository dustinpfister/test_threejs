//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// START GEOMETRY / POSITION ATTRIBUTE
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0,0,0,
    1,0,0,
    1,1,0
]);
// create position property
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//-------- ----------
// NORMALS ATTRIBUTE
//-------- ----------
geometry.computeVertexNormals();
//-------- ----------
// GRID/ MESH OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(
        geometry,
        new THREE.MeshNormalMaterial({
            side: THREE.FrontSide
        }));
mesh1.rotateY(Math.PI * 0.15);
mesh1.position.x  = 0.50;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
        geometry,
        new THREE.MeshNormalMaterial({
            side: THREE.BackSide
        }));
mesh2.rotateY(Math.PI * 0.75);
mesh2.position.x  = -0.50;
scene.add(mesh2);
//-------- ----------
// VERTEX HELPERS IF THERE
//-------- ----------
if(THREE.VertexNormalsHelper){
     const vertHelper1 = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
     scene.add(vertHelper1);
     const vertHelper2 = new THREE.VertexNormalsHelper(mesh2, 0.5, 0x00ff00);
     scene.add(vertHelper2);
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 0.5, 3);
camera.lookAt( 0, 0, 0);
renderer.render(scene, camera);
