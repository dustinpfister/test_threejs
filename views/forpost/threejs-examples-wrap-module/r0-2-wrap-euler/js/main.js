(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // make a cone with the geometry adjusted so that it points to x+ by default
    const makeCone = (len, radius) => {
        len = len === undefined ? 3 : len;
        radius = radius === undefined ? 0.5 : radius;
        const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(radius, len, 20, 20),
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.5
            }));
        mesh.geometry.rotateX( Math.PI * 0.5 );
        mesh.geometry.rotateY( Math.PI * 0.5 );
        return mesh;
    };
    const getAlpha = (value, vMin, vMax) => {
        const range = Math.abs(vMax - vMin);
        // is min >= 0 ?
        if(vMin >= 0){
            //return wrapMod.wrap(value, vMin, vMax) / range;
        }
        // vMax is also less than 0
        if(vMax < 0){
            //return ( wrapMod.wrap( value, vMin, vMax ) + Math.abs( vMin ) ) / range;
        }
        // vMax is 0 or higher
        return Math.abs( vMin - wrapMod.wrap(value, vMin, vMax) ) / range;

    };
    // get alpha method test
    console.log( getAlpha( 6, 0, 10 ) );       // 0.6
    console.log( getAlpha( -14, -20, -10 ) );  // 0.6
    console.log( getAlpha( 2, -10, 10 ) );     // 0.6
    console.log( getAlpha( -1.4, -5, 1 ) );    // 0.6

    console.log( getAlpha( 2, -1, 5) ); // 0.5

    //-------- ----------
    // MESH
    //-------- ----------
    const mesh1 = makeCone(7, 2);
    scene.add(mesh1);
    //-------- ----------
    // LOOP
    //-------- ----------
    let pi2 = Math.PI * 2,
    eMin = new THREE.Euler(0, 0, 0),
    eMax = new THREE.Euler(pi2, pi2 * 0.75, pi2),
    degPerSec = 90,
    fps = 20,
    lt = new Date();
    const loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {

            mesh1.rotation.y += Math.PI / 180 * degPerSec * secs;
            mesh1.opacity

            wrapMod.wrapEuler(mesh1.rotation, eMin, eMax);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
    //-------- ----------
    // CONTROLS
    //-------- ----------
    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}
    ());