// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
// update a quaternion by a given axis vector3 (normalized or not)
// and degree value
const setRotationByAxis = (q, v_axis, n_degree) => {
    const vector = v_axis.normalize();
    const radian = THREE.MathUtils.degToRad(n_degree);
    q.setFromAxisAngle(vector, radian);
};
// create an object that will display the current state
// of a quaternion object
const quaternionHelper = (q, opt) => {

    console.log(q.x.toFixed(2), q.y.toFixed(2), q.z.toFixed(2), q.w.toFixed(2));
    const v_dir = new THREE.Vector3(q.x, q.y, q.z);

    opt = opt = {};
    const group = new THREE.Group();
    const gud = group.userData;
    gud.q = q;
    gud.material_arrow = opt.material_arrow || new THREE.MeshBasicMaterial({color: 0x00ff00});
    gud.material_torus = opt.material_arrow || new THREE.MeshBasicMaterial({color: 0xffff00});
    gud.radius_common = opt.radius_common === undefined ? 1 : opt.radius_common;
    gud.radius_torus = opt.radius_torus === undefined ? 0.05 : opt.radius_torus;
    // arrow can be a cone that points in the direction
    // of the vector compontent
    const geo_arrow = new THREE.CylinderGeometry(0, 0.2, gud.radius_common * 2 - gud.radius_torus, 20);
    const arrow = new THREE.Mesh( geo_arrow, gud.material_arrow);
    arrow.geometry.rotateX(Math.PI * 0.5);


    arrow.rotation.setFromQuaternion(q);
    

    group.add(arrow);
    // torus for showing the range of an angle component
/*
    const geo_torus = new THREE.TorusGeometry(gud.radius_common, gud.radius_torus, 20, 60);
    const torus = new THREE.Mesh( geo_torus, gud.material_torus);

    torus.geometry.rotateX(Math.PI * 0.5);
    //torus.geometry.rotateY(Math.PI * 0.0);
    //torus.rotation.setFromQuaternion(q);

    console.log(q.x.toFixed(2), q.y.toFixed(2), q.z.toFixed(2), q.w.toFixed(2));
    //torus.rotation.x = Math.PI * q.x;
    //torus.rotation.y = Math.PI * q.y;
    torus.rotation.z = Math.PI * 0.5;
    torus.rotation.y = Math.PI * 0.5


    //torus.rotation.x = Math.PI * q.y;
    //torus.rotation.y = Math.PI * q.x;

    group.add(torus);
*/
    return group;
};
// ---------- ----------
// QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
// vector does not need to be normalized, and
// I can use degree values for the angle with this custom
// set rotation by axis method
const v_axis = new THREE.Vector3( 0, 0, -1);
const degree = 1;
setRotationByAxis(q, v_axis, degree);

// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );

const helper = quaternionHelper(q);
scene.add(helper);

/*
const mesh1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 0.25, 1),
    new THREE.MeshNormalMaterial({transparent: true, opacity: 0.8}));
mesh1.geometry.rotateX(Math.PI * 0.5);
mesh1.lookAt(0, 0, 1);
scene.add(mesh1);
mesh1.rotation.setFromQuaternion(q);
*/
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
