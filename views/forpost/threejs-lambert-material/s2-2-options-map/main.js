//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// TEXTURE - creating one with THREE.DataTexture
//-------- ----------
const width = 16,
height = 16;
const size = width * height;
const data = new Uint8Array(4 * size);
for (let i = 0; i < size; i++) {
    const stride = i * 4;
    const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
    data[stride] = v;
    data[stride + 1] = v;
    data[stride + 2] = v;
    data[stride + 3] = 255;
}
const texture = new THREE.DataTexture(data, width, height);
texture.needsUpdate = true;
//-------- ----------
// LAMBERT MATERIAL
//-------- ----------
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: texture,
    emissive: 0x004a4a,
    emissiveIntensity: 0.75,
    side: THREE.DoubleSide
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1500, 1500, 8, 8),
        material);
plane.rotation.x = Math.PI / 2;
scene.add(plane);
scene.add(new THREE.AmbientLight(0xffffff, 0.05));
// SPOTLIGHT
const spotLight = new THREE.SpotLight(0xffffff, 1, 300, Math.PI / 180 * 40, 1, 0),
spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLight.add(spotLightHelper);
scene.add(spotLight);
spotLight.position.set(150, 200, -100);
spotLightHelper.update();
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
