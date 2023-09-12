//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SHAPE
//-------- ----------
const heartShape = new THREE.Shape();
heartShape.moveTo( 2.5, 2.5 );
heartShape.bezierCurveTo( 2.5, 2.5, 2.0, 0, 0, 0 );
heartShape.bezierCurveTo( - 3.0, 0, - 3.0, 3.5, - 3.0, 3.5 );
heartShape.bezierCurveTo( - 3.0, 5.5, - 1.0, 7.7, 2.5, 9.5 );
heartShape.bezierCurveTo( 6.0, 7.7, 8.0, 5.5, 8.0, 3.5 );
heartShape.bezierCurveTo( 8.0, 3.5, 8.0, 0, 5.0, 0 );
heartShape.bezierCurveTo( 3.5, 0, 2.5, 2.5, 2.5, 2.5 );
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.ShapeGeometry( heartShape );
geometry.rotateX(Math.PI);
geometry.rotateY(Math.PI);
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
