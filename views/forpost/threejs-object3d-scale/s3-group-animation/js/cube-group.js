(function (api) {
    // get per values for the current frame and max frame
    var getPerValues = function (frame, maxFrame, base) {
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 100 : maxFrame;
        base = base || 2;
        var per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        return {
            frame: frame,
            maxFrame: maxFrame,
            fps: 30,
            per: per,
            bias: bias,
            base: base,
            biasLog: Math.log(1 + bias * (base - 1)) / Math.log(base)
        };
    };
    // create group helper
    var createGroup = function () {
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
    // create the full group object with user data
    api.create = function (opt) {
        opt = opt || {};
        var group = createGroup(),
        ud = group.userData;
        ud.perObj = getPerValues(
                opt.frame === undefined ? 0 : opt.frame,
                opt.maxFrame === undefined ? 0 : opt.maxFrame);
        return group;
    };
    // update
    api.update = function (cubeGroup, secs) {
        var ud = cubeGroup.userData,
        perObj = ud.perObj,
        s = 0.25 + 0.75 * perObj.biasLog;
        // SET CURRENT SCALE
        cubeGroup.scale.set(s, s, s);
        cubeGroup.rotation.z = Math.PI * 2 * perObj.per;
        // update frame and perObj
        perObj.frame += perObj.fps * secs;
        perObj.frame %= perObj.maxFrame;
        ud.perObj = getPerValues(perObj.frame, perObj.maxFrame);
    };

}
    (this['CubeGroup'] = {}));
