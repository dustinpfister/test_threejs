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
// SHADER MATERIAL
// ---------- ----------
const geo = new THREE.BoxGeometry(1,1,1);


geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const pos_sphere = [];

for ( let i = 0; i < pos.count; i ++ ) {
    const x = pos.getX( i );
    const y = pos.getY( i );
    const z = pos.getZ( i );
    pos_sphere.push(
        x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
        y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
        z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
    );
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( pos_sphere, 3 );


// ---------- ----------
// MATERIAL, MESH
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

mesh.morphTargetInfluences[ 0 ] = 0.5;

// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

