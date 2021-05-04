
var MATERIALS_TREE = {
    sphere: new THREE.MeshStandardMaterial({
        color: 0x00ff80,
        map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 32, 32, 150),
        side: THREE.DoubleSide
    }),
    trunk: new THREE.MeshStandardMaterial({
        color: 0xffaf80,
        map: canvasTextureMod.randomGrid(['r1', 'r1', '64'], 32, 32, 150),
        side: THREE.DoubleSide
    })
};

var MATERIALS_LIGHTS = {
    sun: new THREE.MeshStandardMaterial({
        emissive: 'white',
        emissiveMap: canvasTextureMod.randomGrid(['r1', 'r1', '0'])
    }),
    moon: new THREE.MeshStandardMaterial({
        emissive: 'white',
        emissiveMap: canvasTextureMod.randomGrid(['0', 'r1', 'ri'])
    })
};

var createTrees = function (count, radius) {
    count = count === undefined ? 5 : count;
    radius = radius === undefined ? 4 : radius;
    var group = new THREE.Group();
    var i = 0;
    while (i < count) {
        // create a tree
        var tree = TreeSphereMod.create({
                sphereSize: 0.25 + 0.75 * Math.random(),
                trunkLength: 1 + 4 * Math.random(),
                materials: MATERIALS_TREE
            });
        // position and rotate the tree
        var per = i / count,
        radian = Math.PI * 2 * per;
        tree.position.set(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
        tree.rotation.set(0, Math.PI * 2 - Math.PI / (count / 2) * i, Math.PI * 1.5);
        group.add(tree);
        i += 1;
    }
    return group;
};

var createLights = function () {
   
    // sun, and moon
    var sun = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),
            MATERIALS_LIGHTS.sun);
    sun.add(new THREE.PointLight(0xffff00, 1));
    world.add(sun);
    var moon = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            MATERIALS_LIGHTS.moon);
    moon.add(new THREE.PointLight(0x0040ff, 1));
    world.add(moon);
    // add AmbientLight
    var ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.1;
    world.add(ambientLight);
};

var createWorld = function () {
    var world = new THREE.Mesh(
            new THREE.SphereGeometry(4, 30, 30),
            new THREE.MeshStandardMaterial({
                map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 128, 125, 200),
            }));
    var trees = createTrees(8);
    trees.rotation.z = Math.PI / 180 * 0;
    world.add(trees);
    var trees2 = createTrees(8);
    trees2.rotation.y = Math.PI / 180 * 20;
    trees2.rotation.x = Math.PI / 180 * 0;
    trees2.rotation.z = Math.PI / 180 * 90;
    world.add(trees2);
    return world;
};

// creating a scene
var scene = new THREE.Scene();

var world = createWorld();
scene.add(world);

// sun, and moon
var lights = new THREE.Group();
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 20),
        MATERIALS_LIGHTS.sun);
sun.add(new THREE.PointLight(0xffff00, 1));
sun.position.set(11,0,0);
lights.add(sun);
var moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 20, 20),
        MATERIALS_LIGHTS.moon);
moon.add(new THREE.PointLight(0x0040ff, 1));
moon.position.set(-11,0,0);
lights.add(moon);
// add AmbientLight
var ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.1;
lights.add(ambientLight);
world.add(lights);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(12, 12, 12);
camera.lookAt(0, 0, 0);

// RENDERER
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

var lt = new Date(),
sunRadian = Math.PI,
fps = 30;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        world.rotation.y += Math.PI / 180 * 5 * secs;
        world.rotation.y %= Math.PI * 2;
        //world.rotation.y += Math.PI / 180 * 40 * secs;
        //world.rotation.y %= Math.PI * 2;
        sunRadian += Math.PI / 180 * 20 * secs;
        sunRadian %= Math.PI * 2;
        //sun.position.set(Math.cos(sunRadian) * 11, Math.sin(sunRadian) * 11, 0);
        //moon.position.set(Math.cos(sunRadian + Math.PI) * 9, Math.sin(sunRadian + Math.PI) * 9, 0);
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
