
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(3, 3));

// creating a group
var group = new THREE.Group();

// creating and adding a pointer mesh to the group
var geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
geo.rotateX(Math.PI / 2);
var pointer = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
pointer.position.set(0, 0, 0);
group.add(pointer);

// creating and adding a cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
cube.position.set(0,0,2);
group.add(cube);


// box helper for the group
group.add(new THREE.BoxHelper(group));

// changing the position of the group to something other that 0,0,0
group.position.set(-1.0, 0, -1.0);

scene.add(group);

// pointer looks at 0,0,0 in the grid, but not the center of the group
pointer.lookAt(0, 0, 0);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(2, 4, 2);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
