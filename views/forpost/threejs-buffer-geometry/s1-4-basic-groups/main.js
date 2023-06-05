//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ARRAY OF MATERIALS
//-------- ----------
const materials = [
    new THREE.MeshBasicMaterial({
        color: 'red',
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime',
        side: THREE.DoubleSide
    })
];
//-------- ----------
// GEOMETRY - with groups
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
            0, 0, 0, // triangle 1
            1, 0, 0,
            1, 1, 0,
            0, 0, 0, // triangle 2
            0, 1, 0,
            1, 1, 0
        ]);
// create position property
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// add groups, and set material index values
geometry.addGroup(0, 3, 1);
geometry.addGroup(3, 3, 0);
//-------- ----------
// MESH using custrom geometry with groups added, and an array of materials
//-------- ----------
scene.add( new THREE.Mesh( geometry, materials) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 0.5, 3);
renderer.render(scene, camera);
