//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY - adding a color attribute
//-------- ----------
const geometry = new THREE.BoxGeometry(2, 2, 2, 8, 8, 8);
const att_pos = geometry.getAttribute('position');
const data_color = [];
let i = 0;
while(i < att_pos.count){
   const a_point = i / att_pos.count;
   const a_sinpoint = Math.sin( Math.PI * a_point ) * 4 % 1;
   data_color.push(1 - a_point, a_sinpoint, a_point);
   i += 1;
}
geometry.setAttribute('color', new THREE.BufferAttribute( new Float32Array(data_color) , 3) );

//-------- ----------
// MESH, MATREIAL - in wireframe mode
//-------- ----------
const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
        wireframe: true,
        wireframeLinewidth: 4
    })
);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

