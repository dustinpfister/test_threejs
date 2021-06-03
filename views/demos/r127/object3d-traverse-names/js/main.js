
(function () {

    var createCube = function(){
        var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),new THREE.MeshNormalMaterial());
        mesh.userData.cubeGroupType = 'Mesh';
        return mesh;
    };

    var createCubeGroup = function(id){
        var group = new THREE.Group();
        id = id || group.id;
        var i = 3;
        while(i--){
            group.add( createCube() );
        }
        group.userData.id = id;
        group.userData.cubeGroupType = 'Group';
        return group;
    };

    var setNamesForScene = function(scene){
        var standAloneCount = 0;
        // TRAVERSING ALL OBJECTS IN THE SCENE
        scene.traverse(function(obj){
            
            // SET NAMES FOR STAND ALONE MESH CUBES
            if(obj.userData.cubeGroupType === 'Mesh'){
                var parent = obj.parent;
                if(parent.type != 'Group'){
                    if(obj.userData.cubeGroupType === 'Mesh'){
                        obj.name = 'mesh:' + standAloneCount;
                        standAloneCount += 1;
                        console.log(obj.name);
                    }
                }
            }
            // SET NAMES FOR GROUPS AND MESH OBJECTS OF GROUPS
            if(obj.userData.cubeGroupType === 'Group'){
                obj.name = 'cubegroup:' + obj.userData.id;
                obj.children.forEach(function(child, i){
                    if(child.userData.cubeGroupType === 'Mesh'){
                        child.name = 'mesh:' + i + '_' + obj.name
                        console.log(child.name);
                    }
                }); 
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

    // adding a group
    var group = createCubeGroup('one');
    scene.add( group );
    var group = createCubeGroup('two');
    scene.add( group );

    // stand alone mesh
    var mesh = createCube();
    scene.add( mesh );

    // camera, renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 25);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // calling set names
    setNamesForScene(scene);

    // render
    renderer.render(scene, camera);

}
    ());
