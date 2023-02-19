//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// DATA TEXTURE METHODS
//-------- ----------
// make a data texture by passing w, h, and a function
// that will be called for each pixel
const datatex = (function () {
    const api = {};
    // mk data texture helper
    api.mkDataTexture = (data, w) => {
        data = data || [];
        w = w || 0;
        const width = w,
        height = data.length / 4 / w;
        const texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create a data texture with a method that will be called for each pix
    api.forEachPix = (w, h, forEach) => {
        const width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        const size = width * height;
        const data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            const stride = i * 4;
            const x = i % width;
            const y = Math.floor(i / width);
            let obj = forEach(x, y, w, h, i, stride, data);
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
const circleTexture = function(t){
    t = t === undefined ? 1 : t;
    return datatex.forEachPix(16, 16, (x, y, w, h, i, stride, data) => {
        const v = new THREE.Vector2(x, y);
        const d = v.distanceTo( new THREE.Vector2(w / 2, h / 2) );
        let cv = d / ( 16 * t ) * 255;
        cv = cv > 255 ? 255 : cv;
        cv = cv < 0 ? 0 : cv;
        return {
            g: Math.round(cv)
        };
    });
};
//  rnd
const rndTexture = function(){
    return datatex.forEachPix(16, 16, (x, y, w, h, i, stride, data) => {
        const cv = Math.round( Math.random() * 255 );
        return {
            r: cv,
            g: cv,
            b: cv
        };
    });
};
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xafafaf, 0.5);
dl.position.set(8, 10, 2);
scene.add(dl);
const helper = new THREE.DirectionalLightHelper( dl, 5 );
scene.add( helper );
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({
        emissive: new THREE.Color('white'),
        emissiveIntensity: 1
    })
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    mesh.material.emissiveMap = circleTexture(a2 * 4);
    // new color map
    mesh.material.map = rndTexture();
    // moving directional light
    var r = Math.PI * 4 * a1,
    x = Math.cos(r) * 4,
    z = Math.sin(r) * 4;
    dl.position.set(x, 4, z);
    helper.update();
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
