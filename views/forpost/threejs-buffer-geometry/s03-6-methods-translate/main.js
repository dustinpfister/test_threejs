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
const geometry_source = new THREE.BufferGeometry();
const vertices = new Float32Array([ -1,-1,0,    1,-1,0,    -1,1,0,    1,1,0 ]);
geometry_source.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry_source.setIndex([0,1,2,1,3,2]);
geometry_source.computeVertexNormals();
//-------- ----------
// MESH, MATERIAL
//-------- ----------
[ [0,1,0], [1,0,-1], [0,1,-4], ].forEach( (pos, i, arr) => {
    const geometry = geometry_source.clone().translate( pos[0], pos[1], pos[2]);
    const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
            side: THREE.FrontSide,
            transparent: true,
            opacity: 0.5
        })
    );
    mesh.renderOrder = arr.length - i;
    scene.add(mesh);
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-0.25, 1, 4);
camera.lookAt( 0, 0.5, 0 );
renderer.render(scene, camera);