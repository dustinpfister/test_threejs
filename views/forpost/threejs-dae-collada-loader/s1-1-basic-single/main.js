//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LOADING A DAE FILE
//-------- ----------
const loader = new THREE.ColladaLoader();
loader.load("/dae/obj/obj.dae", function (result) {
    const mesh_source = result.scene.children[2];
    const mesh = new THREE.Mesh(mesh_source.geometry, new THREE.MeshNormalMaterial());
    scene.add(mesh);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
