//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LOADER
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
loader.load(
    '/json/static/box_house1_solid.json',
    (geometry) => {
        geometry.rotateX(Math.PI * 1.5);
        const mesh = new THREE.Mesh(
           geometry,
            new THREE.MeshNormalMaterial());
        scene.add(mesh);
        camera.position.set(-10, 8, -10);
        camera.lookAt(0, -1, 0);
        renderer.render(scene, camera);
    }
);

