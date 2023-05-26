//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 20);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// USING AN ARRAY OF BASIC MATERIALS WITH A GEOMETRY THAT HAS GROUPS
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
// set material index values as needed
[0,0,1,0,2,0].forEach( (mi, i) => {
    geometry.groups[i].materialIndex = mi;
});
// uisng an array of materials
const material = [
    new THREE.MeshBasicMaterial({color: new THREE.Color(1,0,0)}),
    new THREE.MeshBasicMaterial({color: new THREE.Color(0,1,0)}),
    new THREE.MeshBasicMaterial({color: new THREE.Color(0,0,1)})
];
const box = new THREE.Mesh( geometry, material);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
