
(function () {

    // game state object for now
    var game = {
        sun: {
            x: 99,
            y: 99,
            r: 16
        },
        sectionDist: 100,
        sections: []
    };
    var i = 0,
    section,
    radian,
    sectionCount = 12;
    while(i < sectionCount){
         radian = Math.PI * 2 / sectionCount * i;
         section = {
             x: Math.cos(radian) * game.sectionDist,
             y: Math.sin(radian) * game.sectionDist,
             r: 32
         };
         game.sections.push(section);
         i += 1;
    }

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);

    var mainGroup = Sections.create(game);
    scene.add(mainGroup);

    Sections.update(game, mainGroup);

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
