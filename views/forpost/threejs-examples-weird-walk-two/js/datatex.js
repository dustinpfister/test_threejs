// ********** **********
// data textures
// module for creating data textures
// ********** **********
(function (api) {
    // mk data texture helper
    api.mkDataTexture = function (data, w) {
        data = data || [];
        w = w || 0;
        const width = w,
        height = data.length / 4 / w;
        const texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create a data texture with a method that will be called for each pix
    api.forEachPix = function (w, h, forEach) {
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
    // from px data method
    api.fromPXDATA = function(pxData, width, palette){
        palette = palette || [
            [0,0,0,255],
            [255,255,255,255]
        ];
        const height = Math.floor(pxData.length / width);
        return api.forEachPix(width, height, function(x, y, w, h, i){
            const obj = {};
            const colorIndex = pxData[i];
            const color = palette[colorIndex];
            obj.r = color[0];
            obj.g = color[1];
            obj.b = color[2];
            obj.a = color[3];
            return obj;
        });
    };
    // simple gray scale seeded random texture
    api.seededRandom = function (w, h) {
        const width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        const size = width * height;
        const data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            const stride = i * 4;
            const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
            data[stride] = v;
            data[stride + 1] = v;
            data[stride + 2] = v;
            data[stride + 3] = 255;
        }
        return api.mkDataTexture(data, width);
    };
}( this['datatex'] = {} ));
