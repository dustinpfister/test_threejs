//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo')  || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 200,
mesh;
const loop = function () {
    const per = frame / maxFrame;
    requestAnimationFrame(loop);
    mesh.rotation.set(Math.PI / 2, Math.PI * 2 * per, 0);
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
//-------- ----------
// Loader
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
    '/json/static/box_house1_solid.json',
    // onLoad callback
    (geometry) => {
        // create a mesh with the geometry
        // and a material, and add it to the scene
        mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: 0x00ff0000,
                emissive: 0x2a2a2a,
                side: THREE.DoubleSide
            }));
        scene.add(mesh);
        loop();
    }
);
