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
// SHAPE / PATH
// ---------- ----------
const shape = new THREE.Shape();
shape.moveTo(  0,-1 );
shape.bezierCurveTo( 0.25,-0.25,    0.25,0,    1,0 );
shape.lineTo(  1,1 );
shape.lineTo( -1,1 );
shape.bezierCurveTo(-2,0,   -2,-1,   0,-1 );
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.ExtrudeGeometry(shape);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial() );
scene.add(mesh1)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 3);
camera.lookAt(-0.3, 0, 0);
renderer.render(scene, camera);
