//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const draw = (mesh, camera ) => {
    const texture = mesh.material.map;
    const canvas = texture.image;
    const ctx = canvas.getContext('2d');
    const d = mesh.position.distanceTo(camera.position);
    const r = camera.far - camera.near;
    let alpha = 1 - ( (d - camera.near) / r);
    alpha = THREE.MathUtils.clamp(alpha, 0, 1);
    // do whatever with the 2d drawing context
    ctx.clearRect(0,0, canvas.width, canvas.height );
    let i = 0; 
    const len = 4;
    const color = new THREE.Color(0,1,0);
    ctx.lineWidth = 1;
    while(i < len){
        const n = i * 2;
        const s = 32 - n * 2;
        const c = i / len * alpha;
        color.setRGB( c, c, c );
        ctx.strokeStyle = color.getStyle();
        ctx.strokeRect(n, n, s, s);
        i += 1;
    }
    texture.needsUpdate = true;
};
// create a mesh object
const createMesh = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0.6, 0);
[
   new THREE.Vector3( 0,  0,  0),
   new THREE.Vector3(-6,  0, -2),
   new THREE.Vector3(-2,  1, -2),
   new THREE.Vector3( 0, -1, -3),
].forEach( (v) => {
    const mesh = createMesh();
    mesh.position.copy(v);
    draw( mesh, camera );
    scene.add(mesh);
});
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
