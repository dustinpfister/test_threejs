// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.8, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: {
        baseColor : { value: new THREE.Color('cyan') },
        opacity: { value: 1 }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
    fragmentShader: `
        uniform vec3 baseColor;
        uniform float opacity;
        void main() {
            float d = 1.0 - gl_FragCoord.z;
            gl_FragColor = vec4( baseColor * d, opacity );
        }`
});
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.BoxGeometry( 1, 1, 1);
const mesh1 = new THREE.Mesh(geometry, material1);
mesh1.rotation.y = Math.PI / 180 * 20;
scene.add(mesh1);
const material2 = material1.clone();
material2.uniforms.baseColor.value = new THREE.Color('lime');
console.log(material2);
const mesh2 = new THREE.Mesh(geometry, material2);
mesh2.position.set(-1, 0, 1)
mesh2.rotation.y = Math.PI / 180 * 20;
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

