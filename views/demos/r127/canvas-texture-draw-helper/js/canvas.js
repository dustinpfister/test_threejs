var can3 = {};

can3.draw = function (ctx, canvas) {
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.fillRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
}

// create and return a canvas texture
can3.createCanvasTexture = function (draw) {
    draw = draw || can3.draw;
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    draw(ctx, canvas);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};

// create a cube the makes use of a canvas texture
can3.createCube = function (texture) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture
        }));
};
