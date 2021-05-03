

var tree = TreeSphereMod.create({
    sphereSize: 0.75,
    materials: {
        sphere: new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            map: canvasTextureMod.randomGrid(['0', 'r1', '0'], 32, 32, 150),
            side: THREE.DoubleSide
        }),
        trunk: new THREE.MeshBasicMaterial({
            color: 0xffaf00,
            map: canvasTextureMod.randomGrid(['r1', 'r1', '0'], 32, 32, 150),
            side: THREE.DoubleSide
        })
    }
});

// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(tree);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, -2, 5);
camera.lookAt(0, -2, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
