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
//-------- ----------
// CANVAS ELEMENT AND TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 32; canvas.height = 32;
ctx.lineWidth = 5;
ctx.strokeStyle = '#ff0000';
ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
const texture = new THREE.CanvasTexture(canvas); 
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
// ---------- ----------
// MATERIAL LOADER - loading json with map option with key value of 'diffuse_one' that is then given by setTextures method
// ---------- ----------
const str_material = `
{
  "metadata":{
    "version":4.5,
    "type":"Material",
    "generator":"Hacked over Material.toJSON Export setting key value of map option"
  },
  "uuid":"a5ce8212-1239-49d2-b564-0dfb6d84441f",
  "type":"MeshBasicMaterial",
  "color":16777215,
  "map":"diffuse_one",
  "reflectivity":1,
  "refractionRatio":0.98,
  "depthFunc":3,
  "depthTest":true,
  "depthWrite":true,
  "colorWrite":true,
  "stencilWrite":false,
  "stencilWriteMask":255,
  "stencilFunc":519,
  "stencilRef":0,
  "stencilFuncMask":255,
  "stencilFail":7680,
  "stencilZFail":7680,
  "stencilZPass":7680
}
`;
const loader =  new THREE.MaterialLoader();
loader.setTextures({
    diffuse_one: texture
});
const material = loader.parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
