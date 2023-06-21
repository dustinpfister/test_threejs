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
const geometry = new THREE.SphereGeometry(0.25, 30, 30);
const att_pos = geometry.getAttribute('position');
let i = 0;
while(i < att_pos.count){
    const v = new THREE.Vector3().fromBufferAttribute( att_pos, i );
    v.normalize().multiplyScalar( 0.25 + 0.75 * Math.random() );
    att_pos.setXYZ(i,  v.x, v.y, v.z );
    att_pos.needsUpdate = true;
    i += 1;
}

// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points1 = new THREE.Points( geometry, new THREE.PointsMaterial({ size: 0.1, color: 0x00ff00 }));
scene.add(points1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set( 1.5, 1, 1.7 );
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
