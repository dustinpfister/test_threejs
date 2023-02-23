// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry(0.5,20,20);
geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const data_rnd = [];
for ( let i = 0; i < pos.count; i ++ ) {
    data_rnd.push( -0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random() );
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_rnd, 3 );
// ---------- ----------
// MATERIAL, MESH
// ---------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
mesh.morphTargetInfluences[ 0 ] = 0.10;
mesh.geometry.computeVertexNormals();
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

