(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(-6, 6, 6);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // make a curve path
    const createCurvePath = (data) => {
        const curvePath = new THREE.CurvePath();
        data.forEach((a)=>{
            const v1 = new THREE.Vector3(a[0], a[1], a[2]);       // start
            const v2 = new THREE.Vector3(a[3], a[4], a[5]);       // end
            const vControl = new THREE.Vector3(a[6], a[7], a[8]); // control
            curvePath.add( new THREE.QuadraticBezierCurve3( v1, vControl, v2) );
        });
        return curvePath;
    };
    // get a point along a curve path using a getAlpha method
    const getPoint = (cp, rawAlpha, getAlpha) => {
        rawAlpha = rawAlpha === undefined ? 0 : rawAlpha;
        getAlpha = getAlpha || function(rawAlpha){
            return rawAlpha
        };
        const alpha = getAlpha(rawAlpha);
        return cp.getPoint(alpha);
    };
    // create a v3 array
    const createV3Array = (cp, pointCount, getAlpha) => {
        let i = 0;
        const v3Array = [];
        while(i < pointCount){
           const alpha = i / pointCount;
           v3Array.push( getPoint(cp, alpha, getAlpha) );
           i += 1;
        }
        return v3Array;
    };
    // create points from v3 array
    const createPoints = (cp, color, pointCount, getAlpha) => {
        color = color || 0xffffff;
        const geometry = new THREE.BufferGeometry();
        const points = createV3Array(cp, pointCount, getAlpha);
        console.log(points);
        geometry.setFromPoints(points);
        return new THREE.Points(geometry, new THREE.PointsMaterial({color: color, size: 0.025 }));
    };
    //-------- ----------
    // CURVE PATHS
    //-------- ----------
    const POINT_COUNT = 400;
    const cp_pos1 = createCurvePath([
        [5,0,5, 0,1,-5, 5,0.5,-5],
        [0,1,-5, -5,3,-5, -3,0.75,-5]
    ]);
    const cp_pos2 = createCurvePath([
        [5,1,5, 0,2,-5, 5,1.5,-5],
        [0,2,-5, -5,4,-5, -3,1.75,-5]
    ]);
    const cp_pos3 = createCurvePath([
        [5,2,5, 0,3,-5, 5,2.5,-5],
        [0,3,-5, -5,5,-5, -3,2.75,-5]
    ]);
    const cp_pos4 = createCurvePath([
        [5,3,5, 0,4,-5, 5,3.5,-5],
        [0,4,-5, -5,6,-5, -3,3.75,-5]
    ]);
    // damp alpha
    const dampAlpha = (rawAlpha) => {
        return 1 - THREE.MathUtils.damp(0, 1, 8, 1 - rawAlpha);
    };
    // smooth alpha
    const smoothAlpha = (rawAlpha) => {
        return THREE.MathUtils.smoothstep(rawAlpha, 0, 1);
    };
    // curve Alpha
    const curveAlpha = (function(){
        const curve = new THREE.QuadraticBezierCurve(
            new THREE.Vector2( 0, 0 ),
            new THREE.Vector2( 2, 0 ),
            new THREE.Vector2( 10, 10 )
        );
        return function(rawAlpha){
            const pt = curve.getPoint(rawAlpha);
            return pt.y / 10;
        };
    }());
    //-------- ----------
    // POINTS
    //-------- ----------
    scene.add( createPoints( cp_pos1, 0xff0000, POINT_COUNT) );
    scene.add( createPoints( cp_pos2, 0x00ff00, POINT_COUNT, dampAlpha ) );
    scene.add( createPoints( cp_pos3, 0x0000ff, POINT_COUNT, smoothAlpha ) );
    scene.add( createPoints( cp_pos4, 0x00ffff, POINT_COUNT, curveAlpha ) );
    //-------- ----------
    // GRID, MESH
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    const mesh3 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh3);
    const mesh4 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh4);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = POINT_COUNT;  // MADE THE FRAME MAX THE SAME AS THE POINT COUNT
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const alpha = frame / frameMax;
        const b = 1 - Math.abs(0.5 - alpha) / 0.5;
        // uisng the get Point method here
        const v1 = getPoint(cp_pos1, b);
        mesh1.position.copy(v1);
        mesh1.lookAt(0, 0, 0);
        const v2 = getPoint(cp_pos2, b, dampAlpha);
        mesh2.position.copy(v2);
        mesh2.lookAt(0, 0, 0);
        const v3 = getPoint(cp_pos3, b, smoothAlpha);
        mesh3.position.copy(v3);
        mesh3.lookAt(0, 0, 0);
        const v4 = getPoint(cp_pos4, b, curveAlpha);
        mesh4.position.copy(v4);
        mesh4.lookAt(0, 0, 0);
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
