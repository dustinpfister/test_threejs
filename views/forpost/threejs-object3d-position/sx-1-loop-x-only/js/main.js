(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // make a single mesh object
    const MESH_GEO = new THREE.SphereGeometry(0.5, 20, 20);
    const MESH_MATERIAL = new THREE.MeshNormalMaterial();
    const makeMesh = () => {
        const mesh = new THREE.Mesh(
            MESH_GEO,
            MESH_MATERIAL);
        return mesh;
    };
    // make a group of mesh objects
    const makeGroup = () => {
       const group = new THREE.Group();
        let i = 0;
        const len = 9;
        while(i < len){
            const mesh = makeMesh();
            mesh.position.x = -4;
            mesh.position.z = -4 + i;
            mesh.position.y =  0.5;
            group.add(mesh);
            i += 1;
        }
       return group;
    };
    // set a group by an alpha value
    const setGroup = (group, alpha) => {
        group.children.forEach((mesh, i) => {
            mesh.position.x = -4 + THREE.MathUtils.euclideanModulo( 8 * ( i + 1 ) * alpha, 8 );
        });
    };
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    // create group
    const group = makeGroup();
    scene.add(group);
    // camera pos
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        // UPDATE GROUP
        setGroup(group, frame / frameMax);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}());