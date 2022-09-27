// ---------- ----------
// ANIMATION LOOP MODULE - r0 - prototype
// ---------- ----------
const loopMod = (function(){
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create loop helper
    const createLoopFunction = (opt) => {
        opt = opt || {};
        const loopObj = {
            frame: 0,
            lt: new Date(),
            FRAME_MAX: opt.FRAME_MAX || 90,
            fps_update: opt.fps_update || 12,
            fps_movement: opt.fps_movement || 30,
            update: opt.update || function(){},
            scene: opt.scene || new THREE.Scene(),
            camera: opt.camera || new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000),
            renderer: new THREE.WebGLRenderer()
        };
        loopObj.loop = function(){
            const now = new Date(),
            secs = (now - loopObj.lt) / 1000;
            requestAnimationFrame(loopObj.loop);
            if(secs > 1 / loopObj.fps_update){
                // update, render
                loopObj.update( Math.floor(loopObj.frame), loopObj.FRAME_MAX);
                loopObj.renderer.render(loopObj.scene, loopObj.camera);
                // step frame
                loopObj.frame += loopObj.fps_movement * secs;
                loopObj.frame %= loopObj.FRAME_MAX;
                loopObj.lt = now;
            }
        };
        return loopObj;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    const api = {};
    // create loop function
    api.create = (opt) => {
        opt = opt || {};
        const loopObj = createLoopFunction(opt);
        loopObj.camera.position.set(2, 2, 2);
        loopObj.camera.lookAt(0, 0, 0);
        loopObj.renderer.setSize(640, 480);
        return loopObj;
    };
    // return public api
    return api;
}());


// ---------- ----------
// DEMO
// ---------- ----------
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
const loopObj = loopMod.create({
    update: function(frame, frameMax){
        const degree = 360 * (frame / frameMax);
        mesh.rotation.x = THREE.MathUtils.degToRad(degree);
    }
});
(document.getElementById('demo') || document.body).appendChild(loopObj.renderer.domElement);
loopObj.scene.add(mesh);
loopObj.loop();
