// canvas.js - r1 - from threejs-canvas-texture
(function(api){
    //-------- ----------
    // built in draw methods
    //-------- ----------
    const DRAW = {};
    // square draw method
    DRAW.square = (canObj, ctx, canvas, state) => {
        const squares = state.squares || [ {
            lw: 1,
            fi: 0,
            si: 1,
            rect: [ 0.5, 0.5, canvas.width - 1, canvas.height - 1 ] } ];
        let i = 0;
        const len = squares.length;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        while(i < len){
            const sq = squares[i];
            ctx.lineWidth = sq.lw === undefined ? 1 : sq.lw;
            ctx.fillStyle = canObj.palette[ sq.fi === undefined ? 0 : sq.fi];
            ctx.strokeStyle = canObj.palette[ sq.si === undefined ? 1 : sq.si ];
            ctx.beginPath();
            ctx.rect.apply(ctx, sq.rect);
            ctx.fill();
            ctx.stroke();
            i += 1;
        }
    };
    // random using palette colors
    DRAW.rnd = (canObj, ctx, canvas, state) => {
        let i = 0;
        const gSize =  state.gSize === undefined ? 5 : state.gSize;
        const len = gSize * gSize;
        const pxSize = canObj.size / gSize;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        while(i < len){
            const ci = Math.floor( canObj.palette.length * Math.random() );
            const x = i % gSize;
            const y = Math.floor(i / gSize);
            ctx.fillStyle = canObj.palette[ci];
            ctx.fillRect(0.5 + x * pxSize, 0.5 + y * pxSize, pxSize, pxSize);
            i += 1;
        }
    };
    //-------- ----------
    // HELEPRS
    //-------- ----------
    // parse draw option helper
    const parseDrawOption = (opt) => {
        // if opt.draw is false for any reason return DRAW.square
        if(!opt.draw){
            return DRAW.square;
        }
        // if a string is given assume it is a key for a built in draw method
        if(typeof opt.draw === 'string'){
            return DRAW[opt.draw];
        }
        // assume we where given a custom function
        return opt.draw;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // to data texture method
    api.toDataTexture = (canObj) => {
        const canvasData = canObj.texture.image.getContext('2d').getImageData(0, 0, canObj.size, canObj.size);
        const texture_data = new THREE.DataTexture(canvasData.data, canObj.size, canObj.size );
        texture_data.needsUpdate = true;
        return texture_data;
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
            texture_data: null,
            update_mode: opt.update_mode || 'dual',
            size: opt.size,
            canvas: canvas, ctx: ctx,
            palette: opt.palette || ['black', 'white'],
            state: opt.state || {},
            draw: parseDrawOption(opt)
        };
        // create texture object
        canObj.texture = new THREE.CanvasTexture(canvas);
        canObj.texture_data = api.toDataTexture(canObj);
        api.update(canObj);
        return canObj;
    };
    // update
    const UPDATE = {};
    // update canvas only update mode
    UPDATE.canvas = (canObj) => {
        // update canvas texture
        canObj.draw.call(canObj, canObj, canObj.ctx, canObj.canvas, canObj.state);
        canObj.texture.needsUpdate = true;
    };
    // update canvas AND data texture AKA 'dual' mode ( default for r1 )
    UPDATE.dual = (canObj) => {
        UPDATE.canvas(canObj);
        // update data texture
        const canvasData = canObj.texture.image.getContext('2d').getImageData(0, 0, canObj.size, canObj.size);
        const data = canObj.texture_data.image.data;
        const len = data.length;
        let i = 0;
        while(i < len){
            data[i] = canvasData.data[i];
            i += 1;
        }
        canObj.texture_data.flipY = true; // need to do this even though it should be the default in r140
        canObj.texture_data.center = new THREE.Vector2(0.5, 0.5);
        canObj.texture_data.needsUpdate = true;
    };
    api.update = (canObj) => {
        UPDATE[canObj.update_mode](canObj);
    };
}( this['canvasMod'] = {} ));
