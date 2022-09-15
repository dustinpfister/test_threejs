(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshNormalMaterial({
            side: THREE.BackSide
        }));
    scene.add(box);
    //-------- ----------
    // USING THE THREE.VertexNormalsHelper METHOD
    //-------- ----------
    const helper = new THREE.VertexNormalsHelper( box, 0.75, 0x00ff00, 1 );
    helper.material.linewidth = 3;
    scene.add(helper);
    //-------- ----------
    // LOOP
    //-------- ----------
    var lt = new Date(),
    state = {
        frame: 0,
        maxFrame: 90,
        per: 0,
        bias: 0,
        camUnitLength: 5,
        camDir: new THREE.Vector3(0.60, 0.75, 1.5).normalize(),
        camVec: new THREE.Vector3(),
        camLook: new THREE.Vector3(0, 0, -0.1)
    };
    var update = function (secs, per, bias, state) {
        helper.update();
        state.camUnitLength = 5 - 4.9 * bias;
        state.camVec.copy(state.camDir).multiplyScalar(state.camUnitLength);
        camera.position.copy(state.camVec);
        const vd = new THREE.Vector3(0,0,0);
        camera.lookAt(state.camLook);
    };
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);

        state.per = state.frame / state.maxFrame;
        state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;

        update(secs, state.per, state.bias, state)
        renderer.render(scene, camera);

        state.frame += 30 * secs;
        state.frame %= state.maxFrame;
        lt = now;
    };
    loop();
    //-------- ----------
    // UISNG ORBIT CONTROLS
    //-------- ----------
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
}());