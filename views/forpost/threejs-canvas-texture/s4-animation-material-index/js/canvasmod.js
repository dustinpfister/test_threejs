(function(api){
    // create and return a canvasObj with texture
    api.createCanvasObject = function (state, drawFunc) {
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
                // making sure I am setting this to true each time
                texture.needsUpdate = true;
            }
        };
        canvasObj.draw();
        return canvasObj;
    };

    // create a cube the makes use of one or more textures
    api.createCube = function (texture) {
        var materials = [];
        if(texture instanceof Array){
            texture.forEach(function(t){
                t.magFilter = THREE.NearestFilter;
                materials.push(new THREE.MeshStandardMaterial({
                    map: t,
                    side: THREE.DoubleSide
                }));
            });
        }else{
            materials = new THREE.MeshStandardMaterial({
                map: texture
            });
        }
        return new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), materials);
    };

}( this['canvasMod'] = {} ));
