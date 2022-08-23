// SCENE
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));

var group = new THREE.Group();
scene.add(group);

var createBox = function(w, h, d){
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
            color: 'red'
        }));
    return box;
};
var mainBox = createBox(1, 1, 1);
group.add(mainBox);

// Mesh cloned a bunch of times from original
var i = 0, mesh, rad, s, x, z;
while (i < 10) {
    s = 0.25 + 0.25 * ( Math.random() * 5 );
    mesh = createBox(s, s, s);
    // changes made to position and rotation to not effect original
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(mainBox.position);
    group.add(mesh);
    i += 1;
}

// changing the color of the main box ONLY EFFECTS THE MAIN BOX
mainBox.material.color.setRGB(0, 1, 0);

// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
// add a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);


// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480);

renderer.render(scene, camera);
