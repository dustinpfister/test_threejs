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
        varying vec2 vHighPrecisionZW;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
    fragmentShader: `
        uniform vec3 baseColor;
        uniform float opacity;
        uniform float depthAlpha;
        varying vec2 vHighPrecisionZW;
        void main() {
            float d = (1.0 - gl_FragCoord.z);
            gl_FragColor = vec4( baseColor * d, opacity );
        }`
});
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5);
const mesh = new THREE.Mesh(geometry, material1);
mesh.rotation.y = Math.PI / 180 * 20;
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

