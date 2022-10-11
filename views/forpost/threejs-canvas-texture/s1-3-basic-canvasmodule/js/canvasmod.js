(function(api){

    const draw = function (canObj, ctx, canvas) {
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };

    // create and return a canvas texture
    api.create = function (opt) {
        opt = opt || {};
        opt.size = opt.size === undefined ? 16 : opt.size;
        opt.draw = opt.draw || draw;
        opt.state = opt.state || {};
        // create canvas, get context, set size
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = opt.size;
        canvas.height = opt.size;
        // create canvas object
        const canObj = {
            texture: null,
            canvas: canvas, ctx: ctx,
            state: opt.state,
            draw: opt.draw
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
