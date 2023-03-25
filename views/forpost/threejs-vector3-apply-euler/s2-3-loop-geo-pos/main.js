
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
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
    // lerp two vector3 arrays
    const Vector3ArrayLerp = (v3Array_1, v3Array_2, alpha) => {
        return v3Array_1.map((v, i) => {
            return v.clone().lerp( v3Array_2[i], alpha )
        });
    };
    const Vector3ArrayToTyped = (v3Array) => {
        let i = 0, len = v3Array.length, vertArray = [];
        while(i < len){
            let v = v3Array[i];
            vertArray.push(v.x, v.y, v.z);
            i += 1;
        }
        return new THREE.Float32BufferAttribute(vertArray, 3)
    };
    // update geo helper
    const updateGeo = (geometry, toV3array, alpha) => {
        const v3array3 = Vector3ArrayLerp(v3array1, toV3array, alpha);
        const pos = sphere.geometry.getAttribute('position');
        const typed = Vector3ArrayToTyped(v3array3);
        typed.array.forEach((n, i)=>{
            pos.array[i] = n;
        });
        pos.needsUpdate = true;
    };
    // ---------- ----------
    // MESH
    // ---------- ----------
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 60, 60),
        new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        })
    );
    scene.add(sphere);
    const angleEffect = function(v, i, arr) {
        const unitLength = 0.5 + 4.5 * Math.random();
        const e = new THREE.Euler();
        if(v.x >= 0){
             e.x = Math.PI / 180 * 90;
             e.y = Math.PI / 180 * 20 * Math.random();
        }else{
             e.x = Math.PI / 180 * 90 * -1;
             e.y = Math.PI / 180 * 20 * Math.random() * -1;
        }
        return v.clone().normalize().applyEuler(e).multiplyScalar(unitLength)
    }
    const v3array1 = Vector3ArrayFromGeometry(sphere.geometry);
    const v3array2 = v3array1.map(angleEffect);
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
         let p = frame / frameMax;
         let b = 1 - Math.abs(0.5 - p) / 0.5;
         updateGeo(sphere.geometry, v3array2, b)
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
