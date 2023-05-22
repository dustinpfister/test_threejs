//-------- ----------
// SCENE, CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff);
pl.position.set(3, 1, 0);
scene.add(pl);
//-------- ----------
// LIGHT PROBE
//-------- ----------


THREE.LightProbeGenerator


/*
const lightProbe = new THREE.LightProbe();
lightProbe.position.set(0,0.1,0)
scene.add(lightProbe);

const sh = lightProbe.sh;

console.log(sh)
*/
//-------- ----------
// MESH
//-------- ----------
/*
const mesh = new THREE.Mesh(
    new THREE.SphereBufferGeometry(20, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x0000af,
        metalness: 0,
        roughness: 0,
        envMapIntensity: 1
    }));
scene.add(mesh);
*/
//-------- ----------
// LOOP
//-------- ----------
renderer.render(scene, camera);
