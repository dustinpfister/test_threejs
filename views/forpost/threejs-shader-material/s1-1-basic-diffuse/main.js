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
const material1 = new THREE.ShaderMaterial({
    uniforms: {
        diffuse: { value: new THREE.Color(0xffffff) }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
    fragmentShader: `
        uniform vec3 diffuse;
        void main() {
            gl_FragColor = vec4( diffuse, 1.0 );
        }`
});
material1.uniforms.diffuse.value = new THREE.Color(0,1,0);
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

