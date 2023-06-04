//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GRID, MOVE CAMERA
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) )
camera.position.set(-10, 8, -10);
camera.lookAt(0, -1, 0);
//-------- ----------
// LOADER
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
loader.load( '/json/position/customtri/position-only.json', (geometry) => {
    const points = new THREE.Points( geometry, new THREE.PointsMaterial());
    scene.add(points);
    renderer.render(scene, camera);
});

