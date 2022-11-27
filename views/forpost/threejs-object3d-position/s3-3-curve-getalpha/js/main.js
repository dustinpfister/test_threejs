(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    // grid helper
    const grid = new THREE.GridHelper(10, 10);
    scene.add(grid);
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(5, 7, 5);
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
    // curve mesh objects helper
    const addCurveMeshObjects = (parent, curve, mesh_count, get_alpha) => {
        get_alpha = get_alpha || function(a1){ return a1; };
        let i = 0;
        while(i < mesh_count){
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5}));
            const v3 =  curve.getPoint( get_alpha( i / mesh_count ) );
            mesh.position.copy( v3 );
            parent.add(mesh);
            i += 1;
        }
    };
    //-------- ----------
    // CURVE
    //-------- ----------
    const curve1 = QBC3(-2, 0, 5, -2, 0, -5, 2, 0, 0);
    const curve2 = QBC3(2, 0, 5, 2, 0, -5, 6, 0, 0);
    //-------- ----------
    // OBJECTS
    //-------- ----------
    addCurveMeshObjects(scene, curve1, 20);
    scene.add( createCurvePoints(curve1, 40, 0.125, new THREE.Color(0,1,1) ) );
    addCurveMeshObjects(scene, curve2, 20, getAlphaSmoother);
    scene.add( createCurvePoints(curve2, 40, 0.125, new THREE.Color(0,1,0), getAlphaSmoother ) );
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
