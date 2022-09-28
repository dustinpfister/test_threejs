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
        const loopObj = {
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
        loopObj.loop = function(){
            const now = new Date();
            const secs = loopObj.secs = (now - loopObj.lt) / 1000;
            // keep calling loop over and over again i active
            if(loopObj.active){
                requestAnimationFrame(loopObj.loop);
            }
            if(secs > 1 / loopObj.fps_update){
                // update, render
                loopObj.update(loopObj, loopObj.scene, loopObj.camera, loopObj.renderer);
                loopObj.renderer.render(loopObj.scene, loopObj.camera);
                // step frame
                loopObj.frame += loopObj.fps_movement * secs;
                loopObj.frame %= loopObj.FRAME_MAX;
                loopObj.lt = now;
            }
        };
        loopObj.init(loopObj, loopObj.scene, loopObj.camera, loopObj.renderer);
        return loopObj;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    const api = {};
    // create a loop object
    api.create = (opt) => {
        opt = opt || {};
        const loopObj = createLoopObject(opt);
        return loopObj;
    };
    // start a loop object
    api.start = (loopObj) => {
        loopObj.active = true;
        loopObj.lt = new Date();
        loopObj.onStart(loopObj, loopObj.scene, loopObj.camera, loopObj.renderer);
        loopObj.loop();
    };
    api.stop = (loopObj) => {
        loopObj.active = false;
    };
    // return public api
    return api;
}());
