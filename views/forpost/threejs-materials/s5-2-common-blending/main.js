//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
// array of materials for a box geometry where each 
// material is using THREE.NoBlending over the default of THREE.NormalBlending
const materials_box = [
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0x00ffff, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0x00ff00, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xffff00, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xff0000, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xff00ff, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xffffff, transparent: true, opacity: 0.10 } )
];
// line material for grid. Also using THREE.NoBlending
const material_grid = new THREE.LineBasicMaterial({
    blending: THREE.NoBlending,
    vertexColors: true,
    linewidth: 8,
    transparent: true,
    opacity: 0.1
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh_box = new THREE.Mesh(geometry, materials_box);
scene.add(mesh_box);
const grid = new THREE.GridHelper( 10, 10, 0x00ff00, 0x00ff00 );
grid.material = material_grid;
scene.add(grid);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
