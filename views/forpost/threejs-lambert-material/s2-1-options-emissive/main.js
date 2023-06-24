//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LAMBERT MATERIAL
//-------- ----------
const material = new THREE.MeshLambertMaterial({
    color: 0x00afaf,
    emissive: 0x004a4a,
    emissiveIntensity: 0.75,
    side: THREE.DoubleSide
});
//-------- ----------
// 
//-------- ----------
const plane = new THREE.Mesh( new THREE.PlaneGeometry(1500, 1500, 8, 8), material);
plane.rotation.x = Math.PI / 2;
scene.add(plane);
const spotLight = new THREE.SpotLight(0xffffff, 1, 300, Math.PI / 180 * 40, 1, 0),
spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLight.add(spotLightHelper);
scene.add(spotLight);
spotLight.position.set(150, 200, -100);
spotLightHelper.update();
//-------- ----------
// RENDER 
//-------- ----------
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
