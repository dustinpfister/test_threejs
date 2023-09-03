// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import * as BufferGeometryUtils from 'BufferGeometryUtils';
//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_source_indexed = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const geo_source = geo_source_indexed.clone().toNonIndexed();
const geometry1 = BufferGeometryUtils.toTrianglesDrawMode(geo_source.clone(), THREE.TriangleStripDrawMode )
const geometry2 = BufferGeometryUtils.toTrianglesDrawMode(geo_source.clone(), THREE.TriangleFanDrawMode );
geometry1.computeVertexNormals();
geometry2.computeVertexNormals();
console.log( geo_source_indexed.index.count ); // 36
console.log( geo_source.index ); // null
console.log( geometry1.index.count );  // 102
console.log( geometry2.index.count );  // 102
//-------- ----------
// POINTS
//-------- ----------
const material =  new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geo_source, material);
scene.add(mesh);
const mesh1 = new THREE.Mesh(geometry1, material);
mesh1.position.set(-1, 0, 1.5);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geometry2, material);
mesh2.position.set(1, 0, 1.5);
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 3, 3);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
