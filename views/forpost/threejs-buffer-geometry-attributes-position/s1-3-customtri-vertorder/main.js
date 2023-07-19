//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
// 1
const geometry_1 = new THREE.BufferGeometry();
const data_pos_1 = new Float32Array( [
     0.0,  1.0,  0.0, // 0
    -1.0, -1.0,  0.0, // 1
     1.0, -1.0,  0.0  // 2
]);
geometry_1.setAttribute('position', new THREE.BufferAttribute( data_pos_1, 3 ));
//2
const geometry_2 = new THREE.BufferGeometry();
const data_pos_2 = new Float32Array( [
     0.0,  1.0,  0.0,  // 0
     1.0, -1.0,  0.0,  // 2
    -1.0, -1.0,  0.0,  // 1
]);
geometry_2.setAttribute('position', new THREE.BufferAttribute( data_pos_2, 3 ));
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10));
// mesh objects with material set in THREE.FrontSide for side property
const material_mesh = new THREE.MeshBasicMaterial({ side: THREE.FrontSide });
const mesh_1 = new THREE.Mesh(geometry_1, material_mesh);
mesh_1.position.x = -1.25;
scene.add(mesh_1);
const mesh_2 = new THREE.Mesh(geometry_2, material_mesh);
mesh_2.position.x = 1.25;
scene.add(mesh_2);
// points
const material_points = new THREE.PointsMaterial({ size : 0.25, color: new THREE.Color( 0, 1, 0 ) });
const points_1 = new THREE.Points( geometry_1, material_points );
points_1.position.copy(mesh_1.position);
scene.add( points_1 );
const points_2 = new THREE.Points( geometry_2, material_points );
points_2.position.copy(mesh_2.position);
scene.add( points_2 );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 2, 6);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
