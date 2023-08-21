//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([ 0,0,0,    2,0,0,    0,2,0,    2,2,0 ]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex([0,1,2,1,3,2]);
geometry.computeVertexNormals();
geometry.center();
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
);
scene.add(mesh);
camera.lookAt(mesh.position)
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 1, 4);
camera.lookAt( 0, 0.5, 0 );
renderer.render(scene, camera);