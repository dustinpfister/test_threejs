// ********** **********
// data textures
// module for createing data textxures
// ********** **********
var datatex = (function () {

    var api = {};

    // mk data texture helper
    api.mkDataTexture = function (data, w) {
        data = data || [];
        w = w || 0;
        var width = w, //20,
        height = data.length / 4 / w;
        var texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };

    // simple gray scale seeded random texture
    api.seededRandom = function (w, h) {
        var width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        var size = width * height;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
            data[stride] = v;
            data[stride + 1] = v;
            data[stride + 2] = v;
            data[stride + 3] = 255;
        }
        return api.mkDataTexture(data, width);
    };

    // return the api
    return api;
}
    ());
