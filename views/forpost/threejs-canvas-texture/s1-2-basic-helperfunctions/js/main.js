//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create and return a canvas texture
const createCanvasTexture = function (draw) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
// create a cube the makes use of a canvas texture
const createCanvasCube = function (draw) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: createCanvasTexture(draw)
        })
    );
};
// add cube to scene that makes use
// of the canvas texture
scene.add(createCanvasCube(function(ctx, canvas){
    ctx.fillStyle = '#222222';
    ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#af0000';
    ctx.strokeRect(2.5, 2.5, canvas.width - 4, canvas.height - 4);
}));
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
