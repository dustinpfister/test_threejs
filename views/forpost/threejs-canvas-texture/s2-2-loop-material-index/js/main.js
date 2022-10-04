//-------- ----------
// CANVAS MODULE
//-------- ----------
(function(api){
    // create and return a canvasObj with texture
    api.createCanvasObject = function (state, drawFunc) {
        drawFunc = drawFunc || canvasMod.draw;
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
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
    // create a cube the makes use of one or more textures
    api.createCube = function (texture) {
        let materials = [];
        if(texture instanceof Array){
            texture.forEach(function(t){
                t.magFilter = THREE.NearestFilter;
                materials.push(new THREE.MeshStandardMaterial({
                    map: t,
                    side: THREE.DoubleSide
                }));
            });
        }else{
            materials = new THREE.MeshStandardMaterial({
                map: texture
            });
        }
        return new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), materials);
    };
}( this['canvasMod'] = {} ));
//-------- ----------
// DEMO
//-------- ----------
(function () {
    //-------- ----------
    // SCENE, CAMERA, LIGHT, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const light = new THREE.PointLight();
    light.position.set(0, 0, 0)
    camera.add(light);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // STATE, DRAW, CANVAS OBJECT
    //-------- ----------
    const state = {
       frame: 0,
       maxFrame: 300,
       per: 0,
       bias: 0,
       fps: 30,
       lt: new Date()
    };
    const drawBackground = function(ctx, canvas, state){
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#afafaf';
        ctx.strokeRect(0,0, canvas.width, canvas.height);
    };
    // drawBox function
    const drawBox = function(ctx, canvas, state){
        const x = canvas.width / 2 * state.bias, y = canvas.height / 2 * state.bias,
        w = canvas.width - canvas.width * state.bias, h = canvas.height - canvas.height * state.bias;
        drawBackground(ctx, canvas, state);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(x, y, w, h);
    };
    const drawCircle = function(ctx, canvas, state){
        ctx.lineWidth = 3;
        drawBackground(ctx, canvas, state);
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
    const canvasObjBox = canvasMod.createCanvasObject(state, drawBox);
    const canvasObjCircle = canvasMod.createCanvasObject(state, drawCircle);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = canvasMod.createCube([
        canvasObjBox.texture,
        canvasObjBox.texture,
        canvasObjCircle.texture,
        canvasObjCircle.texture,
        canvasObjBox.texture,
        canvasObjCircle.texture,]);
    scene.add(mesh);
    //-------- ----------
    // LOOP
    //-------- ----------
    const loop = function () {
        const now = new Date(),
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
