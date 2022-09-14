(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) ); 
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 2, 1);
    scene.add(dl);
    //-------- ----------
    // ARRAY OF MATERIALS
    //-------- ----------
    var materials = [
        new THREE.MeshPhongMaterial({
            color: 0xff0000
        }),
        new THREE.MeshPhongMaterial({
            color: 0x00ff00
        })
    ];
    //-------- ----------
    // GEOMETRY AND GROUPS
    //-------- ----------
    var geometry = new THREE.BoxGeometry(1, 1, 1); // Box geometry with groups set up
    // SET THE INDEX VALUES FOR EACH FACE
    geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % materials.length);
    });
    //-------- ----------
    // MESH
    //-------- ----------
    var mesh = new THREE.Mesh(
            // geometry as first argument
            geometry,
            // array of materials as the second argument
            materials);
    scene.add(mesh);
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
        const alpha = frame / frameMax;
        mesh.rotation.x = THREE.MathUtils.degToRad(360 * alpha);
        mesh.rotation.y = THREE.MathUtils.degToRad(360 * 4 * alpha);
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
}
    ());