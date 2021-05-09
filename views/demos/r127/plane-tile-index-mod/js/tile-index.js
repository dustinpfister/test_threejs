(function (api) {

    var MATERIALS = [
        new THREE.MeshBasicMaterial({
            color: 0xe0e0e0,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: 0x505050,
            side: THREE.DoubleSide
        })
    ];

    var planeTileGeo = function (w, h, sw, sh) {
        w = w === undefined ? 16 : w;
        h = h === undefined ? 16 : h;
        sw = sw === undefined ? 8 : sw;
        sh = sh === undefined ? 8 : sh;
        var planeGeo = new THREE.PlaneGeometry(w, h, sw, sh),
        tileIndex = 0,
        len = sw * sh,
        mi,
        y,
        i;
        while (tileIndex < len) {
            i = tileIndex * 6;
            mi = 0;
			/*
            if (sw % 2) {
                mi = tileIndex % 2;
            } else {
                y = Math.floor(tileIndex / sw);
                mi = y % 2 ? 1 - tileIndex % 2 : tileIndex % 2
            }
			*/
            planeGeo.addGroup(i, 3, mi);
            planeGeo.addGroup(i + 3, 3, mi);
            tileIndex += 1;
        }
        return planeGeo;
    };

    // create and return a plane with tile groups
    api.create = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        // add a plane
        var plane = new THREE.Mesh(
                planeTileGeo(opt.w, opt.h, opt.sw, opt.sh),
                opt.materials);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };

}
    (this['TileMod'] = {}));
