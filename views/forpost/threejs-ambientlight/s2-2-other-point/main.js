//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo')|| document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const al = new THREE.AmbientLight(0xffffff);
scene.add(al); 
// ADD a Point Light and position the light away from the camera
const pl = new THREE.PointLight('white');
pl.position.set(20, 30, 40);
pl.add(new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10),
        new THREE.MeshBasicMaterial({
            color: 'white'
        })));
scene.add(pl);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(mesh);
//-------- ----------
// RENDER LOOP
//-------- ----------
let f = 0;
const fm = 300;
const loop = () => {
    const a1 = f / fm;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    requestAnimationFrame(loop);
    al.intensity = a2;
    renderer.render(scene, camera);
    f += 1;
    f %= fm;
};
loop();
