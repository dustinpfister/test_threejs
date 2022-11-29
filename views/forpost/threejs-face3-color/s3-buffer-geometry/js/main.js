// create a buffed geometry
var geometry = new THREE.PlaneGeometry(1, 2, 1, 1);
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
geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3, true));

// SCENE
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);

// MESH that uses the vertex colors
var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: true
        }));
scene.add(mesh);

renderer.render(scene, camera);