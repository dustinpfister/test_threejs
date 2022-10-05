(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // LIGHT
    // ---------- ---------- ----------
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 1, 1);
    scene.add(dl);
    // ---------- ---------- ----------
    // HELPER FUNCTIONS
    // ---------- ---------- ----------
    // ALL LOOK HELPER
    var allLook = function(group, target){
        var v = new THREE.Vector3();
        target.getWorldPosition(v);
        group.children.forEach(function(child){
            child.lookAt(v);
        });
    };
    // ---------- ---------- ----------
    // GROUPS
    // ---------- ---------- ----------
    // DEMO GROUP
    var demoGroup = new THREE.Group();
    scene.add(demoGroup);
    var sphere = new THREE.Mesh( 
        new THREE.SphereGeometry(1.25, 30, 30), 
        new THREE.MeshStandardMaterial({
            color: new THREE.Color('blue')
        })
    );
    demoGroup.add(sphere);
    // CONE GROUP
    var coneGroup = new THREE.Group();
    demoGroup.add(coneGroup);
    var coneMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('cyan')
    });
    // [ [[x, y, z], coneLength], ... ]
    var coneDataArray = [],
    len = 8,
    i = 0, x, y, z, radian, radius = 3;
    while(i < len){
        radian = Math.PI * 2 / len * i;
        x = Math.cos(radian) * radius;
        y = 0;
        z = Math.sin(radian) * radius;
        coneDataArray.push([[ x, y, z], 2]);
        i += 1;
    }
    coneDataArray.forEach(function(coneData){
        var cone = new THREE.Mesh( new THREE.ConeGeometry(0.5, coneData[1], 30, 30), coneMaterial);
        cone.geometry.rotateX(1.57);
        cone.position.fromArray(coneData[0]);
        cone.position.y += coneData[1] / 2 - 0.8;
        coneGroup.add(cone);
    });
    allLook(coneGroup, sphere);
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
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const a = frame / frameMax;
        coneGroup.rotation.set(0, Math.PI * 2 * a, 0);
        const e = new THREE.Euler();
        e.x = Math.PI * 8 * a;
        sphere.position.copy(v_start).normalize().applyEuler(e).multiplyScalar(4).add(v_delta);
        allLook(coneGroup, sphere);
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