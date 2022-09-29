// ---------- ----------
// ANIMATION LOOP MODULE - r0 - prototype
// ---------- ----------
const loopMod = (function(){


    const getCanvasRelative = function (e) {
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

    // UI DRAW METHIDS
    const drawUI = {};

    drawUI.playButton = (loop, canvas, ctx) => {
        const x = canvas.width - 64;
        const y = canvas.height - 64;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };

    //-------- ----------
    // LOOP CLASS CONSTRUCTOR
    //-------- ----------
    const Loop = function(opt){
        opt = opt || {};
        this.frame = 0;
        this.FRAME_MAX = opt.FRAME_MAX || 300;
        this.lt = new Date();
        this.secs = 0;
        this.active = false;
        this.alpha = 0;
        this.fps_update = opt.fps_update || 20;
        this.fps_movement = opt.fps_movement || 30;
        this.init = opt.init || function(){};
        this.onStart = opt.onStart || function(){};
        this.update = opt.update || function(){};
        this.scene = opt.scene || new THREE.Scene();
        this.camera = opt.camera || new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
        // renderer, ui canvas, and container div
        this.container = document.createElement('div');
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        const canvas = this.canvas_ui =  document.createElement('canvas');
        canvas.style.position = 'absolute';
        this.ctx_ui =  this.canvas_ui.getContext('2d');
        this.container.appendChild(this.canvas_ui);
        this.container.appendChild(this.renderer.domElement);
        this.setSize(640, 480);
        // attach UI EVENTS


        canvas.onselectstart = function () { return false; }
        canvas.addEventListener('click', (e) => {
            const pos = getCanvasRelative(e);
            console.log(pos)
            // prevent default
            e.preventDefault();
            if(loopObj.active){
                loopMod.stop(loopObj);
            }else{
                loopMod.start(loopObj);
            }
        });

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
        this.renderer.setSize(w, h);
        // set container, and canvas with style api
        const con = this.container;
        const can = this.canvas_ui;
        con.style.width = w + 'px';
        con.style.height = h + 'px';
        can.style.width = w + 'px';
        can.style.height = h + 'px';
        can.width = w;
        can.height = h;
        // draw ui
        drawUI.playButton(this, this.canvas_ui, this.ctx_ui)
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
        const loop = new Loop(opt);
        // the loop function as own property
        loop.loop = function(){
            const now = new Date();
            let secs = loop.secs = (now - loop.lt) / 1000;
            // keep calling loop over and over again i active
            if(loop.active){
                requestAnimationFrame(loop.loop);
            }
            if(secs > 1 / loop.fps_update){
                // update, render
                loop.update.call(loop, loop, loop.scene, loop.camera, loop.renderer);
                loop.renderer.render(loop.scene, loop.camera);
                // step frame
                loop.frame += loop.fps_movement * secs;
                loop.frame %= loop.FRAME_MAX;
                loop.lt = now;
            }
        };
        // call init
        loop.init(loop, loop.scene, loop.camera, loop.renderer);
        return loop;
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
        loop.loop();
    };
    // stop the loop
    api.stop = (loop) => {
        loop.active = false;
    };
    // return public api
    return api;
}());
