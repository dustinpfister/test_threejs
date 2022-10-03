(function(api){
    api.draw = function (ctx, canvas) {
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };
    // create and return a canvas texture
    api.createCanvasTexture = function (state, drawFunc) {
        drawFunc = drawFunc || canvasMod.draw;
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var canvasObj = {
            texture: texture,
            canvas: canvas,
            ctx: ctx,
            state: state,
            draw: function(){
                drawFunc.call(state, ctx, canvas, state);
            }
        };
        canvasObj.draw();
        return canvasObj;
    };
    // create a cube the makes use of a canvas texture
    api.createCube = function (texture) {
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                map: texture
            }));
    };
}( this['canvasMod'] = {} ));
