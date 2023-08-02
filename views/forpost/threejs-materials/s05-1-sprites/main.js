//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a texture for the sprite
const createTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = 32, h = 32;
    canvas.width = w; canvas.height = h;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 3;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( 0, 0);
    ctx.lineTo( w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo( w, 0);
    ctx.lineTo( 0, h);
    ctx.stroke();
    const texture = new THREE.CanvasTexture( canvas );
    return texture;
};
// create a sprite object using the THREE.SpriteMaterial
const createCursorSprite = () => {
    const material = new THREE.SpriteMaterial({
        map: createTexture(),
        sizeAttenuation: false,
        depthTest: false,
        transparent: true,
        opacity: 1
    });
    const sprite = new THREE.Sprite(  material );
    return sprite;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const sprite = createCursorSprite();
sprite.scale.set(0.1, 0.1, 0.1);
sprite.position.set(0.5, 0, 0);
scene.add( sprite );
scene.add( new THREE.GridHelper(10, 10) );
scene.add( new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshNormalMaterial()  ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
