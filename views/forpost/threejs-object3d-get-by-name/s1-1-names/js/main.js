//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CREATEING A GROUP AND MESH OBJECTS WITH NAMES
//-------- ----------
(function(){
    // this is all local to this IIFE, so I can
    // not use the varibles outside of this. HOWEVER
    // I AM SETTING NAMES AND ADDING THEM AS CHILDREN
    // OF THE SCENE OBJECT
    const group = new THREE.Group();
    group.name = 'boxGroup';
    const box1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box1.position.set(0, 0, 0);
    box1.name = 'box1';
    group.add(box1);
    const box2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    box2.position.set(-2, 0, 0);
    box2.name = 'box2';
    group.add(box2);
    group.add(new THREE.BoxHelper(group));
    group.position.set(0, 0, 0);
    scene.add(group);
}());
//-------- ----------
// GET BY NAME
//-------- ----------
// GETTING GROUP AND BOX1 BY THE NAMES OUTSIDE OF THE IIFE
const group = scene.getObjectByName('boxGroup');
var box = group.getObjectByName('box1');
box.rotation.set(Math.PI / 180 * 45, 0, 0);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
