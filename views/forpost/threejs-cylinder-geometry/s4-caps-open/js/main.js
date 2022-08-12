//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH
//******** **********
var mesh1 = new THREE.Mesh(
     // Cylinder Geometry Constructor call using all arguments
     new THREE.CylinderGeometry(3, 3, 3, 20, 20,
        true, // true is for open caps
        THREE.MathUtils.degToRad(45), // start radian
        THREE.MathUtils.degToRad(220)   // rdaian length
     ),

     new THREE.MeshNormalMaterial({
         side: THREE.DoubleSide
     })

);
scene.add(mesh1);

//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
