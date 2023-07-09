//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// HELPERS
//-------- ----------
const createMesh = function( opt ){
    opt = opt || {};
    opt.geometry = opt.geometry || new THREE.SphereGeometry(1, 20, 20);
    opt.material = opt.material || new THREE.MeshNormalMaterial();
    opt.shareGeo = opt.shareGeo || false;
    opt.shareMat = opt.shareMat || false;
    const geometry = opt.shareGeo ? opt.geometry : opt.geometry.clone();
    const material = opt.shareMat ? opt.material : opt.material.clone();
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
};
//-------- ----------
// GEOMETRY, MATERIAL
//-------- ----------
const geometry = new THREE.BoxGeometry( 1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0, 0 ) });
//-------- ----------
// GROUP
//-------- ----------
const group = new THREE.Group();
scene.add(group);
let i = 0;
const len = 20;
while (i < len) {
    const a_child = i / len;
    const share = a_child < 0.5 ? false : true;
    const mesh = createMesh({
        geometry: geometry,
        material: material,
        shareGeo: share,
        shareMat: share
    });
    const e = new THREE.Euler( 0, Math.PI * 2 * a_child, 0 );
    mesh.position.set(1, 0, 0).applyEuler(e).multiplyScalar(4);
    mesh.material.color.setRGB(0, a_child, 1 - a_child);
    group.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
