// waves - r0 - from threejs-examples-waves
(function (api) {
    // Wave grid helper
    const waveGrid = function (opt) {
        opt = opt || {};
        opt.width = opt.width || 30;
        opt.depth = opt.depth || 30;
        opt.height = opt.height || 2;
        opt.forPoint = opt.forPoint || function () {};
        opt.context = opt.context || opt;
        opt.xStep = opt.xStep || 0.075;
        opt.yStep = opt.yStep || 0.1;
        opt.zStep = opt.zStep || 0.075;
        opt.waveOffset = opt.waveOffset === undefined ? 0 : opt.waveOffset;
        const points = [];
        let radPer,
        x = 0,
        i = 0,
        y,
        z;
        // points
        while (x < opt.width) {
            z = 0;
            while (z < opt.depth) {
                // radian percent
                radPer = (z / opt.depth + (1 / opt.width * x) + opt.waveOffset) % 1;
                // y value of point
                y = Math.cos(Math.PI * 4 * radPer) * opt.height;
                // call forPoint
                opt.forPoint.call(opt.context, x * opt.xStep, y * opt.yStep, z * opt.zStep, i);
                // step z, and point index
                z += 1;
                i += 3;
            }
            x += 1;
        };
    };
    // make a points mesh
    api.create = function (opt) {
        opt = opt || {};
        const geometry = new THREE.BufferGeometry();
        const points = [];
        opt.forPoint = function (x, y, z, i) {
            points.push(x, y, z);
        };
        waveGrid(opt);
        const vertices = new Float32Array(points);
        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        return new THREE.Points(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.PointsMaterial({
                size: .125,
                color: new THREE.Color(0.0, 0.25, 0.25)
            }));
    };
    // update points
    api.update = function (points, per, opt) {
        opt = opt || {};
        const position = points.geometry.getAttribute('position');
        opt.waveOffset = per;
        opt.forPoint = function (x, y, z, i) {
            position.array[i] = x - 0;
            position.array[i + 1] = y;
            position.array[i + 2] = z - 0;
        };
        // update points
        waveGrid(opt);
        position.needsUpdate = true;
    };
}( this['waveMod'] = {} ));
