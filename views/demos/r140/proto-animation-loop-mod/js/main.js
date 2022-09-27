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
            active: false,
            FRAME_MAX: opt.FRAME_MAX || 300,
            fps_update: opt.fps_update || 12,
            fps_movement: opt.fps_movement || 30,
            init: opt.init || function(){},
            onStart: opt.onStart || function(){},
            update: opt.update || function(){},
            scene: opt.scene || new THREE.Scene(),
            camera: opt.camera || new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000),
            renderer: new THREE.WebGLRenderer()
        };
        loopObj.loop = function(){
            const now = new Date(),
            secs = (now - loopObj.lt) / 1000;
            if(loopObj.active){
                requestAnimationFrame(loopObj.loop);
            }
            if(secs > 1 / loopObj.fps_update){
                // update, render
                loopObj.update(loopObj, Math.floor(loopObj.frame), loopObj.FRAME_MAX, loopObj.scene, loopObj.camera);
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
        const loopObj = createLoopFunction(opt);
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


// ---------- ----------
// DEMO
// ---------- ----------
const loopObj = loopMod.create({
    init: function(loopObj, scene, camera, renderer){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        mesh.name = 'mesh';
        scene.userData.mesh = mesh;
        scene.add(mesh);
        (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    },
    onStart: function(loopObj, scene, camera, renderer){
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
        renderer.setSize(640, 480);
        scene.userData.mesh.rotation.x = 0;
        loopObj.frame = 0;
    },
    update: function(loopObj, frame, frameMax, scene, camera){
        const degree = 360 * (frame / frameMax);
        scene.userData.mesh.rotation.x = THREE.MathUtils.degToRad(degree);
    }
});
// do just once
loopMod.start(loopObj);
 
// event 
const canvas = loopObj.renderer.domElement;
canvas.onselectstart = function () { return false; }
canvas.addEventListener('click', (e) => {
    if(loopObj.active){
        loopMod.stop(loopObj);
    }else{
        loopMod.start(loopObj);
    }
});
