//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const material_line = new THREE.LineBasicMaterial({
    linewidth: 6,
    color: new THREE.Color('lime'),
    transparent: true,
    opacity: 0.25
});
const material_mesh = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
});
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(5, 0, -5);
const v_c1 = v1.clone().lerp(v2, 0.5).add( new THREE.Vector3( -10, 0, 0 ) );
const curve = new THREE.QuadraticBezierCurve3( v1, v_c1, v2);
//-------- ----------
// GEOMETRY / LINE
//-------- ----------
const geometry_line = new THREE.BufferGeometry().setFromPoints( curve.getPoints( 20 ) );
const line = new THREE.Line( geometry_line, material_line );
line.position.x = 0;
scene.add(line);
//-------- ----------
// GEOMETRY / MESH
//-------- ----------
const geometry_mesh = new THREE.TubeGeometry( curve, 30, 0.25, 30 );
const mesh = new THREE.Mesh( geometry_mesh, material_mesh );
mesh.position.x = -2;
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
