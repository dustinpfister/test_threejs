// canvas.js - r2 - from threejs-canvas-texture
(function(api){
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
    // parse state data objects
    const parseStateData = (canObj, opt) => {
        const data = canObj.state.data
        // all of this only applys to data strings
        if(typeof data != 'string'){
            return;
        }
        // plain data string ex '0,0,0,0,0,0,0,0'
        if(opt.dataParse === 'string'){
            canObj.state.data = data.split(',');
            return;
        }
        // try to use LZString if it is there
        if(opt.dataParse === 'lzstring'){
           try{
               const str = LZString.decompress(data);
               canObj.state.data = str.split(',');
               return;
           }catch(e){
               console.log('looks like we do not have lz-string.js ');
           }
        }
    };
    // draw grid helper for built in draw methods 'grid_palette' and 'rnd'
    const draw_grid_fill = (ctx, canvas, iw, ih, getColor) => {
        getColor = getColor || function(color){ return color };
        const len = iw * ih;
        const pxW = canvas.width / iw;
        const pxH = canvas.height / ih;
        let i = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        while(i < len){
            const x = i % iw;
            const y = Math.floor(i / iw);
            const color = getColor( new THREE.Color(), x, y, i);
            ctx.fillStyle = color.getStyle();
            const px = x * pxW;
            const py = y * pxH;
            ctx.fillRect(px, py, pxW, pxH);
            i += 1;
        }
    };
    //-------- ----------
    // built in draw methods
    //-------- ----------
    const DRAW = {};
    // draw a grid with palette data
    DRAW.grid_palette = (canObj, ctx, canvas, state) => {
        const w =  state.w === undefined ? 16 : state.w;
        const h =  state.h === undefined ? 16 : state.h;
        const data = state.data || [];
        const len = w * h;
        const pxW = canObj.size / w;
        const pxH = canObj.size / h;
        draw_grid_fill(ctx, canvas, w, h, function(color, x, y, i){
            const ci = data[i];
            return color.setStyle( canObj.palette[ci] );
        });
    };
    // random using palette colors
    DRAW.rnd = (canObj, ctx, canvas, state) => {
        let i = 0;
        const gSize =  state.gSize === undefined ? 5 : state.gSize;
        const len = gSize * gSize;
        const pxSize = canObj.size / gSize;
        draw_grid_fill(ctx, canvas, gSize, gSize, function(color, x, y, i){
            const ci = Math.floor( canObj.palette.length * Math.random() );
            return color.setStyle(canObj.palette[ci]);
        });
    };
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
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // to data texture method
    api.toDataTexture = (canObj) => {
        const canvasData = canObj.ctx.getImageData(0, 0, canObj.size, canObj.size);
        const texture_data = new THREE.DataTexture(canvasData.data, canObj.size, canObj.size );
        texture_data.needsUpdate = true;
        return texture_data;
    };
    // create and return a canvas texture
    api.create = function (opt) {
        opt = opt || {};
        // create canvas, get context, set size
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d', { willReadFrequently: true } );
        opt.size = opt.size === undefined ? 16 : opt.size;
        opt.dataParse = opt.dataParse || 'string'; // parse data strings into arrays 
        canvas.width = opt.size;
        canvas.height = opt.size;
        // create canvas object
        const canObj = {
            texture: null,
            texture_data: null,
            update_mode: opt.update_mode || 'dual',
            size: opt.size,
            canvas: canvas, 
            ctx: ctx,
            palette: opt.palette || ['black', 'white'],
            state: opt.state || {},
            draw: parseDrawOption(opt)
        };
        // parse data strings into arrays
        parseStateData(canObj, opt);
        // create texture object
        canObj.texture = new THREE.CanvasTexture(canvas);
        canObj.texture_data = api.toDataTexture(canObj);
        // update for first time
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
        const canvasData = canObj.ctx.getImageData(0, 0, canObj.size, canObj.size);
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
