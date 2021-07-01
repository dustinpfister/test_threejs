(function () {

    // scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);
    scene.add( new THREE.GridHelper(10, 10) );

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, 0.05, 100);
    camera.position.set(10, 5, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    // VIDEO UI sequence array
    var sequence = [];
    sequence.push({
        maxFrame: 300,
        forFrame: function(seq){
            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load({
        frame: 0,
        canvas: renderer.domElement,
        sequence: sequence
    });

}
    ());
