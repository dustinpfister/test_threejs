(function (api) {

    api.forCells = function (plane, opt) {
        opt = opt || {};
        opt.forCell = opt.forCell || function (plane, x, y, tileX, tileZ, i) {
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
            x = 0;
            y = 0;
            opt.forCell(plane, x, y, tileX, tileZ, i);
            i += 1;
        }
    };

}
    (this['TileModPositioner'] = {}));
