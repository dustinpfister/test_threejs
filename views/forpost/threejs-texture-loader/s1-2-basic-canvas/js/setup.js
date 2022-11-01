//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1, 1.5, 1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
const texture_canvas = new THREE.CanvasTexture(canvas);
//-------- ----------
// MESH THAT IS USING A CANVAS TEXTURE
//-------- ----------
// using the texture for a material and a Mesh
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_canvas
    }));
// add the box mesh to the scene
scene.add(box);
//-------- ----------
// LOAD TEXTURE, DRAW TO CANVAS TEXTURE WITH IMAGE SOURCE
//-------- ----------
const loader = new THREE.TextureLoader();
loader.load(
    // the first argument is the relative or absolute path of the file
    '/img/smile-face/smile_face_256.png',
    // the second argument is an on done call back
    function (texture) {
        // ref to canvas and image of texture
        const canvas = texture_canvas.image;
        const ctx = canvas.getContext('2d');
        const img = texture.image;
        // I can now draw to the canvas with the static image asset
        ctx.drawImage(img, 128, 0, 128, 128, 0, 0, 32, 32);
        ctx.drawImage(img, 0, 0, 128, 128, 32, 0, 32, 32);
        ctx.drawImage(img, 128, 128, 128, 128, 32, 32, 32, 32);
        ctx.drawImage(img, 0, 128, 128, 128, 0, 32, 32, 32);
        // render
        texture_canvas.needsUpdate = true;
        renderer.render(scene, camera);
    }
);
