//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 0.85, 0.75);
camera.lookAt(0, -0.125, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH - using mutated normals attribute and normal material
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1),
normal = geo.getAttribute('normal');
normal.array[0] = -1;
normal.array[1] = -1;
normal.array[2] = -1;
const box = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);