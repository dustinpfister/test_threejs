/*
var mkCheckerGeo = function (w, h, sw, sh) {
w = w === undefined ? 16 : w;
h = h === undefined ? 16 : h;
sw = sw === undefined ? 8 : sw;
sh = sh === undefined ? 8 : sh;
console.log(sh);
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
 */

var mkCheckerGeo = function (w, h, sw, sh) {
    w = w === undefined ? 16 : w;
    h = h === undefined ? 16 : h;
    sw = sw === undefined ? 8 : sw;
    sh = sh === undefined ? 8 : sh;
    var planeGeo = new THREE.PlaneGeometry(w, h, sw, sh);

    var points = planeGeo.attributes.position.array;
    var i = 0;
    var vertCount = points.length / 3;
    console.log(points.length);
    console.log(vertCount);
    console.log(points.length * 1.201);
    while (i < points.length * 1.201) {
        var tileIndex = Math.floor(i / 6);
        //console.log(tileIndex)
        if (sw % 2) {
            var mi = tileIndex % 2;
        } else {
            var y = Math.floor(tileIndex / sw);
            var mi = y % 2 ? 1 - tileIndex % 2 : tileIndex % 2
        }
        planeGeo.addGroup(i, 3, mi);
        planeGeo.addGroup(i + 3, 3, mi);
        i += 6;
    }

    //planeGeo.addGroup(0, 3, 0);
    //planeGeo.addGroup(3, 3, 0);

    //planeGeo.addGroup(6, 3, 1);
    //planeGeo.addGroup(9, 3, 1);

    //planeGeo.addGroup(12, 3, 0);
    //planeGeo.addGroup(15, 3, 0);

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
            mkCheckerGeo(opt.w, opt.h, opt.sw, opt.sh),
            opt.materials);
    plane.rotation.set(-Math.PI / 2, 0, 0);
    return plane;
};
