//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
camera.position.setFromSphericalCoords(
    25,
    THREE.MathUtils.degToRad(70),
    THREE.MathUtils.degToRad(225)
);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
const container = ( document.getElementById('demo') || document.body);
container.appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
// A Mesh with a Sphere for geometry and using the Standard Material
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(3, 30, 30),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color('red'),
        wireframe: true
    })
);
scene.add(mesh);
// USING setFromSphericalCoords to set position of the Mesh
const radius = 10,
phi = THREE.MathUtils.degToRad(90),
theta = THREE.MathUtils.degToRad(270);
mesh.position.setFromSphericalCoords(radius, phi, theta);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
