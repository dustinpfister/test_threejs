
(function () {

    // Scene
    var scene = new THREE.Scene();

    // ADDING GRID HELPERS TO THE SCENE
    var helper = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    scene.add(helper);
    helper = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    helper.rotation.z = Math.PI * 0.5;
    scene.add(helper);

    // ADDING A MESH
    scene.add( new THREE.Mesh( new THREE.BoxGeometry(1,1, 1), new THREE.MeshNormalMaterial() ) )

    // camera, renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    scene.traverse(function(obj){
        if(obj.type === 'GridHelper'){
            console.log(obj.material.color = new THREE.Color(0, 1, 0));
        }
    });

    renderer.render(scene, camera);

}
    ());
