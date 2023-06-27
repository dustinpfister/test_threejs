//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.name = 'scene_myworld';
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createGroup = function(gid){
    const group = new THREE.Group();
    group.name = 'group_' + gid;
    // adding a cone
    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 10, 10),
        new THREE.MeshNormalMaterial());
    cone.geometry.rotateX(Math.PI * 0.5);
    cone.position.set(0, 0, 2.0);
    cone.name = 'mesh_ ' + group.name + '_cone';
    group.add(cone);
    // adding a box
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 3),
        new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    box.name = 'mesh_ ' + group.name + '_cone';
    group.add(box);  
    return group;
};
const rndRad = function(){
    return Math.PI * 2 * Math.random();
};
const processObject = function(obj){
    const nameArray = obj.name.split('_');
    if(nameArray[0] === 'mesh'){
       // USING OBJECT3D parent prop to get Group
       const mesh = obj,
       group = mesh.parent;
       console.log(group.name);
       group.rotation.set(rndRad(), rndRad(), rndRad());
    }
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const grid = new THREE.GridHelper(9, 9);
grid.name = 'helper_grid_1';
scene.add(grid);
const group1 = createGroup('0');
scene.add(group1);
group1.lookAt(-10, 10, -10);
const group2 = createGroup('1');
group2.position.set(3, 1.5, 0);
group2.lookAt(3, 10, 0);
scene.add(group2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
renderer.domElement.addEventListener('click', function(){
    scene.traverse( function(obj){
        processObject(obj);
    });
    renderer.render(scene, camera);
});
