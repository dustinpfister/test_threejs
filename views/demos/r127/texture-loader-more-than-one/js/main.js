
var loadTexture = function (url) {
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

var loadTextureCollection = function (urlArray) {
    return Promise.all(urlArray.map(function (url) {
            return loadTexture(url);
        }));
};

var createTextureCube = function (texture) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture
        }))
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

var urlArray = [
    '/img/smile-face/smile_face_128_128.png',
    '/img/smile-face/smile_face_32_32.png'
];

loadTextureCollection(urlArray).then(function (textures) {
    console.log(textures);
    var box = createTextureCube(textures[0])
    // add the box mesh to the scene
    scene.add(box);
    renderer.render(scene, camera);

});
