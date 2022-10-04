(function(api){
    // create and return a canvasObj with texture
    api.createCanvasObject = function (state, drawFunc) {
        drawFunc = drawFunc || canvasMod.draw;
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        const canvasObj = {
            texture: texture,
            canvas: canvas,
            ctx: ctx,
            state: state,
            draw: function(){
                drawFunc.call(state, ctx, canvas, state);
                // making sure I am setting this to true each time
                texture.needsUpdate = true;
            }
        };
        canvasObj.draw();
        return canvasObj;
    };
}( this['canvasMod'] = {} ));

(function () {
    // state object
    const state = {
       frame: 0,
       maxFrame: 90,
       fps: 30,
       lt: new Date()
    };
    // draw function
    const draw = function(ctx, canvas, state){
        const per = state.frame / state.maxFrame,
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
    const canvasObj = canvasMod.createCanvasObject(state, draw);
    // filter
    canvasObj.texture.magFilter = THREE.NearestFilter;
    // SCENE
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const fogColor = new THREE.Color(0xffffff);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.35);
    // CAMERA
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 100);
    camera.position.set(1.75, 1.75, 1.75);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // light
    const light = new THREE.PointLight();
    light.position.set(0,0.5,0)
    camera.add(light);
    // using create cube method
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                map: canvasObj.texture
            }));
    scene.add(mesh);
    // Render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // Loop
    const loop = function () {
        const now = new Date(),
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
