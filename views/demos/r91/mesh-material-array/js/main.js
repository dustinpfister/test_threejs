
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // an Array of materials
    /*
    var materialArray = [
    new THREE.MeshBasicMaterial({
    color: 0xff0000
    }),
    new THREE.MeshBasicMaterial({
    color: 0x00ff00
    }),
    new THREE.MeshBasicMaterial({
    color: 0x0000ff
    })
    ];
     */

    materialArray = (function () {

        var materials = [];

        var g,
        i = 0,
        count = 15 * 15 * 2;
        while (i < count) {

            g = Math.floor(255 / count * i);

            materials.push(

                new THREE.MeshBasicMaterial({

                    color: new THREE.Color('rgb(0,' + g + ',0)')

                }));

            i += 1;
        }

        return materials;

    }
        ());

    // Sphere
    var geometry = new THREE.SphereGeometry(1, 15, 15);

    geometry.faces.forEach(function (face,i) {

        face.materialIndex = i;//Math.floor(i % materialArray.length);

    });

    var sphere = new THREE.Mesh(

            geometry,

            materialArray);

    scene.add(sphere);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var loop = function () {

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

    };

    loop();

}
    ());
