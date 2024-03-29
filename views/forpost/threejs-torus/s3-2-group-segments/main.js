//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createDoughnutChild = function(index, len){
    const per = index / len,
    radius = 0.6,
    tubeRadius = 0.25,
    radialSegments = 4 + Math.round(20 * per),
    tubeSegments = 4 + Math.round(20 * per);
    const doughnut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial({wireframe:true}));
    return doughnut;
};
const createDoughnutGroup = function(){
    let i = 0;
    const len = 10,
    group = new THREE.Group();
    while(i < len){
        const doughnut = createDoughnutChild(i, len);
        doughnut.position.set(0, 0, 4 - i * 1.125);
        group.add(doughnut);
        i += 1;
    }
    return group;
};
//-------- ----------
// ADD GROUP TO SCENE
//-------- ----------
const group = createDoughnutGroup();
scene.add(group);
//-------- ----------
// RENDER SCENE
//-------- ----------
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
renderer.render(scene, camera);
