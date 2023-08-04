//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// TEXTURE
//-------- ----------
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 4;
canvas.height = 4;
[
   0.10, 0.20, 0.20, 0.10,
   0.20, 1.00, 1.00, 0.20,
   0.20, 1.00, 1.00, 0.20,
   0.10, 0.20, 0.20, 0.10
].forEach( (a, i) => {
    const x = i % canvas.width;
    const y = Math.floor( i / canvas.width );
    ctx.fillStyle = new THREE.Color( a, a , a).getStyle();
    ctx.fillRect( x, y, 1, 1);
});
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
//-------- ----------
// BASIC MATERIAL USING A TEXTURE FOR THE MAP OPTION
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10))
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0.75, 1.2, 1.5);
camera.lookAt(0, -0.10, 0);
renderer.render(scene, camera); // render

