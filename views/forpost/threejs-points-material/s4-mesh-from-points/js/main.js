(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000); // camera
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer(); // render
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2,1,-2)
    scene.add(dl);
    //-------- ----------
    // POINTS
    //-------- ----------
    const geometry = new THREE.SphereGeometry(1.28, 60, 10);
    const pos = geometry.getAttribute('position');
    let i = 0;
    const len = pos.count;
    while(i < len){
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.075, 10, 10),
            new THREE.MeshPhongMaterial({
                color: 0xff0000,
                emissive: 0xffffff,
                emissiveIntensity: 0.15}))
        mesh.position.copy(v);
        scene.add(mesh);
        i += 1;
    }
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
