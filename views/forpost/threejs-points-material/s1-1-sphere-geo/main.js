//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000); // camera
const renderer = new THREE.WebGL1Renderer(); // render
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// POINTS
//-------- ----------
const geometry = new THREE.SphereGeometry(1, 10, 60);
const pt = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            color: 0x00afaf,
            size: 0.05
        }));
scene.add(pt);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
