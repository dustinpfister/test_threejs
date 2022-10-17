//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//  MESH
//-------- ----------
const geo = new THREE.CylinderGeometry(0, 0.5, 2, 40, 40);
geo.rotateX(Math.PI * 0.5);
const material = new THREE.MeshNormalMaterial({transparent: true, opacity: 1});
const m1 = material.clone();
m1.opacity = 0.5;
const pointer1 = new THREE.Mesh(geo, m1);
scene.add(pointer1);
const pointer2 = new THREE.Mesh(geo, material);
//pointer2.geometry.rotateX(Math.PI * 0.5);
scene.add(pointer2);
//-------- ----------
//  MOVING SCENE
//-------- ----------
// moving the scene object away from 0,0,0
scene.position.set(0, 0, 10);
// having pointer1 look at position of scene object
pointer1.position.set(2, 0, 2);
pointer1.lookAt(scene.position);
// pointer 2 at same position as pointer1
// however I am having it point at 0,0,0 world space
// rather than the position of the scene object in world space 
// that has moved away from 0,0,0
pointer2.position.set(2, 0, 2);
pointer2.lookAt(0, 0, 0);
// positioning the camera ( That is not a child of scene )
// at 0, 2, 0 in world space and having it look at the 
// pointer position
const ct = new THREE.Vector3();
pointer1.getWorldPosition(ct);
camera.position.set(0, 2, 0);
camera.lookAt(ct);
camera.zoom = 7;
camera.updateProjectionMatrix();
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
