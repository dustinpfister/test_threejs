(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
 
    // CREATEING AND ADDING A MESH OBJECTS
    var mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 2, 30),
            new THREE.MeshNormalMaterial());
   // ROTTAING GEOMERTY OF THE CONE
    mesh.geometry.rotateX(1.57)
    scene.add(mesh);
    var i = 0, len = 5, x, y, z, copy;
    while(i < len){
        copy = mesh.clone();
        x = -5 + 10 * (i / len);
        y = 0;
        z = -3;
        copy.position.set(x, y, z);
        // USING LOOK AT METHOD
        copy.lookAt(mesh.position);
        scene.add(copy);
        i += 1;
    }

 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 5, 5);
    camera.lookAt(0, 0, 0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());