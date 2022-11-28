(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    //scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff));
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, -3);
    scene.add(dl);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Make a single mesh object
    const makeMesh = (color) => {
        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 20, 20),
            new THREE.MeshPhongMaterial({
                color: color || new THREE.Color(1, 1, 1),
                transparent: true,
                opacity: 1
            })
        );
        return mesh;
    };
    // Make a group of mesh objects
    const makeGroup = (opt) => {
        opt = opt || {};
        opt.count = opt.count === undefined ? 10 : opt.count;
        opt.color = opt.color || new THREE.Color(1, 1, 1);
        const group = new THREE.Group();
        let i = 0;
        while(i < opt.count){
            const mesh = makeMesh(opt.color);
            group.add(mesh);
            i+= 1;
        };
        return group;
    };
    // clamp helper
    const clamp = (i, d) => {
        i = i < 0 ? 0 : i;
        i = i >= d ? d - 1 : i;
        return i;
    };
    // position a group to a geometry helper
    const positionGroupToGeometry = (group, geo, alpha) => {
        const pos = geo.getAttribute('position');
        const len1 = pos.count;
        const len2 = group.children.length;
        const a2 = len1  * alpha / len1;
        const a3 = a2 % ( 1 / len1 ) * len1;
        group.children.forEach( (mesh, mi) => {
            const i = Math.floor( len1 * alpha);
            const i2 = (i + mi) % len1;;
            const v_c = new THREE.Vector3(pos.getX(i2), pos.getY(i2), pos.getZ(i2));
            const i3 = (i2 + 1) % len1;
            const v_n = new THREE.Vector3(pos.getX(i3), pos.getY(i3), pos.getZ(i3));
            mesh.position.copy( v_c.lerp( v_n, a3) );
        });
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
    // create curve points
    const createCurvePoints = (curve, point_count, point_size, point_color, get_alpha) => {
        point_count = point_count === undefined ? 100 : point_count;
        point_size = point_size === undefined ? 1 : point_size;
        point_color = point_color || new THREE.Color(1, 1, 1);
        get_alpha = get_alpha || function(a1){ return a1; };
        const v3_array = [];
        let i = 0;
        while(i < point_count){
            v3_array.push( curve.getPoint( get_alpha(i / point_count) ));
            i += 1;
        }
        const points = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints( v3_array ),
            new THREE.PointsMaterial({size: point_size, color: point_color})
        );
        return points;
    };
    // smooth get alpha
    const getAlphaSmoother = (a1) => {
        return THREE.MathUtils.smootherstep(a1, 0, 1);
    };
    //-------- ----------
    // GROUPS
    //-------- ----------
    const group1 = makeGroup({ count: 10, color: new THREE.Color(1, 0, 0) })
    scene.add(group1);
    const group2 = makeGroup({ count: 10, color: new THREE.Color(0, 1, 0)  })
    scene.add(group2);
    const group3 = makeGroup({ count: 10, color: new THREE.Color(0, 0, 1)  })
    scene.add(group3);
    // geometry used to update group1, group2, and group3
    const geo1 = new THREE.SphereGeometry(4, 10, 10);
    const geo2 = new THREE.BoxGeometry(2, 2, 2);
    const geo3 = new THREE.TorusGeometry(6, 1, 10, 40);
    geo3.rotateX(Math.PI * 0.5);
    //-------- ----------
    // MESH OBJECTS FOR UPDATE GEOS
    //-------- ----------
    const mesh1 = new THREE.Mesh(geo1, 
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(1, 0, 0),
            transparent: true, opacity: 0.2, wireframe: true, wireframeLinewidth: 2
        })
    );
    scene.add(mesh1);
    const mesh2 = new THREE.Mesh(geo2, 
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(0, 1, 0),
            transparent: true, opacity: 0.8, wireframe: true, wireframeLinewidth: 4
        })
    );
    scene.add(mesh2);
    const mesh3 = new THREE.Mesh(geo3, 
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(0, 0, 1),
            transparent: true, opacity: 0.2, wireframe: true, wireframeLinewidth: 1
        })
    );
    scene.add(mesh3);
    //-------- ----------
    // CURVE
    //-------- ----------
    const curve1 = QBC3(-4, 0, 5, -2, 0, -5, 10, 10, 0);
    //-------- ----------
    // POINTS
    //-------- ----------
    scene.add( createCurvePoints(curve1, 100, 0.125, new THREE.Color(1,1,1), getAlphaSmoother ) );
    //-------- ----------
    // MESH TO MOVE ALONG CURVE
    //-------- ----------
    const mesh_curve1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1), 
        new THREE.MeshNormalMaterial({
            transparent: true, opacity: 0.8
        })
    );
    scene.add(mesh_curve1)
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        positionGroupToGeometry(group1, geo1, a1);
        positionGroupToGeometry(group2, geo2, a2);
        positionGroupToGeometry(group3, geo3, a2);


        mesh_curve1.position.copy( curve1.getPoint( getAlphaSmoother(a1) ) );
        mesh_curve1.lookAt(0, 0, 0);

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
