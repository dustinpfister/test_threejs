// update from v3
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
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
    let geo_sphere = new THREE.SphereGeometry(1.5, 30, 30);
    let geo_torus = new THREE.TorusGeometry(1, 0.5, 30, 30);
    let v3array = Vector3ArrayFromGeometry(geo_torus);
    let points = new THREE.Points( geo_sphere, new THREE.PointsMaterial({ size: 0.1}) );
    scene.add(points);
    let typed = Vector3ArrayToTyped(v3array);
    let pos = geo_sphere.getAttribute('position');
    let alpha = 1;
    pos.array = pos.array.map( (n, i) => {
        let d  = typed[i] === undefined ? 0: typed[i];
        return n + d * alpha;
    });
    pos.needsUpdate = true;
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);