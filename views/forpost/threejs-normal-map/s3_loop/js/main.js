
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    draw(ctx, canvas);
    return {
        texture: new THREE.CanvasTexture(canvas),
        canvas: canvas,
        ctx: ctx
    };
};

var draw = function (ctx, canvas, x, y, color) {
    x = x === undefined ? 1 : x;
    y = y === undefined ? 1 : y;
    color = color === undefined ? new THREE.Color(1.0, 1.0, 0.0) : color;
    ctx.lineWidth = 1;
    ctx.fillStyle = new THREE.Color(1.0, 1.0, 1.0).getStyle();
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = color.getStyle();
    ctx.strokeRect(x, y, canvas.width - ( x * 2 ), canvas.height - ( y * 2));
};

var canvasObj = createCanvasTexture(draw);

var createNormalMapCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            normalMap: canvasObj.texture
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


canvasObj.texture.needsUpdate = true;
draw(canvasObj.ctx, canvasObj.canvas, 3, 3, new THREE.Color(1.0, 1.0, 0.0));

renderer.render(scene, camera);
