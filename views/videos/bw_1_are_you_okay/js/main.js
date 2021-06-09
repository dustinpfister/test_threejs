(function () {



    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#00afaf');


    // GUY
    var guy = GuyMod.create();
    guy.group.position.set(0, 3, 0);
    scene.add(guy.group);


    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 150);
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    var video = {
        frame: 200, //202,
        canvas: renderer.domElement,
        sequence: []
    };

    // first sequence
    video.sequence.push({
        maxFrame: Math.ceil(30 * 6.75),
        forFrame: function (seq) {


            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
