//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 64 / 48, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
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
const extrudeSettings = {
    depth: 1.5,
    bevelEnabled: true,
    curveSegments: 40,
    bevelSegments: 20,
    steps: 8,
    bevelThickness: 0.75,
    bevelSize: 0.75 };
const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
geometry.rotateX(Math.PI * 1);
geometry.center();
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
let s = 0.25;
mesh.scale.set(s, s, s);
// add the mesh to the scene
scene.add(mesh);
//-------- ---------- 
// RENDER
//-------- ----------
renderer.render(scene, camera);
