
(function () {

    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };

    var vectorFromAngles = function(a, b, c, len){
        len = len = undefined ? 1 : len;
        var e = new THREE.Euler(a, b, c);
        var v = new THREE.Vector3(1, 0, 0).applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };


    console.log( vectorFromAngles(0, 0, 0, 1) );


    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));



    var cube = createCube();
    scene.add(cube);


    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);


    var lt = new Date(),
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;

        requestAnimationFrame(loop);

        if(secs > 1 / fps){

            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
