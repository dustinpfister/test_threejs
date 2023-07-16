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
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    [
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 1.0, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 1.0, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 1.0, side: THREE.DoubleSide })
    ]
);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0.75, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
