var mkCheckerGeo = function (w, h, sw, sh) {
    w = w === undefined ? 16 : w;
    h = h === undefined ? 16 : h;
    sw = sw === undefined ? 8 : sw;
    sh = sh === undefined ? 8 : sh;
    console.log(sh);
    var planeGeo = new THREE.PlaneGeometry(w, h, sw, sh);
    planeGeo.groups.forEach(function (face, i) {
        var tile = Math.floor(i / 2),
        w = planeGeo.parameters.widthSegments,
        h = planeGeo.parameters.heightSegments,
        y = Math.floor(tile / w);
        if (w % 2) {
            face.materialIndex = 0; //tile % 2;
        } else {
            face.materialIndex = 0; // y % 2 ? 1 - tile % 2 : tile % 2
        }
    });
    return planeGeo;
};

var mkChecker = function (opt) {
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
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5, 5, 5), //mkCheckerGeo(opt.w, opt.h, opt.sw, opt.sh),
            opt.materials);
    plane.rotation.set(-Math.PI / 2, 0, 0);
    return plane;
};
