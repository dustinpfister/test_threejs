(function () {

    // SCENE
    var scene = new THREE.Scene();

    var MATERIALS_CONE_TREE = new THREE.MeshStandardMaterial({
            color: '#008f00'
        });

    var tree = new Tree({
        coneMaterial: MATERIALS_CONE_TREE,
        sections: 10,
        coneLengthReduction: 4.5
    });
    tree.group.scale.set(2, 2, 2);
    tree.group.position.set(0, -10, 0);
    scene.add(tree.group);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, 0.05, 100);
    camera.add(new THREE.PointLight());
    camera.position.set(20, 20, 20);
    camera.lookAt(tree.group.position);
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    var sequence = [];

    sequence.push({
        maxFrame: 30,
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
