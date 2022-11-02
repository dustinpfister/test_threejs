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
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,3,2);
scene.add(dl);
//-------- ----------
// HELPERS
//-------- ----------
const createCube = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({
            color: new THREE.Color(1,1,1),
            emissive: new THREE.Color(0.05,0.05,0.05)
        })
    );
};
//-------- ----------
// MESH
//-------- ----------
const box1 = createCube();
box1.position.set(1, 0, 0);
scene.add(box1);
const box2 = createCube();
box2.position.set(-1, 0, 0);
scene.add(box2);
//-------- ----------
// TEXTURE.js load
//-------- ----------
textureMod.load({
    URLS_BASE: '/img/smile-face/',
    URLS : [
        'smile_face_256.png',
        'smile_face_128.png',
        'smile_face_32.png'
    ]
}).then( (textureObj) => {
    box1.material.map = textureObj['smile_face_256'];
    box2.material.map = textureObj['smile_face_32'];
    box2.material.emissiveMap = textureObj['smile_face_128'];
    renderer.render(scene, camera);
});
