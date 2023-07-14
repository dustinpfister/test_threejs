// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo')  || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0.5, 0);
const state = {
   mesh: null,
   mixer: null
};
// loop
let frame = 0;
const frame_max = 30;
const loop = () => {
    requestAnimationFrame(loop);
    const a1 = frame / frame_max;
    state.mixer.setTime(1 * a1);
    renderer.render(scene, camera);
    frame += 1;
    frame %= frame_max;
};
//-------- ----------
// BUFFER GEOMETY LOADER
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
    '/json/tri12-butterfly/set1-buffergeometry/0.json',
    // onLoad callback
    (geometry) => {
        // add mesh
        state.mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                vertexColors: true, 
                side: THREE.DoubleSide
            })
        );
        scene.add(state.mesh);
        // creating a Number Key Frame Track, clip, mixer, and action
        const track = new THREE.NumberKeyframeTrack('.morphTargetInfluences[0]', 
           [ 0, 0.25, 0.5, 0.75, 1],
           [ 0, 0.30, 0.5, 0.15, 0]
        );
        const clip = new THREE.AnimationClip('flap', -1, [ track ] );
        state.mixer = new THREE.AnimationMixer(state.mesh);
        const action = state.mixer.clipAction( clip );
        action.play();
        // start loop
        loop();
    }
);
