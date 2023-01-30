(function () {
    //-------- ---------
    // SCENE, CAMERA, RENDERER
    //-------- ---------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.2, 0.2, 0.2);
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ---------
    // LIGHT
    //-------- ---------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(4, 1, 7);
    scene.add(dl);
    //-------- ---------
    // HELPERS
    //-------- ---------
    const makeCube = (opt)=> {
        opt = opt || {};
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(opt.size,opt.size,opt.size),
            new THREE.MeshStandardMaterial());
        // USER DATA OF MESH OBJECT
        const mud = mesh.userData;
        mud.color = opt.color || new THREE.Color(1,1,1);
        const a = Math.PI / 180 * 45 + Math.PI / 180 * 90 * Math.random();
        const b = Math.PI * 2 * Math.random();
        mud.dir = new THREE.Vector3(0,0,1).applyEuler( new THREE.Euler(a, b, 0) );
        mud.alpha = 0;
        setCube(mesh);
        return mesh;
    };
    const setCube = (mesh)=> {
        const mud = mesh.userData;
        // set color and pos
        mesh.material.color = mud.color;
        // set position
        const unitLength = 5 * mud.alpha;
        mesh.position.copy( mud.dir.clone().multiplyScalar(unitLength) );
    }
    //-------- ---------
    // ADDING A OBJECTS
    //-------- ---------

    const len = 200;
    let i = 0;
    const colors = [
        new THREE.Color(1, 1, 1),
        new THREE.Color(1, 0, 0),
        new THREE.Color(0, 1, 0),
        new THREE.Color(0, 0, 1),
        new THREE.Color(1, 1, 0),
        new THREE.Color(1, 0, 1)
    ]
    while(i < len){
        const mesh = makeCube({
            size: 0.1 + 0.9 * (i / len),
            color: colors[ i % colors.length]
        });
        scene.add(mesh);
        i += 1;
    }
    //-------- ---------
    // TRAVERSING ALL OBJECTS IN THE SCENE
    //-------- ---------
    scene.traverse(function(obj){

        const ud = obj.userData;

        if(ud.dir){
            ud.alpha = Math.random();
            setCube(obj);
            obj.lookAt(0, 0, 0);
        }

    });
    //-------- ---------
    // RENDER
    //-------- ---------
    renderer.render(scene, camera);
}
    ());
