// ---------- ----------
// ANIMATION LOOP MODULE - r0 - prototype
// ---------- ----------
const loopMod = (function(){
    //-------- ----------
    // LOOP CLASS CONSTRUCTOR
    //-------- ----------
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
        con.className = 'aniloop_parent'
        // set position and left and right css vlaues
        while(i < len){
           const item = con.children.item(i);
           item.className = 'aniloop_child'
/*
           item.style.position = 'absolute';
           item.style.left = '0px';
           item.style.top = '0px';
*/
           i += 1;
        }
    };
    // UI DRAW METHIDS
    const drawUI = {};
    // draw the 'play/pause' button
    drawUI.playButton = (loop, canvas, ctx) => {
        const pb = loop.buttons.play;
        const x = pb.x;
        const y = pb.y;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 32, 0, Math.PI * 2);
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
        li.secs = 0;
        li.active = false;
        li.alpha = 0;
        li.fps_update = opt.fps_update || 20;
        li.fps_movement = opt.fps_movement || 30;
        li.init = opt.init || function(){};
        li.onStart = opt.onStart || function(){};
        li.update = opt.update || function(){};
        li.scene = opt.scene || new THREE.Scene();
        li.camera = opt.camera || new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
        // renderer, ui canvas, and container div
        li.container = document.createElement('div');
        li.renderer = new THREE.WebGLRenderer({ alpha: true });
        const canvas = li.canvas_ui =  document.createElement('canvas');
        li.ctx_ui =  li.canvas_ui.getContext('2d');

        li.container.appendChild(li.renderer.domElement);
        li.container.appendChild(li.canvas_ui);
setContainerStyle(li);

        //canvas.style.position = 'absolute';
        //canvas.style.left = '0px';
        // ui buttons
        const buttons = li.buttons = {};
        buttons.play = { x:0, y:0, r: 32 }
        // attach UI EVENTS
        canvas.onselectstart = function () { return false; };
        // play pause button check
        canvas.addEventListener('click', (e) => {
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
        // set size for first time
        li.setSize(640, 480);
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
        this.buttons.play.x = this.canvas_ui.width - 64;
        this.buttons.play.y = this.canvas_ui.height - 64;
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
        drawUI.draw(loop, loop.canvas_ui, loop.ctx_ui);
        loop.loop();
    };
    // stop the loop
    api.stop = (loop) => {
        loop.active = false;
        drawUI.draw(loop, loop.canvas_ui, loop.ctx_ui);
    };
    // return public api
    return api;
}());
