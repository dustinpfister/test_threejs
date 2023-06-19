//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 5000);
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xaffe00,
            emissive: 0x0a0a0a,
            side: THREE.DoubleSide
        }));
cube.position.set(0, 0.5, 0);
cube.castShadow = true;
scene.add(cube);
// spotlight
const spotLight = new THREE.SpotLight(0xffffff),
spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLight.castShadow = true;
spotLight.position.set(-2.5, 3.5, 2.5);
spotLight.intensity = 2;
spotLight.penumbra = 0.5;
spotLight.angle = Math.PI * 0.15;
spotLight.distance = 6;
spotLight.add(spotLightHelper);
scene.add(spotLight);
scene.add(spotLight.target);
// add plane to the scene
const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8),
        new THREE.MeshStandardMaterial({
            color: 0x00afaf,
            emissive: 0x202020,
            side: THREE.DoubleSide
        }));
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let frame = 0,
lt = new Date();    
const maxFrame = 500,
fps = 24;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    r = Math.PI * 2 * per,
    x = Math.cos(r) * 3,
    y = Math.sin(r) * 3,
    z = 2;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        spotLight.position.set(x, z, y);
        spotLight.target.position.set(-1 * 2 * bias, 0, 0);
        spotLightHelper.update();
        renderer.render(scene, camera);
        frame += fps * secs;
        frame = frame % maxFrame;
        lt = now;
    }
};
loop();

