var getPerValues = function (frame, maxFrame, base) {
    frame = frame === undefined ? 0 : frame;
    maxFrame = maxFrame === undefined ? 100 : maxFrame;
    base = base || 2;
    var per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    return {
        frame: frame,
        maxFrame: maxFrame,
        per: per,
        bias: bias,
        base: base,
        biasLog: Math.log(1 + bias * (base - 1)) / Math.log(base)
    };
};

var createCubeGroup = function () {
    var size = 1,
    scale = 1 / 2,
    halfScale = scale / 2;
    var group = new THREE.Group();
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0, 0);
    group.add(box);
    var i = 0,
    len = 4;
    while (i < len) {
        var copy1 = box.clone(),
        r = Math.PI * 2 / 4 * i,
        x = Math.cos(r) * 1,
        z = Math.sin(r) * 1;
        copy1.scale.set(scale, scale, scale);
        copy1.position.set(x, 0, z);
        group.add(copy1);
        i += 1;
    }
    return group;
};
