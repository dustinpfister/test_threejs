(function () {
    //-------- ---------
    // SCENE, CAMERA, RENDERER
    //-------- ---------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
    camera.position.set(8, 8, 8);
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
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshStandardMaterial());
        const mud = mesh.userData;
        mud.color = opt.color || new THREE.Color(1,1,1);
        setCube(mesh);
        return mesh;
    };
    const setCube = (mesh)=> {
        const mud = mesh.userData;
        // set color and pos
        mesh.material.color = mud.color;
    }
    //-------- ---------
    // ADDING A OBJECTS
    //-------- ---------
    const mesh = makeCube({
        color: new THREE.Color(1, 0, 0)
    });
    scene.add(mesh)
    //-------- ---------
    // TRAVERSING ALL OBJECTS IN THE SCENE
    //-------- ---------
    scene.traverse(function(obj){

    });
    //-------- ---------
    // RENDER
    //-------- ---------
    renderer.render(scene, camera);
}
    ());
