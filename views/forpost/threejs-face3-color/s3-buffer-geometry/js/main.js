//-------- ----------
// SCENE
//-------- ----------
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// BUFFER GEOMERTY
//-------- ----------
var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array([
    -1, 0, 0,
     1, 0, 0,
     1, 1.25, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//-------- ----------
// COLORS
//-------- ----------
// add a colors prop to the geometry
var colors = new Uint8Array([
            255, 0, 0,
            0, 255, 0,
            0, 0, 255,
            0, 0, 255,
            0, 255, 0,
            255, 0, 0,
        ]);
// Don't forget to normalize the array! (third param = true)
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
//-------- ----------
// MESH
//-------- ----------
// MESH that uses the vertex colors
var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: true,
            side: THREE.DoubleSide
        }));
scene.add(mesh);
//-------- ----------
// RENDERER
//-------- ----------
renderer.render(scene, camera);
