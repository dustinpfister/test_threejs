(function (api) {

    api.forCells = function (plane, opt) {
        opt = opt || {};
        console.log(plane);

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
            console.log(i, tileX, tileZ);
            i += 1;
        }
    };

}
    (this['TileModPositioner'] = {}));
