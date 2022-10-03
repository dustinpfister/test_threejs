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
// CANVAS ELEMENT, TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
ctx.fillStyle = '#222222';
ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
ctx.lineWidth = 3;
ctx.strokeStyle = '#00af00';
ctx.strokeRect(2.5, 2.5, canvas.width - 4, canvas.height - 4);
const texture = new THREE.CanvasTexture(canvas);
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture
        })
    );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
