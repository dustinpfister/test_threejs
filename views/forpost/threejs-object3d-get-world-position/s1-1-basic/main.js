//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(5, 5) );
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS - a parent mesh, with a single child mesh
//-------- ----------
const mat = new THREE.MeshNormalMaterial();
const parent = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), mat );
const child = new THREE.Mesh( new THREE.SphereGeometry(0.5, 30, 30), mat );
parent.add(child);
scene.add(parent);
//-------- ----------
// Setting position of parent and child
//-------- ----------
parent.position.set(-1.5,0.5,0.5); // realtive to scene object ( aligned with world space )
child.position.set(1.2, 1.2, 1.2); // relative to parent object
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 2, 4);
// JUST PASSING child.position WILL RESULT IN THE CAMERA LOOKING AT WHERE THE LOCATION OF THE CHILD
// MESH WOULD BE IF IT WAS RELATIVE TO WORLD SPACE RATHER THAN THE PARENT MESH. TO FIX THIS USE
// THE Object3d.getWorldPosition METHOD
//camera.lookAt( child.position );
camera.lookAt( child.getWorldPosition(new THREE.Vector3()) );
renderer.render(scene, camera);