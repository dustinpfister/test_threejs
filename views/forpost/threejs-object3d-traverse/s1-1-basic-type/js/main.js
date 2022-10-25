(function () {
    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ---------
    // ADDING GRID HELPERS TO THE SCENE
    //-------- ---------
    const helper1 = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    scene.add(helper1);
    const helper2 = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    helper2.rotation.z = Math.PI * 0.5;
    scene.add(helper2);
    //-------- ---------
    // HELPER
    //-------- ---------
    const getRNDAxisValue = () => {
        return 0.5 + -5 + Math.floor(10 * Math.random());
    }
    //-------- ---------
    // ADDING A GROUP OF MESH OBJECTS
    //-------- ---------
    const group = new THREE.Group();
    let i = 20;
    while(i--){
        group.add( new THREE.Mesh( new THREE.BoxGeometry(1,1, 1), new THREE.MeshNormalMaterial() ));
    }
    scene.add( group );
    //-------- ---------
    // TRAVERSING ALL OBJECTS IN THE SCENE
    //-------- ---------
    scene.traverse(function(obj){
        // for all grid helpers in scene
        if(obj.type === 'GridHelper'){
            obj.material.color = new THREE.Color(1, 0, 0);
        }
        // for all mesh objects in scene
        if(obj.type === 'Mesh'){
            obj.position.x = getRNDAxisValue();
            obj.position.z = getRNDAxisValue();
            obj.position.y = getRNDAxisValue();
        }
    });
    //-------- ---------
    // RENDER
    //-------- ---------
    renderer.render(scene, camera);
}
    ());
