
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
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

// UPDATE
var update = function(secs, per, bias, frame, maxFrame){
    var a = 1 + Math.round(15 * bias),
    color = new THREE.Color(1.0, bias, 0.0);
    draw(canvasObj.ctx, canvasObj.canvas, a, a, color);
    canvasObj.texture.needsUpdate = true;
    renderer.render(scene, camera);
};

// LOOP
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 90;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        update(secs, per, bias, frame, maxFrame);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
