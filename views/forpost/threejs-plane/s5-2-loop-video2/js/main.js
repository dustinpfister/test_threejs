(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 6, 8);
    camera.lookAt(0, -1.5, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight();
    scene.add(dl);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const createData = function(opt){
        opt = opt || {};
        opt.width = opt.width === undefined ? 16: opt.width; 
        opt.height = opt.height === undefined ? 16: opt.height;
        // DEFAULT FOR PIX METOD IS A CHECKER PATTERN HERE
        opt.forPix = opt.forPix || function(color, x, y, i, opt){
            color.setRGB(255, 255, 255);
            if(y % 2 === 0 && x % 2 === 0){
               color.setRGB(32, 32, 32);
            }
            if(y % 2 != 0 && x % 2 != 0){
               color.setRGB(64, 64, 64);
            }
            return color;
        };
        let size = opt.width * opt.height;
        let data = new Uint8Array( 4 * size );
        for ( let i = 0; i < size; i ++ ) {
            let stride = i * 4,
            x = i % opt.width,
            y = Math.floor(i / opt.width),
            color = opt.forPix( new THREE.Color(), x, y, i, opt);
            data[ stride ] = color.r;
            data[ stride + 1 ] = color.g;
            data[ stride + 2 ] = color.b;
            data[ stride + 3 ] = 255;
        }
        return data;
    };
    // create data texture
    const createDataTexture = function(opt){
        opt = opt || {};
        opt.width = opt.width === undefined ? 16: opt.width; 
        opt.height = opt.height === undefined ? 16: opt.height;
        const data = opt.data || createData(opt);
        let texture = new THREE.DataTexture( data, opt.width, opt.height );
        texture.needsUpdate = true;
        return texture;
    };
    // update a texture
    const updateTexture = (texture, opt) => {
        // just updating data array only
        const data = createData(opt);
        texture.image.data = data;
        texture.needsUpdate = true;
    };
    // simple gray scale seeded random texture
/*
    const seededRandom = function (w, h, rPer, gPer, bPer, range) {
        w = w === undefined ? 5 : w,
        h = h === undefined ? 5 : h;
        rPer = rPer === undefined ? 1 : rPer;
        gPer = gPer === undefined ? 1 : gPer;
        bPer = bPer === undefined ? 1 : bPer;
        range = range || [0, 255]
        const size = w * h;
        const data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            const stride = i * 4;
            const v = Math.floor(range[0] + THREE.MathUtils.seededRandom() * (range[1] - range[0]));
            data[stride] = v * rPer;
            data[stride + 1] = v * gPer;
            data[stride + 2] = v * bPer;
            data[stride + 3] = 255;
        }
        return createDataTexture({
            data: data,
            width: w,
            height: h
        });
    };
*/
    //-------- ----------
    // TEXTURES
    //-------- ----------
    
    const opt_data_texture = {
        alpha: 1,
        forPix: function(color, x, y, i, opt){
            color.setRGB(0, 50 + 100 * opt.alpha + 100 * opt.alpha * Math.random(), 0);
            let v = 0;
            if(y % 2 === 0 && x % 2 === 0){
               v = 25 + 50 * (1 - opt.alpha) + 25 * Math.random();
               color.setRGB(v, 0, v);
            }
            if(y % 2 != 0 && x % 2 != 0){
               v = 50 + 100 * (1 - opt.alpha) + 50 * Math.random();
               color.setRGB(v, 0, v);
            }
            return color;
        }
    };
    const texture_checker = createDataTexture(opt_data_texture);
    // random texture options
    const opt_data_texture_rnd = {
        forPix: function(color, x, y, i, opt){
            color.r = 32 + 200 * Math.random();
            color.g = 32 + 200 * Math.random();
            color.b = 32 + 200 * Math.random();
            return color;
        }
    };
    const texture_rnd = createDataTexture(opt_data_texture_rnd);
    //-------- ----------
    // MATERIALS
    //-------- ----------
    const MATERIALS = [
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: texture_checker,
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: texture_rnd,
            side: THREE.DoubleSide
        })
    ];
    //-------- ----------
    // GRID SOURCE OBJECTS
    //-------- ----------
    const tw = 5,
    th = 5,
    space = 3.1;
    const ground = TileMod.create({w: 3, h: 3, sw: 2, sh: 2, materials: MATERIALS});
    TileMod.setCheckerBoard(ground)
    const array_source_objects = [
        ground
    ];
    const array_oi = [],
    len = tw * th;
    let i = 0;
    while(i < len){
        array_oi.push( Math.floor( array_source_objects.length * THREE.MathUtils.seededRandom() ) );
        i += 1;
    }
    //-------- ----------
    // CREATE GRID
    //-------- ----------
    const grid = ObjectGridWrap.create({
        space: space,
        tw: tw,
        th: th,
        aOpacity: 1.25,
        sourceObjects: array_source_objects,
        objectIndices: array_oi
    });
    scene.add(grid);
    // ---------- ----------
    // LOOP
    // ---------- ----------
    const fps_move = 30, fps_update = 8;
    let f = 0, fm = 300, lt = new Date();
    const loop = () => {
        const now = new Date();
        const secs = (now - lt) / 1000;
        const a = f / fm;
        const b = 1 - Math.abs( 0.5 - a ) / 0.5;
        requestAnimationFrame(loop);
        if(secs >= 1 / fps_update){

            opt_data_texture.alpha = b;
            updateTexture(texture_checker, opt_data_texture);
            updateTexture(texture_rnd, opt_data_texture_rnd);


            ObjectGridWrap.setPos(grid, 1 - a, 0 );
            ObjectGridWrap.update(grid);

            f += fps_move * secs;
            f %= fm;
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
}
    ());
