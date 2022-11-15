(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 5, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    const al = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create guy helper
    const createGuy = (scale) => {
        const guy = new Guy();
        const gud =  guy.group.userData;
        gud.scale = scale;
        guy.group.scale.set(scale, scale, scale);
        // using set to plain surface
        setGuyPos(guy);
        return guy;
    };
    // get guy size helper
    const getGuySize = (guy) => {
        const b3 = new THREE.Box3();
        b3.setFromObject(guy.group);
        const v3_size = new THREE.Vector3();
        b3.getSize(v3_size);
        return v3_size;
    };
    // set guy pos using box3 and userData object
    const setGuyPos = (guy, v3_pos) => {
        v3_pos = v3_pos || new THREE.Vector3();
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        guy.group.position.copy(v3_pos);
        guy.group.position.y = ( v3_size.y + gud.scale ) / 2 + v3_pos.y;
    };
    // a set guy rotation helper
    const setGuyRotation = (guy, v3_lookat, ignoreY) => {
        ignoreY = ignoreY === undefined ? true: ignoreY;
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        const v3 = v3_lookat.clone();
        v3.y = guy.group.position.y;
        if(!ignoreY){
            v3.y = v3_lookat.y + ( v3_size.y + gud.scale ) / 2;
        }
        guy.group.lookAt( v3 );
    };
    // just a short hand for THREE.QuadraticBezierCurve3
    const QBC3 = function(x1, y1, z1, x2, y2, z2, x3, y3, z3){
        let vs = x1;
        let ve = y1;
        let vc = z1;
        if(arguments.length === 9){
            vs = new THREE.Vector3(x1, y1, z1);
            ve = new THREE.Vector3(x2, y2, z2);
            vc = new THREE.Vector3(x3, y3, z3);
        }
        return new THREE.QuadraticBezierCurve3( vs, vc, ve );
    };
    // QBDelta helper using QBC3
    // this works by giving deltas from the point that is half way between
    // the two start and end points rather than a direct control point for x3, y3, and x3
    const QBDelta = function(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        const vs = new THREE.Vector3(x1, y1, z1);
        const ve = new THREE.Vector3(x2, y2, z2);
        // deltas
        const vDelta = new THREE.Vector3(x3, y3, z3);
        const vc = vs.clone().lerp(ve, 0.5).add(vDelta);
        const curve = QBC3(vs, ve, vc);
        return curve;
    };
    // create guy collection
    const createGuyCollection = (guyCount, hScale) => {
        const scale_h1 = 1 / getGuySize( createGuy(1) ).y;
        // height 1
        const guys = [];
        let gi = 0;
        while(gi < guyCount){
            const guy = createGuy(scale_h1 * hScale);
            // head
            guy.head.material = [
               // 0 default material
               new THREE.MeshPhongMaterial({
                   color: 0xffff00, transparent: true
               }),
               // 1 used for the face
               new THREE.MeshPhongMaterial({
                    color: 0xffffff, transparent: true
                })
            ];
            guy.body.material = new THREE.MeshPhongMaterial({
                color: 0x00ff00, transparent: true
            });
            guy.arm_right.material = new THREE.MeshPhongMaterial({
                color: 0x00ff00, transparent: true
            });
            guy.leg_right.material = new THREE.MeshPhongMaterial({
                color: 0x00ffff, transparent: true
            });
            guy.arm_left.material = guy.arm_right.material;
            guy.leg_left.material = guy.leg_right.material;
            guys.push(guy);
            scene.add(guy.group);
            gi += 1;
        }
        return guys;
    };
    // update a guy collection
    const updateGuyCollection = (guys, f, fMax) => {
        guys.forEach((guy, i, arr)=>{
            const offset = i / arr.length;
            const a1 = f / fMax;
            let a2 = (f + 0.05) / fMax;
            a2 = a2 > 1 ? 1 : a2;
            // position and rotation
            const a3 = (a1 + offset) % 1;
            setGuyPos(guy, curvePath.getPoint( a3 ));
            setGuyRotation(guy, curvePath.getPoint( (a2 + offset) % 1 ) );
            guy.walk(a1, 10);
            // opacity
            const a4 = 1 - Math.abs(0.5 - a3) / 0.5;
            guy.head.material[0].opacity = a4;
            guy.head.material[1].opacity = a4;
            guy.body.material.opacity = a4;
            guy.arm_right.material.opacity = a4;
            guy.leg_right.material.opacity = a4;
        });
    };
    //-------- ----------
    // CURVE PATH
    //-------- ----------
    const curvePath = new THREE.CurvePath();
    curvePath.add( QBDelta(-5, 0, -5, 5, 0, 0, 5, 0, -2.5) );
    curvePath.add( QBDelta(5, 0, 0, 2, 0, 5, 2, 0, 2) );
    curvePath.add( QBDelta(2, 0, 5, -5, 0, 5, 0, 0, 0) );
    curvePath.add( QBDelta(-5, 0, 5, -10, 0, -5, -5, 0, 5) );
    // PATH DEBUG POINTS
    const v3Array_path = curvePath.getPoints(20);
    const points_debug = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(v3Array_path),
        new THREE.PointsMaterial({size: 0.25, color: new THREE.Color(0,1,0)})
    );
    scene.add(points_debug);
    //-------- ----------
    // ADDING GUY OBJECT TO SCENE
    //-------- ----------
    const guys = createGuyCollection(16, 2);
    ///-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let f = 0,
    lt = new Date();
    const fMax = 200;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 0.05) {
            // update guys
            updateGuyCollection(guys, f, fMax)
            // draw
            renderer.render(scene, camera);
            f += 30 * secs;
            f %= fMax;
            lt = now;
        }
    };
    loop();
}
    ());
