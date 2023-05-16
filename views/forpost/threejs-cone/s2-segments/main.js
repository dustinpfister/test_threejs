//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff);
dl.position.set( 1, 2, 3 );
scene.add(dl);
//-------- ----------
// SCENE CHILD OBJECTS - Mesh Using cone geometry with custom segment counts
//-------- ----------
const coneGeo = new THREE.ConeGeometry(2, 4,
    60, // radian segments,
    20 // height segments
),
coneMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00
}),
mesh1 = new THREE.Mesh(coneGeo, coneMaterial);
scene.add(mesh1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
