(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Vector3 Array to Typed Array
    const Vector3ArrayToTyped = (v3Array) => {
        let i = 0, len = v3Array.length, vertArray = [];
        while(i < len){
            let v = v3Array[i];
            vertArray.push(v.x, v.y, v.z);
            i += 1;
        }
        return new THREE.Float32BufferAttribute(vertArray, 3)
    };
    // Buffer Geometry from v3Array
    const Vector3ArrayToGeometry = (v3Array) => {
        const typedArray = Vector3ArrayToTyped(v3Array);
        const geometry = new THREE.BufferGeometry();
        return geometry.setAttribute('position', typedArray);
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
    // lerp two vector3 arrays
    const Vector3ArrayLerp = (v3Array_1, v3Array_2, alpha) => {
        return v3Array_1.map((v, i) => {
            return v.clone().lerp( v3Array_2[i], alpha )
        });
    };
    //-------- ----------
    // POINTS
    //-------- ----------
    // Geometry created with the Torus Geometry Constructor
    const geometry = new THREE.TorusGeometry(2, 0.75, 30, 60);
    geometry.rotateX(Math.PI / 180 * 90);
    // array of Vector3 class instances
    const v3Array_1 = Vector3ArrayFromGeometry(geometry);
    // do somehting to the v3 array
    const v3Array_2 = v3Array_1.map((v) => {
        const vd = new THREE.Vector3();
        vd.copy(v).normalize().multiplyScalar(2 + 3 * THREE.MathUtils.seededRandom())
        return v.clone().add(vd);
    });
    const v3Array_3 = Vector3ArrayLerp(v3Array_1, v3Array_2, 0);
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    const points = new THREE.Points(
        Vector3ArrayToGeometry(v3Array_3),
        new THREE.PointsMaterial({
        color: 0x00afaf,
        size: 0.125
    }));
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
        const p = frame / frameMax;
        const a = 1 - THREE.MathUtils.pingpong(p - 0.5, 1) * 2
        const v3Array = Vector3ArrayLerp(v3Array_1, v3Array_2, a);
        points.geometry.copy( Vector3ArrayToGeometry( v3Array) )
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