// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.4, 0.4, 0.4);
scene.add( new THREE.GridHelper(10, 10) )
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 3, 4);
camera.lookAt(0, -1, -1);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// BUFFER GEOMETRY LOADER
// ---------- ----------
const loader = new THREE.BufferGeometryLoader();
loader.load(
    '/forpost/threejs-buffer-geometry-morph-attributes/json/custom1.json',
    function(geo){
        const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geo, material);
        scene.add(mesh);
        mesh.morphTargetInfluences[ 2 ] = 0.75;
        renderer.render(scene, camera);
    }
);