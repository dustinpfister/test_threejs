
// creating a scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(3, 3));

var group = new THREE.Group();
var geo = new THREE.CylinderGeometry( 0, 0.5, 1, 12 );
geo.rotateX( Math.PI / 2 );
var pointer = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
pointer.position.set(0, 0, 0);
group.add(pointer);
scene.add(group);
group.add(new THREE.BoxHelper(group));
group.position.set(-1, 0, -1);

group.lookAt(0, 0, 0);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(2, 4, 2);
camera.lookAt(0,0,0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
