
// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);

// add AmbientLight
//var light = new THREE.AmbientLight(0xffffff);
//scene.add(light);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50)
scene.add(pointLight);

var lightProbe = new THREE.LightProbe();

scene.add(lightProbe);

console.log(lightProbe);

// LOAD CUBE TEXTURE
new THREE.CubeTextureLoader()
.setPath('/img/cube/skybox/')
.load(

    // urls of images used in the cube texture
    [
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
    ],

    // what to do when loading is over
    function (cubeTexture) {

    cubeTexture.encoding = THREE.sRGBEncoding;

    scene.background = cubeTexture;

    lightProbe.copy(new THREE.LightProbeGenerator.fromCubeTexture(cubeTexture));

    console.log(lightProbe);

    // MESH
    var mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(20, 20, 20),
            new THREE.MeshStandardMaterial({
                color: 0x0000af,
                metalness: 0,
                roughness: 0,
                envMap: cubeTexture,
                envMapIntensity: 1
            }));
    scene.add(mesh);
    mesh.position.set(0, 0, 0);
    camera.lookAt(mesh.position);

    // RENDERER
    var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setSize(320, 240);

    // gama
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2; // approximate sRGB

    //renderer.physicallyCorrectLights = true;
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

    var frame = 0,
    maxFrame = 250;
    var loop = function () {

        setTimeout(loop, 33);

        var per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;

        console.log(per);
        mesh.rotation.y = Math.PI * 2 * per;

        frame += 1;
        frame %= maxFrame;
        lightProbe.intensity = bias;

        renderer.render(scene, camera);

    };

    loop();

});
