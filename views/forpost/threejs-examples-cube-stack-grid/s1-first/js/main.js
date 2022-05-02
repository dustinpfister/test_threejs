(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    var camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.05, 100);
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 2, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // STACK

/*
    var w = 5,
    space = 0.5,
    stacks = [];

    var stackOptionPalette = [
        {
            boxCount: 5
        },
        {
            boxCount: 20
        },
        {
            boxCount: 45,
            posArray: [ 0, 0, 0, 0, 1, 1, 1, 5, 5, 5, 6, 6, 14, 14, 14, 18, 18, 19, 19, 19, 19, 19]
        },
    ];


    [ 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 
      0, 1, 2, 1, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 0, 0
    ].forEach(function(sopIndex, i){
        var stackOpt = stackOptionPalette[sopIndex];
        var stack = CubeStack.create({
            gw: 5,
            gh: 4,
            boxCount: stackOpt.boxCount || 0,
            getPos: 'seededRandom',
            posArray: stackOpt.posArray || [],
            colors: [
                [1,1,0, [0, 255]],
                [0,1,0, [128, 255]],
                [0,1,0.5, [128, 255]],
                [1,0,0, [128, 255]],
                [0,1,1, [128, 255]]
            ],
            planeColor: 2
        });
        var x = i % w;
        var y = Math.floor(i / w);
        stack.position.set(-10 + (5 + space) * x, 0.6, -10 + (4 + space) * y);
        scene.add(stack);
        stacks.push(stack)
    });
*/

    var csg = CubeStackGrid.create();
    scene.add(csg);

console.log(csg)


    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    renderer.render(scene, camera);
/*
    var frame = 0,
    maxFrame = 300,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            // apply effect
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
*/

}
    ());
