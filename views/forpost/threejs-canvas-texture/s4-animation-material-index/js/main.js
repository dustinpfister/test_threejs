
(function () {
    // SCENE, CAMERA, LIGHT, RENDERER
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var light = new THREE.PointLight();
    light.position.set(0, 0, 0)
    camera.add(light);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // state object
    var state = {
       frame: 0,
       maxFrame: 300,
       per: 0,
       bias: 0,
       fps: 30,
       lt: new Date()
    };
    // drawBox function
    var drawBox = function(ctx, canvas, state){
        var x = canvas.width / 2 * state.bias, y = canvas.height / 2 * state.bias,
        w = canvas.width - canvas.width * state.bias, h = canvas.height - canvas.height * state.bias;
        ctx.lineWidth = 3;
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(x, y, w, h);
    };
    var drawCircle = function(ctx, canvas, state){
        ctx.lineWidth = 3;
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(
           canvas.width / 2, canvas.height / 2,
           32 * state.bias,
           0, Math.PI * 2
        );
        ctx.stroke();
    };
    // create canvas objs
    var canvasObjBox = canvasMod.createCanvasObject(state, drawBox);
    var canvasObjCircle = canvasMod.createCanvasObject(state, drawCircle);
    
    // using create cube method
    var mesh = canvasMod.createCube([
        canvasObjBox.texture,
        canvasObjBox.texture,
        canvasObjCircle.texture,
        canvasObjCircle.texture,
        canvasObjBox.texture,
        canvasObjCircle.texture,]);
    scene.add(mesh);



    // Loop
    var loop = function () {
        var now = new Date(),
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / state.fps){

            state.per = state.frame / state.maxFrame * 4 % 1,
            state.bias = 1 - Math.abs(0.5 - state.per) / 0.5;
            canvasObjBox.draw();
            canvasObjCircle.draw();

            mesh.rotation.y = Math.PI * 2 * (state.per / 4 % 1);

            renderer.render(scene, camera);

            state.frame += state.fps * secs;
            state.frame = state.frame % state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
