
// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);

// MESH
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(mesh);

// ADD AmbientLight, and reduce the intensity
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);

// ADD a Point Light and position the light away from the camera
var pointLight = new THREE.PointLight('white');
pointLight.position.set(20, 30, 40);
pointLight.add(new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10),
        new THREE.MeshBasicMaterial({
            color: 'white'
        })));
scene.add(pointLight);

// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);

//renderer.physicallyCorrectLights = true;
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
