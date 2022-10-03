(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Buffer Geometry from v3Array
    const Vector3ArrayToGeometry = (v3Array) => {
        return new THREE.BufferGeometry().setFromPoints(v3Array);
    };
    // Vector3 array from geometry
    const Vector3ArrayFromGeometry = (geometry) => {
        const pos = geometry.getAttribute('position');
        let i = 0;
        const len = pos.count, v3Array = [];
        while(i < len){
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
            v3Array.push(v);
            i += 1;
        }
        return v3Array;
    };
    // Vector3 Array to Typed Array
    const Vector3ArrayToTyped = (v3Array) => {
        let i = 0, len = v3Array.length, vertArray = [];
        while(i < len){
            let v = v3Array[i];
            vertArray.push(v.x, v.y, v.z);
            i += 1;
        }
        return vertArray;
        //return new THREE.Float32BufferAttribute(vertArray, 3)
    };
    //-------- ----------
    // GEO AND POINTS
    //-------- ----------

    const updateGeo = (geo, geoa, geob) => {

        let v3array = Vector3ArrayFromGeometry(geo_torus);
        let typed = Vector3ArrayToTyped(v3array);
        let pos = geo.getAttribute('position');
        let alpha = 1;
        pos.array = pos.array.map( (n, i) => {
            let d  = typed[i] === undefined ? 0: typed[i];
            return n + d * alpha;
        });
        pos.needsUpdate = true;
    };


    let geo_sphere = new THREE.SphereGeometry(1.5, 30, 30);
    let geo_torus = new THREE.TorusGeometry(1, 0.5, 30, 30);


    let points = new THREE.Points( geo_sphere.clone(), new THREE.PointsMaterial({ size: 0.1}) );
    scene.add(points);



    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
 
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
