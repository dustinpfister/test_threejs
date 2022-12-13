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

/*
 0    1    2    3    4 
 5    6    7    8    9 
 10   11   12   13   14
 15   16   17   18   19
 20   21   22   23   24


0,1,5
1,2,6
2,3,7
3,4,8

5,6,10
6,7,11
7,8,12,
8,9,13

10,11,15

*/

    // update the geometry
    api.update = function (geo, opt) {
        opt = api.parseOpt(opt);

        const att_pos = geo.getAttribute('position');
        const len = opt.widthSegs * opt.heightSegs;
        let i = 0;
        while(i < len){
            const x = i % opt.widthSegs;
            const z = Math.floor(i / opt.widthSegs);
            const y = 0;
            
            att_pos.setXYZ(i, x, y, z);

            i += 1;
        }
        att_pos.needsUpdate = true;


        // update the normal attribute
        geo.computeVertexNormals();
    };

    // create a geometry and update it for the first time
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


    api.create = function (opt) {
        opt = api.parseOpt(opt);
        const geo = new THREE.BufferGeometry();

        // position
        create_position(geo, opt);


        // index
        const data_index = [];
        len_index = (opt.widthSegs - 1) * (opt.heightSegs - 1);
        i = 0;
        while(i < len_index){
            const x = i % (opt.widthSegs - 1);
            const z = Math.floor(i / ( opt.widthSegs - 1) );
            const ia = opt.widthSegs * z + x;
            const ib = ia + 1;
            const ic = opt.widthSegs + z * opt.widthSegs + x;
            data_index.push( ic, ib, ia );
            data_index.push( ia + 1, ic, ic + 1 );
            i += 1;
        }
        const att_index = new THREE.BufferAttribute( new Uint8Array(data_index), 1);
        geo.setIndex(att_index);
        console.log(data_index);
        api.update(geo, opt);
        return geo;
    };

}( this['waveMod'] = {} ));
