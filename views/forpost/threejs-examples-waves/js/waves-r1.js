// waves - r1 - from threejs-examples-waves
(function (api) {

    // parse options
    api.parseOpt = function (opt) {
        opt = opt || {};
        opt.width = opt.width === undefined ? 1 : opt.width;
        opt.height = opt.height === undefined ? 1 : opt.height;
        opt.widthSegs = opt.widthSegs === undefined ? 5 : opt.widthSegs;
        opt.heightSegs = opt.heightSegs === undefined ? 5 : opt.heightSegs;
        return opt;
    };


    // update the geometry
    api.update = function (geo, opt) {
        opt = api.parseOpt(opt);

        const att_pos = geo.getAttribute('position')
        const len = opt.widthSegs * opt.heightSegs;
        let i = 0;
        while(i < len){
            
            i += 1;
        }


        // update the normal attribute
        geo.computeVertexNormals();
    };

    // create a geometry and update it for the first time
    api.create = function (opt) {
        opt = api.parseOpt(opt);
        const geo = new THREE.BufferGeometry();
        // position
        const data_pos = [];
        const len = opt.widthSegs * opt.heightSegs;
        let i = 0;
        while(i < len){
            data_pos.push(0, 0, 0);
            i += 1;
        }
        const att_pos = new THREE.BufferAttribute( new Float32Array(data_pos), 3);
        geo.setAttribute('position', att_pos);
        api.update(geo, opt);
        return geo;
    };

}( this['waveMod'] = {} ));
