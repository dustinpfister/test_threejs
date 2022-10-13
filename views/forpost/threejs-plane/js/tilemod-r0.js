// tilemod.js - r0 - from threejs-plane
// https://dustinpfister.github.io/2019/06/05/threejs-plane/
(function (api) {
    // default materials
    const MATERIALS = [
        new THREE.MeshBasicMaterial({
            color: 0xe0e0e0,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: 0x505050,
            side: THREE.DoubleSide
        })
    ];
    // make plane tile geo
    const planeTileGeo = function (w, h, sw, sh) {
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
        while (tileIndex < len) {
            i = tileIndex * 6;
            mi = 0;
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
        const plane = new THREE.Mesh(
                planeTileGeo(opt.w, opt.h, opt.sw, opt.sh),
                opt.materials);
        plane.geometry.rotateX( Math.PI * 0.5 );
        return plane;
    };
    // set checkerBoard material index values
    api.setCheckerBoard = function (plane) {
        const w = plane.geometry.parameters.widthSegments,
        h = plane.geometry.parameters.heightSegments,
        len = w * h;
        let tileIndex = 0,
        gi,
        mi,
        y;
        while (tileIndex < len) {
            if (w % 2) {
                mi = tileIndex % 2;
            } else {
                y = Math.floor(tileIndex / w);
                mi = y % 2 ? 1 - tileIndex % 2 : tileIndex % 2
            }
            gi = tileIndex * 2;
            plane.geometry.groups[gi].materialIndex = mi;
            plane.geometry.groups[gi + 1].materialIndex = mi;
            tileIndex += 1;
        }
    };
    // set checkerBoard material index values
    api.setBoxBoard = function (plane) {
        const w = plane.geometry.parameters.widthSegments,
        h = plane.geometry.parameters.heightSegments,
        len = w * h;
        let tileIndex = 0,
        gi,
        mi,
        x,
        y;
        while (tileIndex < len) {
            x = tileIndex % w;
            y = Math.floor(tileIndex / w);
            mi = 0;
            if (y > 0 && y < h - 1) {
                if (x > 0 && x < w - 1) {
                    mi = 1;
                }
            }
            gi = tileIndex * 2;
            plane.geometry.groups[gi].materialIndex = mi;
            plane.geometry.groups[gi + 1].materialIndex = mi;
            tileIndex += 1;
        }
    };
}
    ( this['TileMod'] = {} ));
 