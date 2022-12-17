//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, -3, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS OBJECT
//-------- ----------
let canObj2 = canvasMod.create({
    draw: 'grid_palette',
    size: 512,
    update_mode: 'canvas',
    dataParse: 'lzstring',
    state: {
       w: 8, h: 8,
       data: '⌁ꔉ蔴泲ᔦ술㌻㵹⌁拙崰₍뒃紷⥄갱唒氠'
    },
    palette: ['white', '#004400', '#008800', '#00cc00', '#00ff00']
});
//-------- ----------
// GEO, MATERIAL, MESH
//-------- ----------
const geo = new THREE.PlaneGeometry(10, 10, 1, 1);
geo.rotateX(Math.PI * 1.5);
const material = new THREE.MeshBasicMaterial({ map: canObj2.texture });
const mesh2 = new THREE.Mesh(geo, material);
scene.add(mesh2)
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
renderer.render(scene, camera);

