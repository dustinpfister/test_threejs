//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHAPE / PATH
// ---------- ----------
const shape = new THREE.Shape();
shape.moveTo(  0,-1 );
shape.bezierCurveTo( 0.25,-0.25,    0.25,0,    1,0 );
shape.lineTo(  1,1 );
shape.lineTo( -1,1 );
shape.bezierCurveTo(-2,0,   -2,-1,   0,-1 );
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.ExtrudeGeometry(shape);
//-------- ----------
// MESH, GRID HELPER
//-------- ----------
const material = new THREE.MeshNormalMaterial({  });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 2, 4);
camera.lookAt( mesh.position );
renderer.render(scene, camera);