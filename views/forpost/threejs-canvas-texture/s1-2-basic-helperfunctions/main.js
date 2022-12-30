//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create and return a canvas texture
const createCanvasTexture = function (draw, size_canvas) {
    size_canvas = size_canvas === undefined ? 32 : size_canvas;
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size_canvas;
    canvas.height = size_canvas;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
// create a cube the makes use of a canvas texture
const createCanvasCube = function (draw, size_canvas, size_cube) {
    draw = draw || function(){};
    size_cube = size_cube === undefined ? 1 : size_cube;
    return new THREE.Mesh(
        new THREE.BoxGeometry(size_cube, size_cube, size_cube),
        new THREE.MeshBasicMaterial({
            map: createCanvasTexture(draw, size_canvas)
        })
    );
};
// draw square method to use with create canvas texture
const draw_square = function(ctx, canvas){
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#af0000';
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
};
// add cube to scene that makes use
// of the canvas texture
scene.add( createCanvasCube(draw_square, 16, 1.1) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
