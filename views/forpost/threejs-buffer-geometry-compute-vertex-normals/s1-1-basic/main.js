//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 0, 3);
scene.add(dl);
scene.add(new THREE.AmbientLight(0xffffff, 0.1));
//-------- ----------
// GEOMETRY - cretaing from raw hard coded data
//-------- ----------
const geometry = new THREE.BufferGeometry();
const data_points = [
    -1.0,  0.0,  0.0,
     1.5,  0.0,  0.0,
     1.0,  1.0,  0.0
];
// create attributes
geometry.setAttribute('position', new THREE.Float32BufferAttribute(data_points, 3) );
geometry.computeVertexNormals(); // COMPUTE VERTEX NORMALS FOR THE GEMOERTY
//-------- ----------
// MESH with GEOMETRY, and STANDARD MATERIAL
//-------- ----------
const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    }));
scene.add(mesh);
// RENDER
renderer.render(scene, camera);
