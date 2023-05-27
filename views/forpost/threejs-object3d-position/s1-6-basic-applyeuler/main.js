(function () {
    //-------- ----------
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    const makeMesh = () => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            new THREE.MeshNormalMaterial());
        return mesh;
    };
    const setSpherePos = (mesh, a1, a2, radius) => {
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * a1;
        e.z = -Math.PI * 0.5 + Math.PI * a2;
        mesh.position.set(1, 0, 0).applyEuler(e).multiplyScalar(radius);
    }
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    let i = 0;
    const len = 400;
    const perRing = 40;
    while(i < len){
        const mesh = makeMesh();
        const ri = Math.floor( i / perRing);
        const mi = i % perRing;
        const a1 = mi / perRing;
        const a2 = (ri + 1) / (( len / perRing ) + 1);
        setSpherePos(mesh, a1, a2, 5);
        const a3 = 1 - Math.abs(0.5 - a2) / 0.5;
        mesh.scale.multiplyScalar(0.25 + a3 * 1.25)
        scene.add(mesh);
        i += 1;
    }
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());