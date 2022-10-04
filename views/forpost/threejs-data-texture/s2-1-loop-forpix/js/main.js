//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(8,8))
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL THAT I AM USING
//-------- ----------
const light = new THREE.PointLight( new THREE.Color(1, 1, 1), 1 );
light.position.set(6, 3, 1);
scene.add(light);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// create data texture method
const createDataTexture = function(opt){
    opt = opt || {};
    opt.width = opt.width === undefined ? 16: opt.width; 
    opt.height = opt.height === undefined ? 16: opt.height;
    // default for pix method
    opt.forPix = opt.forPix || function(color, x, y, i, opt){
        let v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        color.r = v;
        color.g = v;
        color.b = v;
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
    let texture = new THREE.DataTexture( data, opt.width, opt.height );
    texture.needsUpdate = true;
    return texture;
};
// get random from range
const getRndFromRange = (range) => {
    return range[0] + THREE.MathUtils.seededRandom() * ( range[1] - range[0] );
};
// make cube
const makeCube = (x, y, z) => {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial()
    );
    mesh.position.set(x, y, z);
    return mesh;
};
//-------- ----------
// CREATE FOR PIX FUNCTIONS
//-------- ----------
const forPix = {};
// better random function
forPix.rndChannel = (r, g, b) => {
   r = r || [0, 255];
   g = g || [0, 255];
   b = b || [0, 255];
   return function(color, x, y, i, opt){
        color.r = getRndFromRange(r);
        color.g = getRndFromRange(g);
        color.b = getRndFromRange(b);
        return color;
    };
};
//-------- ----------
// MESH OBJECTS WITH DATA TEXTURES
//-------- ----------
const mesh1 = makeCube(0, 0, 0);
scene.add(mesh1);
const mesh2 = makeCube(-3, 0, 0);
scene.add(mesh2);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        // mesh1 - rand default
        mesh1.material.map = createDataTexture({ forPix: forPix.rndChannel() });
        // mesh2- rand red
        mesh2.material.map = createDataTexture({ forPix: forPix.rndChannel([64, 200], [0,0], [0,0]) });
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();

