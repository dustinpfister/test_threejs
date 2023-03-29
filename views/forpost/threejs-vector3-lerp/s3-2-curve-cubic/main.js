//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(-5, 0, 0);
const v_end = new THREE.Vector3(5, 0, 0);
const v_control1 = v_start.clone().lerp(v_end, 0.25).add( new THREE.Vector3(0,5,-10) );
const v_control2 = v_start.clone().lerp(v_end, 0.75).add( new THREE.Vector3(0,-5,10) );
const curve = new THREE.CubicBezierCurve3(v_start, v_control1, v_control2, v_end);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
let i = 0;
const count = 24;
while(i < count){
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 20, 20),
        new THREE.MeshNormalMaterial());
    const a_pos = ( i + 0.5) / count;
    mesh.position.copy( curve.getPoint(a_pos) );
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-4, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
