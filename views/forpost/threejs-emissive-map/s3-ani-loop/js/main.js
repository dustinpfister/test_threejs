//******** **********
// DATA TEXTURE METHODS
//******** **********
// make a data textture by passing w, h, and a function
// that will be called for each pixel
var datatex = (function () {
    var api = {};
    // mk data texture helper
    api.mkDataTexture = function (data, w) {
        data = data || [];
        w = w || 0;
        var width = w,
        height = data.length / 4 / w;
        var texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create a data texture with a method that will be called for each pix
    api.forEachPix = function (w, h, forEach) {
        var width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        var size = width * height;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var x = i % width;
            var y = Math.floor(i / width);
            var obj = forEach(x, y, w, h, i, stride, data);
            obj = obj || {};
            data[stride] = obj.r || 0;
            data[stride + 1] = obj.g || 0;
            data[stride + 2] = obj.b || 0;
            data[stride + 3] = obj.a === undefined ? 255: obj.a;
        }
        return api.mkDataTexture(data, width)
    };
    // return the api
    return api;
}
    ());
// square texture
var circleTexture = function(t){
    t = t === undefined ? 1 : t;
    return datatex.forEachPix(16, 16, function(x, y, w, h, i, stride, data){
        var v = new THREE.Vector2(x, y);
        var d = v.distanceTo( new THREE.Vector2(w / 2, h / 2) );
        var cv = d / ( 16 * t ) * 255;
        cv = cv > 255 ? 255 : cv;
        cv = cv < 0 ? 0 : cv;
        return {
            g: Math.round(cv)
        };
    });
};
//  rnd
var rndTexture = function(){
    return datatex.forEachPix(16, 16, function(x, y, w, h, i, stride, data){
        var cv = Math.round( Math.random() * 255 );
        return {
            r: cv,
            g: cv,
            b: cv
        };
    });
};

//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 1000);
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xafafaf, 0.5);
dl.position.set(8, 10, 2);
scene.add(dl);
var helper = new THREE.DirectionalLightHelper( dl, 5 );
scene.add( helper );
//******** **********
// MESH
//******** **********
var mesh = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({
        emissive: new THREE.Color('white'),
        emissiveIntensity: 1
    })
);
scene.add(mesh);
//******** **********
// LOOP
//******** **********
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        // new emmisiveMap
        mesh.material.emissiveMap = circleTexture(bias * 4);
        // new color map
        mesh.material.map = rndTexture();

        // moving directional light
        var r = Math.PI * 4 * per,
        x = Math.cos(r) * 4,
        z = Math.sin(r) * 4;
        dl.position.set(x, 4, z);

        helper.update();

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();