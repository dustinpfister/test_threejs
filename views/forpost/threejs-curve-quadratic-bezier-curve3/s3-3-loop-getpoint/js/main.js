(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(6, 6, 6);
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
    // get a point along a curve path
    const getPoint = (cp, alpha) => {

        return cp.getPoint(alpha)

    };
    // create a v3 array
    const createV3Array = (cp, pointCount) => {
        let i = 0;
        const v3Array = [];
        while(i < pointCount){
           const alpha = i / pointCount;
           v3Array.push( getPoint(cp, alpha) );
           i += 1;
        }
        return v3Array;
    };
    // create points from v3 array
    const createPoints = (cp, color, pointCount) => {
        color = color || 0xffffff;
        const geometry = new THREE.BufferGeometry();
        const points = createV3Array(cp, pointCount);
        console.log(points);
        geometry.setFromPoints(points);
        return new THREE.Points(geometry, new THREE.PointsMaterial({color: color, size: 0.1 }));
    };
    //-------- ----------
    // CURVE PATHS
    //-------- ----------
    const POINT_COUNT = 100;
    const cp_pos = createCurvePath([
        [5,0,5, 0,1,-5, 5,0.5,-5],
        [0,1,-5, -5,3,-5, -3,0.75,-5]
    ]);
    //-------- ----------
    // POINTS
    //-------- ----------
    scene.add( createPoints( cp_pos, 0xff0000, POINT_COUNT ) );
    //-------- ----------
    // GRID, MESH
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
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
        // uisng the get Point method here
        const v1 = getPoint(cp_pos, alpha);
        mesh.position.copy(v1);
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
