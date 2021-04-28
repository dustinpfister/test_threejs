var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);

// sun
var sunTexture = canvasTextureMod.randomGrid(['r1', 'r1', '0']);
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 20),
        new THREE.MeshStandardMaterial({
            emissive: 'white',
            emissiveMap: sunTexture
        }));
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(0, 8, 0);
scene.add(sun);

// add AmbientLight
var ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.3;
scene.add(ambientLight);

var camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
camera.position.set(16, 24, 16);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
//renderer.width = 640;
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
var container = document.getElementById('demo');
container.appendChild(renderer.domElement);
var full = false;
var toggleFull = function (canvas) {
    var canvas = renderer.domElement;
    full = !full;
    container.style.position = 'static';
    container.style.width = '640px';
    container.style.height = '480px';
    canvas.style.width = '640px';
    canvas.style.height = '480px';
    if (full) {
        canvas.style.width = 'auto';
        canvas.style.height = window.innerHeight + 'px';
        canvas.style.margin = 'auto';
        container.style.position = 'fixed';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.background = 'black';
        container.style.left = '0px';
        container.style.top = '0px';
    }
};
// press f for full screen
window.addEventListener('keydown', function (e) {
    if (e.key === 'f') {
        toggleFull();
    }
});

// HOUSE
var house = HouseMod.create();
house.position.set(-2, 1.05, 0);
scene.add(house);

// GROUND
var materials = {
    ground: [
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            map: canvasTextureMod.randomGrid(['0', 'r1', '0'], 96, 96, 220),
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            map: canvasTextureMod.randomGrid(['r1', 'r1', '0'], 64, 96, 220),
            side: THREE.DoubleSide
        })
    ]
};
var ground = new THREE.Mesh(new THREE.BoxGeometry(14, 14, 1.25), materials.ground);
ground.position.set(0, -0.575, 0);
ground.rotation.set(-Math.PI / 2, 0, 0);
ground.geometry.groups.forEach(function (face) {
    face.materialIndex = 1;
});
ground.geometry.groups[4].materialIndex = 0;
scene.add(ground);

// WHEEL
var wheel = WheelMod.create();
wheel.group.scale.set(0.5, 0.5, 0.5);
wheel.group.position.set(2, 1.5, 2);
scene.add(wheel.group);

var guy = GuyMod.create();
guy.group.scale.set(0.25, 0.25, 0.25);
guy.group.position.set(0, 0.8, 5.5);
scene.add(guy.group);

// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;

var state = {
    second: {
        per: 0,
        r: 0
    },
    minute: {
        per: 0,
        r: 0
    },
    day: {
        per: 0,
        r: 0
    }
};

var getDayPer = function (now) {
    return now.getHours() / 24 +
    now.getMinutes() / 1440 +
    now.getSeconds() / 86400 +
    now.getMilliseconds() / 86400000;
};

// update minute object
var updateMinute = function (state, now) {
    var ms = now.getMilliseconds() / 1000;
    state.minute.per = (now.getSeconds() + ms) / 60;
    state.minute.r = Math.PI * 2 * state.minute.per;
};

var updateDay = function (state, now) {
    state.day.per = getDayPer(now);
    state.day.r = Math.PI * 2 * state.day.per + Math.PI * 1.5;
};

var loop = function () {
    setTimeout(loop, 33);

    var now = new Date();
    //var now = new Date(2021, 1, 1, 6, 0);

    state.second.per = now.getMilliseconds() / 1000;
    state.second.r = Math.PI * 2 * state.second.per + Math.PI * 1.5;
    updateMinute(state, now);
    updateDay(state, now);

    // sun
    var r = state.day.r;
    var sunBias = 1 - Math.abs(state.minute.per - 0.5) / 0.5;
    sun.position.set(Math.cos(r) * 10, Math.sin(r) * 10, 16 - 32 * sunBias);
    ambientLight.intensity = (1 - (Math.abs(state.day.per - 0.5) / 0.5)) * 0.15;

    // wheel
    wheel.wheel.rotation.z = state.second.r; //msper;

    // guy
    GuyMod.walk(guy, state.minute.per, 32);
    var r = Math.PI * 2 - state.minute.r;
    guy.group.position.set(Math.cos(r) * 5, 0.8, Math.sin(r) * 5);
    guy.group.lookAt(Math.cos(r - 0.5) * 5, 0.8, Math.sin(r - 0.5) * 5);

    controls.update();

    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};

// WHAT TO DO WHEN CUBE TEXTURE IS LOADED

var cubeTextureLoaded = function (cubeTexture) {
    if (cubeTexture) {
        cubeTexture.encoding = THREE.sRGBEncoding;
        scene.background = cubeTexture;
    } else {
        var texture = canvasTextureMod.basicSquare(['r1', 'r1', 'r1'], 128, 6, 'black', 32, 64).image;
        cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture));
        cubeTexture.needsUpdate = true;
        scene.background = cubeTexture;
    }
    loop();
};
// LOAD CUBE TEXTURE
var loadfail = false;
new THREE.CubeTextureLoader()
.setPath('./../../../img/cube/skybox/')
//.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
//.setPath('./../../../img/cube/milky/')
.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    cubeTextureLoaded,
    function () {},
    function (e, b) {
    if (!loadfail) {
        loadfail = true;
        cubeTextureLoaded()
    }
});
