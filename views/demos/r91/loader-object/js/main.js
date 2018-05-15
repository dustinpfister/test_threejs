
(function () {

    // SCENE
    //var scene;

    // CAMERA
    var camera = new THREE.PerspectiveCamera(65, 4 / 3, .5, 1000);
    camera.position.set(-100, 100, 100);
    camera.lookAt(0, 0, 0);

    var controls = new THREE.OrbitControls(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    new THREE.ObjectLoader().load('/json/ani/scene-animation.json', function (scene) {

        var animationClip = scene.animations[0],
        mixer = new THREE.AnimationMixer(scene);

        mixer.clipAction(animationClip).play();

        var loop = function () {

            requestAnimationFrame(loop);

            mixer.update(0.01);
            renderer.render(scene, camera);

        }

        loop();

    });

}
    ());
