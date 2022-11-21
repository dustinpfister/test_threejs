//-------- ----------
// SCENE, CAMERA, AND RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(7, 7));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELEPRS
//-------- ----------
// creating a group
const createBoxGroup = function(count){
    const group = new THREE.Group();
    group.name = 'boxGroup';
    let i = 0,
    box;
    const len = count;
    while(i < len){
        box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        box.position.set(0, 0, 0);
        box.name = 'box_' + i;
        group.add(box);
        i += 1;
    }
    return group;
};
// SETTING SCALE OF BOX GROUP AND GETTING BOX OBJECTS BY NAME
// WHEN DOING SO
const createObject1 = function(){
    const group = createBoxGroup(4);
    // set cube zero to a bigger scale than the others
    // this should be the front
    const box1 = group.getObjectByName('box_0');
    box1.scale.set(1, 1, 3);
    box1.position.set(0, 0, 1);
    // side box objects
    const box2 = group.getObjectByName('box_1');
    box2.scale.set(1, 1, 1);
    box2.position.set(2, 0, 0);
    const box3 = group.getObjectByName('box_2');
    box3.scale.set(1, 1, 1);
    box3.position.set(-2, 0, 0);
    // rear
    const box4 = group.getObjectByName('box_3');
    box4.scale.set(1, 1, 1);
    box4.position.set(0, 0, -2);
    return group
};
//-------- ----------
// CREATE OBJECTS
//-------- ----------
const group = createObject1();
group.add(new THREE.BoxHelper(group));
scene.add(group);
const dir = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25), 
    new THREE.MeshBasicMaterial());
scene.add(dir);
//-------- ----------
// USE ORBIT CONTROLS IF THERE
//-------- ----------
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
//-------- ----------
// LOOP
//-------- ----------
const maxFrame = 600, fps = 30;
let lt = new Date(),
frame = 0, r = 0, x, z;
const loop = function(){
    const now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        r = Math.PI  * 2 * per;
        x = Math.cos(r) * 5;
        z = Math.sin(r) * 5;
        dir.position.set(x, 5 * Math.sin(Math.PI * 4 * per), z);
        group.lookAt(dir.position);
        renderer.render(scene, camera);
        lt = now;
        frame += fps * secs;
        frame %= maxFrame;
    }
};
loop();
