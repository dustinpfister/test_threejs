var scene = new THREE.Scene();

// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.castShadow = true;
scene.add(dl);
 
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
 
// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var materials = {
    house_sides: new THREE.MeshStandardMaterial({
        color: 0xffffff
    }),
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00
    })
};
 
var house = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), materials.house_sides);
house.position.y = 1;
house.castShadow = true; //default is false
house.receiveShadow = false; //default
scene.add(house);
 
var plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
 
// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
var loop = function () {
    setTimeout(loop, 33);
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;
 
    // change directional light position
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
 
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();