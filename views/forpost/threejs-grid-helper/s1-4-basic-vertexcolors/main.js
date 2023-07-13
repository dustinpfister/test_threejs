//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// GRID HELPERS
//-------- ----------
const size = 8;
const divisions = 8;
const grid = new THREE.GridHelper(size, divisions);
scene.add(grid);
// mutation of color attribute
const att_color = grid.geometry.getAttribute('color');
let i = 0;
while(i < att_color.count){
    const a_count = i / att_color.count;
    const a_countsin = ( Math.sin( Math.PI * 2 * (a_count * 8 % 1 ) ) + 1 ) / 2
    att_color.setXYZ( i, a_count, a_countsin, 1 );
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(7, 3, 7);
camera.lookAt(0, -1, 0);
renderer.render(scene, camera);
