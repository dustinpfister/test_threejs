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
// SHADER MATERIAL JSON AS HARD CODED STRING
// ---------- ----------
const str_material = `{
  "metadata":{
    "version": 4.5,
    "type": "Material",
    "generator": "Hacked-Over-Material.toJSON-Export"
  },
  "uuid": "15d8e01f-af72-4a5e-9188-b009814b7496",
  "type": "ShaderMaterial",
  "uniforms":{
    "diffuse":{
      "type":"c",
      "value": 65535
    }
  },
  "vertexShader": "void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);}",
  "fragmentShader": "uniform vec3 diffuse;void main(){gl_FragColor = vec4(diffuse,1);}"
}`;
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
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
