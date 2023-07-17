//-------- ----------
// SCENE, CAMERA, RENDERER, 2D CANVAS
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.display = 'block';
canvas.width = 640;
canvas.height = 480;
(document.getElementById('demo') || document.body).appendChild(canvas);
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({ 
    blending: THREE.NoBlending, 
    color: 0xff0000,
    transparent: true,
    opacity: 0.1
});
const material_compare = new THREE.MeshBasicMaterial({ 
    blending: THREE.NormalBlending,
    color: 0x00ff00,
    transparent: true,
    opacity: 0.1
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.SphereGeometry( 1, 60, 60 );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh_1 = new THREE.Mesh(geometry, material);
mesh_1.position.x = -1.25;
scene.add(mesh_1);
const mesh_2 = new THREE.Mesh(geometry, material_compare);
mesh_2.position.x = 1.25;
scene.add(mesh_2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 3, 3);
camera.lookAt(0, 0, 0);
scene.background = 0x000000;
//renderer.setClearColor(null, 0);
renderer.render(scene, camera);
//ctx.fillstyle = 'white';
//ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.drawImage(renderer.domElement, 0,0, canvas.width, canvas.height );
