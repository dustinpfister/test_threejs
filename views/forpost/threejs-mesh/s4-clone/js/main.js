(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
 
    // CREATEING AND ADDING A MESH TO A SCENE
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial());
    scene.add(mesh);

    // MAKING CLONES OF THAT MESH
    var i = 0, len = 5, x, y, z, copy;
    while(i < len){
        copy = mesh.clone();
        x = -5 + 10 * (i / len);
        y = 0;
        z = -2;
        // change of position does not effect original
        copy.position.set(x, y, z);
        scene.add(copy);
        i += 1;
    }

    // HOWEVER A CHNAGE TO THE MATERIAL WITH THE ORIGINAL WILL EFFECT
    // ALL COPIES BECUASE THE CLONE METHOD WILL NOT DEEP CLONE MATERAILS
    mesh.material.color = new THREE.Color('red')
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());