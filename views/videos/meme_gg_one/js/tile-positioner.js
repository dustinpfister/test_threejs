(function (api) {

    api.forCells = function (plane, opt) {
        opt = opt || {};
        console.log(plane);

        var param = plane.geometry.parameters,
        len = param.width * param.height,
        i = 0,
        tileX,
        tileY;
        while (i < len) {
            i += 1;
        }
    };

}
    (this['TileModPositioner'] = {}));
