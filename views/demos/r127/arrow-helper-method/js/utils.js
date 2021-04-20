
(function (utils) {

    utils.addArrow = function (obj3d, x, y, z, len, color) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 2 : y;
        z = z === undefined ? 0 : z;
        len = len === undefined ? 3 : len;
        color = color === undefined ? 0x00ff00 : color;
        var arrow = new THREE.ArrowHelper(
                new THREE.Vector3(x, y, z).normalize(),
                new THREE.Vector3(0, 0, 0),
                len,
                color);
        obj3d.add(arrow);
        return arrow;
    };

}
    (typeof utils === 'undefined' ? this['utils'] = {}
        : utils));
