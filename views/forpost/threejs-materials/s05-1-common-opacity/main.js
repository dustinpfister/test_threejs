//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTION
//-------- ----------
const createCube = function (size, material, x, y, z) {
    const geometry = new THREE.BoxGeometry(size, size, size, 8, 8, 8),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// mesh objects and mesh materails using opacity
scene.add( createCube(1, new THREE.MeshNormalMaterial( { transparent: true, opacity: 0.4 } ), 0, 0, 0) );
scene.add( createCube(1, new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.7 } ), -1.4, -0.5, 0) );
scene.add( createCube(1, new THREE.MeshPhongMaterial( { transparent: true, opacity: 0.2 } ), -0.4, -0.5, -2) );
// points
const material_points = new THREE.PointsMaterial({ size: 0.2, transparent: true, opacity: 0.05 });
const points = new THREE.Points( new THREE.SphereGeometry(2, 20, 20), material_points );
scene.add(points);
// light
const dl = new THREE.DirectionalLight();
dl.position.set(3, 2, 1)
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
