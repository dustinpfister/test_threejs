(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera); 
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 10, 3);
    scene.add(dl);
    // ---------- ----------
    // ADDING A GROUP OF MESH OBJECTS
    // ---------- ----------
    var group = new THREE.Group();
    var i = 20;
    while(i--){
        group.add( new THREE.Mesh( new THREE.BoxGeometry(1,1, 1), new THREE.MeshStandardMaterial({
            color: 0xffffff
        }) ));
    }
    scene.add( group );
    // ---------- ----------
    // TRAVERSING ALL OBJECTS IN THE SCENE
    // ---------- ----------
    scene.traverse(function(obj){
        if(obj.type === 'Mesh'){
            obj.position.x = -5 + Math.floor(10 * THREE.MathUtils.seededRandom());
            obj.position.z = -5 + Math.floor(10 * THREE.MathUtils.seededRandom());
        }
        if(obj.type === 'Group'){
            var len = obj.children.length;
            obj.children.forEach(function(child, i){
                child.position.y = -5 + Math.floor( 10 * (i / len) );
                var s = 0.25 + 1.75 * (1 - i / len);
                child.scale.set(s, s, s);
            });
        }
    });
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
    const update = (frame, frameMax) => {
        const alpha = frame / frameMax;
        scene.traverse(function(obj){
            if(obj.type === 'Mesh'){
               obj.rotation.y = Math.PI * 2 * alpha;
            }
            if(obj.type === 'Group'){
                var len = obj.children.length;
                var current = Math.floor(len * alpha);
                obj.children.forEach(function(child, i){
                    child.rotation.x = Math.PI / 180 * 90 * i * alpha;
                    // default red
                    child.material.color = new THREE.Color(1, 0, 0);
                    if(i === current){
                        child.material.color = new THREE.Color(0, 1, 0);
                    }
                });
            }
        });
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
