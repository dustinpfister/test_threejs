// waves - r1 - from threejs-examples-waves
(function (api) {

    // parse options
    api.parseOpt = function (opt) {
        opt = opt || {};
        //opt.width = opt.width === undefined ? 1 : opt.width;
        //opt.height = opt.height === undefined ? 1 : opt.height;
        opt.widthSegs = opt.widthSegs === undefined ? 17 : opt.widthSegs;
        opt.heightSegs = opt.heightSegs === undefined ? 17 : opt.heightSegs;
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
            const z = Math.floor(i  / opt.heightSegs );

console.log(i, x, z)

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
            // grid pos
            const x = i % (opt.widthSegs - 1);
            const z = Math.floor(i / ( opt.widthSegs - 1) );
            // THE PROBLEM IS NOT WITH x and z I still get propper values for 17+
            //console.log(i, 'pos=' + x + ',' + z)


/*************
  THE PROBLEM IS WITH HOW I AM GETING POSITON INDEX VALUES IT
  STOPS WORKING AT 17+ for width or hight segs

  // 16 * 16
  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15
  16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
  32    33
~14, 15
  224   225   226   227   228   229   230   231   232   233   234   235   236   237   238   239
  240   241   242   243   244   245   246   247   248   249   250   251   252   253   254   255


  // 17 * 17
  0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16
  17    18    19    20    21    22    23    24    25    26    27    28    29    30    31    32    33
  34    35    36    37    38    39    40    41    42    43    44    45    46    47    48    49    40

~ 15, 16
  255   256   257   258   259   260   261   262   263   264   265   266   267   268   269   270   271
  272   273   274   275   276   277   278   279   280   281   282   283   284   285   286   287   288

*************/


            // positon index values
            const ia = opt.widthSegs * z + x;

            //const ic = opt.widthSegs + z * opt.widthSegs + x;

            const ic = opt.widthSegs * z + x + opt.widthSegs;

            const ib = ia + 1;

//if(i === 224){
if(i === 255){
            console.log(i, 'pos=' + x + ',' + z, ia, ib, ic);

console.log( 18 * 15 + 15);

}
            //data_index.push( ia, ib, ic );

            data_index.push( ic, ib, ia );
            data_index.push( ia + 1, ic, ic + 1 );


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
