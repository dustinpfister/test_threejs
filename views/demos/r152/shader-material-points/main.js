// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.ShaderMaterial({
    uniforms: {
        size: { value: 10.00 },
        diffuse: { value: new THREE.Color(0x00ff00) }
    },
    vertexShader: `
        uniform float size;
        void main() {
            gl_PointSize = size;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform vec3 diffuse;
        void main() {
            gl_FragColor = vec4( diffuse, 1.0 );
        }
    `
});
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const points = new THREE.Points( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
