(function () {
    // scene
    var scene = new THREE.Scene();
 
    // OBJECT3D INSTANCE
    var obj = new THREE.Object3D();
    obj.rotation.set(0, 0, Math.PI * 1.75);
    // creating a mesh that has object3d as a base class
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // copying OBJECT3d rotation property instance of Euler in obj 
    // to the instance of Euler the mesh
    mesh.rotation.copy(obj.rotation);
    scene.add(mesh);
 
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());