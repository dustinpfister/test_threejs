var createGroup = function (color) {
    color = color || new THREE.Color(1, 1, 1);
    // creating a group
    var group = new THREE.Group();
    // creating and adding a pointer mesh to the group
    var geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
    geo.rotateX(Math.PI * 0.5);
    var pointer = group.userData.pointer = new THREE.Mesh(
            geo,
            new THREE.MeshNormalMaterial());
    pointer.position.set(0, 0, 0);
    pointer.rotation.y = 1.57; // BY DEFAULT THE POINTER IS NOT POINTING AT THE CUBE
    group.add(pointer);
    // creating and adding a cube
    var cube = group.userData.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 }));
    cube.position.set(0, 0, 1);
    group.add(cube);
    // box helper for the group
    group.add(new THREE.BoxHelper(group));
    return group;
};
 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
 
var group = createGroup(0xff0000); // group 1
scene.add(group);
group.position.set(-2.0, 0, 0.0);
var group2 = createGroup(0x00ff00); // group2
scene.add(group2);
group2.position.set(2.0, 0, 0.0);
 
// the first group in am just using the look at method, and passing
// the value of the cube.position instance of vector3. THIS RESULTS IN THE
// CONE NOT POINTING AT THE CUBE, but at the location of the cube if it where
// positioned relative to world space rather than a location relative to the group
group.userData.pointer.lookAt(group.userData.cube.position);
 
// IF I WANT TO HAVE THE POINTER LOOK AT THE CUBE
// THAT IS A CHILD OF THE GROUP, THEN I WILL WANT TO ADJUST
// FOR THAT FOR THIS THERE IS THE getWorldPosition METHOD
var v = new THREE.Vector3(0, 0, 0);
group2.userData.cube.getWorldPosition(v);
group2.userData.pointer.lookAt(v);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);