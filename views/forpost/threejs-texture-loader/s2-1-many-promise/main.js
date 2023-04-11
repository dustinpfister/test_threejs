//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2.5, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const loadTexture = function (url) {
    const loader = new THREE.TextureLoader();
    return new Promise(function (resolve, reject) {
        const onDone = function (texture) {
            resolve(texture);
        };
        const onError = function (err) {
            reject(err)
        };
        loader.load(url, onDone, function () {}, onError);
    });
};
const loadTextureCollection = function (urlArray) {
    return Promise.all(urlArray.map(function (url) {
            return loadTexture(url);
        }));
};
const createTextureCube = function (texture) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture
        }));
};
//-------- ----------
// LOADING
//-------- ----------
const urlArray = [
    '/img/smile-face/smile_face_128.png',
    '/img/smile-face/smile_face_32.png'
];
loadTextureCollection(urlArray)
// then if all images load
.then(function (textures) {
    const box1 = createTextureCube(textures[1]);
    box1.position.set(1, 0, 0);
    scene.add(box1);
    const box2 = createTextureCube(textures[0]);
    box2.position.set(-1, 0, 0);
    scene.add(box2);
    renderer.render(scene, camera);
 
})
// if there is a problem
.catch(function () {
    const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(box);
    renderer.render(scene, camera);
});
