(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CURVE
    //-------- ----------
    const v_start = new THREE.Vector3(-5,0,5);
    const v_end = new THREE.Vector3(-5,5,-5);
    const v_control = new THREE.Vector3(15,0,7);
    const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
    //-------- ----------
    // MESH OBJECTS
    //-------- ----------
    const len = 40;
    let i = 0;
    while(i < len){
        const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.125, 30, 30), new THREE.MeshNormalMaterial() );
        const alpha = i / ( len - 1 );
        mesh.position.copy( curve.getPoint( alpha ) );
        scene.add(mesh);
        i += 1;
    }
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);

}());
