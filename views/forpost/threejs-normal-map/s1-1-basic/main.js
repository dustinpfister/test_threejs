
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};

var createNormalMap = function(){
    return createCanvasTexture(function (ctx, canvas) {
        ctx.lineWidth = 1;
        ctx.fillStyle = new THREE.Color(1.0, 1.0, 1.0).getStyle();
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = new THREE.Color(1.0, 1.0, 0.0).getStyle();
        ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

        ctx.strokeStyle = new THREE.Color(0.0, 1.0, 1.0).getStyle();
        ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    });
};

var createNormalMapCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            normalMap: createNormalMap()
        }));
};

// scene
var scene = new THREE.Scene();

// mesh
var box = createNormalMapCube();
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
