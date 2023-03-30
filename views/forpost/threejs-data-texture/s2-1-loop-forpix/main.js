//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL THAT I AM USING
//-------- ----------
const light = new THREE.PointLight( new THREE.Color(1, 1, 1), 1 );
light.position.set(4, 2, 10);
scene.add(light);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// create data 
const createData = function(opt){
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
    return data;
};
// create data texture
const createDataTexture = function(opt){
    opt = opt || {};
    opt.width = opt.width === undefined ? 16: opt.width; 
    opt.height = opt.height === undefined ? 16: opt.height;
    const data = createData(opt);
    let texture = new THREE.DataTexture( data, opt.width, opt.height );
    texture.needsUpdate = true;
    return texture;

};
// update a texture
const updateTexture = (texture, opt) => {
    // just updating data array only
    const data = createData(opt);
    texture.image.data = data;
    //!!! old way of doing this where I create a whole new texture object each time
    //const texture_new = createDataTexture(opt);
    //texture.image = texture_new.image;
    texture.needsUpdate = true;
};
// get random from range
const getRndFromRange = (range) => {
    return range[0] + THREE.MathUtils.seededRandom() * ( range[1] - range[0] );
};
// get bias or ping pong method
const getBias = (n, d, count) => {
    const a = n / d * count % 1;
    return 1 - Math.abs(0.5 - a) / 0.5;
};
// make cube
const makeCube = (x, y, z, opt) => {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            map : createDataTexture(opt)
        })
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
// better random function
forPix.square = (size, fgColor, bgColor, v2_center) => {
   size = size === undefined ? 2 : size;
   fgColor = fgColor || new THREE.Color(255, 255, 255);
   bgColor = bgColor || new THREE.Color(0, 0, 0);
   v2_center = v2_center || new THREE.Vector2(0, 0);
   // create box2
   const b2 = new THREE.Box2(
       v2_center.clone().add( new THREE.Vector2(size * -1, size * -1) ),
       v2_center.clone().add( new THREE.Vector2(size, size) )
   );
   return function(color, x, y, i, opt){
        color.copy(bgColor);
        // vector2 for current px
        const v2_px = new THREE.Vector2(x, y);
        // is current px inside box2
        if(b2.containsPoint(v2_px)){
            color.r = fgColor.r;
            color.g = fgColor.g;
            color.b = fgColor.b;
        }
        return color;
    };
};
//-------- ----------
// MESH OBJECTS 
//-------- ----------
//let m = makeCube(0, 0, 0, { forPix: forPix.square(), width: 4, height: 4 });
const group = new THREE.Group();
let i = 0;
let w = 5;
let len = w * w;
while(i < len){
    const x = i % w;
    const z = Math.floor(i / w);
    const mesh = makeCube(-3 + x * 1.5, 0, -3 + z * 1.5);
    group.add(mesh);
    i += 1;
}
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const fg = new THREE.Color(255, 255, 255),
bg = new THREE.Color(0, 0, 0),
v2_center = new THREE.Vector2(8, 8);
const update = function(frame, frameMax){
    // update group 
    group.children.forEach( (mesh, i) => {
        // using the update texture method
        updateTexture(mesh.material.map, { forPix: forPix.rndChannel() });
        // square update - size up and down
        if( i % 4 === 0){
            const size = 9 * getBias(frame, frameMax, 2)
            updateTexture(mesh.material.map, { forPix: forPix.square(size, fg, bg, v2_center) });
        }
        // square update - random pos
        if( i % 3 === 0){
            const size = 4;
            const v2_rnd = new THREE.Vector2(16 * Math.random(), 16 * Math.random())
            updateTexture(mesh.material.map, { forPix: forPix.square(size, fg, bg, v2_rnd) });
        }
        // !!! this old way of doing it would result in a loss of context
        //mesh.material.map = createDataTexture({ forPix: forPix.rndChannel() });
    });
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

