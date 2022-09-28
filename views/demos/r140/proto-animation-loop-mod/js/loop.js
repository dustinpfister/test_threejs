// ---------- ----------
// ANIMATION LOOP MODULE - r0 - prototype
// ---------- ----------
const loopMod = (function(){
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create loop helper
    const createLoopObject = (opt) => {
        opt = opt || {};
        const loop = {
            frame: 0,
            lt: new Date(),
            active: false,
            FRAME_MAX: opt.FRAME_MAX || 300,
            fps_update: opt.fps_update || 12,
            fps_movement: opt.fps_movement || 60,
            init: opt.init || function(){},
            onStart: opt.onStart || function(){},
            update: opt.update || function(){},
            scene: opt.scene || new THREE.Scene(),
            camera: opt.camera || new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000),
            renderer: new THREE.WebGLRenderer()
        };
        // the loop function
        loop.loop = function(){
            const now = new Date();
            const secs = loop.secs = (now - loop.lt) / 1000;
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
        const loop = createLoopObject(opt);
        return loop;
    };
    // start a loop object
    api.start = (loop) => {
        loop.active = true;
        loop.lt = new Date();
        loop.onStart(loop, loop.scene, loop.camera, loop.renderer);
        loop.loop();
    };
    api.stop = (loop) => {
        loop.active = false;
    };
    // return public api
    return api;
}());
