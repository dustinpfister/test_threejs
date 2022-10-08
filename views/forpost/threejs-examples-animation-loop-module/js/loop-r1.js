// ---------- ----------
//  ANIMATION LOOP MODULE - r1 - from threejs-examples-animation-loop-module
//    Copyright 2022 by Dustin Pfister
//    https://dustinpfister.github.io/2022/09/30/threejs-examples-animation-loop-module/
// ---------- ----------
const loopMod = (function(){
    //-------- ----------
    // HELPERS
    //-------- ----------
    // wrap and wrap axis methods from threejs-examples-wrap-module
    // https://dustinpfister.github.io/2022/09/09/threejs-examples-wrap-module/
    const wrap = function (value, a, b){
        // get min and max this way
        let max = Math.max(a, b);
        let min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        let range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // wrap an axis
    const wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
        return vec;
    };
    // get canvas relative position from mouse or touch event object
    const getCanvasRelative = (e) => {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        pos = {
            x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
            y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
            bx: bx
        };
        // ajust for native canvas matrix size
        pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
        pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
        return pos;
    };
    // set the style of the container as well as all children
    const setContainerStyle = (li) => {
        const con = li.container;
        const len = con.children.length;
        let i = 0;
        // set style (of classNames, ids)
        con.className = 'aniloop_parent';
        while(i < len){
           const item = con.children.item(i);
           item.className = 'aniloop_child';
           i += 1;
        }
    };
    // attach event handers
    const attachUIEvents = (li) => {
        const con = li.container;
        con.onselectstart = function () { return false; };
        // play pause button check
        con.addEventListener('click', (e) => {
            const pos = getCanvasRelative(e);
            // prevent default
            e.preventDefault();
            const pb = li.buttons.play;
            const v_click = new THREE.Vector2(pos.x, pos.y);
            const v_pb = new THREE.Vector2(pb.x, pb.y);
            const d = v_click.distanceTo(v_pb);
            if(d <= pb.r ){
                if(li.active){
                    loopMod.stop(li);
                }else{
                    loopMod.start(li);
                }
                drawUI.draw(li, li.canvas_ui, li.ctx_ui);
            }
        });
    };
    // UI DRAW METHIDS
    const drawUI = {};
    // draw the 'play/pause' button
    drawUI.playButton = (loop, canvas, ctx) => {
        const pb = loop.buttons.play;
        const x = pb.x;
        const y = pb.y;
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, pb.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // if active draw square, else triangle
        ctx.beginPath();
        ctx.fillStyle = 'white';
        const r = pb.r / 2;
        if(loop.active){
            ctx.rect( pb.x - r, pb.y - r, r * 2, r * 2 );
        }else{
            ctx.moveTo(pb.x + r * 1.25, pb.y);
            ctx.lineTo(pb.x - r, pb.y + r);
            ctx.lineTo(pb.x - r, pb.y - r);
        }
        ctx.fill();
    };
    // main draw ui method
    drawUI.draw = (loop, canvas, ctx) => {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawUI.playButton(loop, canvas, ctx);
    };
    //-------- ----------
    // LOOP CLASS CONSTRUCTOR
    //-------- ----------
    const Loop = function(opt){
        const li = this; // li for Loop Instance
        opt = opt || {};
        li.frame = 0;
        li.FRAME_MAX = opt.FRAME_MAX || 300;
        li.lt = new Date();
        li.w = opt.width === undefined ? 640 : opt.width;
        li.h = opt.height === undefined ? 480 : opt.height


        li.secs = 0;
        li.active = false;
        li.alpha = 0;
        li.fps_update = opt.fps_update || 20;
        li.fps_movement = opt.fps_movement || 30;
        li.init = opt.init || function(){};
        li.onStart = opt.onStart || function(){};
        li.update = opt.update || function(){};
        li.scene = opt.scene || new THREE.Scene();
        li.camera = opt.camera || new THREE.PerspectiveCamera(50, li.w / li.h, 0.1, 1000);

        // renderer, ui canvas, and container div
        li.container = document.createElement('div');
        //li.container = opt.el || document.body; //document.createElement('div');

        li.renderer = new THREE.WebGLRenderer({ alpha: true });
        li.canvas_ui =  document.createElement('canvas');
        li.ctx_ui =  li.canvas_ui.getContext('2d');
        // append
        li.container.appendChild(li.renderer.domElement);
        li.container.appendChild(li.canvas_ui);
        // ui buttons
        const buttons = li.buttons = {};
        buttons.play = opt.pb || { x:0, y:0, r: 20, dx: 24, dy: 24 };
        // set style
        setContainerStyle(li);
        // attach UI EVENTS
        attachUIEvents(li);
        // set size for first time
        li.setSize(li.w, li.h);

        if(opt.el){
            opt.el.appendChild( li.container );
        }

    };
    //-------- ----------
    // LOOP CLASS PROTOTYPE
    //-------- ----------
    // GetAlpha method pased off of frame and FRAME_MAX by default
    // or the given count, n, d, values
    Loop.prototype.getAlpha = function(count, n, d){
        count = count === undefined ? 1 : count;
        n = n === undefined ? this.frame : n;
        d = d === undefined ? this.FRAME_MAX : d;
        return THREE.MathUtils.euclideanModulo(n / d * count, 1);
    };
    // get a bias or ping pong value
    Loop.prototype.getBias = function(count, n, d){
        const alpha = this.getAlpha(count, n, d);
        return THREE.MathUtils.pingpong(alpha - 0.5, 1) * 2;
    };
    // the setSize method
    Loop.prototype.setSize = function(w, h){
        // set renderer
        this.renderer.setSize(w, h, false);
        // set container, and canvas with style api
        const con = this.container;
        const can = this.canvas_ui;
        can.width = w;
        can.height = h;
        //can.style.width = w + 'px';
        //can.style.height = h + 'px';
        //con.style.width = w + 'px';
        //con.style.height = h + 'px';
        // update play button state, and draw ui
        const pb = this.buttons.play;
        pb.x = this.canvas_ui.width - pb.dx;
        pb.y = this.canvas_ui.height - pb.dy;
        drawUI.draw(this, this.canvas_ui, this.ctx_ui);
    };
    // loop function at prototype level is noop (might remove)
    Loop.prototype.loop = function(){};
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create loop helper
    const createLoopObject = (opt) => {
        opt = opt || {};
        // create a Loop Class Object
        const li = new Loop(opt);
        // the loop function as own property
        li.loop = function(){
            const now = new Date();
            let secs = li.secs = (now - li.lt) / 1000;
            // keep calling loop over and over again i active
            if(li.active){
                requestAnimationFrame(li.loop);
            }
            if(secs > 1 / li.fps_update){
                // update, render
                li.update.call(li, li, li.scene, li.camera, li.renderer);
                li.renderer.render(li.scene, li.camera);
                // step frame
                li.frame += li.fps_movement * secs;
                li.frame %= li.FRAME_MAX;
                li.lt = now;
            }
        };
        // call init
        li.init(li, li.scene, li.camera, li.renderer);
        return li;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    const api = {};
    // create a loop object
    api.create = (opt) => {
        opt = opt || {};
        // the loop object
        const loop = createLoopObject(opt);
        // return the loop object
        return loop;
    };
    // start a loop object
    api.start = (loop) => {
        loop.active = true;
        loop.lt = new Date();
        loop.onStart(loop, loop.scene, loop.camera, loop.renderer);
        drawUI.draw(loop, loop.canvas_ui, loop.ctx_ui);
        loop.loop();
    };
    // stop the loop
    api.stop = (loop) => {
        loop.active = false;
        drawUI.draw(loop, loop.canvas_ui, loop.ctx_ui);
    };
    // making wrap helper public
    api.wrap = wrap;
    // Wrap a vector method of public api
    api.wrapVector = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(-1, -1, -1);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        Object.keys(vec).forEach(function(axis){
            wrapAxis(vec, vecMin, vecMax, axis);
        });
        return vec;
    };
    // return public api
    return api;
}());
