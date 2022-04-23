// create canvas texture helper
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
// create emissive map helper
var createEmissiveMap = function(){
    var COLOR_EMISSIVE_MAP_FRONT = new THREE.Color(1, 1, 1);
    return createCanvasTexture(function (ctx, canvas) {
        ctx.strokeStyle = COLOR_EMISSIVE_MAP_FRONT.getStyle();
        ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);
    });
};
// create emissive cube helper
var createEmissiveCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            emissiveIntensity: 1,
            emissive: new THREE.Color(1, 0, 0),
            emissiveMap: createEmissiveMap()
        }));
};
// scene
var scene = new THREE.Scene();
// mesh
var box = createEmissiveCube();
scene.add(box);
// light
var light = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
light.position.set(8, 6, 2);
scene.add(light);
// camera, render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
