(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0,0,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // MESH
    // ---------- ---------- ----------
    const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1, 30, 30),
            new THREE.MeshNormalMaterial());
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.position.set(1, 0, 1);
    scene.add(mesh);
    // ---------- ---------- ----------
    // USING APPLY AXIS ANGLE
    // ---------- ---------- ----------
    const v = new THREE.Vector3(0, 1, 0);
    mesh.position.applyAxisAngle(v, Math.PI / 180 * 180);
    console.log( mesh.position.clone().round() ); // {x: -1, y: 0, z: -1}
    // ---------- ---------- ----------
    // RENDER
    // ---------- ---------- ----------
    renderer.render(scene, camera);
}
    ());
