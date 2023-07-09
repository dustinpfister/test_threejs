//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// TEXT
//-------- ----------
const text_buffgeo = `{
  "metadata":{
    "version":4.5,
    "type":"BufferGeometry",
    "generator":"Hand Coded"
  },
  "type":"BufferGeometry",
  "data":{
    "attributes":{
      "position":{
        "itemSize":3,
        "type":"Float32Array",
        "array":[
            -8, 2,-8,     0, -1,-8,    8, 0,-8,
            -8, 4, 0,     0, 0, 0,    8, 0, 0,
            -8, 2, 8,     0, -2, 8,    8, 0, 8
        ],
        "normalized":false
      }
    },
    "index":{
      "type": "Uint16Array",
      "array": [
          1,0,3,  3,4,1,
          4,3,6,  6,7,4,
          5,4,7,  7,8,5,
          2,1,4,  4,5,2
      ]
    }
  }
}
`
//-------- ----------
// SCENE CHILD OBJECTS - Using THREE.BufferGeometryLoader parse method
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
const geometry = loader.parse( JSON.parse(text_buffgeo) );
const line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(20, 10, 20);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera)

