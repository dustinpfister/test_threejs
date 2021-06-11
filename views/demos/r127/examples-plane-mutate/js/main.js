
var scene = new THREE.Scene();

var geo = new THREE.PlaneGeometry(1, 1, 2, 2);
var position = geo.getAttribute('position');
var normal = geo.getAttribute('normal');
geo.rotateX(Math.PI * 1.5);
position.array[1] = 0.125;

console.log(normal.array[0], normal.array[1], normal.array[2]);

var v = new THREE.Vector3(1, 1, 1).normalize();;
normal.array[0] = v.x;
normal.array[1] = v.y;
normal.array[2] = v.z;

var plane = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
            color: 'red',
            emissive: 'gray',
            side: THREE.DoubleSide
        }));
scene.add(plane);

var light = new THREE.PointLight(0xffffff, 1);
light.position.set(3, 1, 0);
scene.add(light);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 100,
    per: 0,
    bias: 0
};

var update = function (secs, per, bias, state) {};

var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;

    update(secs, state.per, state.bias, state);

    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
