
var loadTexure = function (url) {
    var loader = new THREE.TextureLoader();
    return new Promise(function (resolve, reject) {
        var onDone = function (texture) {
            resolve(texture);
        };
        var onError = function (err) {
            reject(err)
        };
        loader.load(url, onDone, function () {}, onError);
    });
};

// creating a scene
var scene = new THREE.Scene();

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

/*
var loader = new THREE.TextureLoader();

loader.load(
// the first argument is the relative or absolute path of the file
'/img/smile-face/smile_face.png',
// the second argument is an on done call back
function (texture) {
// using the texture for a material and a Mesh
var box = new THREE.Mesh(
new THREE.BoxGeometry(1, 1, 1),
new THREE.MeshBasicMaterial({
map: texture
}));
// add the box mesh to the scene
scene.add(box);
renderer.render(scene, camera);
}
);
*/
