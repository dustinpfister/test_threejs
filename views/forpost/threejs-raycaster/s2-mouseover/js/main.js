//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MOUSE OVER EVENT
//-------- ----------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-5, -5);
// update mouse Vector2 on pointer down event
const onDown = ( event ) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    // set mouse Vector2 values
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};
// set vector2 baco to -5 -5 on pointer up
const onUp = ( event ) => {
    mouse.x = -5;
    mouse.y = - -5;
};
// Attach mouse event
renderer.domElement.addEventListener( 'pointerdown', onDown, false );
renderer.domElement.addEventListener( 'pointerup', onUp, false );
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
// orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
let lt = new Date();
const fps = 30;
const update = (group) => {
    // default scale
    group.children.forEach(function(obj){
        obj.scale.set(1, 1, 1);
    });
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects(group.children, true );
    if(intersects.length > 0){
        const mesh = intersects[0].object;
        mesh.scale.set(2, 2, 2);
    }
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // update
        update(boxGroup);
        // render
        renderer.render(scene, camera);
        lt = now;
    }
}
loop();