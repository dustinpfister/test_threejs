(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, -2, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPER FUNCTIONS
    // ---------- ----------
    // make just a geo with groups set up
    const mkCheckerGeo = function (w, h, sw, sh) {
        w = w === undefined ? 16 : w;
        h = h === undefined ? 16 : h;
        sw = sw === undefined ? 8 : sw;
        sh = sh === undefined ? 8 : sh;
        const planeGeo = new THREE.PlaneGeometry(w, h, sw, sh),
        len = sw * sh;
        let tileIndex = 0,
        mi,
        y,
        i;
        while(tileIndex < len){
            i = tileIndex * 6;
            mi = tileIndex % 2;
            if (sw % 2) {
                mi = tileIndex % 2;
            } else {
                y = Math.floor(tileIndex / sw);
                mi = y % 2 ? 1 - tileIndex % 2 : tileIndex % 2
            }
            planeGeo.addGroup(i, 3, mi);
            planeGeo.addGroup(i + 3, 3, mi);
            tileIndex += 1;
        }
        return planeGeo;
    };
    // set up a mesh
    const mkChecker = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || [
            new THREE.MeshBasicMaterial({
                color: 0xe0e0e0,
                side: THREE.DoubleSide
            }),
            new THREE.MeshBasicMaterial({
                color: 0x505050,
                side: THREE.DoubleSide
            })
        ];
        // add a plane
        const plane = new THREE.Mesh(
            mkCheckerGeo(opt.w, opt.h, opt.sw, opt.sh),
            opt.materials);
        plane.geometry.rotateX( Math.PI * 0.5 );
        return plane;
    };
    // ---------- ----------
    // MESH - 
    // ---------- ----------
    var check = mkChecker({
        w: 10,
        h: 10,
        sw: 12,
        sh: 12
    });
    scene.add(check);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());