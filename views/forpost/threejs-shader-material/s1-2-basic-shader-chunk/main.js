// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER OBJECT - Using THREE.ShaderChunk for the vertex and fragment shaders
// ---------- ----------
const shdaer_basic =  {
    // just a default diffuse color of cyan for uniforms
    uniforms: { 
        diffuse: { value: new THREE.Color(0.5, 1, 1) }
    },
    // just using the same code from 'MeshBasicMaterial' for
    // vertex and fragment shaders
    vertexShader: THREE.ShaderChunk[ 'meshbasic_vert' ],
    fragmentShader: THREE.ShaderChunk[ 'meshbasic_frag' ],
};
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material = new THREE.ShaderMaterial(shdaer_basic);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.BoxGeometry( 2, 2, 2);
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

