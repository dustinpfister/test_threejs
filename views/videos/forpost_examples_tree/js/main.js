(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.background =  new THREE.Color(0, 0.25, 0.25);
    scene.add( new THREE.GridHelper(100, 100) );

    var MATERIALS_CONE_TREE = new THREE.MeshStandardMaterial({
            color: '#008f00'
        });

    var tree = new Tree({
        conesPerSection: 14,
        coneMaterial: MATERIALS_CONE_TREE,
        sections: 10,
        coneLengthReduction: 4.5
    });
    tree.group.scale.set(2, 2, 2);
    tree.group.position.set(0, 0, 0);
    scene.add(tree.group);

    // light
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(25, 25, 0);
    scene.add(pointLight);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, 0.05, 100);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 6, 0);
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    var sequence = [];

    sequence.push({
        maxFrame: 300,
        forFrame: function(seq){
            camera.position.set(20, 20, 20);
            camera.lookAt(0, 6, 0);
            tree.group.children.forEach(function(section, i){
               section.rotation.y = Math.PI / 180 * (45 + 45 * seq.bias) * ( i + 1 ) * seq.bias;
            });
            renderer.render(scene, camera);
        }
    });

    sequence.push({
        maxFrame: 300,
        forFrame: function(seq){

            var radian = Math.PI * 0.25 + Math.PI * 2 * seq.per;
            camera.position.set(Math.cos(radian) * 27, 20 - 15 * seq.bias, Math.sin(radian) * 27);
            camera.lookAt(0, 6, 0);

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
