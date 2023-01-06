//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BOX GEO, LINE
//-------- ----------
// bog geometry and an edge geometry created from it
const boxGeo = new THREE.BoxGeometry(1, 1, 1),
edgeGeo = new THREE.EdgesGeometry(boxGeo);
// Line Segments
const line = new THREE.LineSegments(
    edgeGeo,
    new THREE.LineBasicMaterial({
        linewidth: 3,
        color: new THREE.Color('red')
    })
);
line.rotation.y = Math.PI / 180 * 12;
scene.add(line)
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
