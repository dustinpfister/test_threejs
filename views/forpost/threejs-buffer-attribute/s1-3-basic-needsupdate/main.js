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
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
const att_pos = geometry.getAttribute('position');
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points1 = new THREE.Points( geometry, new THREE.PointsMaterial({ size: 0.1, color: 0x00ff00 }));
scene.add(points1);
// ---------- ----------
// LOOP
// ---------- ----------
camera.position.set( 1.5, 1, 1.7 );
camera.lookAt(0, 0, 0);
const update = () => {
    let i = 0;
    while(i < att_pos.count){
        const v = new THREE.Vector3().fromBufferAttribute( att_pos, i );
        v.normalize().multiplyScalar( 0.25 + 0.75 * Math.random() );
        att_pos.setXYZ(i,  v.x, v.y, v.z );
        att_pos.needsUpdate = true;
        i += 1;
    }
};
const FPS = 4;
let lt = new Date();
const loop = () => {
    const now = new Date();
    const secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs >= 1 / FPS){
        update();
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();