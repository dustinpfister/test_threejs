// create data texture helper
var createDataTexture = function (rPer, gPer, bPer) {
    rPer = rPer || 0;
    gPer = gPer || 0;
    bPer = bPer || 0;
    var width = 16,
    height = 16;
    var size = width * height;
    var data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        var stride = i * 4;
        var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v * rPer;
        data[stride + 1] = v * gPer;
        data[stride + 2] = v * bPer;
        data[stride + 3] = 255;
    }
    var texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    return texture;
};
// create emissive cube helper
var createCube = function (emissiveMap, map, emissiveIntensity) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            map: map || null,
            emissiveIntensity: emissiveIntensity || 0,
            emissive: new THREE.Color(1, 1, 1),
            emissiveMap: emissiveMap || null
        }));
};
// scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
// mesh objects
[ [[1,1,1], 1], [[0,0,1], 0.25], [[0,1,0], 0.1] ].forEach(function(cubeArgs, i, arr){
    var emissiveMap = createDataTexture.apply(null, cubeArgs[0]);
    var map = null;
    var box = createCube(emissiveMap, map, cubeArgs[1]);
    box.position.x = -5 + 10 * (i / arr.length);
    scene.add(box);
});
// light
//var light = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
//light.position.set(8, 10, 2);
//scene.add(light);
// camera, render
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
