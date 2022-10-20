(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    var mkCheckerGeo = function (w, h, sw, sh) {
        w = w === undefined ? 16 : w;
        h = h === undefined ? 16 : h;
        sw = sw === undefined ? 8 : sw;
        sh = sh === undefined ? 8 : sh;
        var planeGeo = new THREE.PlaneGeometry(w, h, sw, sh);
        planeGeo.faces.forEach(function (face, i) {
            var tile = Math.floor(i / 2),
            w = planeGeo.parameters.widthSegments,
            h = planeGeo.parameters.heightSegments,
            y = Math.floor(tile / w);
            if (w % 2) {
                face.materialIndex = tile % 2;
            } else {
                face.materialIndex = y % 2 ? 1 - tile % 2 : tile % 2
            }
        });
        return planeGeo;
    };
    var mkChecker = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || [
            new THREE.MeshBasicMaterial({
                color: 0xe0e0e0
            }),
            new THREE.MeshBasicMaterial({
                color: 0x505050
            })
        ];
        // add a plane
        var plane = new THREE.Mesh(
            mkCheckerGeo(opt.w, opt.h, opt.sw, opt.sh),
            opt.materials);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };
    //-------- ----------
    // MESH
    //-------- ----------
    // standard checker
    var check = mkChecker({
        w: 5,
        h: 5
    });
    scene.add(check);
    check.position.set(-4, 0, 0);
    // odd checker
    var oddCheck = mkChecker({
        w: 4,
        h: 5,
        sw: 3,
        sh: 5
    });
    oddCheck.position.set(4, 0, 0);
    scene.add(oddCheck);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
