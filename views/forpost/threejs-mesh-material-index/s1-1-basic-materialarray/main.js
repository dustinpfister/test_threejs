//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) ); 
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTION
//-------- ----------
const mkMaterial = (color, opacity) => {
    return new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: opacity
    })
};
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    // geometry as first argument
    new THREE.BoxGeometry(1, 1, 1),
    // array of materials as the second argument
    [
        mkMaterial(0xff0000, 0.75),
        mkMaterial(0x00ff00, 0.75),
        mkMaterial(0x0000ff, 0.50),
        mkMaterial(0xff00ff, 0.50),
        mkMaterial(0xffff00, 0.25),
        mkMaterial(0x00ffff, 0.25)
    ]
);
mesh.rotation.set(0.6, 0.8, 0.4);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
