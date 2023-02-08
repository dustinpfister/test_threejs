//******** **********
// DATA TEXTURE HELPER
//******** **********
// create data texture method
let createDataTexture = function(opt){
    opt = opt || {};
    opt.width = opt.width === undefined ? 16: opt.width; 
    opt.height = opt.height === undefined ? 16: opt.height;
    // default for pix method
    opt.forPix = opt.forPix || function(color, x, y, i, opt){
        let v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        color.setRGB(v, v, v);
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
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(8,8))
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL THAT I AM USING
//******** **********
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
//******** **********
// MESH OBJECTS WITH DATA TEXTURES
//******** **********
// default sudo random texture
var tex1 = createDataTexture();
var mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        map: tex1
    })
);
scene.add(mesh1);
//******** **********
// LOOP
//******** **********
var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 20;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // new data texture for mesh1
        mesh1.material.map = createDataTexture();
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }

};
loop();
