(function (api) {

    // for cell method that will call opt.forCell for each cell
    // when doing so it will pass the plane, along with position values
    // that can be used to position objects for each cell
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

    api.processObjectIndexString = function (plane, opt) {
        opt = opt || {};
        opt.string = opt.string || '';
        opt.forIndex = opt.forIndex || [];
        var forCell = function (plane, x, z, tileX, tileZ, i) {
            var indexNumber = parseInt(opt.string[i]);
            var func = opt.forIndex[indexNumber];
            if (func) {
                func(plane, x, z, tileX, tileZ, i);
            }
        };
        api.forCells(plane, {
            forCell: forCell
        });
    }

}
    (this['TileModPositioner'] = {}));
