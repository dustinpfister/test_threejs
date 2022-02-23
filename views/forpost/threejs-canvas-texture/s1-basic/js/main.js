// create and return a canvas texture
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    draw(ctx, canvas);
    var texture = new THREE.CanvasTexture(canvas);
    return texture;
};
// create a cube the makes use of a canvas texture
var createCanvasCube = function (draw) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: createCanvasTexture(draw)
        })
    );
};

// Scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );

// Camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);

// add cube to scene that makes use
// of the canvas texture
scene.add(createCanvasCube(function(ctx, canvas){
    ctx.fillStyle = '#222222';
    ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#af0000';
    ctx.strokeRect(2.5, 2.5, canvas.width - 4, canvas.height - 4);
}));

// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
