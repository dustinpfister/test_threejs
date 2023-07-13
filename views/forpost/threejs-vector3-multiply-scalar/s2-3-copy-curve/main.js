//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3( -5, 0, 5 );
const v2 = new THREE.Vector3( 1, 0, 2 );
const v3 = new THREE.Vector3( 1, 0, -5 );
const c1 =  v2.clone().lerp( v3, 0.5 ).add( new THREE.Vector3(5,0,0) );
const curve_path = new THREE.CurvePath();
curve_path.add( new THREE.LineCurve3(v1, v2) );
curve_path.add( new THREE.QuadraticBezierCurve3(v2, c1, v3) );
//-------- ----------
// HELPER
//-------- ----------
const createMesh = (color = new THREE.Color(1,1,1) ) => {
    return new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 20, 20),
        new THREE.MeshBasicMaterial({ color: color})
    );
};
//-------- ----------
// CREATE AND POSITON MESH OBJECTS USING CURVE, Vector3.copy, and Vector3.multiplyScalar
//-------- ----------
let i = 0;
const count = 10;
while(i < count){
    const v_curve = curve_path.getPoint( i / ( count - 1 ) );
    // createing a mesh at the point along the curve
    const mesh1 = createMesh();
    mesh1.position.copy( v_curve );
    scene.add( mesh1 );
    // using normalize and multiply scalar to create additional mesh objects
    // with positions that are on the same direction, but with differing lengths
    const mesh2 = createMesh( new THREE.Color( 1, 0, 0 ) );
    mesh2.position.copy( v_curve ).normalize().multiplyScalar( mesh1.position.length() + 1 );
    scene.add( mesh2 );
    const mesh3 = createMesh( new THREE.Color( 0, 1, 0 ) );
    mesh3.position.copy( v_curve ).normalize().multiplyScalar( mesh1.position.length() - 1 );
    scene.add( mesh3 );
    i += 1;
}
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
