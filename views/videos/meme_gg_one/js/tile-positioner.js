(function (api) {

    api.forCells = function (plane, opt) {
        opt = opt || {};
        opt.forCell = opt.forCell || function (plane, x, z, tileX, tileZ, i) {
            console.log(i, tileX, tileZ);
        };

        var param = plane.geometry.parameters,
        len = param.widthSegments * param.heightSegments,
        i = 0,
        x,
        z,
        tileX,
        tileZ;
        while (i < len) {
            tileX = i % param.widthSegments;
            tileZ = Math.floor(i / param.widthSegments);
            var segW = param.width / param.widthSegments,
            segH = param.height / param.heightSegments;
            x = plane.position.x - param.width / 2 + segW * tileX + segW / 2;
            z = plane.position.z - param.height / 2 + segH * tileZ + segH / 2;
            opt.forCell(plane, x, z, tileX, tileZ, i);
            i += 1;
        }
    };

}
    (this['TileModPositioner'] = {}));
