//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATING ANSD POSITIONING MESH OBJECTS WITH Vector3 METHODS
// including copy, add, normalize, and multiplyScalar
//-------- ----------
const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
const radian = THREE.MathUtils.degToRad(90 + 25), radius = 4;
const vec = new THREE.Vector3(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
[[0,0,0,0], [-2,1,0,1.5], [-4,2,0,3], [-8,3,0,4.5]].forEach(function(data){
    const mesh = cube1.clone(),
    x = data[0], y = data[1], z = data[2], scalar = data[3];
    mesh.position.copy(vec).add(new THREE.Vector3(x, y, z) ).normalize().multiplyScalar(scalar);
    mesh.lookAt(cube1.position);
    scene.add(mesh);
});
scene.children[1].lookAt(scene.children[2].position)
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
