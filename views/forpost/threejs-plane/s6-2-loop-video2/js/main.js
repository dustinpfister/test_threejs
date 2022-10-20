(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, -1.5, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight();
    dl.position.set(0,3,3)
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
    //-------- ----------
    // TEXTURES
    //-------- ----------
    const opt_data_texture = {
        alpha: 1,
        forPix: function(color, x, y, i, opt){
            const roll = Math.random();
            if(roll < 0.05){
                color.setRGB(255,255,255);
                return color;
            }
            let v = 50 + 100 * opt.alpha + 100 * opt.alpha * Math.random();
            color.setRGB(0, v, 0);
            if(y % 2 === 0 && x % 2 === 0){
               v = 25 + 50 * (1 - opt.alpha) + 25 * Math.random();
               color.setRGB(0, v, 0);
            }
            if(y % 2 != 0 && x % 2 != 0){
               v = 50 + 100 * (1 - opt.alpha) + 50 * Math.random();
               color.setRGB(0, v, 0);
            }
            return color;
        }
    };
    const texture_checker = createDataTexture(opt_data_texture);
    // random texture options
    const opt_data_texture_rnd = {
        forPix: function(color, x, y, i, opt){
            const v = 32 + 200 * Math.random();
            const roll = Math.random();
            if(roll < 0.80){
                color.g = v;
                return color;
            }
            color.setRGB(v, v, v);
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
    const tw = 8,
    th = 8,
    space = 3.1;
    const ground1 = TileMod.create({w: 3, h: 3, sw: 4, sh: 4, materials: MATERIALS[0]});
    TileMod.setCheckerBoard(ground1);
    const ground2 = TileMod.create({w: 3, h: 3, sw: 4, sh: 4, materials: MATERIALS});
    TileMod.setCheckerBoard(ground2);
    const ground3 = TileMod.create({w: 3, h: 3, sw: 4, sh: 4, materials: MATERIALS[1]});
    TileMod.setCheckerBoard(ground3);
    const array_source_objects = [
        ground1,
        ground2,
        ground3
    ];
    const array_oi = [],
    len = tw * th;
    let i = 0;
    // random index values for source objects?
    while(i < len){
        array_oi.push( Math.floor( array_source_objects.length * THREE.MathUtils.seededRandom() ) );
        i += 1;
    }
    //-------- ----------
    // EFFECT
    //-------- ----------
    (function(){
        ObjectGridWrap.load( {
            EFFECTS : {
                flip : function(grid, obj, objData, ud){
                    const startFlip = grid.userData.startFlip === undefined ? -45: grid.userData.startFlip;
                    const maxFlipDelta = grid.userData.maxFlipDelta === undefined ? 90: grid.userData.maxFlipDelta;
                    obj.rotation.x = Math.PI / 180 * startFlip  + Math.PI / 180 * maxFlipDelta * objData.b;
                }
            }
        });
    }());
    //-------- ----------
    // CREATE GRID
    //-------- ----------
    const grid = ObjectGridWrap.create({
        space: space,
        tw: tw,
        th: th,
        effects: ['opacity2', 'flip'],
        sourceObjects: array_source_objects,
        objectIndices: array_oi
    });
    scene.add(grid);
    // ---------- ----------
    // LOOP
    // ---------- ----------
    const fps_move = 30, fps_update = 20;
    let f = 0, fm = 300, lt = new Date();
    const loop = () => {
        const now = new Date();
        const secs = (now - lt) / 1000;
        const a = f / fm;
        const b = 1 - Math.abs( 0.5 - a ) / 0.5;
        requestAnimationFrame(loop);
        if(secs >= 1 / fps_update){


            grid.userData.startFlip = -180 * b;
            grid.userData.maxFlipDelta = 360 * b;

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
