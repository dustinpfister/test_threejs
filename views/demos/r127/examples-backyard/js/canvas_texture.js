(function (canvasTextureMod) {
    // create a canvas texture with a draw method and size
    canvasTextureMod.createCanvasTexture = function (draw, size) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };

    var randomGridDraw = function (ctx, canvas, colorsArray) {
        var i = 0,
        r1,
        r,
        g,
        b,
        x,
        y,
        len = canvas.width * canvas.height;
        while (i < len) {
            x = i % canvas.width;
            y = Math.floor(i / canvas.width);
            r1 = Math.floor(128 + 100 * Math.random());
            r = colorsArray[0] === 'r1' ? r1 : colorsArray[0];
            g = colorsArray[1] === 'r1' ? r1 : colorsArray[1];
            b = colorsArray[2] === 'r1' ? r1 : colorsArray[2];
            ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
            ctx.fillRect(x, y, 1, 1);
            i += 1;
        }
    };

    // create random gird texture
    canvasTextureMod.randomGrid = function (colorsArray, size) {
        colorsArray = colorsArray === undefined ? ['r1', 'r1', 'r1'] : colorsArray;
        size = size || 32;
        return canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            randomGridDraw(ctx, canvas, colorsArray);
        }, size);
    };
    // create a basic square texture
    canvasTextureMod.basicSquare = function () {

        return canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            randomGridDraw(ctx, canvas, ['r1', 0, 0]);

            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.stroke();
        }, 32);
    };
}
    (this['canvasTextureMod'] = {}));
