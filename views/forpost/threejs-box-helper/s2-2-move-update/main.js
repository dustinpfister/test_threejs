//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 3),
        new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 }));
scene.add(mesh1);
// helper
const helper1 = new THREE.BoxHelper(mesh1, 0xffffff);
helper1.material.linewidth = 8;
helper1.material.vertexColors = true;
helper1.material.transparent = true;
const data_color = [];
const att_pos = helper1.geometry.getAttribute('position');
let i = 0;
while(i < att_pos.count){
    const a_vertex = i / att_pos.count;
    const a_opacity = (a_vertex * 4) % 1;
    data_color.push(1 * a_vertex, 1, 1 - a_vertex, 0.8 * 0.9 * Math.random());
    i += 1;
}
helper1.geometry.setAttribute('color', new THREE.BufferAttribute( new Float32Array( data_color ), 4));
scene.add(helper1);
// grid
const grid = new THREE.GridHelper(10, 10);
grid.material.linewidth = 4;
scene.add(grid);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, -3, 0);
let frame = 0, lt = new Date();
const maxFrame = 900, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    a_frame = frame / maxFrame,
    a_z = Math.sin( Math.PI * (a_frame * 2 % 1) ),
    a_x = Math.sin( Math.PI * (a_frame * 8 % 1) );
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        mesh1.position.x = -2  + 4 * a_x;
        mesh1.position.z = -2  + 4 * a_z;
        mesh1.rotation.y = Math.PI * (a_frame * 8 % 1);
        mesh1.rotation.z = Math.PI * (a_frame * 24 % 1);
        // using the update method as a way to update the geometry of the box
        helper1.update();
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
