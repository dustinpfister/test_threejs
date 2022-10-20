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
    // make a data texture
    const mkDataTexture = function (data, w) {
        data = data || [];
        w = w || 0;
        const width = w,
        height = data.length / 4 / w;
        const texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // simple gray scale seeded random texture
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
        return mkDataTexture(data, w);
    };
    //-------- ----------
    // TEXTURES
    //-------- ----------
    const textureRND1 = seededRandom(80, 80, 1, 1, 1, [130, 250]);
    const textureRND2 = seededRandom(160, 160, 1, 1, 1, [64, 170]);
    //-------- ----------
    // MATERIALS
    //-------- ----------
    const MATERIALS = [
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            map: textureRND1,
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 0x00aa00,
            map: textureRND2,
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
       //const b = 1 - Math.abs( 0.5 - a ) / 0.5;
        requestAnimationFrame(loop);
        if(secs >= 1 / fps_update){
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
