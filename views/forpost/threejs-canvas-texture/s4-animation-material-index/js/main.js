
(function () {
    // SCENE
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    // CAMERA
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 100);
    camera.position.set(1.75, 1.75, 1.75);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // light
    var light = new THREE.PointLight();
    light.position.set(0, 1, 0)
    camera.add(light);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // state object
    var state = {
       frame: 0,
       maxFrame: 90,
       fps: 30,
       lt: new Date()
    };
    // draw function
    var draw = function(ctx, canvas, state){
        var per = state.frame / state.maxFrame,
        bias = Math.abs(0.5 - per) / 0.5,
        x = canvas.width / 2 * bias;
        y = canvas.height / 2 * bias;
        w = canvas.width - canvas.width * bias;
        h = canvas.height - canvas.height * bias;
        ctx.lineWidth = 3;
        ctx.fillStyle = '#00ff00';
        ctx.strokeStyle = '#ff00ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(x, y, w, h);
    };
    // create canvas obj
    var canvasObj = canvasMod.createCanvasObject(state, draw);
    

    // using create cube method
    var mesh = canvasMod.createCube([
        canvasObj.texture,
        canvasObj.texture]);
    scene.add(mesh);



    // Loop
    var loop = function () {
        var now = new Date(),
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / state.fps){
            canvasObj.draw();
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame = state.frame % state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
