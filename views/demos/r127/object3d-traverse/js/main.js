
(function () {

    // Scene
    var scene = new THREE.Scene();

    // ADDING GRID HELPERS TO THE SCENE
    var helper = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    scene.add(helper);
    helper = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    helper.rotation.z = Math.PI * 0.5;
    scene.add(helper);

    // ADDING A GROUP OF MESH OBJECTS
    var group = new THREE.Group();
    var i = 10;
    while(i--){
        group.add( new THREE.Mesh( new THREE.BoxGeometry(1,1, 1), new THREE.MeshNormalMaterial() ));
    }
    scene.add( group );

    // camera, renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 25);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // TRAVERSING ALL OBJECTS IN THE SCENE
    scene.traverse(function(obj){
        if(obj.type === 'GridHelper'){
            obj.material.color = new THREE.Color(0, 1, 0);
        }
        if(obj.type === 'Mesh'){
            obj.position.x = -5 + Math.floor(10 * Math.random());
            obj.position.z = -5 + Math.floor(10 * Math.random());
            obj.rotation.y = Math.PI * 2 * Math.random();
        }
    });

    renderer.render(scene, camera);

}
    ());
