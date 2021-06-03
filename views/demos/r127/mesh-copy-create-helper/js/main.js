// SCENE
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));

// MESH original
var original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
       // Now using the Standard material
        new THREE.MeshStandardMaterial({
            color: 'red'
        }));
scene.add(original);

// add a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);

// Mesh cloned a bunch of times from original
var i = 0, mesh, rad, x, z;
while (i < 10) {
    mesh = original.clone();
    // changes made to position and rotation to not effect original
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}

// a change to the color of the original will effect all the clones also
original.material.color.setRGB(0, 1, 0);

// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);

// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480);

renderer.render(scene, camera);
