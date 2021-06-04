(function () {

    // SCENE
    var scene = new THREE.Scene();

    // GUY
    var guy = GuyMod.create();
    scene.add(guy.group);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, 0.05, 100);
    camera.add(new THREE.PointLight());
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    var video = {
        frame: 0,
        canvas: renderer.domElement,
        sequence: []
    };

    // first sequence
    video.sequence.push({
        maxFrame: 30,
        forFrame: function (seq) {
            camera.position.set(5, 5, 5);
            camera.lookAt(guy.group.position)
            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
