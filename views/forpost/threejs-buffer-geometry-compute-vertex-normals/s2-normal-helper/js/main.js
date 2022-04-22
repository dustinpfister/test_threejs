// SCENE, LIGHT, CAMERA, RENDERER, and CONTROLS
var scene = new THREE.Scene();
var light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 3, 0);
scene.add(light);
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
camera.add(light);
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// ADJUST PLANE POINT HELPER
var adjustPlanePoint = function (geo, vertIndex, yAdjust) {
    // get position and normal
    var position = geo.getAttribute('position');
    var normal = geo.getAttribute('normal');
    var i = vertIndex * 3;
    // ADJUSTING POSITION ( Y Only for now )
    position.array[i + 1] = yAdjust;
    position.needsUpdate = true;
    // ADJUSTING NORMALS USING computeVertexNormals method
    geo.computeVertexNormals();
};

var createDataTexture = function () {
    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    // Using the seeded random method of the MathUtils object
    var width = 16,
    height = 16;
    var size = width * height;
    var data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        var stride = i * 4;
        var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = 0;
        data[stride + 1] = v;
        data[stride + 2] = 0;
        data[stride + 3] = 255;
    }
    var texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    return texture;
};

// MESH
var geo = new THREE.PlaneGeometry(1, 1, 2, 2);
geo.rotateX(Math.PI * 1.5);
document.getElementById('demo').appendChild(renderer.domElement);
var plane = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: createDataTexture(),
            side: THREE.DoubleSide
        }));
scene.add(plane);
// USING THE THREE.VertexNormalsHelper method
const helper = new THREE.VertexNormalsHelper(plane, 2, 0x00ff00, 1);
scene.add(helper);
// LOOP
var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0
};
var update = function (secs, per, bias, state) {
    adjustPlanePoint(geo, 1, 0.75 - 1.00 * bias);
    adjustPlanePoint(geo, 0, 0 + 0.75 * bias);
    helper.update();
};
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
