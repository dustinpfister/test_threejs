//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const materials = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    side: THREE.FrontSide
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0.00,  0.00,  0.00,
    1.00,  0.00,  0.00,
    0.50,  1.00, -0.50,
    1.00,  0.00,  0.00,
    0.75,  0.00, -1.00,
    0.50,  1.00, -0.50
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.computeVertexNormals();
//-------- ----------
// SCENE CHILD OBJECTS - GRID, MESH, AND LIGHTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh( geometry, materials);
scene.add(mesh1);
const pl = new THREE.PointLight(0xffffff);
pl.position.set(4, 2, 4);
scene.add(pl);
const al = new THREE.AmbientLight(0xffffff);
al.intensity = 0.2;
scene.add(al);
//-------- ---------- 
// LOOP
//-------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

