//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(2, 2, 2);
scene.add(light);
const light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(-2, -2, -2);
scene.add(light2);
//-------- ----------
// LOAD/RENDER
//-------- ----------
camera.position.set(3, 3, 2);
camera.lookAt(0, 0, 0); 
// Loader
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // URL
    '/forpost/threejs-buffer-geometry-loader/buffer-geo/three_2.json',
    // Load Done
    function ( geometry ) {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({}));
        scene.add(mesh);
        renderer.render(scene, camera);
    },
    // Progress
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Error
    function ( err ) {
        console.log( 'An error happened' );
    }
);

