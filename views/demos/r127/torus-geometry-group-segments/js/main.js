


var createDonutChild = function(index, len){
    var radius = 0.6,
    tubeRadius = 0.25,
    radialSegments = 16,
    tubeSegments = 32;
    var donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial());
    return donut;
};

var createDonutGroup = function(){
    var i = 0,
    len = 5,
    group = new THREE.Group();
    while(i < len){
        var donut = createDonutChild(i, len);
        donut.position.set(-5 + i * 2, 0, 0);
        group.add(donut);
        i += 1;
    }
    return group;
};


// creating a scene
var scene = new THREE.Scene();

var group = createDonutGroup();
scene.add(group);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0.25, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
