//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MOUSE OVER EVENT
//-------- ----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-5, -5);
const onDown = ( event ) => {
    const canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};
renderer.domElement.addEventListener( 'pointermove', onDown, false );
//-------- ----------
// CHILD OBJECTS
//-------- ----------
const boxGroup = new THREE.Group();
scene.add(boxGroup);
// box 1
let box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, 0);
boxGroup.add(box);
// box 2
box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(3, 0, 0);
boxGroup.add(box);
// box 3
box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(-3, 0, 0);
boxGroup.add(box);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let lt = new Date();
const fps = 30;
const update = (group, secs) => {
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects(group.children, true );
    if(intersects.length > 0){
        const mesh = intersects[0].object;
        mesh.position.y = 1;
    }
    group.children.forEach(function(obj){
        let y = obj.position.y;
        if(y > 0){
            y -= 0.25 * secs;
            obj.position.y = y;
        }
    });

};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // update
        update(boxGroup, secs);
        // render
        renderer.render(scene, camera);
        lt = now;
    }
}
loop();