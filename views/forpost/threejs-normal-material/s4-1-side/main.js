(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    const box = new THREE.Mesh(
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
    let lt = new Date();
    const state = {
        frame: 0,
        maxFrame: 90,
        per: 0,
        bias: 0,
        camUnitLength: 5,
        camDir: new THREE.Vector3(0.60, 0.75, 1.5).normalize(),
        camVec: new THREE.Vector3(),
        camLook: new THREE.Vector3(0, 0, -0.1)
    };
    const update = function (secs, per, bias, state) {
        helper.update();
        state.camUnitLength = 5 - 4.9 * bias;
        state.camVec.copy(state.camDir).multiplyScalar(state.camUnitLength);
        camera.position.copy(state.camVec);
        const vd = new THREE.Vector3(0,0,0);
        camera.lookAt(state.camLook);
    };
    const loop = function () {
        const now = new Date(),
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
}());