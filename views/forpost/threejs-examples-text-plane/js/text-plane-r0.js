// canvas.js - r1 - from threejs-canvas-texture
(function(api){
    //-------- ----------
    // HELPERS
    //-------- ----------
    // wrap text method
    // https://stackoverflow.com/questions/14484787/wrap-text-in-javascript
    // https://dustinpfister.github.io/2019/03/20/js-regex/
    const wrapText = function (str, width) {
        const patt = new RegExp('(?![^\\n]{1,' + width + ')([^\\n]{1,' + width + '})\\s', 'g');
        return str.replace(patt, '$1\n');
    };
    // EOL CONVERSION - replace all /r/n and /r with /n
    const EOLConvert = (text) => {
        return text.replace(/\r\n/g,'\n').replace(/\r/g,'\n')
    }
    // VANILLA JAVASCRIPT LODASH CHUNK ALTERTAIVE
    // https://dustinpfister.github.io/2017/09/13/lodash-chunk/
    const chunk = function (arr, size) {
        const chunkedArr = [];
        arr = arr || [];
        size = size === undefined ? 1 : size;
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };
    // create an array of text objects to use with the drawText method
    // this is a reusable set of objects
    const createLines = (canObj, rows) => {
        let i = 0;
        const lines = [];
        while(i < rows){
            lines.push({
                text: '',
                //x: 10, y : 30 + 60 * i,
                x: 10, y:0,
                lw: 1, 
                fc: canObj.palette[1],
                sc: canObj.palette[2],
                //fc: '#888888', sc: 'white',
                a: 'left', f: 'arial', fs: '20px', bl: 'top'
            });
            i += 1;
        }
        return lines;
    };
    // smooth move of lines on the Y
    const smoothY = (lines, alpha, sy, dy) => {
        let i = 0;
        const len = lines.length;
        while(i < len){
            const li = lines[i];
            li.y = sy + dy * i - dy * alpha * 1;
            i += 1;
        }
    };
    // The custom draw text method to be used with canvas.js
    const drawText = (canObj, ctx, canvas, state) => {
        ctx.fillStyle = canObj.palette[0];
        // clear rect then fill so that I can have a transparent background if I want
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.fillRect(0,0, canvas.width, canvas.height);
        state.lines.forEach((li)=>{
            ctx.lineWidth = li.lw;
            ctx.textAlign = li.a;
            ctx.textBaseline = li.bl;
            ctx.font = li.fs + ' ' + li.f;
            ctx.fillStyle = li.fc;
            ctx.strokeStyle = li.sc;
            ctx.fillText(li.text, li.x, li.y);
            ctx.strokeText(li.text, li.x, li.y);
        });
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // create just a canvas object that will work
    // for a material. I will want to call this if I want to
    // use the resulting texture with a mesh object other than a plane
    // of as a background or something to that effect
    api.createCanObj = (opt) => {
        opt = opt || {};
        let canObj = canvasMod.create({
            draw: drawText,
            size: opt.size === undefined ? 512 : opt.size,
            update_mode: opt.update_mode || 'canvas',
            state: {
                lines: []
            },
            palette: opt.palette || ['#080808', '#8a8a8a', '#ffffff']
        });
        canObj.state.lines = createLines(canObj,  opt.rows === undefined ? 9 : opt.rows );
        return canObj;
    };
    // make plane helper function
    //api.makePlane = (texture, w, h) => {
    api.createPlane = (opt) => {
        opt = opt || {};
        const canObj = api.createCanObj(opt);
        // create plane
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(opt.w, opt.h, 1, 1),
            new THREE.MeshBasicMaterial({
                map: canObj.updateMode === 'dual' ? canObj.texture_data : canObj.texture,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 1
            })
        );
        plane.userData.canObj = canObj;
        // return the new plane
        return plane;
    };
    // create text lines
    api.createTextLines = (text, cols) => {
        let arr = wrapText(EOLConvert(text), cols).split('\n');
        // need to break down lines that are at or above cols
        arr = arr.map((a)=>{
            if(a.length >= cols){
                return chunk(a.split(''), cols).map((b)=>{ return b.join('')})
            }
            return a;
        }).flat()
        return arr;
    };
    // Just move the given text lines
    api.moveTextLines = (lines, textLines, alpha, sy, dy) => {
        linesLen = lines.length;
        const tli = Math.floor( textLines.length * alpha);
        textLines.slice(tli, tli + linesLen).forEach( (text, i) => {
            lines[i].text = text;
        });
        smoothY(lines, alpha * textLines.length % 1, sy, dy);
    };
}( this['TextPlane'] = {} ));
