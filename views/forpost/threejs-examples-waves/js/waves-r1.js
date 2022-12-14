// waves - r1 - from threejs-examples-waves
(function (api) {

    // parse options
    api.parseOpt = function (opt) {
        opt = opt || {};
        opt.width = opt.width === undefined ? 1 : opt.width;
        opt.height = opt.height === undefined ? 1 : opt.height;
        opt.widthSegs = opt.widthSegs === undefined ? 20 : opt.widthSegs;
        opt.heightSegs = opt.heightSegs === undefined ? 20 : opt.heightSegs;
        return opt;
    };

    // update the geometry
    api.update = function (geo, opt) {
        opt = api.parseOpt(opt);

        const att_pos = geo.getAttribute('position');

        const width_half = opt.width / 2;
        const height_half = opt.height / 2;

        const gridY = opt.heightSegs;
        const gridX = opt.widthSegs;
        const gridX1 = gridX + 1;
        const gridY1 = gridY + 1;

        const segment_width = opt.width / gridX;
        const segment_height = opt.height / gridY;

        for ( let iy = 0; iy < gridY1; iy ++ ) {
            const y = iy * segment_height - height_half;
            for ( let ix = 0; ix < gridX1; ix ++ ) {
                const x = ix * segment_width - width_half;
                const i = iy * gridX1 + ix;
                att_pos.setXYZ(i, x, 0, y);

                //vertices.push( x, - y, 0 );
                //normals.push( 0, 0, 1 );
                //uvs.push( ix / gridX );
                //uvs.push( 1 - ( iy / gridY ) );
            }
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
        const len = (opt.widthSegs + 1) * (opt.heightSegs + 1);
        let i = 0;
        while(i < len){
            data_pos.push(0, 0, 0);
            i += 1;
        }
        const att_pos = new THREE.BufferAttribute( new Float32Array(data_pos), 3);
        geo.setAttribute('position', att_pos);
    };

    const create_index = (geo, opt) => {
        const data_index = [];
        const gridY = opt.heightSegs;
        const gridX = opt.widthSegs;
        const gridX1 = gridX + 1;
        for ( let iy = 0; iy < gridY; iy ++ ) {
             for ( let ix = 0; ix < gridX; ix ++ ) {
                 const a = ix + gridX1 * iy;
                 const b = ix + gridX1 * ( iy + 1 );
                 const c = ( ix + 1 ) + gridX1 * ( iy + 1 );
                 const d = ( ix + 1 ) + gridX1 * iy;
                 data_index.push( a, b, d );
                 data_index.push( b, c, d );
             }
        }
        // THIS WAS WHAT THE DEAL WAS
        //const att_index = new THREE.BufferAttribute( new Uint8Array(data_index), 1);
        geo.setIndex(data_index);
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
