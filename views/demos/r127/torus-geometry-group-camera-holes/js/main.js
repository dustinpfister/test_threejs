var createDonutChild = function(index, len){
    var per = index / len,
    radius = 0.6,
    tubeRadius = 0.25,
    radialSegments = 16,
    tubeSegments = 30;
    var donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial());
    return donut;
};

var createDonutGroup = function(){
    var i = 0,
    len = 10,
    group = new THREE.Group();
    while(i < len){
        var donut = createDonutChild(i, len);
        donut.position.set(0, 0, 0);
        group.add(donut);
        i += 1;
    }
    return group;
};

// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));

var group = createDonutGroup();
scene.add(group);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
