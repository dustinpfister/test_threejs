
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
dl.position.set(0, 1, 3)
scene.add(dl);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.ConeGeometry(
        5, // radius
        10, // height
        32, //radial segments,
        1, // height segments
        false, // open ended or capped, false means capped
        0, // start angle
        Math.PI // angle length from start
);
//-------- ----------
// MATERIAL/MESH
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
