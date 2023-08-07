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
// HELPER
//-------- ----------
const addPlaneGroups = ( geometry ) => {
    const pos = geometry.getAttribute('position');
    let count = pos.count;
    if(geometry.index){
        count = geometry.index.count;
    }
    geometry.addGroup(0, count, 0);
    geometry.addGroup(0, count, 1);
};

//-------- ----------
// MATERIALS
//-------- ----------
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.FrontSide }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.BackSide })
];
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.PlaneGeometry(2, 2, 2).toNonIndexed();
addPlaneGroups(geometry);
//-------- ----------
// MESH 
//-------- ----------
const mesh = new THREE.Mesh( geometry, materials );
scene.add(mesh);
// ---------- ----------
// LOOP
// ---------- ----------
camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    mesh.rotation.y += Math.PI / 180 * 5;
    mesh.rotation.y %= Math.PI * 2;
    renderer.render(scene, camera);
};
loop();