
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(1.5, 1.5, 2);
    camera.lookAt(0, 0, 0);
    var controls = new THREE.OrbitControls(camera);

	var geometry = new THREE.SphereGeometry(1,5,5);

	
	//var geometry = new THREE.BoxGeometry(1,1,1);

    //var geometry = new THREE.BoxGeometry(1, 1, 1);

    //console.log(geometry);

    var cube = new THREE.Mesh(

            geometry,

            // Material
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            }));
    scene.add(cube);

    /*
    // show vert helper script
    geometry.vertices.forEach(function (v, i) {

    console.log(i, v.x, v.y, v.z);

    var show = [1, 2, 6],
    si = 0,
    len = show.length;
    while (si < len) {

    if (i === show[si]) {

    var mesh = new THREE.Mesh(

    new THREE.BoxGeometry(.1, .1, .1),

    // Material
    new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
    }));

    mesh.position.set(v.x, v.y, v.z);

    scene.add(mesh);

    break;

    }

    si += 1;

    }

    });
     */

    var helper = new THREE.VertexNormalsHelper(cube, 2, 0x00ff00, 1);

    scene.add(helper);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {

        requestAnimationFrame(loop);

        controls.update();

        renderer.render(scene, camera);

    };

    loop();
}
    ());
