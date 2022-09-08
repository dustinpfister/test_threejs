(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    let dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(-10, 3, -5);
    scene.add(dl);
    let al = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // set position of mesh based on vector unit length along with a and b values
    // relative to a standard start position
    const setByLength = function(mesh, len, a, b, startDir){
        startDir = startDir || new THREE.Vector3(1, 0, 0);
        const pi2 = Math.PI * 2,
        eul = new THREE.Euler(
            0, 
            a % 1 * pi2,
            b % 1 * pi2);
        // using copy to start at startDir, then applying the Euler. After that normalize and multiplyScalar
        return mesh.position.copy( startDir ).applyEuler( eul ).normalize().multiplyScalar(len);
    };
    // get a bias value
    const getBias = function(alpha, count){
        let per = alpha * count % 1;
        return 1 - Math.abs(0.5 - per) / 0.5;
    };
    // update a group
    //const updateGroup = function(group, gAlpha, alphaAdjust, lenBiasCount, bBiasCount){
    const updateGroup = function(group, gAlpha, opt){
        gAlpha = gAlpha === undefined ? 0 : gAlpha; 
        opt = opt || {};
        opt.alphaAdjust = opt.alphaAdjust === undefined ? 1 : opt.alphaAdjust;
        opt.lenBiasCount = opt.lenBiasCount === undefined ? 5 : opt.lenBiasCount;
        opt.bBiasCount = opt.bBiasCount === undefined ? 5 : opt.bBiasCount;
        opt.lenRange = opt.lenRange || [3, 8];
        opt.bRange = opt.bRange || [-0.125, 0.125];
        let i = 0, count = group.children.length;
        while(i < count){
            let mesh = group.children[i];
            let iAlpha = i / count;
            let alpha = ( iAlpha + gAlpha ) / opt.alphaAdjust;
            let len = opt.lenRange[0] + (opt.lenRange[1] - opt.lenRange[0]) * getBias(alpha, opt.lenBiasCount);
            let a = alpha;
            let b = opt.bRange[0] + (opt.bRange[1] - opt.bRange[0]) * getBias(alpha, opt.bBiasCount);
            setByLength(mesh, len, a, b);
            // next child
            nextChild = group.children[i + 1];
            if(i === count - 1){
               nextChild = group.children[i - 1];
            }
            mesh.lookAt(nextChild.position);
            i += 1;
        }
        return group;
    };
    // create a group
    const createGroup = function(count, s){
        count = count === undefined ? 10 : count;
        s = s === undefined ? 1 : s;
        let i = 0;
        let group = new THREE.Group();
        while(i < count){
            let mesh = new THREE.Mesh(
                new THREE.BoxGeometry(s, s, s),
                new THREE.MeshPhongMaterial({
                }));
            group.add(mesh);
            i += 1;
        }
        updateGroup(group, 0);
        return group;
    };
    //-------- ----------
    // OBJECTS
    //-------- ----------
    let group1 = createGroup(120, 0.6);
    scene.add(group1);
    //-------- ----------
    // LOOP
    //-------- ----------
    let frame = 0,
    maxFrame = 900,
    fps = 20,
    lt = new Date();
    const loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000,
        fAlpha = frame / maxFrame;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateGroup(group1, fAlpha, {
                lenRange: [1, 6],
                bRange: [-0.125, 0.2 * getBias(fAlpha, 8)]
            });
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
    ());