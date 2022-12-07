//-------- ----------
// SCENE, CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480, false);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2; // approximate sRGB
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 50, 0);
scene.add(pointLight);
//-------- ----------
// LIGHT PROBE
//-------- ----------
const lightProbe = new THREE.LightProbe();
scene.add(lightProbe);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereBufferGeometry(20, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x0000af,
        metalness: 0,
        roughness: 0,
        envMapIntensity: 1
    }));
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0;
const maxFrame = 250;
const loop = function () {
    setTimeout(loop, 33);
    const per = frame / maxFrame;
    const bias = 1 - Math.abs(0.5 - per) / 0.5;
    frame += 1;
    frame %= maxFrame;
    // Change Light Probe intensity
    lightProbe.intensity = bias;
    // Change the light probe position
    const radian = Math.PI * 2 * per;
    pointLight.position.set(
        Math.cos(radian) * 50,
        Math.sin(radian) * 50,
        0);
    renderer.render(scene, camera);
};
//-------- ----------
// LOAD CUBE TEXTURE, START LOOP
//-------- ----------
new THREE.CubeTextureLoader()
.setPath('/img/cube/skybox/')
.load(
    [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ],
    function (cubeTexture) {
        cubeTexture.encoding = THREE.sRGBEncoding;
        // use the cube texture for the background
        scene.background = cubeTexture;
        // set the env map for the mesh to the cube texture
        mesh.material.envMap = cubeTexture;
        // Using the lightProbe copy method with LightPropeGen
        lightProbe.copy(new THREE.LightProbeGenerator.fromCubeTexture(cubeTexture));
        // start the loop
        loop();
    }
);
