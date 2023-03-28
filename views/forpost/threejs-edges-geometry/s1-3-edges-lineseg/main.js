
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// EDGE GEOMETRY CREATED FROM BOX GEOMETRY AND USING WITH THREE.LineSegments
//-------- ----------
const boxGeo = new THREE.BoxGeometry(1, 1, 1),
edgeGeo = new THREE.EdgesGeometry(boxGeo),
line = new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({
            color: new THREE.Color('white')
        }));
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.75, 1.25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

