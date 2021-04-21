// BASIC SETUP of scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2; // approximate sRGB
document.getElementById('demo').appendChild(renderer.domElement);

// ADD A POINT LIGHT
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 50, 0);
scene.add(pointLight);

// LIGHT PROBE
var lightProbe = new THREE.LightProbe();
scene.add(lightProbe);

// ADD SPHERE HELPER
var addSphere = function (cubeTexture) {
    var mesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(20, 32, 32),
            new THREE.MeshStandardMaterial({
                color: 0x0000af,
                metalness: 0,
                roughness: 0,
                envMap: cubeTexture,
                envMapIntensity: 1
            }));
    scene.add(mesh);
};

// WHAT TO DO WHEN CUBE TEXTURE IS LOADED
var cubeTextureLoaded = function (cubeTexture) {
    cubeTexture.encoding = THREE.sRGBEncoding;
    scene.background = cubeTexture;
    // Using the lightProbe copy method with LightPropeGen
    lightProbe.copy(new THREE.LightProbeGenerator.fromCubeTexture(cubeTexture));

    addSphere(cubeTexture);

    var frame = 0,
    maxFrame = 250;
    var loop = function () {
        setTimeout(loop, 33);
        var per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        frame += 1;
        frame %= maxFrame;
        // Change Light Probe intensity
        lightProbe.intensity = bias;
        renderer.render(scene, camera);
    };
    loop();
};

// LOAD CUBE TEXTURE
new THREE.CubeTextureLoader()
.setPath('/img/cube/skybox/')
.load(
    [
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
    ], cubeTextureLoaded);
