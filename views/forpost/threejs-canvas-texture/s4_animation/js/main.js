
(function () {

    // state object
    var state = {
       frame: 0,
       maxFrame: 300
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
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ff00ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(x, y, w, h);
    };
    // create canvas obj
    var canvasObj = canvasMod.createCanvasObject(state, draw);

    // filter
    canvasObj.texture.magFilter = THREE.NearestFilter;

    // Basic MATERIAL using TEXTURE
    var material = new THREE.MeshBasicMaterial({
            map: canvasObj.texture
        });

    // SCENE
    var scene = new THREE.Scene();
    fogColor = new THREE.Color(0xffffff);

    scene.background = fogColor;
    scene.fog = new THREE.Fog(fogColor, 0.0025, 20);
    scene.fog = new THREE.FogExp2(fogColor, 0.1);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // MESH using THE MATERIAL
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Loop
    var frame = 0,
    maxFrame = 500,
    loop = function () {
/*
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        x = canvas.width / 2 * bias;
        y = canvas.height / 2 * bias;
        w = canvas.width - canvas.width * bias;
        h = canvas.height - canvas.height * bias;
*/


        canvasObj.draw();

        requestAnimationFrame(loop);


/*
        ctx.lineWidth = 3;
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ff00ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(x, y, w, h);

        texture.needsUpdate = true;
*/
        renderer.render(scene, camera);

        state.frame += 1;
        state.frame = state.frame % state.maxFrame;

    };

    loop();
}
    ());
