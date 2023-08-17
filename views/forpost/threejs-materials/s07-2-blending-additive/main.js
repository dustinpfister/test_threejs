//-------- ----------
// SCENE, CAMERA, RENDERER, 2D CANVAS
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild( renderer.domElement );
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial({ 
    blending: THREE.AdditiveBlending, 
    transparent: true,
    opacity: 0.5
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.SphereGeometry( 1, 60, 60 );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh_1 = new THREE.Mesh(geometry, material);
mesh_1.position.x = 0;
scene.add(mesh_1);
const mesh_2 = new THREE.Mesh(geometry, material);
mesh_2.position.set( 0,-2, -3 );
scene.add(mesh_2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 3, 3);
camera.lookAt(0, 0, 0);
scene.background = 0x000000;
renderer.setClearColor(0x000000, 1);
renderer.render(scene, camera);
