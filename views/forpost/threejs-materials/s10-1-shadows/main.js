//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// MESH OBJECTS
// ---------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
       }));
cube.position.set(0, 0.5, 0);
cube.castShadow = true;
scene.add(cube);
const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 8, 8),
        new THREE.MeshStandardMaterial({
            color: 0x00afaf,
            side: THREE.DoubleSide
        }));
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true; // the plane will receive a shadow
scene.add(plane);
// ---------- ----------
// SPOTLIGHT
// ---------- ----------
const spotLight = new THREE.SpotLight(0xffffff);
// I must at least set the caseShadow boolean
// of the spotLight to true
spotLight.castShadow = true;
// additional shadow properties of interest
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 1000;
// additional spotlight properties of interest
spotLight.intensity = 2;
spotLight.penumbra = .5;
spotLight.angle = Math.PI / 2.5;
spotLight.distance = 1000;
spotLight.position.set(-2.5, 2.5, 2.5);
scene.add(spotLight);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);


