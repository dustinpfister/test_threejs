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
// SHADER MATERIAL
// ---------- ----------
const shader_basic = {};
// unifrom values for basic shader
shader_basic.uniforms = {
    uBaseColor: { type: 'c', value: new THREE.Color(0x1a1a1a) }
};
// vertex shader for basic shader
shader_basic.vertexShader = [
    'void main() {',
    '    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}'
].join('\n');
// fragment shader for hatching shader
shader_basic.fragmentShader = [
    'uniform vec3 uBaseColor;',
    'void main() {',
    '    gl_FragColor = vec4( uBaseColor, 1.0 );',
    '}'
].join('\n');
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(shader_basic.uniforms),
    vertexShader: shader_basic.vertexShader,
    fragmentShader: shader_basic.fragmentShader
});
material1.uniforms.uBaseColor.value = new THREE.Color(0,1,0);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.TorusGeometry( 3, 1, 100, 100);
geo.rotateX(Math.PI * 0.5);
const mesh = new THREE.Mesh(geo, material1);
mesh.position.y = 1;
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

