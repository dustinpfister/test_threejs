var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// creating a texture with canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
var drawMethod = {};
drawMethod.grid = function (ctx, canvas, opt) {
    opt = opt || {};
    opt.w = opt.w || 4;
    opt.h = opt.h || 4;
    opt.colors = opt.colors || ['#404040', '#808080', '#c0c0c0', '#f0f0f0'];
    opt.colorI = opt.colorI || [];
    var i = 0,
    len = opt.w * opt.h,
    sizeW = canvas.width / opt.w,
    sizeH = canvas.height / opt.h;
    while (i < len) {
        var x = i % opt.w,
        y = Math.floor(i / opt.w);
        ctx.fillStyle = typeof opt.colorI[i] === 'number' ? opt.colors[opt.colorI[i]] : opt.colors[i % opt.colors.length];
        ctx.fillRect(x * sizeW, y * sizeH, sizeW, sizeH);
        i += 1;
    }
};
var texture = new THREE.CanvasTexture(canvas);

// creating a mesh that is using the Basic material
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            // using the alpha map property to set the texture
            // as the alpha map for the material
            alphaMap: texture,
            // I also need to make sure the transparent
            // property is true
            transparent: true,
            // even when opacity is one the alpha map will
            // still effect transparency this can just be used to set it even lower
            opacity: 0.8,
            side: THREE.DoubleSide
        }));
scene.add(mesh);
// LOOP
var frame = 0,
maxFrame = 90,
fps = 20,
lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {

        var colorI = [],
        i = 6 * 6;
        while (i--) {
            colorI.push(Math.floor(4 * Math.random()))
        }
        drawMethod.grid(ctx, canvas, {
            w: 6,
            h: 6,
            colorI: colorI
        });
        texture.needsUpdate = true;

        mesh.rotation.y = Math.PI * 2 * per;

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
