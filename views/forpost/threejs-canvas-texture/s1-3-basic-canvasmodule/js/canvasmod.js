(function(api){

    const draw = function (canObj, ctx, canvas, state) {
        ctx.fillStyle = canObj.palette[0]
        ctx.lineWidth = 1;
        ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        ctx.strokeStyle = canObj.palette[1]
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };

    // create and return a canvas texture
    api.create = function (opt) {
        opt = opt || {};
        // create canvas, get context, set size
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        opt.size = opt.size === undefined ? 16 : opt.size;
        canvas.width = opt.size;
        canvas.height = opt.size;
        // create canvas object
        const canObj = {
            texture: null,
            canvas: canvas, ctx: ctx,
            palette: opt.palette || ['black', 'white'],
            state: opt.state || {},
            draw: opt.draw || draw
        };
        // create texture object
        canObj.texture = new THREE.CanvasTexture(canvas);
        api.update(canObj);
        return canObj;
    };
    // update
    api.update = (canObj) => {
        canObj.draw.call(canObj, canObj, canObj.ctx, canObj.canvas, canObj.state);
        canObj.texture.needsUpdate = true;
    };

}( this['canvasMod'] = {} ));
