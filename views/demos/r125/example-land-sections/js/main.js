
(function () {

    var game = {
        sun: {
            x: 0,
            y: 0
        },
        sectionDist: 25,
        sections: []
    };
    var i = 0,
    section,
    radian,
    sectionCount = 10;
    while(i < sectionCount){
         radian = Math.PI / sectionCount * i;
         section = {
             x: Math.cos(radian) * game.sectionDist,
             y: Math.sin(radian) * game.sectionDist
         };
         game.sections.push(section);
         i += 1;
    }

    console.log(game);


    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);

    var mainGroup = Sections.create(game);
    scene.add(mainGroup);

    Sections.setSunPos(game, mainGroup);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();

}
    ());
