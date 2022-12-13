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

        const att_pos = geo.getAttribute('position');
        const len = opt.widthSegs * opt.heightSegs;
        let i = 0;
        while(i < len){
            // grid pos
            const x = i % opt.widthSegs;
            const z = Math.floor(i / opt.heightSegs);
            // alphas
            //const a1 = (x + 1) / opt.widthSegs;
            //const a2 = (z + 1) / opt.heightSegs;
            // 'pixel' pos
            //const px = opt.width * (x / (opt.widthSegs - 1));
            //const pz = opt.height * (z / (opt.heightSegs - 1));
            //const py = 0; //0.5 * Math.sin( Math.PI * 2 * a2);
            // set pos values
            att_pos.setXYZ(i, x, 0, z);
            i += 1;
        }
        att_pos.needsUpdate = true;


        // update the normal attribute
        geo.computeVertexNormals();
    };
    //-------- ----------
    // CREATE METHOD AND HELPERS
    //-------- ----------
    // create a position attribute
    const create_position = (geo, opt) => {
        const data_pos = [];
        const len = opt.widthSegs * opt.heightSegs;
        let i = 0;
        while(i < len){
            data_pos.push(0, 0, 0);
            i += 1;
        }
        const att_pos = new THREE.BufferAttribute( new Float32Array(data_pos), 3);
        geo.setAttribute('position', att_pos);
    };
    // create an index for the position attribute
    const create_index = (geo, opt) => {
        const data_index = [];

        const len_index = (opt.widthSegs - 1) * (opt.heightSegs - 1);
        let i = 0;
        while(i < len_index){
            const x = i % (opt.widthSegs - 1);
            const z = Math.floor(i / ( opt.widthSegs - 1) );

            const ia = opt.widthSegs * z + x;
            const ic = opt.widthSegs + z * opt.widthSegs + x;
            const ib = ia + 1;

data_index.push( ia, ib, ic );

            //data_index.push( ic, ib, ia );
            //data_index.push( ia + 1, ic, ic + 1 );
            console.log(i, ic, ib, ia)


            i += 1;
        }
        const att_index = new THREE.BufferAttribute( new Uint8Array(data_index), 1);
        geo.setIndex(att_index);
    };
    // create a geometry and update it for the first time
    api.create = function (opt) {
        opt = api.parseOpt(opt);
        const geo = new THREE.BufferGeometry();
        // position, and index
        create_position(geo, opt);
        create_index(geo, opt);
        // update
        api.update(geo, opt);
        return geo;
    };

}( this['waveMod'] = {} ));
