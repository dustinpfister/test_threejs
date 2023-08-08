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
        intensity: { value: 3.0 }
    },
    vertexShader: `
        uniform float intensity;
        varying vec3 v_color;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            v_color = position * intensity;
        }`,
    fragmentShader: `
        varying vec3 v_color;
        void main() {
            gl_FragColor = vec4( v_color, 1.0 );
        }`
});
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geometry = new THREE.SphereGeometry( 1.0, 30, 30);
const mesh1 = new THREE.Mesh(geometry, material1);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
let frame = 0;
const frameMax = 900;
const loop = () => {
    const a_frame = frame / frameMax;
    a_inten = Math.sin( Math.PI * (a_frame * 9 % 1) );
    requestAnimationFrame(loop);
    material1.uniforms.intensity.value = 1 + (1 + 7 * a_frame) * a_inten;
    renderer.render(scene, camera);
    frame += 1;
    frame %= frameMax;
};
loop();

