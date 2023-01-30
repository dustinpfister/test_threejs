(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 25);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    const createCube = function(){
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),new THREE.MeshNormalMaterial());
        mesh.userData.cubeGroupType = 'Mesh';
        return mesh;
    };
    const createCubeGroup = function(id, count){
        const group = new THREE.Group();
        id = id || group.id;
        count = count || 10;
        let i = count;
        while(i--){
            group.add( createCube() );
        }
        group.userData.id = id;
        group.userData.count = count;
        group.userData.cubeGroupType = 'Group';
        return group;
    };
    const setNamesForScene = function(scene){
        let standAloneCount = 0;
        // TRAVERSING ALL OBJECTS IN THE SCENE
        scene.traverse(function(obj){        
            // SET NAMES FOR STAND ALONE MESH CUBES
            if(obj.userData.cubeGroupType === 'Mesh'){
                const parent = obj.parent;
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
                console.log(obj.name);
                obj.children.forEach(function(child, i){
                    if(child.userData.cubeGroupType === 'Mesh'){
                        child.name = 'mesh:' + i + '_' + obj.name
                        console.log(child.name);
                    }
                }); 
            }
        });     
    };
    const positionGroup = function(scene, groupId, y){
        const group = scene.getObjectByName('cubegroup:' + groupId);
        let i, len;
        y = y === undefined ? 0 : y;
        len = group.userData.count;
        i = len;
        while(i--){
            const mesh = group.getObjectByName('mesh:' + i + '_cubegroup:' + groupId),
            rad = Math.PI * 2 * ( i / len ),
            x = Math.cos(rad) * 5,
            z = Math.sin(rad) * 5;
            if(mesh){
                mesh.position.set(x, y, z);
            }
        }
    };
    //-------- ----------
    // ADDING GRID HELPERS TO THE SCENE
    //-------- ----------
    const helper1 = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    scene.add(helper1);
    const helper2 = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
    helper2.rotation.z = Math.PI * 0.5;
    scene.add(helper2);
    //-------- ----------
    // ADDING GROUPS
    //-------- ----------
    const group1 = createCubeGroup('one');
    scene.add( group1 );
    const group2 = createCubeGroup('two');
    scene.add( group2 );
    //-------- ----------
    // STAND ALONE MESH
    //-------- ----------
    const mesh = createCube();
    scene.add( mesh );
    //-------- ----------
    // CALLING SET NAMES
    //-------- ----------
    setNamesForScene(scene);
    positionGroup(scene, 'one', -1);
    positionGroup(scene, 'two', 1);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
