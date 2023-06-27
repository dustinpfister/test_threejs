//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// RAYCASTER / HELPER FUNCTIONS
//-------- ----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);
const onMouseMove = function( event ) {
    const canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};
const update = function(cubeGroups, secs){
    raycaster.setFromCamera( mouse, camera );
    cubeGroups.children.forEach(function(cubeGroup){
        const intersects = raycaster.intersectObjects( cubeGroup.children, true );
        if(intersects.length > 0){
            const mesh = intersects[0].object,
            group = mesh.parent;
            group.userData.active = true;
        }
        CubeGroupMod.update(cubeGroup, secs);
    });
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(9, 9));
const cubeGroups = new THREE.Group();
scene.add(cubeGroups);
const cg1 = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg1.position.x = 0;
cubeGroups.add(cg1);
const cg2 = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg2.position.x = 3;
cubeGroups.add(cg2);
const cg3 = CubeGroupMod.create({
   maxFrame: 30,
   yDelta: 0.5,
   xzDelta: 0.5
});
cg3.position.x = -3;
cubeGroups.add(cg3);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
let lt = new Date(),
frame = 0,
maxFrame = 300,
fps = 30;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(cubeGroups, secs);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();


