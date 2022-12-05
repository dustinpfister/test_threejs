(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS 
    //-------- ----------
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
    // custom get alpha method
    const getAlpha = (a1) => {
        const a2 = THREE.MathUtils.pingpong(a1, 0.5);
        return THREE.MathUtils.smoothstep(a2 * 2, 0, 1);
    };
    //-------- ----------
    // CURVE
    //-------- ----------
    const curve = QBC3(0, 0, 5, 0, 0, -5, -15, 7, 2.5);
    //-------- ----------
    // OBJECTS
    //-------- ----------
    // grid helper
    const grid = new THREE.GridHelper(10, 10);
    scene.add(grid);
    // mesh object that will be positioned along the curve
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // points
    const POINT_COUNT = 100;
    let i = 0, v3Array = [];
    while(i < POINT_COUNT){
        const a2 = getAlpha( i / POINT_COUNT);
        v3Array.push( curve.getPoint( a2 ) );
        i += 1;
    }
    const points = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints( v3Array ),
        new THREE.PointsMaterial({size: 0.15})
    );
    scene.add(points);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = POINT_COUNT;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = getAlpha(a1);
        const v3 = curve.getPoint( a2 );
        mesh.position.copy( v3 );
        mesh.lookAt(0, 0, 0);
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
