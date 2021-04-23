var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);

// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3,4,3);
dl.castShadow = true;
scene.add(dl);

dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;

// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);


// add the house
var house = HouseMod.create();
house.position.set(-3, 1.05, -3);
scene.add(house);

// ground
var materials = {
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    })
};
var ground = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 0.25), materials.ground);
ground.position.set(0,-0.075,0);
ground.rotation.set(-Math.PI / 2, 0, 0);
ground.castShadow = false;
ground.receiveShadow = true;
scene.add(ground);

var wheel = WheelMod.create();
wheel.group.scale.set(0.25,0.25,0.25);
wheel.group.position.set(0, 0.8, 3);
scene.add(wheel.group);

// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
var loop = function () {
    setTimeout(loop, 33);
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;

    // change directional light position
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
    controls.update();

    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
