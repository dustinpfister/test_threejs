
(function () {

    var createCubeGroup = function(id){
        var group = new THREE.Group();
        id = id || group.id;
        var i = 3;
        while(i--){
            group.add( new THREE.Mesh( new THREE.BoxGeometry(1,1, 1), new THREE.MeshNormalMaterial() ));
        }
        group.name = 'cubegroup:' + id;
        return group;
    };

    var setNamesForScene = function(scene){
        // TRAVERSING ALL OBJECTS IN THE SCENE
        scene.traverse(function(obj){

            if(obj.type === 'Mesh'){
            }
            if(obj.type === 'Group'){
                if(group.name.split(':')[0] === 'cubegroup'){
                    var len = obj.children.length;
                    obj.children.forEach(function(child, i){
                        console.log(child);
                    });
                }
            }
        });     
    };

    // Scene
    var scene = new THREE.Scene();

    // ADDING GRID HELPERS TO THE SCENE
    var helper = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    scene.add(helper);
    helper = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    helper.rotation.z = Math.PI * 0.5;
    scene.add(helper);

    var group = createCubeGroup('one');
    scene.add( group );

    // camera, renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 25);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    setNamesForScene(scene);

    renderer.render(scene, camera);

}
    ());
