var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);

// directional light
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(1),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(0, 7, 0);
scene.add(sun);

// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.2;
scene.add(light);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// add the house
var house = HouseMod.create();
house.position.set(-2, 1.05, 0);
scene.add(house);

// ground
var materials = {
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    })
};

var ground = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 0.25), materials.ground);

ground.position.set(0, -0.075, 0);
ground.rotation.set(-Math.PI / 2, 0, 0);
scene.add(ground);

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

// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;

var state = {
    minute: {
        per: 0,
        r: 0
    }
};

// update minute object
var updateMinute = function (state, now) {
    var ms = now.getMilliseconds() / 1000;
    state.minute.per = (now.getSeconds() + ms) / 60;
    state.minute.r = Math.PI * 2 * state.minute.per;
};

var loop = function () {
    setTimeout(loop, 33);

    var now = new Date();

    var r = Math.PI * 2 * (now.getMilliseconds() / 1000);
    wheel.wheel.rotation.z = r;

    updateMinute(state, now);

    GuyMod.walk(guy, state.minute.per, 16);
    var r = state.minute.r;
    guy.group.position.set(Math.cos(r) * 5, 0.8, Math.sin(r) * 5);
    guy.group.lookAt(Math.cos(r + 0.5) * 5, 0.8, Math.sin(r + 0.5) * 5);

    controls.update();

    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
