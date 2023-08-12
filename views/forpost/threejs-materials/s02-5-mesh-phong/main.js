//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// SPECULAR TEXTURE
//-------- ----------
const data = [
   0,0,0,0,0,0,
   9,9,9,9,9,9,
   6,7,8,9,9,9,
   3,3,3,3,3,3,
   2,2,2,2,2,2,
   1,1,1,1,1,1
].map( (a) => {
    const v = Math.round( 255 * (a / 9) );
    return [ v, v, v, 255 ];
}).flat();
const texture_specular = new THREE.DataTexture( new Uint8Array(data), 6, 6 );
texture_specular.needsUpdate = true;
//-------- ----------
// INSTANCE OF THE PHONG MATERIAL
//-------- ----------
const material = new THREE.MeshPhongMaterial({
    specular: 0xffffff,
    specularMap: texture_specular,
    shininess: 80,
    color: 0xff0000,
    emissive: 0x220000,
    emissiveIntensity: 0.5
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(1, 5, -3);
scene.add(dl);
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
 
