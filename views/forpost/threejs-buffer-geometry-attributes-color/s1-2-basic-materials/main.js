// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.50, 20);
camera.position.set(4, 2, 5);
camera.lookAt(2.5, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);

// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 0.5, 60, 60 );
// adding a color attribute
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)
// ---------- ----------
// MESH OBJECT FOR EACH BUILT IN MESH MATERIAL
// ---------- ----------
const meshOpt = {
    vertexColors: true
};
// looks like vertex colors work with just about all of them, with the exception of Depth and Normal materials
'Basic,Depth,Lambert,Matcap,Normal,Phong,Physical,Standard,Toon'.split(',').forEach( (matStr, i) => {
    const x = i % 5;
    const y = Math.floor(i / 5);
    const material = new THREE['Mesh' + matStr + 'Material'](meshOpt);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(0.5 + x, 0, 0.5 + y)
    scene.add(mesh);
});
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2,1,0)
scene.add(dl);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

